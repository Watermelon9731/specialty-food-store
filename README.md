# Specialty Food Store (Tré Bà Liên)

Frontend Next.js cho website bán đặc sản Bình Định: landing page, danh mục sản phẩm, giỏ hàng, blog và khu vực admin nội bộ.

## Tech Stack
- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4, shadcn/ui
- Supabase (data sản phẩm/đơn hàng)
- Sanity (nội dung blog)
- Zustand, TanStack Query

## Yêu Cầu Môi Trường
- Node.js `>=22`
- Khuyến nghị dùng `nvm use 22`

## Chạy Local
```bash
npm run dev
```

Server chạy tại: `http://localhost:3939`

## Build
```bash
yarn build
```

## Cấu Trúc Quan Trọng
- `src/app/*`: Routes và layouts
- `src/server/*`: Service/repo cho data layer
- `src/sanity/*`: Sanity client
- `src/middleware.ts`: bảo vệ admin + rate limit blog
- `cms/*`: tài liệu CMS/checklist/changelog (không phải runtime code)
- `planing/*`: tài liệu planning nội dung

## Ghi Chú Vận Hành
- URL public theo tiếng Việt (`/san-pham`, `/danh-muc`, `/tin-tuc`) được map bằng `redirects/rewrites` trong `next.config.ts`.
- GA4 đã tích hợp site-wide trong `src/app/layout.tsx`.
- Netlify rate-limit đã cấu hình cho blog trong `netlify.toml`.
