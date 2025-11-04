import createImageUrlBuilder from '@sanity/image-url'

import type { SanityImage } from './sanity.types'
import { dataset, projectId } from '../../sanity/env'

const imageBuilder = createImageUrlBuilder({
  projectId,
  dataset,
})

export const urlForImage = (source: SanityImage | null | undefined) => {
  if (!source?.asset?._ref) {
    return null
  }

  return imageBuilder.image(source)
}
