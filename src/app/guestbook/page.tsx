'use client'

import Script from 'next/script'
import { MessageSquare } from 'lucide-react'
import { FadeInView, StaggerGrid, StaggerItem } from '@/components/animations'

export default function GuestbookPage() {
  return (
    <div className="container py-12 sm:py-20">
      <StaggerGrid className="space-y-8">
        <StaggerItem>
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-navy-50 dark:bg-navy-900/30 sm:size-16">
            <MessageSquare className="size-6 text-navy-600 dark:text-navy-300 sm:size-7" />
          </div>
        </StaggerItem>

        <StaggerItem>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary dark:text-dark-text-primary sm:text-4xl">
            Guestbook
          </h1>
        </StaggerItem>

        <StaggerItem>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-text-secondary dark:text-dark-text-secondary">
            Leave a message, suggestion, or question via GitHub Discussions.
          </p>
        </StaggerItem>

        <StaggerItem>
          <div className="card-base mt-8 overflow-hidden p-0">
            <div
              className="giscus"
              data-repo="dorabernandismen/dorabernandismen"
              data-repo-id="R_kgDONXyzAA"
              data-category="Announcements"
              data-category-id="DIC_kwDONXyzAM4Ck8yZ"
              data-mapping="pathname"
              data-strict="0"
              data-reactions-enabled="1"
              data-emit-metadata="0"
              data-input-position="bottom"
              data-theme="dark"
              data-lang="id"
            />
            <Script
              src="https://giscus.app/client.js"
              data-repo="dorabernandismen/dorabernandismen"
              data-repo-id="R_kgDONXyzAA"
              data-category="Announcements"
              data-category-id="DIC_kwDONXyzAM4Ck8yZ"
              data-mapping="pathname"
              data-strict="0"
              data-reactions-enabled="1"
              data-emit-metadata="0"
              data-input-position="bottom"
              data-theme="dark"
              data-lang="id"
              crossOrigin="anonymous"
              async
            />
          </div>
        </StaggerItem>
      </StaggerGrid>
    </div>
  )
}
