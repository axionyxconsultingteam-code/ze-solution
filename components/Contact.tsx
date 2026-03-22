'use client'
import { useState, useRef } from 'react'
import { Mail, MessageSquare, Send } from 'lucide-react'
import { useT } from '@/lib/i18n'

export default function Contact() {
  const t = useT('contact')
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, message }) })
      if (res.ok) { setStatus('sent'); formRef.current?.reset() } else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <section id="contact" className="py-24 px-6" style={{ background: 'linear-gradient(160deg, #f0faf3 0%, #ffffff 100%)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full mb-4" style={{ background: '#e8f5ec', color: '#2d7a3a' }}>{t('badge')}</span>
          <h2 className="text-4xl font-extrabold leading-tight" style={{ color: '#1a2e1d' }}>{t('title')}</h2>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto">{t('subtitle')}</p>
        </div>
        <div className="grid md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-2 flex flex-col gap-5">
            {[{ icon: Mail, title: t('emailLabel'), val: 'zesolution.team@gmail.com' }, { icon: MessageSquare, title: t('responseLabel'), val: t('responseVal') }].map(({ icon: Icon, title, val }) => (
              <div key={title} className="rounded-2xl p-5 flex items-start gap-4" style={{ background: 'white', border: '1.5px solid #d4eeda' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#e8f5ec' }}>
                  <Icon size={18} style={{ color: '#2d7a3a' }} />
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: '#1a2e1d' }}>{title}</div>
                  <div className="text-gray-500 text-sm mt-0.5">{val}</div>
                </div>
              </div>
            ))}
            <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #2d7a3a, #4caf68)' }}>
              <div className="text-white font-bold text-lg mb-2">{t('freeTitle')}</div>
              <p className="text-green-100 text-sm leading-relaxed">{t('freeDesc')}</p>
            </div>
          </div>
          <div className="md:col-span-3 rounded-2xl p-8 bg-white" style={{ border: '1.5px solid #d4eeda', boxShadow: '0 4px 24px rgba(45,122,58,0.08)' }}>
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
              {[{ name: 'name', label: t('name'), placeholder: t('namePlaceholder'), type: 'text' },
                { name: 'email', label: t('email'), placeholder: t('emailPlaceholder'), type: 'email' }].map(f => (
                <div key={f.name}>
                  <label className="text-sm font-medium mb-2 block" style={{ color: '#1a2e1d' }}>{f.label}</label>
                  <input name={f.name} type={f.type} placeholder={f.placeholder} required
                    className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                    style={{ background: '#f7fcf8', border: '1.5px solid #d4eeda', color: '#1a2e1d' }} />
                </div>
              ))}
              <div>
                <label className="text-sm font-medium mb-2 block" style={{ color: '#1a2e1d' }}>{t('message')}</label>
                <textarea name="message" placeholder={t('messagePlaceholder')} rows={5} required
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none resize-none"
                  style={{ background: '#f7fcf8', border: '1.5px solid #d4eeda', color: '#1a2e1d' }} />
              </div>
              {status === 'error' && <p className="text-red-500 text-sm text-center">{t('error')}</p>}
              {status === 'sent' && <p className="text-green-600 text-sm text-center font-medium">{t('sent')}</p>}
              <button type="submit" disabled={status === 'loading' || status === 'sent'}
                className="w-full py-3.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
                style={{ background: 'linear-gradient(135deg, #2d7a3a, #4caf68)', touchAction: 'manipulation' }}>
                <Send size={16} />
                {status === 'loading' ? t('sending') : t('send')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
