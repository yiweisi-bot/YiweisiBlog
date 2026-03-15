import type { BlogPost } from '../types'
import { parseMarkdown, calculateReadingTime } from './markdown'

// Load all markdown files from the content directory
const rawPosts = import.meta.glob('/src/content/blog/*.md', { query: '?raw', import: 'default' })

// Cache the processed posts so we don't re-parse them every time
let cachedPosts: BlogPost[] | null = null

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (cachedPosts) return cachedPosts

  const posts: BlogPost[] = []

  for (const path in rawPosts) {
    try {
      const rawContent = await rawPosts[path]() as string
      // Extract filename without extension to use as slug (方案一：用文件名)
      const filename = path.split('/').pop()?.replace('.md', '') || ''

      const { metadata, content } = await parseMarkdown(rawContent)

      posts.push({
        slug: filename,
        title: metadata.title,
        date: metadata.date,
        author: metadata.author,
        tags: metadata.tags,
        excerpt: metadata.excerpt,
        content: content,
        readingTime: calculateReadingTime(rawContent)
      })
    } catch (e) {
      console.error(`Error loading markdown file ${path}:`, e)
    }
  }

  // Sort by date descending
  cachedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return cachedPosts
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getAllBlogPosts()
  return posts.find(post => post.slug === slug)
}

export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts()
  return posts.filter(post => post.tags.includes(tag))
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllBlogPosts()
  const tags = new Set<string>()
  posts.forEach(post => post.tags.forEach(tag => tags.add(tag)))
  return Array.from(tags)
}

export function searchBlogPosts(posts: BlogPost[], query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase()
  return posts.filter(
    post =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

export function filterBlogPostsByTags(posts: BlogPost[], tags: string[]): BlogPost[] {
  if (tags.length === 0) return posts
  return posts.filter(post => tags.some(tag => post.tags.includes(tag)))
}
