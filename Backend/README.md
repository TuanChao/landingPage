# Backend – ZWCAD Vietnam (.NET 8 Web API)

ASP.NET Core 8 + EF Core (PostgreSQL) + JWT Auth.

## Cấu trúc

```
Backend/
└── ZwcadVietnam.Api/
    ├── Controllers/        Auth, Banners, News, Faq, Products, Downloads, Contacts, Uploads
    ├── Models/             Banner, NewsItem, FaqItem, Product, DownloadItem, ContactSubmission
    ├── Data/               AppDbContext, DbSeeder
    ├── Migrations/         EF Core migrations (sẽ tạo bằng dotnet ef migrations add)
    ├── Properties/         launchSettings.json
    ├── appsettings.json
    ├── Program.cs
    └── ZwcadVietnam.Api.csproj
```

## Yêu cầu

- .NET 8 SDK
- PostgreSQL 14+ (chạy local hoặc docker)
- Tool: `dotnet tool install --global dotnet-ef`

## Setup PostgreSQL

```bash
# Docker (tùy chọn)
docker run --name zwcad-pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:16

# Tạo database
psql -U postgres -h localhost -c "CREATE DATABASE zwcad_vn;"
```

Connection string trong `appsettings.json`:
```
Host=localhost;Port=5432;Database=zwcad_vn;Username=postgres;Password=postgres
```

## Run

```bash
cd Backend/ZwcadVietnam.Api
dotnet restore

# Lần đầu - tạo migration ban đầu
dotnet ef migrations add InitialCreate

# Chạy app (tự apply migrations + seed)
dotnet run                         # http://localhost:5000
# Swagger: http://localhost:5000/swagger
```

## Setup admin password (1 lần)

```bash
curl -X POST http://localhost:5000/api/auth/hash \
  -H "Content-Type: application/json" \
  -d '{"password":"your-password"}'
```

Copy `hash` trả về dán vào `appsettings.json` → `Admin:PasswordHash`, restart.

## Endpoints chính

| Method | Path                  | Auth |
| ------ | --------------------- | ---- |
| GET    | /api/health           | -    |
| POST   | /api/auth/login       | -    |
| GET    | /api/banners          | -    |
| POST/PUT/DELETE | /api/banners[/{id}] | ✓ |
| Tương tự: /api/news, /api/faq, /api/products, /api/downloads | | |
| POST   | /api/contacts         | -    |
| GET/PATCH/DELETE | /api/contacts | ✓ |
| POST   | /api/uploads          | ✓ (multipart, field=file) |

## Khi nối FE

Frontend admin trong `landingPage/src/admin/` đang dùng mock data (localStorage).
Khi muốn nối API thật: thay `useMockStore` bằng fetch tới các endpoint trên với `Authorization: Bearer {token}`.
