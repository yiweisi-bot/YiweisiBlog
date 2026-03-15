import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'
import type { BlogMetadata } from '../types'

/**
 * Extracts YAML frontmatter from a markdown string using regex.
 * Since we can't use gray-matter in the browser via Vite reliably,
 * we use a simple regex to parse the metadata.
 */
function parseFrontmatter(markdown: string): { metadata: Partial<BlogMetadata>; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = markdown.match(frontmatterRegex)

  if (!match) {
    return { metadata: {}, content: markdown }
  }

  const [, frontmatterString, content] = match
  const metadata: Record<string, any> = {}

  // Parse simple key-value pairs (e.g. title: Hello World)
  frontmatterString.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim()
      let value = line.slice(colonIndex + 1).trim()

      // Handle array tags (e.g. tags: [React, Tailwind])
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(tag => tag.trim()) as any
      } else {
        // Remove quotes if present
        value = value.replace(/^['"](.*)['"]$/, '$1')
      }

      metadata[key] = value
    }
  })

  return { metadata, content }
}

export async function parseMarkdown(rawContent: string): Promise<{ metadata: BlogMetadata; content: string }> {
  // 1. Extract frontmatter
  const { metadata: rawMetadata, content: markdownBody } = parseFrontmatter(rawContent)

  // 2. Process markdown to HTML
  const processedContent = await remark()
    .use(gfm)
    .use(html)
    .process(markdownBody)

  const htmlContent = processedContent.toString()

  // 3. Fallback defaults
  const metadata: BlogMetadata = {
    title: rawMetadata.title || 'Untitled',
    date: rawMetadata.date || new Date().toISOString(),
    author: rawMetadata.author || 'Yiweisi Bot',
    tags: Array.isArray(rawMetadata.tags) ? rawMetadata.tags : [],
    excerpt: rawMetadata.excerpt || '',
  }

  return { metadata, content: htmlContent }
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  // Remove markdown tags before counting
  const plainText = content.replace(/[#*`_\[\]()]/g, '')
  const words = plainText.split(/\s+/).filter(word => word.length > 0).length
  return Math.ceil(words / wordsPerMinute) || 1
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString // return original if invalid
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (e) {
    return dateString
  }
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}