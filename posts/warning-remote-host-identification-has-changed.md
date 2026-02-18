# WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED

_Tanggal: 2026-02-18_  
_Kategori: Catatan_  
_Tag: SSH_

---

Setelah melakukan reset Host Key, kemudian komputer klien yang mencoba terhubung ulang mendapatkan pesan error "WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED". maka komputer klien harus menghapus entri key lama di komputer dengan perintah:

```bash
ssh-keygen -R [IP_ATAU_HOSTNAME_SERVER]
```
kemudian ulangi lagi untuk remote ssh

Good luck 
