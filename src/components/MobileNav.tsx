'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Menu, Home, User, FileText, FolderGit2, BookOpen, Compass, MessageSquare, Mail } from 'lucide-react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import ThemeSwitch from './ThemeSwitch'

const iconMap: Record<string, typeof Home> = {
  Home,
  About: User,
  Blog: FileText,
  Projects: FolderGit2,
  Materi: BookOpen,
  Uses: Compass,
  Guestbook: MessageSquare,
  Contact: Mail,
}

const MobileNav = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="btn-ghost size-9 lg:hidden"
      >
        <Menu className="size-5" />
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              aria-hidden="true"
              onClick={() => setOpen(false)}
            />

            <div className="fixed inset-0 flex justify-end">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="flex w-full max-w-sm flex-col bg-surface dark:bg-dark-surface"
              >
                <div className="flex items-center justify-between border-b border-border px-6 py-4 dark:border-dark-border">
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2"
                  >
                    <span className="flex size-8 items-center justify-center rounded-lg bg-navy text-sm font-bold text-white">
                      DB
                    </span>
                  </Link>
                  <div className="flex items-center gap-2">
                    <ThemeSwitch />
                    <button
                      aria-label="Close menu"
                      onClick={() => setOpen(false)}
                      className="btn-ghost size-9"
                    >
                      <X className="size-5" />
                    </button>
                  </div>
                </div>

                <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
                  {headerNavLinks.map((link) => {
                    const Icon = iconMap[link.title] || Home
                    return (
                      <Link
                        key={link.title}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-text-secondary transition-colors hover:bg-surface-secondary hover:text-text-primary dark:text-dark-text-secondary dark:hover:bg-dark-surface-secondary dark:hover:text-dark-text-primary"
                      >
                        <Icon className="size-5 shrink-0" />
                        {link.title}
                      </Link>
                    )
                  })}
                </nav>

                <div className="border-t border-border px-6 py-4 text-center text-xs text-text-tertiary dark:border-dark-border dark:text-dark-text-tertiary">
                  &copy; {new Date().getFullYear()} Dora Bernandismen
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default MobileNav
