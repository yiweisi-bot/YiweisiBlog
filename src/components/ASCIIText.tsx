import { useEffect, useState, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'

interface ASCIITextProps {
  text: string
  className?: string
  width?: number
  height?: number
  fontSize?: number
}

// ASCII 字符集（从暗到亮）
const ASCII_CHARS = ' .:-=+*#%@'

/**
 * ASCII 艺术文字组件
 * 粒子驱动的 ASCII 艺术效果
 */
export function ASCIIText({ 
  text, 
  className = '', 
  width = 600, 
  height = 200,
  fontSize = 12 
}: ASCIITextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [asciiArt, setAsciiArt] = useState<string[]>([])
  const [particles, setParticles] = useState<Array<{ x: number; y: number; vx: number; vy: number }>>([])

  // 初始化粒子
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    }))
    setParticles(newParticles)
  }, [width, height])

  // 生成 ASCII 艺术
  useEffect(() => {
    if (!text || particles.length === 0) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置画布
    canvas.width = width
    canvas.height = height

    // 绘制文字
    ctx.fillStyle = 'white'
    ctx.font = `bold ${fontSize * 2}px Inter`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, width / 2, height / 2)

    // 获取像素数据
    const imageData = ctx.getImageData(0, 0, width, height)
    const data = imageData.data

    // 计算亮度场
    const brightness: number[][] = []
    const cols = Math.floor(width / fontSize)
    const rows = Math.floor(height / fontSize)

    for (let y = 0; y < rows; y++) {
      brightness[y] = []
      for (let x = 0; x < cols; x++) {
        const pixelX = x * fontSize
        const pixelY = y * fontSize
        const index = (pixelY * width + pixelX) * 4
        const r = data[index]
        const g = data[index + 1]
        const b = data[index + 2]
        const avg = (r + g + b) / 3
        brightness[y][x] = avg
      }
    }

    // 添加粒子影响
    particles.forEach(particle => {
      const px = Math.floor(particle.x / fontSize)
      const py = Math.floor(particle.y / fontSize)
      const radius = 5

      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const x = px + dx
          const y = py + dy
          if (x >= 0 && x < cols && y >= 0 && y < rows) {
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < radius) {
              brightness[y][x] = Math.min(255, brightness[y][x] + (1 - dist / radius) * 100)
            }
          }
        }
      }
    })

    // 转换为 ASCII
    const art: string[] = []
    for (let y = 0; y < rows; y++) {
      let line = ''
      for (let x = 0; x < cols; x++) {
        const b = brightness[y][x]
        const charIndex = Math.floor((b / 255) * (ASCII_CHARS.length - 1))
        line += ASCII_CHARS[charIndex]
      }
      art.push(line)
    }

    setAsciiArt(art)
  }, [text, particles, width, height, fontSize])

  // 动画更新粒子
  useEffect(() => {
    let animationId: number

    const animate = () => {
      setParticles(prev => prev.map(p => {
        let newX = p.x + p.vx
        let newY = p.y + p.vy

        // 边界反弹
        if (newX < 0 || newX > width) {
          p.vx *= -1
          newX = Math.max(0, Math.min(width, newX))
        }
        if (newY < 0 || newY > height) {
          p.vy *= -1
          newY = Math.max(0, Math.min(height, newY))
        }

        return { ...p, x: newX, y: newY }
      }))

      animationId = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animationId)
  }, [width, height])

  return (
    <div className={`relative ${className}`}>
      {/* 隐藏的画布用于计算 */}
      <canvas ref={canvasRef} className="hidden" />
      
      {/* ASCII 艺术显示 */}
      <div className="font-mono text-xs leading-none whitespace-pre text-primary/80 overflow-hidden">
        {asciiArt.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.02 }}
          >
            {line}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/**
 * 简单的 ASCII 装饰组件
 */
export function ASCIIDecoration({ 
  className = '',
  variant = 'border'
}: { 
  className?: string
  variant?: 'border' | 'corner' | 'divider'
}) {
  const decorations = useMemo(() => {
    switch (variant) {
      case 'border':
        return [
          '╔══════════════════════════════════╗',
          '║                                  ║',
          '╚══════════════════════════════════╝',
        ]
      case 'corner':
        return [
          '┌──┐',
          '│  │',
          '└──┘',
        ]
      case 'divider':
        return [
          '────────────────────────────────────',
          '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓',
          '────────────────────────────────────',
        ]
      default:
        return []
    }
  }, [variant])

  return (
    <div className={`font-mono text-xs text-muted-foreground/30 ${className}`}>
      {decorations.map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>
  )
}

/**
 * 打字机效果的 ASCII 标题
 */
export function ASCIITyper({ 
  text, 
  className = '',
  speed = 50 
}: { 
  text: string
  className?: string
  speed?: number
}) {
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  // 光标闪烁
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`font-mono text-sm ${className}`}>
      <span className="text-primary">{displayText}</span>
      <span className={`text-primary ${showCursor ? 'opacity-100' : 'opacity-0'}`}>▋</span>
    </div>
  )
}
