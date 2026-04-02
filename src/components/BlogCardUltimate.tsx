import { useMemo } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useTextHeight } from '../hooks/useTextHeight'
import { useSmartTruncate } from '../hooks/useSmartTruncate'
import { ArrowUpRight, Clock, Eye } from 'lucide-react'
import type { BlogPost } from '../types'

interface BlogCardUltimateProps {
  post: BlogPost
  index?: number
}

/**
 * 终极版 BlogCard - 惊艳视觉效果
 * 动态渐变边框 + 3D悬浮 + 光效跟随
 */
export default function BlogCardUltimate({ post, index = 0 }: BlogCardUltimateProps) {
  // 鼠标位置追踪
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // 弹簧动画配置 - 更流畅
  const springConfig = { damping: 20, stiffness: 200 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig)

  // 光晕位置 - 跟随鼠标
  const glowX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"])
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"])

  // 边框渐变角度
  const gradientAngle = useTransform(
    [mouseX, mouseY],
    ([x, y]) => {
      const angle = Math.atan2(Number(y), Number(x)) * (180 / Math.PI)
      return angle + 90
    }
  )

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
    'bold 18px Inter',
    280,
    26
  )

  const { height: excerptHeight } = useTextHeight(
    post.excerpt || '',
    '14px Inter',
    280,
    22
  )

  // 智能截断
  const smartExcerpt = useSmartTruncate(post.excerpt || '', {
    font: '14px Inter',
    maxWidth: 280,
    maxLines: 3,
    suffix: '...'
  })

  // 随机渐变颜色 - 基于文章索引
  const gradientColors = useMemo(() => {
    const colors = [
      ['#3b82f6', '#8b5cf6', '#ec4899'], // 蓝紫粉
      ['#06b6d4', '#3b82f6', '#6366f1'], // 青蓝靛
      ['#10b981', '#06b6d4', '#3b82f6'], // 绿青蓝
      ['#f59e0b', '#ef4444', '#ec4899'], // 黄红粉
      ['#8b5cf6', '#ec4899', '#f43f5e'], // 紫粉玫
      ['#14b8a6', '#10b981', '#22c55e'], // 青绿
    ]
    return colors[index % colors.length]
  }, [index])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full"
    >
      {/* 动态渐变边框 */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `conic-gradient(from ${gradientAngle}deg at 50% 50%, ${gradientColors[0]}, ${gradientColors[1]}, ${gradientColors[2]}, ${gradientColors[0]})`,
        }}
      />
      
      {/* 光晕效果 */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${glowX} ${glowY}, rgba(255,255,255,0.1), transparent 40%)`,
        }}
      />

      {/* 卡片主体 */}
      <article className="relative h-full flex flex-col overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-sm cursor-pointer transition-all duration-300 group-hover:border-transparent group-hover:bg-card/90 group-hover:shadow-2xl group-hover:shadow-primary/10">
        
        {/* 顶部渐变条 */}
        <div 
          className="h-1 w-full transition-all duration-500 group-hover:h-2"
          style={{
            background: `linear-gradient(90deg, ${gradientColors[0]}, ${gradientColors[1]}, ${gradientColors[2]})`
          }}
        />

        {/* 内容区域 */}
        <div className="flex-1 flex flex-col p-6">
          {/* 标题 */}
          <motion.h3 
            className="text-lg font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300"
            style={{ minHeight: Math.min(titleHeight, 52) }}
          >
            {post.title}
          </motion.h3>

          {/* 摘要 */}
          <p 
            className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1"
            style={{ minHeight: Math.min(excerptHeight, 66) }}
          >
            {smartExcerpt}
          </p>

          {/* 标签 */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + i * 0.05 }}
                  className="px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium transition-all duration-300 group-hover:bg-primary/20"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          )}

          {/* 底部信息 */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/50">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {formatDate(post.date)}
              </span>
              {post.readingTime && (
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {post.readingTime}分钟
                </span>
              )}
            </div>
            
            {/* 箭头图标 */}
            <motion.div
              className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0"
            >
              <span className="text-xs font-medium">阅读</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>

        {/* 角落装饰 */}
        <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl pointer-events-none">
          <div 
            className="absolute top-0 right-0 w-full h-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, transparent 50%, ${gradientColors[1]} 50%)`
            }}
          />
        </div>

        {/* 悬浮时的光斑效果 */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(300px circle at ${glowX} ${glowY}, rgba(255,255,255,0.05), transparent 50%)`,
          }}
        />
      </article>
    </motion.div>
  )
}
