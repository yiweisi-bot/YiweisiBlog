import { useMemo } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useTextHeight } from '../hooks/useTextHeight'
import { useSmartTruncate } from '../hooks/useSmartTruncate'
import { ArrowUpRight } from 'lucide-react'
import type { BlogPost } from '../types'

interface BlogCardV3Props {
  post: BlogPost
  variant?: 'grid' | 'masonry' | 'featured'
  index?: number
}

/**
 * 终极版 BlogCard
 * 3D 倾斜效果 + 光晕跟随 + 丝滑动画
 */
export default function BlogCardV3({ post, variant = 'grid', index = 0 }: BlogCardV3Props) {
  // 鼠标位置追踪
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // 弹簧动画配置
  const springConfig = { damping: 25, stiffness: 150 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig)

  // 光晕位置
  const glowX = useTransform(mouseX, [-0.5, 0.5], [0, 100])
  const glowY = useTransform(mouseY, [-0.5, 0.5], [0, 100])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // 格式化日期
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // 使用 Pretext 计算高度
  const { height: titleHeight } = useTextHeight(
    post.title,
    variant === 'featured' ? 'bold 24px Inter' : 'bold 18px Inter',
    variant === 'featured' ? 600 : 280,
    variant === 'featured' ? 32 : 26
  )

  const { height: excerptHeight } = useTextHeight(
    post.excerpt || '',
    '14px Inter',
    variant === 'featured' ? 600 : 280,
    22
  )

  // 智能截断
  const smartExcerpt = useSmartTruncate(post.excerpt || '', {
    font: '14px Inter',
    maxWidth: variant === 'featured' ? 600 : 280,
    maxLines: variant === 'featured' ? 4 : 3,
    suffix: '...'
  })

  // 计算卡片高度（用于调试）
  const calculatedHeight = useMemo(() => {
    if (variant === 'featured') return undefined
    
    const padding = 24 * 2
    const titleMargin = 12
    const excerptMargin = 16
    const tagsHeight = post.tags?.length ? 32 : 0
    const tagsMargin = post.tags?.length ? 16 : 0
    const footerHeight = 24
    
    return padding + titleHeight + titleMargin + excerptHeight + excerptMargin + tagsHeight + tagsMargin + footerHeight
  }, [titleHeight, excerptHeight, post.tags, variant])
  
  // 使用计算的高度（避免未使用变量警告）
  void calculatedHeight

  // 根据 variant 调整样式
  const isFeatured = variant === 'featured'
  const cardClass = isFeatured 
    ? 'col-span-full md:col-span-2 lg:col-span-3'
    : ''

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      style={{
        rotateX: isFeatured ? 0 : rotateX,
        rotateY: isFeatured ? 0 : rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      onMouseMove={!isFeatured ? handleMouseMove : undefined}
      onMouseLeave={!isFeatured ? handleMouseLeave : undefined}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card cursor-pointer h-full ${cardClass}`}
    >
      {/* 3D 光晕效果 */}
      {!isFeatured && (
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(var(--primary), 0.15) 0%, transparent 60%)`
            )
          }}
        />
      )}

      {/* 特色卡片背景 */}
      {isFeatured && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-pink-500/10" />
      )}

      {/* 内容区域 */}
      <div className={`relative flex flex-1 flex-col ${isFeatured ? 'p-8' : 'p-6'}`}>
        {/* 特色标签 */}
        {isFeatured && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            精选文章
          </motion.div>
        )}

        {/* 标题 */}
        <motion.h3 
          className={`font-bold text-foreground transition-colors group-hover:text-primary mb-3 ${
            isFeatured ? 'text-2xl md:text-3xl leading-tight' : 'text-xl'
          }`}
          style={{ 
            lineHeight: isFeatured ? '1.3' : '26px',
            transform: 'translateZ(20px)'
          }}
        >
          <a href={`/blog/${post.slug}`} className="hover:underline decoration-2 underline-offset-4 flex items-start gap-2">
            {post.title}
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ArrowUpRight className="w-5 h-5 text-primary" />
            </motion.span>
          </a>
        </motion.h3>

        {/* 摘要 */}
        <p 
          className={`mb-4 flex-1 text-muted-foreground leading-relaxed ${
            isFeatured ? 'text-base' : 'text-sm'
          }`}
          style={{ 
            lineHeight: '22px',
            transform: 'translateZ(10px)'
          }}
        >
          {smartExcerpt}
        </p>

        {/* 标签 */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2" style={{ transform: 'translateZ(15px)' }}>
            {post.tags.slice(0, isFeatured ? 5 : 3).map((tag, idx) => (
              <motion.span
                key={idx}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-all hover:bg-primary/20 hover:shadow-sm"
              >
                {tag}
              </motion.span>
            ))}
            {!isFeatured && post.tags.length > 3 && (
              <span className="inline-flex items-center text-xs text-muted-foreground">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* 底部信息 */}
        <div 
          className="mt-auto flex items-center justify-between text-xs text-muted-foreground"
          style={{ transform: 'translateZ(5px)' }}
        >
          <div className="flex items-center gap-4">
            <time dateTime={post.date} className="flex items-center gap-1">
              <span>📅</span>
              <span>{formatDate(post.date)}</span>
            </time>
            <span className="flex items-center gap-1">
              <span>📖</span>
              <span>{Math.ceil(post.readingTime || 5)} 分钟</span>
            </span>
          </div>
          
          {/* 阅读更多指示 */}
          <motion.span
            className="opacity-0 group-hover:opacity-100 transition-opacity text-primary font-medium"
            whileHover={{ x: 3 }}
          >
            阅读 →
          </motion.span>
        </div>
      </div>

      {/* 悬停边框效果 */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-300 group-hover:border-primary/30 pointer-events-none" />
      
      {/* 角落装饰 */}
      {!isFeatured && (
        <>
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tr-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-2xl pointer-events-none" />
        </>
      )}
    </motion.article>
  )
}
