import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTextHeight } from '../hooks/useTextHeight'
import { useSmartTruncate } from '../hooks/useSmartTruncate'
import type { BlogPost } from '../types'

interface BlogCardV2Props {
  post: BlogPost
  variant?: 'grid' | 'masonry'
  index?: number
}

/**
 * 升级版的 BlogCard
 * 使用 Pretext 实现智能高度计算和文字截断
 */
export default function BlogCardV2({ post, variant = 'grid', index = 0 }: BlogCardV2Props) {
  // 格式化日期
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // 使用 Pretext 计算标题高度
  const { height: titleHeight, lineCount: titleLines } = useTextHeight(
    post.title,
    'bold 18px Inter',
    280, // 卡片内容区宽度
    26   // 标题行高
  )

  // 使用 Pretext 计算摘要高度
  const { height: excerptHeight } = useTextHeight(
    post.excerpt || '',
    '14px Inter',
    280,
    22
  )

  // 智能截断摘要
  const smartExcerpt = useSmartTruncate(post.excerpt || '', {
    font: '14px Inter',
    maxWidth: 280,
    maxLines: 3,
    suffix: '...'
  })

  // 计算卡片总高度
  const cardHeight = useMemo(() => {
    const padding = 24 * 2 // 上下 padding
    const titleMargin = 12
    const excerptMargin = 16
    const tagsHeight = post.tags?.length ? 32 : 0
    const tagsMargin = post.tags?.length ? 16 : 0
    const footerHeight = 24
    
    return padding + titleHeight + titleMargin + excerptHeight + excerptMargin + tagsHeight + tagsMargin + footerHeight
  }, [titleHeight, excerptHeight, post.tags])

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ 
        y: -6, 
        scale: 1.02,
        transition: { duration: 0.25, ease: 'easeOut' }
      }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10"
      style={{ 
        height: variant === 'grid' ? cardHeight : undefined,
        willChange: 'transform'
      }}
    >
      {/* 内容区域 */}
      <div className="flex flex-1 flex-col p-6">
        {/* 标题 */}
        <motion.h3 
          className="mb-3 text-xl font-bold text-foreground transition-colors group-hover:text-primary"
          style={{ 
            lineHeight: '26px',
            minHeight: titleLines > 1 ? titleHeight : undefined
          }}
        >
          <a href={`/blog/${post.slug}`} className="hover:underline decoration-2 underline-offset-4">
            {post.title}
          </a>
        </motion.h3>

        {/* 摘要 - 使用智能截断 */}
        <p 
          className="mb-4 flex-1 text-sm text-muted-foreground leading-relaxed"
          style={{ lineHeight: '22px' }}
        >
          {smartExcerpt}
        </p>

        {/* 标签 */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag, idx) => (
              <motion.span
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
              >
                {tag}
              </motion.span>
            ))}
            {post.tags.length > 3 && (
              <span className="inline-flex items-center text-xs text-muted-foreground">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* 底部信息 */}
        <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
          <time dateTime={post.date} className="flex items-center gap-1">
            <span>📅</span>
            <span>{formatDate(post.date)}</span>
          </time>
          <span className="flex items-center gap-1">
            <span>📖</span>
            <span>{Math.ceil(post.readingTime || 5)} 分钟</span>
          </span>
        </div>
      </div>

      {/* 悬停效果边框 */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-colors group-hover:border-primary/20 pointer-events-none" />
      
      {/* 渐变遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.article>
  )
}
