'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Send, Github, Quote } from 'lucide-react'
import { FadeInView, StaggerGrid, StaggerItem } from '@/components/animations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/trpc/react'
import { toast } from 'sonner'

export default function GuestbookPage() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data: entries, refetch } = api.guestbook.all.useQuery()
  const addEntry = api.guestbook.add.useMutation({
    onSuccess: () => {
      toast.success('Pesan berhasil dikirim!')
      setName('')
      setMessage('')
      refetch()
    },
    onError: () => {
      toast.error('Gagal mengirim pesan. Silakan coba lagi.')
    },
    onSettled: () => {
      setIsSubmitting(false)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !message) return
    setIsSubmitting(true)
    addEntry.mutate({ name, message })
  }

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-surface via-navy-50/20 to-surface pb-16 pt-24 dark:border-dark-border dark:from-dark-surface dark:via-navy-950/20 dark:to-dark-surface">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gold-200/20 blur-3xl dark:bg-gold-500/5" />
        <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-navy-200/20 blur-3xl dark:bg-navy-500/5" />

        <FadeInView>
          <div className="container relative z-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-50 dark:bg-navy-900/30">
              <MessageSquare className="h-7 w-7 text-navy dark:text-navy-300" />
            </div>
            <h1 className="gradient-text font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Guestbook
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary dark:text-dark-text-secondary">
              Tinggalkan pesan, saran, atau pertanyaan. Setiap masukan sangat berarti.
            </p>
          </div>
        </FadeInView>
      </section>

      <section className="container py-16">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <FadeInView>
              <h2 className="font-display text-xl font-bold text-text-primary dark:text-dark-text-primary">
                Tulis Pesan
              </h2>
              <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                Berikan komentar, saran, atau pertanyaan Anda.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <Input
                  id="guestbook-name"
                  label="Nama"
                  placeholder="Nama Anda"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Textarea
                  id="guestbook-message"
                  label="Pesan"
                  placeholder="Tulis pesan Anda..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                />
                <Button type="submit" disabled={isSubmitting} loading={isSubmitting} className="w-full">
                  <Send className="h-4 w-4" />
                  Kirim Pesan
                </Button>
              </form>
            </FadeInView>
          </div>

          <div className="lg:col-span-3">
            <FadeInView>
              <h2 className="font-display text-xl font-bold text-text-primary dark:text-dark-text-primary">
                Pesan Masuk
              </h2>
              <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                {entries?.length ?? 0} pesan telah dikirim.
              </p>
            </FadeInView>

            <div className="mt-6 space-y-4">
              {entries && entries.length > 0 ? (
                entries.map((entry, i) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="card-hover"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-50 text-sm font-bold text-navy dark:bg-navy-900/40 dark:text-navy-300">
                        {entry.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">
                            {entry.name}
                          </span>
                          {entry.githubUsername && (
                            <Github className="h-3.5 w-3.5 text-text-tertiary" />
                          )}
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
                          {entry.message}
                        </p>
                        <p className="mt-2 text-xs text-text-tertiary dark:text-dark-text-tertiary">
                          {new Date(entry.createdAt!).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  className="flex flex-col items-center justify-center py-16 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Quote className="h-12 w-12 text-text-tertiary dark:text-dark-text-tertiary" />
                  <p className="mt-4 font-display text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                    Belum ada pesan
                  </p>
                  <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                    Jadilah yang pertama meninggalkan pesan!
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
