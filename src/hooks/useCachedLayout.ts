import { useMemo } from 'react'
import { prepare, layout, prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

// 全局缓存
const layoutCache = new Map<string, { height: number; lineCount: number }>()
const linesCache = new Map<string, { height: number; lineCount: number; lines: any[] }>()

interface LayoutCacheKey {
  text: string
  font: string
  maxWidth: number
  lineHeight: number
}

function generateCacheKey(key: LayoutCacheKey): string {
  return `${key.text.slice(0, 50)}_${key.font}_${key.maxWidth}_${key.lineHeight}`
}

/**
 * 带缓存的文本高度计算
 * 大幅提升重复计算的性能
 */
export function useCachedLayout(
  text: string,
  font: string,
  maxWidth: number,
  lineHeight: number
) {
  const cacheKey = useMemo(() => 
    generateCacheKey({ text, font, maxWidth, lineHeight }),
    [text, font, maxWidth, lineHeight]
  )

  return useMemo(() => {
    if (!text || !text.trim()) {
      return { height: 0, lineCount: 0 }
    }

    // 检查缓存
    if (layoutCache.has(cacheKey)) {
      return layoutCache.get(cacheKey)!
    }

    try {
      const prepared = prepare(text, font)
      const result = layout(prepared, maxWidth, lineHeight)
      
      // 存入缓存
      layoutCache.set(cacheKey, result)
      
      // 限制缓存大小
      if (layoutCache.size > 1000) {
        const firstKey = layoutCache.keys().next().value
        if (firstKey) layoutCache.delete(firstKey)
      }
      
      return result
    } catch (error) {
      console.error('Cached layout error:', error)
      const avgCharsPerLine = Math.floor(maxWidth / 7)
      const lines = Math.ceil(text.length / avgCharsPerLine)
      return { height: lines * lineHeight, lineCount: lines }
    }
  }, [cacheKey, text, font, maxWidth, lineHeight])
}

/**
 * 带缓存的行布局计算
 */
export function useCachedLines(
  text: string,
  font: string,
  maxWidth: number,
  lineHeight: number
) {
  const cacheKey = useMemo(() => 
    generateCacheKey({ text, font, maxWidth, lineHeight }),
    [text, font, maxWidth, lineHeight]
  )

  return useMemo(() => {
    if (!text || !text.trim()) {
      return { height: 0, lineCount: 0, lines: [] }
    }

    // 检查缓存
    if (linesCache.has(cacheKey)) {
      return linesCache.get(cacheKey)!
    }

    try {
      const prepared = prepareWithSegments(text, font)
      const result = layoutWithLines(prepared, maxWidth, lineHeight)
      
      // 存入缓存
      linesCache.set(cacheKey, result)
      
      // 限制缓存大小
      if (linesCache.size > 500) {
        const firstKey = linesCache.keys().next().value
        if (firstKey) linesCache.delete(firstKey)
      }
      
      return result
    } catch (error) {
      console.error('Cached lines error:', error)
      const avgCharsPerLine = Math.floor(maxWidth / 7)
      const lines = Math.ceil(text.length / avgCharsPerLine)
      return { height: lines * lineHeight, lineCount: lines, lines: [] }
    }
  }, [cacheKey, text, font, maxWidth, lineHeight])
}

/**
 * 批量预计算布局（用于构建时）
 */
export function batchPrecomputeLayouts(
  items: Array<{ text: string; font: string; maxWidth: number; lineHeight: number }>
): Array<{ height: number; lineCount: number }> {
  return items.map(item => {
    const cacheKey = generateCacheKey(item)
    
    if (layoutCache.has(cacheKey)) {
      return layoutCache.get(cacheKey)!
    }

    try {
      const prepared = prepare(item.text, item.font)
      const result = layout(prepared, item.maxWidth, item.lineHeight)
      layoutCache.set(cacheKey, result)
      return result
    } catch (error) {
      const avgCharsPerLine = Math.floor(item.maxWidth / 7)
      const lines = Math.ceil(item.text.length / avgCharsPerLine)
      return { height: lines * item.lineHeight, lineCount: lines }
    }
  })
}

/**
 * 清空缓存
 */
export function clearLayoutCache() {
  layoutCache.clear()
  linesCache.clear()
}

/**
 * 获取缓存统计
 */
export function getCacheStats() {
  return {
    layoutCacheSize: layoutCache.size,
    linesCacheSize: linesCache.size
  }
}
