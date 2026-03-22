'use client'
import Image from 'next/image'
import { ArrowRight, Clock, Tag, X } from 'lucide-react'
import { useT, useLocale } from '@/lib/i18n'
import { articlesDE, articlesFR, Article, Block } from '@/lib/articles'

function renderBlock(block: Block, i: number) {
  if (block.type === 'h') return <h3 key={i} className="text-lg font-bold mt-6 mb-2" style={{ color: '#1a2e1d' }}>{block.text}</h3>
  if (block.type === 'b') {
    const colonIdx = block.text.indexOf(':')
    const hasTitle = colonIdx > 0 && colonIdx < 50
    return (
      <div key={i} className="flex gap-3 my-1.5">
        <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500" />
        <p className="text-gray-700 text-sm leading-relaxed">
          {hasTitle ? (<><strong className="text-gray-900">{block.text.slice(0, colonIdx + 1)}</strong>{block.text.slice(colonIdx + 1)}</>) : block.text}
        </p>
      </div>
    )
  }
  return <p key={i} className="text-gray-600 text-sm leading-relaxed my-2">{block.text}</p>
}

function ArticleCard({ article, t }: { article: Article; t: (k: string) => string }) {
  const { id, cat, title, excerpt, date, readTime } = article
  return (
    <a
      href="#"
      data-action="open-modal"
      data-modal={`ze-modal-${id}`}
      className="bg-white rounded-2xl overflow-hidden flex flex-col group card-hover"
      style={{ border: '1.5px solid #e8f0ea', boxShadow: '0 2px 12px rgba(45,122,58,0.06)', textDecoration: 'none', touchAction: 'manipulation' }}
    >
      <div className="h-44 relative overflow-hidden rounded-t-2xl flex-shrink-0">
        <Image src={`/blog/${id}.png`} alt={title} fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: '#e8f5ec', color: '#2d7a3a' }}>
            <Tag size={10} /> {cat}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-gray-400"><Clock size={10} /> {readTime}</span>
        </div>
        <h3 className="font-bold text-base leading-snug group-hover:text-green-700 transition-colors" style={{ color: '#1a2e1d' }}>{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1">{excerpt}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-400">{date}</span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: '#2d7a3a' }}>{t('read')} <ArrowRight size={14} /></span>
        </div>
      </div>
    </a>
  )
}

function ArticleModal({ article }: { article: Article }) {
  const { id, cat, title, date, readTime, blocks } = article
  return (
    <div
      id={`ze-modal-${id}`}
      className="ze-modal"
      style={{
        display: 'none',
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(4px)',
      }}
    >
      {/* Backdrop — closes modal */}
      <a href="#" data-action="close-modal" className="absolute inset-0" aria-label="Schließen" style={{ touchAction: 'manipulation' }} />

      {/* Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col" style={{ maxHeight: '88vh', zIndex: 1 }}>
        <div className="h-52 relative flex-shrink-0">
          <Image src={`/blog/${id}.png`} alt={title} fill className="object-cover" sizes="672px" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <a
            href="#"
            data-action="close-modal"
            className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-white bg-black/30 hover:bg-black/50 transition-colors"
            aria-label="Schließen"
            style={{ touchAction: 'manipulation' }}
          >
            <X size={18} />
          </a>
        </div>
        <div className="p-6 pb-4 border-b border-green-50 flex-shrink-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: '#e8f5ec', color: '#2d7a3a' }}>
              <Tag size={10} /> {cat}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-gray-400"><Clock size={10} /> {readTime}</span>
            <span className="text-xs text-gray-400">{date}</span>
          </div>
          <h2 className="text-xl font-extrabold leading-tight" style={{ color: '#1a2e1d' }}>{title}</h2>
        </div>
        <div className="overflow-y-auto flex-1 p-6">
          {blocks.map((block, i) => renderBlock(block, i))}
          <div className="mt-8 pt-6 border-t border-green-50">
            <p className="text-xs text-gray-400">Ze-Solution · {date}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FeaturedPosts() {
  const t = useT('posts')
  const locale = useLocale()
  const articles = locale === 'fr' ? articlesFR : articlesDE
  const first = articles.slice(0, 3)
  const rest = articles.slice(3)

  return (
    <section id="posts" className="py-24 px-6" style={{ background: 'linear-gradient(160deg, #f7fcf8 0%, #ffffff 100%)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full mb-4" style={{ background: '#e8f5ec', color: '#2d7a3a' }}>{t('badge')}</span>
            <h2 className="text-4xl font-extrabold leading-tight" style={{ color: '#1a2e1d' }}>{t('title')}</h2>
          </div>
          <p className="text-sm text-gray-400">{articles.length} {t('total')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {first.map(article => <ArticleCard key={article.id} article={article} t={t} />)}
        </div>

        {rest.length > 0 && (
          <details className="mt-6">
            <summary className="flex justify-center mt-4">
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border-2"
                style={{ borderColor: '#2d7a3a', color: '#2d7a3a', cursor: 'pointer' }}>
                {t('showAll')} ({rest.length})
              </span>
            </summary>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              {rest.map(article => <ArticleCard key={article.id} article={article} t={t} />)}
            </div>
          </details>
        )}
      </div>

      {articles.map(article => <ArticleModal key={article.id} article={article} />)}
    </section>
  )
}
