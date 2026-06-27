'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, FileText, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LearningVideo } from '@/types/learning'

const categoryColors: Record<string, string> = {
  'Machine Learning': 'badge-navy',
  'Data Science': 'badge-emerald',
  'Artificial Intelligence': 'badge-gold',
  Statistik: 'badge-gray',
  Workshop: 'badge-navy',
  Seminar: 'badge-gold',
  'Public Lecture': 'badge-emerald',
}

const levelColors: Record<string, string> = {
  Pemula: 'text-emerald-600 dark:text-emerald-400',
  Menengah: 'text-gold-600 dark:text-gold-400',
  Lanjutan: 'text-navy-600 dark:text-navy-300',
}

export function VideoCard({ video, index = 0 }: { video: LearningVideo; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/learning/${video.slug}`}
        className="group block"
      >
        <article
          className={cn(
            'relative overflow-hidden rounded-2xl border border-border/50 bg-white/40',
            'backdrop-blur-sm transition-all duration-300',
            'hover:-translate-y-1 hover:shadow-hover',
            'dark:border-dark-border/50 dark:bg-dark-surface-card/60'
          )}
        >
          <div className="relative aspect-video overflow-hidden bg-navy-100 dark:bg-navy-900/40">
            <img
              src={video.thumbnail}
              alt={`Thumbnail ${video.title}`}
              className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
              <div className="flex size-14 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                <Play className="ml-0.5 size-6 text-navy-800" />
              </div>
            </div>
            <div className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
              {video.duration}
            </div>
          </div>

          <div className="space-y-3 p-5">
            <div className="flex items-center gap-2">
              <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium', categoryColors[video.category] || 'badge-gray')}>
                {video.category}
              </span>
              <span className={cn('text-[11px] font-medium', levelColors[video.level])}>
                {video.level}
              </span>
            </div>

            <h3 className="font-display text-base font-bold leading-snug text-text-primary transition-colors group-hover:text-navy-600 dark:text-dark-text-primary dark:group-hover:text-navy-300">
              {video.title}
            </h3>

            <p className="line-clamp-2 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
              {video.description}
            </p>

            <div className="flex items-center gap-4 border-t border-border/50 pt-3 text-xs text-text-tertiary dark:border-dark-border/50 dark:text-dark-text-tertiary">
              <span className="flex items-center gap-1">
                <Calendar className="size-3.5" />
                {new Date(video.publishedAt).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
              {video.resources.length > 0 && (
                <span className="flex items-center gap-1">
                  <FileText className="size-3.5" />
                  {video.resources.length} resource
                </span>
              )}
              {video.viewCount && (
                <span className="flex items-center gap-1">
                  <Play className="size-3.5" />
                  {video.viewCount >= 1000
                    ? `${(video.viewCount / 1000).toFixed(1)}k`
                    : video.viewCount}
                </span>
              )}
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}
