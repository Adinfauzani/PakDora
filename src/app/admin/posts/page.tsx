'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Plus, FileText, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import { api } from '@/trpc/react'
import { toast } from 'sonner'

export default function AdminPostsPage() {
  const router = useRouter()
  const { data: posts, refetch } = api.post.allAdmin.useQuery()
  const deletePost = api.post.delete.useMutation({
    onSuccess: () => { toast.success('Post dihapus'); refetch() },
    onError: () => toast.error('Gagal menghapus'),
  })

  return (
    <div className="min-h-screen bg-surface dark:bg-dark-surface">
      <div className="container py-20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-text-primary dark:text-dark-text-primary">
              Blog Posts
            </h1>
            <p className="mt-1 text-text-secondary dark:text-dark-text-secondary">
              {posts?.length ?? 0} posts
            </p>
          </div>
          <Link
            href="/admin/posts/new"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-navy px-5 text-sm font-medium text-white transition-all hover:bg-navy-700"
          >
            <Plus className="h-4 w-4" />
            New Post
          </Link>
        </div>

        <div className="mt-8 space-y-3">
          {posts?.map((post) => (
            <div
              key={post.id}
              className="flex items-center gap-4 rounded-2xl border border-border/50 bg-white/40 p-4 backdrop-blur-sm transition-all hover:shadow-sm dark:border-dark-border/30 dark:bg-dark-surface-card/40"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-50 dark:bg-navy-900/30">
                <FileText className="h-5 w-5 text-navy dark:text-navy-300" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-semibold text-text-primary dark:text-dark-text-primary">
                    {post.title}
                  </h3>
                  {post.published ? (
                    <Eye className="h-3.5 w-3.5 shrink-0 text-emerald" />
                  ) : (
                    <EyeOff className="h-3.5 w-3.5 shrink-0 text-text-tertiary" />
                  )}
                </div>
                <p className="truncate text-sm text-text-secondary dark:text-dark-text-secondary">
                  {post.summary}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-text-secondary transition-colors hover:bg-gray-100 dark:text-dark-text-secondary dark:hover:bg-dark-surface-tertiary"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => {
                    if (confirm('Hapus post ini?')) deletePost.mutate({ id: post.id })
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-red-400 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {posts?.length === 0 && (
            <p className="py-10 text-center text-text-tertiary dark:text-dark-text-tertiary">
              Belum ada post. Buat post pertama!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
