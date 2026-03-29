export default function Tools() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <a href="https://github.com/wmpeng/codingplan" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">🤖 AI Coding Plan 对比</h1>
          <div className="inline-block bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm mb-4">
            📅 更新日期：2026.3.28 | 更新：GLM5.1 模型
          </div>
          <p className="text-gray-600 mb-2">七大平台全面对比：智谱AI、Kimi、MiniMax、字节·方舟、阿里·百炼、百度·千帆、腾讯·混元</p>
          <p className="text-gray-600">支持 Qwen-3.5、Doubao-Seed-2.0、MiniMax-M2.7、GLM-5.1、Kimi-K2.5 等主流模型</p>
        </div>

        {/* Platform Ratings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* 智谱AI */}
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">智谱AI</span>
              <span className="text-yellow-400">⭐️⭐️⭐️⭐️⭐️</span>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="text-green-600">• 独占GLM5.1模型 +1</li>
              <li className="text-green-600">• 提供免费MCP次数 +1</li>
            </ul>
          </div>

          {/* MiniMax */}
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-emerald-500">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">MiniMax</span>
              <span className="text-yellow-400">⭐️⭐️⭐️⭐️⭐️</span>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="text-green-600">• 价格最便宜，且无需抢购 +1</li>
              <li className="text-green-600">• 独占MiniMax-M2.7模型 +1</li>
            </ul>
          </div>

          {/* 字节·方舟 */}
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-cyan-500">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">字节·方舟</span>
              <span className="text-yellow-400">⭐️⭐️⭐️⭐️</span>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="text-green-600">• 独占Doubao-Seed-2.0系列模型 +1</li>
              <li className="text-red-600">• 不支持GLM-5，只支持GLM-4.7 -1</li>
              <li className="text-green-600">• 赠送真OpenClaw +1</li>
            </ul>
          </div>

          {/* 阿里·百炼 */}
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-orange-500">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">阿里·百炼</span>
              <span className="text-yellow-400">⭐️⭐️⭐️</span>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="text-green-600">• 独占Qwen3.5系列模型 +1</li>
              <li className="text-red-600">• 只有pro套餐，轻量使用性价比不高 -1</li>
            </ul>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">平台</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">套餐</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">跳转链接</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">首月价格</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">连续包月</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">连续包季</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">连续包年</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">支持模型</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">5小时请求数</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">每月总请求数</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">其他权益</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">备注</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* 智谱AI */}
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">智谱AI</td>
                <td className="px-4 py-3"><span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">Lite</span></td>
                <td className="px-4 py-3"><a href="https://www.bigmodel.cn/glm-coding" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">跳转开通 →</a></td>
                <td className="px-4 py-3 font-semibold text-green-600">¥49 / 首月</td>
                <td className="px-4 py-3 font-semibold text-green-600">¥49 / 月</td>
                <td className="px-4 py-3"><span className="line-through text-gray-400">¥147</span> ¥132.30 / 季</td>
                <td className="px-4 py-3"><span className="line-through text-gray-400">¥588</span> ¥470.40 / 年</td>
                <td className="px-4 py-3"><span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs mr-1">GLM-5.1</span></td>
                <td className="px-4 py-3">1,200 / 5小时</td>
                <td className="px-4 py-3">24,000 / 月</td>
                <td className="px-4 py-3">免费MCP次数</td>
                <td className="px-4 py-3 text-xs text-gray-500">3倍Claude Pro用量</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">智谱AI</td>
                <td className="px-4 py-3"><span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">Pro</span></td>
                <td className="px-4 py-3"><a href="https://www.bigmodel.cn/glm-coding" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">跳转开通 →</a></td>
                <td className="px-4 py-3 font-semibold text-green-600">¥149 / 首月</td>
                <td className="px-4 py-3 font-semibold text-green-600">¥149 / 月</td>
                <td className="px-4 py-3"><span className="line-through text-gray-400">¥447</span> ¥402.30 / 季</td>
                <td className="px-4 py-3"><span className="line-through text-gray-400">¥1788</span> ¥1430.40 / 年</td>
                <td className="px-4 py-3"><span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs mr-1">GLM-5.1</span><span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">GLM-5</span></td>
                <td className="px-4 py-3">6,000 / 5小时</td>
                <td className="px-4 py-3">120,000 / 月</td>
                <td className="px-4 py-3">免费MCP次数</td>
                <td className="px-4 py-3 text-xs text-gray-500">5倍Lite用量</td>
              </tr>
              {/* 更多行... */}
              {/* MiniMax */}
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">MiniMax</td>
                <td className="px-4 py-3"><span className="bg-emerald-500 text-white px-2 py-1 rounded text-xs">Starter</span></td>
                <td className="px-4 py-3"><a href="https://platform.minimaxi.com/subscribe/token-plan" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">跳转开通 →</a></td>
                <td className="px-4 py-3 font-semibold text-green-600">¥29 / 首月</td>
                <td className="px-4 py-3 font-semibold text-green-600">¥29 / 月</td>
                <td className="px-4 py-3">¥87 / 季</td>
                <td className="px-4 py-3"><span className="line-through text-gray-400">¥348</span> ¥290 / 年</td>
                <td className="px-4 py-3"><span className="inline-block bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs mr-1">MiniMax-M2.7</span><span className="inline-block bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs">MiniMax-M2.5</span></td>
                <td className="px-4 py-3">600 / 5小时</td>
                <td className="px-4 py-3">9,000 / 月</td>
                <td className="px-4 py-3">-</td>
                <td className="px-4 py-3 text-xs text-gray-500">约50TPS</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">MiniMax</td>
                <td className="px-4 py-3"><span className="bg-emerald-500 text-white px-2 py-1 rounded text-xs">Plus</span></td>
                <td className="px-4 py-3"><a href="https://platform.minimaxi.com/subscribe/token-plan" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">跳转开通 →</a></td>
                <td className="px-4 py-3 font-semibold text-green-600">¥49 / 首月</td>
                <td className="px-4 py-3 font-semibold text-green-600">¥49 / 月</td>
                <td className="px-4 py-3">¥147 / 季</td>
                <td className="px-4 py-3"><span className="line-through text-gray-400">¥588</span> ¥490 / 年</td>
                <td className="px-4 py-3"><span className="inline-block bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs mr-1">MiniMax-M2.7</span><span className="inline-block bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs">MiniMax-M2.5</span></td>
                <td className="px-4 py-3">1,500 / 5小时</td>
                <td className="px-4 py-3">22,500 / 月</td>
                <td className="px-4 py-3">-</td>
                <td className="px-4 py-3 text-xs text-gray-500">约50TPS</td>
              </tr>
              {/* 字节·方舟 */}
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">字节·方舟</td>
                <td className="px-4 py-3"><span className="bg-cyan-500 text-white px-2 py-1 rounded text-xs">Lite</span></td>
                <td className="px-4 py-3"><a href="https://volcengine.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">跳转开通 →</a></td>
                <td className="px-4 py-3 font-semibold text-green-600">¥40 / 首月</td>
                <td className="px-4 py-3 font-semibold text-green-600">¥40 / 月</td>
                <td className="px-4 py-3">¥120 / 季</td>
                <td className="px-4 py-3"><span className="line-through text-gray-400">¥480</span> ¥360 / 年</td>
                <td className="px-4 py-3"><span className="inline-block bg-cyan-100 text-cyan-700 px-2 py-1 rounded text-xs mr-1">Doubao-Seed-2.0</span><span className="inline-block bg-cyan-100 text-cyan-700 px-2 py-1 rounded text-xs">GLM-4.7</span></td>
                <td className="px-4 py-3">1,200 / 5小时</td>
                <td className="px-4 py-3">18,000 / 月</td>
                <td className="px-4 py-3">ArkClaw 7天体验</td>
                <td className="px-4 py-3 text-xs text-gray-500">-</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">字节·方舟</td>
                <td className="px-4 py-3"><span className="bg-cyan-500 text-white px-2 py-1 rounded text-xs">Pro</span></td>
                <td className="px-4 py-3"><a href="https://volcengine.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">跳转开通 →</a></td>
                <td className="px-4 py-3 font-semibold text-green-600">¥200 / 首月</td>
                <td className="px-4 py-3 font-semibold text-green-600">¥200 / 月</td>
                <td className="px-4 py-3">¥600 / 季</td>
                <td className="px-4 py-3"><span className="line-through text-gray-400">¥2400</span> ¥1800 / 年</td>
                <td className="px-4 py-3"><span className="inline-block bg-cyan-100 text-cyan-700 px-2 py-1 rounded text-xs mr-1">Doubao-Seed-2.0</span><span className="inline-block bg-cyan-100 text-cyan-700 px-2 py-1 rounded text-xs">GLM-4.7</span></td>
                <td className="px-4 py-3">6,000 / 5小时</td>
                <td className="px-4 py-3">90,000 / 月</td>
                <td className="px-4 py-3">免费ArkClaw</td>
                <td className="px-4 py-3 text-xs text-gray-500">-</td>
              </tr>
              {/* 阿里·百炼 */}
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">阿里·百炼</td>
                <td className="px-4 py-3"><span className="bg-orange-500 text-white px-2 py-1 rounded text-xs">Pro</span></td>
                <td className="px-4 py-3"><a href="https://www.aliyun.com/benefit/scene/codingplan" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">跳转开通 →</a></td>
                <td className="px-4 py-3 font-semibold text-green-600">¥200 / 首月</td>
                <td className="px-4 py-3 font-semibold text-green-600">¥200 / 月</td>
                <td className="px-4 py-3">¥600 / 季</td>
                <td className="px-4 py-3"><span className="line-through text-gray-400">¥2400</span> ¥1800 / 年</td>
                <td className="px-4 py-3"><span className="inline-block bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs mr-1">Qwen-3.5</span><span className="inline-block bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">GLM-5</span></td>
                <td className="px-4 py-3">6,000 / 5小时</td>
                <td className="px-4 py-3">90,000 / 月</td>
                <td className="px-4 py-3">-</td>
                <td className="px-4 py-3 text-xs text-gray-500">-</td>
              </tr>
              {/* 腾讯·混元 */}
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">腾讯·混元</td>
                <td className="px-4 py-3"><span className="bg-cyan-600 text-white px-2 py-1 rounded text-xs">Lite</span></td>
                <td className="px-4 py-3"><a href="https://cloud.tencent.com/act/pro/codingplan" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">跳转开通 →</a></td>
                <td className="px-4 py-3 font-semibold text-green-600">¥7.90 / 首月</td>
                <td className="px-4 py-3 font-semibold text-green-600">¥40 / 月</td>
                <td className="px-4 py-3">¥120 / 季</td>
                <td className="px-4 py-3"><span className="line-through text-gray-400">¥480</span> ¥360 / 年</td>
                <td className="px-4 py-3"><span className="inline-block bg-cyan-50 text-cyan-800 px-2 py-1 rounded text-xs mr-1">HY-2.0</span><span className="inline-block bg-cyan-50 text-cyan-800 px-2 py-1 rounded text-xs">GLM-5</span></td>
                <td className="px-4 py-3">1,200 / 5小时</td>
                <td className="px-4 py-3">18,000 / 月</td>
                <td className="px-4 py-3">-</td>
                <td className="px-4 py-3 text-xs text-gray-500">-</td>
              </tr>
              {/* 百度·千帆 */}
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">百度·千帆</td>
                <td className="px-4 py-3"><span className="bg-indigo-600 text-white px-2 py-1 rounded text-xs">Lite</span></td>
                <td className="px-4 py-3"><a href="https://cloud.baidu.com/product/codingplan.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">跳转开通 →</a></td>
                <td className="px-4 py-3 font-semibold text-green-600">¥40 / 首月</td>
                <td className="px-4 py-3 font-semibold text-green-600">¥40 / 月</td>
                <td className="px-4 py-3">¥120 / 季</td>
                <td className="px-4 py-3"><span className="line-through text-gray-400">¥480</span> ¥360 / 年</td>
                <td className="px-4 py-3"><span className="inline-block bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs mr-1">GLM-5</span><span className="inline-block bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">DeepSeek-V3.2</span></td>
                <td className="px-4 py-3">1,200 / 5小时</td>
                <td className="px-4 py-3">18,000 / 月</td>
                <td className="px-4 py-3">-</td>
                <td className="px-4 py-3 text-xs text-gray-500">-</td>
              </tr>
              {/* Kimi */}
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">Kimi</td>
                <td className="px-4 py-3"><span className="bg-pink-500 text-white px-2 py-1 rounded text-xs">Andante</span></td>
                <td className="px-4 py-3"><a href="https://www.kimi.com/code" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">跳转开通 →</a></td>
                <td className="px-4 py-3 font-semibold text-green-600">¥49 / 首月</td>
                <td className="px-4 py-3 font-semibold text-green-600">¥49 / 月</td>
                <td className="px-4 py-3">¥147 / 季</td>
                <td className="px-4 py-3"><span className="line-through text-gray-400">¥588</span> ¥468 / 年</td>
                <td className="px-4 py-3"><span className="inline-block bg-pink-100 text-pink-700 px-2 py-1 rounded text-xs mr-1">Kimi-K2.5</span><span className="inline-block bg-pink-100 text-pink-700 px-2 py-1 rounded text-xs">Kimi-K2</span></td>
                <td className="px-4 py-3">未公开 / 5小时</td>
                <td className="px-4 py-3">未公开 / 月</td>
                <td className="px-4 py-3">-</td>
                <td className="px-4 py-3 text-xs text-gray-500">Agent 4 倍速</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Notes */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">💡 说明</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• 包季/包年价格中的划线数字表示原始价格（包月×3 或 包月×12），未划线的为实际优惠价格</li>
            <li>• 本页面数据仅供参考，价格及权益最终以平台官方公布为准</li>
            <li>• 建议在选择套餐前仔细阅读各平台的官方条款和服务协议</li>
            <li>• 数据来源：<a href="https://github.com/wmpeng/codingplan" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub - codingplan</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
