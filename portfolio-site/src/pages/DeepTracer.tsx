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

// ─── Shared primitives ────────────────────────────────────────────────────────

function Rule() {
  return <div className="w-full h-px" style={{ background: C.rule }} />
}

function RuleAccent() {
  return <div className="w-full h-px" style={{ background: C.ruleAccent }} />
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] tracking-[0.22em] uppercase font-medium mb-5" style={{ color: C.steelBlue }}>
      {children}
    </p>
  )
}

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

// ─── Scientific image with labeled placeholder ────────────────────────────────

function SciImage({
  src,
  alt,
  placeholderLabel,
  caption,
  expandable = false,
}: {
  src: string
  alt: string
  placeholderLabel: string
  caption?: string
  expandable?: boolean
}) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const [lightbox, setLightbox] = useState(false)

  return (
    <>
      <figure className="w-full">
        <div
          className="relative w-full overflow-hidden"
          style={{ border: `1px solid ${C.rule}` }}
        >
          {/* Actual image — hidden until loaded, hidden on error */}
          {!failed && (
            <img
              src={src}
              alt={alt}
              onLoad={() => setLoaded(true)}
              onError={() => { setFailed(true); setLoaded(false) }}
              className="w-full object-contain transition-opacity duration-500"
              style={{ opacity: loaded ? 1 : 0, display: failed ? 'none' : 'block' }}
            />
          )}

          {/* Placeholder — shown while loading or on error */}
          {(!loaded || failed) && (
            <div
              className="w-full flex flex-col items-center justify-center gap-3 py-16"
              style={{ background: 'linear-gradient(160deg, #0f1e1a 0%, #131e1b 100%)', minHeight: '220px' }}
            >
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                <rect x="1" y="1" width="34" height="34" rx="1" stroke={C.sageMist} strokeOpacity="0.2" strokeWidth="1" fill="none" />
                <circle cx="18" cy="14" r="5" stroke={C.sageMist} strokeOpacity="0.3" strokeWidth="1" fill="none" />
                <path d="M4 32 Q10 20 18 24 Q24 28 32 18" stroke={C.sageMist} strokeOpacity="0.3" strokeWidth="1" fill="none" strokeLinecap="round" />
              </svg>
              <span className="text-[10px] tracking-[0.18em] uppercase" style={{ color: 'rgba(179,198,181,0.3)' }}>
                {placeholderLabel}
              </span>
              <span className="text-[9px]" style={{ color: 'rgba(200,204,202,0.18)' }}>
                {src}
              </span>
            </div>
          )}

          {/* Expand button — only when image loaded and expandable */}
          {expandable && loaded && !failed && (
            <button
              onClick={() => setLightbox(true)}
              className="absolute bottom-3 right-3 text-[9px] tracking-[0.14em] uppercase px-2.5 py-1.5 transition-opacity duration-200 opacity-0 hover:opacity-100 focus:opacity-100 group-hover:opacity-100"
              style={{
                color: C.sageMist,
                background: 'rgba(16,23,21,0.8)',
                border: `1px solid ${C.ruleAccent}`,
              }}
              aria-label="Enlarge image"
            >
              Enlarge
            </button>
          )}
        </div>

        {caption && (
          <figcaption
            className="mt-3 text-[10px] leading-relaxed font-light"
            style={{ color: 'rgba(200,204,202,0.35)' }}
          >
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 cursor-zoom-out"
          style={{ background: 'rgba(10,16,14,0.92)' }}
          onClick={() => setLightbox(false)}
          role="dialog"
          aria-modal
          aria-label={alt}
        >
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain"
            style={{ boxShadow: '0 0 60px rgba(0,0,0,0.6)' }}
            onClick={e => e.stopPropagation()}
          />
          <button
            className="absolute top-5 right-6 text-[10px] tracking-[0.18em] uppercase"
            style={{ color: C.silverFog }}
            onClick={() => setLightbox(false)}
            aria-label="Close"
          >
            Close
          </button>
        </div>
      )}
    </>
  )
}

// ─── Resource link (same pattern as QuantResearch) ────────────────────────────

function ResourceLink({
  label,
  description,
  href,
}: {
  label: string
  description?: string
  href: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start justify-between gap-6 py-5 border-b transition-all duration-300 hover:pl-1"
      style={{ borderColor: C.rule }}
    >
      <div className="flex flex-col gap-1.5 flex-1">
        <span className="text-sm font-medium tracking-wide" style={{ color: C.porcelain }}>
          {label}
        </span>
        {description && (
          <span className="text-xs leading-relaxed font-light" style={{ color: C.silverFog }}>
            {description}
          </span>
        )}
      </div>
      <ArrowUpRight
        size={14}
        className="mt-0.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        style={{ color: C.sageMist }}
      />
    </a>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DeepTracer() {
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
          {/* Protein structure image — full-width cinematic */}
          <div className="w-full overflow-hidden group" style={{ maxHeight: '480px' }}>
            <SciImage
              src="/images/deeptracer-structure.webp"
              alt="NVDA protein structure visualization from DeepTracer 3.0"
              placeholderLabel="Protein Structure Visualization"
              expandable
            />
          </div>

          {/* Hero text */}
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16 pt-14 pb-16">
            <p className="text-[10px] tracking-[0.24em] uppercase font-medium mb-6" style={{ color: C.steelBlue }}>
              Research / 002
            </p>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight mb-5"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: C.porcelain, maxWidth: '760px' }}
            >
              DeepTracer 3.0
            </h1>

            <p
              className="text-base md:text-lg font-light leading-relaxed mb-10"
              style={{ color: C.silverFog, maxWidth: '660px' }}
            >
              Advancing Diffusion-Based Protein Structure Prediction Through Research Infrastructure and Training Pipeline Automation
            </p>

            <RuleAccent />

            {/* Meta row */}
            <div className="flex flex-wrap gap-x-10 gap-y-4 pt-8">
              {[
                { label: 'Affiliation',   value: 'DAIS Lab · University of Washington' },
                { label: 'Position',      value: 'AI Research Assistant — Generative Model Team' },
                { label: 'Faculty Advisor', value: 'Dr. Dong Si' },
                { label: 'Research Areas', value: 'Generative AI · Diffusion Models · Cryo-Electron Microscopy' },
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

        {/* ── 01 RESEARCH CONTEXT ───────────────────────────────────────────── */}
        <section
          id="context"
          className="py-20 md:py-28"
          style={{ background: 'linear-gradient(180deg, #17221F 0%, #1D302A 100%)' }}
        >
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
            <Reveal>
              <SectionLabel>01 / Research Context</SectionLabel>
              <SectionHeading>What is DeepTracer 3.0?</SectionHeading>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-start mb-16">
              <Reveal delay={0.05} className="flex flex-col gap-5">
                {[
                  'DeepTracer is a deep learning framework developed to predict macromolecular structures from cryo-electron microscopy (cryo-EM) density maps. These maps provide three-dimensional information about biological structures, but interpreting them accurately remains a challenging computational problem.',
                  'DeepTracer 3.0 explores diffusion-based generative modeling as an alternative to earlier U-Net-based approaches. By learning to progressively reverse noise, diffusion models offer a different approach to predicting structural information from complex volumetric data.',
                  'I joined the Generative Model Team at the DAIS Lab under Dr. Dong Si, where my research has focused on improving the training infrastructure supporting DeepTracer 3.0. My work centers on automating dataset-dependent training parameters, strengthening pipeline consistency, and making the research workflow more reproducible and maintainable.',
                ].map((para, i) => (
                  <p key={i} className="text-sm leading-[1.85] font-light" style={{ color: C.silverFog }}>
                    {para}
                  </p>
                ))}
              </Reveal>

              {/* Ghost index */}
              <Reveal delay={0.15} className="hidden lg:flex justify-end items-start pt-2">
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

            {/* Architecture diagram */}
            <Reveal delay={0.1}>
              <div className="w-full">
                <SciImage
                  src="/images/deeptracer-architecture.webp"
                  alt="DeepTracer 3.0 generative model architecture diagram"
                  placeholderLabel="Generative Model Architecture Diagram"
                  caption="DeepTracer 3.0 generative model architecture. Diagram provided from the research project."
                  expandable
                />
              </div>
            </Reveal>
          </div>
        </section>

        <Rule />

        {/* ── 02 RESEARCH CONTRIBUTIONS ─────────────────────────────────────── */}
        <section
          id="contributions"
          className="py-20 md:py-28"
          style={{ background: '#17221F' }}
        >
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
            <Reveal>
              <SectionLabel>02 / Research Contributions</SectionLabel>
              <SectionHeading>My Technical Work</SectionHeading>
              <p className="text-sm leading-[1.85] font-light mb-14" style={{ color: C.silverFog, maxWidth: '620px' }}>
                My primary contributions focused on improving how training metadata is generated, stored, and consumed throughout DeepTracer 3.0's machine learning pipeline. I worked across dataset simulation, HDF5 storage, and training modules to replace manual configuration steps with an integrated, automated workflow.
              </p>
            </Reveal>

            <div className="flex flex-col">
              {[
                {
                  n: '01',
                  title: 'Dataset-Integrated Training Metadata',
                  label: 'HDF5 Storage · Class Weights · Pipeline Design',
                  body: [
                    'I redesigned the class-weight management workflow to integrate training metadata directly into HDF5 datasets. Previously, class weights were exported into an intermediate JSON file and loaded separately during training. I extended this approach by embedding the weights within the dataset itself, eliminating the external file dependency.',
                    'This change established a direct relationship between generated datasets and their corresponding training parameters, reducing the possibility of mismatched configurations and improving experiment reproducibility.',
                  ],
                },
                {
                  n: '02',
                  title: 'End-to-End Training Pipeline Automation',
                  label: 'Pipeline Automation · train_new · pipeline.py',
                  body: [
                    'I developed an automated process for generating class weights during dataset simulation and retrieving them during model training.',
                    'This required coordinated modifications across the simulation pipeline, train_new, and pipeline.py to ensure that class weights could propagate through the workflow without manual intervention.',
                    'The resulting process allows researchers to generate datasets and initiate training without manually editing class-weight configurations, simplifying experimentation and reducing opportunities for human error.',
                  ],
                },
                {
                  n: '03',
                  title: 'Research Infrastructure and Reliability',
                  label: 'Refactoring · Maintainability · Code Quality',
                  body: [
                    'I refactored interconnected components of the training pipeline to improve metadata handling, validation, and maintainability.',
                    'This involved simplifying nested data structures, removing redundant checks and intermediate operations, reorganizing class-weight retrieval logic, and cleaning up legacy dependencies following the transition to HDF5-embedded metadata.',
                    'Together, these improvements created a more cohesive and reliable workflow, supporting easier experimentation and continued development within the collaborative research codebase.',
                  ],
                },
              ].map((c, i) => (
                <Reveal key={c.n} delay={i * 0.08}>
                  <div
                    className="py-10 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 lg:gap-14"
                    style={{ borderTop: `1px solid ${C.rule}` }}
                  >
                    {/* Number */}
                    <span
                      className="font-heading text-5xl font-bold leading-none select-none shrink-0"
                      style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        color: 'rgba(179,198,181,0.1)',
                        letterSpacing: '-0.02em',
                        width: '3rem',
                      }}
                    >
                      {c.n}
                    </span>

                    <div>
                      <p className="text-[9px] tracking-[0.2em] uppercase mb-2" style={{ color: C.dustyPlum }}>
                        {c.label}
                      </p>
                      <h3
                        className="text-xl md:text-2xl font-semibold mb-5 leading-snug"
                        style={{ fontFamily: 'Space Grotesk, sans-serif', color: C.porcelain }}
                      >
                        {c.title}
                      </h3>
                      <div className="flex flex-col gap-4">
                        {c.body.map((para, j) => (
                          <p key={j} className="text-sm leading-[1.85] font-light" style={{ color: C.silverFog }}>
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
              {/* Bottom rule */}
              <div className="h-px w-full" style={{ background: C.rule }} />
            </div>
          </div>
        </section>

        <Rule />

        {/* ── 03 ENGINEERING CHALLENGES ─────────────────────────────────────── */}
        <section
          id="challenges"
          className="py-20 md:py-28"
          style={{ background: 'linear-gradient(180deg, #17221F 0%, #1D302A 100%)' }}
        >
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
            <Reveal>
              <SectionLabel>03 / Engineering Challenges</SectionLabel>
              <SectionHeading>Challenges &amp; Solutions</SectionHeading>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  n: '01',
                  title: 'Maintaining Consistency Across Pipeline Stages',
                  challenge: 'The earlier workflow depended on intermediate configuration files, introducing additional steps and potential opportunities for mismatches between dataset generation and training.',
                  solution: 'I restructured how metadata moved through the pipeline and embedded class weights directly into the HDF5 dataset. Training modules were then updated to retrieve the associated values at runtime, reducing reliance on external configuration.',
                },
                {
                  n: '02',
                  title: 'Refactoring Interdependent Modules',
                  challenge: 'Transitioning to dataset-embedded metadata required modifications across several interconnected components. Existing assumptions about how weights were represented, loaded, and passed between modules also needed to be reconsidered.',
                  solution: 'I simplified nested data structures, consolidated retrieval logic, removed redundant checks, and cleaned up legacy code paths to maintain compatibility across the pipeline while improving code clarity.',
                },
                {
                  n: '03',
                  title: 'Designing for Reproducibility and Maintainability',
                  challenge: 'Machine learning research involves repeated experiments, changing datasets, and evolving configurations. Ensuring automation remained predictable as the system developed was a persistent challenge.',
                  solution: 'By integrating metadata storage with dataset generation and adding validation during retrieval, I helped make the class-weighting process more consistent, easier to maintain, and less dependent on manual setup.',
                },
              ].map((item) => (
                <Reveal key={item.n}>
                  <div
                    className="h-full flex flex-col gap-5 p-6"
                    style={{ border: `1px solid ${C.ruleAccent}`, background: 'rgba(179,198,181,0.02)' }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3
                        className="text-base font-semibold leading-snug flex-1"
                        style={{ fontFamily: 'Space Grotesk, sans-serif', color: C.porcelain }}
                      >
                        {item.title}
                      </h3>
                      <span
                        className="text-xs font-medium shrink-0"
                        style={{ color: 'rgba(179,198,181,0.2)', fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        {item.n}
                      </span>
                    </div>

                    <div className="flex flex-col gap-4 flex-1">
                      <div>
                        <p className="text-[9px] tracking-[0.16em] uppercase mb-2" style={{ color: C.steelBlue }}>
                          Challenge
                        </p>
                        <p className="text-xs leading-relaxed font-light" style={{ color: C.silverFog }}>
                          {item.challenge}
                        </p>
                      </div>
                      <div
                        className="h-px w-full"
                        style={{ background: C.rule }}
                      />
                      <div>
                        <p className="text-[9px] tracking-[0.16em] uppercase mb-2" style={{ color: C.sageMist }}>
                          Solution
                        </p>
                        <p className="text-xs leading-relaxed font-light" style={{ color: C.silverFog }}>
                          {item.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Rule />

        {/* ── 04 RESEARCH REFLECTIONS ───────────────────────────────────────── */}
        <section
          id="reflections"
          className="py-20 md:py-28"
          style={{ background: '#17221F' }}
        >
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
            <Reveal>
              <SectionLabel>04 / Research Reflections</SectionLabel>
              <SectionHeading>Learnings</SectionHeading>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-12 lg:gap-16 items-start">
              <Reveal delay={0.05} className="flex flex-col gap-5">
                {[
                  'Working on DeepTracer 3.0 has given me a deeper understanding of the engineering challenges behind developing and maintaining machine learning research systems.',
                  'Beyond studying diffusion-based generative models, I gained practical experience working with complex training pipelines, scientific datasets, and interconnected software components. I learned how seemingly small configuration dependencies can influence the reliability and reproducibility of an entire experimental workflow.',
                  'One of my most valuable lessons has been recognizing that meaningful research contributions extend beyond designing new model architectures. Improving the infrastructure that supports experimentation can be equally important, particularly when researchers need to iterate, reproduce results, and collaborate efficiently.',
                  'This experience has strengthened my interest in machine learning systems and motivated me to continue exploring how reliable computational infrastructure can support increasingly complex intelligent models.',
                ].map((para, i) => (
                  <p key={i} className="text-sm leading-[1.85] font-light" style={{ color: C.silverFog }}>
                    {para}
                  </p>
                ))}
              </Reveal>

              {/* Ghost index */}
              <Reveal delay={0.15} className="hidden lg:flex justify-end items-start">
                <span
                  className="text-[8rem] font-bold leading-none select-none"
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    color: 'rgba(179,198,181,0.05)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  04
                </span>
              </Reveal>
            </div>
          </div>
        </section>

        <Rule />

        {/* ── RESEARCH RESOURCES ────────────────────────────────────────────── */}
        <section
          id="resources"
          className="py-20 md:py-28"
          style={{ background: 'linear-gradient(180deg, #17221F 0%, #101715 100%)' }}
        >
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
            <Reveal>
              <p className="text-[10px] tracking-[0.22em] uppercase font-medium mb-5" style={{ color: C.steelBlue }}>
                Research Resources
              </p>
              <h2
                className="text-3xl md:text-4xl font-semibold tracking-tight mb-3 leading-tight"
                style={{ fontFamily: 'Space Grotesk, sans-serif', color: C.porcelain }}
              >
                Official Project Links
              </h2>
              <p className="text-xs leading-relaxed font-light mb-12" style={{ color: 'rgba(200,204,202,0.35)' }}>
                These are external project resources. They are not publications claimed as my individual work.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div style={{ borderTop: `1px solid ${C.rule}` }}>
                <ResourceLink
                  label="Explore DeepTracer"
                  description="Official DeepTracer website — project overview, documentation, and research updates."
                  href="https://deeptracer.uw.edu/"
                />
                <ResourceLink
                  label="Explore Related Research Code"
                  description="Neural-EM-Map repository — related research code from the DAIS Lab."
                  href="https://github.com/DrDongSi/Neural-EM-Map"
                />
                <ResourceLink
                  label="Read Foundational Publication"
                  description="Pfab, J., Phan, N. M., & Si, D. (2021). DeepTracer for fast de novo cryo-EM protein structure modeling and special studies on CoV-related complexes. Proceedings of the National Academy of Sciences."
                  href="https://www.pnas.org/doi/10.1073/pnas.2017525118"
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
