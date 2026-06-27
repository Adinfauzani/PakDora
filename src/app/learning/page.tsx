'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, BookOpen, GraduationCap, ChevronRight, SlidersHorizontal, ArrowUpDown, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { learningCategories } from '@/data/learning'
import { api } from '@/trpc/react'
import { FadeInView, BlurCircles } from '@/components/animations'
import { VideoCard } from '@/components/learning/VideoCard'

type SortOption = 'terbaru' | 'terlama' | 'terpopuler' | 'durasi'

const sortOptions: { label: string; value: SortOption }[] = [
  { label: 'Terbaru', value: 'terbaru' },
  { label: 'Terlama', value: 'terlama' },
  { label: 'Terpopuler', value: 'terpopuler' },
  { label: 'Durasi', value: 'durasi' },
]

export default function LearningPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [sortBy, setSortBy] = useState<SortOption>('terbaru')
  const [showSort, setShowSort] = useState(false)

  const { data: videos = [], isLoading } = api.learning.all.useQuery()

  const filtered = useMemo(() => {
    let result = [...videos]

    if (activeCategory !== 'Semua') {
      result = result.filter((v) => v.category === activeCategory)
    }

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.tags?.some((t) => t.toLowerCase().includes(q)) ||
          v.category.toLowerCase().includes(q)
      )
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'terbaru':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        case 'terlama':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
        case 'terpopuler':
          return (b.viewCount ?? 0) - (a.viewCount ?? 0)
        case 'durasi': {
          const parseDur = (d: string) => {
            const [m, s] = d.split(':').map(Number)
            return (m || 0) * 60 + (s || 0)
          }
          return parseDur(b.duration) - parseDur(a.duration)
        }
        default:
          return 0
      }
    })

    return result
  }, [search, activeCategory, sortBy, videos])

  return (
    <div className="min-h-screen bg-surface dark:bg-dark-surface">
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-50/50 to-transparent pb-16 pt-24 dark:from-navy-900/20">
        <BlurCircles />
        <div className="container relative z-10">
          <FadeInView>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-navy-100 px-4 py-1.5 text-sm font-medium text-navy-700 dark:bg-navy-900/40 dark:text-navy-200">
                <GraduationCap className="size-4" />
                Learning Center
              </div>
              <h1 className="gradient-text font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Video Pembelajaran
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary dark:text-dark-text-secondary">
                Kumpulan materi kuliah, seminar, workshop, serta video edukasi yang dapat
                dipelajari kapan saja.
              </p>
            </div>
          </FadeInView>
        </div>
      </section>

      <section className="sticky top-0 z-20 border-b border-border bg-surface/80 backdrop-blur-md dark:border-dark-border dark:bg-dark-surface/80">
        <div className="container py-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="scrollbar-hide flex gap-2 overflow-x-auto">
                {learningCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      'whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                      activeCategory === cat
                        ? 'bg-navy text-white shadow-sm dark:bg-navy-700'
                        : 'border border-border bg-transparent text-text-secondary hover:border-navy-300 hover:text-navy-600 dark:border-dark-border dark:text-dark-text-secondary dark:hover:border-navy-600 dark:hover:text-navy-300'
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="relative flex-1 lg:max-w-xs">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-tertiary dark:text-dark-text-tertiary" />
                  <input
                    type="text"
                    placeholder="Cari judul, tag, atau mata kuliah..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder-text-tertiary transition-colors focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-500/20 dark:border-dark-border dark:bg-dark-surface-tertiary dark:text-dark-text-primary dark:placeholder-dark-text-tertiary dark:focus:border-navy-500"
                  />
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowSort(!showSort)}
                    className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text-secondary transition-all hover:border-navy-300 hover:text-navy-600 dark:border-dark-border dark:bg-dark-surface-tertiary dark:text-dark-text-secondary dark:hover:border-navy-600 dark:hover:text-navy-300"
                  >
                    <ArrowUpDown className="size-4" />
                    <span className="hidden sm:inline">
                      {sortOptions.find((o) => o.value === sortBy)?.label}
                    </span>
                  </button>

                  <AnimatePresence>
                    {showSort && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full z-30 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-surface shadow-elevated dark:border-dark-border dark:bg-dark-surface-card"
                      >
                        {sortOptions.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => {
                              setSortBy(opt.value)
                              setShowSort(false)
                            }}
                            className={cn(
                              'flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors',
                              sortBy === opt.value
                                ? 'bg-navy-50 text-navy-700 dark:bg-navy-900/30 dark:text-navy-200'
                                : 'text-text-secondary hover:bg-gray-50 dark:text-dark-text-secondary dark:hover:bg-dark-surface-tertiary'
                            )}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-20 pt-10">
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="size-8 animate-spin text-navy dark:text-navy-300" />
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-navy-50 dark:bg-navy-900/40">
              <BookOpen className="size-10 text-navy-500 dark:text-navy-300" />
            </div>
            <h2 className="font-display text-xl font-bold text-text-primary dark:text-dark-text-primary">
              Video tidak ditemukan
            </h2>
            <p className="mt-2 max-w-sm text-center text-text-secondary dark:text-dark-text-secondary">
              Coba ubah kata kunci pencarian atau filter kategori.
            </p>
            <button
              onClick={() => {
                setSearch('')
                setActiveCategory('Semua')
              }}
              className="btn-secondary mt-6 gap-2"
            >
              <ChevronRight className="size-4" />
              Reset Filter
            </button>
          </motion.div>
        ) : (
          <>
            <div className="mb-6 flex items-center gap-2 text-sm text-text-tertiary dark:text-dark-text-tertiary">
              <SlidersHorizontal className="size-4" />
              <span>
                Menampilkan {filtered.length} dari {videos.length} video
              </span>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((video, i) => (
                <VideoCard key={video.id} video={video} index={i} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  )
}
