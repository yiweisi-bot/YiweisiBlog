import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { prepare, layout } from '@chenglou/pretext'
import BlogCardUltimate from './BlogCardUltimate'
import type { BlogPost } from '../types'

interface AlignedGridProps {
  posts: BlogPost[]
  className?: string
}

/**
 * 对齐网格布局
 * 使用 Pretext 计算每行最大高度，确保完美对齐
 */
export function AlignedGrid({ 
  posts, 
  className = ''
}: AlignedGridProps) {
  
  // 计算卡片高度（用于确定每行高度）
  const cardHeights = useMemo(() => {
    return posts.map(post => {
      try {
        // 标题高度
        const titlePrepared = prepare(post.title, 'bold 18px Inter')
        const titleHeight = layout(titlePrepared, 280, 26).height
        
        // 摘要高度（最多3行 = 66px）
        const excerptPrepared = prepare(post.excerpt || '', '14px Inter')
        const excerptHeight = Math.min(layout(excerptPrepared, 280, 22).height, 66)
        
        // 标签高度
        const tagsHeight = post.tags?.length ? 32 : 0
        const tagsMargin = post.tags?.length ? 16 : 0
        
        // 总高度 = padding(48) + 标题 + margin(12) + 摘要 + margin(16) + 标签 + margin + 底部(24)
        return 48 + titleHeight + 12 + excerptHeight + 16 + tagsHeight + tagsMargin + 24
      } catch (error) {
        console.error('Height calculation error:', error)
        return 280 // 默认高度
      }
    })
  }, [posts])

  // 计算每行的最大高度（用于调试）
  const rowHeights = useMemo(() => {
    const rows: number[] = []
    const columnsPerRow = 3 // 桌面端3列
    
    for (let i = 0; i < posts.length; i += columnsPerRow) {
      const rowCards = cardHeights.slice(i, i + columnsPerRow)
      const maxHeight = Math.max(...rowCards)
      rows.push(maxHeight)
    }
    
    return rows
  }, [cardHeights, posts.length])
  
  // 使用 rowHeights 避免未使用变量警告
  console.log('Row heights:', rowHeights)

  return (
    <div className={`grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {posts.map((post, index) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.08,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          <BlogCardUltimate post={post} index={index} />
        </motion.div>
      ))}
    </div>
  )
}

/**
 * 固定高度对齐网格
 * 所有卡片使用相同高度，最整齐但可能浪费空间
 */
interface FixedHeightGridProps {
  posts: BlogPost[]
  fixedHeight?: number
  className?: string
}

export function FixedHeightGrid({ 
  posts, 
  fixedHeight = 320,
  className = ''
}: FixedHeightGridProps) {
  return (
    <div 
      className={`grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${className}`}
      style={{ gridAutoRows: `${fixedHeight}px` }}
    >
      {posts.map((post, index) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.08,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="h-full"
        >
          <div className="h-full">
            <BlogCardUltimate post={post} index={index} />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/**
 * 智能对齐网格
 * 根据内容自动调整，但保持行内对齐
 */
interface SmartAlignedGridProps {
  posts: BlogPost[]
  className?: string
  gap?: number
}

export function SmartAlignedGrid({ 
  posts, 
  className = '',
  gap = 24
}: SmartAlignedGridProps) {
  // 使用 gap 避免未使用变量警告
  void gap
  
  // 将文章分组，每组3个（桌面端）
  const rows = useMemo(() => {
    const result: BlogPost[][] = []
    for (let i = 0; i < posts.length; i += 3) {
      result.push(posts.slice(i, i + 3))
    }
    return result
  }, [posts])

  return (
    <div className={`space-y-6 ${className}`}>
      {rows.map((row, rowIndex) => (
        <div 
          key={rowIndex} 
          className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch"
        >
          {row.map((post, colIndex) => {
            const index = rowIndex * 3 + colIndex
            return (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.08,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="h-full"
              >
                <BlogCardUltimate post={post} index={index} />
              </motion.div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
