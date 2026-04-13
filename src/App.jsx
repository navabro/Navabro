import { useEffect, useState } from 'react'
import Loader  from './components/Loader'
import Navbar  from './components/Navbar'
import HeroAnimation from './components/HeroAnimation'
import IdentityTransition from './components/IdentityTransition'
import About   from './components/About'
import Skills  from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer  from './components/Footer'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Give the 3-D scene time to init before fading loader out
    const t = setTimeout(() => setLoaded(true), 1800)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <Loader done={loaded} />
      <Navbar />
      <main>
        <HeroAnimation />
        <IdentityTransition />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
