'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  Video,
  ExternalLink,
  AlertTriangle,
  Loader2,
  Upload,
  Youtube,
  Globe,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'
import type { LearningVideo, LearningResource, VideoType } from '@/types/learning'
import { learningCategories } from '@/data/learning'
import { toast } from 'sonner'
import CustomLink from '@/components/Link'

interface FormData {
  slug: string
  title: string
  description: string
  thumbnail: string
  videoType: VideoType
  videoUrl: string
  duration: string
  category: string
  level: 'Pemula' | 'Menengah' | 'Lanjutan'
  publishedAt: string
  tags: string
  estimatedTime: string
  viewCount: string
  transcript: string
  resources: LearningResource[]
}

const videoSourceOptions: { value: VideoType; label: string; icon: typeof Youtube }[] = [
  { value: 'youtube', label: 'YouTube', icon: Youtube },
  { value: 'drive', label: 'Google Drive', icon: Globe },
  { value: 'upload', label: 'Upload File', icon: Upload },
]

const emptyForm: FormData = {
  slug: '',
  title: '',
  description: '',
  thumbnail: '',
  videoType: 'youtube',
  videoUrl: '',
  duration: '00:00',
  category: 'Machine Learning',
  level: 'Pemula',
  publishedAt: new Date().toISOString().split('T')[0],
  tags: '',
  estimatedTime: '',
  viewCount: '0',
  transcript: '',
  resources: [],
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function extractYoutubeId(url: string) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )
  return match ? match[1] : url
}

function extractDriveId(url: string) {
  const match = url.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]+)/)
  return match ? match[1] : url
}

export default function AdminLearningPage() {
  const { data: videos = [], isLoading, refetch } = api.learning.all.useQuery()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const createVideo = api.learning.create.useMutation({
    onSuccess: () => {
      toast.success('Video berhasil ditambahkan')
      setIsOpen(false)
      refetch()
    },
    onError: (e) => toast.error(e.message || 'Gagal menambahkan video'),
  })

  const updateVideo = api.learning.update.useMutation({
    onSuccess: () => {
      toast.success('Video berhasil diperbarui')
      setIsOpen(false)
      setEditingId(null)
      refetch()
    },
    onError: (e) => toast.error(e.message || 'Gagal memperbarui video'),
  })

  const deleteVideo = api.learning.delete.useMutation({
    onSuccess: () => {
      toast.success('Video berhasil dihapus')
      setDeleteConfirm(null)
      refetch()
    },
    onError: (e) => toast.error(e.message || 'Gagal menghapus video'),
  })

  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)
  const [uploading, setUploading] = useState(false)

  const openAdd = () => {
    setEditingId(null)
    setForm({ ...emptyForm })
    setIsOpen(true)
  }

  const openEdit = (v: LearningVideo) => {
    setEditingId(v.id)
    setForm({
      slug: v.slug,
      title: v.title,
      description: v.description,
      thumbnail: v.thumbnail ?? '',
      videoType: v.videoType,
      videoUrl: v.videoUrl,
      duration: v.duration,
      category: v.category,
      level: v.level,
      publishedAt: v.publishedAt,
      tags: (v.tags ?? []).join(', '),
      estimatedTime: v.estimatedTime ?? '',
      viewCount: String(v.viewCount ?? 0),
      transcript: v.transcript ?? '',
      resources: (v.resources as LearningResource[]) ?? [],
    })
    setIsOpen(true)
  }

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith('video/')) {
      toast.error('Hanya file video yang diizinkan')
      return
    }
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload/learning', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setForm((prev) => ({ ...prev, videoUrl: data.url }))
      toast.success('Video berhasil diupload')
    } catch {
      toast.error('Gagal mengupload video')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = () => {
    if (!form.title.trim()) {
      toast.error('Judul wajib diisi')
      return
    }
    if (!form.videoUrl.trim()) {
      toast.error(
        form.videoType === 'youtube'
          ? 'YouTube ID/URL wajib diisi'
          : form.videoType === 'drive'
          ? 'Google Drive URL wajib diisi'
          : 'File video wajib diupload'
      )
      return
    }
    const slug = form.slug.trim() || slugify(form.title)
    let videoUrl = form.videoUrl.trim()
    if (form.videoType === 'youtube') {
      videoUrl = extractYoutubeId(videoUrl)
    } else if (form.videoType === 'drive') {
      videoUrl = extractDriveId(videoUrl)
    }
    const payload = {
      slug,
      title: form.title.trim(),
      description: form.description.trim(),
      thumbnail: form.thumbnail.trim() || undefined,
      videoType: form.videoType,
      videoUrl,
      duration: form.duration,
      category: form.category,
      level: form.level,
      publishedAt: form.publishedAt,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      resources: form.resources,
      transcript: form.transcript.trim() || undefined,
      estimatedTime: form.estimatedTime.trim() || undefined,
      viewCount: parseInt(form.viewCount) || 0,
    }

    if (editingId) {
      updateVideo.mutate({ id: editingId, ...payload })
    } else {
      createVideo.mutate(payload)
    }
  }

  const handleDelete = (id: number) => {
    deleteVideo.mutate({ id })
  }

  const addResource = () => {
    setForm((prev) => ({
      ...prev,
      resources: [...prev.resources, { title: '', url: '', type: 'link' as const }],
    }))
  }

  const updateResource = (idx: number, field: keyof LearningResource, value: string) => {
    setForm((prev) => {
      const r = [...prev.resources]
      r[idx] = { ...r[idx], [field]: value }
      return { ...prev, resources: r }
    })
  }

  const removeResource = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      resources: prev.resources.filter((_, i) => i !== idx),
    }))
  }

  const isMutating = createVideo.isPending || updateVideo.isPending

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface dark:bg-dark-surface">
        <Loader2 className="size-8 animate-spin text-navy dark:text-navy-300" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface dark:bg-dark-surface">
      <div className="container py-20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-text-primary dark:text-dark-text-primary">
              Video Pembelajaran
            </h1>
            <p className="mt-1 text-text-secondary dark:text-dark-text-secondary">
              Kelola video pembelajaran Learning Center
            </p>
          </div>
          <button onClick={openAdd} className="btn-primary gap-2">
            <Plus className="size-4" />
            Tambah Video
          </button>
        </div>

        {videos.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center text-center">
            <div className="flex size-20 items-center justify-center rounded-2xl bg-navy-50 dark:bg-navy-900/40">
              <Video className="size-10 text-navy-500 dark:text-navy-300" />
            </div>
            <h2 className="mt-4 font-display text-xl font-bold text-text-primary dark:text-dark-text-primary">
              Belum ada video
            </h2>
            <p className="mt-2 max-w-sm text-text-secondary dark:text-dark-text-secondary">
              Tambah video pembelajaran pertama Anda untuk tampil di Learning Center.
            </p>
            <button onClick={openAdd} className="btn-primary mt-6 gap-2">
              <Plus className="size-4" />
              Tambah Video
            </button>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {videos.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-4 rounded-2xl border border-border/50 bg-white/40 p-4 backdrop-blur-sm dark:border-dark-border/30 dark:bg-dark-surface-card/40"
              >
                <div className="relative aspect-video w-36 shrink-0 overflow-hidden rounded-xl bg-navy-100 dark:bg-navy-900/40">
                  {v.thumbnail ? (
                    <img
                      src={v.thumbnail}
                      alt={v.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Video className="size-6 text-navy-400" />
                    </div>
                  )}
                  <div className="absolute bottom-1 right-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white">
                    {v.duration}
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-text-primary dark:text-dark-text-primary">
                    {v.title}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-text-tertiary dark:text-dark-text-tertiary">
                    <span className="inline-flex items-center gap-1">
                      {v.videoType === 'youtube' ? (
                        <Youtube className="size-3" />
                      ) : v.videoType === 'drive' ? (
                        <Globe className="size-3" />
                      ) : (
                        <Upload className="size-3" />
                      )}
                      {v.videoType}
                    </span>
                    <span>&middot;</span>
                    <span>{v.category}</span>
                    <span>&middot;</span>
                    <span>{v.level}</span>
                    <span>&middot;</span>
                    <span>{v.duration}</span>
                    {v.tags && v.tags.length > 0 && (
                      <>
                        <span>&middot;</span>
                        <span>{v.tags.length} tag</span>
                      </>
                    )}
                    {v.resources && v.resources.length > 0 && (
                      <>
                        <span>&middot;</span>
                        <span>{v.resources.length} resource</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CustomLink
                    href={`/learning/${v.slug}`}
                    external
                    className="flex size-9 items-center justify-center rounded-xl text-text-tertiary transition-colors hover:bg-gray-100 hover:text-navy dark:text-dark-text-tertiary dark:hover:bg-dark-surface-tertiary dark:hover:text-navy-300"
                    aria-label="Lihat video"
                  >
                    <ExternalLink className="size-4" />
                  </CustomLink>
                  <button
                    onClick={() => openEdit(v)}
                    className="flex size-9 items-center justify-center rounded-xl text-text-tertiary transition-colors hover:bg-gray-100 hover:text-navy dark:text-dark-text-tertiary dark:hover:bg-dark-surface-tertiary dark:hover:text-navy-300"
                    aria-label="Edit video"
                  >
                    <Edit3 className="size-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(v.id)}
                    className="flex size-9 items-center justify-center rounded-xl text-text-tertiary transition-colors hover:bg-red-50 hover:text-red-600 dark:text-dark-text-tertiary dark:hover:bg-red-900/20 dark:hover:text-red-400"
                    aria-label="Hapus video"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {deleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
              onClick={() => setDeleteConfirm(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="mx-4 w-full max-w-sm rounded-2xl border border-border bg-surface p-6 shadow-elevated dark:border-dark-border dark:bg-dark-surface-card"
                onClick={(e) => e.stopPropagation()}
              >
                <AlertTriangle className="size-10 text-red-400" />
                <h3 className="mt-3 font-display text-lg font-bold text-text-primary dark:text-dark-text-primary">
                  Hapus Video
                </h3>
                <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                  Video yang dihapus tidak dapat dikembalikan.
                </p>
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="btn-secondary flex-1"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => handleDelete(deleteConfirm)}
                    disabled={deleteVideo.isPending}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                  >
                    {deleteVideo.isPending && <Loader2 className="size-4 animate-spin" />}
                    Hapus
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/30 backdrop-blur-sm py-10"
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="mx-4 w-full max-w-2xl rounded-2xl border border-border bg-surface p-6 shadow-elevated dark:border-dark-border dark:bg-dark-surface-card"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl font-bold text-text-primary dark:text-dark-text-primary">
                    {editingId ? 'Edit Video' : 'Tambah Video'}
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex size-9 items-center justify-center rounded-xl text-text-tertiary transition-colors hover:bg-gray-100 dark:hover:bg-dark-surface-tertiary"
                  >
                    <X className="size-5" />
                  </button>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-text-primary dark:text-dark-text-primary">
                      Judul
                    </label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          title: e.target.value,
                          slug: editingId ? prev.slug : slugify(e.target.value),
                        }))
                      }
                      className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-navy-400 focus:ring-2 focus:ring-navy-500/20 dark:border-dark-border dark:bg-dark-surface-tertiary dark:text-dark-text-primary"
                      placeholder="Contoh: Pengantar Machine Learning"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-primary dark:text-dark-text-primary">
                      Slug
                    </label>
                    <input
                      type="text"
                      value={form.slug}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, slug: e.target.value }))
                      }
                      className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-navy-400 focus:ring-2 focus:ring-navy-500/20 dark:border-dark-border dark:bg-dark-surface-tertiary dark:text-dark-text-primary"
                      placeholder="pengantar-machine-learning"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-primary dark:text-dark-text-primary">
                      Kategori
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, category: e.target.value }))
                      }
                      className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-navy-400 focus:ring-2 focus:ring-navy-500/20 dark:border-dark-border dark:bg-dark-surface-tertiary dark:text-dark-text-primary"
                    >
                      {learningCategories.filter((c) => c !== 'Semua').map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-primary dark:text-dark-text-primary">
                      Level
                    </label>
                    <select
                      value={form.level}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          level: e.target.value as 'Pemula' | 'Menengah' | 'Lanjutan',
                        }))
                      }
                      className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-navy-400 focus:ring-2 focus:ring-navy-500/20 dark:border-dark-border dark:bg-dark-surface-tertiary dark:text-dark-text-primary"
                    >
                      <option value="Pemula">Pemula</option>
                      <option value="Menengah">Menengah</option>
                      <option value="Lanjutan">Lanjutan</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-text-primary dark:text-dark-text-primary">
                      Sumber Video
                    </label>
                    <div className="flex gap-3">
                      {videoSourceOptions.map((opt) => {
                        const Icon = opt.icon
                        return (
                          <button
                            key={opt.value}
                            onClick={() => {
                              setForm((prev) => ({
                                ...prev,
                                videoType: opt.value,
                                videoUrl: '',
                              }))
                            }}
                            className={cn(
                              'flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all',
                              form.videoType === opt.value
                                ? 'border-navy-400 bg-navy-50 text-navy-700 dark:border-navy-500 dark:bg-navy-900/30 dark:text-navy-200'
                                : 'border-border text-text-tertiary hover:border-navy-300 hover:text-navy-600 dark:border-dark-border dark:text-dark-text-tertiary dark:hover:border-navy-600 dark:hover:text-navy-300'
                            )}
                          >
                            <Icon className="size-4" />
                            {opt.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-text-primary dark:text-dark-text-primary">
                      {form.videoType === 'youtube'
                        ? 'YouTube ID / URL'
                        : form.videoType === 'drive'
                        ? 'Google Drive URL / File ID'
                        : 'Upload Video'}
                    </label>
                    {form.videoType === 'upload' ? (
                      <div className="space-y-3">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleUpload(file)
                          }}
                        />
                        {form.videoUrl ? (
                          <div className="flex items-center gap-3 rounded-xl border border-emerald-300 bg-emerald-50/50 px-4 py-3 dark:border-emerald-700 dark:bg-emerald-900/20">
                            <Upload className="size-5 shrink-0 text-emerald-500" />
                            <span className="flex-1 truncate text-sm text-text-secondary dark:text-dark-text-secondary">
                              {form.videoUrl}
                            </span>
                            <button
                              onClick={() => setForm((prev) => ({ ...prev, videoUrl: '' }))}
                              className="text-xs font-medium text-red-500 hover:text-red-600"
                            >
                              Hapus
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-surface px-4 py-6 text-sm text-text-tertiary transition-colors hover:border-navy-400 hover:text-navy-600 dark:border-dark-border dark:bg-dark-surface-tertiary dark:hover:border-navy-500"
                          >
                            {uploading ? (
                              <Loader2 className="size-5 animate-spin" />
                            ) : (
                              <Upload className="size-5" />
                            )}
                            {uploading ? 'Mengupload...' : 'Klik untuk upload file video'}
                          </button>
                        )}
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={form.videoUrl}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, videoUrl: e.target.value }))
                        }
                        className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-navy-400 focus:ring-2 focus:ring-navy-500/20 dark:border-dark-border dark:bg-dark-surface-tertiary dark:text-dark-text-primary"
                        placeholder={
                          form.videoType === 'youtube'
                            ? 'dQw4w9WgXcQ atau https://youtu.be/dQw4w9WgXcQ'
                            : 'https://drive.google.com/file/d/... atau file ID'
                        }
                      />
                    )}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-primary dark:text-dark-text-primary">
                      Durasi
                    </label>
                    <input
                      type="text"
                      value={form.duration}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, duration: e.target.value }))
                      }
                      className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-navy-400 focus:ring-2 focus:ring-navy-500/20 dark:border-dark-border dark:bg-dark-surface-tertiary dark:text-dark-text-primary"
                      placeholder="45:12"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-primary dark:text-dark-text-primary">
                      Tanggal Publikasi
                    </label>
                    <input
                      type="date"
                      value={form.publishedAt}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, publishedAt: e.target.value }))
                      }
                      className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-navy-400 focus:ring-2 focus:ring-navy-500/20 dark:border-dark-border dark:bg-dark-surface-tertiary dark:text-dark-text-primary"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-primary dark:text-dark-text-primary">
                      Waktu Estimasi
                    </label>
                    <input
                      type="text"
                      value={form.estimatedTime}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, estimatedTime: e.target.value }))
                      }
                      className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-navy-400 focus:ring-2 focus:ring-navy-500/20 dark:border-dark-border dark:bg-dark-surface-tertiary dark:text-dark-text-primary"
                      placeholder="2 jam"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-primary dark:text-dark-text-primary">
                      View Count
                    </label>
                    <input
                      type="number"
                      value={form.viewCount}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, viewCount: e.target.value }))
                      }
                      className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-navy-400 focus:ring-2 focus:ring-navy-500/20 dark:border-dark-border dark:bg-dark-surface-tertiary dark:text-dark-text-primary"
                      placeholder="0"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-text-primary dark:text-dark-text-primary">
                      Thumbnail URL (opsional)
                    </label>
                    <input
                      type="text"
                      value={form.thumbnail}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, thumbnail: e.target.value }))
                      }
                      className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-navy-400 focus:ring-2 focus:ring-navy-500/20 dark:border-dark-border dark:bg-dark-surface-tertiary dark:text-dark-text-primary"
                      placeholder="https://img.youtube.com/vi/..."
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-text-primary dark:text-dark-text-primary">
                      Deskripsi
                    </label>
                    <textarea
                      rows={3}
                      value={form.description}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, description: e.target.value }))
                      }
                      className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-navy-400 focus:ring-2 focus:ring-navy-500/20 dark:border-dark-border dark:bg-dark-surface-tertiary dark:text-dark-text-primary"
                      placeholder="Deskripsi materi video..."
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-text-primary dark:text-dark-text-primary">
                      Tags (pisahkan dengan koma)
                    </label>
                    <input
                      type="text"
                      value={form.tags}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, tags: e.target.value }))
                      }
                      className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-navy-400 focus:ring-2 focus:ring-navy-500/20 dark:border-dark-border dark:bg-dark-surface-tertiary dark:text-dark-text-primary"
                      placeholder="machine learning, python, AI"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-text-primary dark:text-dark-text-primary">
                      Transcript / Ringkasan (opsional)
                    </label>
                    <textarea
                      rows={3}
                      value={form.transcript}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, transcript: e.target.value }))
                      }
                      className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-navy-400 focus:ring-2 focus:ring-navy-500/20 dark:border-dark-border dark:bg-dark-surface-tertiary dark:text-dark-text-primary"
                      placeholder="Ringkasan materi video..."
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-between">
                      <label className="mb-1.5 block text-sm font-medium text-text-primary dark:text-dark-text-primary">
                        Resources
                      </label>
                      <button
                        onClick={addResource}
                        className="text-xs font-medium text-navy transition-colors hover:text-navy-600 dark:text-navy-300"
                      >
                        + Tambah Resource
                      </button>
                    </div>
                    {form.resources.length === 0 ? (
                      <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
                        Belum ada resource.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {form.resources.map((r, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 rounded-xl border border-border/50 bg-surface p-3 dark:border-dark-border/50 dark:bg-dark-surface-tertiary/50"
                          >
                            <div className="grid flex-1 gap-2 sm:grid-cols-3">
                              <input
                                type="text"
                                value={r.title}
                                onChange={(e) => updateResource(idx, 'title', e.target.value)}
                                className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-text-primary outline-none focus:border-navy-400 dark:border-dark-border dark:bg-dark-surface-tertiary dark:text-dark-text-primary"
                                placeholder="Judul"
                              />
                              <input
                                type="text"
                                value={r.url}
                                onChange={(e) => updateResource(idx, 'url', e.target.value)}
                                className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-text-primary outline-none focus:border-navy-400 dark:border-dark-border dark:bg-dark-surface-tertiary dark:text-dark-text-primary"
                                placeholder="URL"
                              />
                              <select
                                value={r.type}
                                onChange={(e) => updateResource(idx, 'type', e.target.value)}
                                className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-text-primary outline-none focus:border-navy-400 dark:border-dark-border dark:bg-dark-surface-tertiary dark:text-dark-text-primary"
                              >
                                <option value="slide">Slide</option>
                                <option value="pdf">PDF</option>
                                <option value="dataset">Dataset</option>
                                <option value="github">GitHub</option>
                                <option value="link">Link</option>
                              </select>
                            </div>
                            <button
                              onClick={() => removeResource(idx)}
                              className="flex size-8 shrink-0 items-center justify-center rounded-lg text-text-tertiary transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 flex justify-end gap-3 border-t border-border pt-5 dark:border-dark-border">
                  <button onClick={() => setIsOpen(false)} className="btn-secondary">
                    Batal
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isMutating}
                    className="btn-primary gap-2"
                  >
                    {isMutating && <Loader2 className="size-4 animate-spin" />}
                    <Save className="size-4" />
                    {editingId ? 'Perbarui' : 'Simpan'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
