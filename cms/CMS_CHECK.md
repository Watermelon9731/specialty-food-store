# Hướng Dẫn Kỹ Thuật CMS — trebinhdinh.com

> Tài liệu này dành cho dev team. Tổng hợp thông tin cần biết khi làm việc với Sanity Studio cho dự án trebinhdinh.com.

---

## 1. Stack & môi trường

| Thành phần       | Chi tiết                   |
| ---------------- | -------------------------- |
| CMS              | Sanity Studio v5.13+       |
| Project name     | `specialty-food-store-cms` |
| Frontend dự kiến | Next.js hoặc React         |
| Build tool       | Vite                       |
| Ngôn ngữ         | TypeScript (`.ts`, `.tsx`) |
| Styling          | `styled-components`        |
| Node version     | **Node 22** (bắt buộc)     |
| Package manager  | `yarn`                     |
| Dev port         | `localhost:3636`           |

**Lệnh cơ bản:**
```bash
nvm use 22
yarn dev        # Chạy studio tại localhost:3636
yarn build      # Build output
yarn deploy     # Deploy lên Sanity hosted platform
```

---

## 2. Schema hiện có

### `post` — Bài viết blog
Các trường quan trọng cho SEO content calendar:

| Trường            | Kiểu                            | Mô tả                                       |
| ----------------- | ------------------------------- | ------------------------------------------- |
| `title`           | String                          | Tiêu đề, dùng generate slug                 |
| `slug`            | Slug                            | Auto từ title — **không đổi sau publish**   |
| `author`          | Reference → `author`            |                                             |
| `mainImage`       | Image                           | Có hotspot. Điền `alt` trong asset          |
| `categories`      | Array\<Reference → `category`\> | Taxonomy                                    |
| `publishedAt`     | Datetime                        |                                             |
| `excerpt`         | Text                            | Tóm tắt, hiển thị ở listing                 |
| `metaTitle`       | String                          | SEO title (≤ 60 ký tự), fallback về `title` |
| `metaDescription` | Text                            | SEO description (120–155 ký tự)             |
| `metaKeywords`    | Array\<String\>                 | Keyword tags                                |
| `canonicalUrl`    | URL                             | Canonical để tránh duplicate index          |
| `noIndex`         | Boolean                         | Toggle index/noindex                        |
| `body`            | Block Content                   | Portable text, rich text editor             |

### `author` — Tác giả
Fields: Name, Slug, Image, Bio (Block content).

### `category` — Danh mục
Fields: Title, Description.

**Các category cần tạo cho content calendar:**
- Tré Bình Định
- Chả Ram Tôm Đất
- Nem Chua Bình Định
- Mực Khô
- Mực Một Nắng

---

## 3. Quy tắc khi sửa schema

- Sửa/thêm schema → cập nhật file trong `schemaTypes/` → import vào `schemaTypes/index.ts`.
- Trước khi **xóa hoặc rename field** trên schema đang dùng (`post`, `category`) → kiểm tra backward-compatibility với data production.
- Với `array` field → dùng `defineArrayMember(...)` cho từng item trong `of`.
- Không dùng inline style trong React fragments — extend `styled-components` đúng cách.
- Sau **bất kỳ** thay đổi nào → cập nhật `session-changelog.md` và `project-context.md`.

---

## 4. Checklist SEO cần verify trên frontend

Dựa trên schema `post`, frontend cần đảm bảo render đúng các trường sau:

- [ ] `metaTitle` → `<title>` tag (fallback về `title` nếu rỗng)
- [ ] `metaDescription` → `<meta name="description">`
- [ ] `canonicalUrl` → `<link rel="canonical">`
- [ ] `noIndex: true` → `<meta name="robots" content="noindex">`
- [ ] `mainImage` + `alt` → `<img alt="...">` đúng chuẩn
- [ ] `slug` → URL path `/tin-tuc/[slug]`

---

## 5. Lưu ý bảo mật & quota (từ Source Audit Plan)

**Rủi ro cần xử lý theo thứ tự ưu tiên:**

1. **Token exposure:** Không ship write/read token vào browser bundle. Kiểm tra bằng:
   ```bash
   rg -n "token" src app pages lib
   ```

2. **Query về server-side:** Các read nhạy cảm phải qua backend/BFF, không query Sanity trực tiếp từ client.

3. **Caching:** Bật ISR/revalidate hoặc CDN cache headers cho blog listing và blog detail — tránh hit Sanity API mỗi request.

4. **GROQ projection tối thiểu:** Chỉ lấy fields cần thiết, không return full document.
   ```groq
   // Ví dụ đúng — chỉ lấy fields cần cho listing
   *[_type == "post"] {
     title, slug, excerpt, publishedAt, mainImage
   }
   ```

5. **Rate limiting:** Các public API route gọi Sanity cần có rate-limit hoặc WAF.

6. **CDN:** Dùng `useCdn: true` cho public read paths không cần real-time.

**Quick audit commands:**
```bash
rg -n "createClient\(|@sanity/client|useCdn|projectId|dataset|token" src app pages lib
rg -n "fetch\(|client\.fetch\(|groq\`|\*\[" src app pages lib
```

---

## 6. Monitoring quota

Sau khi deploy, thiết lập alert tại:
- ⚠️ 70% monthly quota
- 🔴 85% monthly quota  
- 🚨 95% monthly quota

Formula ước tính traffic ceiling:
```
views_per_month ≈ min(
  APICDN_quota / req_per_view,
  bandwidth_quota / mb_per_view
)
```

---

## 7. Liên kết với content calendar

Content calendar hiện có **25 bài blog** cần được publish trong Q2–Q3/2026. Lịch publish, slug, category và SEO fields cho từng bài đã được document đầy đủ trong:
- `Slug 27 bài blog` — URL path cho từng bài
- `Outline chi tiết 27 bài` — metaTitle, metaDescription, keyword cho từng bài
- `Brief viết bài` — hướng dẫn nhập liệu vào Sanity fields