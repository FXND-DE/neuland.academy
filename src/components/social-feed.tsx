'use client'

import { useEffect, useRef } from 'react'
import { PortableText } from '@portabletext/react'

import { mergePortableTextComponents } from '@/lib/portableTextComponents'
import { siteConfig } from '@/lib/siteConfig'
import type { LandingPageQueryResult } from '@/lib/sanity.types'

const SNAP_WIDGET_SCRIPT = 'https://snapwidget.com/js/snapwidget.js'

interface SocialFeedProps {
  copy?: LandingPageQueryResult['socialSection']
}

const headingComponents = mergePortableTextComponents({
  block: {
    normal: ({ children }) => <span>{children}</span>,
  },
})

const paragraphComponents = mergePortableTextComponents({
  block: {
    normal: ({ children }) => <p className="mx-auto max-w-3xl leading-relaxed text-gray-600">{children}</p>,
  },
})

export default function SocialFeed({ copy }: SocialFeedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (!document.querySelector(`script[src="${SNAP_WIDGET_SCRIPT}"]`)) {
      const script = document.createElement('script')
      script.src = SNAP_WIDGET_SCRIPT
      script.async = true
      document.body.appendChild(script)
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      }
    }
  }, [])

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.setAttribute('allowtransparency', 'true')
    }
  }, [])

  if (!copy) {
    return null
  }

  return (
    <section className="bg-white px-6 py-16 md:py-20">
      <div className="mx-auto max-w-5xl space-y-8 md:space-y-10">
        <div className="space-y-3 text-center">
          {copy.heading && (
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              <PortableText value={copy.heading} components={headingComponents} />
            </h2>
          )}
          {copy.subheading && <PortableText value={copy.subheading} components={paragraphComponents} />}
          {copy.ctaLabel && (
            <div className="flex justify-center pt-2">
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#EA5A3C] px-5 py-2 font-semibold text-white shadow transition-transform hover:scale-105 no-underline"
              >
                {copy.ctaLabel}
              </a>
            </div>
          )}
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-black/5 shadow-lg">
          <iframe
            ref={iframeRef}
            src={siteConfig.snapWidgetSrc}
            className="w-full"
            frameBorder="0"
            scrolling="no"
            style={{ border: 'none', overflow: 'hidden', width: '100%', minHeight: '1080px', height: '60vh' }}
            title="FaceBalance Instagram Feed"
          />
        </div>
      </div>
    </section>
  )
}
