'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, BookOpen, GraduationCap, ArrowRight, BookX } from 'lucide-react'
import { cn } from '@/lib/utils'
import { courses } from '@/data/materi'
import { FadeInView, StaggerGrid, StaggerItem, BlurCircles } from '@/components/animations'

const semesters = ['All', '1', '3', '5', '7']

const gradientBgs = [
  'from-navy to-navy-700',
  'from-gold to-gold-700',
  'from-emerald to-emerald-700',
  'from-navy-600 to-navy-800',
]

export default function MateriPage() {
  const [search, setSearch] = useState('')
  const [selectedSemester, setSelectedSemester] = useState('All')

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchSearch =
        !search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.code.toLowerCase().includes(search.toLowerCase()) ||
        c.instructor.toLowerCase().includes(search.toLowerCase())
      const matchSemester =
        selectedSemester === 'All' || c.semester === selectedSemester
      return matchSearch && matchSemester
    })
  }, [search, selectedSemester])

  return (
    <div className="min-h-screen bg-surface dark:bg-dark-surface">
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-50/50 to-transparent pb-12 pt-24 dark:from-navy-900/20">
        <BlurCircles />
        <div className="container relative z-10">
          <FadeInView>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-navy-100 px-4 py-1.5 text-sm font-medium text-navy-700 dark:bg-navy-900/40 dark:text-navy-200">
                <GraduationCap className="size-4" />
                Program Studi D3 Manajemen Informatika
              </div>
              <h1 className="font-display text-4xl font-extrabold text-text-primary dark:text-dark-text-primary sm:text-5xl">
                Materi{' '}
                <span className="bg-gradient-to-r from-navy via-navy-600 to-navy-400 bg-clip-text text-transparent">
                  Kuliah
                </span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary dark:text-dark-text-secondary">
                Akses materi perkuliahan, slide presentasi, video pembelajaran,
                dan referensi untuk setiap mata kuliah yang diajarkan.
              </p>
            </div>
          </FadeInView>

          <FadeInView delay={0.15} className="mt-10">
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-text-tertiary dark:text-dark-text-tertiary" />
                <input
                  type="text"
                  placeholder="Cari mata kuliah, kode, atau dosen..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface py-3.5 pl-12 pr-4 text-sm text-text-primary outline-none transition-all duration-200 placeholder:text-text-tertiary focus:border-navy focus:ring-2 focus:ring-navy/20 dark:border-dark-border dark:bg-dark-surface dark:text-dark-text-primary dark:placeholder:text-dark-text-tertiary dark:focus:border-navy-500 dark:focus:ring-navy-500/20"
                />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {semesters.map((sem) => (
                <button
                  key={sem}
                  onClick={() => setSelectedSemester(sem)}
                  className={cn(
                    'rounded-full px-5 py-2 text-sm font-medium transition-all duration-200',
                    selectedSemester === sem
                      ? 'bg-navy text-white shadow-md dark:bg-navy-700'
                      : 'bg-gray-100 text-text-secondary hover:bg-gray-200 dark:bg-dark-surface-tertiary dark:text-dark-text-secondary dark:hover:bg-dark-border'
                  )}
                >
                  {sem === 'All' ? 'Semua Semester' : `Semester ${sem}`}
                </button>
              ))}
            </div>
          </FadeInView>
        </div>
      </section>

      <section className="container pb-20 pt-10">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <BookX className="size-16 text-text-tertiary dark:text-dark-text-tertiary" />
            <h3 className="mt-4 text-xl font-semibold text-text-primary dark:text-dark-text-primary">
              Mata kuliah tidak ditemukan
            </h3>
            <p className="mt-2 text-text-secondary dark:text-dark-text-secondary">
              Coba ubah kata kunci pencarian atau filter semester.
            </p>
            <button
              onClick={() => {
                setSearch('')
                setSelectedSemester('All')
              }}
              className="btn-ghost mt-4 text-navy dark:text-navy-300"
            >
              Reset filter
            </button>
          </motion.div>
        ) : (
          <StaggerGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((course, i) => (
              <StaggerItem key={course.id}>
                <Link
                  href={`/materi/${course.id}`}
                  className="group card-hover flex h-full flex-col"
                >
                  <div
                    className={cn(
                      'mb-4 flex size-14 items-center justify-center rounded-xl bg-gradient-to-br text-lg font-bold text-white shadow-sm',
                      gradientBgs[i % gradientBgs.length]
                    )}
                  >
                    {course.code.slice(0, 2)}
                  </div>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="badge-navy">{course.code}</span>
                    <span className="badge-gold">{course.sks} SKS</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-text-primary transition-colors group-hover:text-navy dark:text-dark-text-primary dark:group-hover:text-navy-300">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                    {course.instructor}
                  </p>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-text-tertiary dark:text-dark-text-tertiary">
                    {course.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4 dark:border-dark-border">
                    <span className="flex items-center gap-1 text-xs text-text-tertiary dark:text-dark-text-tertiary">
                      <BookOpen className="size-3.5" />
                      {course.totalWeeks} minggu
                    </span>
                    <span className="flex items-center gap-1 text-sm font-medium text-navy transition-all group-hover:gap-2 dark:text-navy-300">
                      Buka Materi
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>
        )}
      </section>
    </div>
  )
}
