# Blog Pribadi (SSG Sederhana dengan PHP)

Blog statis berbasis Markdown.
Alur kerjanya: tulis Markdown, lalu jalankan generator untuk menghasilkan HTML statis.

## Struktur Folder

```text
inidekuid.github.io/
├── config.php             # Konfigurasi identitas situs & generator
├── newpost.php            # Buat file post Markdown baru
├── publish.php            # Generate HTML statis + RSS
├── templates/
│   ├── post.md            # Template sumber Markdown untuk newpost.php
│   ├── site-layout.html   # Template layout utama HTML
│   ├── index-body.html    # Template body halaman index
│   ├── index-item.html    # Template kartu item post di index
│   └── post-body.html     # Template body halaman artikel
├── posts/
│   ├── posts.json         # Metadata semua artikel
│   ├── *.md               # Sumber konten
│   └── *.html             # Output halaman post hasil generate
├── index.html             # Output halaman daftar post hasil generate
├── assets/
│   ├── css/style.css
│   └── js/app.js          # Pencarian lokal di index
└── rss.xml
```

## Cara Pakai

1. Buat post baru:

```bash
php newpost.php "Judul Artikel"
```

2. Edit isi Markdown di `posts/<slug>.md`.

3. Generate ulang situs:

```bash
php publish.php
```

Perintah ini akan menghasilkan ulang:
- `index.html`
- `posts/*.html`
- `rss.xml`

4. Commit dan push:

```bash
git add .
git commit -m "Publish blog"
git push
```

## Konfigurasi Situs

Edit file `config.php` untuk mengubah identitas situs:

- `site_title`
- `site_description`
- `site_tagline`
- `footer_text`
- `site_url`
- `lang`
- `rss_path`
- `rss_limit`
- `default_category`

Catatan: untuk RSS yang valid, isi `site_url` dengan URL penuh situs (contoh: `https://inidekuid.github.io`).

## Metadata di Markdown

Anda bisa isi metadata di komentar HTML paling atas:

```md
<!--
tags: linux, nginx, debian
category: Catatan
-->
```

Jika metadata kosong, nilai dari `posts.json` akan dipakai.

## Preview Lokal

```bash
python3 -m http.server 8000
```

Buka `http://localhost:8000`.
