'use client'
import { CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import { useT } from '@/lib/i18n'

export default function About() {
  const t = useT('about')
  const points = ['point1', 'point2', 'point3', 'point4']
  return (
    <section id="about" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl rotate-3" style={{ background: '#e8f5ec' }} />
            <div className="relative w-80 h-80 rounded-3xl overflow-hidden shadow-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f0faf3, #e0f2e5)' }}>
              <Image src="/logo-rund.png" alt="Ze-Solution" width={240} height={240} className="object-cover" />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2" style={{ border: '1.5px solid #e8f0ea' }}>
              <span className="text-2xl">🌿</span>
              <div>
                <div className="text-xs font-bold" style={{ color: '#2d7a3a' }}>{t('badge2')}</div>
                <div className="text-xs text-gray-400">{t('badge2sub')}</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full mb-6" style={{ background: '#e8f5ec', color: '#2d7a3a' }}>{t('badge')}</span>
          <h2 className="text-4xl font-extrabold leading-tight mb-6" style={{ color: '#1a2e1d' }}>{t('title')}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">{t('p1')}</p>
          <p className="text-gray-600 leading-relaxed mb-8">{t('p2')}</p>
          <div className="flex flex-col gap-3 mb-8">
            {points.map(p => (
              <div key={p} className="flex items-center gap-3">
                <CheckCircle2 size={18} style={{ color: '#2d7a3a', flexShrink: 0 }} />
                <span className="text-gray-700 text-sm">{t(p)}</span>
              </div>
            ))}
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold"
            style={{ background: 'linear-gradient(135deg, #2d7a3a, #4caf68)', boxShadow: '0 4px 20px rgba(45,122,58,0.25)' }}>
            {t('cta')}
          </a>
        </div>
      </div>
    </section>
  )
}
