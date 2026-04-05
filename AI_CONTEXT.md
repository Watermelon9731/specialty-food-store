# AI_CONTEXT.md - Boi Canh Thuc Te Cua Repo

Tai lieu nay la "nguon su that" de AI Agent/LTV moi vao du an hieu dung hien trang ma khong bi nham lan giua FE va CMS.

## 1) Tong Quan Dung
- Repo hien tai la ung dung **Frontend Next.js** cho thuong hieu Tré Ba Lien (landing + catalog + cart + admin + blog render).
- Blog data lay tu Sanity (headless CMS), nhung **khong phai repo Sanity Studio**.
- Thu muc `cms/` va `planing/` chu yeu la **tai lieu/noi dung planning**, khong phai runtime code.

## 2) Stack Ky Thuat
- Next.js 16 (App Router), React 19, TypeScript.
- Tailwind CSS v4 + shadcn/ui.
- Framer Motion (animation), Zustand (cart state), TanStack Query.
- Supabase cho du lieu san pham/danh muc/don hang.
- Sanity cho blog (`next-sanity`, `@portabletext/react`, `@sanity/image-url`).
- Node.js: `>=22` (bat buoc trong `package.json`).

## 3) Cau Truc Thu Muc Chinh
- `src/app/*`: route pages theo App Router.
- `src/components/*`: UI/layout/cart/admin components.
- `src/server/*`: service/repo cho products/categories/inventory/blog.
- `src/sanity/client.ts`: config client doc blog.
- `src/middleware.ts`: auth admin + bao ve route blog khoi spam.
- `src/constants/path.ts`: map URL noi bo, uu tien dung `PATH`.
- `cms/*`: tai lieu CMS/checklist/changelog (tham khao, khong runtime).
- `planing/*`: content brief, sample post, planning.

## 4) Routing Va SEO URL
- URL public su dung tieng Viet: `/san-pham`, `/danh-muc`, `/tin-tuc`, ...
- Folder code van theo tieng Anh (`src/app/products`, `src/app/blog`, ...).
- Mapping duoc cau hinh trong `next.config.ts`:
  - `redirects`: URL tieng Anh cu -> URL tieng Viet.
  - `rewrites`: URL tieng Viet -> folder route thuc thi.

## 5) Blog Architecture (Trang Tin Tuc)
- Blog list/detail/sitemap dung service tap trung:
  - `src/server/blog/repo.ts`
  - `src/server/blog/service.ts`
- Query da toi uu:
  - Loc draft.
  - Loc bai chua toi `publishedAt`.
  - Projection field toi thieu.
- Cache/ISR:
  - Blog list/detail: revalidate 300s.
  - Sitemap: revalidate 3600s.

## 6) Hardening Chong Tan Cong/Spam (Quota Sanity)
- `src/sanity/client.ts`:
  - `useCdn` bat mac dinh (`NEXT_PUBLIC_SANITY_USE_CDN !== "false"`).
  - `perspective: "published"`.
- `src/middleware.ts`:
  - Rate-limit cho `/tin-tuc/*` va `/blog/*`.
  - Nguong hien tai:
    - 30 req / 10s (burst)
    - 120 req / 60s (window)
    - Vuot nguong -> block 60s, tra `429`.
- `netlify.toml`:
  - Code-based rate-limit cho `/tin-tuc/*` va `/blog/*`.
  - Vuot nguong rewrite ve `/truy-cap-qua-nhanh`.
- `src/app/truy-cap-qua-nhanh/page.tsx`:
  - Trang thong bao user dang truy cap qua nhanh.

## 7) Tracking/Analytics
- GA4 da duoc gan global trong `src/app/layout.tsx`.
- Measurement ID: `G-09RWKSY68P`.
- Script duoc inject bang `next/script` voi `strategy="afterInteractive"`.

## 8) Auth/Admin
- Middleware xac thuc JWT cho `/admin/*` (tru `/admin/login`).
- Token luu trong cookie theo hang so `TOKEN.ADMIN`.
- Admin routes hien co: dashboard, orders, inventory, customers.

## 9) Van Hanh Va Deploy
- Local dev: `npm run dev` (port 3939).
- Build: `yarn build` tren Netlify (`netlify.toml`).
- Plugin deploy: `@netlify/plugin-nextjs`.

## 10) Quy Tac Lam Viec Cho AI Agent
- Neu thay doi route public moi:
  1. Cap nhat `PATH`.
  2. Cap nhat `next.config.ts` (redirect/rewrite neu can).
  3. Cap nhat `robots.ts` + `sitemap.ts` neu route can crawl.
- Khong coi `cms/*` la source code runtime.
- Sau moi thay doi lon, cap nhat:
  - `AI_WORKLOG.md`
  - `AI_CONTEXT.md` (neu thay doi anh huong kien truc/luong chinh).
