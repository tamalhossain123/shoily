# Shoily — E-commerce Website

Online storefront for **Shoily** (fashion / t-shirts), a clothing brand from Dhaka, Bangladesh.
The storefront is a custom-built Next.js application. Product data is currently served from a
static data module in the frontend; a Supabase backend is planned (see `backend/`).

**Live preview:** https://tamalhossain123.github.io/shoily/
**Repository:** https://github.com/tamalhossain123/shoily

## Tech stack

| Layer    | Technology                                  |
| -------- | ------------------------------------------- |
| Frontend | Next.js 15, React 19, TypeScript, plain CSS |
| Backend  | Supabase (Postgres, Auth, Storage) — planned |
| Hosting  | GitHub Pages (static export)                |

## Project structure

```
shoily/
├── frontend/            # Next.js storefront (all client-facing code)
│   ├── app/             # Routes (App Router): home, collections, product,
│   │                    # cart, search, login, info pages + global styles
│   ├── components/      # UI components
│   │   ├── chrome.tsx   # Announcement bar, header, drawers, footer, mobile dock
│   │   ├── hero.tsx     # Homepage hero
│   │   └── sections.tsx # Homepage sections (collections, lookbook, etc.)
│   ├── lib/
│   │   └── data.ts      # Product / collection / section content (data layer)
│   ├── package.json
│   └── next.config.mjs
│
├── backend/             # Backend (Supabase) — scaffold, not yet implemented
│   ├── supabase/
│   │   ├── migrations/  # Database schema migrations (draft)
│   │   └── functions/   # Edge Functions (planned)
│   ├── .env.example
│   └── README.md        # Architecture, data model and roadmap
│
├── .gitignore
└── README.md
```

## Getting started (frontend)

```bash
cd frontend
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
```

Static export (used for the GitHub Pages preview) is produced from a separate
build with `output: "export"` and `basePath: "/shoily"` in `next.config.mjs`.

## Backend status

The backend is **not implemented yet**. `backend/` contains the planned
architecture, an environment template and a draft database schema so the work
can start without re-planning. See `backend/README.md` for details.

## Notes for developers

- All storefront content (products, prices, images, section copy) lives in
  `frontend/lib/data.ts` — edit there, not in components.
- Section styles are grouped with comments in `frontend/app/globals.css`
  (plus `inner.css` / `inner2.css` / `inner3.css` for the inner pages).
- Product images currently load from a demo CDN as placeholders and will be
  replaced with Shoily's own product photos before launch.
