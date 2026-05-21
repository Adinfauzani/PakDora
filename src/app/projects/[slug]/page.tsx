'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, ExternalLink, Tag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FadeInView } from '@/components/animations'
import { projects } from '@/data/projectsData'
import CustomLink from '@/components/Link'

const categoryGradients: Record<string, string> = {
  Research: 'from-blue-400 via-indigo-500 to-purple-600',
  'Community Service': 'from-emerald-400 via-green-500 to-teal-600',
  System: 'from-navy-400 via-navy-600 to-navy-800',
  Seminar: 'from-gold-300 via-amber-500 to-orange-600',
  Book: 'from-rose-400 via-pink-500 to-purple-600',
}

export default function ProjectDetailPage() {
  const params = useParams()
  const project = projects.find((p) => p.id === params.slug)

  if (!project) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h1 className="font-display text-2xl font-bold text-text-primary dark:text-dark-text-primary">
          Proyek tidak ditemukan
        </h1>
        <p className="mt-2 text-text-secondary dark:text-dark-text-secondary">
          Halaman yang Anda cari tidak tersedia.
        </p>
        <CustomLink href="/projects" className="btn-primary mt-6">
          Kembali ke Projects
        </CustomLink>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className={cn(
          'relative flex items-end overflow-hidden bg-gradient-to-br pb-16 pt-32',
          categoryGradients[project.category]
        )}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/5 blur-3xl" />

        <div className="container relative z-10">
          <FadeInView y={16}>
            <CustomLink
              href="/projects"
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Projects
            </CustomLink>

            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {project.category === 'Community Service' ? 'Pengabdian' : project.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-white/80">
                <Calendar className="h-3.5 w-3.5" />
                {project.year}
              </span>
              <span
                className={cn(
                  'rounded-full px-2.5 py-0.5 text-[11px] font-medium text-white',
                  project.status === 'Completed' || project.status === 'Published'
                    ? 'bg-emerald-500/50'
                    : project.status === 'In Progress' || project.status === 'Ongoing'
                      ? 'bg-gold-500/50'
                      : 'bg-navy-500/50'
                )}
              >
                {project.status}
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              {project.title}
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/80">
              {project.description}
            </p>
          </FadeInView>
        </div>
      </section>

      {/* Content */}
      <section className="container py-16">
        <FadeInView>
          <div className="mx-auto max-w-3xl">
            {/* Tech Stack */}
            {project.tech && project.tech.length > 0 && (
              <div className="mb-12">
                <h2 className="mb-4 font-display text-lg font-bold text-text-primary dark:text-dark-text-primary">
                  Tech Stack
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-text-secondary dark:border-dark-border dark:bg-dark-surface-tertiary dark:text-dark-text-secondary"
                    >
                      <Tag className="h-3 w-3" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Detail Placeholder */}
            <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center dark:border-dark-border dark:bg-dark-surface">
              <p className="font-display text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                Project Detail Page
              </p>
              <p className="mt-2 text-text-secondary dark:text-dark-text-secondary">
                Halaman detail untuk proyek ini sedang dalam pengembangan. Informasi
                lebih lanjut akan segera tersedia.
              </p>
              {project.link && (
                <CustomLink
                  href={project.link}
                  external
                  className="btn-primary mt-6 inline-flex gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Kunjungi Tautan
                </CustomLink>
              )}
            </div>

            {/* Back Link */}
            <div className="mt-12 text-center">
              <CustomLink
                href="/projects"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Kembali ke Projects
              </CustomLink>
            </div>
          </div>
        </FadeInView>
      </section>
    </div>
  )
}
