import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = ['About', 'Skills', 'Projects', 'Contact']

const LABELS = ['nava', 'നവ']
const FONTS = [
  "'Comfortaa', cursive",
  "'Noto Sans Malayalam', sans-serif",
]
const INTERVAL_MS = 4000

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.nav
      className={`navbar${scrolled ? ' scrolled' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 1.5 }}
    >
      <div className="container navbar__inner">
        <Logo />
        <ul className="navbar__links">
          {links.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`}>{l}</a>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&family=Noto+Sans+Malayalam:wght@700&display=swap');
      `}</style>
    </motion.nav>
  )
}

function Logo() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % 2), INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <a href="#" style={{ textDecoration: 'none', display: 'block', width: '60px', height: '2rem', position: 'relative' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            fontFamily: FONTS[index],
            fontWeight: 700,
            fontSize: '1.5rem',
            color: 'var(--accent, #ff6b00)',
            whiteSpace: 'nowrap',
            letterSpacing: '0.02em',
          }}
        >
          {LABELS[index]}
        </motion.span>
      </AnimatePresence>
    </a>
  )
}