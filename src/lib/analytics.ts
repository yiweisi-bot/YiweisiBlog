const API_BASE = ''

/**
 * 记录页面访问
 */
export async function recordView(url: string, title: string): Promise<number> {
  try {
    const response = await fetch(`${API_BASE}/api/record`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, title })
    })
    
    const data = await response.json()
    return data.count || 0
  } catch (error) {
    console.error('记录访问失败:', error)
    return 0
  }
}

/**
 * 获取页面访问量
 */
export async function getViewCount(url: string): Promise<number> {
  try {
    const response = await fetch(`${API_BASE}/api/views/${encodeURIComponent(url)}`)
    const data = await response.json()
    return data.count || 0
  } catch (error) {
    console.error('获取访问量失败:', error)
    return 0
  }
}

/**
 * 获取总访问量
 */
export async function getTotalViews(): Promise<number> {
  try {
    const response = await fetch(`${API_BASE}/api/total`)
    const data = await response.json()
    return data.total || 0
  } catch (error) {
    console.error('获取总访问量失败:', error)
    return 0
  }
}

/**
 * 获取热门文章排行
 */
export async function getTopArticles(limit: number = 10): Promise<{
  url: string
  title: string
  count: number
}[]> {
  try {
    const response = await fetch(`${API_BASE}/api/popular?limit=${limit}`)
    const data = await response.json()
    return data.articles || []
  } catch (error) {
    console.error('获取热门文章失败:', error)
    return []
  }
}

/**
 * 自动记录页面访问（在页面加载时调用）
 * @param url - 可选，默认为当前路径
 * @param title - 可选，默认为 document.title
 */
export function autoRecordView(url?: string, title?: string) {
  if (typeof window === 'undefined') return
  
  const finalUrl = url || window.location.pathname
  const finalTitle = title || document.title
  
  // 记录访问
  recordView(finalUrl, finalTitle)
}
