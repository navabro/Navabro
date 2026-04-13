import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

import { ShieldCheck, Bot, LayoutTemplate, TerminalSquare, Database, Server, Cog, Blocks, Code2 } from 'lucide-react'

// Custom React Logo since react-icons blocked via user restricted NPM proxy
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

const techIconMap = {
  'React': <ReactBrand size={18} />,
  'Python': <TerminalSquare size={18} />,
  'FastAPI': <Server size={18} />,
  'Node.js': <Server size={18} />,
  'MongoDB': <Database size={18} />,
  'NLP': <Bot size={18} />,
  'Docker': <Blocks size={18} />,
  'Chrome Extension': <Cog size={18} />,
  'Scikit-learn': <Cog size={18} />,
  'Express': <Server size={18} />,
  'JWT': <ShieldCheck size={18} />
}

const getTechIcon = (tag) => techIconMap[tag] || <Code2 size={18} />

const projects = [
  {
    icon: <ShieldCheck size={26} />,
    title: 'SpamShield AI',
    desc: 'Production-grade email security platform with a multi-stage ML pipeline (Naive Bayes + SGD + Transformer). Features explainable AI, phishing detection, a Chrome extension for Gmail, and an adaptive feedback loop for continuous retraining.',
    tags: ['Python', 'FastAPI', 'NLP', 'React', 'Chrome Extension'],
    accent: '#ff6044',
    github: 'https://github.com/navabro/Navabro',
    demo: '#',
  },
  {
    icon: <Bot size={26} />,
    title: 'ML Models',
    desc: 'End-to-end machine learning pipeline for text classification. Custom preprocessing, feature engineering, model comparison dashboard, and real-time inference API built with FastAPI and deployed on the cloud.',
    tags: ['Scikit-learn', 'FastAPI', 'Docker', 'Python'],
    accent: '#ff6044',
    github: 'https://github.com/navabro/Image-Classifier-Dogs-vs-Cats',
    demo: '#',
  },
  {
    icon: <LayoutTemplate size={26} />,
    title: 'Hospital Management System',
    desc: 'Modern full-stack application with a React frontend featuring glassmorphism UI, a Node.js + Express backend, MongoDB Atlas integration, real-time CRUD operations, and authentication with JWT.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT'],
    accent: '#ff6044',
    github: 'https://github.com/navabro/manna-portfolio',
    demo: '#',
  },
]

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="project-card"
      style={{ '--accent': project.accent }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.12, }}
      whileHover={{ y: -8 }}
    >
      <div className="project-card__icon">{project.icon}</div>
      <div className="project-card__title">{project.title}</div>
      <p className="project-card__desc">{project.desc}</p>
      <div className="project-card__tags">
        {project.tags.map((t) => (
          <span className="tag" key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ opacity: 0.8, display: 'flex' }}>{getTechIcon(t)}</span>
            {t}
          </span>
        ))}
      </div>
      <div className="project-card__links">
        <a href={project.github} className="project-link" target="_blank" rel="noreferrer">
          GitHub →
        </a>
        <a href={project.demo} className="project-link" target="_blank" rel="noreferrer" style={{ color: project.accent }}>
          Live Demo →
        </a>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="section-label">What I've Built</p>
          <h2 className="section-title">Featured Projects</h2>
          <div className="section-divider" />
        </motion.div>
        <div className="projects__grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
