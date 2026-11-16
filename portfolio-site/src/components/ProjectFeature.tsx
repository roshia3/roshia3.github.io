import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'

const EASE = [0.25, 0.1, 0.25, 1] as const

interface ProjectFeatureProps {
  index: string
  category: string
  title: string
  description: string
  link: string
  imageAlt: string
  imageSrc?: string
  visualStyle: 'quant' | 'deeptracer' | 'projects'
  reversed?: boolean
}

/* ── Generative SVG placeholders ─────────────────────── */

function QuantVisual() {
  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0e1b24 0%, #101e1a 50%, #0d1612 100%)' }}
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="qg1" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#8295A5" stopOpacity="0.12" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="600" height="400" fill="url(#qg1)" />
        {Array.from({ length: 18 }, (_, i) => {
          const y = 50 + i * 18
          const amp = 12 + Math.sin(i * 0.8) * 8
          const path = `M0,${y} ` + Array.from({ length: 61 }, (_, x) =>
            `L${x * 10},${y + Math.sin(x * (0.012 + i * 0.001) * 100 + i * 0.4) * amp}`
          ).join(' ')
          return (
            <path key={i} d={path} stroke="#8295A5" strokeOpacity={0.08 + i * 0.004} strokeWidth="0.8" fill="none" />
          )
        })}
        {Array.from({ length: 60 }, (_, i) => (
          <circle
            key={i}
            cx={(i * 137) % 600}
            cy={(i * 97 + 30) % 400}
            r={(i % 3) * 0.6 + 0.4}
            fill="#B3C6B5"
            opacity={0.1 + (i % 5) * 0.04}
          />
        ))}
      </svg>
    </div>
  )
}

function DeepTracerVisual() {
  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #101715 0%, #152220 60%, #0e1b18 100%)' }}
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="dtg" cx="45%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#B3C6B5" stopOpacity="0.1" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="600" height="400" fill="url(#dtg)" />
        {Array.from({ length: 8 }, (_, row) =>
          Array.from({ length: 10 }, (_, col) => {
            const x = col * 65 + (row % 2 === 0 ? 0 : 32) + 20
            const y = row * 52 + 20
            const r = 18 + Math.sin(row + col) * 4
            const pts = Array.from({ length: 6 }, (_, i) => {
              const angle = (Math.PI / 3) * i - Math.PI / 6
              return `${x + r * Math.cos(angle)},${y + r * Math.sin(angle)}`
            }).join(' ')
            return (
              <polygon
                key={`${row}-${col}`}
                points={pts}
                fill="none"
                stroke="#B3C6B5"
                strokeOpacity={0.07 + ((row * col) % 7) * 0.01}
                strokeWidth="0.7"
              />
            )
          })
        )}
        {Array.from({ length: 24 }, (_, i) => (
          <circle
            key={i}
            cx={50 + (i % 8) * 72}
            cy={60 + Math.floor(i / 8) * 110}
            r={(i % 3) + 1}
            fill="#C8CCCA"
            opacity={0.12 + (i % 5) * 0.04}
          />
        ))}
      </svg>
    </div>
  )
}

function ProjectsVisual() {
  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #111a17 0%, #17221F 50%, #101715 100%)' }}
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="prg" cx="60%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#C8CCCA" stopOpacity="0.06" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="600" height="400" fill="url(#prg)" />
        {Array.from({ length: 12 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 36 + 10} x2="600" y2={i * 36 + 10} stroke="#C8CCCA" strokeOpacity="0.04" strokeWidth="0.6" />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <line key={`v${i}`} x1={i * 65 + 20} y1="0" x2={i * 65 + 20} y2="400" stroke="#C8CCCA" strokeOpacity="0.03" strokeWidth="0.6" />
        ))}
        <rect x="180" y="100" width="80" height="80" fill="none" stroke="#B3C6B5" strokeOpacity="0.1" strokeWidth="1" transform="rotate(15 220 140)" />
        <rect x="340" y="160" width="60" height="60" fill="none" stroke="#8295A5" strokeOpacity="0.1" strokeWidth="1" transform="rotate(-8 370 190)" />
        <circle cx="300" cy="200" r="55" fill="none" stroke="#C8CCCA" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="4 6" />
      </svg>
    </div>
  )
}

const VISUALS: Record<string, React.FC> = {
  quant: QuantVisual,
  deeptracer: DeepTracerVisual,
  projects: ProjectsVisual,
}

/* ── Main component ───────────────────────────────────── */

export default function ProjectFeature({
  index,
  category,
  title,
  description,
  link,
  imageAlt,
  imageSrc,
  visualStyle,
  reversed = false,
}: ProjectFeatureProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' })

  const Visual = VISUALS[visualStyle] ?? QuantVisual

  return (
    <article ref={ref} className="relative py-16 md:py-24">
      {/* Top divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.2, ease: EASE }}
        className="absolute top-0 left-0 right-0 h-px mx-6 md:mx-10 lg:mx-16"
        style={{ background: 'rgba(200,204,202,0.08)', transformOrigin: 'left' }}
      />

      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${reversed ? 'lg:[direction:rtl]' : ''}`}>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? 24 : -24, scale: 0.98 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: reversed ? 24 : -24, scale: 0.98 }}
            transition={{ duration: 1, ease: EASE }}
            className="relative overflow-hidden group cursor-pointer"
            style={{ aspectRatio: '16 / 10', direction: 'ltr' }}
            onClick={() => { window.location.href = link }}
          >
            <div className="absolute inset-0">
              {imageSrc ? (
                <ImageWithFallback src={imageSrc} alt={imageAlt} Visual={Visual} />
              ) : (
                <Visual />
              )}
            </div>
            {/* Hover overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
              style={{ background: 'rgba(16,23,21,0.5)' }}
            >
              <span className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-medium" style={{ color: '#B3C6B5' }}>
                View Project <ArrowUpRight size={14} />
              </span>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? -24 : 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: reversed ? -24 : 24 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="flex flex-col justify-center"
            style={{ direction: 'ltr' }}
          >
            {/* Ghost index */}
            <span
              className="font-heading text-7xl md:text-8xl font-bold leading-none select-none mb-4 block"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                color: 'rgba(179,198,181,0.06)',
                letterSpacing: '-0.02em',
              }}
            >
              {index}
            </span>

            <p className="text-[10px] tracking-[0.22em] uppercase font-medium mb-4" style={{ color: '#766A82' }}>
              {category}
            </p>

            <h3
              className="font-heading text-3xl md:text-4xl font-semibold leading-tight mb-5 tracking-tight"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#F2F3EF' }}
            >
              {title}
            </h3>

            <p className="text-sm leading-relaxed font-light mb-8 max-w-sm" style={{ color: '#C8CCCA' }}>
              {description}
            </p>

            <a
              href={link}
              className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase font-medium group/link transition-colors duration-300"
              style={{ color: '#B3C6B5' }}
            >
              <span className="border-b border-current pb-px group-hover/link:text-porcelain transition-colors duration-300">
                View Project
              </span>
              <ArrowUpRight size={13} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </motion.div>

        </div>
      </div>
    </article>
  )
}

function ImageWithFallback({ src, alt, Visual }: { src: string; alt: string; Visual: React.FC }) {
  return (
    <div className="w-full h-full relative">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={(e) => {
          const img = e.currentTarget
          img.style.display = 'none'
          const fb = img.nextElementSibling as HTMLElement | null
          if (fb) fb.style.display = 'block'
        }}
      />
      <div className="absolute inset-0" style={{ display: 'none' }}>
        <Visual />
      </div>
    </div>
  )
}
