'use client'

import { useState } from 'react'
import {
  Mail,
  MapPin,
  Microscope,
  BookOpen,
  Github,
  Linkedin,
  Youtube,
  Instagram,
  Clock,
  Send,
  CheckCircle,
} from 'lucide-react'
import CustomLink from '@/components/Link'
import { FadeInView } from '@/components/animations'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/trpc/react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import socialsData from '@/data/socials.json'
import profileData from '@/data/profile.json'
import type { Socials } from '@/types/data'

const socials = socialsData as Socials

const contacts = [
  {
    icon: Mail,
    label: 'Email',
    value: socials.email,
    href: `mailto:${socials.email}`,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Indonesia',
  },
  {
    icon: Microscope,
    label: 'Research',
    value: 'Google Scholar',
    href: socials.googleScholar,
  },
  {
    icon: BookOpen,
    label: 'Publications',
    value: 'Sinta',
    href: socials.sinta,
  },
]

const socialLinks = [
  { icon: Github, name: 'GitHub', href: socials.github, color: 'hover:text-gray-900 dark:hover:text-white' },
  { icon: Linkedin, name: 'LinkedIn', href: socials.linkedin, color: 'hover:text-blue-600' },
  { icon: Youtube, name: 'YouTube', href: socials.youtube, color: 'hover:text-red-600' },
  { icon: Instagram, name: 'Instagram', href: socials.instagram, color: 'hover:text-pink-500' },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const sendMessage = api.contact.send.useMutation({
    onSuccess: () => {
      toast.success('Pesan berhasil dikirim!')
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
    },
    onError: () => {
      toast.error('Gagal mengirim pesan. Silakan coba lagi.')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    sendMessage.mutate(formData)
  }

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-surface via-navy-50/20 to-surface pb-16 pt-24 dark:border-dark-border dark:from-dark-surface dark:via-navy-950/20 dark:to-dark-surface">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gold-200/20 blur-3xl dark:bg-gold-500/5" />
        <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-navy-200/20 blur-3xl dark:bg-navy-500/5" />

        <FadeInView>
          <div className="container relative z-10 text-center">
            <h1 className="gradient-text font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Contact
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary dark:text-dark-text-secondary">
              Saya selalu terbuka untuk kolaborasi, diskusi riset, atau sekadar obrolan
              santai. Jangan ragu untuk menghubungi.
            </p>
          </div>
        </FadeInView>
      </section>

      <section className="container py-16">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <FadeInView>
              <h2 className="font-display text-xl font-bold text-text-primary dark:text-dark-text-primary">
                Informasi Kontak
              </h2>
              <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                Hubungi saya melalui berbagai kanal berikut.
              </p>
            </FadeInView>

            <div className="mt-6 space-y-4">
              {contacts.map((item) => {
                const Icon = item.icon
                const content = (
                  <div className="card-hover flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-50 dark:bg-navy-900/30">
                      <Icon className="h-5 w-5 text-navy-600 dark:text-navy-300" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wider text-text-secondary dark:text-dark-text-secondary">
                        {item.label}
                      </p>
                      <p className="mt-0.5 truncate text-sm font-medium text-text-primary dark:text-dark-text-primary">
                        {item.value}
                      </p>
                    </div>
                  </div>
                )

                return item.href ? (
                  <CustomLink key={item.label} href={item.href}>
                    {content}
                  </CustomLink>
                ) : (
                  <div key={item.label}>{content}</div>
                )
              })}
            </div>

            <FadeInView delay={0.2}>
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">
                  Social Media
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {socialLinks.map((item) => {
                    const Icon = item.icon
                    return (
                      <CustomLink
                        key={item.name}
                        href={item.href}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-dark-border dark:bg-dark-surface dark:text-dark-text-secondary"
                      >
                        <Icon className={cn('h-4 w-4 transition-colors', item.color)} />
                      </CustomLink>
                    )
                  })}
                </div>
              </div>
            </FadeInView>

            <FadeInView delay={0.3}>
              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-border bg-navy-50/50 p-4 dark:border-dark-border dark:bg-navy-900/20">
                <Clock className="h-5 w-5 shrink-0 text-navy-600 dark:text-navy-300" />
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                  Saya biasanya merespons dalam 24&ndash;48 jam.
                </p>
              </div>
            </FadeInView>
          </div>

          <div className="lg:col-span-3">
            <FadeInView>
              <h2 className="font-display text-xl font-bold text-text-primary dark:text-dark-text-primary">
                Kirim Pesan
              </h2>
              <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                Isi form di bawah ini dan saya akan menghubungi Anda kembali.
              </p>
            </FadeInView>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 flex flex-col items-center rounded-2xl border border-emerald-200 bg-emerald-50 p-10 text-center dark:border-emerald-900/50 dark:bg-emerald-950/20"
              >
                <CheckCircle className="h-12 w-12 text-emerald" />
                <h3 className="mt-4 font-display text-lg font-bold text-text-primary dark:text-dark-text-primary">
                  Pesan Terkirim!
                </h3>
                <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                  Terima kasih telah menghubungi. Saya akan merespons pesan Anda segera.
                </p>
                <Button
                  variant="secondary"
                  className="mt-6"
                  onClick={() => setSubmitted(false)}
                >
                  Kirim Pesan Lain
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    id="contact-name"
                    label="Nama"
                    placeholder="Nama lengkap Anda"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <Input
                    id="contact-email"
                    label="Email"
                    type="email"
                    placeholder="email@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <Input
                  id="contact-subject"
                  label="Subjek"
                  placeholder="Subjek pesan"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
                <Textarea
                  id="contact-message"
                  label="Pesan"
                  placeholder="Tulis pesan Anda di sini..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                />
                <Button
                  type="submit"
                  loading={sendMessage.isPending}
                  disabled={sendMessage.isPending}
                  className="w-full"
                >
                  <Send className="h-4 w-4" />
                  Kirim Pesan
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}


