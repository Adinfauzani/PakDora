export interface Project {
  id: string
  title: string
  category: 'Research' | 'Community Service' | 'System' | 'Seminar' | 'Book' | 'Pengabdian'
  description: string
  year: string
  status: string
  tech?: string[]
  link?: string
  image?: string
}

export const projects: Project[] = [
  {
    id: 'ai-adaptive-learning',
    title: 'Sistem Adaptive Learning berbasis Kecerdasan Buatan untuk Pendidikan Vokasi',
    category: 'Research',
    description:
      'Penelitian ini mengembangkan platform adaptive learning yang menggunakan algoritma machine learning untuk menyesuaikan materi pembelajaran secara real-time berdasarkan kemampuan dan gaya belajar mahasiswa pada program studi vokasi.',
    year: '2024',
    status: 'In Progress',
    tech: ['Python', 'TensorFlow', 'Flask', 'PostgreSQL'],
    link: '#',
  },
  {
    id: 'data-mining-dropout',
    title: 'Prediksi Risiko Dropout Mahasiswa Menggunakan Teknik Data Mining',
    category: 'Research',
    description:
      'Mengimplementasikan algoritma klasifikasi seperti Random Forest dan XGBoost untuk memprediksi mahasiswa yang berisiko dropout berdasarkan data akademik dan demografis, guna mendukung intervensi dini oleh pihak kampus.',
    year: '2023',
    status: 'Completed',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Jupyter'],
    link: '#',
  },
  {
    id: 'digital-literacy',
    title: 'Pengembangan Literasi Digital bagi Masyarakat Desa di Era Transformasi Digital',
    category: 'Community Service',
    description:
      'Program pengabdian masyarakat yang bertujuan meningkatkan kompetensi literasi digital masyarakat desa melalui pelatihan penggunaan aplikasi produktivitas, keamanan siber dasar, dan pemanfaatan internet untuk usaha mikro.',
    year: '2024',
    status: 'Ongoing',
    tech: ['Canva', 'Google Workspace'],
    link: '#',
  },
  {
    id: 'smart-village',
    title: 'Implementasi Smart Village Berbasis Teknologi Informasi di Desa Binaan',
    category: 'Community Service',
    description:
      'Program pengabdian yang mengintegrasikan sistem informasi desa, pelayanan publik digital, dan pemberdayaan UMKM lokal melalui platform berbasis web untuk mewujudkan konsep smart village yang berkelanjutan.',
    year: '2023',
    status: 'Completed',
    tech: ['Laravel', 'MySQL', 'Tailwind CSS'],
    link: '#',
  },
  {
    id: 'academic-portal',
    title: 'Sistem Informasi Akademik Terpadu berbasis Web untuk Perguruan Tinggi',
    category: 'System',
    description:
      'Perancangan dan pengembangan portal akademik terpadu yang mencakup manajemen kurikulum, penjadwalan kuliah, nilai mahasiswa, dan monitoring akademik secara real-time dengan antarmuka yang responsif.',
    year: '2024',
    status: 'Completed',
    tech: ['Next.js', 'Express', 'PostgreSQL', 'Docker'],
    link: '#',
  },
  {
    id: 'e-learning-platform',
    title: 'Platform E-Learning Interaktif dengan Fitur Collaborative Learning',
    category: 'System',
    description:
      'Membangun sistem e-learning yang mendukung pembelajaran kolaboratif melalui fitur forum diskusi, project-based learning, peer review, dan integrasi video conference untuk meningkatkan engagement mahasiswa.',
    year: '2023',
    status: 'Completed',
    tech: ['React', 'Node.js', 'MongoDB', 'WebRTC'],
    link: '#',
  },
  {
    id: 'buku-informatika',
    title: 'Buku Ajar Dasar-Dasar Pemrograman Web untuk Mahasiswa Vokasi',
    category: 'Book',
    description:
      'Buku ajar komprehensif yang membahas konsep fundamental pemrograman web mulai dari HTML, CSS, JavaScript, hingga pengembangan aplikasi web modern dengan framework terkini, disusun khusus untuk kurikulum pendidikan vokasi.',
    year: '2024',
    status: 'Published',
    link: '#',
  },
  {
    id: 'seminar-ai-pendidikan',
    title: 'Peran Kecerdasan Buatan dalam Revolusi Pendidikan 5.0',
    category: 'Seminar',
    description:
      'Pemakalah pada seminar internasional yang membahas integrasi teknologi kecerdasan buatan dalam sistem pendidikan, termasuk personalisasi pembelajaran, analitik prediktif, dan tantangan etika implementasi AI di ruang kelas.',
    year: '2024',
    status: 'Presented',
    link: '#',
  },
]
