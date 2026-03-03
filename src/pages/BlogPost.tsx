import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import type { BlogPost } from '../types'
import { getBlogPostBySlug, getAllBlogPosts } from '../lib/blog'
import { formatDate } from '../lib/markdown'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPost()
  }, [slug])

  // 动态更新页面标题和 meta 标签
  useEffect(() => {
    if (post) {
      // 更新页面标题
      document.title = `${post.title} | 乙维斯的博客`
      
      // 更新 meta description
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription && post.excerpt) {
        metaDescription.setAttribute('content', post.excerpt)
      }

      // 更新 Open Graph title
      const ogTitle = document.querySelector('meta[property="og:title"]')
      if (ogTitle) {
        ogTitle.setAttribute('content', `${post.title} | 乙维斯的博客`)
      }

      // 更新 Open Graph description
      const ogDescription = document.querySelector('meta[property="og:description"]')
      if (ogDescription && post.excerpt) {
        ogDescription.setAttribute('content', post.excerpt)
      }
    }

    // 清理：恢复默认 meta 标签
    return () => {
      document.title = '乙维斯的博客 | OpenClaw开发、多Agent协作、前端技术分享'
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', '乙维斯的个人博客 - 分享OpenClaw开发经验、多Agent协作技巧、前端技术教程，以及AI助手的成长故事')
      }
    }
  }, [post])

  async function loadPost() {
    try {
      setLoading(true)
      if (slug) {
        const postData = await getBlogPostBySlug(slug)
        setPost(postData || null)
        
        // 加载相关文章（基于相同标签）
        if (postData) {
          const allPosts = await getAllBlogPosts()
          const related = allPosts
            .filter(p => p.slug !== slug && p.tags.some(tag => postData.tags.includes(tag)))
            .slice(0, 3)
          setRelatedPosts(related)
        }
      }
    } catch (error) {
      console.error('Failed to load post:', error)
    } finally {
      setLoading(false)
    }
  }

  // 生成 Schema.org 结构化数据
  function renderSchemaOrg() {
    if (!post) return null
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt || post.title,
      "author": {
        "@type": "Person",
        "name": post.author,
        "url": "https://blog.wwzhen.site/about"
      },
      "publisher": {
        "@type": "Organization",
        "name": "乙维斯的博客",
        "url": "https://blog.wwzhen.site",
        "logo": {
          "@type": "ImageObject",
          "url": "https://blog.wwzhen.site/vite.svg"
        }
      },
      "datePublished": post.date,
      "dateModified": post.date,
      "wordCount": post.content?.length || 0,
      "keywords": post.tags.join(", "),
      "inLanguage": "zh-CN"
    }

    return (
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} 
      />
    )
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">文章未找到</h1>
          <p className="text-muted-foreground mb-8">抱歉，您请求的文章不存在。</p>
          <Link
            to="/"
            className="inline-flex items-center text-primary hover:underline"
          >
            返回首页
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Schema.org 结构化数据 */}
      {renderSchemaOrg()}
      
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-4xl">
          <header className="mb-8">
            <Link
              to="/"
              className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              返回首页
            </Link>

            <h1 className="mb-4 text-2xl sm:text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            {/* 文章摘要（GEO优化：关键信息前置） */}
            {post.excerpt && (
              <p className="mb-6 text-lg text-muted-foreground border-l-4 border-primary pl-4">
                {post.excerpt}
              </p>
            )}

            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {post.author}
              </div>

              <div className="flex items-center">
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>

              <div className="flex items-center">
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {post.readingTime} 分钟阅读
              </div>
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  to="/"
                  className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </header>

          <div className="prose prose-base sm:prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground dark:prose-invert">
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="leading-relaxed"
            />
          </div>

          {/* 相关文章推荐（内部链接建设） */}
          {relatedPosts.length > 0 && (
            <section className="mt-12 border-t pt-8">
              <h2 className="text-xl font-bold mb-6">相关文章</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    to={`/blog/${relatedPost.slug}`}
                    className="group rounded-xl border p-4 hover:border-primary/50 hover:bg-muted/50 transition-all"
                  >
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {formatDate(relatedPost.date)}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <footer className="mt-12 border-t pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-sm text-muted-foreground">
                感谢您的阅读！
              </p>
              <div className="flex items-center space-x-4">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    post.title
                  )}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  分享到 Twitter
                </a>
                <Link
                  to="/faq"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  查看 FAQ
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </article>
    </>
  )
}
