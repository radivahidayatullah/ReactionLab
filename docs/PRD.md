Product Requirements Document (PRD)
Web Pembelajaran Kimia: Laju Reaksi Interaktif Kelas 11 SMA
Proyek: ReactionLab 11 — Kursus & Laboratorium Virtual Laju Reaksi  
Versi Dokumen: 1.0  
Status: Rancangan untuk Implementasi
---
1. Ringkasan Eksekutif & Tujuan Produk
ReactionLab 11 adalah platform pembelajaran kimia digital berbasis web yang dirancang untuk siswa SMA kelas XI. Aplikasi ini mengemas materi laju reaksi—yang sering dipelajari melalui hafalan faktor-faktor dan rumus—menjadi alur kursus interaktif berurutan (guided learning journey) yang dilengkapi simulasi teori tumbukan, laboratorium virtual, visualisasi energi aktivasi, analisis data, serta evaluasi pemahaman dengan umpan balik langsung.
Tujuan Utama
Membantu siswa memahami laju reaksi dengan menghubungkan fenomena makroskopis, model partikel submikroskopis, dan representasi simbolik berupa persamaan serta grafik.
Memvisualisasikan konsep abstrak seperti tumbukan efektif, energi aktivasi, distribusi energi partikel, dan peran katalis.
Membantu siswa menguji pengaruh konsentrasi, suhu, luas permukaan, dan katalis terhadap laju reaksi melalui simulasi yang dapat diubah parameternya.
Menyediakan pengalaman belajar mandiri yang terstruktur dengan prediksi, eksperimen virtual, analisis hasil, dan pembahasan langkah demi langkah.
Mendukung guru dalam mendemonstrasikan konsep laju reaksi dan mengenali miskonsepsi siswa melalui hasil evaluasi.
---
2. Sasaran Pengguna & Kebutuhan (User Persona)
Siswa kelas XI SMA: membutuhkan media belajar yang visual, mudah digunakan, tidak membosankan, dan menjelaskan alasan ilmiah di balik perubahan laju reaksi. Siswa perlu dapat mengakses platform melalui smartphone maupun laptop.
Guru kimia SMA: membutuhkan media peraga digital untuk menjelaskan teori tumbukan, energi aktivasi, faktor-faktor laju reaksi, serta aktivitas investigasi yang dapat digunakan dalam pembelajaran kelas.
Kebutuhan inti siswa: membuat prediksi, mengubah variabel, mengamati hasil, membaca grafik, dan menjelaskan kesimpulan menggunakan konsep kimia.
Kebutuhan inti guru: materi tervalidasi, aktivitas yang terstruktur, pertanyaan diagnostik, dan ringkasan hasil belajar yang mudah ditafsirkan.
---
3. Konsep Desain & Identitas Visual (UI/UX)
Platform menggunakan tema Clean Academic Light Mode agar antarmuka terasa akademis, modern, ringan, dan mudah dibaca di layar ponsel maupun komputer.
Palet warna:
Primary Background: putih dan abu-abu kebiruan sangat lembut (`#F8FAFC`, `#FFFFFF`).
Primary Accent: biru sains (`#0284C7` atau `#2563EB`) untuk navigasi, tombol utama, dan progres belajar.
Secondary Accent: cyan (`#06B6D4`) untuk elemen simulasi dan data.
Success: emerald (`#10B981`) untuk jawaban benar dan penyelesaian aktivitas.
Warning: amber (`#F59E0B`) untuk petunjuk atau kondisi yang perlu diperhatikan.
Error: rose (`#EF4444`) untuk jawaban salah atau pesan kesalahan.
Tipografi: gunakan font sans-serif yang jelas, misalnya Inter atau Plus Jakarta Sans. Rumus kimia, satuan, simbol laju reaksi, dan notasi energi aktivasi harus ditampilkan secara konsisten.
Komponen visual:
Kartu pembelajaran dengan bayangan lembut, batas tipis, dan ikon sains yang sederhana.
Grafik dengan label sumbu dan satuan yang jelas; informasi tidak boleh dibedakan hanya melalui warna.
Animasi partikel dengan kontrol mulai, jeda, ulangi, dan pengaturan variabel.
Tata letak responsif untuk smartphone, tablet, dan desktop.
Prinsip UX: setiap simulasi harus disertai pertanyaan prediksi, pengamatan, dan refleksi agar siswa tidak hanya menonton animasi.
---
4. Struktur Arsitektur & Alur Navigasi (Sequential Course Journey)
Aplikasi menggunakan pola alur kursus berurutan (guided course progression). Siswa dipandu melalui peta belajar dengan indikator progres setiap modul. Untuk prototipe, progres dan hasil kuis dapat disimpan di `localStorage` pada perangkat yang sama.
```text
[ Beranda / Peta Belajar Kursus ]
          |
          v
[ Bab 1: Mengenal Laju Reaksi ]
  |-- 1.1 Pengertian Laju Reaksi
  |-- 1.2 Perubahan Konsentrasi terhadap Waktu
  |-- 1.3 Faktor yang Menunjukkan Cepat-Lambatnya Reaksi
  `-- Kuis Cek Pemahaman Bab 1
          |
          v
[ Bab 2: Teori Tumbukan ]
  |-- 2.1 Gerak dan Tumbukan Partikel
  |-- 2.2 Tumbukan Efektif dan Tidak Efektif
  |-- 2.3 Energi Aktivasi
  |-- Simulasi Interaktif: Tumbukan Partikel
  `-- Kuis Cek Pemahaman Bab 2
          |
          v
[ Bab 3: Faktor-Faktor Laju Reaksi ]
  |-- 3.1 Pengaruh Konsentrasi
  |-- 3.2 Pengaruh Suhu
  |-- 3.3 Pengaruh Luas Permukaan
  |-- 3.4 Pengaruh Katalis
  |-- Laboratorium Virtual: Uji Variabel Reaksi
  `-- Kuis Cek Pemahaman Bab 3
          |
          v
[ Bab 4: Analisis Data dan Energi Reaksi ]
  |-- 4.1 Membaca Tabel dan Grafik Laju Reaksi
  |-- 4.2 Membandingkan Dua Kondisi Reaksi
  |-- 4.3 Diagram Energi dengan dan tanpa Katalis
  |-- Aktivitas Investigasi: Prediksi, Uji, dan Simpulkan
  `-- Kuis Cek Pemahaman Bab 4
          |
          v
[ Bab 5: Evaluasi Akhir ]
  |-- Tes Komprehensif Laju Reaksi
  |-- Hasil Evaluasi dan Pembahasan
  `-- Rekomendasi Materi untuk Dipelajari Kembali
```
Aturan navigasi:
Siswa dapat melihat semua bab dan status penyelesaiannya.
Modul dapat dirancang berurutan, tetapi guru dapat membuka modul tertentu untuk demonstrasi kelas.
Progres dasar disimpan secara lokal pada perangkat. Sinkronisasi ant perangkat dan dasbor kelas memerlukan backend dan dapat dikembangkan kemudian.
Siswa mendapat umpan balik setelah menyelesaikan aktivitas, bukan hanya tanda selesai.
---
5. Detail Spesifikasi Fitur Utama
5.1. Modul Konsep Dasar Laju Reaksi (Bab 1)
Menjelaskan laju reaksi sebagai perubahan jumlah atau konsentrasi reaktan maupun produk terhadap waktu.
Menampilkan contoh fenomena sehari-hari, misalnya reaksi tablet effervesen dalam air atau perubahan pada reaksi yang menghasilkan gas.
Menyediakan tabel dan grafik sederhana yang menghubungkan waktu dengan perubahan konsentrasi atau indikator reaksi.
Memberikan pertanyaan diagnostik seperti: “Dua reaksi menghasilkan jumlah gas yang sama, tetapi satu reaksi selesai lebih cepat. Apa arti hasil tersebut terhadap laju reaksinya?”
Menampilkan pembahasan yang mengaitkan data pengamatan dengan konsep laju reaksi.
5.2. Simulator Teori Tumbukan (Bab 2)
Menampilkan partikel reaktan yang bergerak dan bertumbukan dalam ruang simulasi.
Menyediakan kontrol untuk memulai, menjeda, mengulang, dan mengubah kondisi simulasi.
Memvisualisasikan tumbukan yang tidak menghasilkan reaksi dan tumbukan efektif yang menghasilkan produk.
Menampilkan penghitung tumbukan dan tumbukan efektif sebagai ilustrasi model.
Memuat penjelasan tentang energi aktivasi dan, jika relevan dengan model yang digunakan, orientasi tumbukan yang sesuai.
Menyertakan pertanyaan prediksi sebelum simulasi dan pertanyaan refleksi setelah simulasi.
Persyaratan akurasi ilmiah:
Tidak semua tumbukan dianggap menghasilkan reaksi.
Model harus menunjukkan bahwa keberhasilan tumbukan berkaitan dengan energi yang memadai dan persyaratan mekanisme reaksi.
Animasi merupakan model konseptual, bukan simulasi molekuler yang sepenuhnya presisi.
Jika jumlah tumbukan pada animasi disederhanakan untuk tujuan pembelajaran, keterbatasan model harus dijelaskan.
5.3. Laboratorium Virtual Faktor-Faktor Laju Reaksi (Bab 3)
Laboratorium virtual menyediakan eksperimen terarah untuk menyelidiki pengaruh variabel terhadap laju reaksi.
A. Pengaruh Konsentrasi
Siswa mengubah konsentrasi reaktan.
Variabel lain dijaga tetap.
Sistem menunjukkan hasil model berupa perubahan indikator laju atau waktu reaksi.
Siswa menjelaskan hubungan konsentrasi dengan frekuensi tumbukan.
B. Pengaruh Suhu
Siswa membandingkan dua atau lebih kondisi suhu.
Sistem menampilkan perubahan gerak atau distribusi energi partikel secara konseptual.
Siswa menghubungkan suhu dengan energi kinetik rata-rata dan fraksi partikel yang mampu melampaui energi aktivasi.
Penjelasan tidak boleh menyederhanakan efek suhu hanya sebagai “partikel bergerak lebih cepat” tanpa mengaitkannya dengan tumbukan efektif.
C. Pengaruh Luas Permukaan
Siswa membandingkan padatan berbentuk bongkahan dan padatan yang dihaluskan.
Kondisi lain dijaga tetap.
Sistem menunjukkan bahwa ukuran partikel lebih kecil umumnya menyediakan luas permukaan kontak yang lebih besar.
D. Pengaruh Katalis
Siswa membandingkan jalur reaksi dengan dan tanpa katalis melalui diagram energi.
Sistem menunjukkan energi aktivasi yang lebih rendah pada jalur alternatif berkatalis.
Sistem menjelaskan bahwa katalis tidak mengubah perubahan entalpi keseluruhan reaksi dan tidak mengubah posisi kesetimbangan pada suhu tertentu.
Fitur umum laboratorium virtual:
Pengaturan variabel eksperimen.
Tombol jalankan, jeda, dan ulangi.
Tabel hasil percobaan.
Perbandingan kondisi eksperimen.
Kolom hipotesis dan kesimpulan.
Penanda jelas bahwa data merupakan data simulasi, bukan hasil pengukuran eksperimen nyata.
5.4. Visualisasi Data dan Diagram Energi (Bab 4)
Menampilkan tabel hasil simulasi yang dapat dibandingkan.
Menyediakan grafik sesuai variabel yang diukur, dengan judul, label sumbu, dan satuan yang jelas.
Menampilkan diagram profil energi untuk membandingkan reaksi dengan dan tanpa katalis.
Memastikan grafik dan tabel berasal dari sumber data yang sama agar hasilnya konsisten.
Mengajukan pertanyaan interpretasi, misalnya: “Bukti apa dari data yang mendukung kesimpulan bahwa reaksi pada kondisi B berlangsung lebih cepat?”
Menyediakan ruang bagi siswa untuk menjelaskan kesimpulan dengan menghubungkan data dan teori tumbukan.
5.5. Kuis, Evaluasi, dan Umpan Balik (Bab 1–5)
Sistem soal bertingkat:
Level 1: pemahaman konsep dan istilah.
Level 2: penerapan teori tumbukan pada situasi tertentu.
Level 3: analisis data, perbandingan kondisi, dan penjelasan sebab-akibat.
Setiap jawaban objektif diperiksa secara otomatis.
Sistem memberikan pembahasan dan alasan mengapa jawaban benar atau salah.
Petunjuk dapat ditampilkan sebelum pembahasan penuh agar siswa tetap melakukan penalaran.
Tes akhir menggunakan soal yang setara cakupan dan tingkat kesulitannya dengan tes awal, tetapi tidak harus menggunakan pertanyaan yang identik.
Hasil evaluasi menunjukkan area materi yang sudah dikuasai dan perlu dipelajari kembali.
5.6. Tutor AI Pendamping (Fitur Tambahan)
Tutor AI dirancang sebagai pendamping belajar dalam cakupan materi laju reaksi.
Menjawab pertanyaan siswa berdasarkan materi yang telah divalidasi.
Memberi petunjuk bertahap (scaffolding) sebelum langsung memberikan jawaban lengkap.
Membantu siswa menafsirkan grafik dan menghubungkan hasil simulasi dengan teori tumbukan.
Tidak boleh mengarang hasil eksperimen atau menyebut data simulasi sebagai data nyata.
Jika pertanyaan berada di luar cakupan atau jawabannya tidak pasti, sistem harus menyatakannya.
Kunci API tidak boleh disimpan di kode frontend; pemanggilan layanan AI harus dilakukan melalui backend yang aman.
Tutor AI dapat menjadi fitur tahap pertama jika sumber daya memungkinkan. Namun, materi, simulasi, dan evaluasi inti harus tetap dapat digunakan tanpa AI.
---
6. Spesifikasi Teknis & Stack Implementasi
Framework: React 19 + Vite untuk antarmuka modular dan pengembangan web yang ringan.
Styling: CSS3 modern dengan CSS Variables, Flexbox/Grid, serta animasi yang tidak berlebihan.
Simulasi: JavaScript dengan SVG atau Canvas untuk animasi partikel dan kontrol variabel.
Grafik: pustaka grafik ringan atau SVG buatan sendiri; grafik wajib memiliki label dan satuan.
Penyimpanan status: `localStorage` untuk prototipe, mencakup progres bab dan riwayat kuis pada perangkat yang sama.
Tutor AI: API model bahasa melalui backend jika fitur ini diaktifkan; rahasia API tidak boleh dikirim ke frontend.
Rumus dan simbol kimia: komponen tampilan yang konsisten untuk simbol, satuan, subskrip, superskrip, serta notasi energi aktivasi.
Responsivitas: tampilan dioptimalkan untuk smartphone, tablet, dan desktop.
Performa: aset ringan, animasi efisien, dan halaman inti tetap dapat digunakan pada koneksi sekolah yang terbatas.
Aksesibilitas: kontras yang memadai, navigasi yang jelas, kontrol yang dapat dioperasikan dengan keyboard bila memungkinkan, serta informasi yang tidak hanya dibedakan melalui warna.
Privasi: kumpulkan data seminimal mungkin. Penyimpanan lokal tidak menyinkronkan progres lintas perangkat; fitur akun atau dasbor guru membutuhkan rancangan backend terpisah.
---
7. Rencana Roadmap Pelaksanaan (Implementation Milestones)
Milestone 1: Pembangunan Core Design System dengan tema Clean Academic Light, token warna, tipografi, layout, navigasi kursus, dan indikator progres.
Milestone 2: Implementasi Bab 1, mencakup materi konsep laju reaksi, contoh fenomena, pertanyaan diagnostik, dan kuis.
Milestone 3: Implementasi Bab 2 dan simulator teori tumbukan, termasuk tumbukan efektif, energi aktivasi, dan kontrol simulasi.
Milestone 4: Implementasi Bab 3 dan laboratorium virtual untuk pengaruh konsentrasi, suhu, luas permukaan, serta katalis.
Milestone 5: Implementasi Bab 4, meliputi tabel dan grafik hasil simulasi, diagram energi, serta aktivitas investigasi.
Milestone 6: Implementasi Bab 5, meliputi tes akhir, pembahasan, ringkasan hasil, dan rekomendasi materi untuk diulang.
Milestone 7: Integrasi tutor AI bila termasuk lingkup rilis; pengujian respons dan akurasi pada pertanyaan yang telah disiapkan.
Milestone 8: Pengujian menyeluruh, validasi materi oleh guru/ahli kimia, uji responsivitas mobile/desktop, pengujian aksesibilitas, dan penyempurnaan UI/UX.
Milestone 9: Uji coba terbatas kepada siswa, evaluasi tes awal dan tes akhir, pengumpulan umpan balik, serta perbaikan sebelum peluncuran lebih luas.
---
8. Kriteria Penerimaan (Acceptance Criteria)
ID	Kriteria	Cara pengujian
AC-01	Semua modul inti dapat dibuka dan dinavigasi.	Uji seluruh tautan dan navigasi.
AC-02	Simulasi dapat dimulai, dijeda, dan diulang.	Uji setiap kontrol simulasi.
AC-03	Perubahan parameter memperbarui visualisasi sesuai aturan model.	Bandingkan hasil pada kondisi input berbeda.
AC-04	Siswa dapat membandingkan setidaknya dua kondisi eksperimen.	Uji skenario eksperimen dengan variabel kontrol.
AC-05	Tabel dan grafik konsisten dengan data simulasi.	Verifikasi nilai tabel dan titik grafik.
AC-06	Kuis memberi skor dan pembahasan sesuai kunci yang divalidasi.	Uji jawaban benar dan salah.
AC-07	Tes awal dan tes akhir dapat diselesaikan dan hasilnya ditampilkan.	Uji alur belajar lengkap.
AC-08	Tutor AI, jika diaktifkan, tetap dalam cakupan materi dan tidak mengarang data.	Uji pertanyaan cakupan dan di luar cakupan.
AC-09	Antarmuka dapat digunakan di perangkat dan browser yang ditargetkan.	Uji responsivitas.
AC-10	Pesan kesalahan muncul dengan jelas ketika layanan atau data gagal dimuat.	Simulasikan kegagalan layanan.
---
9. Indikator Keberhasilan Produk (Success Metrics)
Target berikut merupakan target awal yang harus divalidasi melalui uji coba, bukan hasil yang sudah terbukti.
Peningkatan pemahaman: rata-rata skor tes akhir meningkat sekurang-kurangnya 15 poin persentase dibandingkan tes awal.
Pemahaman konseptual: sekurang-kurangnya 75% siswa menjawab benar pada soal penalaran inti di tes akhir.
Penyelesaian modul: sekurang-kurangnya 80% siswa yang memulai modul menyelesaikannya.
Keberhasilan aktivitas: sekurang-kurangnya 85% siswa dapat menyelesaikan aktivitas simulasi tanpa bantuan teknis.
Kemudahan penggunaan: skor rata-rata penilaian kegunaan minimal 4 dari 5.
Akurasi ilmiah: seluruh miskonsepsi kritis yang ditemukan saat validasi harus diperbaiki sebelum peluncuran.
Pengukuran peningkatan pemahaman sebaiknya menggunakan soal awal dan akhir yang setara tingkat kesulitannya serta mencakup soal transfer, bukan hanya mengulang soal yang sama. Jika digunakan untuk penelitian pendidikan, instrumen dan desain evaluasi perlu divalidasi sesuai tujuan penelitian.
---
10. Risiko Produk & Mitigasi
Risiko	Dampak	Mitigasi
Animasi tidak sesuai dengan konsep kimia	Siswa membangun miskonsepsi	Validasi simulasi oleh guru atau ahli kimia.
Siswa hanya menonton animasi	Aktivitas tidak menghasilkan penalaran	Tambahkan prediksi, pertanyaan analisis, dan kesimpulan.
Tutor AI memberi jawaban keliru	Pemahaman siswa terganggu	Batasi cakupan, gunakan materi tervalidasi, dan uji respons.
Fitur terlalu banyak pada versi awal	Waktu pengembangan membesar	Prioritaskan materi, simulasi, data, dan evaluasi inti.
Website lambat pada perangkat siswa	Aktivitas terganggu	Optimalkan aset dan uji pada perangkat nyata.
Data siswa dikumpulkan berlebihan	Risiko privasi	Minimalkan pengumpulan data dan batasi akses.
Skor meningkat karena menghafal soal	Keberhasilan belajar dinilai terlalu tinggi	Gunakan soal transfer dan penilaian alasan ilmiah.
---
11. Definisi Selesai (Definition of Done)
MVP siap diuji coba jika:
[ ] Semua materi inti ditinjau guru atau ahli kimia.
[ ] Simulasi berfungsi pada perangkat dan browser sasaran.
[ ] Aturan dan keterbatasan model simulasi terdokumentasi.
[ ] Tabel dan grafik konsisten dengan data simulasi.
[ ] Tes awal, kuis formatif, dan tes akhir berfungsi.
[ ] Umpan balik jawaban telah divalidasi.
[ ] Tutor AI, jika diluncurkan, telah diuji untuk akurasi dan keamanan.
[ ] Kebijakan privasi dan pengumpulan data telah ditentukan.
[ ] Uji coba awal dilakukan dan masalah kritis diperbaiki.
---
12. Rekomendasi Prioritas Implementasi
Urutan pengembangan yang disarankan:
Materi dan soal konseptual yang tervalidasi.
Simulasi teori tumbukan dan faktor-faktor laju reaksi.
Tabel, grafik, dan aktivitas analisis data.
Evaluasi awal dan akhir beserta umpan balik.
Tutor AI dan dasbor guru jika sumber daya memungkinkan.
Pengalaman inti yang perlu dipastikan berhasil: siswa memprediksi pengaruh suhu, menjalankan simulasi, mengamati data, menjelaskan hasil berdasarkan teori tumbukan, lalu menerima umpan balik. Fitur lain dapat dikembangkan secara bertahap setelah pengalaman belajar utama ini tervalidasi.