import type { PortableTextBlock } from '@portabletext/types'

export type PortableTextValue = PortableTextBlock[]

export interface SanityImage {
  _type: 'image'
  _key?: string
  asset: {
    _ref: string
    _type: 'reference'
  }
  crop?: {
    _type: 'sanity.imageCrop'
    bottom: number
    left: number
    right: number
    top: number
  }
  hotspot?: {
    _type: 'sanity.imageHotspot'
    height: number
    width: number
    x: number
    y: number
  }
  alt?: string
}

export interface LandingPageQueryResult {
  language: 'de' | 'en'
  hero?: {
    title?: PortableTextValue
    subtitle?: PortableTextValue
    description?: PortableTextValue
    ctaLabel?: string
    ctaHref?: string
  }
  offerSection?: {
    heading?: PortableTextValue
    intro?: PortableTextValue
    offers?: Array<{
      _key: string
      body?: PortableTextValue
    }>
  }
  balanceSection?: {
    intro?: PortableTextValue
    cards?: Array<{
      _key: string
      title?: string
      description?: PortableTextValue
    }>
  }
  aboutSections?: Array<{
    _key: string
    id?: string
    title?: string
    expandLabel?: string
    collapseLabel?: string
    intro?: PortableTextValue
    details?: PortableTextValue
    benefits?: {
      title?: string
      items?: PortableTextValue
    }
    offer?: {
      title?: string
      description?: PortableTextValue
      items?: PortableTextValue
      ctaLabel?: string
      ctaHref?: string
    }
    image?: SanityImage
    certificates?: SanityImage[]
  }>
  socialSection?: {
    heading?: PortableTextValue
    subheading?: PortableTextValue
    ctaLabel?: string
  }
  contactSection?: {
    heading?: PortableTextValue
    text?: PortableTextValue
    buttonLabel?: string
  }
  footer?: {
    brand?: string
    addressLine?: PortableTextValue
    email?: string
    linkedinLabel?: string
    legalLabel?: string
    privacyLabel?: string
  }
}
