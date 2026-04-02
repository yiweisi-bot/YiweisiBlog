import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { prepare, layout } from '@chenglou/pretext'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface ExpandableTextProps {
  text: string
  font?: string
  maxWidth?: number
  lineHeight?: number
  previewLines?: number
  className?: string
}

/**
 * 可展开/折叠的文本组件
 * 使用 Pretext 精确计算高度，实现平滑动画
 */
export function ExpandableText({
  text,
  font = '14px Inter',
  maxWidth = 280,
  lineHeight = 22,
  previewLines = 3,
  className = ''
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // 使用 Pretext 计算预览和完整高度
  const { previewHeight, fullHeight, totalLines } = useMemo(() => {
    if (!text) return { previewHeight: 0, fullHeight: 0, totalLines: 0 }

    try {
      const prepared = prepare(text, font)
      const full = layout(prepared, maxWidth, lineHeight)
      
      // 计算预览高度（限制行数）
      const preview = layout(prepared, maxWidth, lineHeight * previewLines)
      
      return {
        previewHeight: preview.height,
        fullHeight: full.height,
        totalLines: full.lineCount
      }
    } catch (error) {
      console.error('Expandable text calculation error:', error)
      // 降级处理
      const avgCharsPerLine = Math.floor(maxWidth / 7)
      const lines = Math.ceil(text.length / avgCharsPerLine)
      return {
        previewHeight: Math.min(lines, previewLines) * lineHeight,
        fullHeight: lines * lineHeight,
        totalLines: lines
      }
    }
  }, [text, font, maxWidth, lineHeight, previewLines])

  // 如果文本较短，不需要展开功能
  if (totalLines <= previewLines) {
    return (
      <p className={`text-sm text-muted-foreground leading-relaxed ${className}`}>
        {text}
      </p>
    )
  }

  return (
    <div className={className}>
      {/* 文本容器 - 带动画高度 */}
      <motion.div
        initial={false}
        animate={{ 
          height: isExpanded ? fullHeight : previewHeight 
        }}
        transition={{ 
          duration: 0.35, 
          ease: [0.25, 0.1, 0.25, 1]
        }}
        className="overflow-hidden"
        style={{ willChange: 'height' }}
      >
        <p className="text-sm text-muted-foreground leading-relaxed" style={{ lineHeight: `${lineHeight}px` }}>
          {text}
        </p>
      </motion.div>

      {/* 展开/折叠按钮 */}
      <AnimatePresence>
        <motion.button
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          {isExpanded ? (
            <>
              <span>收起</span>
              <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              <span>展开</span>
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </AnimatePresence>
    </div>
  )
}

/**
 * 简化的展开文本 hook
 */
export function useExpandableText(
  text: string,
  font: string = '14px Inter',
  maxWidth: number = 280,
  lineHeight: number = 22,
  previewLines: number = 3
) {
  const [isExpanded, setIsExpanded] = useState(false)

  const dimensions = useMemo(() => {
    if (!text) return { previewHeight: 0, fullHeight: 0, totalLines: 0, needsExpansion: false }

    try {
      const prepared = prepare(text, font)
      const full = layout(prepared, maxWidth, lineHeight)
      const preview = layout(prepared, maxWidth, lineHeight * previewLines)

      return {
        previewHeight: preview.height,
        fullHeight: full.height,
        totalLines: full.lineCount,
        needsExpansion: full.lineCount > previewLines
      }
    } catch (error) {
      console.error('Expandable text calculation error:', error)
      const avgCharsPerLine = Math.floor(maxWidth / 7)
      const lines = Math.ceil(text.length / avgCharsPerLine)
      return {
        previewHeight: Math.min(lines, previewLines) * lineHeight,
        fullHeight: lines * lineHeight,
        totalLines: lines,
        needsExpansion: lines > previewLines
      }
    }
  }, [text, font, maxWidth, lineHeight, previewLines])

  return {
    ...dimensions,
    isExpanded,
    setIsExpanded,
    toggle: () => setIsExpanded(!isExpanded)
  }
}
