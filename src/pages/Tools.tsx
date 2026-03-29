import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Star, ExternalLink, Filter, ChevronDown } from 'lucide-react'

interface Plan {
  id: string
  platform: string
  name: string
  rating: number
  firstMonthPrice: number
  monthlyPrice: number
  quarterlyPrice: number
  yearlyPrice: number
  models: string[]
  requestsPer5h: string
  requestsPerMonth: string
  benefits: string[]
  highlight?: string
  link: string
  color: string
}

const plans: Plan[] = [
  { id: 'zhipu-lite', platform: '智谱AI', name: 'Lite', rating: 5, firstMonthPrice: 49, monthlyPrice: 49, quarterlyPrice: 132, yearlyPrice: 470, models: ['GLM-5.1'], requestsPer5h: '1,200', requestsPerMonth: '24,000', benefits: ['免费MCP次数', '3倍Claude Pro用量'], highlight: '独占GLM5.1模型', link: 'https://www.bigmodel.cn/glm-coding', color: 'from-purple-500 to-indigo-600' },
  { id: 'zhipu-pro', platform: '智谱AI', name: 'Pro', rating: 5, firstMonthPrice: 149, monthlyPrice: 149, quarterlyPrice: 402, yearlyPrice: 1430, models: ['GLM-5.1', 'GLM-5'], requestsPer5h: '6,000', requestsPerMonth: '120,000', benefits: ['免费MCP次数', '5倍Lite用量'], link: 'https://www.bigmodel.cn/glm-coding', color: 'from-purple-500 to-indigo-600' },
  { id: 'zhipu-max', platform: '智谱AI', name: 'Max', rating: 5, firstMonthPrice: 469, monthlyPrice: 469, quarterlyPrice: 1266, yearlyPrice: 4502, models: ['GLM-5.1', 'GLM-5'], requestsPer5h: '24,000', requestsPerMonth: '600,000', benefits: ['免费MCP次数', '20倍Lite用量'], link: 'https://www.bigmodel.cn/glm-coding', color: 'from-purple-500 to-indigo-600' },
  { id: 'minimax-starter', platform: 'MiniMax', name: 'Starter', rating: 5, firstMonthPrice: 29, monthlyPrice: 29, quarterlyPrice: 87, yearlyPrice: 290, models: ['MiniMax-M2.7', 'MiniMax-M2.5'], requestsPer5h: '600', requestsPerMonth: '9,000', benefits: ['约50TPS'], highlight: '价格最便宜', link: 'https://platform.minimaxi.com/subscribe/token-plan', color: 'from-emerald-500 to-teal-600' },
  { id: 'minimax-plus', platform: 'MiniMax', name: 'Plus', rating: 5, firstMonthPrice: 49, monthlyPrice: 49, quarterlyPrice: 147, yearlyPrice: 490, models: ['MiniMax-M2.7', 'MiniMax-M2.5'], requestsPer5h: '1,500', requestsPerMonth: '22,500', benefits: ['约50TPS'], link: 'https://platform.minimaxi.com/subscribe/token-plan', color: 'from-emerald-500 to-teal-600' },
  { id: 'minimax-max', platform: 'MiniMax', name: 'Max', rating: 5, firstMonthPrice: 119, monthlyPrice: 119, quarterlyPrice: 357, yearlyPrice: 1190, models: ['MiniMax-M2.7', 'MiniMax-M2.5'], requestsPer5h: '4,500', requestsPerMonth: '67,500', benefits: ['约50TPS'], link: 'https://platform.minimaxi.com/subscribe/token-plan', color: 'from-emerald-500 to-teal-600' },
  { id: 'ark-lite', platform: '字节·方舟', name: 'Lite', rating: 4, firstMonthPrice: 40, monthlyPrice: 40, quarterlyPrice: 120, yearlyPrice: 360, models: ['Doubao-Seed-2.0', 'MiniMax-M2.5', 'Kimi-K2.5', 'GLM-4.7'], requestsPer5h: '1,200', requestsPerMonth: '18,000', benefits: ['ArkClaw 7天体验'], highlight: '送OpenClaw体验', link: 'https://volcengine.com/', color: 'from-blue-500 to-cyan-600' },
  { id: 'ark-pro', platform: '字节·方舟', name: 'Pro', rating: 4, firstMonthPrice: 200, monthlyPrice: 200, quarterlyPrice: 600, yearlyPrice: 1800, models: ['Doubao-Seed-2.0', 'MiniMax-M2.5', 'Kimi-K2.5', 'GLM-4.7'], requestsPer5h: '6,000', requestsPerMonth: '90,000', benefits: ['免费ArkClaw'], link: 'https://volcengine.com/', color: 'from-blue-500 to-cyan-600' },
  { id: 'bailian-pro', platform: '阿里·百炼', name: 'Pro', rating: 3, firstMonthPrice: 200, monthlyPrice: 200, quarterlyPrice: 600, yearlyPrice: 1800, models: ['Qwen-3.5', 'MiniMax-M2.5', 'GLM-5', 'Kimi-K2.5', 'GLM-4.7'], requestsPer5h: '6,000', requestsPerMonth: '90,000', benefits: ['独占Qwen3.5'], link: 'https://www.aliyun.com/benefit/scene/codingplan', color: 'from-orange-500 to-red-600' },
  { id: 'hunyuan-lite', platform: '腾讯·混元', name: 'Lite', rating: 3, firstMonthPrice: 8, monthlyPrice: 40, quarterlyPrice: 120, yearlyPrice: 360, models: ['HY-2.0', 'HY-T1', 'GLM-5', 'Kimi-K2.5', 'MiniMax-M2.5'], requestsPer5h: '1,200', requestsPerMonth: '18,000', benefits: ['首月超低价'], link: 'https://cloud.tencent.com/act/pro/codingplan', color: 'from-cyan-500 to-blue-600' },
  { id: 'hunyuan-pro', platform: '腾讯·混元', name: 'Pro', rating: 3, firstMonthPrice: 40, monthlyPrice: 200, quarterlyPrice: 600, yearlyPrice: 1800, models: ['HY-2.0', 'HY-T1', 'GLM-5', 'Kimi-K2.5', 'MiniMax-M2.5'], requestsPer5h: '6,000', requestsPerMonth: '90,000', benefits: ['支持多模型'], link: 'https://cloud.tencent.com/act/pro/codingplan', color: 'from-cyan-500 to-blue-600' },
  { id: 'qianfan-lite', platform: '百度·千帆', name: 'Lite', rating: 3, firstMonthPrice: 40, monthlyPrice: 40, quarterlyPrice: 120, yearlyPrice: 360, models: ['GLM-5', 'Kimi-K2.5', 'MiniMax-M2.5', 'DeepSeek-V3.2'], requestsPer5h: '1,200', requestsPerMonth: '18,000', benefits: ['支持DeepSeek'], link: 'https://cloud.baidu.com/product/codingplan.html', color: 'from-blue-600 to-indigo-700' },
  { id: 'qianfan-pro', platform: '百度·千帆', name: 'Pro', rating: 3, firstMonthPrice: 200, monthlyPrice: 200, quarterlyPrice: 600, yearlyPrice: 1800, models: ['GLM-5', 'Kimi-K2.5', 'MiniMax-M2.5', 'DeepSeek-V3.2'], requestsPer5h: '6,000', requestsPerMonth: '90,000', benefits: ['支持DeepSeek'], link: 'https://cloud.baidu.com/product/codingplan.html', color: 'from-blue-600 to-indigo-700' },
  { id: 'kimi-andante', platform: 'Kimi', name: 'Andante', rating: 3, firstMonthPrice: 49, monthlyPrice: 49, quarterlyPrice: 147, yearlyPrice: 468, models: ['Kimi-K2.5', 'Kimi-K2'], requestsPer5h: '未公开', requestsPerMonth: '未公开', benefits: ['Agent 4倍速'], link: 'https://www.kimi.com/code', color: 'from-pink-500 to-rose-600' },
  { id: 'kimi-moderato', platform: 'Kimi', name: 'Moderato', rating: 3, firstMonthPrice: 99, monthlyPrice: 99, quarterlyPrice: 297, yearlyPrice: 948, models: ['Kimi-K2.5', 'Kimi-K2'], requestsPer5h: '未公开', requestsPerMonth: '未公开', benefits: ['4倍额度', 'Agent多任务并行'], link: 'https://www.kimi.com/code', color: 'from-pink-500 to-rose-600' },
  { id: 'kimi-allegretto', platform: 'Kimi', name: 'Allegretto', rating: 3, firstMonthPrice: 199, monthlyPrice: 199, quarterlyPrice: 597, yearlyPrice: 1908, models: ['Kimi-K2.5', 'Kimi-K2'], requestsPer5h: '未公开', requestsPerMonth: '未公开', benefits: ['免费Kimi-Claw', '20倍额度'], link: 'https://www.kimi.com/code', color: 'from-pink-500 to-rose-600' },
  { id: 'kimi-allegro', platform: 'Kimi', name: 'Allegro', rating: 3, firstMonthPrice: 699, monthlyPrice: 699, quarterlyPrice: 2097, yearlyPrice: 6708, models: ['Kimi-K2.5', 'Kimi-K2'], requestsPer5h: '未公开', requestsPerMonth: '未公开', benefits: ['免费Kimi-Claw', '60倍额度'], link: 'https://www.kimi.com/code', color: 'from-pink-500 to-rose-600' }
]

const platforms = ['全部', '智谱AI', 'MiniMax', '字节·方舟', '阿里·百炼', '腾讯·混元', '百度·千帆', 'Kimi']
const priceRanges = [
  { label: '全部', min: 0, max: Infinity },
  { label: '¥50以下', min: 0, max: 50 },
  { label: '¥50-100', min: 50, max: 100 },
  { label: '¥100-200', min: 100, max: 200 },
  { label: '¥200以上', min: 200, max: Infinity }
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className={`w-4 h-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'}`} />
      ))}
    </div>
  )
}

export default function Tools() {
  const [selectedPlatform, setSelectedPlatform] = useState('全部')
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0])
  const [showFilters, setShowFilters] = useState(false)

  const filteredPlans = useMemo(() => {
    return plans.filter((plan) => {
      const platformMatch = selectedPlatform === '全部' || plan.platform === selectedPlatform
      const priceMatch = plan.monthlyPrice >= selectedPriceRange.min && plan.monthlyPrice < selectedPriceRange.max
      return platformMatch && priceMatch
    })
  }, [selectedPlatform, selectedPriceRange])

  const platformStats = useMemo(() => {
    const stats = new Map()
    plans.forEach((plan) => {
      if (!stats.has(plan.platform)) {
        stats.set(plan.platform, { count: 0, minPrice: Infinity, rating: plan.rating })
      }
      const stat = stats.get(plan.platform)
      stat.count++
      stat.minPrice = Math.min(stat.minPrice, plan.monthlyPrice)
    })
    return stats
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              2026.3.28 更新
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">AI Coding Plan</span>
              <br />
              <span className="text-foreground">全平台对比</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              七大平台全面对比：智谱AI、MiniMax、字节·方舟、阿里·百炼、腾讯·混元、百度·千帆、Kimi
              <br />
              支持 GLM-5.1、Qwen-3.5、Doubao-Seed-2.0、MiniMax-M2.7、Kimi-K2.5 等主流模型
            </p>
          </motion.div>

          {/* Platform Cards */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-12">
            {Array.from(platformStats.entries()).map(([platform, stat], index) => (
              <motion.div
                key={platform}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="glass-card rounded-2xl p-4 text-center hover:shadow-lg transition-all cursor-pointer hover:scale-105"
                onClick={() => setSelectedPlatform(platform)}
              >
                <div className="font-semibold text-foreground mb-1">{platform}</div>
                <StarRating rating={stat.rating} />
                <div className="text-sm text-muted-foreground mt-2">最低 ¥{stat.minPrice}/月</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <Filter className="w-5 h-5" />
                筛选
              </div>
              <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                {showFilters ? '收起' : '展开'}
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            <div className={`space-y-4 ${showFilters ? '' : 'hidden'}`}>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">平台</label>
                <div className="flex flex-wrap gap-2">
                  {platforms.map((platform) => (
                    <button
                      key={platform}
                      onClick={() => setSelectedPlatform(platform)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedPlatform === platform ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">月付价格</label>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.label}
                      onClick={() => setSelectedPriceRange(range)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedPriceRange.label === range.label ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">套餐列表</h2>
            <div className="text-sm text-muted-foreground">
              显示 {filteredPlans.length} / {plans.length} 个套餐
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all group"
              >
                {/* Header with gradient */}
                <div className={`bg-gradient-to-r ${plan.color} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium opacity-90">{plan.platform}</span>
                      <StarRating rating={plan.rating} />
                    </div>
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    {plan.highlight && (
                      <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                        {plan.highlight}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Price */}
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-4xl font-bold text-foreground">¥{plan.monthlyPrice}</span>
                    <span className="text-muted-foreground mb-1">/月</span>
                    {plan.firstMonthPrice !== plan.monthlyPrice && (
                      <span className="ml-auto text-sm text-primary font-medium">
                        首月 ¥{plan.firstMonthPrice}
                      </span>
                    )}
                  </div>

                  {/* Models */}
                  <div className="mb-4">
                    <div className="text-xs font-medium text-muted-foreground mb-2">支持模型</div>
                    <div className="flex flex-wrap gap-1">
                      {plan.models.map((model) => (
                        <span key={model} className="px-2 py-1 bg-muted rounded text-xs text-foreground">
                          {model}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Request Limits */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">5小时请求</div>
                      <div className="font-semibold text-foreground">{plan.requestsPer5h}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">每月请求</div>
                      <div className="font-semibold text-foreground">{plan.requestsPerMonth}</div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="mb-6">
                    <div className="text-xs font-medium text-muted-foreground mb-2">权益</div>
                    <ul className="space-y-1">
                      {plan.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <a
                    href={plan.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity group-hover:shadow-lg"
                  >
                    立即开通
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card rounded-2xl p-6 text-center">
            <p className="text-sm text-muted-foreground">
              本页面数据仅供参考，价格及权益最终以平台官方公布为准
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              建议在选择套餐前仔细阅读各平台的官方条款和服务协议
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
