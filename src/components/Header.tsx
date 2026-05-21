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
  const prevScroll = useRef(0)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const diff = latest - prevScroll.current
    if (diff > 0 && latest > 100) {
      setHidden(true)
    } else if (diff < 0) {
      setHidden(false)
    }
    prevScroll.current = latest
  })

  return (
    <motion.header
      className="sticky top-4 z-50 mx-auto w-full max-w-6xl px-4"
      animate={{ y: hidden ? -120 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <nav className="rounded-2xl border border-border bg-surface/80 backdrop-blur-xl dark:border-dark-border dark:bg-dark-surface/80">
        <div className="flex h-14 items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-xl bg-navy text-sm font-bold text-white">
              {profileData.initials}
            </span>
            <span className="hidden text-sm font-semibold text-text-primary dark:text-dark-text-primary sm:block">
              {profileData.name}
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {headerNavLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.title}
                  href={link.href}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-text-primary dark:text-dark-text-primary'
                      : 'text-text-secondary hover:text-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary'
                  }`}
                >
                  {link.title}
                  {isActive && (
                    <motion.span
                      layoutId="active-nav"
                      className="absolute inset-0 rounded-lg bg-navy/10 dark:bg-navy/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-1">
            <button className="btn-ghost size-9" aria-label="Search">
              <Search className="size-4" />
            </button>
            <ThemeSwitch />
            <Link
              href="/cv.pdf"
              className="btn-secondary hidden h-9 rounded-xl px-4 text-sm sm:flex"
            >
              Download CV
            </Link>
            <MobileNav />
          </div>
        </div>
      </nav>
    </motion.header>
  )
}

export default Header
