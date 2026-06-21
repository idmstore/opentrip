# OpenTrip Booking Platform

Production-ready starter monorepo untuk platform Open Trip lokal dengan NestJS API, Next.js App Router untuk website publik dan dashboard admin, PostgreSQL, Prisma ORM, Redis queue, Docker Compose, Tailwind CSS, dan TypeScript.

## Struktur Folder

```text
apps/
├── api/                 # NestJS backend API
├── web/                 # Next.js public website
└── admin/               # Next.js admin dashboard
packages/
├── types/               # Shared TypeScript contracts
├── ui/                  # Shared React UI components
└── config/              # Shared app configuration
docs/
├── api-endpoints.md
└── erd.md
```

## Modul NestJS

- `AuthModule` untuk login admin, JWT, dan guard admin.
- `TripsModule` untuk katalog trip publik dan CRUD admin.
- `SchedulesModule` untuk jadwal keberangkatan dan kuota peserta.
- `BookingsModule` untuk form booking, peserta, kode booking otomatis, dan status booking.
- `PaymentsModule` untuk arsitektur Tripay dan callback pembayaran.
- `NotificationsModule` untuk queue WhatsApp dan integrasi OneSender.
- `CustomersModule` untuk CRM, riwayat trip, dan export CSV.
- `DatabaseModule` untuk Prisma client global.

## Next.js Route Structure

### Website Publik (`apps/web`)

- `/` beranda.
- `/trips` daftar trip.
- `/trips/[slug]` detail trip, jadwal, dan kuota.
- `/booking/[slug]` form booking.

### Admin (`apps/admin`)

- `/login` login admin.
- `/` dashboard statistik.
- `/trips` CRUD trip.
- `/schedules` CRUD jadwal trip.
- `/bookings` daftar booking dan detail peserta.
- `/customers` CRM pelanggan dan export CSV.

## Environment Variables

Salin file contoh berikut sebelum menjalankan aplikasi:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
cp apps/admin/.env.example apps/admin/.env.local
```

Variabel utama API:

- `DATABASE_URL` koneksi PostgreSQL.
- `REDIS_URL` koneksi Redis untuk BullMQ.
- `JWT_SECRET` secret minimal 16 karakter.
- `TRIPAY_MERCHANT_CODE`, `TRIPAY_API_KEY`, `TRIPAY_PRIVATE_KEY`, `TRIPAY_CALLBACK_SECRET` untuk integrasi Tripay.
- `ONESENDER_BASE_URL`, `ONESENDER_API_KEY` untuk WhatsApp.
- `WEB_URL`, `ADMIN_URL` untuk URL aplikasi.

## Instalasi Lokal

1. Install PNPM dan dependencies.

   ```bash
   corepack enable
   pnpm install
   ```

2. Jalankan PostgreSQL dan Redis.

   ```bash
   docker compose up -d postgres redis
   ```

3. Generate Prisma client dan jalankan migration.

   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```

4. Jalankan seluruh aplikasi.

   ```bash
   pnpm dev
   ```

5. Buka aplikasi:
   - API: <http://localhost:4000>
   - Swagger API docs: <http://localhost:4000/docs>
   - Website publik: <http://localhost:3000>
   - Admin: <http://localhost:3001>

## Database dan ERD

Skema Prisma berada di `apps/api/prisma/schema.prisma`. ERD tersedia di `docs/erd.md` dengan format Mermaid.

## Prinsip Arsitektur

- Clean Architecture: controller hanya menangani transport HTTP, service untuk use case, repository untuk akses data.
- SOLID: modul dipisahkan per bounded context dan dependency di-inject melalui NestJS DI container.
- Repository Pattern: repository disiapkan untuk aggregate utama seperti booking.
- DTO Validation: request publik menggunakan `class-validator` dan global `ValidationPipe`.
- Environment Validation: konfigurasi divalidasi dengan Zod saat boot.
- Scalable Module Structure: folder module berisi controller, service, DTO, dan repository.

## Roadmap Berikutnya

1. Implementasi guard JWT, refresh token, RBAC, dan seed admin default.
2. CRUD admin penuh untuk trip, jadwal, booking, dan pelanggan.
3. Integrasi Tripay production: create transaction, signature validation, idempotent callback, dan reconciliation job.
4. Integrasi OneSender production: template pesan, retry policy, dead-letter queue, dan delivery status sync.
5. Web publik dinamis dengan React Server Components, cache strategy, SEO metadata, sitemap, dan structured data.
6. Admin dashboard dengan chart revenue, occupancy, funnel booking, audit trail, dan export terjadwal.
7. Hardening production: rate limiting, request logging, OpenTelemetry, health checks, backups, CI/CD, dan image Docker per app.
