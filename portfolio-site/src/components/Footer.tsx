// Lucide v1.73+ removed brand icons — using inline SVGs instead
import { PROFILE_LINKS } from '../lib/constants'

const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer
      className="relative border-t"
      style={{
        background: '#0e1612',
        borderColor: 'rgba(200,204,202,0.07)',
      }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-12 md:py-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">

          {/* Identity */}
          <div>
            <p
              className="font-heading text-lg font-medium tracking-wide mb-1"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#F2F3EF' }}
            >
              Roshia Dutta
            </p>
            <p
              className="text-xs tracking-[0.14em] uppercase"
              style={{ color: '#8295A5' }}
            >
              Machine Learning · AI Research · Robotics
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
            <a
              href={PROFILE_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs tracking-[0.14em] uppercase transition-colors duration-300 group"
              style={{ color: '#C8CCCA' }}
              aria-label="LinkedIn"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect width="4" height="12" x="2" y="9"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
              <span className="group-hover:text-porcelain transition-colors duration-300">LinkedIn</span>
            </a>

            <a
              href={PROFILE_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs tracking-[0.14em] uppercase transition-colors duration-300 group"
              style={{ color: '#C8CCCA' }}
              aria-label="GitHub"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              <span className="group-hover:text-porcelain transition-colors duration-300">GitHub</span>
            </a>

            <a
              href="/cv"
              className="flex items-center gap-2 text-xs tracking-[0.14em] uppercase transition-colors duration-300 group"
              style={{ color: '#C8CCCA' }}
              aria-label="Curriculum Vitae"
            >
              <span className="group-hover:text-porcelain transition-colors duration-300">CV</span>
            </a>
          </div>
        </div>

        {/* Bottom rule + copyright */}
        <div
          className="mt-10 pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          style={{ borderColor: 'rgba(200,204,202,0.06)' }}
        >
          <p
            className="text-[10px] tracking-[0.16em] uppercase"
            style={{ color: 'rgba(200,204,202,0.3)' }}
          >
            © {CURRENT_YEAR} Roshia Dutta. All rights reserved.
          </p>
          <p
            className="text-[10px] tracking-[0.14em] uppercase"
            style={{ color: 'rgba(200,204,202,0.2)' }}
          >
            Research Portfolio
          </p>
        </div>
      </div>
    </footer>
  )
}
