import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // 代码分割优化
    rollupOptions: {
      output: {
        manualChunks: {
          // React 相关单独打包
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // 动画库单独打包
          'animation-vendor': ['framer-motion'],
          // Markdown 解析单独打包
          'markdown-vendor': ['remark', 'remark-html', 'remark-gfm', 'rehype-highlight', 'rehype-katex'],
          // 图标库单独打包
          'icons-vendor': ['lucide-react']
        }
      }
    },
    // 使用 esbuild 压缩（更快，无需额外依赖）
    minify: 'esbuild',
    esbuildOptions: {
      // 生产环境移除 console.log
      drop: ['console', 'debugger'],
      // 保持类名（某些库需要）
      keepNames: true,
      // 更激进的压缩
      legalComments: 'none'
    },
    // 资源内联阈值 (4kb)
    assetsInlineLimit: 4096,
    // 不生成 sourcemap（生产环境）
    sourcemap: false,
    // chunk 大小警告限制
    chunkSizeWarningLimit: 500,
    // 静态资源目录
    assetsDir: 'static',
    // 目标浏览器（启用更多现代优化）
    target: 'esnext',
    // CSS 代码分割
    cssCodeSplit: true,
    // 滚动标记
    cssMinify: true,
    // 模块预加载优化
    modulePreload: {
      polyfill: true,
      resolveDependencies: (filename, deps) => deps
    },
    // 构建报告
    reportCompressedSize: true,
    // 并行构建
    workers: true
  },
  // CSS 代码分割
  cssCodeSplit: true,
  // 预加载模块
  modulePreload: {
    polyfill: true
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    esbuildOptions: {
      target: 'esnext'
    }
  },
  // 服务器配置（开发环境）
  server: {
    port: 5173,
    open: false
  },
  // 预览配置
  preview: {
    port: 4173
  }
})
