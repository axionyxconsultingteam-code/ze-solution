'use client'
import { Baby, Dumbbell, Heart, Apple, Brain, Sun, Droplets, Users, UserCheck, Scale, Shield, Moon, Sparkles } from 'lucide-react'
import { useT } from '@/lib/i18n'

export default function Categories() {
  const t = useT('categories')
  const items = [
    { icon: Baby, labelKey: 'pregnancy', descKey: 'pregnancyDesc' },
    { icon: Dumbbell, labelKey: 'sport', descKey: 'sportDesc' },
    { icon: Heart, labelKey: 'breastfeeding', descKey: 'breastfeedingDesc' },
    { icon: Apple, labelKey: 'everyday', descKey: 'everydayDesc' },
    { icon: Brain, labelKey: 'mental', descKey: 'mentalDesc' },
    { icon: Sun, labelKey: 'detox', descKey: 'detoxDesc' },
    { icon: Droplets, labelKey: 'diabetes', descKey: 'diabetesDesc' },
    { icon: Users, labelKey: 'kids', descKey: 'kidsDesc' },
    { icon: UserCheck, labelKey: 'elderly', descKey: 'elderlyDesc' },
    { icon: Scale, labelKey: 'weight', descKey: 'weightDesc' },
    { icon: Shield, labelKey: 'immune', descKey: 'immuneDesc' },
    { icon: Moon, labelKey: 'sleep', descKey: 'sleepDesc' },
  ]

  return (
    <section id="categories" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full mb-4" style={{ background: '#e8f5ec', color: '#2d7a3a' }}>{t('badge')}</span>
          <h2 className="text-4xl font-extrabold leading-tight" style={{ color: '#1a2e1d' }}>{t('title')}</h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(({ icon: Icon, labelKey, descKey }) => (
            <a key={labelKey} href="#posts"
              className="card-hover rounded-2xl p-5 flex flex-col gap-2.5"
              style={{ background: '#f7fcf8', border: '1.5px solid #d4eeda', textDecoration: 'none' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#e8f5ec' }}>
                <Icon size={18} style={{ color: '#2d7a3a' }} />
              </div>
              <h3 className="font-bold text-sm" style={{ color: '#1a2e1d' }}>{t(labelKey)}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{t(descKey)}</p>
            </a>
          ))}

          {/* Green "mehr" box */}
          <div className="rounded-2xl p-5 flex flex-col gap-2.5 justify-center items-center text-center"
            style={{ background: 'linear-gradient(135deg, #2d7a3a, #4caf68)', border: '1.5px solid #2d7a3a' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
              <Sparkles size={18} color="white" />
            </div>
            <h3 className="font-bold text-sm text-white">{t('more')}</h3>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>{t('moreDesc')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
