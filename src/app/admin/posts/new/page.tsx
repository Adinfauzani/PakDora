'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { api } from '@/trpc/react'
import { toast } from 'sonner'

export default function NewPostPage() {
  const router = useRouter()
  const create = api.post.create.useMutation({
    onSuccess: (post) => {
      toast.success('Post berhasil dibuat!')
      router.push('/admin/posts')
    },
    onError: () => toast.error('Gagal membuat post'),
  })

  const [form, setForm] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    tags: '',
    published: false,
    featured: false,
  })

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.summary) return
    create.mutate({
      title: form.title,
      slug: form.slug || generateSlug(form.title),
      summary: form.summary,
      content: form.content,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      published: form.published,
      featured: form.featured,
    })
  }

  return (
    <div className="min-h-screen bg-surface dark:bg-dark-surface">
      <div className="container py-20">
        <Link
          href="/admin/posts"
          className="mb-6 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Posts
        </Link>

        <h1 className="font-display text-3xl font-bold text-text-primary dark:text-dark-text-primary">
          New Post
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 max-w-4xl space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary">
                Title
              </label>
              <input
                value={form.title}
                onChange={(e) => {
                  setForm({ ...form, title: e.target.value })
                  if (!form.slug || form.slug === generateSlug(form.title.split(e.target.value)[0] || '')) {
                    setForm((prev) => ({ ...prev, title: e.target.value, slug: generateSlug(e.target.value) }))
                  }
                }}
                className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none focus:border-navy focus:ring-2 focus:ring-navy/20 dark:border-dark-border dark:bg-dark-surface dark:text-dark-text-primary dark:focus:border-navy-500"
                placeholder="Post title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary">
                Slug
              </label>
              <input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none focus:border-navy focus:ring-2 focus:ring-navy/20 dark:border-dark-border dark:bg-dark-surface dark:text-dark-text-primary dark:focus:border-navy-500"
                placeholder="post-slug"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary">
              Summary
            </label>
            <input
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none focus:border-navy focus:ring-2 focus:ring-navy/20 dark:border-dark-border dark:bg-dark-surface dark:text-dark-text-primary dark:focus:border-navy-500"
              placeholder="Short summary for the blog card"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary">
              Tags (comma separated)
            </label>
            <input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none focus:border-navy focus:ring-2 focus:ring-navy/20 dark:border-dark-border dark:bg-dark-surface dark:text-dark-text-primary dark:focus:border-navy-500"
              placeholder="Sains Data, AI, Pendidikan"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary">
              Content (Markdown)
            </label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="mt-1.5 h-96 w-full rounded-xl border border-border bg-surface px-4 py-3 font-mono text-sm text-text-primary outline-none focus:border-navy focus:ring-2 focus:ring-navy/20 dark:border-dark-border dark:bg-dark-surface dark:text-dark-text-primary dark:focus:border-navy-500"
              placeholder="Write your content in Markdown..."
            />
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2 text-sm text-text-primary dark:text-dark-text-primary">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="rounded border-border text-navy focus:ring-navy dark:border-dark-border"
              />
              <Eye className="h-4 w-4" />
              Published
            </label>
            <label className="flex items-center gap-2 text-sm text-text-primary dark:text-dark-text-primary">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="rounded border-border text-navy focus:ring-navy dark:border-dark-border"
              />
              Featured
            </label>
          </div>

          <button
            type="submit"
            disabled={create.isPending}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-navy px-6 text-sm font-medium text-white transition-all hover:bg-navy-700 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {create.isPending ? 'Saving...' : 'Save Post'}
          </button>
        </form>
      </div>
    </div>
  )
}
