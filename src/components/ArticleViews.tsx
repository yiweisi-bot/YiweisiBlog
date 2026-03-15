import { useEffect, useState } from 'react'
import { getViewCount } from '../lib/analytics'

interface ArticleViewsProps {
  slug: string
}

export function ArticleViews({ slug }: ArticleViewsProps) {
  const [views, setViews] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const count = await getViewCount(`/blog/${slug}`)
        setViews(count)
      } catch (error) {
        console.error('获取阅读量失败:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchViews()
  }, [slug])

  if (loading) return <span className="text-gray-400">加载中...</span>
  
  return (
    <span className="text-gray-500 text-sm flex items-center gap-1">
      <svg 
        className="w-4 h-4" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
        />
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
        />
      </svg>
      {views.toLocaleString()} 次阅读
    </span>
  )
}
