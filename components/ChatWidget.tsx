'use client'
import { useState, useRef, useEffect } from 'react'
import { X, Send, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import { useLocale } from '@/lib/i18n'

type Message = { role: 'user' | 'assistant'; content: string }

const WELCOME: Record<string, string> = {
  de: 'Hallo! Ich bin Alex, dein Ernährungsberater von Ze-Solution. Wie kann ich dir helfen?',
  fr: "Bonjour! Je suis Alex, ton conseiller en nutrition de Ze-Solution. Comment puis-je t'aider?",
}

export default function ChatWidget() {
  const locale = useLocale()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: WELCOME[locale] ?? WELCOME.de },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function send() {
    const text = input.trim()
    if (!text || loading) return

    const newMessages: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })) }),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || 'Error')
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: locale === 'fr'
            ? "Désolé, une erreur s'est produite. Veuillez réessayer."
            : 'Entschuldigung, ein Fehler ist aufgetreten. Bitte versuche es erneut.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const placeholder = locale === 'fr' ? 'Écris ton message...' : 'Schreib deine Nachricht...'

  return (
    <>
      {open && (
        <div
          className="fixed z-50 flex flex-col shadow-2xl rounded-3xl overflow-hidden"
          style={{
            bottom: '90px',
            right: '20px',
            width: 'min(380px, calc(100vw - 32px))',
            height: 'min(560px, calc(100dvh - 120px))',
            background: '#ffffff',
            border: '1.5px solid #d1f0d9',
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0" style={{ background: 'linear-gradient(135deg, #2d7a3a, #4caf68)' }}>
            <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-white/20">
              <Image src="/logo-rund.png" alt="Alex" width={36} height={36} className="object-cover w-full h-full" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm leading-tight">Alex</p>
              <p className="text-green-100 text-xs">Ze-Solution · Online</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-colors flex-shrink-0"
              style={{ touchAction: 'manipulation' }}
              aria-label="Schließen"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3" style={{ background: '#f7fcf8' }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
                  style={
                    m.role === 'user'
                      ? { background: 'linear-gradient(135deg, #2d7a3a, #4caf68)', color: '#fff', borderBottomRightRadius: '6px' }
                      : { background: '#ffffff', color: '#1a2e1d', border: '1px solid #e2f0e6', borderBottomLeftRadius: '6px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl" style={{ background: '#ffffff', border: '1px solid #e2f0e6', borderBottomLeftRadius: '6px' }}>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex-shrink-0 px-3 py-3 border-t" style={{ borderColor: '#e2f0e6', background: '#ffffff' }}>
            <div className="flex gap-2 items-end">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                rows={1}
                disabled={loading}
                className="flex-1 resize-none rounded-2xl px-3.5 py-2.5 text-sm outline-none border"
                style={{
                  borderColor: '#c8e6d0',
                  color: '#1a2e1d',
                  background: '#f7fcf8',
                  maxHeight: '100px',
                  lineHeight: '1.5',
                  touchAction: 'manipulation',
                }}
              />
              <button
                type="button"
                onClick={send}
                disabled={loading || !input.trim()}
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-opacity"
                style={{
                  background: 'linear-gradient(135deg, #2d7a3a, #4caf68)',
                  opacity: loading || !input.trim() ? 0.5 : 1,
                  touchAction: 'manipulation',
                }}
                aria-label="Senden"
              >
                <Send size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="fixed z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform active:scale-95"
        style={{
          bottom: '20px',
          right: '20px',
          background: 'linear-gradient(135deg, #2d7a3a, #4caf68)',
          touchAction: 'manipulation',
        }}
        aria-label={open ? 'Chat schließen' : 'Chat öffnen'}
      >
        {open ? <X size={22} className="text-white" /> : <MessageCircle size={22} className="text-white" />}
      </button>
    </>
  )
}
