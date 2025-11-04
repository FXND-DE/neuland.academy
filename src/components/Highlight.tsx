import { ReactNode } from 'react'

export default function Highlight({ children }: { children: ReactNode }) {
  return <span className="font-semibold text-[#EA5A3C]">{children}</span>
}
