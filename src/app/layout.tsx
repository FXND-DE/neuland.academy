import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'neuland.academy',
  description: 'Ganzheitliche Programme für Face, Body und Life Balance.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-white">
      <body className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  )
}
