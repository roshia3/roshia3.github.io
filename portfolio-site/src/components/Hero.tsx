import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useRef } from 'react'

/**
 * HeroMedia — lightweight media container for the hero right column.
 *
 * Drop one of these files into public/ to replace the placeholder:
 *   /images/hero-animation.gif
 *   /videos/hero-animation.webm   (preferred — smaller, loops cleanly)
 *   /videos/hero-animation.mp4    (fallback)
 *
 * The component tries them in that order and falls back to a
 * minimal static SVG placeholder if none are present.
 *
 * To hard-code a specific asset, set the HERO_MEDIA_SRC constant below.
 */
const HERO_MEDIA_SRC: string | null = '/images/hero-sculpture.webp'

function HeroMedia() {
  if (HERO_MEDIA_SRC) {
    const isVideo = HERO_MEDIA_SRC.endsWith('.webm') || HERO_MEDIA_SRC.endsWith('.mp4')
    if (isVideo) {
      return (
        <video
          src={HERO_MEDIA_SRC}
          autoPlay loop muted playsInline
          className="w-full h-full object-contain"
        />
      )
    }
    return (
      <img
        src={HERO_MEDIA_SRC}
        alt="Hero sculpture"
        className="w-full h-full object-contain drop-shadow-2xl"
      />
    )
  }

  // Static placeholder — a minimal geometric SVG that matches the palette
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[400px] max-h-[400px]"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="hm-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#B3C6B5" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#101715" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="195" fill="url(#hm-glow)" />
        {/* Concentric rings */}
        {[155, 120, 85, 50].map((r, i) => (
          <circle
            key={r}
            cx="200" cy="200" r={r}
            stroke="#B3C6B5"
            strokeOpacity={0.08 + i * 0.04}
            strokeWidth="1"
            fill="none"
          />
        ))}
        {/* Cross-hair lines */}
        <line x1="200" y1="20"  x2="200" y2="380" stroke="#8295A5" strokeOpacity="0.07" strokeWidth="1" />
        <line x1="20"  y1="200" x2="380" y2="200" stroke="#8295A5" strokeOpacity="0.07" strokeWidth="1" />
        {/* Diagonal accent lines */}
        <line x1="62"  y1="62"  x2="338" y2="338" stroke="#8295A5" strokeOpacity="0.05" strokeWidth="1" />
        <line x1="338" y1="62"  x2="62"  y2="338" stroke="#8295A5" strokeOpacity="0.05" strokeWidth="1" />
        {/* Centre dot */}
        <circle cx="200" cy="200" r="4" fill="#B3C6B5" fillOpacity="0.3" />
        <circle cx="200" cy="200" r="1.5" fill="#B3C6B5" fillOpacity="0.6" />
        {/* Small tick marks */}
        {[0, 60, 120, 180, 240, 300].map((deg) => {
          const rad = (deg * Math.PI) / 180
          const x1 = 200 + 150 * Math.cos(rad)
          const y1 = 200 + 150 * Math.sin(rad)
          const x2 = 200 + 160 * Math.cos(rad)
          const y2 = 200 + 160 * Math.sin(rad)
          return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#B3C6B5" strokeOpacity="0.25" strokeWidth="1" />
        })}
        {/* Replace with your animation — see component comment */}
      </svg>
    </div>
  )
}

const EASE = [0.25, 0.1, 0.25, 1] as const

function fadeProps(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay },
  } as const
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.45], [0, -40])
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex flex-col"
      style={{
        background: 'linear-gradient(135deg, #101715 0%, #131e1b 50%, #0e1612 100%)',
      }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 70% 50%, rgba(179,198,181,0.04) 0%, transparent 65%), radial-gradient(ellipse 50% 80% at 10% 80%, rgba(130,149,165,0.04) 0%, transparent 60%)',
        }}
      />

      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }} />

      {/* Grid */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center min-h-[calc(100vh-56px)] py-20">

            {/* Text column */}
            <motion.div
              style={{ opacity: textOpacity, y: textY }}
              className="flex flex-col justify-center order-2 lg:order-1 pb-12 lg:pb-0"
            >
              <motion.p
                {...fadeProps(0.1)}
                className="text-xs tracking-[0.2em] uppercase mb-8 font-medium"
                style={{ color: '#8295A5' }}
              >
                Portfolio / Research Archive
              </motion.p>

              <motion.h1
                {...fadeProps(0.25)}
                className="font-heading text-6xl sm:text-7xl lg:text-8xl font-semibold leading-[0.92] tracking-tight mb-6"
                style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#F2F3EF' }}
              >
                Roshia
                <br />
                Dutta
              </motion.h1>

              <motion.p
                {...fadeProps(0.4)}
                className="text-sm tracking-[0.14em] uppercase font-medium mb-7"
                style={{ color: '#B3C6B5' }}
              >
                Machine Learning · AI Research · Robotics
              </motion.p>

              {/* Rule */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
                className="h-px w-16 mb-7"
                style={{ background: 'rgba(179,198,181,0.3)', transformOrigin: 'left' }}
              />

              <motion.p
                {...fadeProps(0.6)}
                className="text-base font-light leading-relaxed max-w-sm"
                style={{ color: '#C8CCCA', fontFamily: 'Inter, sans-serif' }}
              >
                Exploring intelligent systems through research, experimentation, and a curiosity for the unknown.
              </motion.p>

              <motion.p
                {...fadeProps(0.75)}
                className="text-[10px] tracking-[0.22em] uppercase mt-10 font-medium"
                style={{ color: 'rgba(200,204,202,0.4)' }}
              >
                Selected Works / 2024—Present
              </motion.p>
            </motion.div>

            {/* Media column */}
            <div className="relative order-1 lg:order-2 flex items-center justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
                className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px]"
              >
                <HeroMedia />
              </motion.div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{ opacity: textOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(200,204,202,0.35)' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={14} color="rgba(200,204,202,0.35)" />
        </motion.div>
      </motion.div>
    </section>
  )
}
