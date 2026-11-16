export const COLORS = {
  obsidian: '#101715',
  deepForest: '#1D302A',
  forestCharcoal: '#17221F',
  porcelain: '#F2F3EF',
  sageMist: '#B3C6B5',
  steelBlue: '#8295A5',
  dustyPlum: '#766A82',
  silverFog: '#C8CCCA',
  sectionMid: '#293A34',
} as const

export const FONTS = {
  heading: "'Space Grotesk', sans-serif",
  body: "'Inter', sans-serif",
} as const

export const NAV_LINKS = [
  { label: 'About',    href: '/#about',          accent: false },
  { label: 'Research', href: '/#selected-works',  accent: false },
  { label: 'Projects', href: '/projects',          accent: false },
  { label: 'CV',       href: '/cv',               accent: false },
  { label: 'NVDA-ML',  href: '/research/quant',   accent: true  },
] as const

// ── Personal profile links — edit here to update everywhere ──────────────────
export const PROFILE_LINKS = {
  github:   'https://github.com/roshia3',
  linkedin: 'https://www.linkedin.com/in/roshia-dutta/',
} as const

export const TRANSITION = {
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  duration: 0.7,
}
