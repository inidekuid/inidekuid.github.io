# WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED

_Tanggal: 2026-02-18_ 

---

Kemarin Setelah melakukan reset Host Key SSH, kemudian komputer klien yang saya gunakan mencoba terhubung ulang mendapatkan pesan error "WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED". maka yang saya lakukan dengan komputer saya yaitu dengan menghapus entri key lama di komputer dengan perintah:

```bash
ssh-keygen -R [IP_ATAU_HOSTNAME_SERVER]
```
kemudian ulangi lagi untuk remote ssh.

>catatan: Kondisinya saya menggunakan linux debian, untuk windows berbeda lagi ya caranya, tapi kalau pakai putty aman ndak perlu reset-reset CMIIW

Good luck.
