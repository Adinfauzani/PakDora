'use client'

import { Toaster as SonnerToaster } from 'sonner'

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          color: 'var(--color-text-primary)',
          borderRadius: '12px',
        },
        className: 'dark:bg-dark-surface dark:border-dark-border dark:text-dark-text-primary',
      }}
    />
  )
}
