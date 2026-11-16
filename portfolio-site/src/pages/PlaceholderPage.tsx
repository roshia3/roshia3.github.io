import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface PlaceholderPageProps {
  title: string
  subtitle?: string
}

export default function PlaceholderPage({ title, subtitle }: PlaceholderPageProps) {
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: '#101715', color: '#F2F3EF' }}
    >
      <p
        className="text-xs tracking-[0.22em] uppercase mb-6"
        style={{ color: '#8295A5' }}
      >
        Coming Soon
      </p>
      <h1
        className="font-heading text-5xl md:text-6xl font-semibold mb-4 tracking-tight"
        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm max-w-md mb-10" style={{ color: '#C8CCCA' }}>
          {subtitle}
        </p>
      )}
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 text-xs tracking-[0.16em] uppercase transition-colors duration-300"
        style={{ color: '#B3C6B5' }}
      >
        <ArrowLeft size={13} />
        Back to Portfolio
      </button>
    </div>
  )
}
