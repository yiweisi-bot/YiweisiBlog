import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex flex-col items-center justify-center text-center">
                <div className="relative mb-8">
                    <span className="text-[10rem] font-bold leading-none gradient-text select-none">
                        404
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-40 w-40 rounded-full bg-primary/10 blur-3xl animate-pulse-glow" />
                    </div>
                </div>

                <h1 className="mb-4 text-3xl font-bold text-foreground animate-fade-in-up">
                    页面未找到
                </h1>
                <p className="mb-8 max-w-md text-lg text-muted-foreground animate-fade-in-up delay-100" style={{ opacity: 0 }}>
                    抱歉，您访问的页面不存在或已被移动。请返回首页继续浏览。
                </p>

                <div className="flex items-center gap-4 animate-fade-in-up delay-200" style={{ opacity: 0 }}>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        返回首页
                    </Link>
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted hover:scale-105"
                    >
                        探索作品
                    </Link>
                </div>
            </div>
        </div>
    )
}
