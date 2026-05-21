import type { CourseData } from '@/types/materi'

export const courseData: CourseData = {
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
  modules: [
    {
      week: 1,
      title: 'Pengantar Rekayasa Perangkat Lunak',
      description:
        'Konsep dasar RPL, Software Development Life Cycle (SDLC), perbandingan model Waterfall dan Agile.',
      body: `**Rekayasa Perangkat Lunak (RPL)** atau Software Engineering adalah pendekatan sistematis, terukur, dan terstruktur untuk pengembangan, pengoperasian, dan pemeliharaan perangkat lunak. RPL berbeda dengan pemrograman biasa karena mencakup seluruh aspek produksi perangkat lunak mulai dari **analisis kebutuhan**, **perancangan**, **implementasi**, **pengujian**, hingga **pemeliharaan** secara profesional dan terdokumentasi.

**Software Development Life Cycle (SDLC)** adalah kerangka kerja yang mendefinisikan tahapan-tahapan dalam pengembangan perangkat lunak. Tahapan utama SDLC meliputi: **(1) Requirements Analysis** (mengumpulkan dan menganalisis kebutuhan pengguna), **(2) Design** (merancang arsitektur dan detail teknis), **(3) Implementation** (menulis kode program), **(4) Testing** (memverifikasi dan memvalidasi perangkat lunak), **(5) Deployment** (merilis perangkat lunak ke pengguna), dan **(6) Maintenance** (memperbaiki bug dan menambahkan fitur).

**Model Waterfall** adalah pendekatan SDLC tradisional yang bersifat **linear dan sekuensial**. Setiap tahap harus diselesaikan sepenuhnya sebelum melanjutkan ke tahap berikutnya. Kelebihan Waterfall meliputi dokumentasi yang lengkap, struktur yang jelas, dan mudah dikelola untuk proyek dengan kebutuhan yang stabil. Namun, Waterfall memiliki kelemahan dalam menangani perubahan kebutuhan dan kurang melibatkan pengguna selama proses pengembangan.

**Metodologi Agile** hadir sebagai alternatif untuk mengatasi kelemahan Waterfall. Agile bersifat **iteratif dan inkremental**, dengan siklus pengembangan pendek (sprint) yang menghasilkan **working software** secara berkala. Prinsip-prinsip Agile tercantum dalam **Agile Manifesto** yang menekankan interaksi individu, perangkat lunak yang berfungsi, kolaborasi dengan pelanggan, dan respons terhadap perubahan. Framework Agile populer meliputi **Scrum**, **Kanban**, dan **Extreme Programming (XP)**.

Pada pertemuan ini, mahasiswa akan mempelajari perbandingan mendalam antara Waterfall dan Agile, serta kapan masing-masing model tepat digunakan. Mahasiswa juga akan diperkenalkan dengan peran-peran dalam tim pengembangan perangkat lunak seperti **Project Manager**, **Business Analyst**, **Software Engineer**, **QA Engineer**, dan **DevOps Engineer**.`,
      pdfUrl: '/static/materi/TI401/minggu1-slides.pdf',
      videoUrl: 'https://www.youtube.com/embed/8x6N6r8qk4I',
      assignments: [
        {
          title: 'Perbandingan Model SDLC',
          description:
            'Buat tabel perbandingan antara model Waterfall dan Agile (Scrum) berdasarkan aspek: fleksibilitas, dokumentasi, keterlibatan pengguna, waktu pengiriman, manajemen risiko, dan cocok untuk proyek. Berikan contoh proyek yang cocok untuk masing-masing model.',
        },
        {
          title: 'Studi Kasus: Analisis Kebutuhan',
          description:
            'Pilih sebuah aplikasi yang sering Anda gunakan (e-commerce, e-learning, atau sosial media). Tuliskan minimal 10 kebutuhan fungsional dan 5 kebutuhan non-fungsional untuk aplikasi tersebut. Gunakan format **User Story** untuk menuliskan kebutuhan fungsional.',
          fileUrl: '/static/materi/TI401/tugas/minggu1-user-story.docx',
        },
      ],
      references: [
        {
          title: 'What is SDLC? - TutorialsPoint',
          url: 'https://www.tutorialspoint.com/sdlc/sdlc_overview.htm',
          description:
            'Panduan lengkap tentang Software Development Life Cycle.',
        },
        {
          title: 'Agile Manifesto',
          url: 'https://agilemanifesto.org/',
          description:
            'Dokumen asli Agile Manifesto beserta prinsip-prinsipnya.',
        },
        {
          title: 'Scrum Guide',
          url: 'https://scrumguides.org/',
          description:
            'Panduan resmi framework Scrum.',
        },
      ],
    },
  ],
}
