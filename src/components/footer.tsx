'use client'

import { useState } from 'react'
import { PortableText } from '@portabletext/react'
import { Linkedin } from 'lucide-react'

import LegalModal from './LegalModal'
import { legalTexts } from '@/lib/legalTexts'
import { mergePortableTextComponents } from '@/lib/portableTextComponents'
import type { LandingPageQueryResult } from '@/lib/sanity.types'
import { siteConfig } from '@/lib/siteConfig'

interface FooterProps {
  lang: 'de' | 'en'
  copy?: LandingPageQueryResult['footer']
}

const addressComponents = mergePortableTextComponents({
  block: {
    normal: ({ children }) => <p>{children}</p>,
  },
})

export default function Footer({ lang, copy }: FooterProps) {
  const [modal, setModal] = useState<'legal' | 'privacy' | null>(null)
  const footerCopy = {
    brand: copy?.brand ?? siteConfig.name,
    email: copy?.email ?? siteConfig.contactEmail,
    linkedinLabel: copy?.linkedinLabel ?? 'LinkedIn',
    legalLabel: copy?.legalLabel ?? (lang === 'de' ? 'Impressum' : 'Legal Notice'),
    privacyLabel: copy?.privacyLabel ?? (lang === 'de' ? 'Datenschutz' : 'Privacy'),
  }

  const show = (type: 'legal' | 'privacy') => () => setModal(type)
  const close = () => setModal(null)

  return (
    <>
      <footer
        className="px-6 py-12 text-gray-900"
        style={{ background: 'linear-gradient(135deg, var(--accent-3-base), var(--accent-3-strong))' }}
      >
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          <div className="space-y-2 text-left">
            <p className="font-bold text-gray-900">{footerCopy.brand}</p>
            {copy?.addressLine ? (
              <div className="space-y-1">
                <PortableText value={copy.addressLine} components={addressComponents} />
              </div>
            ) : (
              <p>{siteConfig.address}</p>
            )}
            <p>
              <a href={`mailto:${footerCopy.email}`} className="transition hover:text-black">
                {footerCopy.email}
              </a>
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between">
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-900 transition hover:text-black"
            >
              <Linkedin size={16} strokeWidth={1.5} />
              {footerCopy.linkedinLabel}
            </a>
            <div className="flex gap-6 text-left md:ml-auto md:justify-end md:text-right">
              <button
                type="button"
                onClick={show('legal')}
                className="inline-flex items-center p-0 text-base text-gray-900 underline decoration-2 underline-offset-4 transition hover:text-black"
                style={{ background: 'transparent', border: 'none', boxShadow: 'none', appearance: 'none', WebkitAppearance: 'none' }}
              >
                {footerCopy.legalLabel}
              </button>
              <button
                type="button"
                onClick={show('privacy')}
                className="inline-flex items-center p-0 text-base text-gray-900 underline decoration-2 underline-offset-4 transition hover:text-black"
                style={{ background: 'transparent', border: 'none', boxShadow: 'none', appearance: 'none', WebkitAppearance: 'none' }}
              >
                {footerCopy.privacyLabel}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {modal && (
        <LegalModal onClose={close}>
          <div className="space-y-4 text-base leading-relaxed text-gray-900">
            {modal === 'legal' ? legalTexts[lang].impressum : legalTexts[lang].datenschutz}
          </div>
        </LegalModal>
      )}
    </>
  )
}
