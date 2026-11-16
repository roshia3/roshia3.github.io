import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NAV_LINKS } from '../lib/constants'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)

    // Plain route with no hash — just navigate
    if (!href.includes('#')) {
      navigate(href)
      return
    }

    const [path, hash] = href.split('#')
    const id = hash         // e.g. "about"
    const targetPath = path || '/'   // e.g. "/" or ""

    const isHomePage =
      window.location.pathname === '/' || window.location.pathname === ''

    const scrollToId = () => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    if (isHomePage) {
      // Already on the homepage — just scroll
      scrollToId()
    } else {
      // Navigate to the homepage, then scroll once it has mounted
      navigate(targetPath)
      // Wait for the route change and DOM paint before scrolling
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(scrollToId, 80)
        })
      })
    }
  }

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-md border-b border-white/5'
            : ''
        }`}
        style={{
          backgroundColor: scrolled ? 'rgba(16, 23, 21, 0.85)' : 'transparent',
        }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 h-14 flex items-center justify-between">
          {/* Wordmark */}
          <button
            onClick={() => handleNavClick('/#hero')}
            className="font-heading text-sm font-medium tracking-widest text-porcelain hover:text-sage-mist transition-colors duration-300"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.12em' }}
          >
            RD /
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="text-xs font-medium tracking-widest uppercase transition-colors duration-300 relative group"
                  style={{
                    letterSpacing: '0.15em',
                    color: link.accent ? '#B3C6B5' : '#C8CCCA',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = link.accent ? '#F2F3EF' : '#F2F3EF'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = link.accent ? '#B3C6B5' : '#C8CCCA'
                  }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                    style={{ background: '#B3C6B5' }}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-silver-fog hover:text-porcelain transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="fixed top-14 left-0 right-0 z-40 backdrop-blur-md border-b border-white/5"
            style={{ backgroundColor: 'rgba(16, 23, 21, 0.97)' }}
          >
            <ul className="flex flex-col px-6 py-6 gap-5">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm tracking-widest uppercase transition-colors duration-300 hover:text-porcelain"
                    style={{
                      letterSpacing: '0.15em',
                      color: link.accent ? '#B3C6B5' : '#C8CCCA',
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
