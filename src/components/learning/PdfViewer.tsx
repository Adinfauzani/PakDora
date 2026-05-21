'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Document, Page } from 'react-pdf'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Plus,
  Minus,
  Maximize2,
  Minimize2,
  FileDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  AlertCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface PdfViewerProps {
  url?: string
  title?: string
}

export default function PdfViewer({ url, title }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState('1')
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setPageNumber(1)
    setInputValue('1')
    setScale(1)
    setIsLoading(true)
    setError(null)
    setNumPages(0)
  }, [url])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') {
        setPageNumber((prev) => {
          const next = Math.max(prev - 1, 1)
          setInputValue(String(next))
          return next
        })
      } else if (e.key === 'ArrowRight') {
        setPageNumber((prev) => {
          const next = Math.min(prev + 1, numPages)
          setInputValue(String(next))
          return next
        })
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [numPages])

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const handleLoadSuccess = useCallback(
    ({ numPages: pages }: { numPages: number }) => {
      setNumPages(pages)
      setIsLoading(false)
      setError(null)
    },
    []
  )

  const handleLoadError = useCallback((err: Error) => {
    setIsLoading(false)
    setError(err.message || 'Gagal memuat PDF')
  }, [])

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3))
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5))
  const resetZoom = () => setScale(1)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  const goToPage = (page: number) => {
    const p = Math.max(1, Math.min(page, numPages))
    setPageNumber(p)
    setInputValue(String(p))
  }

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handlePageInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      const p = parseInt(inputValue, 10)
      if (!isNaN(p)) goToPage(p)
      inputRef.current?.blur()
    }
  }

  const handlePageInputBlur = () => {
    const p = parseInt(inputValue, 10)
    if (isNaN(p) || p < 1 || p > numPages) {
      setInputValue(String(pageNumber))
    } else {
      goToPage(p)
    }
  }

  const btnClass =
    'flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-text-secondary transition-colors duration-200 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-dark-text-secondary dark:hover:bg-dark-surface-tertiary'

  if (!url) {
    return (
      <div className="flex aspect-[4/3] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface dark:border-dark-border dark:bg-dark-surface">
        <FileText className="mb-3 size-12 text-text-tertiary dark:text-dark-text-tertiary" />
        <p className="font-medium text-text-secondary dark:text-dark-text-secondary">
          Tidak ada materi PDF
        </p>
        <p className="mt-1 text-sm text-text-tertiary dark:text-dark-text-tertiary">
          Modul ini belum memiliki file PDF
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex aspect-[4/3] flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/20">
        <AlertCircle className="mb-3 size-12 text-red-400" />
        <p className="font-medium text-red-600 dark:text-red-400">
          Gagal memuat PDF
        </p>
        <p className="mt-1 max-w-md text-center text-sm text-red-500 dark:text-red-400/80">
          {error}
        </p>
        <button
          onClick={() => {
            setIsLoading(true)
            setError(null)
          }}
          className="btn-ghost mt-4 text-sm"
        >
          Coba lagi
        </button>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'overflow-hidden rounded-2xl border border-border bg-surface dark:border-dark-border dark:bg-dark-surface',
        isFullscreen && 'fixed inset-0 z-50 rounded-none'
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-3 py-2 dark:border-dark-border">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => goToPage(pageNumber - 1)}
            disabled={pageNumber <= 1}
            className={btnClass}
            aria-label="Halaman sebelumnya"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex items-center gap-1">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handlePageInputChange}
              onKeyDown={handlePageInputKeyDown}
              onBlur={handlePageInputBlur}
              className="w-10 rounded-md border border-border bg-transparent px-1 py-1 text-center text-sm font-medium text-text-primary outline-none focus:border-navy dark:border-dark-border dark:text-dark-text-primary dark:focus:border-navy-500"
              aria-label="Nomor halaman"
            />
            <span className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
              / {numPages}
            </span>
          </div>
          <button
            onClick={() => goToPage(pageNumber + 1)}
            disabled={pageNumber >= numPages}
            className={btnClass}
            aria-label="Halaman berikutnya"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={zoomOut}
            disabled={scale <= 0.5}
            className={btnClass}
            aria-label="Perkecil"
          >
            <Minus className="size-5" />
          </button>
          <button
            onClick={resetZoom}
            className="min-h-[36px] min-w-[48px] rounded-md px-2 text-sm font-semibold text-navy transition-colors hover:bg-navy-50 dark:text-navy-300 dark:hover:bg-navy-900/30"
            title="Klik untuk reset ke 100%"
          >
            {Math.round(scale * 100)}%
          </button>
          <button
            onClick={zoomIn}
            disabled={scale >= 3}
            className={btnClass}
            aria-label="Perbesar"
          >
            <Plus className="size-5" />
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <a
            href={url}
            download
            className={btnClass}
            aria-label="Download PDF"
          >
            <FileDown className="size-5" />
          </a>
          <button
            onClick={toggleFullscreen}
            className={btnClass}
            aria-label={isFullscreen ? 'Keluar fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? (
              <Minimize2 className="size-5" />
            ) : (
              <Maximize2 className="size-5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex justify-center overflow-auto bg-navy-50/30 p-4 dark:bg-navy-900/10">
        {isLoading && (
          <div className="flex aspect-[3/4] w-full max-w-3xl flex-col gap-4 p-8">
            <div className="h-6 w-3/4 animate-shimmer rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-dark-surface-tertiary dark:via-dark-surface-secondary dark:to-dark-surface-tertiary bg-[length:200%_100%]" />
            <div className="h-4 w-1/2 animate-shimmer rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-dark-surface-tertiary dark:via-dark-surface-secondary dark:to-dark-surface-tertiary bg-[length:200%_100%]" />
            <div className="mt-4 flex-1 animate-shimmer rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-dark-surface-tertiary dark:via-dark-surface-secondary dark:to-dark-surface-tertiary bg-[length:200%_100%]" />
            <div className="mt-4 h-4 w-full animate-shimmer rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-dark-surface-tertiary dark:via-dark-surface-secondary dark:to-dark-surface-tertiary bg-[length:200%_100%]" />
            <div className="h-4 w-5/6 animate-shimmer rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-dark-surface-tertiary dark:via-dark-surface-secondary dark:to-dark-surface-tertiary bg-[length:200%_100%]" />
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={pageNumber}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Document
              file={url}
              onLoadSuccess={handleLoadSuccess}
              onLoadError={handleLoadError}
              loading={null}
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="rounded-lg shadow-card"
              />
            </Document>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
