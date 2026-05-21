'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  FileText,
  Video,
  Link as LinkIcon,
  Download,
  List,
  X,
  AlertTriangle,
  ArrowLeft,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { TI201, TI202, TI301, TI401 } from '@/data/materi'
import type { CourseData, WeekModule } from '@/types/materi'
import PdfViewer from '@/components/learning/PdfViewer'
import { FadeInView, BlurCircles } from '@/components/animations'

const courseMap: Record<string, CourseData> = {
  TI201,
  TI202,
  TI301,
  TI401,
}

const STORAGE_PREFIX = 'materi-completed-'

export default function LearningPage() {
  const params = useParams()
  const router = useRouter()
  const materiaId = params.materiaId as string

  const courseData = useMemo(() => courseMap[materiaId], [materiaId])
  const modules = useMemo(() => courseData?.modules ?? [], [courseData])

  const [activeWeek, setActiveWeek] = useState(1)
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const activeModule = useMemo(
    () => modules.find((m) => m.week === activeWeek) ?? modules[0],
    [modules, activeWeek]
  )
  const activeIndex = useMemo(
    () => modules.findIndex((m) => m.week === activeWeek),
    [modules, activeWeek]
  )

  useEffect(() => {
    if (!courseData) return
    const stored = localStorage.getItem(STORAGE_PREFIX + materiaId)
    if (stored) {
      try {
        setCompletedWeeks(JSON.parse(stored))
      } catch {
        setCompletedWeeks([])
      }
    }
    setActiveWeek(1)
    setSidebarOpen(false)
  }, [materiaId, courseData])

  useEffect(() => {
    if (!courseData) return
    localStorage.setItem(
      STORAGE_PREFIX + materiaId,
      JSON.stringify(completedWeeks)
    )
  }, [completedWeeks, materiaId, courseData])

  const toggleComplete = useCallback(
    (week: number) => {
      setCompletedWeeks((prev) =>
        prev.includes(week)
          ? prev.filter((w) => w !== week)
          : [...prev, week]
      )
    },
    []
  )

  const goToModule = useCallback(
    (week: number) => {
      setActiveWeek(week)
      setSidebarOpen(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    []
  )

  const progress = courseData
    ? Math.round((completedWeeks.length / modules.length) * 100)
    : 0

  if (!courseData) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-surface dark:bg-dark-surface">
        <div className="text-center">
          <AlertTriangle className="mx-auto size-16 text-gold-400" />
          <h1 className="mt-4 font-display text-2xl font-bold text-text-primary dark:text-dark-text-primary">
            Mata Kuliah Tidak Ditemukan
          </h1>
          <p className="mt-2 text-text-secondary dark:text-dark-text-secondary">
            Mata kuliah dengan kode &quot;{materiaId}&quot; tidak tersedia.
          </p>
          <button
            onClick={() => router.push('/materi')}
            className="btn-primary mt-6"
          >
            <ArrowLeft className="mr-2 size-4" />
            Kembali ke Materi Kuliah
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface dark:bg-dark-surface">
      <header className="sticky top-0 z-40 border-b border-border bg-surface/80 backdrop-blur-lg dark:border-dark-border dark:bg-dark-surface/80">
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/materi')}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-gray-100 dark:text-dark-text-secondary dark:hover:bg-dark-surface-tertiary"
              aria-label="Kembali"
            >
              <ArrowLeft className="size-5" />
            </button>
            <div className="hidden sm:block">
              <h1 className="font-display text-lg font-bold text-text-primary dark:text-dark-text-primary">
                {courseData.title}
              </h1>
              <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
                {courseData.code} &middot; Semester {courseData.semester}{' '}
                &middot; {courseData.sks} SKS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 sm:flex">
              <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200 dark:bg-dark-surface-tertiary">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-navy to-navy-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="whitespace-nowrap text-xs font-medium text-text-secondary dark:text-dark-text-secondary">
                {completedWeeks.length}/{modules.length} selesai
              </span>
            </div>

            <button
              onClick={() => setSidebarOpen(true)}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-gray-100 lg:hidden dark:text-dark-text-secondary dark:hover:bg-dark-surface-tertiary"
              aria-label="Buka daftar modul"
            >
              <List className="size-5" />
            </button>
          </div>
        </div>

        <div className="border-t border-border px-4 py-2 sm:hidden dark:border-dark-border">
          <p className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
            {activeModule?.title}
          </p>
          <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
            {courseData.code} &middot; Semester {courseData.semester}
          </p>
        </div>
      </header>

      <div className="container relative flex gap-6 py-6">
        <aside
          className={cn(
            'hidden w-72 shrink-0 lg:block',
            'sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl border border-border bg-surface p-4 dark:border-dark-border dark:bg-dark-surface'
          )}
        >
          <ModuleSidebar
            modules={modules}
            activeWeek={activeWeek}
            completedWeeks={completedWeeks}
            onSelect={goToModule}
            onToggleComplete={toggleComplete}
            progress={progress}
          />
        </aside>

        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="absolute right-0 top-0 h-full w-80 border-l border-border bg-surface p-4 dark:border-dark-border dark:bg-dark-surface"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-display text-lg font-bold text-text-primary dark:text-dark-text-primary">
                    Daftar Modul
                  </h2>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-text-secondary hover:bg-gray-100 dark:text-dark-text-secondary dark:hover:bg-dark-surface-tertiary"
                    aria-label="Tutup"
                  >
                    <X className="size-5" />
                  </button>
                </div>
                <ModuleSidebar
                  modules={modules}
                  activeWeek={activeWeek}
                  completedWeeks={completedWeeks}
                  onSelect={goToModule}
                  onToggleComplete={toggleComplete}
                  progress={progress}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="min-w-0 flex-1">
          <FadeInView key={activeWeek}>
            {activeModule && (
              <ModuleContent
                module={activeModule}
                totalModules={modules.length}
                activeIndex={activeIndex}
                isCompleted={completedWeeks.includes(activeModule.week)}
                onToggleComplete={() => toggleComplete(activeModule.week)}
                onPrevious={() => {
                  if (activeIndex > 0)
                    goToModule(modules[activeIndex - 1].week)
                }}
                onNext={() => {
                  if (activeIndex < modules.length - 1)
                    goToModule(modules[activeIndex + 1].week)
                }}
              />
            )}
          </FadeInView>
        </main>
      </div>
    </div>
  )
}

function ModuleSidebar({
  modules,
  activeWeek,
  completedWeeks,
  onSelect,
  onToggleComplete,
  progress,
}: {
  modules: WeekModule[]
  activeWeek: number
  completedWeeks: number[]
  onSelect: (week: number) => void
  onToggleComplete: (week: number) => void
  progress: number
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-4">
        <h2 className="font-display text-sm font-bold uppercase tracking-wider text-text-tertiary dark:text-dark-text-tertiary">
          Modul Pembelajaran
        </h2>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-dark-surface-tertiary">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-navy to-navy-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="mt-1 text-xs text-text-tertiary dark:text-dark-text-tertiary">
          {completedWeeks.length} dari {modules.length} modul selesai
        </p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto scrollbar-hide">
        {modules.map((mod) => {
          const isActive = mod.week === activeWeek
          const isCompleted = completedWeeks.includes(mod.week)
          return (
            <button
              key={mod.week}
              onClick={() => onSelect(mod.week)}
              className={cn(
                'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-all duration-200',
                isActive
                  ? 'bg-navy-50 text-navy-700 dark:bg-navy-900/30 dark:text-navy-200'
                  : 'text-text-secondary hover:bg-gray-50 dark:text-dark-text-secondary dark:hover:bg-dark-surface-tertiary'
              )}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleComplete(mod.week)
                }}
                className="shrink-0"
                aria-label={
                  isCompleted ? 'Tandai belum selesai' : 'Tandai selesai'
                }
              >
                {isCompleted ? (
                  <CheckCircle2 className="size-5 text-emerald-500" />
                ) : (
                  <Circle className="size-5 text-text-tertiary dark:text-dark-text-tertiary" />
                )}
              </button>
              <div className="min-w-0 flex-1">
                <span
                  className={cn(
                    'block truncate',
                    isActive &&
                      'font-semibold'
                  )}
                >
                  Minggu {mod.week}
                </span>
                <span className="block truncate text-xs text-text-tertiary dark:text-dark-text-tertiary">
                  {mod.title}
                </span>
              </div>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

function ModuleContent({
  module,
  totalModules,
  activeIndex,
  isCompleted,
  onToggleComplete,
  onPrevious,
  onNext,
}: {
  module: WeekModule
  totalModules: number
  activeIndex: number
  isCompleted: boolean
  onToggleComplete: () => void
  onPrevious: () => void
  onNext: () => void
}) {
  return (
    <div className="space-y-8">
      <div>
        <div className="mb-2 flex items-center gap-2 text-sm text-text-tertiary dark:text-dark-text-tertiary">
          <BookOpen className="size-4" />
          <span>
            Minggu {module.week} dari {totalModules}
          </span>
        </div>
        <h1 className="font-display text-2xl font-bold text-text-primary dark:text-dark-text-primary">
          {module.title}
        </h1>
        <p className="mt-2 text-text-secondary dark:text-dark-text-secondary">
          {module.description}
        </p>
      </div>

      {module.pdfUrl && (
        <FadeInView>
          <section>
            <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-text-primary dark:text-dark-text-primary">
              <FileText className="size-5 text-navy dark:text-navy-300" />
              Slide Presentasi
            </h2>
            <PdfViewer url={module.pdfUrl} title={module.title} />
          </section>
        </FadeInView>
      )}

      {module.body && (
        <FadeInView delay={0.1}>
          <section className="rounded-2xl border border-border bg-surface p-6 dark:border-dark-border dark:bg-dark-surface">
            <h2 className="mb-4 font-display text-lg font-bold text-text-primary dark:text-dark-text-primary">
              Materi Pembelajaran
            </h2>
            <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-text-primary prose-p:text-text-secondary prose-strong:text-text-primary dark:prose-headings:text-dark-text-primary dark:prose-p:text-dark-text-secondary dark:prose-strong:text-dark-text-primary">
              {module.body.split('\n\n').map((paragraph, i) => {
                const rendered = paragraph
                  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.+?)\*/g, '<em>$1</em>')
                return (
                  <p
                    key={i}
                    dangerouslySetInnerHTML={{ __html: rendered }}
                    className="mb-4 leading-relaxed last:mb-0"
                  />
                )
              })}
            </div>
          </section>
        </FadeInView>
      )}

      {module.videoUrl && (
        <FadeInView delay={0.15}>
          <section>
            <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-text-primary dark:text-dark-text-primary">
              <Video className="size-5 text-navy dark:text-navy-300" />
              Video Pembelajaran
            </h2>
            <div className="aspect-video overflow-hidden rounded-2xl shadow-card">
              <iframe
                src={module.videoUrl}
                title={module.title}
                className="h-full w-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </section>
        </FadeInView>
      )}

      {module.assignments && module.assignments.length > 0 && (
        <FadeInView delay={0.2}>
          <section>
            <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-text-primary dark:text-dark-text-primary">
              <FileText className="size-5 text-navy dark:text-navy-300" />
              Tugas
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {module.assignments.map((assignment, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-surface p-5 dark:border-dark-border dark:bg-dark-surface"
                >
                  <h3 className="font-semibold text-text-primary dark:text-dark-text-primary">
                    {assignment.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
                    {assignment.description}
                  </p>
                  {assignment.fileUrl && (
                    <a
                      href={assignment.fileUrl}
                      download
                      className="btn-ghost mt-3 inline-flex items-center gap-2 text-sm text-navy dark:text-navy-300"
                    >
                      <Download className="size-4" />
                      Unduh Template
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        </FadeInView>
      )}

      {module.references && module.references.length > 0 && (
        <FadeInView delay={0.25}>
          <section>
            <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-text-primary dark:text-dark-text-primary">
              <LinkIcon className="size-5 text-navy dark:text-navy-300" />
              Referensi
            </h2>
            <div className="space-y-3">
              {module.references.map((ref, i) => (
                <a
                  key={i}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-hover flex items-start gap-4"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-600 dark:bg-navy-900/30 dark:text-navy-300">
                    <LinkIcon className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-text-primary underline-offset-2 group-hover:underline dark:text-dark-text-primary">
                      {ref.title}
                    </h3>
                    {ref.description && (
                      <p className="mt-0.5 text-sm text-text-tertiary dark:text-dark-text-tertiary">
                        {ref.description}
                      </p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </section>
        </FadeInView>
      )}

      <div className="flex items-center justify-between gap-4 border-t border-border pt-6 dark:border-dark-border">
        <button
          onClick={onPrevious}
          disabled={activeIndex <= 0}
          className="btn-secondary disabled:opacity-40"
        >
          <ChevronLeft className="mr-2 size-4" />
          Sebelumnya
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleComplete}
            className={cn(
              'btn-ghost flex items-center gap-2',
              isCompleted
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-text-secondary dark:text-dark-text-secondary'
            )}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="size-5" />
                Selesai
              </>
            ) : (
              <>
                <Circle className="size-5" />
                Tandai Selesai
              </>
            )}
          </button>
          <span className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
            Modul {activeIndex + 1} dari {totalModules}
          </span>
        </div>

        <button
          onClick={onNext}
          disabled={activeIndex >= totalModules - 1}
          className="btn-primary disabled:opacity-40"
        >
          Selanjutnya
          <ChevronRight className="ml-2 size-4" />
        </button>
      </div>
    </div>
  )
}
