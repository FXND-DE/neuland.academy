'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'

import { mergePortableTextComponents } from '@/lib/portableTextComponents'
import { urlForImage } from '@/lib/sanity.image'
import type { LandingPageQueryResult } from '@/lib/sanity.types'

type AboutSection = NonNullable<LandingPageQueryResult['aboutSections']>[number]

interface AboutProps {
  sections?: AboutSection[]
}

const benefitComponents = mergePortableTextComponents({
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 leading-relaxed text-gray-700">
        <Check className="mt-1 h-5 w-5 shrink-0" style={{ color: '#00cb64' }} />
        <span>{children}</span>
      </li>
    ),
  },
})

const detailComponents = mergePortableTextComponents({
  block: {
    normal: ({ children }) => <p className="leading-relaxed text-gray-700">{children}</p>,
  },
})

export default function About({ sections = [] }: AboutProps) {
  const [openSection, setOpenSection] = useState<string | null>(null)

  const memoizedSections = useMemo(() => sections.filter(Boolean), [sections])

  const toggle = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : id))
  }

  if (memoizedSections.length === 0) {
    return null
  }

  return (
    <section className="mx-auto max-w-5xl space-y-10 px-6 py-14 md:py-18">
      {memoizedSections.map((section, index) => {
        const sectionId = section.id ?? section._key
        const isOpen = openSection === sectionId
        const firstSectionId = memoizedSections[0] ? memoizedSections[0].id ?? memoizedSections[0]._key : null
        const isFirst = firstSectionId === sectionId
        const accentSlot = ((index % 3) + 1) as 1 | 2 | 3
        const accentSoftVar = `var(--accent-${accentSlot}-soft)`
        const accentBaseVar = `var(--accent-${accentSlot}-base)`
        const accentStrongVar = `var(--accent-${accentSlot}-strong)`
        const image = urlForImage(section.image)?.width(640).height(800).fit('crop').url()

        return (
          <article
            key={sectionId}
            className="rounded-3xl border bg-white px-6 py-8 shadow-sm sm:px-10 sm:py-12"
            style={{ borderColor: accentSoftVar }}
          >
            <div className="flex flex-col gap-8 md:flex-row md:items-start">
              {image && (
                <div className="md:w-1/3">
                  <div className="space-y-4">
                    <div
                      className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-2xl md:mx-0 md:max-w-none"
                      style={{ backgroundColor: accentSoftVar }}
                    >
                      <Image
                        src={image}
                        alt={section.image?.alt ?? section.title ?? 'About section image'}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 280px, 80vw"
                        priority={isFirst}
                      />
                    </div>

                    {section.certificates && section.certificates.length > 0 && (
                      <div className={isOpen ? 'space-y-4' : 'hidden'}>
                        {section.certificates.map((certificate) => {
                          const certificateUrl = urlForImage(certificate)?.width(480).fit('max').url()
                          if (!certificateUrl) {
                            return null
                          }

                          return (
                            <div
                              key={certificate._key ?? certificate.asset?._ref}
                              className="relative mx-auto overflow-hidden rounded-2xl border bg-white/90 md:mx-0"
                              style={{ borderColor: accentSoftVar }}
                            >
                              <div className="relative h-0 w-full pb-[70%]">
                                <Image
                                  src={certificateUrl}
                                  alt={certificate.alt ?? 'Zertifikat'}
                                  className="object-contain"
                                  fill
                                  sizes="(min-width: 768px) 280px, 80vw"
                                />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex-1 space-y-6 text-left">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
                  {section.intro && <PortableText value={section.intro} components={detailComponents} />}
                </div>

                <button
                  onClick={() => toggle(sectionId)}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border-0 bg-transparent px-5 py-3 text-base font-semibold text-slate-900 shadow-none outline-none transition-colors md:text-lg"
                  style={{
                    backgroundColor: accentBaseVar,
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    border: 'none',
                    boxShadow: 'none',
                  }}
                >
                  {isOpen ? section.collapseLabel ?? 'Weniger anzeigen' : section.expandLabel ?? 'Mehr anzeigen'}
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {isOpen && (
                  <div className="space-y-6">
                    {section.details && <PortableText value={section.details} components={detailComponents} />}

                    {section.benefits?.title && (
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-gray-900">{section.benefits.title}</h4>
                        {section.benefits.items && (
                          <PortableText value={section.benefits.items} components={benefitComponents} />
                        )}
                      </div>
                    )}

                    {section.offer?.title && (
                      <div className="space-y-4 rounded-2xl bg-[#EA5A3C] p-6 text-white">
                        <div className="space-y-2">
                          <h4 className="text-xl font-semibold">{section.offer.title}</h4>
                          {section.offer.description && (
                            <PortableText value={section.offer.description} components={detailComponents} />
                          )}
                        </div>

                        {section.offer.items && (
                          <PortableText value={section.offer.items} components={benefitComponents} />
                        )}

                        {section.offer.ctaLabel && (
                          <a
                            href={section.offer.ctaHref ?? '#kontakt'}
                            className="inline-flex w-max items-center gap-2 rounded-xl bg-white px-5 py-2 font-semibold text-[#EA5A3C] transition-transform hover:scale-105 no-underline"
                          >
                            {section.offer.ctaLabel}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </article>
        )
      })}
    </section>
  )
}
