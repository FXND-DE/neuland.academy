import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { CheckCircle, PersonStanding, Smile, Sparkles } from 'lucide-react'

import About from '@/components/about'
import Footer from '@/components/footer'
import Header from '@/components/header'
import SocialFeed from '@/components/social-feed'
import { mergePortableTextComponents } from '@/lib/portableTextComponents'
import { getLandingPage } from '@/lib/sanity.queries'
import { siteConfig } from '@/lib/siteConfig'

const heroTitleComponents = mergePortableTextComponents({
  block: {
    normal: ({ children }) => <>{children}</>,
    h2: ({ children }) => <span>{children}</span>,
    h3: ({ children }) => <span>{children}</span>,
  },
})

const heroSubtitleComponents = mergePortableTextComponents({
  block: {
    normal: ({ children }) => <span>{children}</span>,
    h2: ({ children }) => <span>{children}</span>,
    h3: ({ children }) => <span>{children}</span>,
  },
})

const heroDescriptionComponents = mergePortableTextComponents({
  block: {
    normal: ({ children }) => <span className="text-lg leading-relaxed text-gray-700">{children}</span>,
  },
})

const offerHeadingComponents = mergePortableTextComponents({
  block: {
    normal: ({ children }) => <span>{children}</span>,
  },
})

const offerIntroComponents = mergePortableTextComponents({
  block: {
    normal: ({ children }) => <span>{children}</span>,
  },
})

const offerItemComponents = mergePortableTextComponents({
  block: {
    normal: ({ children }) => <span>{children}</span>,
  },
})

const balanceIntroComponents = mergePortableTextComponents({
  block: {
    normal: ({ children }) => <span>{children}</span>,
  },
})

const balanceCardComponents = mergePortableTextComponents({
  block: {
    normal: ({ children }) => <span>{children}</span>,
  },
})

const contactHeadingComponents = mergePortableTextComponents({
  block: {
    normal: ({ children }) => <span>{children}</span>,
  },
})

const contactTextComponents = mergePortableTextComponents({
  block: {
    normal: ({ children }) => <span>{children}</span>,
  },
})

const iconByIndex = [Smile, PersonStanding, Sparkles]

export default async function LandingPage({ params }: { params: Promise<{ lang?: string }> }) {
  const { lang } = await params
  const requestedLang = lang === 'de' || lang === 'en' ? lang : 'en'
  const content = await getLandingPage(requestedLang)

  if (!content?.hero) {
    notFound()
  }

  const { hero, offerSection, balanceSection, aboutSections, socialSection, contactSection, footer } = content
  const ctaHref = hero?.ctaHref ?? '#kontakt'

  return (
    <main className="min-h-screen font-sans bg-white text-gray-900">
      <Header lang={requestedLang} />

      {/* Logo + Header Section */}
      <section
        className="relative flex min-h-[60vh] w-full items-end overflow-hidden text-center"
        style={{
          backgroundImage: "url('/neuland-academy_Back.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-white/85 via-white/20 to-white/0" />
        <div className="relative z-10 flex w-full flex-col items-center justify-end gap-6 px-6 pb-20 pt-56 md:gap-4 md:pb-12 md:pt-48">
          <div className="relative aspect-[3/1] w-60 drop-shadow-lg sm:w-80 md:w-[460px] lg:w-[580px] xl:w-[660px]">
            <Image src="/logo.png" alt="neuland.academy Logo" fill className="object-contain" priority />
          </div>
          {hero?.title && (
            <h1 className="max-w-2xl text-xl font-semibold tracking-tight text-black drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:text-2xl md:text-3xl">
              <PortableText value={hero.title} components={heroTitleComponents} />
            </h1>
          )}
        </div>
      </section>

      {/* Hero Section */}
      <section
        className="flex flex-col items-center justify-center px-6 py-28 text-center md:py-32"
        style={{ background: 'var(--accent-2-gradient)' }}
      >
        {hero?.subtitle && (
          <h2 className="mx-auto mb-6 max-w-3xl text-3xl font-bold leading-snug md:text-5xl">
            <PortableText value={hero.subtitle} components={heroSubtitleComponents} />
          </h2>
        )}
        {hero?.description && (
          <p className="mx-auto mb-10 max-w-2xl">
            <PortableText value={hero.description} components={heroDescriptionComponents} />
          </p>
        )}
        {hero?.ctaLabel && (
          <a
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#EA5A3C] px-6 py-3 font-semibold text-white shadow transition-transform hover:scale-105 no-underline"
          >
            {hero.ctaLabel}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        )}
      </section>

      {/* Leistungen / Offerings */}
      {(offerSection?.heading || offerSection?.intro || (offerSection?.offers?.length ?? 0) > 0) && (
        <section className="bg-white px-6 py-16 text-center md:py-20">
          {offerSection.heading && (
            <h2 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl">
              <PortableText value={offerSection.heading} components={offerHeadingComponents} />
            </h2>
          )}

          {offerSection.intro && (
            <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-600 md:mb-10">
              <PortableText value={offerSection.intro} components={offerIntroComponents} />
            </p>
          )}

          {offerSection.offers && offerSection.offers.length > 0 && (
            <ul className="mx-auto grid max-w-4xl grid-cols-1 gap-x-8 gap-y-5 text-left md:grid-cols-2 md:gap-y-6">
              {offerSection.offers.map((offer, index) => (
                <li key={offer._key ?? index} className="flex items-start gap-4">
                  <CheckCircle className="mt-1 flex-shrink-0" size={32} style={{ color: '#00cb64' }} />
                  <span className="text-lg leading-relaxed">
                    {offer.body && <PortableText value={offer.body} components={offerItemComponents} />}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* Balance */}
      {(balanceSection?.intro || (balanceSection?.cards?.length ?? 0) > 0) && (
        <section className="relative bg-white px-6 py-18 md:px-12 md:py-24 lg:px-20">
          <div className="mx-auto max-w-5xl space-y-10 md:space-y-14">
            {balanceSection.intro && (
              <p className="text-center text-xl font-semibold text-gray-900 md:text-2xl">
                <PortableText value={balanceSection.intro} components={balanceIntroComponents} />
              </p>
            )}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {balanceSection.cards?.map((card, idx) => {
                const accentSlot = ((idx % 3) + 1) as 1 | 2 | 3
                const Icon = iconByIndex[idx] ?? Sparkles

                return (
                  <div
                    key={card._key ?? card.title ?? idx}
                    className="rounded-3xl px-6 py-8 text-left shadow-lg transition-transform hover:-translate-y-1"
                    style={{
                      background: `linear-gradient(165deg, var(--accent-${accentSlot}-base) 0%, var(--accent-${accentSlot}-strong) 90%)`,
                      boxShadow: `0 25px 40px -20px var(--accent-${accentSlot}-base)`,
                    }}
                  >
                    <div className="mb-4 inline-flex items-center justify-center rounded-full bg-white/90 p-3 shadow-inner">
                      <Icon className="h-6 w-6 text-[#EA5A3C]" />
                    </div>
                    {card.title && (
                      <h3 className="mb-3 text-xl font-semibold uppercase tracking-wide text-gray-900">{card.title}</h3>
                    )}
                    {card.description && (
                      <p className="leading-relaxed text-gray-700">
                        <PortableText value={card.description} components={balanceCardComponents} />
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <About sections={aboutSections} />

      <SocialFeed copy={socialSection} />

      {(contactSection?.heading || contactSection?.text || contactSection?.buttonLabel) && (
        <section id="kontakt" className="px-6 py-24" style={{ backgroundColor: 'var(--accent-3-soft)' }}>
          <div className="mx-auto max-w-xl space-y-6 text-center">
            {contactSection.heading && (
              <h2 className="text-3xl font-bold">
                <PortableText value={contactSection.heading} components={contactHeadingComponents} />
              </h2>
            )}
            {contactSection.text && (
              <p className="text-lg leading-relaxed">
                <PortableText value={contactSection.text} components={contactTextComponents} />
              </p>
            )}
            {contactSection.buttonLabel && (
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="inline-block rounded-2xl bg-[#EA5A3C] px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
              >
                {contactSection.buttonLabel}
              </a>
            )}
          </div>
        </section>
      )}

      <Footer lang={requestedLang} copy={footer} />
    </main>
  )
}
