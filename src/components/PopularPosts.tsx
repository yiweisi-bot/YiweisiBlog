import { useEffect, useState } from 'react'
import { getTopArticles } from '../lib/analytics'
import { getAllBlogPosts } from '../lib/blog'
import { Link } from 'react-router-dom'

export function PopularPosts({ limit = 5 }: { limit?: number }) {
  const [articles, setArticles] = useState<Array<{
    url: string
    title: string
    count: number
  }>>([])

  useEffect(() => {
    Promise.all([
      getTopArticles(limit),
      getAllBlogPosts()
    ]).then(([popularArticles, allPosts]) => {
      // 根据 URL 匹配真实文章标题
      const enrichedArticles = popularArticles.map(article => {
        // 从 URL 提取 slug: /blog/openclaw-daily-2026-03-09 -> openclaw-daily-2026-03-09
        const slug = article.url.replace('/blog/', '')
        const matchedPost = allPosts.find(post => post.slug === slug)
        
        return {
          ...article,
          title: matchedPost ? matchedPost.title : article.title
        }
      })
      setArticles(enrichedArticles)
    })
  }, [limit])

  if (articles.length === 0) return null

  return (
    <div className="popular-posts overflow-hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
        <span>🔥</span> 热门文章
      </h3>
      <ul className="space-y-2 sm:space-y-3 overflow-hidden">
        {articles.map((article, index) => (
          <li key={article.url} className="flex items-center gap-2 overflow-hidden">
            <Link 
              to={article.url}
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 flex-1 min-w-0 text-xs sm:text-sm overflow-hidden" 
              title={article.title}
            >
              <span className="text-gray-400 mr-1 sm:mr-2 whitespace-nowrap">{index + 1}.</span>
              <span className="truncate block">{article.title}</span>
            </Link>
            <span className="text-gray-400 text-xs whitespace-nowrap flex-shrink-0">
              {article.count.toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
