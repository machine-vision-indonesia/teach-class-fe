# TECH CLASS MVDP

![MVDP Logo](https://static.wixstatic.com/media/eb21c1_0189d0cb1beb4ff0b9597d59abdebfac~mv2.png/v1/fill/w_201,h_58,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Machine%20Vision.png)

**MVDP (Machine Vision Digitalization Platform)** adalah source code frontend yang digunakan untuk tech-class Machine Vision Indonesia.

## 🏛 ️Struktur Folder `/src`

```text
src
├── @core
├── @example
├── @fake-db
├── atoms.ts
├── client
├── components (nanti akan menjadi satu kesatuan untuk submodule master component)
│   ├── atoms
│   ├── molecules
│   ├── organisms
│   └── templates 
├── configs
├── constant
├── context
├── hooks
├── iconify-bundle
├── layouts
├── modules
│   ├── routes.tsx // routes utama di level src/modules
│   ├── error
│   ├── example
│   └── solutiongroup (nama foldernya DMS)
│       ├── clusters
│       │   └── cluster-name
│       │       └── pages
│       │           └── page-name
│       │               ├── components // komponen lokal yang dibutuhkan halaman
│       │               ├── constants
│       │               ├── hooks
│       │               ├── services
│       │               ├── store
│       │               ├── types
│       │               ├── utils
│       │               ├── CreateOrEdit.tsx // contoh halaman
│       │               └── index.tsx // halaman index atau list
│       ├── common // komponen yang banyak dipakai di lebih dari satu Page atau Cluster
│       │   ├── components
│       │   ├── constants
│       │   ├── hooks
│       │   ├── services
│       │   ├── store
│       │   ├── types
│       │   └── utils
│       └── routes.tsx // routes utama dari solutiongroup dan common
├── navigation
├── pages
├── service
├── store
├── stories
├── theme.ts
├── types
└── utils

```

### 📝 Persiapan Development

Sebelum memulai, pastikan Anda memiliki alat-alat berikut:

- **Text Editor/IDE**: Direkomendasikan menggunakan VSCode atau PHPStorm.
- **Extensions**: Sesuaikan dengan Text Editor/IDE yang digunakan dan install [Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) sebagai _drop-in replacement_ dari ESLint dan Prettier
- **Node.js**: Versi LTS.
- **Package Manager**: NPM
- **Git**: Tambahkan kunci publik SSH ke dalam akun Github melalui [pengaturan kunci](https://github.com/settings/keys).

### 🖲️ Teknologi yang digunakan

- **Framework**: Next.js v14.2.5 (<https://nextjs.org/docs>)
- **Programming Language**: TypeScript v5.5.4 (<https://www.typescriptlang.org>)
- **Router**: React Router v6.26.1 (<https://reactrouter.com/en/6.26.1>)
- **JavaScript Runtime**: Node.js LTS (<https://nodejs.org/en>)
- **UI Library**: Material UI v5.16.7 (<https://mui.com/material-ui/getting-started>)
- **Form Library**: React Hook Form (<https://react-hook-form.com>)
- **Form Validator**: Yup (<https://github.com/jquense/yup?tab=readme-ov-file>)
- **Client State Management**: Jotai v2 (<https://jotai.org>)
- **Server State Management**: TanStack Query v5 (<https://tanstack.com/query/latest>)
- **Date Utility**: date-fns (<https://date-fns.org>)
- **Components Documentation**: Storybook v8.2 (<https://storybook.js.org>)
- **Formatter & Linter**: Biome (<https://biomejs.dev>)

## 🏃🏻 Menjalankan MVDP

Untuk menjalankan MVDP, ikuti langkah-langkah berikut:

1. **Clone Repository**
   Clone repository dengan perintah berikut:

   - clone https

    ```shell
      git clone https://github.com/machine-vision-indonesia/teach-class-fe.git
    ```

   - clone ssh
  
    ```shell
      git clone git@github.com:machine-vision-indonesia/teach-class-fe.git
    ```

2. **Install Dependencies**
   Install semua dependency yang dibutuhkan dengan menjalankan:

    > [!NOTE]
    > wajib menggunakan npm dari pada yarn karenena ada bug pada yarn yang menyebabkan error pada running storrybook

    ```shell
    npm install
    ```

3. **Setup Environment Variables**
   Salin file `.env.example` ke `.env` dan isi berdasarkan instruksi dari Tech Lead:

    ```shell
    cp .env.example .env
    ```

4. **Jalankan MVDP**
   Jalankan aplikasi dengan perintah:

    ```shell
    npm run dev
    ```

## 👨🏻‍💻 Memulai Pengembangan

Proses pengembangan frontend dibagi menjadi dua area utama: **Komponen Master** dan **Pengembangan Fitur Proyek**.

### Pengembangan Komponen Master

Pengembangan Komponen Master biasanya dilakukan sebelum proyek dimulai. Tahap ini mencakup, namun tidak terbatas pada:

- Membuat dan mengembangkan komponen
- Memperbaiki dan menyesuaikan komponen yang ada
- Memperbarui Storybook

Pengembangan Komponen Master bisa terjadi selama proyek berlangsung. Dokumentasi komponen master dapat diakses melalui [Storybook MV Production](https://storybook.mvtool.machinevision.global/) dan [Storybook MV Staging](https://storybook-dev.mvtool.machinevision.global/) atau dengan menjalankan perintah:

```shell
npm run storybook
```

#### Aturan Pengembangan Komponen Master

Dalam Machine Vision, kita menerapkan Atomic Components dalam MVDP ini. Atomic components dalam pengembangan frontend mengacu pada komponen-komponen dasar dan kecil yang berfungsi sebagai blok bangunan dasar untuk membangun antarmuka pengguna yang lebih kompleks.

Pengembangan komponen master harus mematuhi aturan-aturan berikut untuk memastikan konsistensi dan kualitas:

- **Dokumentasi Komponen**: Setiap komponen harus memiliki deskripsi `JSDoc` di atas deklarasinya, diambil dari overview MV UI Kit atau ditulis manual.

  ```tsx
  /**
   * Komponen Avatar berfungsi sebagai representasi visual dari seorang pengguna, memberikan identifikasi yang cepat dan mudah dikenali.
   * Digunakan dalam berbagai konteks antarmuka, seperti info pengguna, bagian komentar, dan aplikasi pesan.
   * Jika perlu menampilkan beberapa avatar pengguna sekaligus, silakan gunakan Avatar Group.
   */
  export const Avatar = ({size = '26', src, alt, badgeColor, withBadge = false}: PropsAvatar): Element => {
      // ...
    }
  ```

- **Non-default Exports**: Semua komponen diekspor tanpa menggunakan `default` untuk kemudahan pelacakan.
  ![image](https://github.com/machine-vision-indonesia/mvdp-core/assets/22115051/b22df5d9-e464-480a-b03b-069b99b43f5f)
- **Struktur Default Props**: Nilai default diatur di dalam parameter fungsi untuk keterbacaan lebih baik.
  ![image](https://github.com/machine-vision-indonesia/mvdp-core/assets/22115051/370a28b2-559e-462b-871e-962387e34180)
- **Pisahkan Types/Interface**: Semua `types`/`interface` harus dipisahkan ke dalam folder `./types`.
- **Ekspor Komponen dan Props**: Lakukan ekspor `props` dan komponen melalui `index.ts` untuk memudahkan akses dan manajemen.
- **Golden Rule**: Tidak diperkenankan mengurangi properti yang ada. Penambahan properti harus dilakukan dengan hati-hati untuk menghindari Breaking Changes.
- **Tipografi**: Semua teks, termasuk label dan heading, **harus** menggunakan `MVTypography`.
- **Mode Tema**: Setiap komponen harus kompatibel dengan light mode dan dark mode.
- **Konsistensi Tema**: Komponen harus mendukung light mode dan dark mode, serta menggunakan warna yang diambil dari referensi tema di `src/theme.ts`.
- **Manajemen State**: Analisis kapan harus menggunakan state tingkat komponen (misalnya, React `useState`) dan kapan menggunakan state global (misalnya, Jotai) untuk manajemen state.
- **Storybook**: ⚠️ Semua komponen wajib didokumentasikan dalam Storybook.

#### Struktur Folder Master Komponen

Struktur folder untuk atoms, molecules, dan organisms terorganisir sebagai berikut:

```text
├── src/components/{atoms/molecules/organisms}
│   ├── nama-komponen // Kebab Case yang dipisahkan dengan hyphens (-)
│   │   ├── components
│   │   │   ├── NamaKomponen1.tsx // PascalCase
│   │   │   └── NamaKomponen2.tsx // PascalCase
│   │   ├── constants
│   │   │   └── common.ts // camelCase
│   │   ├── hooks
│   │   │   └── useFetch.ts // camelCase
│   │   ├── services
│   │   │   ├── fetchListData.service.ts // camelCase
│   │   │   ├── fetchData.service.ts // camelCase
│   │   │   ├── realTimeData.service.ts // camelCase
│   │   │   ├── actionUpdateData.service.ts // camelCase
│   │   │   ├── actionDeleteData.service.ts // camelCase
│   │   │   └── actionSaveData.service.ts // camelCase
│   │   ├── store
│   │   │   └── index.ts // camelCase
│   │   ├── stories
│   │   │   ├── namaKomponen1.stories.tsx // camelCase
│   │   │   └── namaKomponen2.stories.tsx // camelCase
│   │   ├── styles
│   │   │   ├── namaKomponen1.style.ts // camelCase
│   │   │   └── namaKomponen2.style.ts // camelCase
│   │   ├── types
│   │   │   ├── namaKomponen1.types.ts // camelCase
│   │   │   └── namaKomponen2.types.ts // camelCase
│   │   └── utils
│   │       └── index.ts // menggunakan camelCase
│   └── index.ts
```

### Pengembangan Fitur Proyek

Kegiatan pengembangan meliputi:

- Pengembangan fitur baru (Slicing dan integrasi)
- Perbaikan bug
- Peningkatan fitur yang ada

Pekerjaan dalam fase ini berfokus pada module sesuai solution group (`src/modules/{solutiongroup}`).

### Git Flow

<img width="1431" alt="Git Flow Graph" src="https://github.com/user-attachments/assets/5ee0373c-473c-441b-b7ab-0415ae8c3bec">

Git Flow ini dirancang untuk memastikan proses pengembangan yang terstruktur dan efisien untuk MVDP dan semua submodules yang ada. Berikut adalah penjelasan mengenai branch utama dan alur kerja (workflow) yang digunakan.

#### Branches

#### Main Branches

- **`release/{projectcode}`**: Branch ini digunakan untuk kode yang siap dirilis ke production. Semua kode di branch ini harus sudah teruji dan stabil.
- **`staging/{projectcode}`**: Branch ini digunakan untuk persiapan demo atau User Acceptance Testing (UAT) ke client. Kode di branch ini adalah versi stabil dari `dev/{projectcode}`.
- **`dev/{projectcode}`**: Branch ini digunakan untuk integrasi harian dari pengembangan fitur. Setiap perubahan dari feature branch akan di-merge ke sini setelah review.

##### Supporting Branches

- **Feature Branches (`feature/{projectcode}-{task-name}`)**: Branch ini digunakan untuk pengembangan fitur baru. Dibuat dari `dev/{projectcode}` dan di-merge kembali ke `dev/{projectcode}` setelah selesai dan direview.
- **Hotfix Branches (`hotfix/{projectcode}-{fix-name}`)**: Branch ini digunakan untuk perbaikan cepat terhadap bugs yang ditemukan di production. Dibuat dari `release/{projectcode}` dan di-merge kembali ke `release/{projectcode}` setelah selesai dan direview. Hotfix juga harus di-merge ke `staging/{projectcode}` dan `dev/{projectcode}`.

#### Workflow

##### Feature Development

1. Buat feature branch dari `dev/{projectcode}`:

    ```text
    git checkout dev/{projectcode}
    git checkout -b feature/{projectcode}-{task-name}
    ```

2. Lakukan pengembangan fitur di branch tersebut.
3. Buat Pull Request (PR) ke `dev/{projectcode}` setelah pengembangan selesai.
4. Tech Lead melakukan review PR.
5. Setelah approval, merge PR ke `dev/{projectcode}`:

    ```text
    git checkout dev/{projectcode}
    git merge feature/{projectcode}-{task-name}
    ```

========================END========================

## Versioning

- docker image

```text
mvdevops/tech-class-mvdp:core-4.0.0
```
