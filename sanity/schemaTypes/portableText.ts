import type { PortableTextBlock } from '@portabletext/types'
import { defineArrayMember, defineType } from 'sanity'

export const highlightPortableText = defineType({
  name: 'highlightPortableText',
  title: 'Rich Text',
  type: 'array',
  of: [
    defineArrayMember({
      name: 'block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Underline', value: 'underline' },
          {
            title: 'Highlight',
            value: 'highlight',
            icon: () => 'HL',
          },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (Rule) => Rule.uri({ allowRelative: true }),
              },
              {
                name: 'openInNewTab',
                type: 'boolean',
                title: 'In neuem Tab öffnen',
              },
            ],
          },
        ],
      },
    }),
  ],
})

export type HighlightPortableTextValue = PortableTextBlock[]
