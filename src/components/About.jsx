import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState, useCallback } from 'react'

const stats = [
  { num: '2nd', label: 'Year @ VIT' },
  { num: '12+', label: 'Projects Built' },
  { num: '8+', label: 'Technologies' },
  { num: '∞', label: 'Curiosity' },
]

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut', delay, }}
    >
      {children}
    </motion.div>
  )
}

function SnakeGame() {
  const canvasRef = useRef(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  
  const snakeRef = useRef([{ x: 10, y: 10 }])
  const dirRef = useRef({ x: 0, y: 0 })
  const nextDirRef = useRef({ x: 0, y: 0 })
  const foodRef = useRef({ x: 15, y: 5 })
  const lastTimeRef = useRef(0)
  
  // Bonus mechanics refs
  const scoreRef = useRef(0)
  const isBonusFoodRef = useRef(false)
  const speedBoostEndTimeRef = useRef(0)
  
  const gridSize = 20
  const tileCount = 20
  
  const placeFood = (currentScore) => {
    let newX, newY, safe
    do {
      safe = true
      newX = Math.floor(Math.random() * tileCount)
      newY = Math.floor(Math.random() * tileCount)
      for (const p of snakeRef.current) {
        if (p.x === newX && p.y === newY) safe = false
      }
    } while (!safe)
    foodRef.current = { x: newX, y: newY }

    // Spawn bonus food if score is a non-zero multiple of 5
    if (currentScore > 0 && currentScore % 5 === 0) {
      isBonusFoodRef.current = true
    } else {
      isBonusFoodRef.current = false
    }
  }

  const resetGame = useCallback(() => {
    snakeRef.current = [{ x: 10, y: 10 }]
    dirRef.current = { x: 0, y: 0 }
    nextDirRef.current = { x: 0, y: 0 }
    scoreRef.current = 0
    isBonusFoodRef.current = false
    speedBoostEndTimeRef.current = 0
    setScore(0)
    setGameOver(false)
    setIsStarted(false)
    placeFood(0)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let reqId

    const loop = (time) => {
      reqId = requestAnimationFrame(loop)
      if (gameOver) return
      
      // Speed logic
      let currentDelay = 100 // default speed
      if (time < speedBoostEndTimeRef.current) {
        currentDelay = 50 // fast speed during boost
      }

      if (time - lastTimeRef.current < currentDelay) return
      lastTimeRef.current = time

      dirRef.current = nextDirRef.current
      const head = { ...snakeRef.current[0] }
      
      if (dirRef.current.x !== 0 || dirRef.current.y !== 0) {
        if (!isStarted) setIsStarted(true)
        head.x += dirRef.current.x
        head.y += dirRef.current.y

        // Wrap around boundaries
        if (head.x < 0) head.x = tileCount - 1
        else if (head.x >= tileCount) head.x = 0
        
        if (head.y < 0) head.y = tileCount - 1
        else if (head.y >= tileCount) head.y = 0

        // Game over only on self collision
        if (snakeRef.current.some(s => s.x === head.x && s.y === head.y)) {
          setGameOver(true)
          return
        }

        snakeRef.current.unshift(head)

        if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
          const pointsEarned = isBonusFoodRef.current ? 3 : 1
          scoreRef.current += pointsEarned
          setScore(scoreRef.current)
          
          if (isBonusFoodRef.current) {
            speedBoostEndTimeRef.current = time + 5000 // 5 second boost
          }
          
          placeFood(scoreRef.current)
        } else {
          snakeRef.current.pop()
        }
      }

      ctx.fillStyle = '#121313'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)'
      ctx.lineWidth = 1
      for(let i = 0; i <= tileCount; i++) {
         ctx.beginPath()
         ctx.moveTo(i * gridSize, 0)
         ctx.lineTo(i * gridSize, canvas.height)
         ctx.stroke()
         ctx.beginPath()
         ctx.moveTo(0, i * gridSize)
         ctx.lineTo(canvas.width, i * gridSize)
         ctx.stroke()
      }

      // Render Food (cyan for bonus, orange for default)
      if (isBonusFoodRef.current) {
        ctx.fillStyle = '#00ffcc'
        ctx.shadowColor = '#00ffcc'
        ctx.shadowBlur = 20
      } else {
        ctx.fillStyle = '#ff6044'
        ctx.shadowColor = '#ff6044'
        ctx.shadowBlur = 15
      }
      ctx.fillRect(foodRef.current.x * gridSize + 2, foodRef.current.y * gridSize + 2, gridSize - 4, gridSize - 4)

      snakeRef.current.forEach((part, index) => {
        if(index === 0) {
          ctx.shadowColor = 'rgba(255, 96, 68, 0.5)'
          ctx.shadowBlur = 10
          ctx.fillStyle = '#ffffff'
        } else {
          ctx.shadowBlur = 0
          ctx.fillStyle = 'rgba(255, 96, 68, 0.8)'
        }
        ctx.fillRect(part.x * gridSize + 1, part.y * gridSize + 1, gridSize - 2, gridSize - 2)
      })
      ctx.shadowBlur = 0
    }

    reqId = requestAnimationFrame(loop)
    
    const handleKeyDown = (e) => {
      if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) {
         e.preventDefault()
      }
      const dir = dirRef.current
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          if (dir.y === 0) nextDirRef.current = { x: 0, y: -1 }
          break
        case 'ArrowDown':
        case 's':
          if (dir.y === 0) nextDirRef.current = { x: 0, y: 1 }
          break
        case 'ArrowLeft':
        case 'a':
          if (dir.x === 0) nextDirRef.current = { x: -1, y: 0 }
          break
        case 'ArrowRight':
        case 'd':
          if (dir.x === 0) nextDirRef.current = { x: 1, y: 0 }
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyDown, { passive: false })
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      cancelAnimationFrame(reqId)
    }
  }, [gameOver, isStarted])

  const touchStartRef = useRef(null)
  const handleTouchStart = (e) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const handleTouchMove = (e) => {
    if (!touchStartRef.current) return
    e.preventDefault()
    const xDiff = e.touches[0].clientX - touchStartRef.current.x
    const yDiff = e.touches[0].clientY - touchStartRef.current.y
    const dir = dirRef.current
    
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (Math.abs(xDiff) > 20) {
         if (xDiff > 0 && dir.x === 0) nextDirRef.current = { x: 1, y: 0 }
         else if (xDiff < 0 && dir.x === 0) nextDirRef.current = { x: -1, y: 0 }
         touchStartRef.current = null
      }
    } else {
      if (Math.abs(yDiff) > 20) {
         if (yDiff > 0 && dir.y === 0) nextDirRef.current = { x: 0, y: 1 }
         else if (yDiff < 0 && dir.y === 0) nextDirRef.current = { x: 0, y: -1 }
         touchStartRef.current = null
      }
    }
  }

  return (
    <div style={{
      position: 'relative', width: '100%', maxWidth: '400px', margin: '0 auto',
      aspectRatio: '1/1', borderRadius: '16px', overflow: 'hidden',
      background: 'var(--bg-soft)', border: '1px solid rgba(255, 255, 255, 0.06)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
      transition: 'box-shadow 0.3s, border-color 0.3s'
    }} className="snake-container">
      <canvas 
        ref={canvasRef} 
        width={400} 
        height={400} 
        style={{ width: '100%', height: '100%', display: 'block', touchAction: 'none' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      />
      
      <div style={{ position: 'absolute', top: 16, right: 20, fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text)', fontSize: '1.2rem', pointerEvents:'none' }}>
        {score}
      </div>

      {!isStarted && !gameOver && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(18, 19, 19, 0.7)', pointerEvents:'none' }}>
           <p style={{ fontWeight: 600, color: 'var(--text)', fontSize: '1.1rem' }}>Press Arrow Keys</p>
           <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>or swipe to start</p>
        </div>
      )}

      {gameOver && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(18, 19, 19, 0.85)' }}>
           <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)', fontSize: '2rem', marginBottom: '8px' }}>Game Over</h3>
           <p style={{ color: 'var(--text)', marginBottom: '16px' }}>Score: {score}</p>
           <button onClick={resetGame} style={{ background: 'var(--accent)', color: '#fff', border: 'none', padding: '8px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Play Again</button>
        </div>
      )}
    </div>
  )
}


export default function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="about__grid">
          <div>
            <FadeIn>
              <p className="section-label">Who I Am</p>
              <h2 className="section-title">Building Tomorrow's<br />AI, Today.</h2>
              <div className="section-divider" />
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="about__text">
                <p>
                  Hey! I'm <strong>Navaneeth</strong>, a passionate <strong>AI/ML student at VIT Chennai</strong>.
                  I love turning ideas into intelligent systems — from training models that fight spam
                  to building full-stack web apps with real-time AI integrations.
                </p>
                <p>
                  My journey spans <strong>machine learning pipelines</strong>, Python backends,
                  and interactive frontends. I'm driven by the belief that great technology should
                  be both powerful and beautifully usable.
                </p>
                <p>
                  When I'm not training models, you'll find me SLEEPING....
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="about__stats">
                {stats.map((s) => (
                  <div className="stat-card" key={s.label}>
                    <div className="stat-card__num">{s.num}</div>
                    <div className="stat-card__label">{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.15}>
            <div className="about__visual" style={{ boxShadow: 'none', background: 'none', border: 'none' }}>
              <SnakeGame />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
