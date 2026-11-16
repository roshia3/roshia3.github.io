import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import ProjectFeature from './ProjectFeature'

const PROJECTS = [
  {
    index: '01',
    category: 'Independent Research / Machine Learning',
    title: 'Can Machine Learning Predict the Stock Market?',
    description:
      'An independent research project investigating NVIDIA\'s next-day stock direction through a comparison of Logistic Regression and Random Forest.',
    link: '/research/quant',
    imageAlt: 'Quantitative research — abstract computational waves',
    imageSrc: '/images/quant-hero-artwork.webp',
    visualStyle: 'quant' as const,
    reversed: false,
  },
  {
    index: '02',
    category: 'AI Research / Generative Models',
    title: 'DeepTracer 3.0',
    description:
      'My research contributions to a deep learning framework for protein structure prediction at the DAIS Lab.',
    link: '/research/deeptracer',
    imageAlt: 'DeepTracer — translucent molecular geometry',
    imageSrc: '/images/deeptracer-hero.webp',
    visualStyle: 'deeptracer' as const,
    reversed: true,
  },
  {
    index: '03',
    category: 'Robotics / Software Development',
    title: 'Other Projects',
    description:
      'A collection of projects exploring robotics, game development, and AI-powered software.',
    link: '/projects',
    imageAlt: 'Other projects — minimal mechanical forms',
    imageSrc: '/images/other-project.webp',
    visualStyle: 'projects' as const,
    reversed: false,
  },
]

export default function SelectedWorks() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-10% 0px' })

  return (
    <section
      id="selected-works"
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #1D302A 0%, #17221F 30%, #101715 70%, #0e1612 100%)',
      }}
    >
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 20% 60%, rgba(118,106,130,0.04) 0%, transparent 65%)',
        }}
      />

      {/* Section header */}
      <div
        ref={headerRef}
        className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 lg:px-16 pt-24 md:pt-32 pb-10"
      >
        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-[0.22em] uppercase font-medium mb-5"
          style={{ color: '#8295A5' }}
        >
          02 / Selected Works
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          className="font-heading text-5xl md:text-6xl lg:text-7xl font-semibold leading-[0.92] tracking-tight mb-6"
          style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#F2F3EF' }}
        >
          Research &amp; Projects
        </motion.h2>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          className="text-sm leading-relaxed font-light max-w-lg"
          style={{ color: '#C8CCCA' }}
        >
          A collection of research, experiments, and projects exploring machine learning, intelligent systems, and software development.
        </motion.p>
      </div>

      {/* Projects */}
      <div className="relative z-10">
        {PROJECTS.map((project) => (
          <ProjectFeature key={project.index} {...project} />
        ))}
      </div>

      {/* Bottom spacing */}
      <div className="pb-16" />
    </section>
  )
}
