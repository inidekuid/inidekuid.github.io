# Instalasi Nginx di Debian xx

_Tanggal: 2026-02-19_

---

Instalasi Nginx di Debian sangat mudah melalui repository resmi menggunakan perintah `sudo apt update && sudo apt install nginx -y`. Setelah instalasi, pastikan Nginx berjalan dengan `systemctl status nginx` dan sesuaikan firewall (UFW) untuk mengizinkan lalu lintas `HTTP/HTTPS`. File konfigurasi utama berada di `/etc/nginx`, sementara berkas situs disimpan di `/var/www/html`.

Berikut adalah panduan lengkap instalasi Nginx di Debian:

1. Update Repositori Sistem
Pastikan repositori sistem Anda diperbarui ke versi terbaru untuk menghindari konflik paket. 
```bash
sudo apt update && sudo apt upgrade -y
```
2. Instalasi Nginx
Instal paket Nginx menggunakan manajer paket APT. 
```bash
sudo apt install nginx -y
```
3. Konfigurasi Firewall (UFW)
Jika Anda mengaktifkan UFW, pastikan untuk mengizinkan Nginx (port 80 untuk HTTP dan 443 untuk HTTPS). 
```bash
sudo ufw allow 'Nginx Full'
```
4. Verifikasi Instalasi
Periksa apakah layanan Nginx sudah berjalan dengan benar. 
```bash
systemctl status nginx
```

Atau anda bisa buka browser dan akses alamat IP server Anda (misal: http://localhost atau http://192.168.x.x). jika berhasil maka akan muncul halaman sambutan "Welcome to nginx".

Good luck

