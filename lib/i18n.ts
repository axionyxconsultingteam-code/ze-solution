'use client'
import { usePathname } from 'next/navigation'
import de from '@/messages/de.json'
import fr from '@/messages/fr.json'

const messages: Record<string, Record<string, unknown>> = { de, fr }

export function useT(section: string) {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] === 'fr' ? 'fr' : 'de'
  const dict = (messages[locale]?.[section] || messages['de'][section]) as Record<string, string>
  return (key: string): string => dict?.[key] ?? key
}

export function useLocale() {
  const pathname = usePathname()
  return pathname.split('/')[1] === 'fr' ? 'fr' : 'de'
}
