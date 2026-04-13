import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './identity-transition.css'

export default function IdentityTransition() {
  const ref = useRef(null)
  
  // Trigger when 40% of the section is visible in the viewport
  const isInView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <section className="identity-section" ref={ref}>
      <motion.div
        className="identity-container"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1, 
            transition: { 
              staggerChildren: 0.6, // cinematic pacing
              delayChildren: 0.2
            }
          }
        }}
      >
        <div className="identity-switch">
          {/* PHASE 1: "Navaneeth" fades in and slightly scales up */ }
          <div className="identity-old-wrapper">
            <motion.span 
              className="identity-old"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
              }}
            >
              Navaneeth
            </motion.span>

            {/* PHASE 2: Strikethrough animates left to right */ }
            <motion.span 
              className="identity-strike"
              variants={{
                hidden: { scaleX: 0, opacity: 0 },
                visible: { 
                  scaleX: 1, 
                  opacity: 1, 
                  transition: { duration: 0.6, ease: "easeInOut" } 
                }
              }}
            />
          </div>

          {/* PHASE 3: "Navabro" fades in */ }
          <motion.span 
            className="identity-new"
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { 
                opacity: 1, 
                x: 0, 
                transition: { duration: 0.8, ease: "easeOut" } 
              }
            }}
          >
            Navabro
          </motion.span>
        </div>
      </motion.div>
    </section>
  )
}
