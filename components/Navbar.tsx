'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { useT, useLocale } from '@/lib/i18n'

export default function Navbar() {
  const t = useT('nav')
  const locale = useLocale()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: t('home'), href: '#hero' },
    { label: t('topics'), href: '#categories' },
    { label: t('blog'), href: '#posts' },
    { label: t('about'), href: '#about' },
    { label: t('contact'), href: '#contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-md'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm">
            <Image src="/logo-rund.png" alt="Ze-Solution Logo" width={40} height={40} className="object-cover w-full h-full" />
          </div>
          <span className="font-bold text-lg tracking-wide" style={{ color: '#2d7a3a' }}>Ze-Solution</span>
        </a>

        <div className="hidden md:flex items-center gap-4 lg:gap-7">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-xs lg:text-sm font-medium text-gray-600 hover:text-green-700 transition-colors duration-200 whitespace-nowrap">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          <a
            href={locale === 'de' ? '/fr' : '/de'}
            data-action="locale"
            data-value={locale === 'de' ? 'fr' : 'de'}
            className="px-2.5 py-1 lg:px-3 lg:py-1.5 rounded-md text-xs lg:text-sm font-semibold border"
            style={{ borderColor: '#2d7a3a', color: '#2d7a3a', textDecoration: 'none', touchAction: 'manipulation' }}
          >
            {locale === 'de' ? 'FR' : 'DE'}
          </a>
          <a href="#contact" className="hidden lg:inline-block px-5 py-2 rounded-full text-white text-sm font-semibold" style={{ background: 'linear-gradient(135deg, #2d7a3a, #4caf68)' }}>
            {t('cta')}
          </a>
          {/* Hamburger: native JS via data-action, bypasses React event system */}
          <button
            type="button"
            data-action="toggle-nav"
            className="md:hidden text-gray-700 p-2"
            style={{ touchAction: 'manipulation' }}
            aria-label="Menü"
          >
            <span id="icon-menu"><Menu size={22} /></span>
            <span id="icon-close" style={{ display: 'none' }}><X size={22} /></span>
          </button>
        </div>
      </div>

      {/* Mobile menu: always in DOM, shown/hidden via native JS */}
      <div id="mobile-nav" className="md:hidden bg-white border-t border-green-100 px-6 py-4 flex-col gap-4" style={{ display: 'none' }}>
        {links.map(l => (
          <a key={l.href} href={l.href} data-action="close-nav" className="text-gray-700 hover:text-green-700 text-sm font-medium transition-colors">
            {l.label}
          </a>
        ))}
        <a href="#contact" data-action="close-nav" className="text-center px-5 py-2 rounded-full text-white text-sm font-semibold" style={{ background: 'linear-gradient(135deg, #2d7a3a, #4caf68)' }}>
          {t('cta')}
        </a>
      </div>
    </nav>
  )
}
