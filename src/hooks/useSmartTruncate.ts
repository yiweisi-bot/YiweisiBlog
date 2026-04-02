import { useMemo } from 'react'
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

interface SmartTruncateOptions {
  font?: string
  maxWidth?: number
  maxLines?: number
  suffix?: string
}

/**
 * 检测字符是否为中文字符
 */
function isChineseChar(char: string): boolean {
  return /[\u4e00-\u9fa5]/.test(char)
}

/**
 * 在中文字符边界处截断
 * 优先在标点符号或空格处截断
 */
function findChineseBreakPoint(text: string, maxLen: number): number {
  // 如果长度在限制内，直接返回
  if (text.length <= maxLen) return text.length
  
  // 向前查找合适的截断点
  for (let i = maxLen; i > maxLen - 10 && i > 0; i--) {
    const char = text[i]
    // 优先在标点符号处截断
    if (/[，。！？；：""''（）【】]/.test(char)) {
      return i + 1
    }
  }
  
  // 其次在空格处截断
  for (let i = maxLen; i > maxLen - 10 && i > 0; i--) {
    if (text[i] === ' ' || text[i] === '　') {
      return i
    }
  }
  
  // 在中文字符边界处截断（不在汉字中间）
  for (let i = maxLen; i > maxLen - 5 && i > 0; i--) {
    if (!isChineseChar(text[i])) {
      return i
    }
  }
  
  return maxLen
}

/**
 * 智能截断文本，在单词/字符边界处截断
 * 支持中英文混合文本
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
      
      // 检查最后一行是否包含中文字符
      const hasChinese = /[\u4e00-\u9fa5]/.test(lastLine.text)
      
      if (hasChinese) {
        // 中文文本：在字符边界处截断
        const breakPoint = findChineseBreakPoint(lastLine.text, lastLine.text.length - 1)
        truncatedLines[truncatedLines.length - 1] = {
          ...lastLine,
          text: lastLine.text.slice(0, breakPoint) + suffix
        }
      } else {
        // 英文文本：在单词边界处截断
        const words = lastLine.text.trim().split(/\s+/)
        if (words.length > 1) {
          words.pop()
          truncatedLines[truncatedLines.length - 1] = {
            ...lastLine,
            text: words.join(' ') + suffix
          }
        } else {
          truncatedLines[truncatedLines.length - 1] = {
            ...lastLine,
            text: lastLine.text.slice(0, -3) + suffix
          }
        }
      }

      return truncatedLines.map(l => l.text).join('')
    } catch (error) {
      console.error('Smart truncate error:', error)
      // 降级处理：简单截断
      const avgCharsPerLine = Math.floor(maxWidth / 7)
      const maxChars = avgCharsPerLine * maxLines
      if (text.length <= maxChars) return text
      
      // 使用中文友好的截断
      const breakPoint = findChineseBreakPoint(text, maxChars - suffix.length)
      return text.slice(0, breakPoint) + suffix
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
