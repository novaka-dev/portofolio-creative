# ✅ Admin Dashboard — Selesai!

Fitur admin dashboard sudah berhasil diimplementasikan dan berjalan dengan baik.

---

## 🖥️ Tampilan Dashboard

````carousel
![Login Page — masukkan password untuk akses admin](C:\Users\Novaka Saputra\.gemini\antigravity-ide\brain\4e554016-999f-430c-bbf6-558827b6f5ca\login_page_1787197153689.png)
<!-- slide -->
![Admin Dashboard — ringkasan statistik dan navigasi tab](C:\Users\Novaka Saputra\.gemini\antigravity-ide\brain\4e554016-999f-430c-bbf6-558827b6f5ca\admin_dashboard_home_1787197221602.png)
<!-- slide -->
![Tab Upload Foto — pilih file, kategori, dan sub-kategori](C:\Users\Novaka Saputra\.gemini\antigravity-ide\brain\4e554016-999f-430c-bbf6-558827b6f5ca\admin_tab_upload_1787197250240.png)
<!-- slide -->
![Tab Tambah Video — paste link YouTube/TikTok/Cloudinary](C:\Users\Novaka Saputra\.gemini\antigravity-ide\brain\4e554016-999f-430c-bbf6-558827b6f5ca\admin_tab_video_1787197276363.png)
<!-- slide -->
![Tab Kelola Item — lihat dan hapus semua item dari database](C:\Users\Novaka Saputra\.gemini\antigravity-ide\brain\4e554016-999f-430c-bbf6-558827b6f5ca\admin_tab_manage_1787197294381.png)
````

---

## 📁 File yang Dibuat / Dimodifikasi

### Baru
| File | Fungsi |
|---|---|
| `middleware.ts` | Guard semua `/admin/*` route |
| `lib/supabase.ts` | Supabase public client |
| `lib/supabase-admin.ts` | Supabase admin client (service role) |
| `lib/auth.ts` | Helper session cookie |
| `app/admin/login/page.tsx` | Halaman login |
| `app/admin/login/actions.ts` | Server action login |
| `app/admin/layout.tsx` | Layout admin |
| `app/admin/page.tsx` | Dashboard utama |
| `app/admin/actions.ts` | Server actions: upload, addVideo, delete, logout |
| `app/admin/_components/UploadPhotoForm.tsx` | Form upload foto |
| `app/admin/_components/AddVideoForm.tsx` | Form tambah video |
| `app/admin/_components/ItemsList.tsx` | Daftar & hapus item |

### Dimodifikasi
| File | Perubahan |
|---|---|
| `next.config.ts` | Tambah Supabase domain + bodySizeLimit 10MB |
| `components/WorksGrid.tsx` | Fetch dari Supabase + merge works.ts |
| `app/works/[category]/page.tsx` | `dynamic = force-dynamic` |

---

## 🚀 Langkah Selanjutnya — Setup Supabase

> [!IMPORTANT]
> Dashboard sudah jalan, tapi upload foto dan video belum bisa tersimpan sampai kamu setup Supabase.

### 1. Buat Project Supabase
Buka [supabase.com](https://supabase.com) → **New Project** → isi nama & password database.

### 2. Isi `.env.local`
File `.env.local` sudah dibuat di root project. Isi dengan key dari Supabase:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
ADMIN_PASSWORD=password_kamu_yang_aman
```
> **Settings → API** di Supabase dashboard untuk menemukan key-key ini.

### 3. Buat Tabel di Supabase
**SQL Editor** → **New Query** → paste & run SQL ini:

```sql
CREATE TABLE works (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type       TEXT NOT NULL CHECK (type IN ('image', 'video')),
  category   TEXT NOT NULL,
  sub_category TEXT,
  src        TEXT,
  platform   TEXT,
  url        TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE works ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read" ON works FOR SELECT USING (true);

CREATE POLICY "Service role write" ON works FOR ALL
  USING (auth.role() = 'service_role');
```

### 4. Buat Storage Bucket
**Storage** → **New Bucket** → nama: `works` → centang **Public** → Save.

### 5. Restart Dev Server
Setelah isi `.env.local`, restart dengan `pnpm dev`.

---

## 🔒 Cara Akses Admin
Buka: `http://localhost:3000/admin/login` → masukkan password dari `.env.local`

