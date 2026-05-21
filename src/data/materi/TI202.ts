import type { CourseData } from '@/types/materi'

export const courseData: CourseData = {
  id: 'TI202',
  title: 'Struktur Data dan Algoritma',
  code: 'TI202',
  semester: '3',
  sks: '3',
  description:
    'Mata kuliah ini membahas berbagai struktur data fundamental dan algoritma pengolahannya, termasuk array, linked list, stack, queue, tree, dan graph.',
  instructor: 'Dr. Budi Susanto, S.Kom., M.Kom.',
  totalWeeks: 14,
  updatedAt: '2026-01-15',
  modules: [
    {
      week: 1,
      title: 'Pengantar Struktur Data dan Analisis Algoritma',
      description:
        'Konsep dasar struktur data, analisis kompleksitas algoritma dengan Big O, array, dan pengenalan linked list.',
      body: `**Struktur Data** adalah cara penyimpanan, pengorganisasian, dan pengelolaan data dalam memori komputer sehingga data dapat digunakan secara efisien. Pemilihan struktur data yang tepat sangat mempengaruhi performa algoritma dalam hal kecepatan eksekusi dan penggunaan memori. Beberapa struktur data fundamental meliputi **array**, **linked list**, **stack**, **queue**, **tree**, **graph**, dan **hash table**.

**Analisis Algoritma** menggunakan notasi **Big O (O)** untuk mengukur kompleksitas waktu dan ruang dari suatu algoritma. Big O menggambarkan bagaimana waktu eksekusi atau penggunaan memori suatu algoritma bertambah seiring bertambahnya ukuran input (n). Kompleksitas umum meliputi **O(1)** (konstan), **O(log n)** (logaritmik), **O(n)** (linear), **O(n log n)** (linearitmik), **O(n^2)** (kuadratik), dan **O(2^n)** (eksponensial). Memahami Big O membantu kita memilih algoritma yang paling efisien untuk suatu permasalahan.

**Array** adalah struktur data paling sederhana yang menyimpan elemen-elemen dengan tipe data yang sama dalam blok memori yang berurutan (kontigu). Array memiliki keunggulan dalam **akses acak (random access)** dengan kompleksitas **O(1)**, namun memiliki kelemahan dalam operasi **penyisipan** dan **penghapusan** yang membutuhkan **O(n)** karena elemen harus digeser. Array cocok digunakan ketika ukuran data diketahui dan jarang berubah.

**Linked List** adalah struktur data yang terdiri dari simpul-simpul (nodes) yang saling terhubung melalui pointer. Setiap node menyimpan data dan alamat (link) ke node berikutnya. Tidak seperti array, linked list tidak membutuhkan alokasi memori yang kontigu, sehingga penyisipan dan penghapusan dapat dilakukan dengan **O(1)** jika posisi sudah diketahui. Namun, **akses acak** pada linked list membutuhkan **O(n)** karena harus ditelusuri dari awal.

Terdapat beberapa jenis linked list: **Singly Linked List** (setiap node memiliki satu pointer ke node berikutnya), **Doubly Linked List** (setiap node memiliki pointer ke node sebelumnya dan berikutnya), dan **Circular Linked List** (node terakhir menunjuk kembali ke node pertama). Masing-masing memiliki kelebihan dan kekurangan tersendiri tergantung pada kebutuhan aplikasi.`,
      pdfUrl: '/static/materi/TI202/minggu1-slides.pdf',
      videoUrl: 'https://www.youtube.com/embed/8x6N6r8qk4I',
      assignments: [
        {
          title: 'Analisis Kompleksitas Algoritma',
          description:
            'Tuliskan kode program untuk mencari elemen dalam array (linear search) dan dalam array terurut (binary search). Hitung kompleksitas Big O untuk masing-masing algoritma. Buat tabel perbandingan waktu eksekusi untuk n = 10, 100, 1000, 10000.',
        },
        {
          title: 'Implementasi Singly Linked List',
          description:
            'Implementasikan singly linked list dalam Java dengan operasi: **tambahAwal()**, **tambahAkhir()**, **hapusAwal()**, **hapusAkhir()**, **cari()**, dan **tampilkan()**. Buat kelas utama untuk menguji semua operasi tersebut.',
          fileUrl: '/static/materi/TI202/tugas/minggu1-linkedlist.docx',
        },
      ],
      references: [
        {
          title: 'Big O Notation - FreeCodeCamp',
          url: 'https://www.freecodecamp.org/news/big-o-notation-why-it-matters-and-why-it-doesnt/',
          description:
            'Penjelasan lengkap tentang Big O notation dengan contoh-contoh praktis.',
        },
        {
          title: 'Data Structures - GeeksforGeeks',
          url: 'https://www.geeksforgeeks.org/data-structures/',
          description:
            'Referensi lengkap berbagai struktur data dengan implementasi dalam berbagai bahasa.',
        },
        {
          title: 'Linked List Visualization',
          url: 'https://visualgo.net/en/list',
          description:
            'Visualisasi interaktif operasi linked list untuk membantu pemahaman.',
        },
      ],
    },
  ],
}
