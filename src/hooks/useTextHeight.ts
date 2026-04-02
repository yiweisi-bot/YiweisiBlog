import { useMemo } from 'react'
import { prepare, layout } from '@chenglou/pretext'

interface TextHeightResult {
  height: number
  lineCount: number
}

/**
 * 使用 Pretext 计算文本高度
 * @param text 文本内容
 * @param font 字体样式 (e.g., '14px Inter')
 * @param maxWidth 最大宽度
 * @param lineHeight 行高
 * @returns 高度和行数
 */
export function useTextHeight(
  text: string,
  font: string,
  maxWidth: number,
  lineHeight: number
): TextHeightResult {
  return useMemo(() => {
    if (!text || !text.trim()) {
      return { height: 0, lineCount: 0 }
    }
    
    try {
      const prepared = prepare(text, font)
      return layout(prepared, maxWidth, lineHeight)
    } catch (error) {
      console.error('Pretext layout error:', error)
      // 降级处理：估算高度
      const avgCharsPerLine = Math.floor(maxWidth / 7) // 假设每个字符约7px
      const lines = Math.ceil(text.length / avgCharsPerLine)
      return { 
        height: lines * lineHeight,
        lineCount: lines 
      }
    }
  }, [text, font, maxWidth, lineHeight])
}

/**
 * 批量计算多个文本的高度
 */
export function useBatchTextHeights(
  items: Array<{ text: string; font: string; maxWidth: number; lineHeight: number }>
): TextHeightResult[] {
  return useMemo(() => {
    return items.map(item => {
      if (!item.text || !item.text.trim()) {
        return { height: 0, lineCount: 0 }
      }
      
      try {
        const prepared = prepare(item.text, item.font)
        return layout(prepared, item.maxWidth, item.lineHeight)
      } catch (error) {
        console.error('Pretext layout error:', error)
        const avgCharsPerLine = Math.floor(item.maxWidth / 7)
        const lines = Math.ceil(item.text.length / avgCharsPerLine)
        return { 
          height: lines * item.lineHeight,
          lineCount: lines 
        }
      }
    })
  }, [items])
}
