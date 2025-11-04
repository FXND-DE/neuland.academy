import { defineArrayMember, defineField, defineType } from 'sanity'
import { highlightPortableText } from './portableText'

export const landingPage = defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Sprache',
      type: 'string',
      options: {
        direction: 'horizontal',
        layout: 'radio',
        list: [
          { title: 'Deutsch', value: 'de' },
          { title: 'Englisch', value: 'en' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero Bereich',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Titel',
          type: highlightPortableText.name,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Untertitel',
          type: highlightPortableText.name,
        }),
        defineField({
          name: 'description',
          title: 'Beschreibung',
          type: highlightPortableText.name,
        }),
        defineField({
          name: 'ctaLabel',
          title: 'CTA Label',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'ctaHref',
          title: 'CTA Ziel',
          type: 'string',
          initialValue: '#kontakt',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'offerSection',
      title: 'Leistungsbereich',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Überschrift',
          type: highlightPortableText.name,
        }),
        defineField({
          name: 'intro',
          title: 'Einleitung',
          type: highlightPortableText.name,
        }),
        defineField({
          name: 'offers',
          title: 'Angebote',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'offerItem',
              title: 'Angebot',
              type: 'object',
              fields: [
                defineField({
                  name: 'body',
                  title: 'Text',
                  type: highlightPortableText.name,
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: 'body',
                },
                prepare(selection) {
                  return {
                    title: selection.title?.[0]?.children?.[0]?.text ?? 'Angebot',
                  }
                },
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'balanceSection',
      title: 'Balance Bereich',
      type: 'object',
      fields: [
        defineField({
          name: 'intro',
          title: 'Einleitung',
          type: highlightPortableText.name,
        }),
        defineField({
          name: 'cards',
          title: 'Karten',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'balanceCard',
              title: 'Balance Karte',
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Titel',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Beschreibung',
                  type: highlightPortableText.name,
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                },
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'aboutSections',
      title: 'About Sektionen',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'aboutSection',
          title: 'Sektion',
          type: 'object',
          fields: [
            defineField({
              name: 'id',
              title: 'Technische ID',
              type: 'slug',
              options: { source: 'title', maxLength: 96 },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Titel',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'expandLabel',
              title: 'Button-Label (Mehr)',
              type: 'string',
              description: 'z. B. „Mehr über Face Balance“',
            }),
            defineField({
              name: 'collapseLabel',
              title: 'Button-Label (Weniger)',
              type: 'string',
              description: 'z. B. „Weniger über Face Balance“',
            }),
            defineField({
              name: 'intro',
              title: 'Intro',
              type: highlightPortableText.name,
            }),
            defineField({
              name: 'details',
              title: 'Details',
              type: highlightPortableText.name,
            }),
            defineField({
              name: 'benefits',
              title: 'Benefits',
              type: 'object',
              fields: [
                defineField({ name: 'title', title: 'Titel', type: 'string' }),
                defineField({
                  name: 'items',
                  title: 'Liste',
                  type: highlightPortableText.name,
                }),
              ],
            }),
            defineField({
              name: 'offer',
              title: 'Angebot Highlight',
              type: 'object',
              fields: [
                defineField({ name: 'title', title: 'Titel', type: 'string' }),
                defineField({
                  name: 'description',
                  title: 'Beschreibung',
                  type: highlightPortableText.name,
                }),
                defineField({
                  name: 'items',
                  title: 'Liste',
                  type: highlightPortableText.name,
                }),
                defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string' }),
                defineField({
                  name: 'ctaHref',
                  title: 'CTA Ziel',
                  type: 'string',
                  initialValue: '#kontakt',
                }),
              ],
            }),
            defineField({
              name: 'image',
              title: 'Bild',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({ name: 'alt', title: 'Alternativtext', type: 'string' }),
              ],
            }),
            defineField({
              name: 'certificates',
              title: 'Zertifikate',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'certificate',
                  title: 'Zertifikat',
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    defineField({ name: 'alt', title: 'Alternativtext', type: 'string' }),
                  ],
                }),
              ],
            }),
          ],
          preview: {
            select: { title: 'title' },
          },
        }),
      ],
    }),
    defineField({
      name: 'socialSection',
      title: 'Social Feed',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Überschrift',
          type: highlightPortableText.name,
        }),
        defineField({
          name: 'subheading',
          title: 'Untertitel',
          type: highlightPortableText.name,
        }),
        defineField({
          name: 'ctaLabel',
          title: 'CTA Label',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'contactSection',
      title: 'Kontaktbereich',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Überschrift',
          type: highlightPortableText.name,
        }),
        defineField({
          name: 'text',
          title: 'Text',
          type: highlightPortableText.name,
        }),
        defineField({
          name: 'buttonLabel',
          title: 'Button Label',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        defineField({ name: 'brand', title: 'Brand', type: 'string' }),
        defineField({
          name: 'addressLine',
          title: 'Adresse',
          type: highlightPortableText.name,
        }),
        defineField({ name: 'email', title: 'E-Mail', type: 'string' }),
        defineField({
          name: 'linkedinLabel',
          title: 'LinkedIn Label',
          type: 'string',
        }),
        defineField({
          name: 'legalLabel',
          title: 'Impressum Label',
          type: 'string',
        }),
        defineField({
          name: 'privacyLabel',
          title: 'Datenschutz Label',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'language' },
    prepare({ title }) {
      return {
        title: title === 'de' ? 'Landing Page • Deutsch' : 'Landing Page • Englisch',
      }
    },
  },
})
