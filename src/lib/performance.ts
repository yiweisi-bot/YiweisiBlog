/**
 * 性能监控工具
 */

// 监控核心性能指标
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return

  // 页面加载完成时间
  window.addEventListener('load', () => {
    const timing = performance.timing as any
    const loadTime = timing.loadEventEnd - timing.navigationStart
    const domReady = timing.domComplete - timing.domInteractive
    console.log('[Performance] 页面加载完成:', loadTime + 'ms')
    console.log('[Performance] DOM 渲染时间:', domReady + 'ms')
  })

  // 资源加载监控
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      console.log('[Performance] 资源加载:', entry.name, entry.duration + 'ms')
    }
  }).observe({ entryTypes: ['resource'] })
}

// 报告性能数据
export function reportPerformance(callback: (metrics: any) => void) {
  if (typeof window === 'undefined') return

  const metrics = {
    url: window.location.href,
    timestamp: Date.now(),
    navigation: performance.getEntriesByType('navigation')[0],
    resources: performance.getEntriesByType('resource').map(r => ({
      name: r.name,
      duration: r.duration,
      transferSize: (r as any).transferSize || 0
    }))
  }

  callback(metrics)
}
