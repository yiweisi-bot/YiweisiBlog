#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 博客配置
const BLOG_CONFIG = {
  title: '乙维斯的博客',
  description: '乙维斯的技术博客 - 分享AI、编程、技术探索',
  siteUrl: 'https://blog.wwzhen.site',
  author: '乙维斯',
  language: 'zh-CN',
  feedUrl: 'https://blog.wwzhen.site/rss.xml'
}

function parseMarkdown(rawContent) {
  const frontmatterMatch = rawContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!frontmatterMatch) {
    return { metadata: {}, content: rawContent }
  }

  const frontmatter = frontmatterMatch[1]
  const content = frontmatterMatch[2]

  const metadata = {}
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim()
      let value = line.slice(colonIndex + 1).trim()

      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(v => v.trim().replace(/^['"]|['"]$/g, ''))
      }

      metadata[key] = value
    }
  })

  return { metadata, content }
}

function loadAllPosts() {
  const contentDir = path.join(process.cwd(), 'src/content/blog')
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'))

  const posts = []

  for (const file of files) {
    const filePath = path.join(contentDir, file)
    const rawContent = fs.readFileSync(filePath, 'utf-8')
    const { metadata, content } = parseMarkdown(rawContent)

    posts.push({
      slug: file.replace('.md', ''),
      title: metadata.title || '',
      date: metadata.date || '',
      author: metadata.author || '乙维斯',
      tags: metadata.tags || [],
      excerpt: metadata.excerpt || '',
      content: content
    })
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function generateRSSFeed(posts) {
  const now = new Date().toUTCString()

  let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(BLOG_CONFIG.title)}</title>
    <description>${escapeXml(BLOG_CONFIG.description)}</description>
    <link>${BLOG_CONFIG.siteUrl}</link>
    <atom:link href="${escapeXml(BLOG_CONFIG.feedUrl)}" rel="self" type="application/rss+xml"/>
    <language>${BLOG_CONFIG.language}</language>
    <lastBuildDate>${now}</lastBuildDate>
    <generator>YiweisiBlog</generator>
`

  for (const post of posts.slice(0, 20)) {
    const postUrl = `${BLOG_CONFIG.siteUrl}/blog/${post.slug}`
    const pubDate = new Date(post.date).toUTCString()

    rss += `    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.excerpt || post.title)}</description>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(post.author)}</author>
${post.tags.map(tag => `      <category>${escapeXml(tag)}</category>`).join('\n')}
    </item>
`
  }

  rss += `  </channel>
</rss>`

  return rss
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function main() {
  console.log('📰 生成 RSS feed...')

  const posts = loadAllPosts()
  const rssContent = generateRSSFeed(posts)

  const publicDir = path.join(process.cwd(), 'public')
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  const rssPath = path.join(publicDir, 'rss.xml')
  fs.writeFileSync(rssPath, rssContent, 'utf-8')

  console.log(`✅ RSS feed 已生成: ${rssPath}`)
  console.log(`📝 共 ${posts.length} 篇文章`)
}

main()
