import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'

const socials = [
  {
    icon: '🐙',
    name: 'GitHub',
    handle: '@navabro',
    href: 'https://github.com/navabro',
  },
  {
    icon: '💼',
    name: 'LinkedIn',
    handle: 'Navaneeth · VIT Chennai',
    href: 'https://www.linkedin.com/in/navaneeth-vijay-881664361?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
  },
  {
    icon: '✉️',
    name: 'Email',
    handle: 'navaneeth.v2024@vitstudent.ac.in',
    href: 'mailto:navaneeth.v2024@vitstudent.ac.in',
  },
]
export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // 'success' | 'error' | null
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE,
        import.meta.env.VITE_EMAILJS_TEMPLATE,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC
      )
      
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch (error) {
      console.error("EmailJS Error:", error)
      setStatus('error')
    } finally {
      setLoading(false)
      setTimeout(() => setStatus(null), 4000)
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">Say Hello</p>
          <h2 className="section-title">Let's Build Something</h2>
          <div className="section-divider" />
        </motion.div>

        <div className="contact__grid">
          {/* Info + Socials */}
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h3>Open to Opportunities</h3>
            <p>
              I'm actively looking for internships, research collaborations, and
              exciting projects in AI/ML and full-stack development. Don't hesitate to reach out!
            </p>
            <div className="social-links">
              {socials.map((s, i) => (
                <motion.a
                  key={s.name}
                  href={s.href}
                  className="social-link"
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }}
                  whileHover={{ x: 6 }}
                >
                  <span className="social-link__icon">{s.icon}</span>
                  <div>
                    <div className="social-link__text">{s.name}</div>
                    <div className="social-link__handle">{s.handle}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me about your project or opportunity..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            {status && (
              <div className={`form-status ${status}`}>
                {status === 'success'
                  ? '✅ Message sent! I\'ll get back to you soon.'
                  : '❌ Something went wrong. Please try again.'}
              </div>
            )}

            <motion.button
              type="submit"
              className="btn-primary"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ justifyContent: 'center', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Sending...' : 'Send Message →'}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
