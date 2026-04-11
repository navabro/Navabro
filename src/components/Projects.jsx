import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const projects = [
  {
    icon: '🛡️',
    title: 'SpamShield AI',
    desc: 'Production-grade email security platform with a multi-stage ML pipeline (Naive Bayes + SGD + Transformer). Features explainable AI, phishing detection, a Chrome extension for Gmail, and an adaptive feedback loop for continuous retraining.',
    tags: ['Python', 'FastAPI', 'NLP', 'React', 'Chrome Extension'],
    accent: '#7c3aed',
    github: 'https://github.com/navaneeth',
    demo: '#',
  },
  {
    icon: '🤖',
    title: 'ML Model Pipeline',
    desc: 'End-to-end machine learning pipeline for text classification. Custom preprocessing, feature engineering, model comparison dashboard, and real-time inference API built with FastAPI and deployed on the cloud.',
    tags: ['Scikit-learn', 'FastAPI', 'Docker', 'Python'],
    accent: '#06b6d4',
    github: 'https://github.com/navaneeth',
    demo: '#',
  },
  {
    icon: '🌐',
    title: 'Full-Stack Web App',
    desc: 'Modern full-stack application with a React frontend featuring glassmorphism UI, a Node.js + Express backend, MongoDB Atlas integration, real-time CRUD operations, and authentication with JWT.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT'],
    accent: '#f59e0b',
    github: 'https://github.com/navaneeth',
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
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
    >
      <div className="project-card__icon">{project.icon}</div>
      <div className="project-card__title">{project.title}</div>
      <p className="project-card__desc">{project.desc}</p>
      <div className="project-card__tags">
        {project.tags.map((t) => (
          <span className="tag" key={t}>{t}</span>
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
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
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
