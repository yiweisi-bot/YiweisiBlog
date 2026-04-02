import { useMemo } from 'react'
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

interface SmartTruncateOptions {
  font?: string
  maxWidth?: number
  maxLines?: number
  suffix?: string
}

/**
 * 智能截断文本，在单词边界处截断
 * @param text 原始文本
 * @param options 配置选项
 * @returns 截断后的文本
 */
export function useSmartTruncate(
  text: string,
  options: SmartTruncateOptions = {}
): string {
  const {
    font = '14px Inter',
    maxWidth = 280,
    maxLines = 3,
    suffix = '...'
  } = options

  return useMemo(() => {
    if (!text || !text.trim()) return ''

    try {
      const prepared = prepareWithSegments(text, font)
      const { lines } = layoutWithLines(prepared, maxWidth, 22)

      // 如果行数不超过限制，直接返回原文
      if (lines.length <= maxLines) return text

      // 截断到 maxLines 行
      const truncatedLines = lines.slice(0, maxLines)
      const lastLine = truncatedLines[truncatedLines.length - 1]

      // 在单词边界处截断
      const words = lastLine.text.trim().split(/\s+/)
      if (words.length > 1) {
        words.pop() // 移除最后一个可能不完整的单词
        truncatedLines[truncatedLines.length - 1] = {
          ...lastLine,
          text: words.join(' ') + suffix
        }
      } else {
        // 如果只有一个单词，直接截断并添加省略号
        truncatedLines[truncatedLines.length - 1] = {
          ...lastLine,
          text: lastLine.text.slice(0, -3) + suffix
        }
      }

      return truncatedLines.map(l => l.text).join(' ')
    } catch (error) {
      console.error('Smart truncate error:', error)
      // 降级处理：简单截断
      const avgCharsPerLine = Math.floor(maxWidth / 7)
      const maxChars = avgCharsPerLine * maxLines
      if (text.length <= maxChars) return text
      return text.slice(0, maxChars - 3) + suffix
    }
  }, [text, font, maxWidth, maxLines, suffix])
}

/**
 * 计算文本需要的行数
 */
export function useTextLineCount(
  text: string,
  font: string = '14px Inter',
  maxWidth: number = 280
): number {
  return useMemo(() => {
    if (!text || !text.trim()) return 0

    try {
      const prepared = prepareWithSegments(text, font)
      const { lines } = layoutWithLines(prepared, maxWidth, 22)
      return lines.length
    } catch (error) {
      console.error('Line count error:', error)
      const avgCharsPerLine = Math.floor(maxWidth / 7)
      return Math.ceil(text.length / avgCharsPerLine)
    }
  }, [text, font, maxWidth])
}
