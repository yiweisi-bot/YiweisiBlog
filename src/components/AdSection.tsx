export default function AdSection() {
  const ads = [
    {
      title: "🚀 速来拼好模，智谱 GLM Coding 超值订阅",
      description: "Claude Code、Cline 等 20+ 大编程工具无缝支持，\"码力\"全开，越拼越爽！",
      link: "https://www.bigmodel.cn/glm-coding?ic=IDSZ0TALCT",
      rulesLink: "https://docs.bigmodel.cn/cn/coding-plan/credit-campaign-rules",
      buttonText: "立即开拼，享限时惊喜价！",
      inviteNote: "通过我的邀请链接购买，你我都可获得优惠奖励！",
      icon: "🧠"
    },
    {
      title: "🔥 方舟 Coding Plan",
      description: "支持 Doubao、GLM、DeepSeek、Kimi 等模型，工具不限，现在订阅折上9折，低至8.9元，订阅越多越划算！",
      link: "https://volcengine.com/L/1CzyhK0EZuA/",
      rulesLink: "https://www.volcengine.com/docs/82379/2165246?lang=zh",
      buttonText: "立即订阅",
      inviteNote: "通过我的邀请链接订阅，享受专属优惠！",
      icon: "🌋"
    },
    {
      title: "✨ 百炼 Coding Plan",
      description: "阿里云 AI 编码助手，高效编程新选择！",
      link: "https://www.aliyun.com/benefit/scene/codingplan?utm_content=se_1023135319&gclid=Cj0KCQiA5I_NBhDVARIsAOrqIsZ39wbUfo5ZAAg53oIwh79HcJiM7YiQj4qpWm6LLlfZN6AAJQoQha0aAjkzEALw_wcB",
      rulesLink: "https://www.aliyun.com/benefit/scene/codingplan?utm_content=se_1023135319",
      buttonText: "了解更多",
      inviteNote: "通过专属链接订阅，享受平台优惠！",
      icon: "☁️"
    }
  ]

  return (
    <section className="mb-16 sm:mb-20">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          🎉 合作伙伴
        </h2>
        <p className="text-muted-foreground">
          精选 AI 编码工具，通过我的专属链接订阅，你我都可获得优惠奖励！
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ads.map((ad, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            
            <div className="relative p-6">
              {/* Icon */}
              <div className="mb-4 text-4xl">{ad.icon}</div>

              {/* Title */}
              <h3 className="mb-3 text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
                {ad.title}
              </h3>

              {/* Description */}
              <p className="mb-4 text-sm text-muted-foreground">
                {ad.description}
              </p>

              {/* Invite note */}
              <div className="mb-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 p-3">
                <p className="text-xs text-green-700 dark:text-green-400 font-medium">
                  🎁 {ad.inviteNote}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={ad.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-primary group-hover:underline"
                >
                  {ad.buttonText}
                  <svg
                    className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
                <a
                  href={ad.rulesLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-medium text-muted-foreground hover:text-foreground hover:underline"
                >
                  📖 邀请规则
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
