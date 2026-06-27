export interface LearningResource {
  title: string
  url: string
  type: 'slide' | 'pdf' | 'dataset' | 'github' | 'link'
}

export type VideoType = 'youtube' | 'drive' | 'upload'

export interface LearningVideo {
  id: number
  slug: string
  title: string
  description: string
  thumbnail: string
  videoType: VideoType
  videoUrl: string
  duration: string
  category: string
  level: 'Pemula' | 'Menengah' | 'Lanjutan'
  publishedAt: string
  tags: string[]
  resources: LearningResource[]
  transcript?: string
  estimatedTime?: string
  viewCount?: number
}
