# 🏥 Sehatica - Healthcare Web Application

**Sehatica** adalah aplikasi web layanan kesehatan digital dengan fitur **diagnosis penyakit berbasis Machine Learning**, **blog kesehatan**, dan **autentikasi berbasis Supabase** dengan role **User** dan **Admin**.

---

## ✨ Fitur Utama

### 🔐 Autentikasi (via Supabase)

- Registrasi & login user menggunakan email/password
- Role user tersimpan di Supabase: `user` atau `admin`

### 🧠 Diagnosa Penyakit

- Input gejala → data dikirim ke Flask API (Python + TensorFlow)
- Model ML memproses gejala → hasil diagnosis dikirim ke Next.js
- Hasil diagnosis disimpan ke Supabase sebagai **history diagnosis**
- User bisa melihat riwayat diagnosis di dashboard

### 📝 Blog Kesehatan

- Public bisa melihat daftar & detail artikel
- Admin bisa **CRUD blog** dari dashboard
- Data blog (judul, konten, thumbnail) disimpan di Supabase

### 📊 Dashboard

- **Admin**: CRUD blog
- **User**: Lihat riwayat diagnosis yang pernah dilakukan

---

## 🛠️ Teknologi

| Area      | Stack Teknologi                    |
| --------- | ---------------------------------- |
| Frontend  | Next.js (App Router)               |
| UI        | Tailwind CSS + ShadCN UI           |
| Auth      | Supabase Auth                      |
| DB        | Supabase (PostgreSQL) - native SQL |
| Blog      | Supabase table + storage (gambar)  |
| Diagnosis | Flask + TensorFlow (Python)        |

---

## 📦 Cara Menjalankan Proyek

### 1. Clone Repository

```bash
git clone https://github.com/amamFz/capstone.git
cd capstone
```

### 2. Install Dependency (Next.js)

```bash
npm install
```

### 3. Setup Supabase

- Buat project di [https://app.supabase.com](https://app.supabase.com)
- Buat tabel berikut via SQL Editor:

#### `profiles`

```sql
create table profiles (
  id uuid primary key references auth.users(id),
  full_name text,
  avatar_url text,
  bio text,
  preferences jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

#### `blog_posts`

```sql
create table blog_posts (
  id serial primary key,
  title text,
  content text,
  excerpt text,
  category text,
  image_url text,
  author_id uuid references profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

#### `guides`

```sql
create table guides (
  id serial primary key,
  title text,
  description text,
  content jsonb,
  category text,
  difficulty text,
  time text,
  image_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

#### `saved_guides`

```sql
create table saved_guides (
  id serial primary key,
  user_id uuid references profiles(id),
  guide_id int references guides(id),
  created_at timestamptz default now()
);
```

#### `diagnosis_history`

```sql
create table diagnosis_history (
  id serial primary key,
  user_id uuid references profiles(id),
  condition text,
  symptoms text,
  severity text,
  duration text,
  confidence float8,
  recommendations text,
  created_at timestamptz default now()
);
```

### 4. Setup `.env.local`

Buat file `.env.local` di root dan isi:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_JWT_SECRET=
# Untuk konek ke API diagnosis Flask
DATABASE_URL=
```

### 5. Setup & Jalankan Flask API

```bash
cd backend
pip install -r requirements.txt
python app.py
```

API akan berjalan di `http://localhost:5000`\

### 6. Jalankan Next.js

```bash
npm run dev
```

---

## 🧲 Contoh Alur Diagnosis

1. User login/register via Supabase
2. Isi form gejala penyakit
3. Data dikirim ke Flask 
4. Flask kembalikan hasil diagnosis → ditampilkan ke user
5. Hasil diagnosis disimpan di Supabase → tampil di dashboard user

---

## 👥 Role & Akses

| Role  | Akses                                                  |
| ----- | ------------------------------------------------------ |
| User  | Diagnosa penyakit, lihat histori diagnosis, baca blog  |
| Admin | CRUD blog (buat/edit/delete), login ke dashboard admin |

---

## 📁 Catatan Tambahan

- Tidak menggunakan ORM (query dilakukan langsung via Supabase SQL API atau client)
- Data blog dan diagnosis tersimpan di Supabase (bukan file lokal)
- Gunakan Supabase Row Level Security (RLS) untuk membatasi akses data user

---

## ✅ Status

🔄 **Sedang Progress**\

