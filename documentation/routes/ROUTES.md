# ROUTES

![MVDP Logo](https://static.wixstatic.com/media/eb21c1_0189d0cb1beb4ff0b9597d59abdebfac~mv2.png/v1/fill/w_201,h_58,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Machine%20Vision.png)

## 🏛 ️Gambaran Umum

Komponen `routes.tsx` bertanggung jawab untuk mengatur rute utama dari modul solutions menggunakan `createBrowserRouter` dari [**`react-router-dom`**](https://reactrouter.com/en/main) dan impor dinamis melalui `React.lazy`. Pengaturan ini memastikan bahwa berbagai modul seperti `dms, example` terdaftar di bawah main router di dalam folder `modules`,

## Konsep Utama

- **Dynamic Routing (Rute Dinamis):** Rute untuk modul solutions ditentukan secara dinamis menggunakan fungsi createBrowserRouter dari react-router-dom. Rute ini mencakup jalur untuk dms dan rute wildcard untuk menangani kesalahan 404.

- **Modular Architecture (Arsitektur Modular):** Setiap modul, seperti dms, mendefinisikan rutenya sendiri dalam file routes.tsx terpisah. Rute ini diimpor ke dalam konfigurasi rute utama (SolutionsRoute).

- **Lazy Loading (Pemanggilan Lambat):** Komponen SolutionsLayout dan NotFound dimuat secara dinamis menggunakan React.lazy untuk meningkatkan kinerja dengan memuatnya hanya saat dibutuhkan.

## Struktur Modul dan Rute

Struktur folder mengatur modul ke dalam direktori terpisah, seperti dms, error, dan example. Setiap modul dapat mendefinisikan file routes.tsx untuk mengelola rute spesifiknya.

Contoh Struktur Folder:

```go
modules/
├── routes.tsx // Rute utama untuk semua modul
├── dms<solution-group-name>/
│   ├── clusters/
│   ├── common/
│   └── routes.tsx // Router khusus untuk solution group ini
├── error/
│   └── pages/
│       └── routes.tsx
└── example<solution-group-name>/
    ├── clusters/
    ├── routes.tsx // Router khusus untuk solution group ini
    └── index.tsx
```

> ### check code [**disini**](https://github.com/machine-vision-indonesia/teach-class-fe/tree/main/src/modules) untuk lebih jelasnya


> [!IMPORTANT]
> wajib paham react-router-dom!!
> ### jangan lupa pelajari [react-router-dom](https://reactrouter.com/en/main)

Setiap file routes.tsx bertanggung jawab untuk mengekspor rute-rute khusus modul yang digunakan dalam konfigurasi rute utama.

### Penjelasan Kode

#### Import Statements

- zes1dmsRoutes: Mengimpor definisi rute dari modul dms (@/modules/dms/routes).
LocalizationProvider dan AdapterDateFns: Impor dari Material UI ini memungkinkan lokalisasi tanggal.
- useRouter: Hook dari Next.js ini digunakan untuk menangani routing secara programatik, terutama untuk rute kesalahan 404.
- Suspense dan lazy: Digunakan untuk pemanggilan lambat komponen guna mengoptimalkan waktu muat awal.
- RouterProvider dan createBrowserRouter: Digunakan untuk membuat rute dan menyediakan rute tersebut ke aplikasi.

#### Konfigurasi Rute

```tsx
  const routes = createBrowserRouter([
    {
      path: 'solutions',
      element: <SolutionsLayout />,
      children: [
        {
          path: 'dms',
          children: zes1dmsRoutes // ini adalah child route dari modul dms
        },
        {
          path: 'example',
          children: zes1dmsRoutes // ini adalah child route dari modul example
        }
      ]
    },
    {
      path: '*',
      loader: () => {
        return router.push('/404')
      },
      element: <NotFound /> // Komponen NotFound 404
    }
  ])
```

Konfigurasi ini menangani hal-hal berikut:

- Rute Utama (solutions): Merender komponen SolutionsLayout, dan menyarangkan rute-rute dari modul dms (zes1dmsRoutes).
- Rute Wildcard (*): Untuk menangani semua rute yang tidak ditentukan. Fungsi loader memicu pengalihan programatik ke rute /404.

## Kesimpulan

Komponen `routes.tsx` memanggil komponen `page`. Penggunaan `react-router-dom` memungkinkan definisi rute yang fleksibel.
