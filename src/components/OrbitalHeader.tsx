import { useEffect, useRef, useState, useMemo } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

interface OrbitalHeaderProps {
  title: string
  subtitle?: string
  author?: string
  date?: string
}

interface Orb {
  id: number
  x: number
  y: number
  r: number
  vx: number
  vy: number
  color: string
}

interface TextLine {
  text: string
  x: number
  y: number
  width: number
  height: number
}

/**
 * Pretext 轨道光球标题组件
 * 使用 Pretext 计算文字布局，光球实时推开文字
 */
export function OrbitalHeader({ title, subtitle, author, date }: OrbitalHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 })
  const [orbits, setOrbits] = useState<Orb[]>([])
  const [textLines, setTextLines] = useState<TextLine[]>([])
  const animationRef = useRef<number | undefined>(undefined)

  // 鼠标位置
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { stiffness: 100, damping: 30 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  // 字体配置
  const fontConfig = useMemo(() => ({
    font: 'bold 48px system-ui, -apple-system, sans-serif',
    lineHeight: 60,
    maxWidth: dimensions.width - 100,
  }), [dimensions.width])

  // 初始化光球
  useEffect(() => {
    const newOrbits: Orb[] = [
      { id: 1, x: 200, y: 150, r: 60, vx: 0.8, vy: 0.5, color: 'rgba(59, 130, 246, 0.8)' },
      { id: 2, x: 600, y: 200, r: 80, vx: -0.6, vy: 0.4, color: 'rgba(139, 92, 246, 0.8)' },
      { id: 3, x: 400, y: 300, r: 50, vx: 0.5, vy: -0.7, color: 'rgba(236, 72, 153, 0.8)' },
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

  // 使用 Pretext 计算文字布局
  useEffect(() => {
    if (!title || dimensions.width === 0) return

    try {
      // 准备字体（带 segments 以便获取每行文字）
      const preparedFont = prepareWithSegments(title, fontConfig.font)

      // 使用 Pretext 布局文字并获取行信息
      const result = layoutWithLines(preparedFont, fontConfig.maxWidth, fontConfig.lineHeight)

      // 转换为行数据
      const lines: TextLine[] = []
      let currentY = dimensions.height / 2 - (result.lines.length * fontConfig.lineHeight) / 2

      result.lines.forEach((line) => {
        lines.push({
          text: line.text,
          x: dimensions.width / 2 - line.width / 2,
          y: currentY,
          width: line.width,
          height: fontConfig.lineHeight,
        })
        currentY += fontConfig.lineHeight
      })

      setTextLines(lines)
    } catch (error) {
      console.error('Pretext layout error:', error)
      // 降级：简单分行
      const charsPerLine = Math.floor(fontConfig.maxWidth / 24)
      const rawLines: string[] = []
      for (let i = 0; i < title.length; i += charsPerLine) {
        rawLines.push(title.slice(i, i + charsPerLine))
      }

      const lines: TextLine[] = []
      let currentY = dimensions.height / 2 - (rawLines.length * fontConfig.lineHeight) / 2
      rawLines.forEach((line) => {
        lines.push({
          text: line,
          x: dimensions.width / 2 - line.length * 12,
          y: currentY,
          width: line.length * 24,
          height: fontConfig.lineHeight,
        })
        currentY += fontConfig.lineHeight
      })
      setTextLines(lines)
    }
  }, [title, dimensions, fontConfig])

  // 动画循环 - 更新光球位置并检测碰撞
  useEffect(() => {
    if (orbits.length === 0 || textLines.length === 0) return

    const animate = () => {
      setOrbits(prevOrbs => {
        return prevOrbs.map(orb => {
          let newX = orb.x + orb.vx
          let newY = orb.y + orb.vy
          let newVx = orb.vx
          let newVy = orb.vy

          // 边界反弹
          if (newX - orb.r < 0 || newX + orb.r > dimensions.width) {
            newVx = -newVx
            newX = Math.max(orb.r, Math.min(dimensions.width - orb.r, newX))
          }
          if (newY - orb.r < 0 || newY + orb.r > dimensions.height) {
            newVy = -newVy
            newY = Math.max(orb.r, Math.min(dimensions.height - orb.r, newY))
          }

          // 检测与文字的碰撞并推开
          textLines.forEach(line => {
            const lineLeft = line.x - 20
            const lineRight = line.x + line.width + 20
            const lineTop = line.y - 10
            const lineBottom = line.y + line.height + 10

            // 找到光球到文字矩形最近的点
            const closestX = Math.max(lineLeft, Math.min(newX, lineRight))
            const closestY = Math.max(lineTop, Math.min(newY, lineBottom))

            const dx = newX - closestX
            const dy = newY - closestY
            const distance = Math.sqrt(dx * dx + dy * dy)

            // 如果碰撞，推开光球
            if (distance < orb.r + 10) {
              const pushFactor = (orb.r + 10 - distance) / distance
              if (distance > 0) {
                newX += dx * pushFactor * 0.1
                newY += dy * pushFactor * 0.1
              }
            }
          })

          return { ...orb, x: newX, y: newY, vx: newVx, vy: newVy }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [orbits.length, textLines, dimensions])

  // 鼠标移动
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  // 计算每行文字的偏移（被光球推开）
  const getLineTransform = (line: TextLine) => {
    let offsetX = 0
    let offsetY = 0

    orbits.forEach(orb => {
      const lineCenterX = line.x + line.width / 2
      const lineCenterY = line.y + line.height / 2

      const dx = lineCenterX - orb.x
      const dy = lineCenterY - orb.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      // 如果光球靠近文字，推开文字
      if (distance < orb.r + line.width / 2 + 50) {
        const pushStrength = 1 - distance / (orb.r + line.width / 2 + 50)
        if (distance > 0) {
          offsetX += (dx / distance) * pushStrength * 30
          offsetY += (dy / distance) * pushStrength * 15
        }
      }
    })

    return { x: offsetX, y: offsetY }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] overflow-hidden bg-gradient-to-br from-background via-background to-muted/30 rounded-2xl"
      onMouseMove={handleMouseMove}
    >
      {/* 光球层 */}
      {orbits.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full blur-xl pointer-events-none"
          style={{
            width: orb.r * 2,
            height: orb.r * 2,
            left: orb.x - orb.r,
            top: orb.y - orb.r,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            boxShadow: `0 0 ${orb.r}px ${orb.color}`,
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2 + orb.id * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 鼠标跟随光晕 */}
      <motion.div
        className="absolute w-40 h-40 rounded-full blur-2xl pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
        }}
      />

      {/* 文字层 - 使用 Pretext 布局，会被光球推开 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
        {textLines.map((line, index) => {
          const transform = getLineTransform(line)
          return (
            <motion.div
              key={index}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-center leading-tight whitespace-nowrap"
              style={{
                x: line.x + transform.x,
                y: line.y + transform.y,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {line.text}
            </motion.div>
          )
        })}

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
