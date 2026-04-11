import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skills = [
  { name: 'Python',    icon: '🐍', level: 90 },
  { name: 'AI / ML',  icon: '🧠', level: 85 },
  { name: 'React',    icon: '⚛️', level: 80 },
  { name: 'Three.js', icon: '🌐', level: 72 },
  { name: 'DSA',      icon: '📊', level: 78 },
  { name: 'SQL',      icon: '🗄️', level: 75 },
  { name: 'Git',      icon: '🔧', level: 82 },
  { name: 'APIs',     icon: '🔌', level: 85 },
]

function SkillCard({ skill, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="skill-card"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.04 }}
    >
      <div className="skill-card__icon">{skill.icon}</div>
      <div className="skill-card__name">{skill.name}</div>
      <div className="skill-card__level">
        <motion.div
          className="skill-card__bar"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: skill.level / 100 } : {}}
          transition={{ duration: 1, delay: 0.3 + index * 0.07, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="skills">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">What I Work With</p>
          <h2 className="section-title">Skills &amp; Stack</h2>
          <div className="section-divider" />
        </motion.div>

        <div className="skills__grid">
          {skills.map((s, i) => (
            <SkillCard key={s.name} skill={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
