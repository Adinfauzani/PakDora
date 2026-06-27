'use client'

import { useState, useCallback } from 'react'
import { AlertTriangle } from 'lucide-react'
import type { VideoType } from '@/types/learning'

interface VideoPlayerProps {
  videoType: VideoType
  videoUrl: string
  title: string
}

function getDriveEmbedUrl(url: string) {
  const match = url.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]+)/)
  return match ? `https://drive.google.com/file/d/${match[1]}/preview` : url
}

export function VideoPlayer({ videoType, videoUrl, title }: VideoPlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
  }, [])

  const handleError = useCallback(() => {
    setHasError(true)
    setIsLoaded(true)
  }, [])

  if (!videoUrl) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-border bg-surface dark:border-dark-border dark:bg-dark-surface">
        <div className="text-center">
          <AlertTriangle className="mx-auto size-8 text-text-tertiary dark:text-dark-text-tertiary" />
          <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">
            Video tidak tersedia
          </p>
        </div>
      </div>
    )
  }

  if (videoType === 'youtube') {
    return (
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-navy-900 shadow-elevated">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-navy-900">
            <div className="size-8 animate-pulse rounded-full border-2 border-white/30 border-t-white" />
          </div>
        )}
        <iframe
          src={`https://www.youtube.com/embed/${videoUrl}?autoplay=1&rel=0&mute=1`}
          title={title}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>
    )
  }

  if (videoType === 'drive') {
    return (
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-navy-900 shadow-elevated">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-navy-900">
            <div className="size-8 animate-pulse rounded-full border-2 border-white/30 border-t-white" />
          </div>
        )}
        <iframe
          src={getDriveEmbedUrl(videoUrl)}
          title={title}
          className="h-full w-full"
          allow="autoplay"
          allowFullScreen
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>
    )
  }

  if (videoType === 'upload') {
    return (
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-elevated">
        {hasError ? (
          <div className="flex aspect-video items-center justify-center">
            <div className="text-center">
              <AlertTriangle className="mx-auto size-8 text-red-400" />
              <p className="mt-2 text-sm text-gray-400">Gagal memuat video</p>
            </div>
          </div>
        ) : (
          <video
            controls
            className="h-full w-full"
            onLoadedData={handleLoad}
            onError={handleError}
            autoPlay
            muted
            playsInline
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}
      </div>
    )
  }

  return null
}
