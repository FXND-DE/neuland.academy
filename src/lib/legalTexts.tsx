import { ReactNode } from 'react'
import { siteConfig } from './siteConfig'

export const legalTexts: Record<'de' | 'en', { impressum: ReactNode; datenschutz: ReactNode }> = {
  de: {
    impressum: (
      <>
        <p>
          Shirin Neuland<br />
          {siteConfig.name}
          <br />
          Beethovenstraße 25
          <br />
          60325 Frankfurt am Main
        </p>

        <p>
          <strong>Kontakt:</strong>
          <br />
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
        </p>

        <p className="text-sm text-gray-600 italic">
          Verantwortlich im Sinne des § 55 Abs. 2 RStV: Felix Neuland
        </p>
      </>
    ),
    datenschutz: (
      <>
        <p>
          Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Personenbezogene Daten werden vertraulich und
          entsprechend der gesetzlichen Datenschutzvorschriften behandelt.
        </p>
        <p>
          <strong>Hosting:</strong> Unsere Website wird bei <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133,
          Covina, CA 91723, USA gehostet. Dabei werden Daten wie Ihre IP-Adresse verarbeitet. Die Datenverarbeitung
          erfolgt auf Grundlage der EU-Standardvertragsklauseln. Weitere Infos finden Sie unter:{' '}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
            https://vercel.com/legal/privacy-policy
          </a>
        </p>
        <p>
          <strong>Zugriffsdaten:</strong> Beim Besuch dieser Website werden automatisch Informationen wie IP-Adresse,
          Browsertyp, Datum und Uhrzeit des Zugriffs erhoben. Diese Daten dienen ausschließlich der technischen Sicherheit
          und Optimierung der Website.
        </p>
        <p>
          <strong>Google Fonts:</strong> Diese Website verwendet Schriftarten von Google Fonts, die <strong>lokal</strong>
          eingebunden sind. Es erfolgt keine Verbindung zu Google-Servern.
        </p>
        <p>
          <strong>Rechte der betroffenen Personen:</strong> Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
          Einschränkung der Verarbeitung sowie Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten. Zudem
          haben Sie das Recht auf Beschwerde bei der zuständigen Datenschutzaufsichtsbehörde.
        </p>
        <p>
          Bei Fragen zum Datenschutz wenden Sie sich bitte an:{' '}
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
        </p>
      </>
    ),
  },
  en: {
    impressum: (
      <>
        <p>
          Shirin Neuland
          <br />
          {siteConfig.name}
          <br />
          Beethovenstraße 25
          <br />
          60325 Frankfurt am Main
          <br />
          Germany
        </p>

        <p>
          <strong>Contact:</strong>
          <br />
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
        </p>

        <p className="text-sm text-gray-600 italic">
          Responsible for content according to § 55 paragraph 2 RStV: Felix Neuland
        </p>
      </>
    ),
    datenschutz: (
      <>
        <p>
          We take the protection of your personal data very seriously. Personal data is treated confidentially and in
          accordance with applicable data protection laws.
        </p>
        <p>
          <strong>Hosting:</strong> This website is hosted by <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133,
          Covina, CA 91723, USA. Data such as your IP address may be processed. Data transfers are based on the EU
          Standard Contractual Clauses. More info:{' '}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
            https://vercel.com/legal/privacy-policy
          </a>
        </p>
        <p>
          <strong>Access data:</strong> When visiting this website, information such as IP address, browser type, and
          access time is automatically collected. This data is used solely for technical security and website
          optimization.
        </p>
        <p>
          <strong>Google Fonts:</strong> This website uses fonts from Google Fonts that are <strong>self-hosted</strong>.
          No connection to Google servers is established.
        </p>
        <p>
          <strong>Your rights:</strong> You have the right to request information, correction, deletion, restriction of
          processing, and objection to the processing of your personal data. You also have the right to file a complaint
          with a data protection authority.
        </p>
        <p>
          For any questions regarding data protection, please contact:{' '}
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
        </p>
      </>
    ),
  },
}
