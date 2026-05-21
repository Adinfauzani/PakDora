'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { BookOpen, Upload, FileText, ExternalLink, Trash2 } from 'lucide-react'
import { courses } from '@/data/materi'
import { toast } from 'sonner'

export default function AdminMateriPage() {
  const [uploading, setUploading] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (courseId: string, week: number, type: 'pdf' | 'ppt') => {
    const file = fileRef.current?.files?.[0]
    if (!file) {
      toast.error('Pilih file terlebih dahulu')
      return
    }

    const ext = file.name.split('.').pop()
    const allowed = type === 'pdf' ? 'pdf' : 'ppt,pptx'
    if (!file.name.toLowerCase().endsWith(`.${ext}`) || !ext || !allowed.includes(ext)) {
      toast.error(`Hanya file ${type === 'pdf' ? 'PDF' : 'PPT/PPTX'} yang diizinkan`)
      return
    }

    setUploading(`${courseId}-${week}`)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('courseId', courseId)
    formData.append('week', String(week))
    formData.append('type', type)

    try {
      const res = await fetch('/api/upload/materi', { method: 'POST', body: formData })
      if (!res.ok) throw new Error(await res.text())
      toast.success('File berhasil diupload!')
    } catch (e) {
      toast.error('Gagal upload file')
    } finally {
      setUploading(null)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  return (
    <div className="min-h-screen bg-surface dark:bg-dark-surface">
      <div className="container py-20">
        <h1 className="font-display text-3xl font-bold text-text-primary dark:text-dark-text-primary">
          Materi Kuliah
        </h1>
        <p className="mt-1 text-text-secondary dark:text-dark-text-secondary">
          Upload PDF/PPT untuk setiap modul perkuliahan
        </p>

        <div className="mt-8 flex items-center gap-3">
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.ppt,.pptx"
            className="block w-full max-w-xs rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary file:mr-3 file:rounded-lg file:border-0 file:bg-navy file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white dark:border-dark-border dark:bg-dark-surface dark:text-dark-text-primary"
          />
        </div>

        <div className="mt-8 space-y-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="rounded-2xl border border-border/50 bg-white/40 p-5 backdrop-blur-sm dark:border-dark-border/30 dark:bg-dark-surface-card/40"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 dark:bg-navy-900/30">
                    <BookOpen className="h-5 w-5 text-navy dark:text-navy-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary dark:text-dark-text-primary">
                      {course.title}
                    </h3>
                    <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
                      {course.code} &middot; Semester {course.semester}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/materi/${course.id}`}
                  className="flex items-center gap-1 text-sm text-navy transition-colors hover:text-navy-600 dark:text-navy-300"
                >
                  View <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-4">
                {Array.from({ length: 5 }, (_, i) => i + 1).map((week) => (
                  <div
                    key={week}
                    className="flex items-center justify-between rounded-xl border border-border/40 bg-surface/50 p-3 dark:border-dark-border/30 dark:bg-dark-surface/50"
                  >
                    <span className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary">
                      Minggu {week}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleUpload(course.id, week, 'pdf')}
                        disabled={uploading === `${course.id}-${week}`}
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-text-tertiary transition-colors hover:bg-navy-50 hover:text-navy dark:hover:bg-navy-900/30 dark:hover:text-navy-300"
                        title="Upload PDF"
                      >
                        <FileText className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleUpload(course.id, week, 'ppt')}
                        disabled={uploading === `${course.id}-${week}`}
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-text-tertiary transition-colors hover:bg-gold-50 hover:text-gold dark:hover:bg-gold-900/30 dark:hover:text-gold-300"
                        title="Upload PPT"
                      >
                        <Upload className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
