import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

import { BrainCircuit, Database, GitBranch, Webhook, Network, Pyramid, TerminalSquare } from 'lucide-react'

// Custom React SVG Logo since react-icons install was blocked
const ReactBrand = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="0" r="2.05" fill="currentColor" />
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
)

const skills = [
  { name: 'Python', icon: <TerminalSquare size={28} />, level: 90 },
  { name: 'React', icon: <ReactBrand size={28} />, level: 80 },
  { name: 'Three.js', icon: <Pyramid size={28} />, level: 72 },
  { name: 'DSA', icon: <Network size={28} />, level: 78 },
  { name: 'SQL', icon: <Database size={28} />, level: 75 },
  { name: 'Git', icon: <GitBranch size={28} />, level: 82 },
  { name: 'APIs', icon: <Webhook size={28} />, level: 85 },
]

function SkillCard({ skill, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="skill-card"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.07, }}
      whileHover={{ scale: 1.04 }}
    >
      <div className="skill-card__icon" style={{ display: 'flex', alignItems: 'center', transition: 'all 0.3s' }}>
        {skill.icon}
      </div>
      <div className="skill-card__name">{skill.name}</div>
      <div className="skill-card__level">
        <motion.div
          className="skill-card__bar"
          custom={index}
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          animate={inView ? { scaleX: skill.level / 100 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 + index * 0.07 }}
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
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
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
