<!--
tags: debian, web server
category: catatan
-->

# Instalasi PHP untuk Nginx di Debian

Sekarang kita lanjut buat catatan Instalasi PHP untuk Nginx di Debian, dengan menginstal php-fpm (FastCGI Process Manager) agar Nginx dapat memproses file PHP untuk apache sedikit beda. Perintah utamanya adalah `sudo apt install php-fpm php-mysql`, diikuti dengan konfigurasi Nginx pada blok server untuk mengarahkan file .php ke socket PHP-FPM, lalu memuat ulang layanan.

## Langkah-langkah Install PHP-FPM di Debian (Contoh PHP 8.2/8.3):

1. Update repo dahulu

```bash
sudo apt update && sudo apt upgrade -y
```
2. Instal PHP-FPM dan Modul Umum
Instal versi yang diinginkan (misalnya 8.2 atau yang terbaru, namun disini anda bisa sesuaikan dengan versi Debian yang Anda gunakan) disini saya menggunakan debian 12:
```bash
sudo apt install php8.2-fpm php8.2-mysql php8.2-curl php8.2-gd php8.2-mbstring php8.2-xml php8.2-zip -y

```
biar ga salah bisa dicopy paste perintahnya.
3. Verifikasi Layanan PHP-FPM
Disini kita pastikan layanan PHPnya sudah jalan atau belum, perintah ceknya:

```bash 
sudo systemctl status php8.2-fpm  
php -version

 ```

4. Konfigurasi Nginx untuk PHP
jika dipastikan sudah berjalan layanan/service dari php fpmnya kita bisa lanjut konfigurasi Nginx defaulnya ada folder `/etc/nginx/sites-available/default`.
```bash
sudo nano /etc/nginx/sites-available/default
```

ubah konfigurasinya seperti ini:
```bash
server {
    listen 80;
    server_name domain_anda.com;
    root /var/www/html;
    index index.php index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # Lokasi pemrosesan PHP
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
    }
}
```
gunakan code editor yang anda su

5. Restart layanan/service nginx

```bash 
sudo nginx -t                # Test konfigurasi
sudo systemctl restart nginx # Restart jika OK
```
6. Uji PHP
Buat file info.php di `/var/www/html/` dan isi dengan `<?php phpinfo(); ?>`, lalu akses melalui browser chrome atau browser lynx terminal. 

Good luck
