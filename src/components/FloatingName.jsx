import { motion } from 'framer-motion'
import './floating-name.css'

export default function FloatingName({ isVisible }) {
  return (
    <motion.div
      className="floating-name-container"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={{
        hidden: { 
          opacity: 0, 
          x: 50,
          pointerEvents: 'none'
        },
        visible: { 
          opacity: 1, 
          x: 0,
          pointerEvents: 'auto',
          transition: {
            duration: 0.4,
            staggerChildren: 0.35, // Delays between sub-animations
            delayChildren: 0.1
          }
        }
      }}
    >
      <div className="name-switch">
        {/* PHASE 1: Old Name */}
        <div className="old-name-wrapper">
          <motion.span 
            className="old-name"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.4 } }
            }}
          >
            Navaneeth
          </motion.span>

          {/* PHASE 2: Strike Line */}
          <motion.span 
            className="strike-line"
            variants={{
              hidden: { scaleX: 0, opacity: 0 },
              visible: { 
                scaleX: 1, 
                opacity: 1, 
                transition: { duration: 0.4, ease: "easeOut" } 
              }
            }}
            style={{ transformOrigin: "left center" }}
          ></motion.span>
        </div>

        {/* PHASE 3: New Name */}
        <motion.span 
          className="new-name"
          variants={{
            hidden: { opacity: 0, x: -10 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
          }}
        >
          Navabro
        </motion.span>
      </div>
    </motion.div>
  )
}
