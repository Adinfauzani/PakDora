import type { CourseData } from '@/types/materi'

export const courseData: CourseData = {
  id: 'TI201',
  title: 'Pemrograman Berorientasi Objek',
  code: 'TI201',
  semester: '3',
  sks: '3',
  description:
    'Mata kuliah ini membahas konsep dasar pemrograman berorientasi objek menggunakan bahasa Java, mencakup kelas, objek, enkapsulasi, pewarisan, dan polimorfisme.',
  instructor: 'Dr. Budi Susanto, S.Kom., M.Kom.',
  totalWeeks: 14,
  updatedAt: '2026-01-15',
  modules: [
    {
      week: 1,
      title: 'Pengantar Pemrograman Berorientasi Objek',
      description:
        'Konsep dasar OOP, pengenalan bahasa Java, dan struktur program Java.',
      body: `**Pemrograman Berorientasi Objek (PBO)** atau Object-Oriented Programming (OOP) adalah paradigma pemrograman yang menggunakan **objek** sebagai entitas utama. Berbeda dengan pemrograman prosedural yang berfokus pada fungsi dan urutan langkah, OOP mengorganisir kode ke dalam kelas-kelas yang merepresentasikan entitas dunia nyata seperti mahasiswa, dosen, atau mata kuliah.

Terdapat empat pilar utama dalam OOP: **Enkapsulasi** (pembungkusan data dan method), **Pewarisan** (inheritance), **Polimorfisme** (banyak bentuk), dan **Abstraksi** (penyembunyian detail kompleksitas). Keempat konsep ini menjadi fondasi dalam membangun aplikasi yang terstruktur, mudah dipelihara, dan dapat digunakan kembali (reusable).

Java dipilih sebagai bahasa pemrograman dalam mata kuliah ini karena Java sepenuhnya mendukung konsep OOP. Java dikembangkan oleh Sun Microsystems (sekarang milik Oracle) pada tahun 1995 dengan slogan **Write Once, Run Anywhere**. Program Java dikompilasi menjadi **bytecode** yang dijalankan oleh **Java Virtual Machine (JVM)**, sehingga dapat berjalan di berbagai platform tanpa perubahan kode.

Untuk memulai pemrograman Java, kita perlu menginstal **JDK (Java Development Kit)** yang berisi compiler (javac), JRE (Java Runtime Environment), dan berbagai library pendukung. Struktur dasar program Java terdiri dari deklarasi kelas, method **main** sebagai entry point, dan statement-statement yang akan dieksekusi. Berikut adalah contoh program Java sederhana:

Pada pertemuan ini, mahasiswa akan mempelajari cara menulis program Java sederhana, proses kompilasi menggunakan perintah javac, dan eksekusi menggunakan perintah java. Mahasiswa juga akan diperkenalkan dengan IDE seperti Eclipse, NetBeans, atau IntelliJ IDEA untuk memudahkan proses pengembangan.`,
      pdfUrl: '/static/materi/TI201/minggu1-slides.pdf',
      videoUrl: 'https://www.youtube.com/embed/8x6N6r8qk4I',
      assignments: [
        {
          title: 'Instalasi JDK dan Program Pertama',
          description:
            'Instal JDK versi terbaru di komputer Anda. Buat program sederhana yang menampilkan biodata Anda (nama, nim, jurusan) ke layar console.',
        },
        {
          title: 'Laporan Praktikum Minggu 1',
          description:
            'Buat laporan singkat berisi screenshot hasil instalasi JDK, kode program, dan output eksekusi. Jelaskan perbedaan JDK, JRE, dan JVM.',
          fileUrl: '/static/materi/TI201/tugas/minggu1-template.docx',
        },
      ],
      references: [
        {
          title: 'Java Tutorial - W3Schools',
          url: 'https://www.w3schools.com/java/',
          description:
            'Tutorial interaktif untuk mempelajari dasar-dasar Java.',
        },
        {
          title: 'Dokumentasi Resmi JDK',
          url: 'https://docs.oracle.com/en/java/javase/',
          description:
            'Dokumentasi resmi Oracle untuk Java SE.',
        },
        {
          title: 'The Java™ Tutorials',
          url: 'https://docs.oracle.com/javase/tutorial/',
          description:
            'Tutorial resmi dari Oracle untuk belajar Java dari dasar hingga lanjutan.',
        },
      ],
    },
    {
      week: 2,
      title: 'Kelas dan Objek',
      description:
        'Pembuatan class, objek, constructor, method, dan konsep this.',
      body: `**Kelas (class)** adalah blueprint atau cetakan untuk menciptakan objek. Sebuah kelas mendefinisikan **fields** (atribut/data) dan **methods** (perilaku/fungsi) yang dimiliki oleh objek. Misalnya, kelas **Mahasiswa** memiliki fields seperti **nim**, **nama**, dan **ipk**, serta methods seperti **belajar()** dan **ujian()**.

**Objek** adalah instance nyata dari sebuah kelas. Jika kelas adalah cetakan kue, maka objek adalah kue yang sesungguhnya. Setiap objek memiliki **state** (nilai atribut) dan **behavior** (perilaku) yang independen satu sama lain. Objek dibuat menggunakan keyword **new** diikuti dengan constructor kelas.

**Constructor** adalah method khusus yang dipanggil saat objek dibuat. Constructor memiliki nama yang sama dengan nama kelas dan tidak memiliki return type. Java menyediakan **default constructor** (tanpa parameter) jika kita tidak mendefinisikan constructor apapun. Kita juga dapat membuat **parameterized constructor** untuk menginisialisasi objek dengan nilai awal tertentu.

Keyword **this** digunakan di dalam kelas untuk merujuk pada objek saat ini (current object). **this** sangat berguna ketika terdapat parameter method yang memiliki nama yang sama dengan field kelas. Selain itu, **this** juga dapat digunakan untuk memanggil constructor lain dalam kelas yang sama menggunakan **this()**.

**Method overloading** adalah kemampuan untuk mendefinisikan beberapa method dengan nama yang sama tetapi parameter yang berbeda (jumlah, tipe, atau urutan parameter). Java akan menentukan method mana yang akan dipanggil berdasarkan argumen yang diberikan saat pemanggilan. Overloading meningkatkan **readability** dan **flexibility** dari kode program.`,
      pdfUrl: '/static/materi/TI201/minggu2-slides.pdf',
      videoUrl: 'https://www.youtube.com/embed/8x6N6r8qk4I',
      assignments: [
        {
          title: 'Implementasi Kelas dan Objek',
          description:
            'Buat kelas **Mahasiswa** dengan field nim, nama, jurusan, dan ipk. Tambahkan constructor berparameter dan method **tampilkanData()**. Buat minimal 3 objek Mahasiswa dan tampilkan datanya.',
        },
      ],
      references: [
        {
          title: 'Java Classes and Objects',
          url: 'https://www.w3schools.com/java/java_classes.asp',
          description:
            'Tutorial tentang class dan object di Java.',
        },
        {
          title: 'Java Constructors',
          url: 'https://www.w3schools.com/java/java_constructors.asp',
          description:
            'Penjelasan tentang constructor di Java.',
        },
      ],
    },
    {
      week: 3,
      title: 'Enkapsulasi dan Akses Modifier',
      description:
        'Konsep enkapsulasi, access modifier, getter dan setter.',
      body: `**Enkapsulasi (Encapsulation)** adalah mekanisme untuk membungkus data (fields) dan method yang memanipulasi data tersebut dalam satu unit (kelas), serta menyembunyikan detail implementasi dari pihak luar. Enkapsulasi merupakan salah satu pilar utama OOP yang bertujuan untuk melindungi integritas data dan mencegah akses langsung yang tidak diinginkan.

Java menyediakan empat **access modifier** untuk mengontrol visibilitas: **private** (hanya dapat diakses dalam kelas yang sama), **default/package-private** (dapat diakses dalam paket yang sama), **protected** (dapat diakses dalam paket yang sama dan subclass di paket lain), dan **public** (dapat diakses dari mana saja). Pemilihan access modifier yang tepat sangat penting dalam merancang kelas yang robust.

Untuk mengimplementasikan enkapsulasi, fields biasanya dideklarasikan sebagai **private**. Akses untuk membaca dan mengubah nilai fields disediakan melalui method **getter** (untuk mengambil nilai) dan **setter** (untuk mengubah nilai). Getter dan setter memungkinkan kita menambahkan validasi atau logika tambahan saat data diakses atau dimodifikasi.

Manfaat utama enkapsulasi meliputi: **data hiding** (data tersembunyi dari akses langsung), **flexibility** (implementasi internal dapat diubah tanpa mempengaruhi kode pengguna), **reusability** (kelas yang terenkapsulasi dengan baik mudah digunakan kembali), dan **security** (mencegah modifikasi data yang tidak valid). Prinsip ini dikenal dengan istilah **information hiding**.

Dalam praktiknya, enkapsulasi memungkinkan kita untuk menerapkan **validasi** pada setter, misalnya memastikan nilai IPK tidak kurang dari 0 atau lebih dari 4. Dengan demikian, objek selalu berada dalam **state** yang valid sepanjang siklus hidupnya.`,
      pdfUrl: '/static/materi/TI201/minggu3-slides.pdf',
      videoUrl: 'https://www.youtube.com/embed/8x6N6r8qk4I',
      assignments: [
        {
          title: 'Enkapsulasi pada kelas Mahasiswa',
          description:
            'Modifikasi kelas Mahasiswa dari minggu sebelumnya dengan menerapkan enkapsulasi. Jadikan semua fields private, buat getter/setter dengan validasi, dan buat kelas utama untuk menguji implementasi Anda.',
        },
        {
          title: 'Studi Kasus: Sistem Perbankan Sederhana',
          description:
            'Buat kelas **RekeningBank** dengan fields private (noRekening, namaPemilik, saldo). Implementasikan method **setor()** dan **tarik()** dengan validasi saldo minimal. Tampilkan hasil transaksi.',
          fileUrl: '/static/materi/TI201/tugas/minggu3-studi-kasus.docx',
        },
      ],
      references: [
        {
          title: 'Java Encapsulation',
          url: 'https://www.w3schools.com/java/java_encapsulation.asp',
          description:
            'Tutorial tentang enkapsulasi di Java.',
        },
        {
          title: 'Access Modifiers in Java',
          url: 'https://www.geeksforgeeks.org/access-modifiers-java/',
          description:
            'Penjelasan lengkap tentang access modifier di Java.',
        },
      ],
    },
    {
      week: 4,
      title: 'Pewarisan (Inheritance)',
      description:
        'Konsep inheritance, extends, super, method overriding.',
      body: `**Pewarisan (Inheritance)** adalah mekanisme di mana sebuah kelas (subclass/child class) mewarisi fields dan methods dari kelas lain (superclass/parent class). Inheritance memungkinkan kita untuk membuat hierarki kelas yang merepresentasikan hubungan **IS-A** (is-a relationship), seperti **Mahasiswa** IS-A **Orang** atau **Motor** IS-A **Kendaraan**.

Keyword **extends** digunakan dalam Java untuk mengimplementasikan inheritance. Subclass secara otomatis memiliki akses ke semua fields dan methods **public** dan **protected** dari superclass-nya. Subclass juga dapat mendefinisikan fields dan methods tambahan yang spesifik untuk kebutuhannya, atau memodifikasi perilaku yang diwarisi.

Keyword **super** digunakan oleh subclass untuk merujuk pada objek superclass. **super** dapat digunakan untuk mengakses fields dan methods dari superclass yang disembunyikan (hidden) oleh subclass, serta untuk memanggil constructor superclass menggunakan **super()**. Pemanggilan **super()** harus menjadi pernyataan pertama dalam constructor subclass.

**Method overriding** adalah kemampuan subclass untuk memberikan implementasi yang berbeda pada method yang sudah didefinisikan di superclass. Ketika sebuah method di-override, Java akan memanggil implementasi yang sesuai berdasarkan tipe objek aktual pada runtime (bukan tipe referensi). Aturan overriding: nama method, parameter, dan return type harus sama, serta access modifier tidak boleh lebih restriktif.

Terdapat beberapa jenis inheritance di Java: **single inheritance** (satu superclass), **multilevel inheritance** (rantai pewarisan), dan **hierarchical inheritance** (satu superclass dengan banyak subclass). Java tidak mendukung **multiple inheritance** (sebuah kelas memiliki lebih dari satu superclass) untuk menghindari kompleksitas dan ambiguitas.`,
      pdfUrl: '/static/materi/TI201/minggu4-slides.pdf',
      videoUrl: 'https://www.youtube.com/embed/8x6N6r8qk4I',
      assignments: [
        {
          title: 'Hierarki Inheritance',
          description:
            'Buat superclass **Karyawan** dengan fields nik, nama, dan gajiPokok. Buat subclass **Dosen** (tambahan field: jumlahSKS, honorPerSKS) dan **Staff** (tambahan field: jamLembur, honorPerJam). Implementasikan method **hitungGaji()** yang dioverride di masing-masing subclass.',
        },
      ],
      references: [
        {
          title: 'Java Inheritance',
          url: 'https://www.w3schools.com/java/java_inheritance.asp',
          description:
            'Tutorial tentang inheritance di Java.',
        },
        {
          title: 'Overriding in Java',
          url: 'https://www.geeksforgeeks.org/overriding-in-java/',
          description:
            'Penjelasan lengkap tentang method overriding.',
        },
        {
          title: 'Super Keyword in Java',
          url: 'https://www.javatpoint.com/super-keyword',
          description:
            'Panduan penggunaan keyword super di Java.',
        },
      ],
    },
    {
      week: 5,
      title: 'Polimorfisme',
      description:
        'Konsep polimorfisme, interface, abstract class, dynamic binding.',
      body: `**Polimorfisme (Polymorphism)** berasal dari bahasa Yunani yang berarti **banyak bentuk (many forms)**. Dalam konteks OOP, polimorfisme adalah kemampuan suatu objek untuk memiliki banyak bentuk atau perilaku yang berbeda tergantung pada konteksnya. Polimorfisme memungkinkan kita untuk menulis kode yang lebih **generic** dan **flexible**.

Terdapat dua jenis polimorfisme di Java: **compile-time polymorphism** (method overloading) dan **runtime polymorphism** (method overriding). Compile-time polymorphism dicapai melalui method overloading di mana Java menentukan method yang akan dipanggil saat kompilasi berdasarkan parameter. Runtime polymorphism dicapai melalui method overriding di mana Java menentukan method yang akan dipanggil saat runtime berdasarkan tipe objek aktual.

**Abstract class** adalah kelas yang dideklarasikan dengan keyword **abstract** dan tidak dapat diinstansiasi secara langsung. Abstract class dapat memiliki method abstract (tanpa implementasi) maupun method konkret (dengan implementasi). Kelas turunan wajib memberikan implementasi untuk semua method abstract dari superclass-nya, kecuali kelas turunan tersebut juga dideklarasikan sebagai abstract.

**Interface** adalah kontrak yang mendefinisikan method-method yang harus diimplementasikan oleh kelas yang menggunakannya (implements). Interface hanya berisi deklarasi method (tanpa implementasi) hingga Java 8, yang kemudian menambahkan **default method** dan **static method**. Berbeda dengan abstract class, sebuah kelas dapat mengimplementasikan **banyak interface** sekaligus, memberikan alternatif untuk multiple inheritance.

**Dynamic method dispatch** adalah mekanisme di mana Java memutuskan method override mana yang akan dipanggil saat runtime. Ketika method yang dioverride dipanggil melalui referensi superclass, Java akan menentukan versi method yang tepat berdasarkan tipe objek aktual. Inilah yang memungkinkan kita menulis kode yang bekerja dengan superclass namun mengeksekusi implementasi subclass yang sesuai.`,
      pdfUrl: '/static/materi/TI201/minggu5-slides.pdf',
      videoUrl: 'https://www.youtube.com/embed/8x6N6r8qk4I',
      assignments: [
        {
          title: 'Implementasi Polimorfisme dengan Interface',
          description:
            'Buat interface **BangunDatar** dengan method **hitungLuas()** dan **hitungKeliling()**. Implementasikan interface tersebut pada kelas **Persegi**, **Lingkaran**, dan **Segitiga**. Buat array BangunDatar dan panggil method secara polimorfik.',
        },
        {
          title: 'Studi Kasus: Sistem Pembayaran',
          description:
            'Buat abstract class **Pembayaran** dengan method abstract **prosesPembayaran()**. Buat subclass **PembayaranKartuKredit**, **PembayaranTransfer**, dan **PembayaranEwallet**. Demonstrasikan polimorfisme dengan array Pembayaran.',
          fileUrl: '/static/materi/TI201/tugas/minggu5-studi-kasus.docx',
        },
      ],
      references: [
        {
          title: 'Java Polymorphism',
          url: 'https://www.w3schools.com/java/java_polymorphism.asp',
          description:
            'Tutorial tentang polimorfisme di Java.',
        },
        {
          title: 'Java Interface',
          url: 'https://www.w3schools.com/java/java_interface.asp',
          description:
            'Penjelasan tentang interface di Java.',
        },
        {
          title: 'Abstract Class vs Interface',
          url: 'https://www.geeksforgeeks.org/difference-between-abstract-class-and-interface-in-java/',
          description:
            'Perbandingan antara abstract class dan interface.',
        },
      ],
    },
  ],
}
