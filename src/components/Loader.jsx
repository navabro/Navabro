import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ done }) {
  useEffect(() => {
    document.body.style.overflow = done ? '' : 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [done])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <motion.div
            className="loader__ring"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
            style={{ animation: 'none' }}
          />
          <motion.p
            className="loader__text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Loading
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
