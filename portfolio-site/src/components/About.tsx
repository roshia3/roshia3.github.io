import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const EASE = [0.25, 0.1, 0.25, 1] as const

const BIO_PARAGRAPHS = [
  `Hello! I'm Roshia, a Computer Science and Software Engineering undergraduate at the University of Washington, with a minor in Data Science. My interests lie in machine learning, artificial intelligence, and exploring how intelligent systems can be developed to solve complex problems.`,
  `I have been working as an AI Research Assistant at the DAIS Lab, contributing to DeepTracer 3.0, a deep learning framework for protein structure prediction. More recently, I have been exploring quantitative finance through an independent research project investigating whether machine learning models can predict NVIDIA's next-day stock price direction.`,
  `Beyond my current research, I am particularly fascinated by robotics, especially humanoid robots and their potential to learn, reason, and interact autonomously with the physical world. Looking ahead, I hope to pursue a PhD in Computer Science, focusing on machine learning systems and their applications, particularly in robotics.`,
]

function PortraitPlaceholder() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #17221F 0%, #1D302A 60%, #21302B 100%)' }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 40%, rgba(179,198,181,0.06) 0%, transparent 70%)',
        }}
      />
      <div
        className="w-20 h-20 rounded-full border flex items-center justify-center"
        style={{ borderColor: 'rgba(179,198,181,0.2)', background: 'rgba(179,198,181,0.04)' }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="11" r="5" stroke="#B3C6B5" strokeWidth="1" strokeOpacity="0.4" />
          <path d="M6 28c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#B3C6B5" strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round" />
        </svg>
      </div>
      <span className="text-[10px] tracking-[0.18em] uppercase" style={{ color: 'rgba(179,198,181,0.3)' }}>
        Portrait Coming Soon
      </span>
      <span className="text-[9px]" style={{ color: 'rgba(200,204,202,0.2)' }}>
        Replace with /public/images/portrait.jpg
      </span>
    </div>
  )
}

function PortraitWithFallback({ src }: { src: string }) {
  return (
    <div className="w-full h-full relative">
      <img
        src={src}
        alt="Roshia Dutta"
        className="w-full h-full object-cover"
        onError={(e) => {
          const img = e.currentTarget
          img.style.display = 'none'
          const fallback = img.nextElementSibling as HTMLElement | null
          if (fallback) fallback.style.display = 'flex'
        }}
      />
      <div className="absolute inset-0" style={{ display: 'none' }}>
        <PortraitPlaceholder />
      </div>
    </div>
  )
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-28 md:py-36 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #17221F 0%, #1D302A 40%, #293A34 75%, #1D302A 100%)',
      }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 85% 30%, rgba(130,149,165,0.05) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-10 lg:gap-16 items-start">

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative w-40 sm:w-48 mx-auto lg:mx-0 lg:w-full"
          >
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: '3 / 4', border: '1px solid rgba(179,198,181,0.1)' }}
            >
              <PortraitWithFallback src="/images/portrait.webp" />
            </div>
            {/* Accent line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
              className="absolute -left-3 top-8 bottom-8 w-px"
              style={{
                background: 'linear-gradient(to bottom, transparent, rgba(179,198,181,0.25), transparent)',
                transformOrigin: 'top',
              }}
            />
          </motion.div>

          {/* Text */}
          <div className="flex flex-col justify-center pt-4 lg:pt-12">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs tracking-[0.22em] uppercase font-medium mb-5"
              style={{ color: '#8295A5' }}
            >
              01 / About
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.75, ease: EASE, delay: 0.15 }}
              className="font-heading text-5xl md:text-6xl font-semibold leading-[0.95] tracking-tight mb-10"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#F2F3EF' }}
            >
              About
            </motion.h2>

            <div className="flex flex-col gap-6">
              {BIO_PARAGRAPHS.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.75, ease: EASE, delay: 0.2 + i * 0.15 }}
                  className="text-base leading-[1.8] font-light"
                  style={{ color: '#C8CCCA', fontFamily: 'Inter, sans-serif' }}
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
