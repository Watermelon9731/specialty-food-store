# TỔNG QUAN DỰ ÁN: TRÉ BÀ LIÊN (SPECIALTY FOOD STORE)

Tài liệu này dùng để giới thiệu và tổng hợp các thông tin cốt lõi của dự án dành cho các AI Agent hoặc lập trình viên mới tiếp nhận, giúp tối ưu quá trình đọc hiểu source code và kiến trúc.

## 1. MỤC TIÊU DỰ ÁN
Xây dựng một website thương mại điện tử chuyên bán các đặc sản địa phương (Tré, Nem Chả, Hải Sản Khô, Gia Vị...) của vùng đất Bình Định (Xứ Nẫu) với thương hiệu "Tré Bà Liên". Website có giao diện thẩm mỹ cao (premium feel, micro-animations) và tối ưu SEO mạnh mẽ để dễ dàng tiếp cận khách hàng.

## 2. TECHNOLOGY STACK
- **Node.js:** Yêu cầu BẮT BUỘC sử dụng Node.js Version 22 (Ví dụ: lệnh `nvm use 22`).
- **Framework Chính:** Next.js 16 (App Router), React 19.
- **Ngôn ngữ:** TypeScript.
- **Styling:** Tailwind CSS V4, shadcn/ui.
- **Hoạt ảnh (Animation):** Framer Motion.
- **Cơ sở dữ liệu (Database):** Supabase (PostgreSQL), kết nối thông qua `@supabase/supabase-js`.
- **Hệ quản trị nội dung (CMS):** Sanity CMS (Headless CMS) lưu trữ và phân phối bài viết tin tức. Kết nối qua `next-sanity`.
- **Quản lý State:** Zustand (cho Giỏ hàng - Cart).
- **Data Fetching:** TanStack Query (React Query) kết hợp Server Actions / API Routes.
- **Form & Validation:** React Hook Form + Zod.
- **Deployment:** Tối ưu hóa cho các nền tảng serverless như Vercel/Netlify/Cloudflare Pages.

## 3. CẤU TRÚC THƯ MỤC CỐT LÕI (`src/`)

- `app/` (Next.js App Router):
  - `(public routes)`: `/` (Home), `/san-pham` (Sản phẩm), `/danh-muc` (Danh mục), `/gioi-thieu` (Về chúng tôi), `/lien-he` (Liên hệ), `/tre-binh-dinh` (Landing page đặc biệt).
  - `admin/`: Khu vực quản trị (Dashboard, Orders, Inventory, Customers). Yêu cầu đăng nhập.
  - `tin-tuc/`: Hiển thị bài viết Blogs (Crawl liên tục từ Sanity CMS).
  - `api/`: Các endpoint giao tiếp nếu cần thiết, xử lý webhook hoặc tác vụ ngoài dòng chảy Server Component.
- `components/`: Đóng gói các UI chia nhỏ có thể tái sử dụng.
  - `layout/`: Header, Footer, FloatingContact.
  - `product/`: ProductGrid, ProductCard.
  - `cart/`: CartDrawer (Quản lý giỏ hàng phía Client).
  - `ui/`: File cấu hình từ Shadcn.
- `constants/`: Biến số cấu hình dùng chung.
  - `path.ts`: Lưu trữ tất cả URL nội bộ để quản lý tập trung và dễ thay đổi (Ví dụ: Định tuyến `/san-pham` thay vì `/products`).
- `hooks/`: Custom React Hooks. Nổi bật có `use-cart.ts` (quản lý giỏ hàng bằng Zustand).
- `server/`: Xử lý nghiệp vụ với Database.
  - `products/`, `categories/`, `inventory/`: Chia theo domain kiến trúc (Chứa schemas validtaion `schemas.ts` và logic kết nối `service.ts`).
- `types/`: Custom Type definitions dùng chung trong dự án.

## 4. SCHEMA CƠ SỞ DỮ LIỆU (SUPABASE)
Dự án sử dụng schema xoay quanh:
1. **Product**: Lưu thông tin sản phẩm (`id`, `name`, `pricePerUnit`, `slug`, `img`, `images`, `stockQuantity`, ...). Đáng chú ý: Có cờ `isMarketPrice` để ẩn giá cụ thể và hiển thị ghi chú "Giá theo thời điểm", yêu cầu khách liên hệ.
2. **Category**: Lưu danh mục hàng (`id`, `name`, `image`).
3. **ProductCategory**: Bảng trung gian (Junction table) tạo quan hệ Nhiều-Nhiều giữa Sản phẩm và Danh mục.
4. **Order**: Lưu thông tin đơn đặt hàng (`id`, `orderDescription`, `paymentStatus`, `deliveryStatus`).
5. **InventoryLog**: Nhật ký quản lý xuất nhập tồn kho.
6. **Blog (Sanity CMS)**: Tách biệt hoàn toàn khỏi Database PostgresSQL, Sanity lưu trữ `Post` (gồm `slug`, `title`, bài viết block-content `@portabletext/react`, hình ảnh, thời gian đăng). Cấu hình kết nối nằm ở `src/sanity/client.ts`.

## 5. QUY TRÌNH KINH DOANH VÀ LUỒNG (BUSINESS FLOWS)
- **Giỏ Hàng Client-side (Cart):**
  Xử lý thông qua `CartDrawer`. Vì là một website đặc sản với tính tuỳ chỉnh cao và giá thị trường thay đổi, **dự án không tích hợp cổng thanh toán tự động (Payment Gateway)**. Khi khách hàng đồng ý "Đặt hàng", thông tin giỏ hàng sẽ được format thành tin nhắn văn bản (kèm tổng tiền, số lượng) và điều hướng (Deep link) sang kênh chat **Zalo**, **Facebook Messenger** hoặc **Email** theo lựa chọn.
- **Giá Cả Tuỳ Biến (Market Price):**
  Thuộc tính `isMarketPrice` được dùng cho các sản phẩm hải sản nhảy giá theo mùa. Thay vì ép giá, hệ thống sẽ hiện chữ "Giá theo thời điểm" và ẩn nút "Thêm vào giỏ".
- **Khu vực Admin:**
  Bảo vệ bằng JWT qua Next.js Middleware. Chủ shop đăng nhập qua trang `/admin/login` để vào xem báo cáo tổng lợi nhuận, lên đơn khách, kiểm tra tồn kho.

## 6. SEO & PERFORMANCE (Best Practices)
- **Đa ngôn ngữ & Clean URL:** Code gốc phát triển từ `/products` và `/categories`. Tuy nhiên, để tối ưu địa phương hoá, các đường link đã được config `rewrites` và dồn vào biến `PATH` trong file `constants/path.ts` với cấu trúc thuần Việt (`/san-pham`, `/danh-muc`). Ở file `next.config.ts`, khai báo `redirects` status 301 vĩnh viễn với các bot tra cứu URL cũ.
- **Hình ảnh `<Image>` của Next.js:** Thay vì xài thẻ `<img>` tiêu chuẩn, dự án được tối ưu hóa bằng thẻ `<Image>` của Next.js. Các thuộc tính `fill`, `sizes`, và `priority` được thiết lập rất cẩn thận trên Grid và màn hình xem trước để:
  1. Tránh chạy Serverless Component sinh quá nhiều ảnh resize tốn tiền (ví dụ ép size chỉ `72px` ở Giỏ Hàng).
  2. Kéo điểm LCP xanh (90-100) trên Google PageSpeed Insights cho 2 ảnh đầu tiên (nhờ thuộc tính priority/eager lướt cực nhanh).
- **Sitemap & Robots:** Cấu trúc động sinh sitemap từ dữ liệu thật qua file `src/app/sitemap.ts`. File robots (`src/app/robots.ts`) cũng tự chặn bò thu thập tại `/admin`.

## 7. CODING CONVENTIONS & RULES (Quy Tắc Code)

Để duy trì chất lượng mã nguồn và sự đồng nhất, khi làm việc với dự án này cần tuân thủ các nguyên tắc sau:

### 1. Quản lý Route & Đường dẫn (Routing)
- **TUYỆT ĐỐI KHÔNG** sử dụng hard-code string cho các liên kết nội bộ trong ứng dụng (ví dụ: `<Link href="/san-pham">`).
- **BẮT BUỘC** phải sử dụng biến cấu hình được export từ file `src/constants/path.ts` (ví dụ: `<Link href={PATH.PRODUCTS.ALL}>`).
- Nếu có một route tĩnh mới được tạo ra, phải thêm định nghĩa của route đó vào `path.ts` trước khi sử dụng.
- **QUY TẮC PHÁT TRIỂN SEO LÕI:** Bất cứ khi nào tạo MỘT TRANG MỚI (Route mới/Đường dẫn mới) để tiếp cận người dùng, BẮT BUỘC AI / Lập trình viên phải tự động cập nhật:
  1. Cấu hình **`next.config.ts`**: Thêm `rewrites` (từ tiếng Việt sang folder tiếng Anh) và `redirects` (từ folder tiếng Anh sang URL tiếng Việt) để đảm bảo đồng nhất URL sạch.
  2. Cấu hình **`src/app/robots.ts`**: Thêm vào mục `allow`.
  3. Cấu hình **`src/app/sitemap.ts`**: Thêm vào mục `staticRoutes` hoặc dynamic mapping.
  Việc này giúp Google index kịp thời và duy trì cấu trúc URL thuần Việt.

### 2. Tối ưu Hình ảnh (Image Optimization)
- Khuyến nghị sử dụng thẻ `<Image />` từ `next/image` thay cho thẻ `<img>` truyền thống đối với các ảnh tĩnh và hình ảnh nội dung.
- Không để mặc định `fill` một cách tùy tiện không kiểm soát. **BẮT BUỘC** phải khai báo thuộc tính `sizes` cụ thể để chặn cơ chế tự động slice image (Serverless Function) không cần thiết của Next.js, tránh lãng phí dung lượng CDN và tiền ảo. (Xem ví dụ ở `CartDrawer.tsx` hoặc `ProductGrid.tsx`).
- Đối với các bức ảnh hiển thị ngay trên màn hình đầu tiên (Above the fold/Hero banners), phải bổ sung cờ `priority` để tối ưu hóa chỉ số LCP.

### 3. Xử lý Component & Styling
- Chỉ sử dụng Tailwind CSS V4 để tạo style.
- Đối với các component chia sẻ, sử dụng thư viện Shadcn UI.
- Viết code ưu tiên Server Components. Chỉ đẩy các file thành Client Components (chuẩn `"use client"`) khi module đó thực sự cần React state (`useState`, `useEffect`) hoặc các tương tác như onClick, event listeners (Ví dụ: `CartDrawer.tsx`).

### 4. Fetching Data & Database
- Khuyến khích mô hình **Server Actions** cho mọi thao tác C.R.U.D với Supabase từ phía server, giúp bảo mật API Key và không lộ logic bussiness ra browser. Dữ liệu sau đó có thể trích xuất trực tiếp xuống các Server Components ở dạng read-only, hoặc qua Tanstack Query để mutate phía client.
- Xử lý lỗi cẩn thận thông qua khối lệnh `try...catch` ở cấp độ service.

### 5. Naming Convention
- File Components (`.tsx`): Dùng PascalCase (Ví dụ: `ProductGrid.tsx`).
- File chức năng, utilities, constants (`.ts`): Dùng kebab-case hoặc camelCase (Ví dụ: `use-cart.ts`, `path.ts`).
- Route next.js: Bắt buộc tuân thủ nguyên tắc App Router (tên thư mục là Route, logic bọc trong các file cố định như `page.tsx`, `layout.tsx`, `route.ts`).

### 6. Quản lý Tài liệu Hiện trang (Project Context & Tracking)
- **BẮT BUỘC:** Mỗi khi code xong một chức năng lớn, hoàn thiện sửa lỗi (fix bug), thay đổi cấu trúc DB, hay refactor (tái cấu trúc) code:
  1. Hãy MỞ và VIẾT LẠI vào file `AI_WORKLOG.md` để ghi chú quá trình thực thi đó.
  2. Nếu logic liên quan tới mảng kiến trúc cốt lõi, HÃY CẬP NHẬT tự động ngay vào file `AI_CONTEXT.md` để đảm bảo file này luôn đúng với thực tế mã nguồn mới nhất. Mọi AI Agent chạy bộ mã nguồn này cần được kế thừa ngữ cảnh chính xác.
