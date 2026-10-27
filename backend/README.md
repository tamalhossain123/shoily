# Shoily — Backend

> **Status: planned, not yet implemented.**
> This folder is the professional scaffold for the backend: architecture,
> data model and setup notes. No backend code runs in production yet —
> the storefront currently reads static data from `frontend/lib/data.ts`.
> Implementation starts once a Supabase project is created for Shoily.

## Planned platform: Supabase

| Concern          | Supabase feature        | Notes                                   |
| ---------------- | ----------------------- | --------------------------------------- |
| Database         | Postgres                | Products, orders, customers             |
| Authentication   | Supabase Auth           | Customer accounts (email / phone OTP)   |
| Product images   | Supabase Storage        | Replaces the demo-CDN placeholder media |
| Business logic   | Edge Functions          | Order placement, payment webhooks       |
| API              | PostgREST + supabase-js | Called directly from the frontend       |

## Data model (draft)

Defined in `supabase/migrations/0001_initial_schema.sql`:

- `categories` — product categories (name, slug, image)
- `products` — name, slug, price, compare-at price, description, category,
  images, sizes, colours, stock, active flag
- `customers` — profile data linked to Supabase Auth users
- `orders` — customer details, phone, address, district, payment method
  (cash on delivery / bKash / Nagad), status, totals
- `order_items` — line items (product, size, colour, quantity, unit price)

## Business rules the backend must support

- Free home delivery on orders of 2 or more items
- Cash on delivery available across all 64 districts of Bangladesh
- Easy size exchange for customers
- Payments: COD, bKash, Nagad; courier integration (Steadfast / Pathao) later

## Setup (when implementation starts)

1. Create a Supabase project and copy `.env.example` to `.env` with the
   project's URL and keys.
2. Apply the migrations in `supabase/migrations/`.
3. Point the frontend at the same project via
   `frontend/.env.local` (`NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`) and replace the static reads in
   `frontend/lib/data.ts` with Supabase queries, module by module.

## Folder guide

```
backend/
├── supabase/
│   ├── migrations/    # Numbered SQL migrations, applied in order
│   └── functions/     # Edge Functions (one folder per function)
├── .env.example       # Required environment variables (no real values)
└── README.md
```
