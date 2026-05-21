'use client'

import { api } from '@/trpc/react'
import { Mail, Quote } from 'lucide-react'

export default function AdminContactPage() {
  const { data: messages } = api.contact.all.useQuery()

  return (
    <div className="min-h-screen bg-surface dark:bg-dark-surface">
      <div className="container py-20">
        <h1 className="font-display text-3xl font-bold text-text-primary dark:text-dark-text-primary">
          Contact Messages
        </h1>
        <p className="mt-1 text-text-secondary dark:text-dark-text-secondary">
          {messages?.length ?? 0} pesan dari pengunjung
        </p>

        <div className="mt-8 space-y-4">
          {messages && messages.length > 0 ? (
            messages.map((msg) => (
              <div
                key={msg.id}
                className="rounded-2xl border border-border/50 bg-white/40 p-5 backdrop-blur-sm dark:border-dark-border/30 dark:bg-dark-surface-card/40"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-50 dark:bg-navy-900/30">
                    <Mail className="h-5 w-5 text-navy dark:text-navy-300" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-text-primary dark:text-dark-text-primary">
                        {msg.name}
                      </p>
                      <span className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
                        &lt;{msg.email}&gt;
                      </span>
                    </div>
                    {msg.subject && (
                      <p className="mt-0.5 text-sm font-medium text-text-secondary dark:text-dark-text-secondary">
                        {msg.subject}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                      {msg.message}
                    </p>
                    <p className="mt-2 text-xs text-text-tertiary dark:text-dark-text-tertiary">
                      {new Date(msg.createdAt!).toLocaleDateString('id-ID', {
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
                Belum ada pesan kontak
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
