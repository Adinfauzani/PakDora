'use client'

import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import { Moon, Sun, Monitor, Check } from 'lucide-react'

const themes = [
  { key: 'dark', label: 'Dark', icon: Moon },
  { key: 'light', label: 'Light', icon: Sun },
  { key: 'system', label: 'System', icon: Monitor },
] as const

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const current = themes.find((t) => t.key === theme) ?? themes[0]
  const Icon = current.icon

  if (!mounted) {
    return <div className="size-9" />
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex size-9 items-center justify-center rounded-xl text-text-secondary/60 transition-colors hover:text-text-primary dark:text-dark-text-secondary/60 dark:hover:text-dark-text-primary"
        aria-label="Switch theme"
      >
        <Icon className="size-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-36 overflow-hidden rounded-xl border border-border/50 bg-white/90 shadow-elevated backdrop-blur-lg dark:border-dark-border/30 dark:bg-dark-surface-card/90">
          {themes.map(({ key, label, icon: ItemIcon }) => (
            <button
              key={key}
              onClick={() => {
                setTheme(key)
                setOpen(false)
              }}
              className={`flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm transition-colors ${
                theme === key
                  ? 'bg-navy/10 font-medium text-navy dark:bg-navy/20 dark:text-navy-200'
                  : 'text-text-secondary hover:bg-navy/5 dark:text-dark-text-secondary dark:hover:bg-navy/10'
              }`}
            >
              <ItemIcon className="size-4 shrink-0" />
              <span className="flex-1 text-left">{label}</span>
              {theme === key && <Check className="size-3.5" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ThemeSwitch
