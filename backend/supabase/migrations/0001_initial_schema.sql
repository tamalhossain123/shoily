-- Shoily — initial database schema (DRAFT, not yet applied)
-- Platform: Supabase (Postgres). Apply after the Supabase project is created.
-- Conventions: snake_case tables, uuid primary keys, created_at timestamps,
-- prices in BDT stored as numeric(10,2). Row Level Security is enabled per
-- table at the end; public read access is granted only to catalogue tables.

create table if not exists categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  image_url   text,
  created_at  timestamptz not null default now()
);

create table if not exists products (
  id            uuid primary key default gen_random_uuid(),
  category_id   uuid references categories (id) on delete set null,
  name          text not null,
  slug          text not null unique,
  description   text,
  price         numeric(10,2) not null,
  compare_at    numeric(10,2),
  images        text[] not null default '{}',
  sizes         text[] not null default '{}',   -- e.g. {S,M,L,XL}
  colors        jsonb not null default '[]',    -- [{name, hex}]
  stock         integer not null default 0,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now()
);

create table if not exists customers (
  id          uuid primary key references auth.users (id) on delete cascade,
  full_name   text,
  phone       text,
  address     text,
  district    text,
  created_at  timestamptz not null default now()
);

create table if not exists orders (
  id              uuid primary key default gen_random_uuid(),
  customer_id     uuid references customers (id) on delete set null,
  customer_name   text not null,
  phone           text not null,
  address         text not null,
  district        text not null,
  payment_method  text not null default 'cod',  -- cod | bkash | nagad
  status          text not null default 'pending', -- pending | confirmed | shipped | delivered | cancelled
  subtotal        numeric(10,2) not null,
  delivery_fee    numeric(10,2) not null default 0, -- 0 when 2+ items (free delivery offer)
  total           numeric(10,2) not null,
  created_at      timestamptz not null default now()
);

create table if not exists order_items (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references orders (id) on delete cascade,
  product_id  uuid references products (id) on delete set null,
  size        text,
  color       text,
  quantity    integer not null default 1,
  unit_price  numeric(10,2) not null
);

-- Row Level Security (policies to be finalised during implementation)
alter table categories  enable row level security;
alter table products    enable row level security;
alter table customers   enable row level security;
alter table orders      enable row level security;
alter table order_items enable row level security;

-- Public catalogue: anyone can browse active products and categories.
create policy "Public read categories" on categories
  for select using (true);
create policy "Public read active products" on products
  for select using (is_active = true);
