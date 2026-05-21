import type { CourseMeta } from '@/types/materi'

export const courses: CourseMeta[] = [
  {
    id: 'TI201',
    title: 'Pemrograman Berorientasi Objek',
    code: 'TI201',
    semester: '3',
    sks: '3',
    description:
      'Mata kuliah ini membahas konsep dasar pemrograman berorientasi objek menggunakan bahasa Java, mencakup kelas, objek, enkapsulasi, pewarisan, dan polimorfisme.',
    instructor: 'Dora Bernandismen, S.Kom., M.Si',
    totalWeeks: 14,
    updatedAt: '2026-01-15',
  },
  {
    id: 'TI202',
    title: 'Struktur Data dan Algoritma',
    code: 'TI202',
    semester: '3',
    sks: '3',
    description:
      'Mata kuliah ini membahas berbagai struktur data fundamental dan algoritma pengolahannya, termasuk array, linked list, stack, queue, tree, dan graph.',
    instructor: 'Dora Bernandismen, S.Kom., M.Si',
    totalWeeks: 14,
    updatedAt: '2026-01-15',
  },
  {
    id: 'TI301',
    title: 'Basis Data',
    code: 'TI301',
    semester: '5',
    sks: '3',
    description:
      'Mata kuliah ini membahas konsep sistem basis data, model data relasional, perancangan basis data, dan penggunaan SQL untuk manipulasi data.',
    instructor: 'Dora Bernandismen, S.Kom., M.Si',
    totalWeeks: 14,
    updatedAt: '2026-01-15',
  },
  {
    id: 'TI401',
    title: 'Rekayasa Perangkat Lunak',
    code: 'TI401',
    semester: '7',
    sks: '3',
    description:
      'Mata kuliah ini membahas metodologi pengembangan perangkat lunak mulai dari analisis kebutuhan hingga pemeliharaan, mencakup model Waterfall dan Agile.',
    instructor: 'Dora Bernandismen, S.Kom., M.Si',
    totalWeeks: 14,
    updatedAt: '2026-01-15',
  },
]

export function getCourseById(id: string): CourseMeta | undefined {
  return courses.find((c) => c.id === id)
}
