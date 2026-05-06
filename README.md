# ZWCAD Vietnam

Landing page và admin panel cho ZWCAD Vietnam.

## Cấu trúc

```
.
├── Frontend/                # React + Vite + TypeScript
│   ├── src/
│   │   ├── pages/           Public pages + admin pages (src/pages/admin/)
│   │   ├── components/      Common, sections, ui
│   │   ├── layouts/         MainLayout (public) + AdminLayout
│   │   ├── admin/           Mock data, types, shared admin styles & icons
│   │   ├── data/            Site content + i18n locales
│   │   ├── hooks/, contexts/, types/, seo/, styles/
│   ├── routes/              React Router config
│   ├── public/              Static assets (logos, images)
│   ├── package.json
│   ├── vite.config.js
│   └── tsconfig.json
│
└── Backend/                 # ASP.NET Core 8 + EF Core + PostgreSQL
    └── ZwcadVietnam.Api/
        ├── Controllers/     Auth, Banners, News, Faq, Products, Downloads, Contacts, Uploads
        ├── Models/          Entities
        ├── Data/            AppDbContext, DbSeeder
        ├── Program.cs
        └── appsettings.json
```

## Frontend

```bash
cd Frontend
npm install
npm run dev          # http://localhost:5173
```

- Public site: `http://localhost:5173/`
- Admin panel: `http://localhost:5173/admin/login`
- Admin hiện đang dùng mock data lưu localStorage. Chưa nối API.

## Backend (.NET 8 + PostgreSQL)

Yêu cầu: .NET 8 SDK, PostgreSQL 14+, `dotnet tool install --global dotnet-ef`

```bash
# 1) Tạo database
psql -U postgres -h localhost -c "CREATE DATABASE zwcad_vn;"

# 2) Chạy backend
cd Backend/ZwcadVietnam.Api
dotnet restore
dotnet ef migrations add InitialCreate    # lần đầu
dotnet run                                 # http://localhost:5000
# Swagger: http://localhost:5000/swagger
```

Connection string mặc định trong `Backend/ZwcadVietnam.Api/appsettings.json`:
```
Host=localhost;Port=5432;Database=zwcad_vn;Username=postgres;Password=postgres
```

## Khi nối Frontend ↔ Backend

Hiện tại admin trong Frontend dùng mock data (localStorage). Để chuyển sang API thật:
1. Tạo `Frontend/src/admin/api.ts` wrap `fetch` tới `http://localhost:5000/api/*`
2. Thay `useMockStore<T>(key, seed)` bằng custom hook fetch + cache
3. Thêm Bearer token từ login flow

Schema entity đã đồng bộ giữa `Frontend/src/admin/types.ts` và `Backend/.../Models/`.
