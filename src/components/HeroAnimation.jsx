import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion'
import HeroScene from './HeroScene'
import '../hero-animation.css'

export default function HeroAnimation() {
  const containerRef = useRef(null)
  
  // -- Scrollytelling Setup --
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // NAVA BURST ANIMATION
  // Clean, bold typography with sharp scroll-based motion (no blur)
  const navaScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 2, 3.5])
  const navaY = useTransform(scrollYProgress, [0, 0.5, 1], ["200px", "0px", "-600px"])
  const navaRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -10])
  const navaOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.12, 0])

  // POSTER STABILITY: Maintain static layout position
  const innerOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0])
  const innerY = useTransform(scrollYProgress, [0, 0.8, 1], ["0%", "0%", "-5%"])

  // -- Mouse Parallax Setup (Original) --
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const rx = useSpring(useTransform(my, [-1, 1], [6, -6]), { stiffness: 80, damping: 18 })
  const ry = useSpring(useTransform(mx, [-1, 1], [-6, 6]), { stiffness: 80, damping: 18 })
  const tx = useSpring(useTransform(mx, [-1, 1], [-8, 8]), { stiffness: 60, damping: 20 })
  const ty = useSpring(useTransform(my, [-1, 1], [-5, 5]), { stiffness: 60, damping: 20 })

  const onMove = (e) => {
    if (e.clientY > window.innerHeight) return;
    mx.set(((e.clientX) / window.innerWidth) * 2 - 1)
    my.set(((e.clientY) / window.innerHeight) * 2 - 1)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  return (
    <section className="hero-scroll-container" ref={containerRef} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="hero-sticky-wrap">
        <HeroScene />
        
        {/* NAVA BURST LAYER */}
        <div className="hero-burst-space" aria-hidden="true">
           <motion.div 
             className="nava-burst-text" 
             style={{ 
               scale: navaScale, 
               y: navaY, 
               rotateY: navaRotateY, 
               opacity: navaOpacity 
             }}
           >
             NAVA
           </motion.div>
        </div>

        {/* ABSOLUTE TOP-LEFT VIDEO (Placed relative to full screen wrapper) */}
        <div className="hero-video-wrapper">
          <video
            src="/video.mp4"
            className="hero-video"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>


        {/* MID / FOREGROUND LAYER */}
        <motion.div className="hero__inner" style={{ opacity: innerOpacity, y: innerY }}>

          
          {/* LEFT — text content */}
          <div className="hero__content">
            <motion.div
              className="hero__badge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            >
              VIT Chennai · AI/ML Student
            </motion.div>

            <motion.h1
              className="hero__name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.35 }}
            >
              <span>Navaneeth</span>
            </motion.h1>

            <motion.p
              className="hero__tagline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
            >
              Building AI-powered experiences at the intersection of code and creativity.
            </motion.p>

            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.65 }}
            >
              <a href="#projects" className="btn-primary">View Projects</a>
              <a href="#contact" className="btn-outline">Get in Touch</a>
            </motion.div>
          </div>

          {/* RIGHT POSTER WRAP REMOVED AS REQUESTED */}

        </motion.div>
      </div>
    </section>
  )
}
