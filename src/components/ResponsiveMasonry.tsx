import { useMemo, useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { prepare, layout } from '@chenglou/pretext'
import BlogCardV3 from './BlogCardV3'
import type { BlogPost } from '../types'

interface ResponsiveMasonryProps {
  posts: BlogPost[]
  gap?: number
  className?: string
}

/**
 * 响应式 Masonry 瀑布流布局
 * 根据容器宽度自动计算列数和布局
 */
export function ResponsiveMasonry({ 
  posts, 
  gap = 24,
  className = ''
}: ResponsiveMasonryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [columnCount, setColumnCount] = useState(3)

  // 监听容器宽度变化
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        setContainerWidth(width)
        
        // 根据宽度决定列数
        if (width < 640) {
          setColumnCount(1)
        } else if (width < 1024) {
          setColumnCount(2)
        } else {
          setColumnCount(3)
        }
      }
    }

    // 初始计算
    updateWidth()

    // 使用 ResizeObserver 监听尺寸变化
    const resizeObserver = new ResizeObserver(updateWidth)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => resizeObserver.disconnect()
  }, [])

  // 计算每列宽度
  const columnWidth = useMemo(() => {
    if (columnCount === 1) return containerWidth
    const totalGap = gap * (columnCount - 1)
    return Math.floor((containerWidth - totalGap) / columnCount)
  }, [containerWidth, columnCount, gap])

  // 预计算每个卡片的高度
  const itemHeights = useMemo(() => {
    if (!columnWidth) return posts.map(() => 300) // 默认高度

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
        const tagsMargin = post.tags?.length ? 16 : 0
        
        // 总高度 = padding + 标题 + margin + 摘要 + margin + 标签 + margin + 底部信息
        const totalHeight = 48 + titleMetrics.height + 12 + 
                           Math.min(excerptMetrics.height, 66) + 16 + 
                           tagsHeight + tagsMargin + 24
        
        return totalHeight
      } catch (error) {
        console.error('Masonry height calculation error:', error)
        return 280
      }
    })
  }, [posts, columnWidth])

  // 计算每个卡片的位置
  const { positions, containerHeight } = useMemo(() => {
    if (columnCount === 1) {
      // 单列布局
      let currentY = 0
      const positions = posts.map((_, index) => {
        const y = currentY
        currentY += itemHeights[index] + gap
        return { x: 0, y, column: 0 }
      })
      return { positions, containerHeight: currentY - gap }
    }

    // 多列 Masonry 布局
    const columnHeights: number[] = new Array(columnCount).fill(0)
    
    const positions = posts.map((_, index) => {
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights))
      const x = shortestColumnIndex * (columnWidth + gap)
      const y = columnHeights[shortestColumnIndex]
      
      columnHeights[shortestColumnIndex] += itemHeights[index] + gap
      
      return { x, y, column: shortestColumnIndex }
    })

    const maxHeight = Math.max(...columnHeights) - gap
    
    return { positions, containerHeight: maxHeight }
  }, [posts, itemHeights, columnCount, columnWidth, gap])

  // 如果没有容器宽度，显示加载状态
  if (!containerWidth) {
    return (
      <div ref={containerRef} className={`w-full ${className}`}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 6).map((post, index) => (
            <BlogCardV3 key={post.slug} post={post} index={index} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef} 
      className={`w-full ${className}`}
    >
      {columnCount === 1 ? (
        // 单列布局：使用普通网格
        <div className="grid gap-6">
          {posts.map((post, index) => (
            <BlogCardV3 key={post.slug} post={post} index={index} />
          ))}
        </div>
      ) : (
        // Masonry 布局
        <div 
          className="relative w-full"
          style={{ height: containerHeight }}
        >
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.08,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="absolute"
              style={{
                width: columnWidth,
                left: positions[index].x,
                top: positions[index].y
              }}
            >
              <BlogCardV3 post={post} variant="masonry" index={index} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * 带筛选的 Masonry 布局
 * 支持标签筛选和搜索
 */
interface FilterableMasonryProps extends ResponsiveMasonryProps {
  selectedTags: string[]
  searchQuery: string
}

export function FilterableMasonry({
  posts,
  selectedTags,
  searchQuery,
  gap = 24,
  className = ''
}: FilterableMasonryProps) {
  // 过滤文章
  const filteredPosts = useMemo(() => {
    let result = posts

    // 标签筛选
    if (selectedTags.length > 0) {
      result = result.filter(post => 
        selectedTags.some(tag => post.tags.includes(tag))
      )
    }

    // 搜索筛选
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    return result
  }, [posts, selectedTags, searchQuery])

  return (
    <ResponsiveMasonry 
      posts={filteredPosts} 
      gap={gap} 
      className={className}
    />
  )
}

/**
 * 分页 Masonry 布局
 */
interface PaginatedMasonryProps extends ResponsiveMasonryProps {
  postsPerPage?: number
}

export function PaginatedMasonry({
  posts,
  postsPerPage = 9,
  gap = 24,
  className = ''
}: PaginatedMasonryProps) {
  const [currentPage, setCurrentPage] = useState(1)
  
  const totalPages = Math.ceil(posts.length / postsPerPage)
  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage
    return posts.slice(start, start + postsPerPage)
  }, [posts, currentPage, postsPerPage])

  return (
    <div className={className}>
      <ResponsiveMasonry posts={currentPosts} gap={gap} />
      
      {/* 分页控制 */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-border bg-card disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
          >
            上一页
          </button>
          
          <span className="text-sm text-muted-foreground">
            {currentPage} / {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-border bg-card disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
          >
            下一页
          </button>
        </div>
      )}
    </div>
  )
}