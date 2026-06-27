import type { LearningVideo } from '@/types/learning'

export const learningVideos: LearningVideo[] = []

export const learningCategories = [
  'Semua',
  'Machine Learning',
  'Data Science',
  'Artificial Intelligence',
  'Statistik',
  'Workshop',
  'Seminar',
  'Public Lecture',
] as const

export function getLearningVideoBySlug(slug: string) {
  return learningVideos.find((v) => v.slug === slug) ?? null
}

export function getRelatedVideos(video: LearningVideo, limit = 4) {
  return learningVideos
    .filter(
      (v) =>
        v.id !== video.id &&
        (v.category === video.category ||
          v.tags.some((t) => video.tags.includes(t)))
    )
    .slice(0, limit)
}
