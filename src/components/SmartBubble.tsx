import { useMemo, useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { prepare, layout } from '@chenglou/pretext'

interface BubbleMessage {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface SmartBubbleProps {
  messages: BubbleMessage[]
  className?: string
}

/**
 * 智能聊天气泡组件
 * 使用 Pretext 找到最紧凑的宽度
 */
export function SmartBubble({ messages, className = '' }: SmartBubbleProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {messages.map((message, index) => (
        <BubbleItem 
          key={message.id} 
          message={message} 
          index={index}
        />
      ))}
    </div>
  )
}

/**
 * 单个气泡组件
 */
function BubbleItem({ message, index }: { message: BubbleMessage; index: number }) {
  const isUser = message.sender === 'user'
  const [containerWidth, setContainerWidth] = useState(600)
  const containerRef = useRef<HTMLDivElement>(null)

  // 监听容器宽度
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // 使用 Pretext 计算最优宽度和行数
  const { optimalWidth, lineCount } = useMemo(() => {
    try {
      const prepared = prepare(message.text, '14px Inter')
      const maxWidth = containerWidth * 0.8
      const metrics = layout(prepared, maxWidth, 22)
      
      // 二分查找最优宽度（保持相同行数）
      let minWidth = 200
      let bestWidth = maxWidth
      const targetLines = metrics.lineCount
      
      while (minWidth < bestWidth - 10) {
        const midWidth = (minWidth + bestWidth) / 2
        const testMetrics = layout(prepared, midWidth, 22)
        
        if (testMetrics.lineCount <= targetLines) {
          bestWidth = midWidth
        } else {
          minWidth = midWidth
        }
      }
      
      return {
        optimalWidth: Math.min(bestWidth + 32, maxWidth),
        lineCount: targetLines
      }
    } catch (error) {
      return {
        optimalWidth: containerWidth * 0.8,
        lineCount: message.text.split('\n').length
      }
    }
  }, [message.text, containerWidth])

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className="flex items-end gap-2 max-w-[80%]">
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs">
            🤖
          </div>
        )}
        
        <motion.div
          layout
          className={`relative px-4 py-3 rounded-2xl ${
            isUser 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-foreground'
          }`}
          style={{ 
            maxWidth: optimalWidth,
            width: 'fit-content'
          }}
        >
          {/* 文字内容 */}
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.text}
          </p>
          
          {/* 时间戳 */}
          <span className={`text-[10px] mt-1 block ${
            isUser ? 'text-primary-foreground/60' : 'text-muted-foreground'
          }`}>
            {message.timestamp.toLocaleTimeString('zh-CN', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
            {' · '}
            {lineCount} 行
          </span>

          {/* 气泡尾巴 */}
          <div 
            className={`absolute bottom-0 w-3 h-3 ${
              isUser ? '-right-1.5' : '-left-1.5'
            }`}
            style={{
              background: isUser ? 'var(--primary)' : 'var(--muted)',
              clipPath: isUser 
                ? 'polygon(0 0, 0 100%, 100% 100%)'
                : 'polygon(100% 0, 100% 100%, 0 100%)'
            }}
          />
        </motion.div>

        {isUser && (
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs">
            👤
          </div>
        )}
      </div>
    </motion.div>
  )
}

/**
 * 评论输入框组件
 */
interface CommentInputProps {
  onSubmit?: (text: string) => void
  placeholder?: string
}

export function CommentInput({ onSubmit, placeholder = '写下你的评论...' }: CommentInputProps) {
  const [text, setText] = useState('')

  // 实时计算输入宽度和行数
  const { calculatedWidth, calculatedLines } = useMemo(() => {
    if (!text) return { calculatedWidth: 0, calculatedLines: 0 }
    try {
      const prepared = prepare(text, '14px Inter')
      const metrics = layout(prepared, 400, 22)
      // 估算宽度：假设平均每个字符 7px
      const estimatedWidth = Math.min(text.length * 7 + 32, 400)
      return { 
        calculatedWidth: estimatedWidth,
        calculatedLines: metrics.lineCount
      }
    } catch (error) {
      return { 
        calculatedWidth: text.length * 14,
        calculatedLines: text.split('\n').length
      }
    }
  }, [text])

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit?.(text)
      setText('')
    }
  }

  return (
    <div className="space-y-3">
      {/* 宽度和行数预览 */}
      {text && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-muted-foreground"
        >
          预计: {Math.round(calculatedWidth)}px · {calculatedLines} 行
        </motion.div>
      )}

      {/* 输入框 */}
      <div className="flex gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className="flex-1 min-h-[80px] p-3 rounded-xl border border-border bg-card resize-y text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
        >
          发送
        </button>
      </div>
    </div>
  )
}

/**
 * 评论展示区
 */
interface CommentSectionProps {
  comments: BubbleMessage[]
  onAddComment?: (text: string) => void
}

export function CommentSection({ comments, onAddComment }: CommentSectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">评论 ({comments.length})</h3>
      
      <SmartBubble messages={comments} />
      
      <div className="pt-4 border-t border-border">
        <CommentInput onSubmit={onAddComment} />
      </div>
    </div>
  )
}
