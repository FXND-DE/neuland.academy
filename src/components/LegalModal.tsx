'use client'

import { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

export default function LegalModal({ onClose, children }: { onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative mx-4 w-full max-w-2xl rounded-lg bg-white p-6 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 transition hover:text-black"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}
