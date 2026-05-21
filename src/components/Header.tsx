'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Search } from 'lucide-react'
import Link from './Link'
import navigation from '@/data/navigation.json'
import profile from '@/data/profile.json'
import ThemeSwitch from './ThemeSwitch'
import MobileNav from './MobileNav'

const headerNavLinks = navigation as { title: string; href: string }[]
const profileData = profile as { name: string; initials: string }

const Header = () => {
  const pathname = usePathname()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
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
            {headerNavLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.title}
                  href={link.href}
                  className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-text-primary dark:text-dark-text-primary'
                      : 'text-text-secondary/80 hover:text-text-primary dark:text-dark-text-secondary/80 dark:hover:text-dark-text-primary'
                  }`}
                >
                  {link.title}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-navy/10 dark:bg-navy/30"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
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
