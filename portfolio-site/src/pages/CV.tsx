import { ArrowUpRight, Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { PROFILE_LINKS } from '../lib/constants'

// ─── Design tokens ────────────────────────────────────────────────────────────

const C = {
  obsidian:       '#101715',
  deepForest:     '#1D302A',
  porcelain:      '#F2F3EF',
  sageMist:       '#B3C6B5',
  steelBlue:      '#8295A5',
  dustyPlum:      '#766A82',
  silverFog:      '#C8CCCA',
  rule:           'rgba(200,204,202,0.08)',
  ruleAccent:     'rgba(179,198,181,0.15)',
}

const PDF_PATH = '/resume/Roshia_Dutta_Resume.pdf'

// ─── Profile link card ────────────────────────────────────────────────────────

function ProfileLink({
  title,
  subtitle,
  href,
  actionLabel,
  icon,
}: {
  title: string
  subtitle: string
  href: string
  actionLabel: string
  icon: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-4 p-6 border transition-all duration-300"
      style={{
        borderColor: C.ruleAccent,
        background: 'rgba(179,198,181,0.02)',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.borderColor = 'rgba(179,198,181,0.3)'
        el.style.background = 'rgba(179,198,181,0.04)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.borderColor = C.ruleAccent
        el.style.background = 'rgba(179,198,181,0.02)'
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <p
            className="text-base font-semibold"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: C.porcelain }}
          >
            {title}
          </p>
          <p className="text-xs font-light" style={{ color: C.silverFog }}>
            {subtitle}
          </p>
        </div>
        <div style={{ color: C.sageMist, opacity: 0.5 }}>
          {icon}
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <span
          className="text-xs tracking-[0.14em] uppercase font-medium border-b border-transparent group-hover:border-current transition-colors duration-300"
          style={{ color: C.sageMist }}
        >
          {actionLabel}
        </span>
        <ArrowUpRight
          size={12}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          style={{ color: C.sageMist }}
        />
      </div>
    </a>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function CV() {
  const [pdfAvailable, setPdfAvailable] = useState<boolean | null>(null)

  useEffect(() => {
    fetch(PDF_PATH, { method: 'HEAD' })
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
            background: 'linear-gradient(180deg, #0e1612 0%, #101715 55%, #17221F 100%)',
            paddingTop: '56px',
          }}
        >
          <div className="mx-auto max-w-4xl px-6 md:px-10 lg:px-16 pt-20 pb-16">
            <p
              className="text-[10px] tracking-[0.24em] uppercase font-medium mb-7"
              style={{ color: C.steelBlue }}
            >
              05 / Academic Profile
            </p>
            <h1
              className="text-5xl sm:text-6xl md:text-7xl font-semibold leading-[0.92] tracking-tight mb-6"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: C.porcelain }}
            >
              Curriculum Vitae.
            </h1>
            <p
              className="text-base md:text-lg font-light leading-relaxed"
              style={{ color: C.silverFog, maxWidth: '480px' }}
            >
              Academic background, research experience, and selected professional work.
            </p>
          </div>

          <div className="mx-auto max-w-4xl px-6 md:px-10 lg:px-16">
            <div className="h-px w-full" style={{ background: C.rule }} />
          </div>
        </section>

        {/* ── PROFESSIONAL PROFILES ─────────────────────────────────────────── */}
        <section
          className="py-16 md:py-20"
          style={{ background: 'linear-gradient(180deg, #17221F 0%, #1D302A 100%)' }}
        >
          <div className="mx-auto max-w-4xl px-6 md:px-10 lg:px-16">
            <p
              className="text-[10px] tracking-[0.22em] uppercase font-medium mb-8"
              style={{ color: C.steelBlue }}
            >
              Professional Profiles
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ProfileLink
                title="LinkedIn"
                subtitle="Professional Profile"
                href={PROFILE_LINKS.linkedin}
                actionLabel="View Profile"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect width="4" height="12" x="2" y="9"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                }
              />
              <ProfileLink
                title="GitHub"
                subtitle="Code & Projects"
                href={PROFILE_LINKS.github}
                actionLabel="View Repositories"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                }
              />
            </div>
          </div>
        </section>

        {/* ── RESUME ────────────────────────────────────────────────────────── */}
        <section
          className="py-16 md:py-20"
          style={{ background: '#17221F' }}
        >
          <div className="mx-auto max-w-4xl px-6 md:px-10 lg:px-16">
            {/* Section header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
              <div>
                <p
                  className="text-[10px] tracking-[0.22em] uppercase font-medium mb-3"
                  style={{ color: C.steelBlue }}
                >
                  Resume
                </p>
                <h2
                  className="text-2xl md:text-3xl font-semibold tracking-tight"
                  style={{ fontFamily: 'Space Grotesk, sans-serif', color: C.porcelain }}
                >
                  Roshia Dutta
                </h2>
                <p className="text-sm font-light mt-1" style={{ color: C.silverFog }}>
                  View or download my resume to explore my academic background, research experience, and technical skills.
                </p>
              </div>

              {/* Action buttons — only when PDF is available */}
              {pdfAvailable && (
                <div className="flex items-center gap-4 shrink-0">
                  <a
                    href={PDF_PATH}
                    download="Roshia_Dutta_Resume.pdf"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs tracking-[0.14em] uppercase font-medium border transition-all duration-300 hover:bg-sage-mist/10"
                    style={{
                      color: C.porcelain,
                      borderColor: C.ruleAccent,
                      background: 'rgba(179,198,181,0.05)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(179,198,181,0.1)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(179,198,181,0.05)' }}
                  >
                    <Download size={12} />
                    Download Resume
                  </a>
                  <a
                    href={PDF_PATH}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs tracking-[0.14em] uppercase font-medium transition-colors duration-300"
                    style={{ color: C.silverFog }}
                    onMouseEnter={e => { e.currentTarget.style.color = C.porcelain }}
                    onMouseLeave={e => { e.currentTarget.style.color = C.silverFog }}
                  >
                    Open PDF
                    <ArrowUpRight size={11} />
                  </a>
                </div>
              )}
            </div>

            {/* PDF viewer / fallback */}
            {pdfAvailable === null && (
              /* Loading state — brief, usually invisible */
              <div
                className="w-full flex items-center justify-center py-20"
                style={{ border: `1px solid ${C.rule}` }}
              >
                <span className="text-xs tracking-[0.16em] uppercase" style={{ color: 'rgba(200,204,202,0.3)' }}>
                  Loading…
                </span>
              </div>
            )}

            {pdfAvailable === false && (
              <div
                className="w-full flex flex-col items-center justify-center gap-3 py-20"
                style={{ border: `1px solid ${C.rule}`, background: 'rgba(179,198,181,0.02)' }}
              >
                <span className="text-sm font-light" style={{ color: 'rgba(200,204,202,0.4)' }}>
                  Resume PDF will be available soon.
                </span>
                <span className="text-[9px] tracking-[0.14em] uppercase" style={{ color: 'rgba(200,204,202,0.2)' }}>
                  Add the file at public/resume/Roshia_Dutta_Resume.pdf
                </span>
              </div>
            )}

            {pdfAvailable === true && (
              <>
                {/* Desktop: embedded iframe */}
                <div
                  className="hidden md:block w-full overflow-hidden"
                  style={{ border: `1px solid ${C.rule}` }}
                >
                  <iframe
                    src={PDF_PATH}
                    title="Roshia Dutta — Resume"
                    className="w-full"
                    style={{
                      height: '900px',
                      display: 'block',
                      background: '#fff',
                    }}
                  />
                </div>

                {/* Mobile: iframe doesn't reliably work — show clear actions instead */}
                <div
                  className="md:hidden w-full flex flex-col items-center gap-5 py-14"
                  style={{ border: `1px solid ${C.rule}`, background: 'rgba(179,198,181,0.02)' }}
                >
                  <p className="text-sm font-light text-center px-6" style={{ color: C.silverFog }}>
                    For the best experience, open or download the PDF directly.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <a
                      href={PDF_PATH}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 text-xs tracking-[0.14em] uppercase font-medium border transition-colors duration-300"
                      style={{ color: C.porcelain, borderColor: C.ruleAccent, background: 'rgba(179,198,181,0.05)' }}
                    >
                      <ArrowUpRight size={12} />
                      Open PDF
                    </a>
                    <a
                      href={PDF_PATH}
                      download="Roshia_Dutta_Resume.pdf"
                      className="inline-flex items-center gap-2 px-5 py-3 text-xs tracking-[0.14em] uppercase font-medium border transition-colors duration-300"
                      style={{ color: C.silverFog, borderColor: C.rule }}
                    >
                      <Download size={12} />
                      Download Resume
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
