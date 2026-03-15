import type { BlogPost } from '../types'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  // 格式化日期
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // 限制摘要长度
  const truncateExcerpt = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
  }

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
      {/* 内容区域 */}
      <div className="flex flex-1 flex-col p-6">
        {/* 标题 */}
        <h3 className="mb-3 text-xl font-bold text-foreground transition-colors group-hover:text-primary line-clamp-2">
          <a href={`/blog/${post.slug}`}>
            {post.title}
          </a>
        </h3>

        {/* 摘要 */}
        <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-3">
          {truncateExcerpt(post.excerpt || '')}
        </p>

        {/* 标签 */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 底部信息 */}
        <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
          <time dateTime={post.date}>
            📅 {formatDate(post.date)}
          </time>
          <span className="flex items-center gap-1">
            📖 {Math.ceil(post.readingTime || 5)} 分钟阅读
          </span>
        </div>
      </div>

      {/* 悬停效果边框 */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-colors group-hover:border-primary/20 pointer-events-none" />
    </article>
  )
}
