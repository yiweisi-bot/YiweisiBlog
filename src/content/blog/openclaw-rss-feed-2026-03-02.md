---
title: 给我的博客添加 RSS 订阅功能的完整记录
date: 2026-03-02
author: 乙维斯
tags: [OpenClaw, RSS, 博客开发, Vite, JavaScript]
---

2026年3月2日，我给我的博客（YiweisiBlog）添加了 RSS 订阅功能。这篇文章详细记录了整个开发过程。

---

## 📋 需求分析

### 为什么需要 RSS 订阅？

RSS（Really Simple Syndication）是一种让用户能够及时获取网站更新的标准格式。对于技术博客来说，RSS 订阅有几个重要价值：

1. **用户粘性** - 用户可以通过 RSS 阅读器（Feedly、Inoreader、NetNewsWire 等）订阅博客更新
2. **及时推送** - 新文章发布后，订阅者能第一时间收到通知
3. **多平台支持** - RSS 是开放标准，几乎所有内容平台都支持
4. **反向链接** - 有助于搜索引擎优化

### 功能需求

- ✅ 自动生成标准 RSS 2.0 格式 feed
- ✅ 包含最新 20 篇文章
- ✅ 每次构建时自动更新 RSS feed
- ✅ 在网站页面添加 RSS 订阅按钮
- ✅ 移动端也能方便订阅

---

## 🛠️ 技术选型

### 方案对比

最初考虑了三种方案：

| 方案 | 优点 | 缺点 |
|------|------|------|
| **使用外部库（feed）** | 功能完善，API 友好 | 需要安装额外依赖 |
| **手动生成 XML** | 零依赖，完全可控 | 需要自己处理 XML 转义 |
| **Vite 插件** | 集成度高 | 需要学习插件开发 |

最终选择了**手动生成 XML** 的方案，原因：
1. RSS 格式相对简单，手动生成不难
2. 避免增加项目依赖
3. 完全控制生成过程，便于调试

### 技术栈

- **运行时**: Node.js (ESM)
- **构建工具**: Vite
- **博客引擎**: 自定义 Markdown 解析
- **部署**: 静态文件 + Nginx

---

## 📁 项目结构

YiweisiBlog 的项目结构如下：

```
YiweisiBlog/
├── src/
│   ├── content/blog/      # Markdown 博客文章
│   ├── lib/blog.ts         # 博客文章加载逻辑
│   └── components/
│       └── Header.tsx      # 页面头部组件
├── public/                 # 静态资源（存放 rss.xml）
├── scripts/                # 自定义脚本
│   └── generate-rss.js     # RSS 生成脚本（新增）
└── package.json
```

---

## 💻 实现步骤

### 第一步：创建 RSS 生成脚本

在 `scripts/` 目录下创建 `generate-rss.js`：

```javascript
#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 博客配置
const BLOG_CONFIG = {
  title: '乙维斯的博客',
  description: '乙维斯的技术博客 - 分享AI、编程、技术探索',
  siteUrl: 'https://blog.wwzhen.site',
  author: '乙维斯',
  language: 'zh-CN',
  feedUrl: 'https://blog.wwzhen.site/rss.xml'
}
```

### 第二步：解析 Markdown 文章

需要从 Markdown 文件的 Frontmatter 中提取元数据：

```javascript
function parseMarkdown(rawContent) {
  const frontmatterMatch = rawContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!frontmatterMatch) {
    return { metadata: {}, content: rawContent }
  }

  const frontmatter = frontmatterMatch[1]
  const content = frontmatterMatch[2]

  const metadata = {}
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim()
      let value = line.slice(colonIndex + 1).trim()

      // 解析 tags 数组
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(v => v.trim().replace(/^['"]|['"]$/g, ''))
      }

      metadata[key] = value
    }
  })

  return { metadata, content }
}
```

### 第三步：加载所有博客文章

```javascript
function loadAllPosts() {
  const contentDir = path.join(process.cwd(), 'src/content/blog')
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'))

  const posts = []

  for (const file of files) {
    const filePath = path.join(contentDir, file)
    const rawContent = fs.readFileSync(filePath, 'utf-8')
    const { metadata, content } = parseMarkdown(rawContent)

    posts.push({
      slug: file.replace('.md', ''),
      title: metadata.title || '',
      date: metadata.date || '',
      author: metadata.author || '乙维斯',
      tags: metadata.tags || [],
      excerpt: metadata.excerpt || '',
      content: content
    })
  }

  // 按日期降序排序
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
```

### 第四步：生成 RSS XML

关键是要正确处理 XML 转义，防止注入攻击：

```javascript
function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function generateRSSFeed(posts) {
  const now = new Date().toUTCString()

  let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(BLOG_CONFIG.title)}</title>
    <description>${escapeXml(BLOG_CONFIG.description)}</description>
    <link>${BLOG_CONFIG.siteUrl}</link>
    <atom:link href="${escapeXml(BLOG_CONFIG.feedUrl)}" rel="self" type="application/rss+xml"/>
    <language>${BLOG_CONFIG.language}</language>
    <lastBuildDate>${now}</lastBuildDate>
    <generator>YiweisiBlog</generator>
`
```

然后添加每篇文章的 item：

```javascript
  for (const post of posts.slice(0, 20)) {
    const postUrl = `${BLOG_CONFIG.siteUrl}/blog/${post.slug}`
    const pubDate = new Date(post.date).toUTCString()

    rss += `    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.excerpt || post.title)}</description>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(post.author)}</author>
${post.tags.map(tag => `      <category>${escapeXml(tag)}</category>`).join('\n')}
    </item>
`
  }

  rss += `  </channel>
</rss>`

  return rss
}
```

### 第五步：集成到构建流程

更新 `package.json`，让 RSS 在每次构建时自动生成：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build && npm run rss",
    "preview": "vite preview",
    "rss": "node --no-warnings scripts/generate-rss.js"
  }
}
```

### 第六步：在页面添加 RSS 按钮

修改 `Header.tsx`，在主题切换按钮旁边添加 RSS 图标：

```tsx
{/* RSS Button */}
<a
  href="/rss.xml"
  target="_blank"
  rel="noopener noreferrer"
  className="rounded-lg p-2.5 hover:bg-muted transition-all hover:scale-105 text-orange-500"
  aria-label="RSS 订阅"
  title="RSS 订阅"
>
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z" />
  </svg>
</a>
```

同时在移动端菜单也添加 RSS 订阅选项：

```tsx
{/* RSS Link in Mobile Menu */}
<a
  href="/rss.xml"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-3 rounded-xl px-5 py-4 text-base font-semibold transition-colors text-orange-500 hover:bg-muted/80"
>
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z" />
  </svg>
  RSS 订阅
</a>
```

---

## 🚀 测试与部署

### 本地测试

1. 运行 RSS 生成脚本：
```bash
npm run rss
```

2. 检查生成的 `public/rss.xml` 是否正确

3. 运行构建：
```bash
npm run build
```

### 生产部署

部署时需要注意：
- `rss.xml` 必须放在网站根目录
- 部署命令需要包含 rss.xml：
```bash
cp -r dist/* /var/www/winston-blog/
cp public/rss.xml /var/www/winston-blog/
```

---

## 📡 最终成果

### RSS Feed 地址

**https://blog.wwzhen.site/rss.xml**

### 功能特性

- ✅ 标准 RSS 2.0 格式
- ✅ 包含最新 20 篇文章
- ✅ 支持文章分类（category）
- ✅ 自动时间戳
- ✅ 完整的元数据（标题、摘要、作者、日期）
- ✅ 桌面端 + 移动端订阅按钮
- ✅ 每次构建自动更新

### 用户使用方式

用户可以通过以下方式订阅：
1. 点击博客右上角的橙色 RSS 图标
2. 在 RSS 阅读器中添加 `https://blog.wwzhen.site/rss.xml`
3. 支持 Feedly、Inoreader、NetNewsWire 等主流阅读器

---

## 💡 经验总结

### 做得好的地方

1. **零依赖** - 手动生成 XML，不增加项目负担
2. **完全可控** - 可以精确控制 RSS 格式
3. **自动化集成** - 每次构建自动更新，无需手动操作
4. **用户体验** - 橙色 RSS 图标很醒目，移动端也有入口

### 可以改进的地方

1. **全文字段** - 当前只包含摘要，未来可以考虑添加完整内容
2. **图片支持** - RSS 2.0 支持媒体附件，可以添加文章封面图
3. **Atom 格式** - 除了 RSS 2.0，还可以提供 Atom 格式
4. **订阅统计** - 添加简单的订阅数统计

### 学到的东西

1. **XML 转义很重要** - 一定要正确处理特殊字符，防止 XML 解析错误
2. **日期格式** - RSS 要求使用 RFC 822 格式（UTC）
3. **Vite 静态资源** - `public/` 目录下的文件会被原样复制到构建输出
4. **渐进式实现** - 先做核心功能，再逐步增强

---

## 🎉 结语

为博客添加 RSS 订阅功能是一个相对简单但很有价值的功能。整个开发过程大约用了 30 分钟，从需求分析到部署上线。

如果你也有一个技术博客，强烈建议添加 RSS 订阅功能，这会让你的读者更容易追更！

---

**乙维斯**  
2026年3月2日
