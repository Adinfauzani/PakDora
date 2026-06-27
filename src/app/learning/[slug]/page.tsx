'use client'

import { useState, useMemo, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Clock,
  Calendar,
  BarChart3,
  BookOpen,
  FileText,
  Download,
  Github,
  Link as LinkIcon,
  Share2,
  Bookmark,
  Copy,
  Check,
  AlertTriangle,
  Loader2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'
import type { LearningVideo } from '@/types/learning'
import { FadeInView } from '@/components/animations'
import { VideoPlayer } from '@/components/learning/VideoPlayer'
import { VideoSidebar } from '@/components/learning/VideoSidebar'
import CustomLink from '@/components/Link'

type Tab = 'overview' | 'resources' | 'transcript'

const levelColors: Record<string, string> = {
  Pemula: 'badge-emerald',
  Menengah: 'badge-gold',
  Lanjutan: 'badge-navy',
}

const resourceIcons: Record<string, React.ReactNode> = {
  slide: <FileText className="size-4" />,
  pdf: <FileText className="size-4" />,
  dataset: <BarChart3 className="size-4" />,
  github: <Github className="size-4" />,
  link: <LinkIcon className="size-4" />,
}

const resourceLabels: Record<string, string> = {
  slide: 'Slide Presentasi',
  pdf: 'Dokumen PDF',
  dataset: 'Dataset',
  github: 'Source Code',
  link: 'Materi Tambahan',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function getRelatedVideos(video: LearningVideo, all: LearningVideo[], limit = 4) {
  return all
    .filter(
      (v) =>
        v.id !== video.id &&
        (v.category === video.category ||
          v.tags?.some((t) => video.tags?.includes(t)))
    )
    .slice(0, limit)
}

export default function LearningDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const { data: video, isLoading } = api.learning.bySlug.useQuery({ slug })
  const { data: allVideos = [] } = api.learning.all.useQuery()

  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [copied, setCopied] = useState(false)

  const relatedVideos = useMemo(
    () => (video ? getRelatedVideos(video, allVideos) : []),
    [video, allVideos]
  )

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: video?.title,
        url: window.location.href,
      })
    } else {
      handleCopyLink()
    }
  }, [video, handleCopyLink])

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-surface dark:bg-dark-surface">
        <Loader2 className="size-8 animate-spin text-navy dark:text-navy-300" />
      </div>
    )
  }

  if (!video) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-surface dark:bg-dark-surface">
        <AlertTriangle className="size-16 text-gold-400" />
        <h1 className="mt-4 font-display text-2xl font-bold text-text-primary dark:text-dark-text-primary">
          Video Tidak Ditemukan
        </h1>
        <p className="mt-2 text-text-secondary dark:text-dark-text-secondary">
          Video pembelajaran yang Anda cari tidak tersedia.
        </p>
        <CustomLink href="/learning" className="btn-primary mt-6 gap-2">
          <ArrowLeft className="size-4" />
          Kembali ke Video Pembelajaran
        </CustomLink>
      </div>
    )
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'resources', label: 'Resources' },
    ...(video.transcript ? [{ key: 'transcript' as Tab, label: 'Transcript' }] : []),
  ]

  return (
    <div className="min-h-screen bg-surface dark:bg-dark-surface">
      <div className="border-b border-border bg-surface/80 backdrop-blur-md dark:border-dark-border dark:bg-dark-surface/80">
        <div className="container flex items-center justify-between py-3">
          <CustomLink
            href="/learning"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary"
          >
            <ArrowLeft className="size-4" />
            Kembali
          </CustomLink>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={cn(
                'flex size-10 items-center justify-center rounded-xl transition-all',
                isBookmarked
                  ? 'bg-navy-50 text-navy-600 dark:bg-navy-900/30 dark:text-navy-300'
                  : 'text-text-tertiary hover:bg-gray-100 dark:text-dark-text-tertiary dark:hover:bg-dark-surface-tertiary'
              )}
              aria-label={isBookmarked ? 'Hapus bookmark' : 'Tambah bookmark'}
            >
              <Bookmark className={cn('size-4', isBookmarked && 'fill-current')} />
            </button>
            <button
              onClick={handleCopyLink}
              className="flex size-10 items-center justify-center rounded-xl text-text-tertiary transition-colors hover:bg-gray-100 dark:text-dark-text-tertiary dark:hover:bg-dark-surface-tertiary"
              aria-label="Salin tautan"
            >
              {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
            </button>
            <button
              onClick={handleShare}
              className="flex size-10 items-center justify-center rounded-xl text-text-tertiary transition-colors hover:bg-gray-100 dark:text-dark-text-tertiary dark:hover:bg-dark-surface-tertiary"
              aria-label="Bagikan"
            >
              <Share2 className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <section className="container py-8">
            <FadeInView>
              <VideoPlayer videoType={video.videoType} videoUrl={video.videoUrl} title={video.title} />
            </FadeInView>

        <div className="mt-6 space-y-6">
          <FadeInView delay={0.05}>
            <div>
              <h1 className="font-display text-2xl font-bold text-text-primary dark:text-dark-text-primary sm:text-3xl">
                {video.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-50 px-3 py-1 text-xs font-medium text-navy-700 dark:bg-navy-900/40 dark:text-navy-200">
                  {video.category}
                </span>
                <span className={cn('inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium', levelColors[video.level])}>
                  {video.level}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-text-tertiary dark:text-dark-text-tertiary">
                <span className="flex items-center gap-1.5">
                  <Clock className="size-4" />
                  {video.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-4" />
                  {formatDate(video.publishedAt)}
                </span>
                {video.estimatedTime && (
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="size-4" />
                    Estimasi: {video.estimatedTime}
                  </span>
                )}
                {video.viewCount != null && (
                  <span className="flex items-center gap-1.5">
                    <BarChart3 className="size-4" />
                    {video.viewCount >= 1000
                      ? `${(video.viewCount / 1000).toFixed(1)}k`
                      : video.viewCount}{' '}
                    ditonton
                  </span>
                )}
              </div>
            </div>
          </FadeInView>

          <FadeInView delay={0.1}>
            <div className="border-b border-border dark:border-dark-border">
              <div className="flex gap-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={cn(
                      'relative px-4 py-3 text-sm font-medium transition-colors',
                      activeTab === tab.key
                        ? 'text-navy-600 dark:text-navy-300'
                        : 'text-text-tertiary hover:text-text-secondary dark:text-dark-text-tertiary dark:hover:text-dark-text-secondary'
                    )}
                  >
                    {tab.label}
                    {activeTab === tab.key && (
                      <motion.div
                        layoutId="tab-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-navy-500 dark:bg-navy-400"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </FadeInView>

          <FadeInView delay={0.15} key={activeTab}>
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-border/50 bg-white/40 p-6 dark:border-dark-border/50 dark:bg-dark-surface-card/40">
                  <h2 className="font-display text-lg font-bold text-text-primary dark:text-dark-text-primary">
                    Deskripsi Materi
                  </h2>
                  <p className="mt-3 leading-relaxed text-text-secondary dark:text-dark-text-secondary">
                    {video.description}
                  </p>
                </div>

                {video.tags && video.tags.length > 0 && (
                  <div>
                    <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-text-tertiary dark:text-dark-text-tertiary">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {video.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full border border-border/60 bg-surface px-3 py-1 text-xs font-medium text-text-secondary dark:border-dark-border/60 dark:bg-dark-surface-tertiary dark:text-dark-text-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="space-y-4">
                {!video.resources || video.resources.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-border p-10 text-center dark:border-dark-border">
                    <FileText className="mx-auto size-8 text-text-tertiary dark:text-dark-text-tertiary" />
                    <p className="mt-3 text-sm text-text-secondary dark:text-dark-text-secondary">
                      Belum ada resource untuk materi ini.
                    </p>
                  </div>
                ) : (
                  (video.resources as { title: string; url: string; type: string }[]).map((resource, i) => (
                    <a
                      key={i}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-xl border border-border/50 bg-white/40 p-4 transition-all hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-soft dark:border-dark-border/50 dark:bg-dark-surface-card/40 dark:hover:border-navy-700"
                    >
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-600 dark:bg-navy-900/30 dark:text-navy-300">
                        {resourceIcons[resource.type] || <LinkIcon className="size-4" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-text-primary group-hover:text-navy-600 dark:text-dark-text-primary dark:group-hover:text-navy-300">
                          {resource.title}
                        </h4>
                        <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
                          {resourceLabels[resource.type] || resource.type}
                        </p>
                      </div>
                      <Download className="size-4 shrink-0 text-text-tertiary transition-all group-hover:text-navy-500 dark:text-dark-text-tertiary dark:group-hover:text-navy-300" />
                    </a>
                  ))
                )}
              </div>
            )}

            {activeTab === 'transcript' && video.transcript && (
              <div className="rounded-2xl border border-border/50 bg-white/40 p-6 dark:border-dark-border/50 dark:bg-dark-surface-card/40">
                <h2 className="font-display text-lg font-bold text-text-primary dark:text-dark-text-primary">
                  Ringkasan Materi
                </h2>
                <p className="mt-3 leading-relaxed text-text-secondary dark:text-dark-text-secondary">
                  {video.transcript}
                </p>
              </div>
            )}
          </FadeInView>
        </div>
      </section>

      {relatedVideos.length > 0 && (
        <section className="border-t border-border pb-16 pt-10 dark:border-dark-border">
          <div className="container">
            <h2 className="mb-6 font-display text-xl font-bold text-text-primary dark:text-dark-text-primary">
              Video Terkait
            </h2>
            <VideoSidebar videos={relatedVideos} />
          </div>
        </section>
      )}
    </div>
  )
}
