import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

// ─── Design tokens ────────────────────────────────────────────────────────────

const C = {
  obsidian:       '#101715',
  deepForest:     '#1D302A',
  forestCharcoal: '#17221F',
  porcelain:      '#F2F3EF',
  sageMist:       '#B3C6B5',
  steelBlue:      '#8295A5',
  dustyPlum:      '#766A82',
  silverFog:      '#C8CCCA',
  rule:           'rgba(200,204,202,0.08)',
  ruleAccent:     'rgba(179,198,181,0.15)',
}

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────

function useReveal(margin = '-6% 0px') {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { rootMargin: margin }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [margin])
  return { ref, visible }
}

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

// ─── Primitives ───────────────────────────────────────────────────────────────

function Rule() {
  return <div className="w-full h-px" style={{ background: C.rule }} />
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block text-[9px] tracking-[0.16em] uppercase font-medium px-2.5 py-1 border"
      style={{ color: C.sageMist, borderColor: 'rgba(179,198,181,0.18)', background: 'rgba(179,198,181,0.03)' }}
    >
      {children}
    </span>
  )
}

function ExternalLink({ href, label }: { href: string | null; label: string }) {
  if (!href) return null
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-xs tracking-[0.16em] uppercase font-medium group transition-colors duration-300"
      style={{ color: C.sageMist }}
    >
      <span className="border-b border-current pb-px group-hover:text-porcelain transition-colors duration-300">
        {label}
      </span>
      <ArrowUpRight
        size={12}
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  )
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: 'rgba(10,16,14,0.93)', cursor: 'zoom-out' }}
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-label={alt}
    >
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-full object-contain"
        style={{ boxShadow: '0 0 60px rgba(0,0,0,0.6)', cursor: 'default' }}
        onClick={e => e.stopPropagation()}
      />
      <button
        className="absolute top-5 right-6 text-[10px] tracking-[0.18em] uppercase transition-colors duration-200 hover:text-porcelain"
        style={{ color: C.silverFog }}
        onClick={onClose}
        aria-label="Close lightbox"
      >
        Close
      </button>
    </div>
  )
}

// ─── Project image — handles load, error, placeholder, click-to-enlarge ──────

function ProjectImage({
  src,
  alt,
  placeholderLabel,
  className = '',
  style = {},
  enlargeable = false,
}: {
  src: string
  alt: string
  placeholderLabel: string
  className?: string
  style?: React.CSSProperties
  enlargeable?: boolean
}) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const [lightbox, setLightbox] = useState(false)

  return (
    <>
      <div
        className={`relative overflow-hidden ${className}`}
        style={{ border: `1px solid ${C.rule}`, ...style }}
      >
        {!failed && (
          <img
            src={src}
            alt={alt}
            onLoad={() => setLoaded(true)}
            onError={() => { setFailed(true); setLoaded(false) }}
            className={[
              'w-full h-auto block transition-all duration-500',
              enlargeable && loaded ? 'cursor-zoom-in hover:scale-[1.02]' : '',
              loaded ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
            style={{ display: failed ? 'none' : 'block' }}
            onClick={enlargeable && loaded ? () => setLightbox(true) : undefined}
          />
        )}

        {(!loaded || failed) && (
          <div
            className="flex flex-col items-center justify-center gap-3 py-16"
            style={{ background: 'linear-gradient(160deg, #0f1e1a 0%, #131e1b 100%)', minHeight: '160px' }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <rect x="1" y="1" width="26" height="26" rx="1" stroke={C.sageMist} strokeOpacity="0.2" strokeWidth="1" />
              <circle cx="14" cy="10" r="4" stroke={C.sageMist} strokeOpacity="0.3" strokeWidth="1" fill="none" />
              <path d="M2 24 Q7 16 14 19 Q20 22 26 14" stroke={C.sageMist} strokeOpacity="0.3" strokeWidth="1" fill="none" strokeLinecap="round" />
            </svg>
            <span className="text-[9px] tracking-[0.16em] uppercase text-center px-4" style={{ color: 'rgba(179,198,181,0.3)' }}>
              {placeholderLabel}
            </span>
          </div>
        )}
      </div>

      {lightbox && loaded && !failed && (
        <Lightbox src={src} alt={alt} onClose={() => setLightbox(false)} />
      )}
    </>
  )
}

// ─── Tech stack strip ─────────────────────────────────────────────────────────

function TechStack({ tools }: { tools: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tools.map(t => <Tag key={t}>{t}</Tag>)}
    </div>
  )
}

// ─── PROJECT LINKS — edit these when real URLs are available ──────────────────
// Set a value to null to hide the link until the URL is ready.

const PROJECT_LINKS = {
  marsRover:         'https://github.com/TrickfireRobotics/viator',
  nightfallSurvivor: 'https://github.com/roshia3/NightFall-Survivor',
  zenfi:             'https://github.com/lasyavenna/Zenfi',
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function OtherProjects() {
  return (
    <div style={{ background: C.obsidian, color: C.porcelain, minHeight: '100vh' }}>
      <Navbar />

      <main>

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section
          style={{
            background: 'linear-gradient(180deg, #0e1612 0%, #101715 55%, #17221F 100%)',
            paddingTop: '56px',
          }}
        >
          {/* Hero image — consistent with Quant and DeepTracer covers */}
          <div className="w-full overflow-hidden" style={{ maxHeight: '420px', position: 'relative' }}>
            <img
              src="/images/other-project.webp"
              alt="Other Projects — robotics, game development, and AI applications"
              className="w-full object-cover object-center block"
              style={{ maxHeight: '420px' }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, transparent, #101715)' }}
            />
          </div>

          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16 pt-14 pb-20">
            <p
              className="text-[10px] tracking-[0.24em] uppercase font-medium mb-7"
              style={{ color: C.steelBlue }}
            >
              Projects / Selected Engineering Work
            </p>

            <h1
              className="text-5xl sm:text-6xl md:text-7xl font-semibold leading-[0.92] tracking-tight mb-6"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: C.porcelain }}
            >
              Beyond Research.
            </h1>

            <p
              className="text-base md:text-lg font-light leading-relaxed"
              style={{ color: C.silverFog, maxWidth: '540px' }}
            >
              A selection of projects exploring robotics, interactive software, and AI-powered applications.
            </p>
          </div>

          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
            <Rule />
          </div>
        </section>

        {/* ── PROJECT 01 — MARS ROVER ───────────────────────────────────────── */}
        <section
          id="mars-rover"
          className="py-20 md:py-28"
          style={{ background: 'linear-gradient(180deg, #17221F 0%, #1D302A 100%)' }}
        >
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
            {/* Header */}
            <Reveal>
              <p className="text-[10px] tracking-[0.22em] uppercase font-medium mb-5" style={{ color: C.steelBlue }}>
                01 / Robotics
              </p>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div>
                  <h2
                    className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-1"
                    style={{ fontFamily: 'Space Grotesk, sans-serif', color: C.porcelain }}
                  >
                    Mars Rover
                  </h2>
                  <p className="text-sm font-light" style={{ color: C.steelBlue }}>
                    Autonomous Navigation &amp; Robotic Manipulation
                  </p>
                </div>
                <ExternalLink href={PROJECT_LINKS.marsRover} label="Explore Robotics Project" />
              </div>
            </Reveal>

            {/* Layout: large image left, text right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
              {/* Images */}
              <Reveal delay={0.05} className="flex flex-col gap-4">
                <ProjectImage
                  src="/images/rover1.webp"
                  alt="Mars rover — primary photograph"
                  placeholderLabel="Mars Rover — Primary Photograph"
                  className="w-full"
                  enlargeable
                />
                <ProjectImage
                  src="/images/rover2.webp"
                  alt="Mars rover — secondary photograph"
                  placeholderLabel="Mars Rover — Secondary Photograph"
                  className="w-full"
                  enlargeable
                />
              </Reveal>

              {/* Text */}
              <Reveal delay={0.1} className="flex flex-col gap-7">
                <p className="text-sm leading-[1.85] font-light" style={{ color: C.silverFog }}>
                  Contributed to the development of an autonomous Mars rover designed for the University Rover Challenge, working with robotic perception, navigation, and distributed control systems.
                </p>
                <p className="text-sm leading-[1.85] font-light" style={{ color: C.silverFog }}>
                  The project involved LiDAR-based perception, sensor fusion, and real-time motion planning, with reported navigation precision of 90%. It also included low-latency TCP/IP communication between rover subsystems and a sensor-driven robotic arm with reported object-manipulation accuracy of 85%.
                </p>

                {/* Learnings */}
                <div>
                  <p className="text-[9px] tracking-[0.18em] uppercase mb-3" style={{ color: C.dustyPlum }}>
                    Technical Experience
                  </p>
                  <p className="text-sm leading-[1.85] font-light" style={{ color: C.silverFog }}>
                    Through this project, I gained practical experience with ROS 2, robotic middleware, autonomous navigation, and communication between distributed robotic subsystems. Working with a physical robotic platform helped me understand how perception, software, networking, and mechanical components must operate together to support reliable autonomous behavior.
                  </p>
                </div>

                <div>
                  <p className="text-[9px] tracking-[0.18em] uppercase mb-3" style={{ color: C.dustyPlum }}>
                    Technologies
                  </p>
                  <TechStack tools={['Python', 'ROS 2', 'LiDAR', 'TensorFlow', 'NVIDIA Drive', 'TCP/IP']} />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <Rule />

        {/* ── PROJECT 02 — NIGHTFALL SURVIVOR ──────────────────────────────── */}
        <section
          id="nightfall-survivor"
          className="py-20 md:py-28"
          style={{ background: '#17221F' }}
        >
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
            {/* Header */}
            <Reveal>
              <p className="text-[10px] tracking-[0.22em] uppercase font-medium mb-5" style={{ color: C.steelBlue }}>
                02 / Game Development
              </p>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div>
                  <h2
                    className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-1"
                    style={{ fontFamily: 'Space Grotesk, sans-serif', color: C.porcelain }}
                  >
                    Nightfall Survivor
                  </h2>
                  <p className="text-sm font-light" style={{ color: C.steelBlue }}>
                    Endless Survival Platformer
                  </p>
                </div>
                <ExternalLink href={PROJECT_LINKS.nightfallSurvivor} label="View Game Repository" />
              </div>
            </Reveal>

            {/* Description */}
            <Reveal delay={0.05}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 mb-14">
                <p className="text-sm leading-[1.85] font-light" style={{ color: C.silverFog }}>
                  Nightfall Survivor is an endless platform game developed in Java, featuring procedurally generated platforms, character movement, combat mechanics, and a persistent zombie enemy. Players navigate floating platforms, collect coins, and survive while managing a three-heart health system. The game includes shooting mechanics, dynamic scoring, and an endlessly scrolling nighttime environment.
                </p>
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-[9px] tracking-[0.18em] uppercase mb-3" style={{ color: C.dustyPlum }}>
                      Technical Highlights
                    </p>
                    <ul className="flex flex-col gap-2">
                      {[
                        'Procedural platform generation',
                        'Character movement and collision-based gameplay',
                        'Enemy pursuit and combat mechanics',
                        'Health and scoring systems',
                        'Keyboard-controlled gameplay and restart functionality',
                      ].map(item => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span
                            className="mt-2 w-1 h-1 rounded-full shrink-0"
                            style={{ background: C.sageMist, opacity: 0.4 }}
                          />
                          <span className="text-xs leading-relaxed font-light" style={{ color: C.silverFog }}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[9px] tracking-[0.18em] uppercase mb-3" style={{ color: C.dustyPlum }}>
                      Technologies
                    </p>
                    <TechStack tools={['Java', 'Swing', 'Spring Boot', 'Maven', 'JUnit']} />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Three screenshots — horizontal gallery */}
            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { src: '/images/nightfall1.webp', alt: 'Nightfall Survivor — screenshot 1', label: 'Screenshot 1' },
                  { src: '/images/nightfall2.webp', alt: 'Nightfall Survivor — screenshot 2', label: 'Screenshot 2' },
                  { src: '/images/nightfall3.webp', alt: 'Nightfall Survivor — screenshot 3', label: 'Screenshot 3' },
                ].map(img => (
                  <ProjectImage
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    placeholderLabel={`Nightfall Survivor — ${img.label}`}
                    className="w-full"
                    enlargeable
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <Rule />

        {/* ── PROJECT 03 — ZENFI ────────────────────────────────────────────── */}
        <section
          id="zenfi"
          className="py-20 md:py-28"
          style={{ background: 'linear-gradient(180deg, #17221F 0%, #101715 100%)' }}
        >
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
            {/* Header */}
            <Reveal>
              <p className="text-[10px] tracking-[0.22em] uppercase font-medium mb-5" style={{ color: C.steelBlue }}>
                03 / AI Applications
              </p>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div>
                  <h2
                    className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-1"
                    style={{ fontFamily: 'Space Grotesk, sans-serif', color: C.porcelain }}
                  >
                    Zenfi
                  </h2>
                  <p className="text-sm font-light" style={{ color: C.steelBlue }}>
                    Gamified Personal Finance &amp; AI Assistance
                  </p>
                </div>
                <ExternalLink href={PROJECT_LINKS.zenfi} label="Explore Zenfi" />
              </div>
            </Reveal>

            {/* Text + screenshots side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 lg:gap-14 items-start">
              {/* Text */}
              <Reveal delay={0.05} className="flex flex-col gap-7">
                <p className="text-sm leading-[1.85] font-light" style={{ color: C.silverFog }}>
                  Zenfi is a personal finance and financial literacy platform designed to make budgeting, saving, and investing more approachable for younger users. The application combines gamified financial goals, spending insights, virtual investing, and AI-powered financial guidance.
                </p>
                <p className="text-sm leading-[1.85] font-light" style={{ color: C.silverFog }}>
                  Its features include a Gemini-powered budgeting assistant called Panda Pal, an investment learning assistant, and a risk-free investing sandbox.
                </p>

                <div>
                  <p className="text-[9px] tracking-[0.18em] uppercase mb-3" style={{ color: C.dustyPlum }}>
                    Technical Highlights
                  </p>
                  <ul className="flex flex-col gap-2">
                    {[
                      'AI-powered financial assistance using Google Gemini',
                      'Gamified savings goals and progress tracking',
                      'Personal finance dashboards and spending insights',
                      'Virtual investing and financial education',
                      'Authentication and account management using Supabase',
                    ].map(item => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span
                          className="mt-2 w-1 h-1 rounded-full shrink-0"
                          style={{ background: C.sageMist, opacity: 0.4 }}
                        />
                        <span className="text-xs leading-relaxed font-light" style={{ color: C.silverFog }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[9px] tracking-[0.18em] uppercase mb-3" style={{ color: C.dustyPlum }}>
                    Technologies
                  </p>
                  <TechStack tools={['React Native', 'Tailwind CSS', 'Node.js', 'Python', 'Google Gemini API', 'SQL', 'Supabase', 'PayPal API']} />
                </div>
              </Reveal>

              {/* Screenshots — all three, natural aspect ratios */}
              <Reveal delay={0.1} className="flex flex-col gap-4">
                <ProjectImage
                  src="/images/zenfi1.webp"
                  alt="Zenfi — screenshot 1"
                  placeholderLabel="Zenfi — Screenshot 1"
                  className="w-full"
                  enlargeable
                />
                <ProjectImage
                  src="/images/zenfi2.webp"
                  alt="Zenfi — screenshot 2"
                  placeholderLabel="Zenfi — Screenshot 2"
                  className="w-full"
                  enlargeable
                />
                <ProjectImage
                  src="/images/zenfi3.webp"
                  alt="Zenfi — screenshot 3"
                  placeholderLabel="Zenfi — Screenshot 3"
                  className="w-full"
                  enlargeable
                />
              </Reveal>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
