#!/usr/bin/env node
/**
 * 搜索引擎提交脚本
 * 自动提交网站到各大搜索引擎
 */

import https from 'https'
import http from 'http'

const SITE_URL = 'https://blog.wwzhen.site'
const SITEMAP_URL = 'https://blog.wwzhen.site/sitemap.xml'

// 搜索引擎提交接口
const SEARCH_ENGINES = {
  // Google
  google: `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  // Bing
  bing: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  // Baidu（需要注册站长平台后使用 API）
  // baidu: 'https://data.zz.baidu.com/urls?site=blog.wwzhen.site&token=YOUR_TOKEN',
}

async function submitToEngine(name, url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https:') ? https : http
    const req = client.get(url, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`✅ ${name}: 提交成功`)
          resolve({ success: true, name })
        } else {
          console.log(`⚠️ ${name}: 状态码 ${res.statusCode}`)
          resolve({ success: false, name, status: res.statusCode })
        }
      })
    })
    req.on('error', (err) => {
      console.log(`❌ ${name}: ${err.message}`)
      resolve({ success: false, name, error: err.message })
    })
    req.setTimeout(10000, () => {
      req.destroy()
      console.log(`⏱️ ${name}: 超时`)
      resolve({ success: false, name, error: 'timeout' })
    })
  })
}

async function main() {
  console.log('🚀 开始提交网站到搜索引擎...\n')
  console.log(`网站: ${SITE_URL}`)
  console.log(`Sitemap: ${SITEMAP_URL}\n`)

  const results = []
  for (const [name, url] of Object.entries(SEARCH_ENGINES)) {
    const result = await submitToEngine(name, url)
    results.push(result)
  }

  console.log('\n📊 提交结果汇总:')
  const successCount = results.filter(r => r.success).length
  console.log(`成功: ${successCount}/${results.length}`)

  // 生成手动提交链接
  console.log('\n🔗 手动提交链接（如果自动提交失败）:')
  console.log(`Google Search Console: https://search.google.com/search-console`)
  console.log(`Bing Webmaster: https://www.bing.com/webmasters`)
  console.log(`Baidu 站长平台: https://ziyuan.baidu.com/`)
}

main().catch(console.error)
