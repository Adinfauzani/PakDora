import type { CourseData } from '@/types/materi'

export const courseData: CourseData = {
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
  modules: [
    {
      week: 1,
      title: 'Pengenalan Basis Data',
      description:
        'Konsep dasar basis data, DBMS, model data relasional, dan pengenalan SQL.',
      body: `**Basis Data (Database)** adalah kumpulan data yang terorganisir secara sistematis dan dapat diakses, dikelola, serta diperbarui dengan mudah. Basis data modern dikelola oleh **DBMS (Database Management System)** yaitu perangkat lunak yang menyediakan antarmuka untuk berinteraksi dengan data. Contoh DBMS populer antara lain **MySQL**, **PostgreSQL**, **Oracle**, dan **Microsoft SQL Server**.

Sebelum era basis data, data disimpan dalam **sistem file tradisional** yang memiliki banyak kelemahan seperti **redudansi data** (data yang sama disimpan di banyak tempat), **inkonsistensi data** (data tidak sinkron), **kesulitan akses data**, dan **masalah keamanan**. Basis data mengatasi masalah-masalah ini dengan menyediakan pendekatan terpusat dan terstruktur untuk manajemen data.

**Model Data Relasional** diperkenalkan oleh **Edgar F. Codd** pada tahun 1970 dan menjadi model basis data yang paling banyak digunakan hingga saat ini. Data direpresentasikan dalam bentuk **relasi (tabel)** yang terdiri dari baris (**record/tuple**) dan kolom (**field/attribute**). Setiap tabel memiliki **primary key** yang unik untuk mengidentifikasi setiap baris, dan **foreign key** untuk menghubungkan antar tabel.

**SQL (Structured Query Language)** adalah bahasa standar untuk mengelola dan memanipulasi basis data relasional. SQL dibagi menjadi beberapa sub-bahasa: **DDL (Data Definition Language)** untuk mendefinisikan struktur database (seperti **CREATE TABLE**, **ALTER TABLE**), **DML (Data Manipulation Language)** untuk memanipulasi data (seperti **SELECT**, **INSERT**, **UPDATE**, **DELETE**), dan **DCL (Data Control Language)** untuk mengontrol akses (seperti **GRANT**, **REVOKE**).

Pada pertemuan ini, mahasiswa akan mempelajari instalasi DBMS (MySQL/PostgreSQL), membuat database dan tabel sederhana, serta menjalankan query SQL dasar. Mahasiswa juga akan diperkenalkan dengan **ERD (Entity Relationship Diagram)** sebagai alat untuk memodelkan data sebelum implementasi ke dalam tabel.`,
      pdfUrl: '/static/materi/TI301/minggu1-slides.pdf',
      videoUrl: 'https://www.youtube.com/embed/8x6N6r8qk4I',
      assignments: [
        {
          title: 'Instalasi DBMS dan Query Dasar',
          description:
            'Instal MySQL atau PostgreSQL di komputer Anda. Buat database **akademik** dengan tabel **mahasiswa** (nim, nama, tgl_lahir, alamat, jurusan) dan **dosen** (nip, nama, bidang). Masukkan minimal 5 record ke masing-masing tabel. Tampilkan semua data mahasiswa yang jurusannya tertentu.',
        },
        {
          title: 'Perancangan ERD Sederhana',
          description:
            'Buat ERD untuk sistem perpustakaan sederhana yang memiliki entitas Buku, Anggota, dan Peminjaman. Tentukan primary key, foreign key, dan relasi antar entitas. Implementasikan ERD tersebut dalam bentuk tabel SQL beserta query untuk membuat tabel-tabel tersebut.',
          fileUrl: '/static/materi/TI301/tugas/minggu1-erd-template.docx',
        },
      ],
      references: [
        {
          title: 'SQL Tutorial - W3Schools',
          url: 'https://www.w3schools.com/sql/',
          description:
            'Tutorial interaktif SQL dari dasar hingga mahir.',
        },
        {
          title: 'PostgreSQL Documentation',
          url: 'https://www.postgresql.org/docs/',
          description:
            'Dokumentasi resmi PostgreSQL, salah satu DBMS open source terpopuler.',
        },
        {
          title: 'Database Design - GeeksforGeeks',
          url: 'https://www.geeksforgeeks.org/database-design/',
          description:
            'Artikel tentang prinsip-prinsip perancangan basis data.',
        },
      ],
    },
  ],
}
