import type { PortableTextComponents } from '@portabletext/react'
import Highlight from '@/components/Highlight'

export const basePortableTextComponents: PortableTextComponents = {
  marks: {
    highlight: ({ children }) => <Highlight>{children}</Highlight>,
    link: ({ children, value }) => {
      const href = (value as { href?: string } | undefined)?.href || '#'
      const openInNewTab = Boolean((value as { openInNewTab?: boolean } | undefined)?.openInNewTab)

      const rel = openInNewTab ? 'noopener noreferrer' : undefined
      const target = openInNewTab ? '_blank' : undefined

      return (
        <a href={href} rel={rel} target={target} className="underline decoration-2 underline-offset-4">
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }) => <ul className="space-y-2">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-2">{children}</li>,
  },
  block: {
    normal: ({ children }) => <p className="leading-relaxed">{children}</p>,
    h2: ({ children }) => <h2 className="text-2xl font-semibold">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-gray-300 pl-4 italic text-gray-700">{children}</blockquote>
    ),
  },
}

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const mergeSection = <T,>(base: T | undefined, override: T | undefined): T | undefined => {
  if (isPlainObject(base) || isPlainObject(override)) {
    return {
      ...(isPlainObject(base) ? base : {}),
      ...(isPlainObject(override) ? override : {}),
    } as T
  }

  return override ?? base
}

export const mergePortableTextComponents = (overrides: PortableTextComponents): PortableTextComponents => ({
  marks: mergeSection(basePortableTextComponents.marks, overrides.marks),
  list: mergeSection(basePortableTextComponents.list, overrides.list),
  listItem: mergeSection(basePortableTextComponents.listItem, overrides.listItem),
  block: mergeSection(basePortableTextComponents.block, overrides.block),
  types: mergeSection(basePortableTextComponents.types, overrides.types),
})
