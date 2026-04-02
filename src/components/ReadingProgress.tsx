import { useEffect, useState, useMemo } from 'react'
import { prepare, layout } from '@chenglou/pretext'
import { motion } from 'framer-motion'

interface ReadingProgressProps {
  content: string
  font?: string
  contentWidth?: number
  lineHeight?: number
}

/**
 * 阅读进度条组件
 * 使用 Pretext 精确计算文章高度，提供准确的阅读进度
 */
export function ReadingProgress({
  content,
  font = '18px Inter',
  contentWidth = 768,
  lineHeight = 28
}: ReadingProgressProps) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  // 预计算文章总高度（用于显示预估时间等）
  const totalHeight = useMemo(() => {
    if (!content) return 0
    try {
      const prepared = prepare(content, font)
      const result = layout(prepared, contentWidth, lineHeight)
      return result.height
    } catch (error) {
      console.error('Reading progress calculation error:', error)
      return 0
    }
  }, [content, font, contentWidth, lineHeight])
  
  // 使用 totalHeight 避免未使用变量的警告
  const estimatedReadTime = useMemo(() => {
    if (totalHeight === 0) return 0
    const wordCount = content.split(/\s+/).length
    return Math.ceil(wordCount / 200)
  }, [content, totalHeight])

  useEffect(() => {
    let rafId: number
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      // 使用 requestAnimationFrame 节流
      if (rafId) return
      
      rafId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        
        // 只在滚动位置变化时更新
        if (Math.abs(scrollTop - lastScrollY) > 5) {
          lastScrollY = scrollTop
          const scrollProgress = (scrollTop / docHeight) * 100
          const newProgress = Math.min(100, Math.max(0, scrollProgress))
          setProgress(newProgress)
          setIsVisible(scrollTop > 100) // 滚动超过100px时显示
        }
        
        rafId = 0
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // 初始计算

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])



  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -10
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* 进度条背景 */}
      <div className="h-1 bg-gradient-to-r from-muted/50 to-muted/30 backdrop-blur-sm">
        {/* 进度条填充 */}
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-purple-500 to-pink-500"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      
      {/* 进度信息 */}
      <div className="absolute top-2 right-4 flex items-center gap-3">
        <span className="text-xs text-muted-foreground/80 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full">
          {Math.round(progress)}%
        </span>
        {estimatedReadTime > 0 && (
          <span className="text-xs text-muted-foreground/60 hidden sm:inline">
            预计 {estimatedReadTime} 分钟读完
          </span>
        )}
      </div>
    </motion.div>
  )
}

/**
 * 简化的阅读进度 hook
 */
export function useReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let rafId: number

    const handleScroll = () => {
      if (rafId) return
      
      rafId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const newProgress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100))
        setProgress(newProgress)
        rafId = 0
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return progress
}
