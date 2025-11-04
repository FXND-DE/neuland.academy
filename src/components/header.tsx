'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header({ lang }: { lang: 'en' | 'de' }) {
  const pathname = usePathname()
  const otherLang = lang === 'en' ? 'de' : 'en'

  const pathWithoutLang = pathname.replace(/^\/(en|de)/, '')
  const href = `/${otherLang}${pathWithoutLang === '' ? '/' : pathWithoutLang}`

  return (
    <div className="fixed top-4 right-4 z-50">
      <Link href={href} className="font-bold text-sm text-black bg-white/80 px-3 py-1 rounded-lg hover:bg-white transition">
        {otherLang.toUpperCase()}
      </Link>
    </div>
  )
}
