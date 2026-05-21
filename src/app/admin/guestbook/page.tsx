'use client'

import { useRouter } from 'next/navigation'
import { api } from '@/trpc/react'
import { MessageSquare, Check, Trash2, Quote } from 'lucide-react'

export default function AdminGuestbookPage() {
  const { data: entries, refetch } = api.guestbook.all.useQuery()
  const router = useRouter()

  return (
    <div className="min-h-screen bg-surface dark:bg-dark-surface">
      <div className="container py-20">
        <h1 className="font-display text-3xl font-bold text-text-primary dark:text-dark-text-primary">
          Guestbook
        </h1>
        <p className="mt-1 text-text-secondary dark:text-dark-text-secondary">
          {entries?.length ?? 0} pesan dari pengunjung
        </p>

        <div className="mt-8 space-y-4">
          {entries && entries.length > 0 ? (
            entries.map((entry) => (
              <div
                key={entry.id}
                className="rounded-2xl border border-border/50 bg-white/40 p-5 backdrop-blur-sm dark:border-dark-border/30 dark:bg-dark-surface-card/40"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-50 text-sm font-bold text-navy dark:bg-navy-900/40 dark:text-navy-300">
                    {entry.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-text-primary dark:text-dark-text-primary">
                      {entry.name}
                    </p>
                    <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                      {entry.message}
                    </p>
                    <p className="mt-2 text-xs text-text-tertiary dark:text-dark-text-tertiary">
                      {new Date(entry.createdAt!).toLocaleDateString('id-ID', {
                        year: 'numeric', month: 'long', day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center py-16 text-center">
              <Quote className="h-12 w-12 text-text-tertiary dark:text-dark-text-tertiary" />
              <p className="mt-4 text-text-secondary dark:text-dark-text-secondary">
                Belum ada pesan
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
