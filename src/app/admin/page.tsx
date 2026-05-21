'use client'

import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { FileText, BookOpen, MessageSquare, Mail, ArrowRight } from 'lucide-react'

const cards = [
  {
    title: 'Blog Posts',
    desc: 'Tulis dan kelola artikel',
    icon: FileText,
    href: '/admin/posts',
    color: 'from-navy to-navy-700',
  },
  {
    title: 'Materi Kuliah',
    desc: 'Upload PDF/PPT kuliah',
    icon: BookOpen,
    href: '/admin/materi',
    color: 'from-gold to-gold-700',
  },
  {
    title: 'Guestbook',
    desc: 'Lihat pesan masuk',
    icon: MessageSquare,
    href: '/admin/guestbook',
    color: 'from-emerald to-emerald-700',
  },
  {
    title: 'Contact',
    desc: 'Lihat pesan kontak',
    icon: Mail,
    href: '/admin/contact',
    color: 'from-navy-600 to-navy-800',
  },
]

export default function AdminDashboard() {
  const { user } = useUser()

  return (
    <div className="min-h-screen bg-surface dark:bg-dark-surface">
      <div className="container py-20">
        <h1 className="font-display text-3xl font-bold text-text-primary dark:text-dark-text-primary">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-text-secondary dark:text-dark-text-secondary">
          Selamat datang, {user?.fullName || 'Admin'}
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <Link
                key={card.title}
                href={card.href}
                className="group rounded-2xl border border-border/50 bg-white/40 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-hover dark:border-dark-border/30 dark:bg-dark-surface-card/40"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm ${card.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-text-primary dark:text-dark-text-primary">
                  {card.title}
                </h3>
                <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                  {card.desc}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-navy transition-all group-hover:gap-2 dark:text-navy-300">
                  Kelola <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
