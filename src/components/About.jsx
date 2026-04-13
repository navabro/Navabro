import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

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
            <div className="about__visual">
              <div className="about__ring" />
              <div className="about__ring" />
              <div className="about__avatar">N</div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
