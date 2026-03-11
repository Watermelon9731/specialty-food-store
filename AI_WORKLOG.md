# THẬT KÍ QUÁ TRÌNH LÀM VIỆC & BÀN GIAO CHO AI AGENTS (AI WORKLOG)

File này đóng vai trò như một **Nhật ký thực thi (Execution History)** và **Bản giao việc (Handover Document)**. Mục đích là để các AI Agent đời sau (hoặc trong phiên làm việc mới) có thể đọc nhanh, hiểu ngay lập tức quá trình dự án đang diễn ra đến đâu, đã giải quyết các bug nào, và cần làm tiếp những gì mà không cần đọc lại toàn bộ lịch sử chat hay chạy dò dẫm từng file.

---

## 📅 PHIÊN LÀM VIỆC GẦN NHẤT (Tháng 3/2026)

### 🎯 Mục tiêu đã giải quyết
1. **Sửa lỗi SEO & Nâng cấp Sitemap**:
   - Google Search Console báo lỗi "Phát hiện URL cũ chưa được lập chỉ mục" (`/products/...`). Nguyên nhân là do các Internal Links cũ bằng tiếng Anh vẫn còn nằm rải rác bên trong Next.js Components.
   - **Đã làm**:
     - Quy hoạch toàn bộ link quản lý tập trung qua `src/constants/path.ts`.
     - Thay nóng toàn bộ chuỗi `<Link href="/products">` thành `<Link href={PATH.PRODUCTS.ALL}>` (render ra `/san-pham`).
     - Tương tự với trang danh mục: Chuyển url thành `/san-pham?category=...` thông qua hàm `PATH.PRODUCTS.CATEGORY(slug)`.
     - Bổ sung `redirects` (301 Moved Permanently) trong file `next.config.ts` để chặn bots của Google mò vào URL cũ `/products` và ép chúng lập chỉ mục lại qua URL mới `/san-pham`.

2. **Tối ưu Hiệu suất & Điểm Google PageSpeed (LCP)**:
   - Thay thế toàn bộ thẻ HTML tiêu chuẩn `<img>` bằng thẻ `<Image>` của Next.js API để hỗ trợ nén WebP/AVIF.
   - **Tối ưu Serverless Cost**: Cấu hình cực kỳ khắt khe thuộc tính `sizes` (Ví dụ: `sizes="72px"` ở Cart Drawer hoặc `sizes="(max-width: 768px) 50vw, 300px"` ở Grid). Việc này ngăn Next.js tự động sinh ra hàng chục ảnh resize vô nghĩa, giúp tiết kiệm chi phí Serverless / Image CDN.
   - **Tối ưu LCP**: Fix lỗi lazy load ảnh Above-the-fold ở trang chủ (Hero section) bằng cách gán cờ `priority` cho 2 bức ảnh (Tré ruột & Chả ram tôm đất), giúp ảnh được tải ở dạng `eager`, kéo điểm PageSpeed lên mức xanh.

3. **Chỉnh sửa UI / Hiển thị theo Yêu cầu**:
   - Sửa dòng chữ "Liên hệ" trong `ProductCard` (khi sản phẩm có gắn cờ `isMarketPrice = true`) thành dòng "Giá theo thời điểm", hạ font size xuống `text-sm` để tinh tế hơn.
   - User tự sửa đổi phương châm ở trang chủ thành "Ăn sao, bán vậy - Từ bếp của tôi, đến tay của bạn."

4. **Kỷ luật Môi trường System (Enforcement)**:
   - Sinh file `AI_CONTEXT.md` tóm tắt toàn bộ business logic và codebase convention.
   - Bắt buộc dự án phải chạy ở **Node.js phiên bản 22**. Đã chèn `"engines": { "node": ">=22" }` vào `package.json` và tạo file `.nvmrc` để chuyển đổi mượt mà.

5. **Giải quyết Yêu cầu: Tích hợp Hệ thống Blog (CMS Sanity)**:
   - Hoàn thành thiết lập kết nối Sanity API thông qua thư viện `next-sanity`.
   - Tạo file Client Config `src/sanity/client.ts` để móc nối các Endpoint.
   - Định nghĩa Entity Type `SanityPost` tại `src/types/sanity.ts`.
   - Cấu hình file `next.config.ts` thêm domain `cdn.sanity.io` vào `remotePatterns` để cho phép module Next/Image render hình ảnh trả về từ Sanity.
   - Sửa lỗi hiển thị placeholder thành hiển thị ảnh thật trong nội dung văn bản gốc (Rich-text) bằng cách thiết lập hàm `urlFor` từ `@sanity/image-url`.
   - Bổ sung trải nghiệm "Blurred Background" (Nền mờ) đằng sau ảnh gốc trong bài viết. Giúp giao diện không bị trống lộ màu trắng khi tỷ lệ hình ngang dọc không khớp với container (giống cách hiển thị video TikTok/Reels ngang).
   - Chuẩn hoá cấu trúc URL cho Blog: Đổi tên folder từ `src/app/tin-tuc` thành `src/app/blog`, thiết lập `rewrites` và `redirects` trong `next.config.ts` (giống Sản phẩm và Danh mục) để có URL `/tin-tuc` thuần Việt mà folder vẫn là tiếng Anh.
   - Trực tiếp cập nhật dữ liệu bài viết mới nhất từ Sanity vào Sitemap (`src/app/sitemap.ts`) và mở khoá Bot Crawl (`src/app/robots.ts`) cho tính năng Blog.
   - Nâng cấp bộ quy tắc SEO Lõi: Bắt buộc cập nhật đồng thời sitemap, robots và next.config cho mọi trang mới.

---

## 📌 TRẠNG THÁI HIỆN TẠI & LƯU Ý
- **Git State**: Mã nguồn đã được cập nhật thành công các cấu hình quan trọng nhất về mặt kiến trúc tĩnh và SEO. Có thể tiến hành Commit & Deploy.
- **Vercel/Netlify Deployment**: Dự án đã an toàn khi đẩy lên các nền tảng serverless. Cấu hình Image Optimization sẽ tiêu thụ ít tài nguyên theo mức dự tiến cực đoan nhất.
- **Supabase**: Cơ sở dữ liệu vẫn đang dùng ổn định. Backend/Server Action kết nối chuẩn tới DB với quyền Bypass (Service Role key).

---

## 🚀 CÔNG VIỆC CẦN LÀM TIẾP THEO (Next Steps dành cho AI Agent)

1. **[Tùy chọn] Tích hợp Chatbot AI tư vấn**: Nếu khách hàng có nhu cầu, có thể gắn Floating Chatbot chuyên trả lời về hạn sử dụng, cách ủ tré ngon,...
2. **Theo dõi Indexing của Google:** Cần theo dõi GSC sau 1 tuần quét lại (từ 10/03/2026) xem tập link `/products/...` đã biến mất và thay bằng link `/san-pham/...` hoàn toàn chưa.
3. **Mở rộng Dashboard Admin**: Hiện tại chức năng Admin khá cơ bản (chặn middleware login OK). Có thể cần hỗ trợ chủ Shop xuất báo cáo chi tiết lợi nhuận, hoặc cấu hình nhanh đổi cờ `isMarketPrice`.
4. **Phát triển trang Blogs**: ĐÃ HOÀN THÀNH - Tích hợp Sanity CMS thành công theo yêu cầu của User. Điểm chạm tiếp theo có thể là cấu hình Webhook cho Sanity -> Next.js On-demand Revalidation nếu Shop viết bài quá nhiều.
5. **Đẩy mã nguồn và kiểm tra lại**: Kiểm tra biến môi trường NEXT_PUBLIC_SANITY_PROJECT_ID trên hosting Vercel/Netlify.

> 🤖 **Thông điệp cho AI kế nhiệm:** "Bạn hãy kiểm tra qua file `AI_CONTEXT.md` trước tiên nếu bạn có thắc mắc về thư mục. Sau đó, cứ thế dựa vào những thay đổi phía trên trong file Worklog này để code các task mới nhất mà hệ thống hoặc User chỉ định. Chúc bạn code không bug!"
