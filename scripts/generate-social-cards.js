#!/usr/bin/env node
/**
 * 生成社交媒体分享卡片数据
 * 用于 Twitter/X、小红书等平台分享
 */

import fs from 'fs'
import path from 'path'

const BLOG_CONFIG = {
  title: '乙维斯的博客',
  description: 'OpenClaw 开发、多 Agent 协作、前端技术分享',
  siteUrl: 'https://blog.wwzhen.site',
  author: '乙维斯',
}

// 精选文章（适合分享的高质量内容）
const FEATURED_POSTS = [
  {
    slug: 'openclaw-multi-agent-guide',
    title: 'OpenClaw多Agent协作模式完整教程',
    highlight: '从零开始构建多Agent系统',
    tags: ['OpenClaw', '多Agent', '教程'],
    platforms: ['twitter', 'zhihu', 'juejin'],
  },
  {
    slug: 'openclaw-awesome-skills-2026-02-28',
    title: 'OpenClaw 技能集市：精选实用技能推荐',
    highlight: '10+个提升效率的OpenClaw技能',
    tags: ['OpenClaw', '技能推荐', '效率工具'],
    platforms: ['twitter', 'xiaohongshu', 'juejin'],
  },
  {
    slug: 'react-tailwind-v4',
    title: 'React 19 和 Tailwind CSS v4 最佳实践',
    highlight: '前端开发最新技术栈实战',
    tags: ['React', 'Tailwind', '前端'],
    platforms: ['twitter', 'zhihu', 'juejin'],
  },
  {
    slug: 'openclaw-soul-optimization',
    title: '从工具到伙伴：我的OpenClaw灵魂优化之旅',
    highlight: '如何让AI助手更有温度',
    tags: ['OpenClaw', 'AI助手', '心得'],
    platforms: ['twitter', 'xiaohongshu', 'zhihu'],
  },
  {
    slug: 'seo-geo-optimization-guide',
    title: 'SEO + GEO 双轨优化完整实战记录',
    highlight: 'AI搜索时代的网站优化策略',
    tags: ['SEO', 'GEO', '博客优化'],
    platforms: ['twitter', 'zhihu', 'juejin'],
  },
  {
    slug: 'claude-code-glm5',
    title: 'Claude Code + GLM-5 双模型协作开发实录',
    highlight: 'AI编程助手效率提升实战',
    tags: ['Claude Code', 'GLM-5', 'AI编程'],
    platforms: ['twitter', 'zhihu', 'juejin'],
  },
]

// 生成 Twitter/X 分享文案
function generateTwitterCards() {
  const cards = FEATURED_POSTS.map(post => {
    const url = `${BLOG_CONFIG.siteUrl}/blog/${post.slug}`
    const hashtags = post.tags.map(t => `#${t.replace(/\s+/g, '')}`).join(' ')

    return {
      slug: post.slug,
      platform: 'twitter',
      content: `${post.highlight}\n\n${post.title}\n\n${url}\n\n${hashtags} #OpenClaw #AI助手`,
      charCount: `${post.highlight}\n\n${post.title}\n\n${url}\n\n${hashtags} #OpenClaw #AI助手`.length,
    }
  })

  return cards
}

// 生成小红书分享文案
function generateXiaohongshuCards() {
  const cards = FEATURED_POSTS.filter(p => p.platforms.includes('xiaohongshu')).map(post => {
    const url = `${BLOG_CONFIG.siteUrl}/blog/${post.slug}`

    return {
      slug: post.slug,
      platform: 'xiaohongshu',
      title: post.highlight,
      content: `姐妹们！今天分享一个超实用的技术干货 👇\n\n${post.title}\n\n✨ 核心要点：\n${post.highlight}\n\n💡 适合人群：\n• 想学习AI技术的同学\n• 前端开发者\n• 对OpenClaw感兴趣的朋友\n\n🔗 完整文章：${url}\n\n#技术分享 #AI助手 #OpenClaw ${post.tags.map(t => `#${t}`).join(' ')}`,
    }
  })

  return cards
}

// 生成知乎分享文案
function generateZhihuCards() {
  const cards = FEATURED_POSTS.filter(p => p.platforms.includes('zhihu')).map(post => {
    const url = `${BLOG_CONFIG.siteUrl}/blog/${post.slug}`

    return {
      slug: post.slug,
      platform: 'zhihu',
      title: post.highlight,
      content: `${post.title}\n\n${post.highlight}\n\n详细内容请见：${url}\n\n${post.tags.map(t => `#${t}`).join(' ')}`,
    }
  })

  return cards
}

// 生成掘金分享文案
function generateJuejinCards() {
  const cards = FEATURED_POSTS.filter(p => p.platforms.includes('juejin')).map(post => {
    const url = `${BLOG_CONFIG.siteUrl}/blog/${post.slug}`

    return {
      slug: post.slug,
      platform: 'juejin',
      title: post.title,
      content: `${post.highlight}\n\n${post.title}\n\n原文链接：${url}\n\n${post.tags.join(' ')}`,
    }
  })

  return cards
}

function main() {
  const outputDir = path.join(process.cwd(), 'scripts', 'social-cards')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // 生成各平台文案
  const twitterCards = generateTwitterCards()
  const xiaohongshuCards = generateXiaohongshuCards()
  const zhihuCards = generateZhihuCards()
  const juejinCards = generateJuejinCards()

  // 保存到文件
  fs.writeFileSync(
    path.join(outputDir, 'twitter-cards.json'),
    JSON.stringify(twitterCards, null, 2)
  )
  fs.writeFileSync(
    path.join(outputDir, 'xiaohongshu-cards.json'),
    JSON.stringify(xiaohongshuCards, null, 2)
  )
  fs.writeFileSync(
    path.join(outputDir, 'zhihu-cards.json'),
    JSON.stringify(zhihuCards, null, 2)
  )
  fs.writeFileSync(
    path.join(outputDir, 'juejin-cards.json'),
    JSON.stringify(juejinCards, null, 2)
  )

  // 生成汇总 Markdown
  const summary = `# 社交媒体分享文案汇总

生成时间: ${new Date().toISOString()}

## 精选文章列表

${FEATURED_POSTS.map(p => `- **${p.title}** - ${p.highlight}`).join('\n')}

## 各平台文案

### Twitter/X (${twitterCards.length} 条)

${twitterCards.map(c => `#### ${c.slug}\n\n\`\`\`\n${c.content}\n\`\`\`\n字符数: ${c.charCount}/280`).join('\n\n')}

### 小红书 (${xiaohongshuCards.length} 条)

${xiaohongshuCards.map(c => `#### ${c.slug}\n\n\`\`\`\n${c.content}\n\`\`\``).join('\n\n')}

### 知乎 (${zhihuCards.length} 条)

${zhihuCards.map(c => `#### ${c.slug}\n\n\`\`\`\n${c.content}\n\`\`\``).join('\n\n')}

### 掘金 (${juejinCards.length} 条)

${juejinCards.map(c => `#### ${c.slug}\n\n\`\`\`\n${c.content}\n\`\`\``).join('\n\n')}

---

使用说明:
1. 复制对应平台的文案
2. 根据平台特点适当调整
3. 添加相关话题标签
4. 发布时附上文章链接
`

  fs.writeFileSync(path.join(outputDir, 'README.md'), summary)

  console.log('✅ 社交媒体分享文案生成完成！')
  console.log(`📁 输出目录: ${outputDir}`)
  console.log(`\n📊 生成统计:`)
  console.log(`  - Twitter/X: ${twitterCards.length} 条`)
  console.log(`  - 小红书: ${xiaohongshuCards.length} 条`)
  console.log(`  - 知乎: ${zhihuCards.length} 条`)
  console.log(`  - 掘金: ${juejinCards.length} 条`)
}

main().catch(console.error)
