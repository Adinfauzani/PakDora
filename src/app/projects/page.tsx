'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, FolderOpen, ExternalLink, ChevronRight, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FadeInView, StaggerGrid, StaggerItem } from '@/components/animations'
import { projects, type Project } from '@/data/projectsData'
import Link from 'next/link'

const categoryFilters = [
  { label: 'Semua', value: 'All' },
  { label: 'Research', value: 'Research' },
  { label: 'Pengabdian', value: 'Pengabdian' },
  { label: 'Sistem', value: 'System' },
  { label: 'Seminar', value: 'Seminar' },
  { label: 'Buku', value: 'Book' },
] as const

const categoryFilterMap: Record<string, string[]> = {
  All: ['Research', 'Community Service', 'System', 'Seminar', 'Book', 'Pengabdian'],
  Research: ['Research'],
  Pengabdian: ['Community Service', 'Pengabdian'],
  System: ['System'],
  Seminar: ['Seminar'],
  Book: ['Book'],
}

const categoryGradients: Record<string, string> = {
  Research: 'from-blue-400 via-indigo-500 to-purple-600',
  'Community Service': 'from-emerald-400 via-green-500 to-teal-600',
  Pengabdian: 'from-emerald-400 via-green-500 to-teal-600',
  System: 'from-navy-400 via-navy-600 to-navy-800',
  Seminar: 'from-gold-300 via-amber-500 to-orange-600',
  Book: 'from-rose-400 via-pink-500 to-purple-600',
}

const categoryBadgeClass: Record<string, string> = {
  Research: 'badge-navy',
  'Community Service': 'badge-emerald',
  Pengabdian: 'badge-emerald',
  System: 'badge-navy',
  Seminar: 'badge-gold',
  Book: 'badge-gray',
}

function ProjectCard({ project }: { project: Project }) {
  const href = project.link || `/projects/${project.id}`
  const isExternal = !!project.link

  return (
    <Link href={href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined}>
      <div className="card-hover group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl">
        {/* Image / Gradient Placeholder */}
        <div
          className={cn(
            'relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br',
            categoryGradients[project.category]
          )}
        >
          <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
          <span className="relative font-display text-4xl font-bold tracking-tight text-white/80">
            {project.title.charAt(0)}
          </span>
          {isExternal && (
            <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <ExternalLink className="h-4 w-4 text-white" />
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-center gap-2">
            <span className={cn('capitalize', categoryBadgeClass[project.category])}>
              {project.category === 'Community Service' ? 'Pengabdian' : project.category}
            </span>
          </div>

          <h3 className="font-display text-lg font-bold leading-snug text-text-primary group-hover:text-navy-600 dark:text-dark-text-primary dark:group-hover:text-navy-300">
            {project.title}
          </h3>

          <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
            {project.description}
          </p>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-medium text-text-tertiary dark:text-dark-text-tertiary">
              {project.year}
            </span>
            <span
              className={cn(
                'rounded-full px-2.5 py-0.5 text-[11px] font-medium',
                project.status === 'Completed' || project.status === 'Published'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                  : project.status === 'In Progress' || project.status === 'Ongoing'
                    ? 'bg-gold-50 text-gold-700 dark:bg-gold-900/30 dark:text-gold-300'
                    : 'bg-navy-50 text-navy-700 dark:bg-navy-900/30 dark:text-navy-300'
              )}
            >
              {project.status}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function StatsBar({ filteredProjects }: { filteredProjects: Project[] }) {
  const stats = useMemo(() => {
    const categories = ['Research', 'Community Service', 'System', 'Seminar', 'Book'] as const
    return categories.map((cat) => ({
      label: cat === 'Community Service' ? 'Pengabdian' : cat,
      count: projects.filter((p) => p.category === cat).length,
    }))
  }, [])

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="card-base flex flex-col items-center gap-1 py-4 text-center"
        >
          <span className="font-display text-2xl font-bold text-navy-600 dark:text-navy-300">
            {stat.count}
          </span>
          <span className="text-xs font-medium text-text-tertiary dark:text-dark-text-tertiary">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = useMemo(() => {
    const categories = categoryFilterMap[activeFilter]
    return projects.filter((p) => {
      if (!categories.includes(p.category)) return false
      if (!searchQuery) return true
      const q = searchQuery.toLowerCase()
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech?.some((t) => t.toLowerCase().includes(q))
      )
    })
  }, [activeFilter, searchQuery])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-surface via-navy-50/20 to-surface pb-16 pt-24 dark:border-dark-border dark:from-dark-surface dark:via-navy-950/20 dark:to-dark-surface">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gold-200/20 blur-3xl dark:bg-gold-500/5" />
        <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-navy-200/20 blur-3xl dark:bg-navy-500/5" />
        <div className="absolute bottom-0 left-1/2 h-40 w-80 -translate-x-1/2 rounded-full bg-emerald-200/10 blur-3xl dark:bg-emerald-500/5" />

        <FadeInView>
          <div className="container relative z-10 text-center">
            <h1 className="gradient-text font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Projects &amp; Research
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary dark:text-dark-text-secondary">
              Kumpulan penelitian, sistem, pengabdian masyarakat, seminar, dan publikasi yang
              telah dan sedang dikerjakan.
            </p>
          </div>
        </FadeInView>
      </section>

      {/* Filters & Search */}
      <section className="sticky top-0 z-20 border-b border-border bg-surface/80 backdrop-blur-md dark:border-dark-border dark:bg-dark-surface/80">
        <div className="container py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Filters */}
            <div className="scrollbar-hide flex gap-2 overflow-x-auto">
              {categoryFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={cn(
                    'whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                    activeFilter === filter.value
                      ? 'bg-navy text-white shadow-sm'
                      : 'border border-border bg-transparent text-text-secondary hover:border-navy-300 hover:text-navy-600 dark:border-dark-border dark:text-dark-text-secondary dark:hover:border-navy-600 dark:hover:text-navy-300'
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary dark:text-dark-text-tertiary" />
              <input
                type="text"
                placeholder="Cari proyek..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder-text-tertiary transition-colors focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-500/20 dark:border-dark-border dark:bg-dark-surface-tertiary dark:text-dark-text-primary dark:placeholder-dark-text-tertiary dark:focus:border-navy-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container py-10">
        <FadeInView>
          <div className="mb-2 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-text-tertiary dark:text-dark-text-tertiary" />
            <span className="text-xs font-medium uppercase tracking-wider text-text-tertiary dark:text-dark-text-tertiary">
              Statistik
            </span>
          </div>
          <StatsBar filteredProjects={filteredProjects} />
        </FadeInView>
      </section>

      {/* Projects Grid */}
      <section className="container pb-20">
        {filteredProjects.length > 0 ? (
          <StaggerGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <StaggerItem key={project.id}>
                  <ProjectCard project={project} />
                </StaggerItem>
              ))}
            </AnimatePresence>
          </StaggerGrid>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center py-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-navy-50 dark:bg-navy-900/40">
              <FolderOpen className="h-10 w-10 text-navy-500 dark:text-navy-300" />
            </div>
            <h2 className="font-display text-xl font-bold text-text-primary dark:text-dark-text-primary">
              Tidak ada proyek ditemukan
            </h2>
            <p className="mt-2 max-w-sm text-text-secondary dark:text-dark-text-secondary">
              Coba ubah filter atau kata kunci pencarian untuk menemukan proyek yang Anda cari.
            </p>
            <button
              onClick={() => {
                setActiveFilter('All')
                setSearchQuery('')
              }}
              className="btn-secondary mt-6 gap-2"
            >
              <ChevronRight className="h-4 w-4" />
              Reset Filter
            </button>
          </motion.div>
        )}
      </section>
    </div>
  )
}
