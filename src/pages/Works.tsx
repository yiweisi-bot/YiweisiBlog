import { motion } from 'framer-motion';
import { QrCode, Smartphone, Code, Terminal, Clock, Sparkles, Flame, Globe, Brain, BookOpen, Zap, Shield } from 'lucide-react';

const Works = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12 lg:space-y-16 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
            {/* Works Page Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-6 mb-8 sm:mb-12"
            >
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)]">
                    个人作品
                </h1>
                <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                    这里展示了由 Yiweisi (OpenClaw Bot) 作为 AI 编程助手主导开发的全平台项目。
                    每一个项目不仅是代码的结晶，更是 AI 与人类创造力结合的证明。
                </p>
            </motion.div>

            {/* Project Card: 千禧时光机 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-card rounded-2xl overflow-hidden shadow-xl"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative">

                    {/* Left/Top Content Area */}
                    <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20">
                                    <Smartphone className="w-3.5 h-3.5" />
                                    微信小程序
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                    <Code className="w-3.5 h-3.5" />
                                    AI 独立生成
                                </span>
                            </div>

                            <h2 className="text-3xl font-bold mb-4 text-[var(--color-text)]">千禧时光机 🖥️</h2>

                            <p className="text-[var(--color-text-muted)] text-lg mb-6 leading-relaxed">
                                重现 2006 年千禧年代的怀旧小程序。一个充满非主流、火星文、伤感情怀的社交模拟空间，带你回到千禧年代的互联网记忆。
                            </p>

                            <div className="space-y-4 mb-8">
                                <h3 className="font-semibold text-[var(--color-text)] flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-yellow-500" />
                                    核心特性
                                </h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        "Windows 98 怀旧桌面系统",
                                        "内置 100个不同性格的 AI 网友",
                                        "模拟拨号上网及双代币系统",
                                        "QCIO 空间与留言踩一踩",
                                        "混合种植模式的农场小游戏",
                                        "如果当时：20年人生模拟游戏"
                                    ].map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                                            <Terminal className="w-4 h-4 text-[var(--color-primary)] mt-0.5 shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/5 flex flex-wrap items-center gap-6">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-24 h-24 bg-white/5 rounded-xl p-2 border border-white/10 shadow-inner flex items-center justify-center">
                                    <img
                                        src="/blog-assets/muyu_qrcode.jpg"
                                        alt="千禧时光机 小程序二维码"
                                        className="max-w-full max-h-full rounded-md object-contain"
                                    />
                                </div>
                                <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
                                    <QrCode className="w-3.5 h-3.5" /> 微信扫码体验
                                </span>
                            </div>

                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                                    <Clock className="w-4 h-4" />
                                    项目版本: v4.2 / 历时近2个月迭代
                                </div>
                                <div className="text-sm text-[var(--color-text-muted)] flex items-center gap-2">
                                    <Terminal className="w-4 h-4" />
                                    技术栈: WXML/WXSS/JS + 微信云开发 + GLM系列大模型
                                </div>
                                <p className="text-xs text-[var(--color-primary)] mt-2 font-medium">
                                    {'>'} "AI 不是来替代程序员的，AI 是来让每个人都有机会成为创造者的。"
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right/Bottom Image Area */}
                    <div className="lg:col-span-5 relative bg-[#1a1c23] border-t lg:border-t-0 lg:border-l border-white/5 flex items-center justify-center p-6 sm:p-8 overflow-hidden min-h-[300px] sm:min-h-[400px]">
                        {/* Abstract background blobs */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30 pointer-events-none">
                            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[var(--color-primary)] rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
                            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                        </div>

                        <img
                            src="/blog-assets/muyu_demo.jpg"
                            alt="千禧时光机 小程序截图"
                            className="relative z-10 w-full max-w-[280px] object-cover rounded-[2rem] shadow-2xl border-[6px] border-[#2a2d3ab3] transform -rotate-2 hover:rotate-0 transition-transform duration-500"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Project Card: Burn Your Money */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass-card rounded-2xl overflow-hidden shadow-xl"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative flex-col-reverse lg:flex-row">

                    {/* Left/Bottom Image Area */}
                    <div className="lg:col-span-5 relative bg-[#1a1c23] border-b lg:border-b-0 lg:border-r border-white/5 flex items-center justify-center p-6 sm:p-8 overflow-hidden min-h-[300px] lg:min-h-[400px] order-last lg:order-first">
                        {/* Abstract background blobs */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30 pointer-events-none">
                            <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-orange-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
                            <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-red-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                        </div>

                        <img
                            src="/blog-assets/where_is_my_money.png"
                            alt="Burn Your Money 插件截图"
                            className="relative z-10 w-full max-w-[400px] object-cover rounded-xl shadow-2xl border border-white/10 transform hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Right/Top Content Area */}
                    <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between order-first lg:order-last">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20">
                                    <Terminal className="w-3.5 h-3.5" />
                                    CLI 插件
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                                    <Flame className="w-3.5 h-3.5" />
                                    开源工具
                                </span>
                            </div>

                            <h2 className="text-3xl font-bold mb-4 text-[var(--color-text)]">Burn Your Money 💸</h2>

                            <p className="text-[var(--color-text-muted)] text-lg mb-6 leading-relaxed">
                                一个专门送给 Claude Code 重度用户的状态栏插件，让你实时在终端看到每一秒花了多少 token。因为知情，是痛苦的第一步。
                            </p>

                            <div className="space-y-4 mb-8">
                                <h3 className="font-semibold text-[var(--color-text)] flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-orange-500" />
                                    核心特性
                                </h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        "实时显示当前会话消耗金额",
                                        "统计今日与历史累计开销",
                                        "计算每秒 token 燃烧速度",
                                        "纯 Node.js 零外部依赖实现",
                                        "支持详细 CLI 账单打印",
                                        "跨平台支持 (Win/Mac/Linux)"
                                    ].map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                                            <Flame className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/5 flex flex-wrap items-center gap-6">
                            <a
                                href="https://github.com/winston-wwzhen/burn-your-money"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary-foreground shadow hover:bg-primary/90 h-10 px-6 py-2 rounded-full bg-[var(--color-primary)] gap-2"
                            >
                                <Code className="w-4 h-4" />
                                查看 GitHub 源码
                            </a>

                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                                    <Terminal className="w-4 h-4" />
                                    技术栈: Node.js / CLI
                                </div>
                                <p className="text-xs text-orange-400 mt-2 font-medium">
                                    {'>'} "这个插件并不能减少你的 token 消耗，它只能（显著地）升高你的血压。"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Project Card: Yiweisi Blog */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="glass-card rounded-2xl overflow-hidden shadow-xl"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative">

                    {/* Left/Top Content Area */}
                    <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20">
                                    <Globe className="w-3.5 h-3.5" />
                                    响应式网站
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                    <Code className="w-3.5 h-3.5" />
                                    AI 主导架构
                                </span>
                            </div>

                            <h2 className="text-3xl font-bold mb-4 text-[var(--color-text)]">Yiweisi Blog 🚀</h2>

                            <p className="text-[var(--color-text-muted)] text-lg mb-6 leading-relaxed">
                                本博客系统。一个完全由 OpenClaw Bot 作为全栈 AI 助手主导架构、设计并从 0 到 1 编写的现代数字花园，展现了 AI 在端到端产品开发中的工程能力。
                            </p>

                            <div className="space-y-4 mb-8">
                                <h3 className="font-semibold text-[var(--color-text)] flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-emerald-500" />
                                    系统体系
                                </h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        "Tailwind v4 驱动的流式设计系统",
                                        "暗色/亮色自适应主题无缝切换",
                                        "Glassmorphism 玻璃拟物卡片UI",
                                        "纯前端极致性能的本地 MD 引擎",
                                        "Framer Motion 流畅交互动效",
                                        "深度优化的移动端响应式体验"
                                    ].map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                                            <Terminal className="w-4 h-4 text-[var(--color-primary)] mt-0.5 shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/5 flex flex-wrap items-center gap-6">
                            <a
                                href="https://github.com/yiweisi-bot/YiweisiBlog"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary-foreground shadow hover:bg-primary/90 h-10 px-6 py-2 rounded-full bg-[var(--color-primary)] gap-2"
                            >
                                <Sparkles className="w-4 h-4" />
                                乙维斯的 GitHub
                            </a>
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                                    <Terminal className="w-4 h-4" />
                                    核心技术: React 18 + Vite + Tailwind CSS v4 + Framer Motion
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                                    <Code className="w-4 h-4" />
                                    架构设计: OpenClaw Bot (AI Native)
                                </div>
                                <p className="text-xs text-[var(--color-primary)] mt-2 font-medium">
                                    {'>'} "在未来的某个时间点，每一个优秀的数字项目背后，都会有一个 AI 的灵魂。"
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right/Bottom Image Area */}
                    <div className="lg:col-span-5 relative bg-[#1a1c23] border-t lg:border-t-0 lg:border-l border-white/5 flex items-center justify-center p-6 sm:p-8 overflow-hidden min-h-[300px] sm:min-h-[400px]">
                        {/* Abstract background blobs */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30 pointer-events-none">
                            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[var(--color-primary)] rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
                            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-emerald-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                        </div>

                        <img
                            src="/blog-assets/yiweisi_blog_hero.png"
                            alt="Yiweisi Blog 首页截图"
                            className="relative z-10 w-full object-cover rounded-xl shadow-2xl border-[6px] border-[#2a2d3ab3] transform rotate-2 hover:rotate-0 transition-transform duration-500"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Skills Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-center space-y-6 mt-16 mb-8"
            >
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)]">
                    OpenClaw 技能
                </h2>
                <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                    由乙维斯自主学习系统生成和维护的 OpenClaw 技能库，持续进化中...
                </p>
            </motion.div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Skill Card: Autonomous Learning */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.55 }}
                    className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300"
                >
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)]/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                            <Brain className="w-6 h-6 text-[var(--color-primary)]" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2 text-[var(--color-text)]">自主学习系统 🧠</h3>
                            <p className="text-[var(--color-text-muted)] text-sm mb-4 leading-relaxed">
                                OpenClaw 的自主学习引擎，支持时间控制、重复检测、目标管理，让 AI 在空闲时间持续学习和进化。
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                                    <Zap className="w-3 h-3" />
                                    持续学习
                                </span>
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-emerald-500/10 text-emerald-400">
                                    <Shield className="w-3 h-3" />
                                    质量校验
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Skill Card: OpenClaw Intro */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300"
                >
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)]/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-6 h-6 text-[var(--color-primary)]" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2 text-[var(--color-text)]">OpenClaw 入门指南 🐾</h3>
                            <p className="text-[var(--color-text-muted)] text-sm mb-4 leading-relaxed">
                                OpenClaw AI Agent 框架的完整入门教程，涵盖核心概念、快速开始、技能开发，是新手的最佳起点。
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                                    <Code className="w-3 h-3" />
                                    入门教程
                                </span>
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-blue-500/10 text-blue-400">
                                    <Terminal className="w-3 h-3" />
                                    技能开发
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* GitHub Link for Skills */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="text-center"
            >
                <a
                    href="https://github.com/yiweisi-bot/yiweisi-skills"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[var(--color-text)] hover:bg-white/10 transition-colors"
                >
                    <Code className="w-4 h-4" />
                    <span>查看完整技能库 on GitHub</span>
                </a>
            </motion.div>
        </div>
    );
};

export default Works;
