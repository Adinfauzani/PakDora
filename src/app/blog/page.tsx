'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, BookOpen, RefreshCw, Tag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FadeInView } from '@/components/animations'

const tags = ['Semua', 'Pemrograman', 'Teknologi', 'Pendidikan', 'Penelitian', 'Vokasi']

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTag, setActiveTag] = useState('Semua')

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-surface via-navy-50/20 to-surface pb-16 pt-24 dark:border-dark-border dark:from-dark-surface dark:via-navy-950/20 dark:to-dark-surface">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gold-200/20 blur-3xl dark:bg-gold-500/5" />
        <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-navy-200/20 blur-3xl dark:bg-navy-500/5" />

        <FadeInView>
          <div className="container relative z-10 text-center">
            <h1 className="gradient-text font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Blog
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary dark:text-dark-text-secondary">
              Artikel, tutorial, dan pemikiran seputar teknologi informasi, pendidikan vokasi,
              dan pengembangan diri.
            </p>
          </div>
        </FadeInView>
      </section>

      {/* Search & Filters */}
      <section className="border-b border-border bg-surface/80 backdrop-blur-sm dark:border-dark-border dark:bg-dark-surface/80">
        <div className="container py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary dark:text-dark-text-tertiary" />
              <input
                type="text"
                placeholder="Cari artikel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder-text-tertiary transition-colors focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-500/20 dark:border-dark-border dark:bg-dark-surface-tertiary dark:text-dark-text-primary dark:placeholder-dark-text-tertiary dark:focus:border-navy-500"
              />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200',
                    activeTag === tag
                      ? 'bg-navy text-white shadow-sm'
                      : 'border border-border bg-transparent text-text-secondary hover:border-navy-300 hover:text-navy-600 dark:border-dark-border dark:text-dark-text-secondary dark:hover:border-navy-600 dark:hover:text-navy-300'
                  )}
                >
                  <Tag className="h-3.5 w-3.5" />
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container py-16">
        <FadeInView>
          <motion.div
            className="flex flex-col items-center justify-center py-20 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-navy-50 dark:bg-navy-900/40">
              <BookOpen className="h-10 w-10 text-navy-500 dark:text-navy-300" />
            </div>
            <h2 className="font-display text-2xl font-bold text-text-primary dark:text-dark-text-primary">
              Belum ada artikel
            </h2>
            <p className="mt-2 max-w-md text-text-secondary dark:text-dark-text-secondary">
              Artikel akan segera hadir. Pantau terus halaman ini untuk mendapatkan
              informasi dan tutorial terbaru.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary mt-8 gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Cek Lagi Nanti
            </button>
          </motion.div>
        </FadeInView>
      </section>
    </div>
  )
}
