import { groq } from 'next-sanity'

import { sanityClient } from './sanity.client'
import type { LandingPageQueryResult } from './sanity.types'

export const landingPageQuery = groq`
  *[_type == "landingPage" && language == $lang][0]{
    language,
    hero{
      title,
      subtitle,
      description,
      ctaLabel,
      ctaHref
    },
    offerSection{
      heading,
      intro,
      offers[]{
        _key,
        body
      }
    },
    balanceSection{
      intro,
      cards[]{
        _key,
        title,
        description
      }
    },
    aboutSections[]{
      _key,
      'id': coalesce(id.current, _key),
      title,
      expandLabel,
      collapseLabel,
      intro,
      details,
      benefits{
        title,
        items
      },
      offer{
        title,
        description,
        items,
        ctaLabel,
        ctaHref
      },
      image{
        ...,
        'alt': coalesce(alt, asset->altText)
      },
      certificates[]{
        ...,
        'alt': coalesce(alt, asset->altText)
      }
    },
    socialSection{
      heading,
      subheading,
      ctaLabel
    },
    contactSection{
      heading,
      text,
      buttonLabel
    },
    footer{
      brand,
      addressLine,
      email,
      linkedinLabel,
      legalLabel,
      privacyLabel
    }
  }
`

export async function getLandingPage(lang: 'de' | 'en'): Promise<LandingPageQueryResult | null> {
  const page = await sanityClient.fetch<LandingPageQueryResult | null>(landingPageQuery, { lang })

  if (!page && lang !== 'en') {
    return sanityClient.fetch<LandingPageQueryResult | null>(landingPageQuery, { lang: 'en' })
  }

  return page
}
