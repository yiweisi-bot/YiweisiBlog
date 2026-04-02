import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getCacheStats, clearLayoutCache } from '../hooks/useCachedLayout'

interface PerformanceMetrics {
  fps: number
  memory: number
  layoutCount: number
  cacheHitRate: number
  renderTime: number
}

/**
 * 性能监控组件
 * 开发时显示性能指标
 */
export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memory: 0,
    layoutCount: 0,
    cacheHitRate: 0,
    renderTime: 0
  })
  const [isVisible, setIsVisible] = useState(false)
  const [cacheStats, setCacheStats] = useState({ layoutCacheSize: 0, linesCacheSize: 0 })

  // FPS 计算
  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number

    const calculateFPS = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime - lastTime >= 1000) {
        setMetrics(prev => ({ ...prev, fps: frameCount }))
        frameCount = 0
        lastTime = currentTime
      }
      
      animationId = requestAnimationFrame(calculateFPS)
    }

    animationId = requestAnimationFrame(calculateFPS)
    return () => cancelAnimationFrame(animationId)
  }, [])

  // 内存和缓存监控
  useEffect(() => {
    const interval = setInterval(() => {
      // 获取内存使用情况
      const memory = (performance as any).memory?.usedJSHeapSize / 1024 / 1024 || 0
      
      // 获取缓存统计
      const stats = getCacheStats()
      setCacheStats(stats)
      
      setMetrics(prev => ({
        ...prev,
        memory: Math.round(memory),
        layoutCount: stats.layoutCacheSize + stats.linesCacheSize
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // 键盘快捷键切换显示
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Shift + P 切换性能监控
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
        e.preventDefault()
        setIsVisible(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleClearCache = useCallback(() => {
    clearLayoutCache()
    setCacheStats({ layoutCacheSize: 0, linesCacheSize: 0 })
  }, [])

  // 只在开发环境显示 (通过 import.meta.env 检测)
  const isDev = import.meta.env.DEV
  if (!isDev && !isVisible) {
    return null
  }

  return (
    <>
      {/* 切换按钮 */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-50 p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        title="性能监控 (Ctrl+Shift+P)"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </button>

      {/* 性能面板 */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-16 right-4 z-50 w-72 rounded-xl border border-border bg-card/95 backdrop-blur-sm shadow-xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-foreground">性能监控</h3>
              <button
                onClick={() => setIsVisible(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {/* FPS */}
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">FPS</span>
                <span className={`font-mono font-bold ${
                  metrics.fps >= 55 ? 'text-green-500' : 
                  metrics.fps >= 30 ? 'text-yellow-500' : 'text-red-500'
                }`}>
                  {metrics.fps}
                </span>
              </div>

              {/* 内存 */}
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">内存使用</span>
                <span className="font-mono">{metrics.memory} MB</span>
              </div>

              {/* 缓存 */}
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">布局缓存</span>
                <span className="font-mono">{cacheStats.layoutCacheSize}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">行缓存</span>
                <span className="font-mono">{cacheStats.linesCacheSize}</span>
              </div>

              {/* 总缓存 */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-muted-foreground">总缓存项</span>
                <span className="font-mono font-bold text-primary">
                  {metrics.layoutCount}
                </span>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="mt-3 pt-3 border-t border-border flex gap-2">
              <button
                onClick={handleClearCache}
                className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                清空缓存
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                关闭
              </button>
            </div>

            {/* 提示 */}
            <p className="mt-2 text-[10px] text-muted-foreground text-center">
              快捷键: Ctrl+Shift+P
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/**
 * 页面加载时间监控
 */
export function usePageLoadTime() {
  const [loadTime, setLoadTime] = useState<number>(0)

  useEffect(() => {
    const handleLoad = () => {
      const timing = performance.timing
      const loadTime = timing.loadEventEnd - timing.navigationStart
      setLoadTime(loadTime)
      console.log(`页面加载时间: ${loadTime}ms`)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  return loadTime
}

/**
 * 组件渲染时间监控
 */
export function useRenderTime(componentName: string) {
  const renderCount = useState(0)
  
  useEffect(() => {
    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      const renderTime = endTime - startTime
      if (renderTime > 16) { // 超过一帧的时间
        console.warn(`${componentName} 渲染耗时: ${renderTime.toFixed(2)}ms`)
      }
    }
  })

  return renderCount
}

/**
 * 滚动性能优化
 * 使用 passive 事件监听器
 */
export function useOptimizedScroll(callback: () => void, delay = 16) {
  useEffect(() => {
    let ticking = false
    let rafId: number

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          callback()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [callback, delay])
}
