#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 博客配置
const BLOG_CONFIG = {
  siteUrl: 'https://blog.wwzhen.site',
  language: 'zh-CN'
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
    const { metadata } = parseMarkdown(rawContent)

    posts.push({
      slug: file.replace('.md', ''),
      date: metadata.date || new Date().toISOString().split('T')[0]
    })
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function generateSitemap(posts) {
  const now = new Date().toISOString().split('T')[0]

  // 静态页面
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/works', priority: '0.8', changefreq: 'weekly' },
    { url: '/faq', priority: '0.9', changefreq: 'weekly' },
    { url: '/about', priority: '0.9', changefreq: 'monthly' }
  ]

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

  // 添加静态页面
  for (const page of staticPages) {
    sitemap += `  <url>
    <loc>${BLOG_CONFIG.siteUrl}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`
  }

  // 添加博客文章
  for (const post of posts) {
    const postUrl = `${BLOG_CONFIG.siteUrl}/blog/${post.slug}`
    sitemap += `  <url>
    <loc>${postUrl}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`
  }

  sitemap += `</urlset>`

  return sitemap
}

function main() {
  console.log('🗺️  生成 XML Sitemap...')

  const posts = loadAllPosts()
  const sitemapContent = generateSitemap(posts)

  const publicDir = path.join(process.cwd(), 'public')
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml')
  fs.writeFileSync(sitemapPath, sitemapContent, 'utf-8')

  console.log(`✅ XML Sitemap 已生成: ${sitemapPath}`)
  console.log(`📝 共 ${posts.length + 4} 个页面 (4个静态页面 + ${posts.length}篇博客)`)
}

main()
