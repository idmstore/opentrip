# API Endpoint List

## Public
- `GET /health` - service health check.
- `GET /trips` - list active trips.
- `GET /trips/:slug` - trip detail with schedules and quota.
- `GET /trip-schedules?tripId=` - list departure schedules.
- `POST /bookings` - create booking and participants.
- `GET /bookings/:code` - booking status by booking code.
- `POST /payments/tripay/callback` - Tripay payment callback endpoint.

## Admin
- `POST /auth/login` - admin login.
- `POST /auth/refresh` - refresh access token.
- `GET /admin/stats` - simple booking, revenue, customer statistics.
- `CRUD /admin/trips` - manage trips.
- `CRUD /admin/trip-schedules` - manage trip schedules.
- `GET /admin/bookings` - list bookings.
- `GET /admin/bookings/:id` - booking and participant details.
- `GET /admin/customers` - customer list.
- `GET /admin/customers/:id/history` - customer trip history.
- `GET /admin/customers/export.csv` - export CRM data.
- `GET /admin/notification-logs` - notification delivery logs.
- `GET /admin/audit-logs` - audit trail.
