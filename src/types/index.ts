export interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  tags: string[]
  excerpt: string
  content: string
  readingTime: number
}

export interface BlogMetadata {
  title: string
  date: string
  author: string
  tags: string[]
  excerpt: string
}

export interface SearchFilters {
  query: string
  tags: string[]
  sortBy: 'date' | 'title'
}