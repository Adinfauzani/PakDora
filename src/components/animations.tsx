'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface FadeInViewProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
  once?: boolean
}

export function FadeInView({
  children,
  className,
  delay = 0,
  duration = 0.5,
  y = 24,
  once = true,
}: FadeInViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerGridProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggerGrid({ children, className, staggerDelay = 0.08 }: StaggerGridProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function BlurCircles() {
  return (
    <div className="pointer-events-none absolute inset-0 select-none">
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-navy-50/60 blur-3xl dark:bg-navy-900/20" />
      <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-gold-50/50 blur-3xl dark:bg-gold-900/10" />
      <div className="absolute left-1/2 top-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-emerald-50/20 blur-3xl dark:bg-emerald-900/5" />
    </div>
  )
}

export function GridPattern() {
  return (
    <div
      className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
      style={{
        backgroundImage:
          'linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(90deg, #1e3a8a 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}
    />
  )
}

export function StaggerItem({ children, className, delay = 0 }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
