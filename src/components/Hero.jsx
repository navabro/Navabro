import { useRef } from 'react'
import { motion } from 'framer-motion'
import HeroScene from './HeroScene'

export default function Hero() {
  const mouse = useRef({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
    mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
  }

  return (
    <section id="hero" className="hero" onMouseMove={handleMouseMove}>
      <div className="hero__canvas">
        <HeroScene mouse={mouse} />
      </div>

      <div className="container">
        <motion.div
          className="hero__content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero__badge">
            <span />
            VIT Chennai · AI/ML Student
          </div>

          <h1 className="hero__name">
            <span>Navaneeth</span>
          </h1>

          <p className="hero__tagline">
            <strong>AI/ML Developer</strong> — crafting intelligent systems,
            exploring neural architectures and building web experiences that matter.
          </p>

          <div className="hero__actions">
            <a href="#projects" className="btn-primary">
              View Projects →
            </a>
            <a href="#contact" className="btn-outline">
              Get In Touch
            </a>
          </div>
        </motion.div>
      </div>

      <div className="hero__scroll">
        <div className="hero__scroll__line" />
        scroll
      </div>
    </section>
  )
}
