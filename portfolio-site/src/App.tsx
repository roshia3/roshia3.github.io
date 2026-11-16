import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import About from './components/About'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import SelectedWorks from './components/SelectedWorks'
import CV from './pages/CV'
import DeepTracer from './pages/DeepTracer'
import OtherProjects from './pages/OtherProjects'
import QuantResearch from './pages/QuantResearch'
import { useEffect } from 'react'

/**
 * Runs on every route change. If the URL has a hash (e.g. /#about),
 * waits for the DOM to settle then scrolls to that element.
 * This makes cross-page anchor links reliable regardless of render timing.
 */
function ScrollToHash() {
  const { hash, pathname } = useLocation()
  useEffect(() => {
    if (!hash) {
      // No hash — scroll to top on every navigation
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    const id = hash.replace('#', '')
    // Retry a few times to handle slow renders
    let attempts = 0
    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      } else if (attempts < 10) {
        attempts++
        setTimeout(tryScroll, 60)
      }
    }
    setTimeout(tryScroll, 50)
  }, [hash, pathname])
  return null
}

function HomePage() {
  return (
    <div className="grain-overlay">
      <Navbar />
      <main>
        <Hero />
        <About />
        <SelectedWorks />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/research/quant" element={<QuantResearch />} />
        <Route path="/research/deeptracer" element={<DeepTracer />} />
        <Route path="/projects" element={<OtherProjects />} />
        <Route path="/cv" element={<CV />} />
      </Routes>
    </BrowserRouter>
  )
}
