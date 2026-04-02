import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { prepare, layout } from '@chenglou/pretext'
import BlogCardV2 from './BlogCardV2'
import type { BlogPost } from '../types'

interface MasonryGridProps {
  posts: BlogPost[]
  columnCount?: number
  gap?: number
}

/**
 * Masonry 瀑布流布局组件
 * 使用 Pretext 预计算每个卡片的高度，实现真正的瀑布流效果
 */
export function MasonryGrid({ 
  posts, 
  columnCount = 3,
  gap = 24 
}: MasonryGridProps) {
  
  // 计算每列的宽度
  const columnWidth = useMemo(() => {
    // 假设容器最大宽度为 1200px
    const containerWidth = 1200
    const totalGap = gap * (columnCount - 1)
    return Math.floor((containerWidth - totalGap) / columnCount)
  }, [columnCount, gap])

  // 预计算每个卡片的高度
  const itemHeights = useMemo(() => {
    return posts.map(post => {
      try {
        // 计算标题高度
        const titlePrepared = prepare(post.title, 'bold 18px Inter')
        const titleMetrics = layout(titlePrepared, columnWidth - 48, 26)
        
        // 计算摘要高度（限制3行）
        const excerptPrepared = prepare(post.excerpt || '', '14px Inter')
        const excerptMetrics = layout(excerptPrepared, columnWidth - 48, 22)
        
        // 计算标签高度
        const tagsHeight = post.tags?.length ? 32 : 0
        
        // 总高度 = padding + 标题 + margin + 摘要 + margin + 标签 + margin + 底部信息
        const totalHeight = 48 + titleMetrics.height + 12 + 
                           Math.min(excerptMetrics.height, 66) + 16 + 
                           tagsHeight + 16 + 24
        
        return totalHeight
      } catch (error) {
        console.error('Masonry height calculation error:', error)
        // 降级处理：使用估算高度
        return 280
      }
    })
  }, [posts, columnWidth])

  // 计算每个卡片的位置
  const positions = useMemo(() => {
    // 初始化每列的高度
    const columnHeights: number[] = new Array(columnCount).fill(0)
    
    return posts.map((_, index) => {
      // 找到最短的列
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights))
      
      const x = shortestColumnIndex * (columnWidth + gap)
      const y = columnHeights[shortestColumnIndex]
      
      // 更新该列的高度
      columnHeights[shortestColumnIndex] += itemHeights[index] + gap
      
      return { x, y, column: shortestColumnIndex }
    })
  }, [posts, itemHeights, columnCount, columnWidth, gap])

  // 计算容器总高度
  const containerHeight = useMemo(() => {
    const columnHeights: number[] = new Array(columnCount).fill(0)
    
    positions.forEach((pos, index) => {
      columnHeights[pos.column] = Math.max(
        columnHeights[pos.column],
        pos.y + itemHeights[index]
      )
    })
    
    return Math.max(...columnHeights)
  }, [positions, itemHeights, columnCount])



  return (
    <div 
      className="relative w-full"
      style={{ height: containerHeight }}
    >
      {posts.map((post, index) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.4, 
            delay: index * 0.05,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="absolute"
          style={{
            width: columnWidth,
            left: positions[index].x,
            top: positions[index].y
          }}
        >
          <BlogCardV2 post={post} variant="masonry" index={index} />
        </motion.div>
      ))}
    </div>
  )
}

/**
 * 响应式 Masonry Grid
 * 根据屏幕宽度自动调整列数
 */
export function ResponsiveMasonryGrid({ posts }: { posts: BlogPost[] }) {
  return (
    <>
      <div className="hidden lg:block">
        <MasonryGrid posts={posts} columnCount={3} gap={24} />
      </div>
      <div className="hidden md:block lg:hidden">
        <MasonryGrid posts={posts} columnCount={2} gap={20} />
      </div>
      <div className="block md:hidden">
        <div className="grid gap-6">
          {posts.map((post, index) => (
            <BlogCardV2 key={post.slug} post={post} index={index} />
          ))}
        </div>
      </div>
    </>
  )
}
