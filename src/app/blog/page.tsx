'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, BookOpen, Tag, Calendar, Clock, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FadeInView } from '@/components/animations'
import CustomLink from '@/components/Link'
import { Badge } from '@/components/ui/badge'
import { api } from '@/trpc/react'

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTag, setActiveTag] = useState('Semua')

  const { data: posts } = api.post.all.useQuery()

  const allTags = useMemo(() => {
    if (!posts) return ['Semua']
    const tags = new Set(posts.flatMap((p) => p.tags ?? []))
    return ['Semua', ...tags]
  }, [posts])

  const filteredPosts = useMemo(() => {
    if (!posts) return []
    return posts.filter((post) => {
      if (activeTag !== 'Semua' && !(post.tags ?? []).includes(activeTag)) return false
      if (!searchQuery) return true
      const q = searchQuery.toLowerCase()
      return (
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        (post.tags ?? []).some((t) => t.toLowerCase().includes(q))
      )
    })
  }, [posts, searchQuery, activeTag])

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-surface via-navy-50/20 to-surface pb-16 pt-24 dark:border-dark-border dark:from-dark-surface dark:via-navy-950/20 dark:to-dark-surface">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gold-200/20 blur-3xl dark:bg-gold-500/5" />
        <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-navy-200/20 blur-3xl dark:bg-navy-500/5" />

        <FadeInView>
          <div className="container relative z-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-50 dark:bg-navy-900/30">
              <BookOpen className="h-7 w-7 text-navy dark:text-navy-300" />
            </div>
            <h1 className="gradient-text font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Blog
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary dark:text-dark-text-secondary">
              Artikel, tutorial, dan pemikiran seputar sains data, kecerdasan buatan,
              pendidikan vokasi, dan pengembangan diri.
            </p>
          </div>
        </FadeInView>
      </section>

      <section className="sticky top-0 z-20 border-b border-border bg-surface/80 backdrop-blur-md dark:border-dark-border dark:bg-dark-surface/80">
        <div className="container py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary dark:text-dark-text-tertiary" />
              <input
                type="text"
                placeholder="Cari artikel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder-text-tertiary transition-colors focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20 dark:border-dark-border dark:bg-dark-surface-tertiary dark:text-dark-text-primary dark:placeholder-dark-text-tertiary dark:focus:border-navy-500"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
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

      <section className="container py-12">
        {filteredPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <BookOpen className="h-16 w-16 text-text-tertiary dark:text-dark-text-tertiary" />
            <h3 className="mt-4 font-display text-xl font-semibold text-text-primary dark:text-dark-text-primary">
              {searchQuery ? 'Artikel tidak ditemukan' : 'Belum ada artikel'}
            </h3>
            <p className="mt-2 text-text-secondary dark:text-dark-text-secondary">
              {searchQuery
                ? 'Coba gunakan kata kunci lain.'
                : 'Artikel akan muncul di sini setelah dipublikasikan.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <CustomLink
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-white/50 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-hover dark:border-dark-border/30 dark:bg-dark-surface-card/50"
                >
                  <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-navy-50/80 to-gold-50/80 dark:from-navy-900/30 dark:to-gold-900/10">
                    <BookOpen className="h-12 w-12 text-navy-300/50 dark:text-navy-600/50" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-3 text-xs text-text-tertiary dark:text-dark-text-tertiary">
                      {post.createdAt && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(post.createdAt).toLocaleDateString('id-ID', {
                            year: 'numeric', month: 'long', day: 'numeric',
                          })}
                        </span>
                      )}
                      {post.readingTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {post.readingTime} menit
                        </span>
                      )}
                    </div>

                    <h2 className="mt-3 font-display text-lg font-bold leading-snug text-text-primary transition-colors group-hover:text-navy dark:text-dark-text-primary dark:group-hover:text-navy-300">
                      {post.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
                      {post.summary}
                    </p>

                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="navy">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CustomLink>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
