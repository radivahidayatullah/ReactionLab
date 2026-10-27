Agent Guidelines & Project Instructions (AGENT.md)
Proyek: ReactionLab 11 — Kursus & Laboratorium Virtual Laju Reaksi Kelas XI SMA  
Dokumen Referensi: `PRD_ReactionLab_Laju_Reaksi_Kelas_XI.md`  
Tujuan Dokumen: Panduan operasional, arsitektur teknis, standar konten, dan kualitas bagi AI Agent yang mengembangkan serta memelihara ReactionLab 11.
---
1. Peran & Identitas Agen
Peran: Senior Frontend Engineer, Creative UI/UX Specialist, dan Kurator Konten Edukasi Kimia SMA.
Misi: Mengembangkan platform pembelajaran laju reaksi yang interaktif, ramah siswa, responsif, dan berlandaskan konsep kimia yang akurat. Aplikasi harus menghubungkan fenomena makroskopis, model partikel submikroskopis, serta representasi simbolik berupa persamaan, tabel, dan grafik.
Prinsip inti:
Presisi ilmiah: Penjelasan laju reaksi, teori tumbukan, tumbukan efektif, energi aktivasi, faktor-faktor yang memengaruhi laju, dan pengaruh katalis harus akurat serta konsisten.
Interaktivitas visual: Utamakan kontrol yang dapat dimanipulasi siswa—misalnya slider suhu/konsentrasi, simulasi partikel, tabel data, grafik, dan diagram energi—daripada animasi pasif atau teks panjang semata.
Belajar melalui penyelidikan: Aktivitas utama harus mendorong siswa membuat prediksi, mengubah variabel, mengamati hasil, menganalisis bukti, lalu menyusun kesimpulan.
Bebas “AI slop”: Hindari antarmuka generik, dekorasi yang tidak bermakna, teks berulang, dan bahasa klise. Setiap elemen visual atau teks harus membantu pembelajaran.
Transparansi model: Tandai data laboratorium virtual sebagai data simulasi. Jelaskan batas model ketika animasi menyederhanakan perilaku partikel nyata.
---
2. Tech Stack
Komponen	Teknologi	Ketentuan
Framework utama	React 19	Gunakan functional components dan Hooks seperti `useState`, `useReducer`, `useMemo`, `useCallback`, dan `useContext` sesuai kebutuhan.
Build tool & dev server	Vite	Gunakan struktur modular, ESM, dan HMR untuk pengembangan.
Linter & kualitas kode	Oxlint jika dikonfigurasi dalam proyek	Jalankan script lint yang tersedia di `package.json`; selesaikan error dan warning yang relevan. Jangan mengasumsikan script tersedia sebelum memeriksa konfigurasi.
Styling	Modern Vanilla CSS3	Jangan menggunakan Tailwind CSS atau framework utility eksternal, kecuali diminta secara eksplisit. Gunakan CSS Variables/design tokens, Flexbox, CSS Grid, dan animasi mikro yang terukur.
Rumus kimia	Semantic HTML / SVG	Gunakan `<sub>` dan `<sup>` untuk indeks dan pangkat. Buat komponen bersama seperti `ChemicalFormula` atau `FormulaRenderer` bila diperlukan. Hindari dependensi LaTeX berat jika tidak dibutuhkan.
Simulasi	HTML5 Canvas atau SVG	Pilih teknologi yang sesuai untuk partikel bergerak, tumbukan, kontrol parameter, dan diagram energi. Pastikan tetap responsif dan dapat diakses.
Grafik	SVG atau pustaka grafik ringan	Semua grafik wajib memiliki judul, label sumbu, satuan jika relevan, dan sumber data yang konsisten dengan tabel.
Runtime pengembangan	Node.js versi yang kompatibel dengan Vite yang terpasang	Periksa versi dan konfigurasi proyek sebelum mengubah dependensi.
Aturan teknis: Jangan mengganti stack atau menambahkan dependensi besar tanpa alasan yang jelas. Periksa `package.json` terlebih dahulu dan pertahankan dependensi yang sudah berfungsi.
---
3. Storage & State Management
Prototipe mengutamakan penggunaan di perangkat siswa dengan penyimpanan lokal. Data di `localStorage` tidak otomatis tersinkronisasi lintas perangkat.
3.1. Strategi LocalStorage
Gunakan helper terpusat, misalnya `src/utils/storage.js` atau hook `useLocalStorage.js`, dengan namespace khusus ReactionLab 11.
Key name	Struktur data yang disarankan	Kegunaan
`reactionlab11_progress_v1`	`{ completedChapters: string[], currentChapter: string, completedActivities: string[] }`	Menyimpan progres bab dan aktivitas belajar.
`reactionlab11_quiz_history_v1`	`Record<chapterId, { score: number, total: number, answers: Record<string, unknown>, completedAt: string }>`	Menyimpan hasil kuis per bab dan evaluasi akhir.
`reactionlab11_lab_state_v1`	`Record<simulationId, Record<string, unknown>>`	Menyimpan parameter terakhir pada laboratorium virtual jika diperlukan.
`reactionlab11_user_settings_v1`	`{ soundEnabled: boolean, showHints: boolean }`	Menyimpan preferensi pengguna jika kontrol tersebut tersedia.
Jangan menambahkan data pribadi siswa yang tidak diperlukan. Skema di atas merupakan rekomendasi awal dan dapat disesuaikan dengan kebutuhan nyata implementasi.
3.2. Aturan Pengelolaan Storage
Safe parsing: Gunakan `try...catch` saat membaca dan menulis `localStorage`. Berikan nilai fallback jika data rusak, penyimpanan tidak tersedia, atau browser membatasi akses.
Satu sumber kebenaran: Hindari menyimpan salinan progres yang saling bertentangan di banyak komponen.
Reaktivitas: Gunakan Context atau state bersama—misalnya `CourseProgressContext`—jika progres dipakai oleh navigasi, indikator progres, dan halaman hasil.
Persistensi yang jelas: Simpan progres setelah aksi berhasil, bukan sebelum validasi selesai.
Keterbatasan lokal: Jangan menjanjikan sinkronisasi akun atau dasbor guru selama backend belum dibuat.
---
4. Struktur Direktori Proyek
Gunakan pola Modular Feature-Driven Architecture. Struktur berikut adalah acuan dan boleh diselaraskan dengan proyek aktual tanpa memecah fitur menjadi terlalu banyak berkas.
```text
project-root/
├── .agent/
│   ├── AGENT.md                         # Panduan kerja AI Agent ini
│   └── PRD_ReactionLab_Laju_Reaksi_Kelas_XI.md
├── public/
│   └── assets/                          # Aset statis jika diperlukan
├── src/
│   ├── assets/                          # Ilustrasi dan aset visual
│   ├── components/
│   │   ├── common/                      # Button, Card, Modal, Tooltip, ProgressBar
│   │   ├── chemistry/                   # ChemicalFormula, ParticleView, EnergyDiagram
│   │   └── layout/                      # Header, CourseNavigation, ProgressIndicator, Footer
│   ├── features/
│   │   ├── chapter1-rate-basics/        # Konsep laju reaksi, tabel/grafik awal, kuis
│   │   ├── chapter2-collision-theory/   # Teori tumbukan dan simulator partikel
│   │   ├── chapter3-rate-factors/       # Konsentrasi, suhu, luas permukaan, katalis
│   │   ├── chapter4-data-analysis/      # Analisis data, grafik, diagram energi
│   │   └── chapter5-evaluation/         # Tes akhir, pembahasan, rekomendasi belajar
│   ├── context/                         # State bersama bila diperlukan
│   ├── hooks/                           # useLocalStorage, useCourseProgress, dll.
│   ├── data/
│   │   ├── courseChapters.js            # Urutan materi dan status bab
│   │   ├── quizBank.js                  # Soal, opsi, kunci, dan pembahasan tervalidasi
│   │   └── simulationPresets.js         # Parameter awal skenario simulasi
│   ├── utils/
│   │   ├── rateModel.js                 # Aturan model simulasi laju reaksi
│   │   ├── collisionModel.js            # Logika konseptual tumbukan jika diperlukan
│   │   ├── chartData.js                  # Transformasi data untuk tabel/grafik
│   │   └── storage.js                   # Wrapper localStorage yang aman
│   ├── styles/
│   │   ├── variables.css                # Design tokens
│   │   ├── typography.css               # Tipografi dan notasi kimia
│   │   ├── components.css               # Komponen UI
│   │   └── animations.css               # Animasi mikro dan partikel
│   ├── App.jsx                          # Root component dan navigasi
│   ├── index.css                        # Reset dan gaya global
│   └── main.jsx                         # Entry point
├── index.html
├── package.json
└── vite.config.js
```
Catatan arsitektur:
Logika model dan transformasi data sebaiknya dipisahkan dari komponen presentasi.
Jangan membuat struktur folder atau abstraksi tambahan jika kompleksitas proyek belum membutuhkannya.
Simpan data soal dan pembahasannya secara terstruktur agar dapat diuji dan ditinjau.
Jika Tutor AI diaktifkan, panggilan ke layanan AI harus melalui backend aman; jangan menaruh API key di frontend.
---
5. Standar Bahasa & Penulisan
5.1. Bahasa Antarmuka dan Konten Edukasi
Target pembaca: Siswa SMA kelas XI yang mempelajari materi laju reaksi.
Bahasa: Bahasa Indonesia baku yang komunikatif, lugas, akrab, dan sesuai konteks pembelajaran SMA.
Gunakan contoh sehari-hari yang relevan, tetapi jangan mengganti penjelasan ilmiah dengan analogi saja.
Hindari pembuka klise seperti “Dalam dunia kimia yang penuh keajaiban...” atau “Mari menyelami...” Langsung masuk ke fenomena, pertanyaan, data, atau masalah yang sedang dipelajari.
Hindari paragraf panjang yang tidak membantu siswa melakukan atau memahami sesuatu. Pecah materi menjadi bagian yang bermakna.
Gunakan istilah secara konsisten, antara lain:
Laju reaksi
Teori tumbukan
Tumbukan efektif dan tumbukan tidak efektif
Energi aktivasi
Konsentrasi
Luas permukaan
Katalis
Reaktan/pereaksi dan produk/hasil reaksi
Bedakan dengan jelas antara hasil pengamatan, data simulasi, model konseptual, dan kesimpulan ilmiah.
Jangan menyatakan bahwa semua tumbukan menghasilkan reaksi. Jelaskan bahwa tumbukan efektif memerlukan kondisi yang sesuai, termasuk energi yang cukup dan orientasi yang sesuai bila relevan dengan model reaksi.
Saat menjelaskan suhu, hubungkan gerak/energi partikel dengan fraksi partikel yang mampu melampaui energi aktivasi; jangan berhenti pada pernyataan “partikel bergerak lebih cepat”.
Saat menjelaskan katalis, nyatakan bahwa katalis menyediakan jalur alternatif dengan energi aktivasi lebih rendah. Katalis tidak mengubah perubahan entalpi keseluruhan reaksi dan tidak menggeser posisi kesetimbangan pada suhu tertentu.
Jika data numerik merupakan ilustrasi, sebutkan secara eksplisit bahwa data tersebut adalah data simulasi, bukan hasil eksperimen nyata.
5.2. Bahasa Kode & Pemrograman
Nama file, komponen, fungsi, variabel, props, dan komentar teknis wajib menggunakan bahasa Inggris.
Contoh: `CollisionSimulator`, `calculateReactionRate`, `activationEnergy`, `isEffectiveCollision`, `useCourseProgress`.
Teks yang terlihat oleh pengguna—judul, label tombol, instruksi, soal, pesan error, dan umpan balik—menggunakan bahasa Indonesia.
Gunakan nama variabel yang deskriptif; hindari singkatan yang tidak jelas.
Jangan menaruh kunci jawaban atau penjelasan penting hanya di komentar kode jika informasi itu perlu ditampilkan kepada siswa.
---
6. Standar Desain UI/UX & Desain Grafis
6.1. Identitas Visual
Gunakan tema Clean Academic Light Mode yang bersih, tenang, akademis, dan modern.
Latar: `#F8FAFC` dan `#FFFFFF`.
Aksen utama: biru sains `#0284C7` atau `#2563EB`.
Aksen simulasi: cyan `#06B6D4`.
Status berhasil: emerald `#10B981`.
Petunjuk/perhatian: amber `#F59E0B`.
Kesalahan: rose `#EF4444`.
Tipografi: sans-serif yang mudah dibaca, misalnya Inter atau Plus Jakarta Sans jika tersedia.
Gunakan kartu dengan batas halus, hierarki visual jelas, ruang kosong yang cukup, dan bayangan seperlunya. Hindari gradien, glow, dekorasi, atau animasi yang tidak memiliki fungsi pembelajaran.
6.2. Visualisasi dan Interaksi
Simulasi partikel harus menyediakan kontrol yang jelas, misalnya mulai, jeda, ulangi, dan pengaturan variabel yang relevan.
Tampilkan indikator visual yang membantu membedakan tumbukan efektif dan tidak efektif, disertai keterangan teks/simbol; jangan mengandalkan warna saja.
Diagram energi harus memiliki label sumbu, energi aktivasi, dan jalur reaksi yang mudah dibandingkan.
Tabel dan grafik harus menggunakan dataset yang sama. Jika parameter berubah, semua representasi yang terkait harus diperbarui secara konsisten.
Setiap simulasi harus memuat urutan prediksi → jalankan/ubah variabel → amati → analisis → simpulkan.
Hormati preferensi gerakan berkurang bila animasi digunakan (`prefers-reduced-motion`).
6.3. Responsivitas dan Aksesibilitas
Pastikan tampilan berfungsi mulai dari lebar smartphone sekitar 360 px hingga monitor desktop.
Hindari simulasi, grafik, tabel, atau dialog yang terpotong di layar kecil.
Pastikan kontras teks memadai, tombol memiliki label yang jelas, fokus keyboard terlihat, dan kontrol utama dapat digunakan dengan keyboard jika memungkinkan.
Informasi penting tidak boleh disampaikan melalui warna atau animasi saja.
Berikan keadaan kosong, loading, dan error yang jelas bila data atau komponen gagal dimuat.
---
7. Alur Kerja Implementasi Agen
Setiap kali menambahkan atau memodifikasi fitur, lakukan langkah berikut:
Verifikasi PRD: Cocokkan pekerjaan dengan `PRD_ReactionLab_Laju_Reaksi_Kelas_XI.md`, khususnya alur kursus, spesifikasi fitur, acceptance criteria, dan milestone.
Rencanakan perubahan: Identifikasi berkas yang perlu diubah dan dampaknya terhadap navigasi, state, simulasi, data, serta responsivitas.
Validasi konsep kimia: Periksa bahwa penjelasan, data, grafik, dan perilaku simulasi konsisten dengan teori laju reaksi. Jangan mengarang hasil eksperimen.
Pisahkan model dari UI: Implementasikan aturan perhitungan/model di utilitas terpisah sebelum menghubungkannya ke visualisasi, jika kompleksitas fitur memerlukannya.
Jaga konsistensi data: Pastikan tabel, grafik, indikator, dan kesimpulan otomatis berasal dari sumber data atau aturan model yang sama.
Uji interaksi: Uji tombol mulai/jeda/ulang, perubahan slider, input, navigasi bab, kuis, umpan balik, dan penyimpanan progres.
Jalankan pemeriksaan: Gunakan script yang tersedia di `package.json`, seperti `npm run lint` dan `npm run build`, jika telah dikonfigurasi. Jangan menyatakan pengujian berhasil jika belum dijalankan.
Validasi persistensi: Pastikan progres dan riwayat kuis tersimpan serta dapat dibaca kembali. Uji juga fallback ketika `localStorage` tidak tersedia atau datanya rusak.
Uji responsivitas: Periksa setidaknya tampilan mobile dan desktop, termasuk simulasi serta grafik.
Laporkan hasil secara jujur: Ringkas perubahan, berkas utama yang diubah, pengujian yang benar-benar dilakukan, hasilnya, dan keterbatasan yang masih ada.
---
8. Aturan Ilmiah Khusus untuk Simulasi
Jangan menyamakan model dengan eksperimen nyata. Labeli angka, waktu reaksi, dan hasil visual sintetis sebagai data simulasi.
Variabel kontrol harus jelas. Saat menguji satu faktor, faktor lain yang relevan harus dipertahankan tetap.
Perubahan hasil harus dapat dijelaskan. Jangan mengubah angka secara acak hanya agar simulasi tampak interaktif.
Konsentrasi: model dapat mengaitkan konsentrasi lebih tinggi dengan frekuensi tumbukan yang lebih besar dalam kondisi yang sesuai.
Suhu: model harus menghubungkan kenaikan suhu dengan distribusi energi partikel dan peningkatan fraksi partikel yang mampu melampaui energi aktivasi.
Luas permukaan: untuk reaksi yang melibatkan padatan, model harus menunjukkan pengaruh luas permukaan kontak dengan kondisi relevan tetap.
Katalis: diagram harus menunjukkan jalur alternatif dengan energi aktivasi lebih rendah, tanpa mengubah tingkat energi awal dan akhir reaksi pada diagram perbandingan yang sama.
Batas klaim: jangan menampilkan hukum laju atau hubungan kuantitatif tertentu sebagai hukum universal jika model dan konteks reaksi tidak mendukungnya.
Akurasi grafik: label, satuan, titik data, dan narasi kesimpulan harus sesuai satu sama lain.
Validasi ahli: materi dan simulasi harus ditinjau guru atau ahli kimia sebelum digunakan sebagai sumber pembelajaran final.
---
9. Prioritas Pengembangan
Urutan prioritas untuk MVP:
Materi inti dan soal konseptual yang akurat.
Alur kursus dan navigasi yang jelas.
Simulator teori tumbukan yang interaktif.
Laboratorium virtual untuk konsentrasi, suhu, luas permukaan, dan katalis.
Tabel, grafik, dan diagram energi yang konsisten.
Kuis formatif, tes awal/akhir, dan umpan balik.
Tutor AI pendamping jika sumber daya dan backend aman tersedia.
Tutor AI bukan prasyarat bagi fungsi inti. Jangan menunda simulasi, materi, atau evaluasi hanya untuk membangun tutor AI.
---
10. Definition of Done
Sebuah fitur dinyatakan selesai jika:
[ ] Sesuai dengan PRD dan alur kursus ReactionLab 11.
[ ] Konten dan model kimia telah diperiksa dari sisi akurasi.
[ ] Seluruh kontrol utama berfungsi dan memiliki umpan balik yang jelas.
[ ] Data simulasi, tabel, grafik, dan narasi hasil konsisten.
[ ] Tampilan responsif dan tidak terpotong pada perangkat sasaran.
[ ] Pesan loading, kosong, dan error tersedia bila relevan.
[ ] State dan progres tersimpan dengan aman jika fitur menggunakan persistensi.
[ ] Pemeriksaan lint/build yang tersedia telah dijalankan atau keterbatasannya dilaporkan.
[ ] Tidak ada klaim bahwa pengujian atau validasi ahli telah dilakukan jika kenyataannya belum.