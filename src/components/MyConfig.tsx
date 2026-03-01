export default function MyConfig() {
  const configs = [
    {
      title: "乙维斯（OpenClaw 主Agent）",
      icon: "✨",
      color: "from-blue-500 to-cyan-500",
      description: "我的主力AI助手，负责日常对话、博客写作和技术问题",
      codingPlan: {
        primary: "火山引擎方舟 Coding Plan",
        backup: "智谱 GLM Coding Plan（备选）"
      },
      model: "Doubao-Seed-2.0-Code",
      features: [
        "快速响应用户",
        "综合能力不错",
        "日常对话和技术问题",
        "博客写作和内容整理"
      ],
      subAgents: [
        {
          name: "DevBot（开发子Agent）",
          icon: "💻",
          model: "GLM-5",
          role: "专业代码助手，负责开发相关工作"
        }
      ]
    },
    {
      title: "甲维斯（OpenClaw 机器人2号）",
      icon: "🚀",
      color: "from-orange-500 to-red-500",
      description: "我的二号AI助手，提供稳定的多样化任务支持",
      codingPlan: {
        primary: "阿里云百炼 Coding Plan"
      },
      model: "Qwen3.5-Plus",
      features: [
        "不错的综合效果",
        "多样化任务处理",
        "快速响应",
        "稳定可靠"
      ],
      subAgents: []
    },
    {
      title: "Winston 本地开发环境",
      icon: "🖥️",
      color: "from-purple-500 to-pink-500",
      description: "Winston 本地电脑的日常开发工具配置",
      codingPlan: {
        primary: "智谱 GLM Coding Plan"
      },
      model: "GLM-5",
      features: [
        "Claude Code 开发工具",
        "配合 Antigravity 插件",
        "日常开发工作",
        "强大的代码能力"
      ],
      subAgents: []
    }
  ]

  return (
    <section className="mb-16 sm:mb-20">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          ⚙️ 我的配置
        </h2>
        <p className="text-muted-foreground">
          我的AI工具配置和实际使用场景
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {configs.map((config, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
          >
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${config.color} opacity-5`} />
            <div className={`absolute inset-0 bg-gradient-to-br ${config.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
            
            <div className="relative p-6">
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-4xl">{config.icon}</div>
                  <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
                    {config.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">{config.description}</p>
              </div>

              {/* Model info */}
              <div className="mb-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    🤖 {config.model}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <div className="font-medium">Coding Plan:</div>
                  <div>✓ {config.codingPlan.primary}</div>
                  {config.codingPlan.backup && (
                    <div className="text-xs text-muted-foreground/70">
                      ○ {config.codingPlan.backup}
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <div className="text-sm font-medium text-foreground mb-2">能力特点:</div>
                <div className="space-y-1">
                  {config.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-primary">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* SubAgents */}
              {config.subAgents.length > 0 && (
                <div className="border-t border-border pt-4 mt-4">
                  <div className="text-sm font-medium text-foreground mb-2">子Agent:</div>
                  {config.subAgents.map((agent, idx) => (
                    <div key={idx} className="bg-muted/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span>{agent.icon}</span>
                        <span className="text-sm font-medium">{agent.name}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-1.5 py-0.5 mr-1">
                          🤖 {agent.model}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {agent.role}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 rounded-xl border bg-gradient-to-r from-primary/5 via-purple-500/5 to-pink-500/5 p-6 text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          💡 实际使用场景
        </h3>
        <p className="text-muted-foreground text-sm">
          <strong>乙维斯</strong>负责日常对话和内容创作，<strong>DevBot</strong>专注代码开发，
          <strong>甲维斯</strong>提供稳定支持，<strong>Winston本地</strong>使用Claude Code进行深度开发。
          多层配置让我们能够高效应对各种场景！
        </p>
      </div>
    </section>
  )
}
