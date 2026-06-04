# e-RDKK Gondang

Aplikasi Pencetak Dokumen Formulir Otomatis dari Template Excel

## 🌐 Live Demo

**URL:** https://erdkk-gondang.vercel.app

Bisa diakses langsung dari web browser, tidak perlu install!

---

## ✨ Fitur Utama

- ✅ Upload Excel template
- ✅ Identifikasi kolom merah (wajib diisi)
- ✅ Auto generate form dari Excel
- ✅ Validasi field mandatory
- ✅ Generate dokumen Word
- ✅ Export ke Word/PDF
- ✅ Download dengan opsi halaman
- ✅ Replace "RDKK" → "e-RDKK" otomatis
- ✅ UI modern & responsive
- ✅ Real-time validation

---

## 🚀 Quick Start (Local)

### 1. Clone Repository
```bash
git clone https://github.com/sobattanikuu/erdkkgondang.git
cd erdkkgondang
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

---

## 📁 Struktur Project

```
erdkkgondang/
├── server.js                 # Main server
├── package.json
├── vercel.json              # Deployment config
├── README.md
├── routes/api.js            # API routes
├── controllers/              # Request handlers
├── utils/                   # Utility functions
├── views/index.html         # Frontend
├── public/                  # Static assets
│   ├── css/style.css
│   └── js/app.js
└── templates/               # Templates
```

---

## 🌐 Akses Online

Tidak perlu setup lokal! Langsung buka:

👉 **https://erdkk-gondang.vercel.app**

---

## 🔧 API Endpoints

- `POST /api/upload-excel` - Upload file Excel
- `GET /api/form-fields` - Ambil field dari Excel
- `POST /api/submit-form` - Submit form data
- `POST /api/generate-document` - Generate dokumen
- `GET /api/download/:filename` - Download file

---

## 📊 Technology Stack

**Backend:**
- Node.js + Express.js
- ExcelJS
- Docx
- Axios

**Frontend:**
- HTML5 + CSS3
- Vanilla JavaScript
- Responsive Design

---

## 📝 Cara Menggunakan

1. **Upload Excel** → Drag & drop atau klik upload
2. **Isi Form** → Form auto-generate dari Excel
3. **Download** → Pilih format Word atau PDF

---

## 📄 License

MIT - Free to use

---

**Akses aplikasi sekarang:** 👉 https://erdkk-gondang.vercel.app ✨
