'use client'
import { ArrowRight, Leaf } from 'lucide-react'
import Image from 'next/image'
import { useT } from '@/lib/i18n'

export default function Hero() {
  const t = useT('hero')
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ background: 'linear-gradient(160deg, #f0faf3 0%, #ffffff 50%, #e8f5ec 100%)' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="animate-pulse-bg absolute -top-32 -left-32 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(76,175,104,0.2) 0%, transparent 70%)' }} />
        <div className="animate-pulse-bg2 absolute -bottom-20 -right-20 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(45,122,58,0.15) 0%, transparent 70%)' }} />
        <div className="animate-float-leaf absolute top-1/4 right-1/4 opacity-10">
          <Leaf size={120} color="#2d7a3a" />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <div className="text-center lg:text-left">
          <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full mb-6" style={{ background: '#e8f5ec', color: '#2d7a3a' }}>
            {t('badge')}
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.1] mb-6" style={{ color: '#1a2e1d' }}>
            {t('title1')}{' '}
            <span style={{ color: '#2d7a3a' }}>{t('title2')}</span>{' '}
            {t('title3')}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">{t('subtitle')}</p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <a href="#posts" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold"
              style={{ background: 'linear-gradient(135deg, #2d7a3a, #4caf68)', boxShadow: '0 4px 20px rgba(45,122,58,0.3)' }}>
              {t('cta1')} <ArrowRight size={18} />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold border-2"
              style={{ borderColor: '#2d7a3a', color: '#2d7a3a' }}>
              {t('cta2')}
            </a>
          </div>
          <div className="flex gap-8 mt-12 justify-center lg:justify-start flex-wrap">
            {[
              [t('stat1'), t('stat1label')],
              [t('stat2'), t('stat2label')],
              [t('stat3'), t('stat3label')],
            ].map(([num, label]) => (
              <div key={label}>
                <div className="text-2xl font-extrabold" style={{ color: '#2d7a3a' }}>{num}</div>
                <div className="text-xs text-gray-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8 lg:mt-0">
          <div className="animate-float-logo relative">
            <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(76,175,104,0.3) 0%, transparent 70%)', filter: 'blur(30px)', transform: 'scale(1.2)' }} />
            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #f0faf3, #ffffff)', boxShadow: '0 20px 60px rgba(45,122,58,0.25)' }}>
              <Image src="/logo-rund.png" alt="Ze-Solution" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      <div className="animate-float-dot absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-0.5 h-8 rounded-full" style={{ background: 'linear-gradient(to bottom, #2d7a3a, transparent)' }} />
      </div>
    </section>
  )
}
