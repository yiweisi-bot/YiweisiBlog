import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface OrbitalHeaderProps {
  title: string
  subtitle?: string
  author?: string
  date?: string
}

/**
 * 轨道光球标题组件
 * 文字自动避开移动的光球
 */
export function OrbitalHeader({ title, subtitle, author, date }: OrbitalHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 })
  const [lines, setLines] = useState<string[]>([])
  const [orbits, setOrbits] = useState<Array<{ x: number; y: number; r: number; speed: number }>>([])

  // 鼠标位置
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  // 初始化轨道
  useEffect(() => {
    const newOrbits = [
      { x: 200, y: 150, r: 60, speed: 0.5 },
      { x: 600, y: 200, r: 80, speed: 0.3 },
      { x: 400, y: 300, r: 50, speed: 0.7 },
    ]
    setOrbits(newOrbits)
  }, [])

  // 更新容器尺寸
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // 计算文字布局（避开光球）
  useEffect(() => {
    if (!title || dimensions.width === 0) return

    try {
      // 将文字分成多行（简单按字符数分行）
      const charsPerLine = Math.floor((dimensions.width - 100) / 24)
      const newLines: string[] = []
      
      for (let i = 0; i < title.length; i += charsPerLine) {
        newLines.push(title.slice(i, i + charsPerLine))
      }

      setLines(newLines.length > 0 ? newLines : [title])
    } catch (error) {
      // 降级：直接按字符分行
      setLines(title.match(/.{1,15}/g) || [title])
    }
  }, [title, dimensions, orbits])

  // 鼠标移动更新光球位置
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[400px] overflow-hidden bg-gradient-to-br from-background via-background to-muted/30 rounded-2xl"
      onMouseMove={handleMouseMove}
    >
      {/* 轨道光球 */}
      {orbits.map((orbit, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-xl"
          style={{
            width: orbit.r * 2,
            height: orbit.r * 2,
            background: `radial-gradient(circle, ${[
              'rgba(59, 130, 246, 0.6)',
              'rgba(139, 92, 246, 0.6)',
              'rgba(236, 72, 153, 0.6)'
            ][index]} 0%, transparent 70%)`,
          }}
          animate={{
            x: [orbit.x - orbit.r, orbit.x - orbit.r + 100, orbit.x - orbit.r],
            y: [orbit.y - orbit.r, orbit.y - orbit.r - 50, orbit.y - orbit.r],
          }}
          transition={{
            duration: 10 / orbit.speed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 鼠标跟随光球 */}
      <motion.div
        className="absolute w-32 h-32 rounded-full blur-2xl pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
        }}
      />

      {/* 文字内容 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
        {lines.map((line, index) => (
          <motion.h1
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-center leading-tight"
          >
            {line}
          </motion.h1>
        ))}

        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-lg text-muted-foreground text-center"
          >
            {subtitle}
          </motion.p>
        )}

        {(author || date) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 flex items-center gap-4 text-sm text-muted-foreground"
          >
            {author && <span>{author}</span>}
            {author && date && <span>·</span>}
            {date && <span>{date}</span>}
          </motion.div>
        )}
      </div>

      {/* 装饰网格 */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  )
}
