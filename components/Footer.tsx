'use client'
import Image from 'next/image'
import { Leaf } from 'lucide-react'
import { useT } from '@/lib/i18n'

export default function Footer() {
  const t = useT('footer')
  return (
    <footer style={{ background: '#1a2e1d', color: '#a8c4ac' }} className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-green-800 bg-white flex items-center justify-center">
              <Image src="/logo-rund.png" alt="Ze-Solution" width={40} height={40} className="object-cover" />
            </div>
            <div>
              <div className="font-bold text-white text-lg">Ze-Solution</div>
              <div className="text-xs" style={{ color: '#6a9a6e' }}>{t('slogan')}</div>
            </div>
          </div>
          <div className="flex gap-6">
            {(['home', 'blog', 'about', 'contact'] as const).map(k => (
              <a key={k} href={`#${k === 'home' ? 'hero' : k === 'blog' ? 'posts' : k}`} className="text-sm hover:text-white transition-colors" style={{ color: '#6a9a6e' }}>{t(k)}</a>
            ))}
          </div>
          <div className="flex items-center gap-1 text-sm" style={{ color: '#6a9a6e' }}>
            <Leaf size={14} /> {t('natural')}
          </div>
        </div>
        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ borderColor: '#2a4a2e', color: '#6a9a6e' }}>
          <p>{t('copyright')}</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">{t('imprint')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('privacy')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
