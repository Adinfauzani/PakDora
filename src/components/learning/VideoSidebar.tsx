'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import type { LearningVideo } from '@/types/learning'

export function VideoSidebar({ videos }: { videos: LearningVideo[] }) {
  if (videos.length === 0) return null

  return (
    <aside className="space-y-4">
      <h3 className="font-display text-sm font-bold uppercase tracking-wider text-text-tertiary dark:text-dark-text-tertiary">
        Video Lainnya
      </h3>

      <div className="space-y-3">
        {videos.map((video, i) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Link
              href={`/learning/${video.slug}`}
              className="group flex gap-3 rounded-xl p-2 transition-colors hover:bg-gray-50 dark:hover:bg-dark-surface-tertiary/60"
            >
              <div className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-lg bg-navy-100 dark:bg-navy-900/40">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/20">
                  <Play className="size-5 text-white opacity-0 transition-all duration-300 group-hover:opacity-100" />
                </div>
                <div className="absolute bottom-1 right-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white">
                  {video.duration}
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="line-clamp-2 text-sm font-semibold leading-snug text-text-primary transition-colors group-hover:text-navy-600 dark:text-dark-text-primary dark:group-hover:text-navy-300">
                  {video.title}
                </h4>
                <p className="mt-1 text-xs text-text-tertiary dark:text-dark-text-tertiary">
                  {video.category}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </aside>
  )
}
