import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

// ─── Shared tokens ────────────────────────────────────────────────────────────

const C = {
  obsidian:      '#101715',
  deepForest:    '#1D302A',
  forestCharcoal:'#17221F',
  porcelain:     '#F2F3EF',
  sageMist:      '#B3C6B5',
  steelBlue:     '#8295A5',
  dustyPlum:     '#766A82',
  silverFog:     '#C8CCCA',
  rule:          'rgba(200,204,202,0.08)',
  ruleAccent:    'rgba(179,198,181,0.15)',
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

// ─── Thin rule ────────────────────────────────────────────────────────────────

function Rule({ accent = false }: { accent?: boolean }) {
  return (
    <div
      className="w-full h-px"
      style={{ background: accent ? C.ruleAccent : C.rule }}
    />
  )
}

// ─── Section label ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] tracking-[0.22em] uppercase font-medium mb-5"
      style={{ color: C.steelBlue }}
    >
      {children}
    </p>
  )
}

// ─── Section heading ──────────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-3xl md:text-4xl font-semibold tracking-tight mb-8 leading-tight"
      style={{ fontFamily: 'Space Grotesk, sans-serif', color: C.porcelain }}
    >
      {children}
    </h2>
  )
}

// ─── Reveal wrapper ───────────────────────────────────────────────────────────

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
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

// ─── Hero visual — real artwork ───────────────────────────────────────────────

function HeroVisual() {
  return (
    <div
      className="w-full overflow-hidden"
      style={{ position: 'relative', maxHeight: '420px' }}
    >
      <img
        src="/images/quant-hero-artwork.webp"
        alt="Quantitative research — abstract computational waves"
        className="w-full object-cover object-center"
        style={{ maxHeight: '420px', display: 'block' }}
      />
      {/* Dark gradient at the bottom to blend into the page */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0e1612)' }}
      />
    </div>
  )
}

// ─── Stock chart — real NVDA image ───────────────────────────────────────────

function ChartPlaceholder() {
  return (
    <div
      className="w-full relative overflow-hidden"
      style={{ border: `1px solid ${C.rule}` }}
    >
      <img
        src="/images/nvda-stock.webp"
        alt="NVIDIA (NVDA) historical stock price chart 2020–2025"
        className="w-full object-contain object-top block"
      />
    </div>
  )
}

// ─── Pipeline diagram ─────────────────────────────────────────────────────────

const PIPELINE_STEPS = [
  'Historical Data\nCollection',
  'Preprocessing',
  'Feature\nEngineering',
  'Chronological\nSplit',
  'Model\nTraining',
  'Evaluation',
]

function Pipeline() {
  return (
    <div className="w-full overflow-x-auto pb-2">
      {/* Desktop: horizontal */}
      <div className="hidden md:flex items-center gap-0 min-w-max mx-auto">
        {PIPELINE_STEPS.map((step, i) => (
          <div key={i} className="flex items-center">
            <div
              className="flex flex-col items-center justify-center text-center px-4 py-3"
              style={{
                border: `1px solid ${C.ruleAccent}`,
                background: 'rgba(179,198,181,0.03)',
                minWidth: '110px',
              }}
            >
              <span
                className="text-[9px] tracking-[0.18em] uppercase font-medium leading-tight"
                style={{ color: C.sageMist, whiteSpace: 'pre-line' }}
              >
                {step}
              </span>
            </div>
            {i < PIPELINE_STEPS.length - 1 && (
              <div className="flex items-center px-1">
                <div className="w-6 h-px" style={{ background: C.ruleAccent }} />
                <svg width="6" height="8" viewBox="0 0 6 8" fill="none" style={{ marginLeft: '-1px' }}>
                  <path d="M0 0L6 4L0 8" stroke={C.sageMist} strokeOpacity="0.4" strokeWidth="1" fill="none" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: vertical */}
      <div className="md:hidden flex flex-col items-start gap-0">
        {PIPELINE_STEPS.map((step, i) => (
          <div key={i} className="flex flex-col items-start">
            <div
              className="px-4 py-2.5 w-full"
              style={{ border: `1px solid ${C.ruleAccent}`, background: 'rgba(179,198,181,0.03)' }}
            >
              <span
                className="text-[9px] tracking-[0.18em] uppercase font-medium"
                style={{ color: C.sageMist }}
              >
                {step.replace('\n', ' ')}
              </span>
            </div>
            {i < PIPELINE_STEPS.length - 1 && (
              <div className="flex flex-col items-start pl-5 py-0.5">
                <div className="w-px h-3" style={{ background: C.ruleAccent }} />
                <svg width="8" height="6" viewBox="0 0 8 6" fill="none" style={{ marginTop: '-1px' }}>
                  <path d="M0 0L4 6L8 0" stroke={C.sageMist} strokeOpacity="0.4" strokeWidth="1" fill="none" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Resource link ────────────────────────────────────────────────────────────

function ResourceLink({
  label,
  description,
  href,
  external = true,
  disabled = false,
}: {
  label: string
  description: string
  href: string
  external?: boolean
  disabled?: boolean
}) {
  const sharedClass = [
    'group flex items-start justify-between gap-6 py-5 px-0 border-b transition-all duration-300',
    disabled ? 'cursor-default' : 'cursor-pointer hover:pl-1',
  ].join(' ')

  const sharedStyle = { borderColor: C.rule }

  const inner = (
    <>
      <div className="flex flex-col gap-1.5 flex-1">
        <span
          className="text-sm font-medium tracking-wide"
          style={{ color: disabled ? 'rgba(242,243,239,0.3)' : C.porcelain }}
        >
          {label}
        </span>
        <span
          className="text-xs leading-relaxed font-light"
          style={{ color: disabled ? 'rgba(200,204,202,0.25)' : C.silverFog }}
        >
          {description}
        </span>
      </div>
      {!disabled && (
        <ArrowUpRight
          size={14}
          className="mt-0.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          style={{ color: C.sageMist }}
        />
      )}
    </>
  )

  if (disabled) {
    return <div className={sharedClass} style={sharedStyle}>{inner}</div>
  }
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={sharedClass}
        style={sharedStyle}
      >
        {inner}
      </a>
    )
  }
  return (
    <a href={href} className={sharedClass} style={sharedStyle}>
      {inner}
    </a>
  )
}

// ─── Reference item ───────────────────────────────────────────────────────────

function Reference({
  number,
  citation,
  doi,
}: {
  number: number
  citation: string
  doi: string
}) {
  return (
    <div className="flex gap-5 py-4 border-b" style={{ borderColor: C.rule }}>
      <span
        className="text-xs font-medium shrink-0 w-5 pt-px"
        style={{ color: C.steelBlue }}
      >
        {number}.
      </span>
      <div className="flex flex-col gap-1">
        <p
          className="text-xs leading-relaxed font-light"
          style={{ color: C.silverFog }}
        >
          {citation}
        </p>
        <a
          href={`https://doi.org/${doi}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] tracking-[0.1em] transition-colors duration-200 hover:underline"
          style={{ color: C.steelBlue }}
        >
          https://doi.org/{doi}
        </a>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function QuantResearch() {
  // Check if the PDF exists before showing the download link.
  // We attempt a HEAD request; if it fails we disable the link.
  const [pdfAvailable, setPdfAvailable] = useState<boolean | null>(null)
  useEffect(() => {
    fetch('/papers/nvda-ml-research.pdf', { method: 'HEAD' })
      .then(r => setPdfAvailable(r.ok))
      .catch(() => setPdfAvailable(false))
  }, [])

  return (
    <div style={{ background: C.obsidian, color: C.porcelain, minHeight: '100vh' }}>
      <Navbar />

      <main>

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section
          style={{
            background: 'linear-gradient(180deg, #0e1612 0%, #101715 60%, #17221F 100%)',
            paddingTop: '56px',   /* navbar height */
          }}
        >
          {/* Wide visual */}
          <HeroVisual />

          {/* Hero text */}
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16 pt-14 pb-16">
            <p
              className="text-[10px] tracking-[0.24em] uppercase font-medium mb-6"
              style={{ color: C.steelBlue }}
            >
              Research / 001
            </p>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight mb-5"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: C.porcelain, maxWidth: '820px' }}
            >
              Can Machine Learning Predict the Stock Market?
            </h1>

            <p
              className="text-base md:text-lg font-light leading-relaxed mb-10"
              style={{ color: C.silverFog, maxWidth: '640px' }}
            >
              A Comparative Study of Logistic Regression and Random Forest for Next-Day Stock Direction Prediction
            </p>

            <Rule accent />

            {/* Meta row */}
            <div className="flex flex-wrap gap-x-10 gap-y-4 pt-8">
              {[
                { label: 'Author',      value: 'Roshia Dutta' },
                { label: 'Affiliation', value: 'University of Washington' },
                { label: 'Category',    value: 'Independent Research · Machine Learning · Quantitative Finance' },
                { label: 'Year',        value: '2026' },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: C.steelBlue }}>
                    {label}
                  </span>
                  <span className="text-sm font-light" style={{ color: C.silverFog }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 01 OVERVIEW ───────────────────────────────────────────────────── */}
        <section
          id="overview"
          className="py-20 md:py-28"
          style={{ background: 'linear-gradient(180deg, #17221F 0%, #1D302A 100%)' }}
        >
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
            <Reveal>
              <SectionLabel>01 / Overview</SectionLabel>
              <SectionHeading>Research Question</SectionHeading>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 lg:gap-16 items-start">
              <Reveal delay={0.1}>
                <p
                  className="text-lg md:text-xl font-light leading-relaxed mb-8"
                  style={{ color: C.porcelain }}
                >
                  Can a more complex machine learning model outperform a simpler statistical model in predicting NVIDIA's next-day stock direction?
                </p>
                <div className="flex flex-col gap-5">
                  {[
                    'Predicting stock market movements remains challenging because financial markets are influenced by complex and often unpredictable factors. This research investigates whether machine learning models can identify useful patterns in historical NVIDIA stock data and whether the additional complexity of Random Forest provides an advantage over Logistic Regression.',
                    'The study uses historical NVIDIA (NVDA) market data from 2020 to 2025 and compares two classification algorithms using the same input features and a chronological training and testing approach.',
                  ].map((para, i) => (
                    <p
                      key={i}
                      className="text-sm leading-[1.85] font-light"
                      style={{ color: C.silverFog }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </Reveal>

              {/* Ghost index */}
              <Reveal delay={0.2} className="hidden lg:flex justify-end">
                <span
                  className="text-[8rem] font-bold leading-none select-none"
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    color: 'rgba(179,198,181,0.05)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  01
                </span>
              </Reveal>
            </div>
          </div>
        </section>

        <Rule />

        {/* ── 02 MOTIVATION ─────────────────────────────────────────────────── */}
        <section
          id="motivation"
          className="py-20 md:py-28"
          style={{ background: '#17221F' }}
        >
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
            <Reveal>
              <SectionLabel>02 / Motivation</SectionLabel>
              <SectionHeading>Why This Research?</SectionHeading>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Text */}
              <Reveal delay={0.1} className="flex flex-col gap-5">
                <p className="text-sm leading-[1.85] font-light" style={{ color: C.silverFog }}>
                  My interest in quantitative finance began after an interview with Jane Street, where I became interested in the applications of computational and statistical methods to financial markets. This experience motivated me to explore how machine learning algorithms could analyze historical market data and identify patterns that may help predict future stock movements.
                </p>
                <p className="text-sm leading-[1.85] font-light" style={{ color: C.silverFog }}>
                  I selected NVIDIA because of its significant involvement in the semiconductor and artificial intelligence industries. Its stock experienced substantial changes across different market conditions, making it an interesting subject for investigating financial prediction.
                </p>
              </Reveal>

              {/* Chart placeholder */}
              <Reveal delay={0.2} className="w-full">
                <div className="mb-2">
                  <ChartPlaceholder />
                </div>
                <p
                  className="text-[9px] tracking-[0.14em] uppercase mt-2"
                  style={{ color: 'rgba(200,204,202,0.2)' }}
                >
                  NVDA historical price chart — replace with actual asset
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <Rule />

        {/* ── 03 DATASET ────────────────────────────────────────────────────── */}
        <section
          id="dataset"
          className="py-20 md:py-28"
          style={{ background: 'linear-gradient(180deg, #17221F 0%, #1D302A 100%)' }}
        >
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
            <Reveal>
              <SectionLabel>03 / Dataset</SectionLabel>
              <SectionHeading>Data & Feature Engineering</SectionHeading>
            </Reveal>

            {/* Dataset details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-16">
              <Reveal delay={0.1}>
                <p
                  className="text-xs tracking-[0.16em] uppercase font-medium mb-4"
                  style={{ color: C.dustyPlum }}
                >
                  Dataset
                </p>
                <dl className="flex flex-col gap-3">
                  {[
                    { term: 'Source',  def: 'Yahoo Finance (yfinance Python library)' },
                    { term: 'Ticker',  def: 'NVDA' },
                    { term: 'Period',  def: 'January 2020 – December 2025' },
                    { term: 'Attributes', def: 'Open, Close, High, Low, Volume' },
                  ].map(({ term, def }) => (
                    <div key={term} className="flex flex-col gap-0.5">
                      <dt
                        className="text-[9px] tracking-[0.18em] uppercase"
                        style={{ color: C.steelBlue }}
                      >
                        {term}
                      </dt>
                      <dd
                        className="text-sm font-light"
                        style={{ color: C.silverFog }}
                      >
                        {def}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={0.15}>
                <p
                  className="text-xs tracking-[0.16em] uppercase font-medium mb-4"
                  style={{ color: C.dustyPlum }}
                >
                  Prediction Target
                </p>
                <p className="text-sm leading-[1.85] font-light mb-4" style={{ color: C.silverFog }}>
                  The binary target indicates whether the following trading day's closing price increases.
                </p>
                <div
                  className="flex flex-col gap-2 p-4"
                  style={{ border: `1px solid ${C.rule}`, background: 'rgba(179,198,181,0.02)' }}
                >
                  {[
                    { val: '1', desc: 'Next-day closing price increases' },
                    { val: '0', desc: 'Next-day closing price does not increase' },
                  ].map(({ val, desc }) => (
                    <div key={val} className="flex items-center gap-4">
                      <span
                        className="text-xs font-medium w-4 shrink-0"
                        style={{ color: C.sageMist }}
                      >
                        {val}
                      </span>
                      <span className="text-xs font-light" style={{ color: C.silverFog }}>
                        {desc}
                      </span>
                    </div>
                  ))}
                  <p
                    className="text-[10px] mt-2 font-light"
                    style={{ color: 'rgba(200,204,202,0.35)' }}
                  >
                    Rows with missing feature values or unavailable target labels were removed during preprocessing.
                  </p>
                </div>
              </Reveal>
            </div>

            <Rule />

            {/* Features */}
            <Reveal delay={0.1} className="mt-14">
              <p
                className="text-xs tracking-[0.16em] uppercase font-medium mb-8"
                style={{ color: C.dustyPlum }}
              >
                Model Features
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                {[
                  {
                    n: '01',
                    name: 'Daily Returns',
                    desc: 'Percentage change in closing price from the previous trading day.',
                  },
                  {
                    n: '02',
                    name: 'Trading Volume',
                    desc: 'Daily trading volume recorded in the historical market dataset.',
                  },
                  {
                    n: '03',
                    name: 'Five-Day Momentum',
                    desc: 'Percentage change in closing price over five trading days.',
                  },
                  {
                    n: '04',
                    name: 'Five-Day Volatility',
                    desc: 'Rolling standard deviation of daily returns over five trading days.',
                  },
                ].map((f) => (
                  <div
                    key={f.n}
                    className="group flex gap-5 py-6 px-0 border-b transition-colors duration-200"
                    style={{ borderColor: C.rule }}
                  >
                    <span
                      className="text-xs font-medium shrink-0 pt-0.5 w-6"
                      style={{ color: 'rgba(179,198,181,0.3)' }}
                    >
                      {f.n}
                    </span>
                    <div>
                      <p
                        className="text-sm font-medium mb-1.5"
                        style={{ color: C.porcelain, fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        {f.name}
                      </p>
                      <p
                        className="text-xs leading-relaxed font-light"
                        style={{ color: C.silverFog }}
                      >
                        {f.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <Rule />

        {/* ── 04 METHODOLOGY ────────────────────────────────────────────────── */}
        <section
          id="methodology"
          className="py-20 md:py-28"
          style={{ background: '#17221F' }}
        >
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
            <Reveal>
              <SectionLabel>04 / Methodology</SectionLabel>
              <SectionHeading>Approach</SectionHeading>
              <p className="text-sm leading-[1.85] font-light mb-14" style={{ color: C.silverFog, maxWidth: '580px' }}>
                Two classification algorithms were selected to investigate whether greater model complexity improves next-day stock direction prediction.
              </p>
            </Reveal>

            {/* Models */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
              {[
                {
                  id: 'A',
                  name: 'Logistic Regression',
                  role: 'Baseline',
                  details: [
                    'Simpler, interpretable statistical baseline.',
                    'Pipeline includes feature standardization.',
                  ],
                },
                {
                  id: 'B',
                  name: 'Random Forest',
                  role: 'Comparator',
                  details: [
                    'Combines multiple decision trees.',
                    'Captures potentially nonlinear relationships.',
                    '100 decision trees, maximum depth of 5.',
                  ],
                },
              ].map((m) => (
                <Reveal key={m.id} delay={0.1}>
                  <div
                    className="h-full p-6 flex flex-col gap-4"
                    style={{ border: `1px solid ${C.ruleAccent}`, background: 'rgba(179,198,181,0.02)' }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p
                          className="text-[9px] tracking-[0.2em] uppercase mb-1"
                          style={{ color: C.steelBlue }}
                        >
                          Model {m.id}
                        </p>
                        <h3
                          className="text-lg font-semibold"
                          style={{ fontFamily: 'Space Grotesk, sans-serif', color: C.porcelain }}
                        >
                          {m.name}
                        </h3>
                      </div>
                      <span
                        className="text-[9px] tracking-[0.16em] uppercase px-2 py-1 border"
                        style={{ color: C.sageMist, borderColor: 'rgba(179,198,181,0.2)' }}
                      >
                        {m.role}
                      </span>
                    </div>
                    <ul className="flex flex-col gap-2">
                      {m.details.map((d, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span
                            className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                            style={{ background: C.sageMist, opacity: 0.4 }}
                          />
                          <span
                            className="text-xs leading-relaxed font-light"
                            style={{ color: C.silverFog }}
                          >
                            {d}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Training strategy */}
            <Reveal delay={0.1} className="mb-14">
              <div
                className="p-6"
                style={{ border: `1px solid ${C.rule}`, background: 'rgba(130,149,165,0.02)' }}
              >
                <p
                  className="text-[9px] tracking-[0.2em] uppercase mb-4"
                  style={{ color: C.steelBlue }}
                >
                  Training Strategy
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { label: 'Input Features', value: 'Same four features for both models' },
                    { label: 'Training Split', value: 'Approx. 80% training · 20% testing' },
                    { label: 'Split Method', value: 'Chronological — temporal order preserved' },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p
                        className="text-[9px] tracking-[0.16em] uppercase mb-1.5"
                        style={{ color: 'rgba(200,204,202,0.35)' }}
                      >
                        {label}
                      </p>
                      <p
                        className="text-xs font-light leading-snug"
                        style={{ color: C.silverFog }}
                      >
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Research pipeline */}
            <Reveal delay={0.1} className="mb-14">
              <p
                className="text-xs tracking-[0.16em] uppercase font-medium mb-6"
                style={{ color: C.dustyPlum }}
              >
                Research Pipeline
              </p>
              <Pipeline />
            </Reveal>

            {/* Tools */}
            <Reveal delay={0.1}>
              <p
                className="text-xs tracking-[0.16em] uppercase font-medium mb-5"
                style={{ color: C.dustyPlum }}
              >
                Tools
              </p>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Google Colab', 'yfinance', 'pandas', 'NumPy', 'scikit-learn'].map(tool => (
                  <span
                    key={tool}
                    className="text-[10px] tracking-[0.14em] uppercase px-3 py-1.5 border font-medium"
                    style={{
                      color: C.sageMist,
                      borderColor: 'rgba(179,198,181,0.15)',
                      background: 'rgba(179,198,181,0.03)',
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <Rule />

        {/* ── RESOURCES ─────────────────────────────────────────────────────── */}
        <section
          id="resources"
          className="py-20 md:py-28"
          style={{ background: 'linear-gradient(180deg, #17221F 0%, #101715 100%)' }}
        >
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
            <Reveal>
              <p
                className="text-[10px] tracking-[0.22em] uppercase font-medium mb-5"
                style={{ color: C.steelBlue }}
              >
                Research Resources
              </p>
              <h2
                className="text-3xl md:text-4xl font-semibold tracking-tight mb-12 leading-tight"
                style={{ fontFamily: 'Space Grotesk, sans-serif', color: C.porcelain }}
              >
                Source Code &amp; Data
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div style={{ borderTop: `1px solid ${C.rule}` }}>
                <ResourceLink
                  label="View Source Code"
                  description="Explore the Python implementation, model training pipeline, and project documentation."
                  href="https://github.com/roshia3/nvda-ml-forecasting"
                  external
                />

                {/* PDF — only shown when available */}
                {pdfAvailable === true && (
                  <ResourceLink
                    label="Download Research Paper"
                    description="Full research paper covering methodology, results, and analysis — PDF."
                    href="/papers/nvda-ml-research.pdf"
                    external={false}
                  />
                )}

                <ResourceLink
                  label="View NVIDIA Historical Data"
                  description="NVIDIA (NVDA) historical stock market data on Yahoo Finance. The research covers January 2020 through December 2025."
                  href="https://finance.yahoo.com/quote/NVDA/history/"
                  external
                />
              </div>
            </Reveal>
          </div>
        </section>

        <Rule />

        {/* ── REFERENCES ────────────────────────────────────────────────────── */}
        <section
          id="references"
          className="py-16 md:py-24"
          style={{ background: '#101715' }}
        >
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
            <Reveal>
              <p
                className="text-[10px] tracking-[0.22em] uppercase font-medium mb-8"
                style={{ color: C.steelBlue }}
              >
                References
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <Reference
                  number={1}
                  citation="Ballings, M., Van Den Poel, D., Hespeels, N., & Gryp, R. (2015). Evaluating multiple classifiers for stock price direction prediction. Expert Systems with Applications, 42(20), 7046–7056."
                  doi="10.1016/j.eswa.2015.05.013"
                />
                <Reference
                  number={2}
                  citation="Fischer, T., & Krauss, C. (2018). Deep learning with long short-term memory networks for financial market predictions. European Journal of Operational Research, 270(2), 654–669."
                  doi="10.1016/j.ejor.2017.11.054"
                />
                <Reference
                  number={3}
                  citation="Krauss, C., Do, X. A., & Huck, N. (2017). Deep neural networks, gradient-boosted trees, random forests: Statistical arbitrage on the S&P 500. European Journal of Operational Research, 259(2), 689–702."
                  doi="10.1016/j.ejor.2016.10.031"
                />
                <Reference
                  number={4}
                  citation="Patel, J., Shah, S., Thakkar, P., & Kotecha, K. (2015). Predicting stock and stock price index movement using Trend Deterministic Data Preparation and machine learning techniques. Expert Systems with Applications, 42(1), 259–268."
                  doi="10.1016/j.eswa.2014.07.040"
                />
              </div>
            </Reveal>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
