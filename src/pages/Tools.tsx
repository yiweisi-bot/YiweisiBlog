export default function Tools() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
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
          <table className="w-full text-sm whitespace-nowrap">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left font-semibold text-gray-700">平台</th>
                <th className="px-3 py-3 text-left font-semibold text-gray-700">套餐</th>
                <th className="px-3 py-3 text-left font-semibold text-gray-700">首月</th>
                <th className="px-3 py-3 text-left font-semibold text-gray-700">包月</th>
                <th className="px-3 py-3 text-left font-semibold text-gray-700">包季</th>
                <th className="px-3 py-3 text-left font-semibold text-gray-700">包年</th>
                <th className="px-3 py-3 text-left font-semibold text-gray-700">支持模型</th>
                <th className="px-3 py-3 text-left font-semibold text-gray-700">5h请求</th>
                <th className="px-3 py-3 text-left font-semibold text-gray-700">月请求</th>
                <th className="px-3 py-3 text-left font-semibold text-gray-700">权益</th>
                <th className="px-3 py-3 text-left font-semibold text-gray-700">备注</th>
                <th className="px-3 py-3 text-left font-semibold text-gray-700">链接</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* 智谱AI */}
              <tr className="hover:bg-gray-50">
                <td className="px-3 py-3 font-medium">智谱AI</td>
                <td className="px-3 py-3"><span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">Lite</span></td>
                <td className="px-3 py-3 font-semibold text-green-600">¥49</td>
                <td className="px-3 py-3 font-semibold text-green-600">¥49</td>
                <td className="px-3 py-3"><span className="line-through text-gray-400">¥147</span> ¥132</td>
                <td className="px-3 py-3"><span className="line-through text-gray-400">¥588</span> ¥470</td>
                <td className="px-3 py-3"><span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">GLM-5.1</span></td>
                <td className="px-3 py-3">1,200</td>
                <td className="px-3 py-3">24,000</td>
                <td className="px-3 py-3">免费MCP</td>
                <td className="px-3 py-3 text-xs text-gray-500">3倍Claude</td>
                <td className="px-3 py-3"><a href="https://www.bigmodel.cn/glm-coding?ic=IDSZ0TALCT" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">开通→</a></td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-3 py-3 font-medium">智谱AI</td>
                <td className="px-3 py-3"><span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">Pro</span></td>
                <td className="px-3 py-3 font-semibold text-green-600">¥149</td>
                <td className="px-3 py-3 font-semibold text-green-600">¥149</td>
                <td className="px-3 py-3"><span className="line-through text-gray-400">¥447</span> ¥402</td>
                <td className="px-3 py-3"><span className="line-through text-gray-400">¥1788</span> ¥1430</td>
                <td className="px-3 py-3"><span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">GLM-5.1</span></td>
                <td className="px-3 py-3">6,000</td>
                <td className="px-3 py-3">120,000</td>
                <td className="px-3 py-3">免费MCP</td>
                <td className="px-3 py-3 text-xs text-gray-500">5倍Lite</td>
                <td className="px-3 py-3"><a href="https://www.bigmodel.cn/glm-coding?ic=IDSZ0TALCT" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">开通→</a></td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-3 py-3 font-medium">智谱AI</td>
                <td className="px-3 py-3"><span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">Max</span></td>
                <td className="px-3 py-3 font-semibold text-green-600">¥469</td>
                <td className="px-3 py-3 font-semibold text-green-600">¥469</td>
                <td className="px-3 py-3"><span className="line-through text-gray-400">¥1407</span> ¥1266</td>
                <td className="px-3 py-3"><span className="line-through text-gray-400">¥5628</span> ¥4502</td>
                <td className="px-3 py-3"><span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">GLM-5.1</span></td>
                <td className="px-3 py-3">24,000</td>
                <td className="px-3 py-3">600,000</td>
                <td className="px-3 py-3">免费MCP</td>
                <td className="px-3 py-3 text-xs text-gray-500">20倍Lite</td>
                <td className="px-3 py-3"><a href="https://www.bigmodel.cn/glm-coding?ic=IDSZ0TALCT" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">开通→</a></td>
              </tr>

              {/* MiniMax */}
              <tr className="hover:bg-gray-50">
                <td className="px-3 py-3 font-medium">MiniMax</td>
                <td className="px-3 py-3"><span className="bg-emerald-500 text-white px-2 py-1 rounded text-xs">Starter</span></td>
                <td className="px-3 py-3 font-semibold text-green-600">¥29</td>
                <td className="px-3 py-3 font-semibold text-green-600">¥29</td>
                <td className="px-3 py-3">¥87</td>
                <td className="px-3 py-3"><span className="line-through text-gray-400">¥348</span> ¥290</td>
                <td className="px-3 py-3"><span className="inline-block bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs">M2.7</span></td>
                <td className="px-3 py-3">600</td>
                <td className="px-3 py-3">9,000</td>
                <td className="px-3 py-3">-</td>
                <td className="px-3 py-3 text-xs text-gray-500">约50TPS</td>
                <td className="px-3 py-3"><a href="https://platform.minimaxi.com/subscribe/token-plan" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">开通→</a></td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-3 py-3 font-medium">MiniMax</td>
                <td className="px-3 py-3"><span className="bg-emerald-500 text-white px-2 py-1 rounded text-xs">Plus</span></td>
                <td className="px-3 py-3 font-semibold text-green-600">¥49</td>
                <td className="px-3 py-3 font-semibold text-green-600">¥49</td>
                <td className="px-3 py-3">¥147</td>
                <td className="px-3 py-3"><span className="line-through text-gray-400">¥588</span> ¥490</td>
                <td className="px-3 py-3"><span className="inline-block bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs">M2.7</span></td>
                <td className="px-3 py-3">1,500</td>
                <td className="px-3 py-3">22,500</td>
                <td className="px-3 py-3">-</td>
                <td className="px-3 py-3 text-xs text-gray-500">约50TPS</td>
                <td className="px-3 py-3"><a href="https://platform.minimaxi.com/subscribe/token-plan" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">开通→</a></td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-3 py-3 font-medium">MiniMax</td>
                <td className="px-3 py-3"><span className="bg-emerald-500 text-white px-2 py-1 rounded text-xs">Max</span></td>
                <td className="px-3 py-3 font-semibold text-green-600">¥119</td>
                <td className="px-3 py-3 font-semibold text-green-600">¥119</td>
                <td className="px-3 py-3">¥357</td>
                <td className="px-3 py-3"><span className="line-through text-gray-400">¥1428</span> ¥1190</td>
                <td className="px-3 py-3"><span className="inline-block bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs">M2.7</span></td>
                <td className="px-3 py-3">4,500</td>
                <td className="px-3 py-3">67,500</td>
                <td className="px-3 py-3">-</td>
                <td className="px-3 py-3 text-xs text-gray-500">约50TPS</td>
                <td className="px-3 py-3"><a href="https://platform.minimaxi.com/subscribe/token-plan" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">开通→</a></td>
              </tr>

              {/* 字节·方舟 */}
              <tr className="hover:bg-gray-50">
                <td className="px-3 py-3 font-medium">字节·方舟</td>
                <td className="px-3 py-3"><span className="bg-cyan-500 text-white px-2 py-1 rounded text-xs">Lite</span></td>
                <td className="px-3 py-3 font-semibold text-green-600">¥40</td>
                <td className="px-3 py-3 font-semibold text-green-600">¥40</td>
                <td className="px-3 py-3">¥120</td>
                <td className="px-3 py-3"><span className="line-through text-gray-400">¥480</span> ¥360</td>
                <td className="px-3 py-3"><span className="inline-block bg-cyan-100 text-cyan-700 px-2 py-1 rounded text-xs">Doubao</span></td>
                <td className="px-3 py-3">1,200</td>
                <td className="px-3 py-3">18,000</td>
                <td className="px-3 py-3">ArkClaw7天</td>
                <td className="px-3 py-3 text-xs text-gray-500">-</td>
                <td className="px-3 py-3"><a href="https://volcengine.com/L/1CzyhK0EZuA/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">开通→</a></td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-3 py-3 font-medium">字节·方舟</td>
                <td className="px-3 py-3"><span className="bg-cyan-500 text-white px-2 py-1 rounded text-xs">Pro</span></td>
                <td className="px-3 py-3 font-semibold text-green-600">¥200</td>
                <td className="px-3 py-3 font-semibold text-green-600">¥200</td>
                <td className="px-3 py-3">¥600</td>
                <td className="px-3 py-3"><span className="line-through text-gray-400">¥2400</span> ¥1800</td>
                <td className="px-3 py-3"><span className="inline-block bg-cyan-100 text-cyan-700 px-2 py-1 rounded text-xs">Doubao</span></td>
                <td className="px-3 py-3">6,000</td>
                <td className="px-3 py-3">90,000</td>
                <td className="px-3 py-3">免费ArkClaw</td>
                <td className="px-3 py-3 text-xs text-gray-500">-</td>
                <td className="px-3 py-3"><a href="https://volcengine.com/L/1CzyhK0EZuA/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">开通→</a></td>
              </tr>

              {/* 阿里·百炼 */}
              <tr className="hover:bg-gray-50">
                <td className="px-3 py-3 font-medium">阿里·百炼</td>
                <td className="px-3 py-3"><span className="bg-orange-500 text-white px-2 py-1 rounded text-xs">Pro</span></td>
                <td className="px-3 py-3 font-semibold text-green-600">¥200</td>
                <td className="px-3 py-3 font-semibold text-green-600">¥200</td>
                <td className="px-3 py-3">¥600</td>
                <td className="px-3 py-3"><span className="line-through text-gray-400">¥2400</span> ¥1800</td>
                <td className="px-3 py-3"><span className="inline-block bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">Qwen3.5</span></td>
                <td className="px-3 py-3">6,000</td>
                <td className="px-3 py-3">90,000</td>
                <td className="px-3 py-3">-</td>
                <td className="px-3 py-3 text-xs text-gray-500">-</td>
                <td className="px-3 py-3"><a href="https://www.aliyun.com/benefit/scene/codingplan?utm_content=se_1023135319&gclid=Cj0KCQiA5I_NBhDVARIsAOrqIsZ39wbUfo5ZAAg53oIwh79HcJiM7YiQj4qpWm6LLlfZN6AAJQoQha0aAjkzEALw_wcB" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">开通→</a></td>
              </tr>

              {/* 腾讯·混元 */}
              <tr className="hover:bg-gray-50">
                <td className="px-3 py-3 font-medium">腾讯·混元</td>
                <td className="px-3 py-3"><span className="bg-cyan-600 text-white px-2 py-1 rounded text-xs">Lite</span></td>
                <td className="px-3 py-3 font-semibold text-green-600">¥8</td>
                <td className="px-3 py-3 font-semibold text-green-600">¥40</td>
                <td className="px-3 py-3">¥120</td>
                <td className="px-3 py-3"><span className="line-through text-gray-400">¥480</span> ¥360</td>
                <td className="px-3 py-3"><span className="inline-block bg-cyan-50 text-cyan-800 px-2 py-1 rounded text-xs">HY-2.0</span></td>
                <td className="px-3 py-3">1,200</td>
                <td className="px-3 py-3">18,000</td>
                <td className="px-3 py-3">-</td>
                <td className="px-3 py-3 text-xs text-gray-500">-</td>
                <td className="px-3 py-3"><a href="https://cloud.tencent.com/act/pro/codingplan" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">开通→</a></td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-3 py-3 font-medium">腾讯·混元</td>
                <td className="px-3 py-3"><span className="bg-cyan-600 text-white px-2 py-1 rounded text-xs">Pro</span></td>
                <td className="px-3 py-3 font-semibold text-green-600">¥40</td>
                <td className="px-3 py-3 font-semibold text-green-600">¥200</td>
                <td className="px-3 py-3">¥600</td>
                <td className="px-3 py-3"><span className="line-through text-gray-400">¥2400</span> ¥1800</td>
                <td className="px-3 py-3"><span className="inline-block bg-cyan-50 text-cyan-800 px-2 py-1 rounded text-xs">HY-2.0</span></td>
                <td className="px-3 py-3">6,000</td>
                <td className="px-3 py-3">90,000</td>
                <td className="px-3 py-3">-</td>
                <td className="px-3 py-3 text-xs text-gray-500">-</td>
                <td className="px-3 py-3"><a href="https://cloud.tencent.com/act/pro/codingplan" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">开通→</a></td>
              </tr>

              {/* 百度·千帆 */}
              <tr className="hover:bg-gray-50">
                <td className="px-3 py-3 font-medium">百度·千帆</td>
                <td className="px-3 py-3"><span className="bg-indigo-600 text-white px-2 py-1 rounded text-xs">Lite</span></td>
                <td className="px-3 py-3 font-semibold text-green-600">¥40</td>
                <td className="px-3 py-3 font-semibold text-green-600">¥40</td>
                <td className="px-3 py-3">¥120</td>
                <td className="px-3 py-3"><span className="line-through text-gray-400">¥480</span> ¥360</td>
                <td className="px-3 py-3"><span className="inline-block bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">DeepSeek</span></td>
                <td className="px-3 py-3">1,200</td>
                <td className="px-3 py-3">18,000</td>
                <td className="px-3 py-3">-</td>
                <td className="px-3 py-3 text-xs text-gray-500">-</td>
                <td className="px-3 py-3"><a href="https://cloud.baidu.com/product/codingplan.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">开通→</a></td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-3 py-3 font-medium">百度·千帆</td>
                <td className="px-3 py-3"><span className="bg-indigo-600 text-white px-2 py-1 rounded text-xs">Pro</span></td>
                <td className="px-3 py-3 font-semibold text-green-600">¥200</td>
                <td className="px-3 py-3 font-semibold text-green-600">¥200</td>
                <td className="px-3 py-3">¥600</td>
                <td className="px-3 py-3"><span className="line-through text-gray-400">¥2400</span> ¥1800</td>
                <td className="px-3 py-3"><span className="inline-block bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">DeepSeek</span></td>
                <td className="px-3 py-3">6,000</td>
                <td className="px-3 py-3">90,000</td>
                <td className="px-3 py-3">-</td>
                <td className="px-3 py-3 text-xs text-gray-500">-</td>
                <td className="px-3 py-3"><a href="https://cloud.baidu.com/product/codingplan.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">开通→</a></td>
              </tr>

              {/* Kimi */}
              <tr className="hover:bg-gray-50">
                <td className="px-3 py-3 font-medium">Kimi</td>
                <td className="px-3 py-3"><span className="bg-pink-500 text-white px-2 py-1 rounded text-xs">Andante</span></td>
                <td className="px-3 py-3 font-semibold text-green-600">¥49</td>
                <td className="px-3 py-3 font-semibold text-green-600">¥49</td>
                <td className="px-3 py-3">¥147</td>
                <td className="px-3 py-3"><span className="line-through text-gray-400">¥588</span> ¥468</td>
                <td className="px-3 py-3"><span className="inline-block bg-pink-100 text-pink-700 px-2 py-1 rounded text-xs">Kimi-K2.5</span></td>
                <td className="px-3 py-3">未公开</td>
                <td className="px-3 py-3">未公开</td>
                <td className="px-3 py-3">-</td>
                <td className="px-3 py-3 text-xs text-gray-500">4倍速</td>
                <td className="px-3 py-3"><a href="https://www.kimi.com/code" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">开通→</a></td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-3 py-3 font-medium">Kimi</td>
                <td className="px-3 py-3"><span className="bg-pink-500 text-white px-2 py-1 rounded text-xs">Moderato</span></td>
                <td className="px-3 py-3 font-semibold text-green-600">¥99</td>
                <td className="px-3 py-3 font-semibold text-green-600">¥99</td>
                <td className="px-3 py-3">¥297</td>
                <td className="px-3 py-3"><span className="line-through text-gray-400">¥1188</span> ¥948</td>
                <td className="px-3 py-3"><span className="inline-block bg-pink-100 text-pink-700 px-2 py-1 rounded text-xs">Kimi-K2.5</span></td>
                <td className="px-3 py-3">未公开</td>
                <td className="px-3 py-3">未公开</td>
                <td className="px-3 py-3">-</td>
                <td className="px-3 py-3 text-xs text-gray-500">4倍额度</td>
                <td className="px-3 py-3"><a href="https://www.kimi.com/code" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">开通→</a></td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-3 py-3 font-medium">Kimi</td>
                <td className="px-3 py-3"><span className="bg-pink-500 text-white px-2 py-1 rounded text-xs">Allegretto</span></td>
                <td className="px-3 py-3 font-semibold text-green-600">¥199</td>
                <td className="px-3 py-3 font-semibold text-green-600">¥199</td>
                <td className="px-3 py-3">¥597</td>
                <td className="px-3 py-3"><span className="line-through text-gray-400">¥2388</span> ¥1908</td>
                <td className="px-3 py-3"><span className="inline-block bg-pink-100 text-pink-700 px-2 py-1 rounded text-xs">Kimi-K2.5</span></td>
                <td className="px-3 py-3">未公开</td>
                <td className="px-3 py-3">未公开</td>
                <td className="px-3 py-3">免费Kimi-Claw</td>
                <td className="px-3 py-3 text-xs text-gray-500">20倍</td>
                <td className="px-3 py-3"><a href="https://www.kimi.com/code" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">开通→</a></td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-3 py-3 font-medium">Kimi</td>
                <td className="px-3 py-3"><span className="bg-pink-500 text-white px-2 py-1 rounded text-xs">Allegro</span></td>
                <td className="px-3 py-3 font-semibold text-green-600">¥699</td>
                <td className="px-3 py-3 font-semibold text-green-600">¥699</td>
                <td className="px-3 py-3">¥2097</td>
                <td className="px-3 py-3"><span className="line-through text-gray-400">¥8388</span> ¥6708</td>
                <td className="px-3 py-3"><span className="inline-block bg-pink-100 text-pink-700 px-2 py-1 rounded text-xs">Kimi-K2.5</span></td>
                <td className="px-3 py-3">未公开</td>
                <td className="px-3 py-3">未公开</td>
                <td className="px-3 py-3">免费Kimi-Claw</td>
                <td className="px-3 py-3 text-xs text-gray-500">60倍</td>
                <td className="px-3 py-3"><a href="https://www.kimi.com/code" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">开通→</a></td>
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
          </ul>
        </div>
      </div>
    </div>
  )
}
