import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ASCIIText, ASCIIDecoration, ASCIITyper } from '../components/ASCIIText'
import { CommentSection } from '../components/SmartBubble'
import { ArticleAccordion } from '../components/ArticleAccordion'

const demoMessages = [
  { id: '1', text: '你好！欢迎使用乙维斯博客的新特效！', sender: 'bot' as const, timestamp: new Date() },
  { id: '2', text: '哇，这些效果看起来太酷了！', sender: 'user' as const, timestamp: new Date() },
  { id: '3', text: '是的！我们使用了 Pretext 库实现了智能聊天气泡，零浪费像素！', sender: 'bot' as const, timestamp: new Date() },
  { id: '4', text: '那 ASCII 艺术呢？', sender: 'user' as const, timestamp: new Date() },
  { id: '5', text: 'ASCII 艺术使用粒子系统驱动，实时生成动态效果！试试看！', sender: 'bot' as const, timestamp: new Date() },
]

const demoSections = [
  { id: '1', title: 'Pretext 集成', content: '我们成功将 Pretext 库集成到博客中，实现了零 DOM 测量的文本布局计算。性能提升高达 200 倍！' },
  { id: '2', title: '动态光球', content: '文章标题区域使用动态光球效果，文字会自动避开移动的光球，营造沉浸式阅读体验。' },
  { id: '3', title: 'ASCII 艺术', content: '粒子驱动的 ASCII 艺术效果，将普通文字转换为动态的 ASCII 字符艺术，支持实时更新。' },
  { id: '4', title: '智能气泡', content: '聊天/评论气泡使用 Pretext 的 walkLineRanges 功能，找到最紧凑的宽度，零浪费像素。' },
]

export default function EffectsDemo() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* 返回按钮 */}
      <Link 
        to="/" 
        className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        返回首页
      </Link>

      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8"
      >
        特效演示
      </motion.h1>

      {/* ASCII 艺术区域 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">ASCII 艺术效果</h2>
        <div className="rounded-xl border border-border bg-card p-6">
          <ASCIIText text="YIWESI" width={600} height={100} fontSize={8} />
        </div>
      </section>

      {/* ASCII 打字机效果 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">ASCII 打字机</h2>
        <div className="rounded-xl border border-border bg-card p-6">
          <ASCIITyper text="欢迎来到乙维斯的博客！" speed={80} />
        </div>
      </section>

      {/* ASCII 装饰 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">ASCII 装饰</h2>
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <ASCIIDecoration variant="border" />
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <ASCIIDecoration variant="divider" />
          </div>
        </div>
      </section>

      {/* 智能聊天气泡 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">智能聊天气泡</h2>
        <div className="rounded-xl border border-border bg-card p-6">
          <CommentSection 
            comments={demoMessages}
            onAddComment={(text) => console.log('New comment:', text)}
          />
        </div>
      </section>

      {/* 手风琴组件 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">文章手风琴</h2>
        <ArticleAccordion sections={demoSections} />
      </section>

      {/* 说明 */}
      <section className="mt-12 p-6 rounded-xl bg-muted/30">
        <h3 className="text-xl font-bold mb-4">技术说明</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>✨ <strong>ASCII 艺术</strong>: 使用 Canvas 绘制文字，计算亮度场，添加粒子影响，转换为 ASCII 字符</li>
          <li>💬 <strong>智能气泡</strong>: 使用 Pretext 的 walkLineRanges 二分查找最优宽度，零浪费像素</li>
          <li>📑 <strong>手风琴</strong>: 使用 Pretext 计算每个部分的高度，实现丝滑展开/折叠</li>
          <li>⚡ <strong>性能</strong>: 所有计算使用 Pretext，零 DOM 测量，速度快 200 倍</li>
        </ul>
      </section>
    </div>
  )
}
