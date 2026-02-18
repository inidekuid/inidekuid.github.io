# Blog Pribadi (HTML + JS + Markdown + Git)

Blog statis sederhana untuk menulis artikel **di lokal**, menggunakan **Markdown**, dan **publish cukup dengan Git**.  
Tanpa backend, tanpa framework berat, cocok untuk dokumentasi pribadi & blog teknis.

---

## Tujuan Sistem
- Menulis artikel **offline / lokal**
- Format artikel: **Markdown**
- Blog **statis** (HTML + JavaScript)
- Publish cukup:
```bash
  git commit && git push
```

## Struktur Folder

```text
blog-pribadi/
├── newpost.php            # Script PHP CLI buat artikel baru
├── templates/
│   └── post.md            # Template Markdown
├── posts/
│   ├── posts.json         # Daftar semua artikel (WAJIB)
│   └── *.md               # File artikel
├── index.html             # Halaman daftar artikel
├── post.html              # Halaman detail artikel
└── assets/                # CSS & JS
```

⚠️ **Jangan menghapus `posts/posts.json`**
Semua artikel harus terdaftar di file ini.

---

## Membuat Artikel Baru

### Buat post

```bash
php newpost.php "Judul Artikel"
```

Hasil:

* File baru: `posts/judul-artikel.md`
* Metadata otomatis ditambahkan ke `posts.json`


### 2️⃣ Edit isi artikel

```bash
nano posts/judul-artikel.md
```

Atau editor favorit Anda.


### Publish

```bash
## Preview di Lokal

Gunakan server lokal:

```bash
python3 -m http.server 8000
```

Buka di browser:

```bash
http://localhost:8000
```

Jangan buka via `file://`.


## ❌ Kesalahan Umum (Hindari)

* Mengedit `posts.json` sembarangan
* Lupa `git add`
* Salah format tanggal
* Menulis kode tanpa triple backtick
* Preview tanpa server lokal


## Checklist Sebelum Publish


### Code Block (Multi Baris)


```bash
git add .
git commit -m "Pesan commit"
```

### Code Block + Bahasa (Disarankan)

```php
<?php
echo "Hello World";
```

Bahasa yang umum:
- `php`
- `js`
- `html`
- `css`
- `bash`
- `json`
- `sql`


## Aturan Penulisan yang Disarankan
- Satu artikel = satu topik
- Gunakan heading (`##`) untuk tiap bagian
- Pisahkan teks & kode
- Jangan taruh kode panjang dalam paragraf
- Gunakan bullet list untuk langkah-langkah


## Metadata Artikel

Contoh entry di `posts/posts.json`:
```json
{
  "title": "Judul Artikel",
  "slug": "judul-artikel",
  "date": "2026-02-18",
  "category": "Catatan",
  "tags": ["git", "linux"],
  "excerpt": "Ringkasan singkat artikel.",
  "file": "judul-artikel.md"
}
```

Aturan:

* `date` → format `YYYY-MM-DD`
* `excerpt` → 1–2 kalimat
* `tags` → huruf kecil, singkat


## Urutan Artikel

* Artikel otomatis diurutkan **terbaru → terlama**
* Pastikan `date` benar
* Tidak perlu mengatur manual di HTML


## Preview di Lokal

Gunakan server lokal:

```bash
python3 -m http.server 8000
```

Buka di browser:

```bash
http://localhost:8000
```

Jangan buka via `file://`.



## ❌ Kesalahan Umum (Hindari)

* Mengedit `posts.json` sembarangan
* Lupa `git add`
* Salah format tanggal
* Menulis kode tanpa triple backtick
* Preview tanpa server lokal


## Checklist Sebelum Publish

* [ ] Artikel sudah dibaca ulang
* [ ] Code block rapi
* [ ] Tidak ada typo fatal
* [ ] Preview lokal OK
* [ ] `git status` bersih

