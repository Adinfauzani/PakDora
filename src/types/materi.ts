export interface CourseMeta {
  id: string
  title: string
  code: string
  semester: string
  sks: string
  description: string
  instructor: string
  totalWeeks: number
  updatedAt: string
}

export interface WeekModule {
  week: number
  title: string
  description: string
  body?: string
  pdfUrl?: string
  videoUrl?: string
  assignments?: { title: string; description: string; fileUrl?: string }[]
  references?: { title: string; url: string; description?: string }[]
}

export interface CourseData extends CourseMeta {
  modules: WeekModule[]
}
