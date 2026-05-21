'use client'

import {
  Monitor,
  Keyboard,
  Mouse,
  Headphones,
  Code,
  Container,
  Palette,
  FileText,
  Video,
  GraduationCap,
  Beaker,
  CheckSquare,
  Calendar,
  BookMarked,
  Smartphone,
} from 'lucide-react'
import { FadeInView, StaggerGrid, StaggerItem } from '@/components/animations'

const categories = [
  {
    title: 'Hardware',
    items: [
      { icon: Monitor, name: 'MacBook Pro 14" (M3 Pro)', desc: 'Daily driver for development, research, and teaching' },
      { icon: Monitor, name: 'Dell UltraSharp 27" 4K', desc: 'External monitor for extended workspace' },
      { icon: Keyboard, name: 'Keychron K8 Pro', desc: 'Mechanical keyboard with hot-swappable switches' },
      { icon: Mouse, name: 'Logitech MX Master 3S', desc: 'Ergonomic wireless mouse for productivity' },
      { icon: Headphones, name: 'Sony WH-1000XM5', desc: 'Noise-cancelling headphones for deep focus' },
      { icon: Smartphone, name: 'iPhone 15 Pro', desc: 'Daily driver for communication and on-the-go tasks' },
    ],
  },
  {
    title: 'Software & Tools',
    items: [
      { icon: Code, name: 'VS Code', desc: 'Primary code editor with custom keybindings and extensions' },
      { icon: Code, name: 'Neovim', desc: 'Terminal editor for quick edits and config files' },
      { icon: Container, name: 'Docker', desc: 'Containerization for consistent dev environments' },
      { icon: Palette, name: 'Figma', desc: 'UI/UX design and prototyping' },
      { icon: Code, name: 'Postman', desc: 'API development and testing' },
      { icon: FileText, name: 'Notion', desc: 'Documentation, notes, and project management' },
    ],
  },
  {
    title: 'Teaching',
    items: [
      { icon: Video, name: 'Zoom', desc: 'Virtual lectures and office hours' },
      { icon: GraduationCap, name: 'Google Classroom', desc: 'Course management and assignment distribution' },
      { icon: FileText, name: 'LMS Platform', desc: 'Institutional learning management system' },
      { icon: Beaker, name: 'Jupyter Notebook', desc: 'Interactive coding exercises and data analysis demos' },
      { icon: Video, name: 'OBS Studio', desc: 'Lecture recording and screen capture' },
    ],
  },
  {
    title: 'Productivity',
    items: [
      { icon: CheckSquare, name: 'Todoist', desc: 'Task management with GTD methodology' },
      { icon: Calendar, name: 'Google Calendar', desc: 'Schedule management and time blocking' },
      { icon: BookMarked, name: 'Obsidian', desc: 'Personal knowledge management with backlinks' },
      { icon: FileText, name: 'Notion', desc: 'Second brain and project dashboards' },
      { icon: Code, name: 'Arc Browser', desc: 'Daily driver browser with split-view tabs' },
    ],
  },
]

export default function UsesPage() {
  return (
    <div className="container py-12 sm:py-20">
      <StaggerGrid className="mx-auto max-w-3xl space-y-16">
        <StaggerItem>
          <div className="text-center">
            <h1 className="gradient-text font-display text-3xl font-bold tracking-tight sm:text-4xl">
              What I Use
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-text-secondary dark:text-dark-text-secondary">
              Tools, software, and equipment I rely on daily for teaching,
              research, and software development.
            </p>
          </div>
        </StaggerItem>

        {categories.map((category) => (
          <StaggerItem key={category.title}>
            <FadeInView>
              <h2 className="font-display text-xl font-semibold text-text-primary dark:text-dark-text-primary">
                {category.title}
              </h2>
            </FadeInView>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {category.items.map((item) => {
                const Icon = item.icon
                return (
                  <FadeInView key={item.name}>
                    <div className="card-hover flex items-start gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-navy-50 dark:bg-navy-900/30">
                        <Icon className="size-5 text-navy-600 dark:text-navy-300" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
                          {item.name}
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed text-text-secondary dark:text-dark-text-secondary">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </FadeInView>
                )
              })}
            </div>
          </StaggerItem>
        ))}

        <StaggerItem>
          <FadeInView>
            <p className="text-center text-xs text-text-secondary dark:text-dark-text-secondary">
              This page is inspired by{' '}
              <a
                href="https://uses.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-text-primary underline underline-offset-2 hover:text-navy-600 dark:text-dark-text-primary dark:hover:text-navy-300"
              >
                uses.tech
              </a>
            </p>
          </FadeInView>
        </StaggerItem>
      </StaggerGrid>
    </div>
  )
}
