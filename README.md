# e-RDKK Gondang

Aplikasi Pencetak Dokumen Formulir Otomatis dari Template Excel

## Fitur Utama
- ✅ Upload Excel template (identifikasi kolom merah sebagai wajib diisi)
- ✅ Baca data dan validasi field mandatory
- ✅ Generate dokumen Word dengan template yang sama persis
- ✅ Export ke PDF atau Word
- ✅ Menu download dengan opsi rentang halaman atau cetak semua
- ✅ Replace "RDKK" → "e-RDKK" otomatis
- ✅ Formulir 1 halaman

## Setup

### 1. Clone Repository
```bash
git clone https://github.com/sobattanikuu/erdkkgondang.git
cd erdkkgondang
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Template Files
- Letakkan file Excel template di `templates/excel/`
- Letakkan file Word template di `templates/word/`

### 4. Run Server
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## Struktur Project
```
erdkkgondang/
├── server.js
├── config/
├── controllers/
├── utils/
├── routes/
├── views/
├── public/
│   ├── css/
│   └── js/
└── templates/
    ├── excel/
    └── word/
```

## License
MIT
