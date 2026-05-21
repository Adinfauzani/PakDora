'use client'

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
} from 'lucide-react'
import CustomLink from '@/components/Link'
import { FadeInView, StaggerGrid, StaggerItem } from '@/components/animations'

const contacts = [
  {
    icon: Mail,
    label: 'Email',
    value: 'dorabernandismen@university.ac.id',
    href: 'mailto:dorabernandismen@university.ac.id',
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
    href: '#',
  },
  {
    icon: BookOpen,
    label: 'Publications',
    value: 'Sinta',
    href: '#',
  },
]

const socials = [
  { icon: Github, name: 'GitHub', href: '#', hoverColor: 'group-hover:text-gray-900 dark:group-hover:text-white' },
  { icon: Linkedin, name: 'LinkedIn', href: '#', hoverColor: 'group-hover:text-blue-600' },
  { icon: Youtube, name: 'YouTube', href: '#', hoverColor: 'group-hover:text-red-600' },
  { icon: Instagram, name: 'Instagram', href: '#', hoverColor: 'group-hover:text-pink-500' },
]

export default function ContactPage() {
  return (
    <div className="container py-12 sm:py-20">
      <StaggerGrid className="mx-auto max-w-4xl space-y-12">
        <StaggerItem>
          <FadeInView>
            <h1 className="gradient-text font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Contact
            </h1>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-text-secondary dark:text-dark-text-secondary">
              I&apos;m always open to collaboration, research discussions, or
              just a friendly chat. Feel free to reach out.
            </p>
          </FadeInView>
        </StaggerItem>

        <StaggerItem>
          <div className="grid gap-4 sm:grid-cols-2">
            {contacts.map((item) => {
              const Icon = item.icon
              const content = (
                <div className="card-hover flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-navy-50 dark:bg-navy-900/30">
                    <Icon className="size-5 text-navy-600 dark:text-navy-300" />
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
        </StaggerItem>

        <StaggerItem>
          <FadeInView>
            <h2 className="font-display text-xl font-semibold text-text-primary dark:text-dark-text-primary">
              Social Media
            </h2>
          </FadeInView>
          <FadeInView delay={0.1}>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {socials.map((item) => {
                const Icon = item.icon
                return (
                  <CustomLink
                    key={item.name}
                    href={item.href}
                    className="card-hover group flex items-center gap-4"
                  >
                    <Icon
                      className={`size-5 text-text-secondary transition-colors duration-200 dark:text-dark-text-secondary ${item.hoverColor}`}
                    />
                    <span className="flex-1 text-sm font-medium text-text-primary dark:text-dark-text-primary">
                      {item.name}
                    </span>
                    <span className="text-xs font-medium text-text-secondary transition-colors duration-200 group-hover:text-navy-600 dark:text-dark-text-secondary dark:group-hover:text-navy-300">
                      Connect
                    </span>
                  </CustomLink>
                )
              })}
            </div>
          </FadeInView>
        </StaggerItem>

        <StaggerItem>
          <FadeInView>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-navy-50/50 p-4 dark:border-dark-border dark:bg-navy-900/20">
              <Clock className="size-5 shrink-0 text-navy-600 dark:text-navy-300" />
              <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                I typically respond within 24&ndash;48 hours.
              </p>
            </div>
          </FadeInView>
        </StaggerItem>
      </StaggerGrid>
    </div>
  )
}
