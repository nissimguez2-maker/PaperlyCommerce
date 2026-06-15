-- Paperly — Supabase schema (catalog + orders).
-- The app reads the catalog from the bundled seed (src/data) by default and
-- uses these tables when Supabase env vars are configured. Orders are always
-- written here (server-side, via the service-role key) when configured.
--
-- Apply with the Supabase SQL editor or `supabase db push`, then run seed.sql.

-- ---------------------------------------------------------------------------
-- Catalog
-- ---------------------------------------------------------------------------
create table if not exists collections (
  id              text primary key,            -- 'pieces' | 'complete-sets'
  slug            text not null unique,
  name_en         text not null,
  name_he         text not null,
  tagline_en      text not null,
  tagline_he      text not null,
  description_en  text not null,
  description_he  text not null,
  position        int  not null default 0
);

create table if not exists products (
  slug            text primary key,
  collection_id   text not null references collections (id),
  name_en         text not null,
  name_he         text not null,
  tagline_en      text not null,
  tagline_he      text not null,
  description_en  text not null,
  description_he  text not null,
  dimensions_en   text not null,
  dimensions_he   text not null,
  image_alt_en    text not null,
  image_alt_he    text not null,
  included_en     jsonb not null default '[]',
  included_he     jsonb not null default '[]',
  images          jsonb not null default '[]',
  option_groups   jsonb not null default '[]',
  cross_sell      jsonb not null default '[]',
  favourite       boolean not null default false,
  premium_anchor  boolean not null default false,
  position        int not null default 0
);

create table if not exists product_variants (
  id          text primary key,                -- SKU
  product_slug text not null references products (slug) on delete cascade,
  label_en    text not null,
  label_he    text not null,
  options     jsonb not null default '{}',     -- { "pack": "50", "format": "round" }
  price       int  not null,                   -- whole shekels (ILS)
  position    int  not null default 0
);

-- ---------------------------------------------------------------------------
-- Orders
-- ---------------------------------------------------------------------------
create table if not exists orders (
  id                text primary key,          -- e.g. PL-XXXX-YYYY
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  locale            text not null default 'en',
  status            text not null default 'pending',  -- pending|paid|failed|cancelled
  total             int  not null,
  currency          text not null default 'ILS',
  items             jsonb not null default '[]',
  customer          jsonb,
  gateway_reference text
);

create index if not exists orders_status_idx on orders (status);
create index if not exists orders_created_idx on orders (created_at desc);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table collections      enable row level security;
alter table products         enable row level security;
alter table product_variants enable row level security;
alter table orders           enable row level security;

-- Catalog is publicly readable (anon key).
drop policy if exists "catalog read collections" on collections;
create policy "catalog read collections" on collections for select using (true);

drop policy if exists "catalog read products" on products;
create policy "catalog read products" on products for select using (true);

drop policy if exists "catalog read variants" on product_variants;
create policy "catalog read variants" on product_variants for select using (true);

-- Orders are NOT exposed to the anon key. Only the service-role key (which
-- bypasses RLS) may read/write them, from the server. No anon policy here.
