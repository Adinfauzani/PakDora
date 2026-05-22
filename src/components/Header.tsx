'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ChevronDown, Search } from 'lucide-react'
import Link from './Link'
import navigation from '@/data/navigation.json'
import profile from '@/data/profile.json'
import ThemeSwitch from './ThemeSwitch'
import MobileNav from './MobileNav'
import type { NavItem } from '@/types/data'

const navItems = navigation as NavItem[]
const profileData = profile as { name: string; initials: string }

const Header = () => {
  const pathname = usePathname()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const prevScroll = useRef(0)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const diff = latest - prevScroll.current
    if (diff > 0 && latest > 80) {
      setHidden(true)
    } else if (diff < 0) {
      setHidden(false)
    }
    setScrolled(latest > 20)
    prevScroll.current = latest
  })

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto max-w-6xl px-4 py-3">
        <nav
          className={`mx-auto flex h-12 items-center justify-between rounded-full border px-4 transition-all duration-300 ${
            scrolled
              ? 'border-dark-border/40 bg-dark-surface-card/70 backdrop-blur-xl shadow-soft dark:border-dark-border/30 dark:bg-dark-surface-card/80'
              : 'border-transparent bg-transparent'
          }`}
        >
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-full bg-navy text-xs font-bold text-white tracking-tight">
              {profileData.initials}
            </span>
            <span className="hidden text-sm font-semibold text-text-primary dark:text-dark-text-primary sm:block">
              {profileData.name}
            </span>
          </Link>

          <div className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => {
              if ('href' in item) {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-text-primary dark:text-dark-text-primary'
                        : 'text-text-secondary/80 hover:text-text-primary dark:text-dark-text-secondary/80 dark:hover:text-dark-text-primary'
                    }`}
                  >
                    {item.title}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-navy/10 dark:bg-navy/30"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              }

              const isOpen = openDropdown === item.title
              const isChildActive = item.children.some((c) => pathname === c.href)

              return (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.title)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    onClick={() => setOpenDropdown(isOpen ? null : item.title)}
                    className={`relative flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                      isChildActive
                        ? 'text-text-primary dark:text-dark-text-primary'
                        : 'text-text-secondary/80 hover:text-text-primary dark:text-dark-text-secondary/80 dark:hover:text-dark-text-primary'
                    }`}
                  >
                    {item.title}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    {isChildActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-navy/10 dark:bg-navy/30"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>

                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-1/2 top-full mt-2 w-40 -translate-x-1/2 rounded-xl border border-border/50 bg-white/90 p-1.5 shadow-elevated backdrop-blur-lg dark:border-dark-border/30 dark:bg-dark-surface-card/90"
                    >
                      {item.children.map((child) => {
                        const isChildActive = pathname === child.href
                        return (
                          <Link
                            key={child.title}
                            href={child.href}
                            onClick={() => setOpenDropdown(null)}
                            className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                              isChildActive
                                ? 'bg-navy/10 font-medium text-navy dark:bg-navy/20 dark:text-navy-200'
                                : 'text-text-secondary hover:bg-navy/5 dark:text-dark-text-secondary dark:hover:bg-navy/10'
                            }`}
                          >
                            {child.title}
                          </Link>
                        )
                      })}
                    </motion.div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="flex items-center gap-1">
            <button
              className="flex size-8 items-center justify-center rounded-full text-text-secondary/60 transition-colors hover:text-text-primary dark:text-dark-text-secondary/60 dark:hover:text-dark-text-primary"
              aria-label="Search"
            >
              <Search className="size-3.5" />
            </button>
            <ThemeSwitch />
            <Link
              href="/cv.pdf"
              className="hidden h-8 items-center rounded-full bg-navy px-4 text-xs font-medium text-white transition-all hover:bg-navy-700 sm:flex active:scale-[0.97]"
            >
              Download CV
            </Link>
            <MobileNav />
          </div>
        </nav>
      </div>
    </motion.header>
  )
}

export default Header
