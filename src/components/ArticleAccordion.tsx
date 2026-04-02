import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { prepare, layout } from '@chenglou/pretext'

interface Section {
  id: string
  title: string
  content: string
}

interface ArticleAccordionProps {
  sections: Section[]
  className?: string
}

/**
 * 手风琴文章目录组件
 * 使用 Pretext 计算高度，实现丝滑展开/折叠
 */
export function ArticleAccordion({ sections, className = '' }: ArticleAccordionProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())

  const toggleSection = (id: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  // 使用 Pretext 计算每个部分的高度
  const sectionHeights = useMemo(() => {
    return sections.map(section => {
      try {
        const prepared = prepare(section.content, '16px Inter')
        const metrics = layout(prepared, 600, 26)
        
        // 计算行数
        const lineCount = Math.ceil(metrics.height / 26)
        
        return {
          id: section.id,
          height: metrics.height,
          lineCount,
          display: `${lineCount} 行 · ${Math.round(metrics.height)}px`
        }
      } catch (error) {
        return {
          id: section.id,
          height: 100,
          lineCount: 4,
          display: '4 行 · 100px'
        }
      }
    })
  }, [sections])

  return (
    <div className={`space-y-3 ${className}`}>
      {sections.map((section, index) => {
        const heightInfo = sectionHeights[index]
        const isExpanded = expandedSections.has(section.id)

        return (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-xl border border-border bg-card overflow-hidden"
          >
            {/* 标题按钮 */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-semibold text-foreground">
                  {section.title}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground tabular-nums">
                  {heightInfo.display}
                </span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </motion.div>
              </div>
            </button>

            {/* 内容区域 */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-0">
                    <div className="pl-8 border-l-2 border-primary/20">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}

/**
 * 文章大纲导航组件
 */
interface ArticleOutlineProps {
  headings: Array<{ id: string; text: string; level: number }>
  activeId?: string
  onHeadingClick?: (id: string) => void
}

export function ArticleOutline({ headings, activeId, onHeadingClick }: ArticleOutlineProps) {
  return (
    <nav className="sticky top-24 space-y-1">
      <h3 className="text-sm font-semibold text-foreground mb-3">目录</h3>
      {headings.map((heading, index) => {
        const isActive = heading.id === activeId
        
        return (
          <motion.button
            key={heading.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onHeadingClick?.(heading.id)}
            className={`w-full text-left text-sm py-1.5 px-2 rounded transition-colors ${
              isActive 
                ? 'bg-primary/10 text-primary font-medium' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
            style={{ paddingLeft: `${(heading.level - 1) * 12 + 8}px` }}
          >
            {heading.text}
          </motion.button>
        )
      })}
    </nav>
  )
}

/**
 * 可折叠代码块
 */
interface CollapsibleCodeProps {
  code: string
  language?: string
  title?: string
}

export function CollapsibleCode({ code, language = 'typescript', title }: CollapsibleCodeProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // 计算代码高度
  const codeHeight = useMemo(() => {
    const lineCount = code.split('\n').length
    return Math.min(lineCount * 24 + 32, 400) // 最大高度 400px
  }, [code])

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* 头部 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 bg-muted/30 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground">{language}</span>
          {title && <span className="text-sm font-medium">{title}</span>}
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </button>

      {/* 代码内容 */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: codeHeight }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <pre className="p-4 text-xs font-mono text-foreground overflow-auto h-full">
              <code>{code}</code>
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
