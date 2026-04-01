# Checklist Tối Ưu SEO & Fix Lỗi — trebinhdinh.com

> **Mục đích:** Hướng dẫn AI Agent (hoặc dev/SEO) thực hiện tuần tự các bước sửa lỗi và tối ưu cho site trebinhdinh.com.
> **Cách dùng:** Thực hiện từng task theo thứ tự ưu tiên. Mỗi task có mô tả vấn đề, hành động cụ thể, và tiêu chí hoàn thành (✅ Done criteria). Đánh dấu `[x]` khi hoàn tất.

---

## 🔴 ƯU TIÊN 1 — Sửa ngay trong ngày

Các lỗi này ảnh hưởng trực tiếp đến trust, trải nghiệm người dùng và khả năng index.

---

### 1.1 Fix 2 trang pháp lý bị lỗi ở footer

- **Vấn đề:** Link "Điều khoản sử dụng" và "Chính sách bảo mật" ở footer trả về status bất thường (UnexpectedStatusCode). Người dùng click vào sẽ thấy lỗi → mất trust, đặc biệt nghiêm trọng với site bán hàng có form liên hệ và giao dịch.
- **Hành động:**
  - [x] Kiểm tra route pháp lý trong codebase và xác nhận URL công khai cho "Điều khoản sử dụng" và "Chính sách bảo mật".
  - [x] Nếu trang chưa tồn tại → tạo mới với nội dung phù hợp cho site bán đặc sản (bao gồm: phạm vi áp dụng, quyền và nghĩa vụ, chính sách đổi trả, bảo mật thông tin cá nhân, phương thức thanh toán).
  - [x] Nếu trang đã tồn tại nhưng lỗi publish → kiểm tra slug/route và quyền truy cập ở tầng ứng dụng.
  - [x] Cập nhật lại href trong footer trỏ đúng URL hoạt động.
  - [x] Kiểm tra cả trên mobile và desktop.
- **✅ Done criteria:** Cả 2 link ở footer mở ra trang có nội dung, trả về HTTP 200, hiển thị đúng trên mọi thiết bị.

---

### 1.2 Gỡ hoặc sửa các category rỗng ở footer

- **Vấn đề:** Footer đang link sitewide đến các URL category rỗng: `?category=hai-san-kho`, `?category=thit-gac-bep`, `?category=nem-cha-dac-san`, `?category=gia-vi-truyen-thong`. Tất cả đều hiện "0 món", "Chưa có sản phẩm", heading hiển thị dạng slug thô. Đây là trang mỏng nội dung, gây lãng phí crawl budget.
- **Hành động:**
  - [x] **Phương án A (khuyến nghị nếu chưa có sản phẩm cho các nhóm này):** Xóa hoàn toàn các link category rỗng khỏi footer. Chỉ giữ lại link đến `/san-pham` hoặc các category đã có sản phẩm thật.
  - [ ] **Phương án B (nếu sắp bổ sung sản phẩm):** Giữ link nhưng thêm `noindex` cho các trang category rỗng, đồng thời sửa heading từ slug thô (`hai-san-kho`) thành tiếng Việt có dấu đúng ("Hải Sản Khô").
  - [x] Đảm bảo footer trên toàn site đồng bộ sau khi sửa (kiểm tra trang chủ, trang sản phẩm, trang blog).
- **✅ Done criteria:** Không còn link nào ở footer dẫn đến trang 0 sản phẩm. Hoặc nếu giữ lại thì trang đó phải có `noindex` và heading hiển thị đúng tiếng Việt.

---

### 1.3 Fix dữ liệu giá sai và nội dung placeholder ở nhóm mực

- **Vấn đề:**
  - Trang "Mực Một Nắng" (`/san-pham/muc-mot-nang`) và "Mực Khô Câu" hiện giá `5 ₫/ 50g` và `15 ₫/ 1g` ở block sản phẩm liên quan — rõ ràng là dữ liệu test/placeholder.
  - Trang "Mực Khô Câu" chứa câu tiếng Anh không liên quan: *"High quality saffron for culinary use."* — đây là nội dung copy từ template hoặc mapping sai.
- **Hành động:**
  - [ ] Truy cập trang quản lý sản phẩm nhóm mực trong CMS.
  - [x] Xóa hoàn toàn câu "High quality saffron for culinary use." khỏi mô tả sản phẩm "Mực Khô Câu".
  - [x] Sửa giá hiển thị: nếu chiến lược là "Liên hệ để có giá tốt nhất" → đảm bảo giá KHÔNG hiển thị ở bất kỳ đâu (bao gồm block sản phẩm liên quan, card thumbnail). Kiểm tra logic hiển thị giá trong template/component.
  - [ ] Nếu có giá thật → nhập đúng giá và đơn vị (ví dụ: `250.000 ₫/ 500g`).
  - [x] Kiểm tra toàn bộ sản phẩm khác xem có lỗi tương tự không (grep nội dung tiếng Anh lạ, giá dưới 1.000₫).
- **✅ Done criteria:** Không còn giá placeholder. Không còn nội dung tiếng Anh không liên quan. Mỗi sản phẩm hoặc hiện giá thật hoặc hiện "Liên hệ" nhất quán.

---

### 1.4 Chuẩn hóa thông tin địa chỉ (NAP consistency)

- **Vấn đề:** Trang giới thiệu ghi "Quy Nhơn, Bình Định". Footer/contact ghi "Thành phố Quy Nhơn, Tỉnh Bình Định | Phường Quy Nhơn, Tỉnh Gia Lai". Hai cách ghi khác nhau + "Tỉnh Gia Lai" có thể là lỗi dữ liệu, ảnh hưởng nghiêm trọng đến Local SEO.
- **Hành động:**
  - [ ] Xác nhận địa chỉ chính xác và đầy đủ từ chủ cơ sở (số nhà, đường, phường/xã, TP Quy Nhơn, Bình Định).
  - [x] Cập nhật địa chỉ **đồng nhất** tại tất cả các vị trí: header (nếu có), footer, trang liên hệ, trang giới thiệu.
  - [x] Xóa bỏ hoàn toàn "Tỉnh Gia Lai" nếu đây là lỗi.
  - [ ] Nếu có Google Business Profile → đảm bảo địa chỉ trên GBP khớp 100% với trên website.
- **✅ Done criteria:** Địa chỉ hiển thị giống nhau ở mọi nơi trên site. Không còn "Gia Lai" nếu đó là sai. Format thống nhất, ví dụ: `[Số nhà], [Đường], [Phường], TP. Quy Nhơn, Bình Định`.

---

## 🟡 ƯU TIÊN 2 — Làm trong tuần này

Các task này cải thiện CTR trên SERP, khả năng index và trải nghiệm tìm kiếm.

---

### 2.1 Viết lại title tag cho toàn bộ site

- **Vấn đề:** Hầu hết trang đang theo pattern lặp thương hiệu: `Tên trang | Tré Bà Liên | Tré Bà Liên`. Bỏ lỡ keyword quan trọng như "Bình Định", "đặc sản", "chính gốc", "Quy Nhơn". Google dễ rewrite title khi thấy site name lặp.
- **Hành động:**
  - [x] Áp dụng template title mới cho từng loại trang:

| Loại trang              | Template title đề xuất                                        | Ví dụ                                                      |
| ----------------------- | ------------------------------------------------------------- | ---------------------------------------------------------- |
| Trang chủ               | `Tré Bà Liên — Đặc Sản Tré Rơm & Chả Nem Bình Định Chính Gốc` | (giữ nguyên hoặc tinh chỉnh)                               |
| Trang sản phẩm          | `{Tên SP} Bình Định {trọng lượng nếu có} \| Tré Bà Liên`      | `Chả Ram Tôm Đất Bình Định 500g \| Tré Bà Liên`            |
| Trang danh mục          | `{Tên danh mục} Bình Định — Đặc Sản Chính Gốc \| Tré Bà Liên` | `Tré Bình Định Chính Gốc \| Tré Bà Liên`                   |
| Trang giới thiệu        | `Về Tré Bà Liên — Bếp Tré Thủ Công Ở Bình Định`               |                                                            |
| Trang liên hệ           | `Liên Hệ Đặt Hàng Đặc Sản Bình Định \| Tré Bà Liên`           |                                                            |
| Trang blog              | `{Tiêu đề bài} \| Tré Bà Liên`                                | `Chả Ram Tôm Đất: Món Ăn Dân Dã Miền Trung \| Tré Bà Liên` |
| Trang tin tức (listing) | `Tin Tức & Mẹo Hay Về Đặc Sản Bình Định \| Tré Bà Liên`       |                                                            |

  - [x] Đảm bảo mỗi title dưới 60 ký tự (hoặc ~580px). Đặt keyword quan trọng nhất ở đầu.
  - [x] Chỉ ghi `Tré Bà Liên` MỘT lần, đặt ở cuối sau dấu `|`.
- **✅ Done criteria:** Không còn title nào chứa `Tré Bà Liên` hai lần. Mỗi title chứa ít nhất 1 keyword mô tả liên quan đến nội dung trang.

---

### 2.2 Sửa alt text ảnh trong blog

- **Vấn đề:** Ảnh trong bài viết blog chỉ có alt text generic như "Image" hoặc "Hình bài viết" → bỏ lỡ traffic Google Images và kém accessibility.
- **Hành động:**
  - [ ] Mở từng bài viết trong CMS editor.
  - [ ] Với mỗi ảnh, viết alt text mô tả **cụ thể** nội dung thật của ảnh. Nguyên tắc:
    - Mô tả điều mắt nhìn thấy trong ảnh.
    - Chèn tự nhiên 1 keyword liên quan nếu phù hợp (không nhồi).
    - Độ dài: 10–20 từ.
  - [ ] Ví dụ tham khảo:

| Alt text cũ (sai) | Alt text mới (đúng)                                     |
| ----------------- | ------------------------------------------------------- |
| `Image`           | `Chả ram tôm đất cuốn bánh tráng chuẩn bị chiên giòn`   |
| `Hình bài viết`   | `Nem Chợ Huyện Bình Định gói trong lá ổi và lá chuối`   |
| `Image`           | `Mẹt tré rơm Bình Định bày cùng rau sống và bánh tráng` |

  - [ ] Kiểm tra cả ảnh trên trang sản phẩm — nếu cũng generic thì sửa luôn.
  - [x] Thêm fallback alt text trong renderer để chặn alt generic (`Image`, `Hình bài viết`) nếu dữ liệu chưa được cập nhật trong CMS.
- **✅ Done criteria:** Không còn ảnh nào có alt text là "Image", "Hình bài viết", hoặc trống. Mỗi alt text mô tả đúng nội dung ảnh.

---

### 2.3 Thống nhất taxonomy danh mục sản phẩm

- **Vấn đề:** Trang `/san-pham` hiện có các nhóm hợp lý (Chả Ram, Mực Khô, Nem Chả, Tré), nhưng footer link sang taxonomy hoàn toàn khác và rỗng. Cấu trúc danh mục không nhất quán.
- **Hành động:**
  - [ ] Liệt kê toàn bộ category đang tồn tại trong CMS (cả có sản phẩm lẫn rỗng).
  - [x] Quyết định bộ danh mục chính thức. Đề xuất dựa trên sản phẩm hiện có:
    - `Tré Bình Định`
    - `Nem Chả Bình Định`
    - `Chả Ram Bình Định`
    - `Mực Khô — Mực Một Nắng`
    - (Thêm khi có sản phẩm: `Hải Sản Khô`, `Gia Vị Truyền Thống`…)
  - [ ] Xóa hoặc merge các category rỗng, không sử dụng.
  - [x] Cập nhật footer chỉ hiển thị các category chính thức có sản phẩm.
  - [x] Nếu URL category dùng query param (`?category=...`) → cân nhắc chuyển sang URL path (`/san-pham/tre-binh-dinh`) cho clean hơn. Nếu không chuyển được → thêm `canonical` về `/san-pham` hoặc `noindex` cho param URLs rỗng.
- **✅ Done criteria:** Footer và trang `/san-pham` hiển thị cùng bộ danh mục. Không còn category rỗng nào được link từ navigation chính.

---

## 🟢 ƯU TIÊN 3 — Làm trong tháng này

Các task xây nền tảng SEO dài hạn.

---

### 3.1 Kiểm tra và bổ sung technical SEO cơ bản

- **Vấn đề:** Audit chưa xác nhận được robots.txt, sitemap.xml, canonical tag, schema markup từ raw source.
- **Hành động:**
  - [x] **robots.txt:** Kiểm tra route `src/app/robots.ts`, đảm bảo cho phép crawl public pages và trỏ về sitemap:
    ```
    User-agent: *
    Allow: /
    Sitemap: https://trebinhdinh.com/sitemap.xml
    ```
  - [x] **sitemap.xml:** Kiểm tra route `src/app/sitemap.ts`, đảm bảo có đầy đủ URL quan trọng (trang chủ, sản phẩm, danh mục có SP, blog, giới thiệu, liên hệ, pháp lý).
  - [x] **Canonical tag:** Mỗi trang phải có `<link rel="canonical" href="...">` trỏ về chính URL chuẩn. Đặc biệt quan trọng cho các trang `?category=...` — canonical nên trỏ về `/san-pham` nếu không có nội dung riêng.
  - [ ] **Schema markup (Product):** Mỗi trang sản phẩm nên có structured data dạng `Product` với: name, image, description, offers (price hoặc "Liên hệ"), brand ("Tré Bà Liên"). Validate bằng Google Rich Results Test.
  - [x] **Schema markup (LocalBusiness):** Thêm schema LocalBusiness cho toàn site với NAP đã chuẩn hóa ở bước 1.4.
  - [x] **Schema markup (BreadcrumbList):** Nếu breadcrumb đang hiển thị trên trang sản phẩm → thêm schema BreadcrumbList tương ứng.
- **✅ Done criteria:** `robots.txt` và `sitemap.xml` truy cập được, không có lỗi. Mỗi trang có canonical đúng. Schema Product pass validation trên ít nhất 3 trang sản phẩm. LocalBusiness schema có mặt trên trang chủ.

---

### 3.2 Xây dựng content plan cho blog

- **Vấn đề:** Blog mới có 2 bài — chưa đủ để phủ các intent tìm kiếm liên quan đến đặc sản Bình Định.
- **Hành động:**
  - [x] Nghiên cứu và lên danh sách 10–15 chủ đề bài viết theo các nhóm intent:

| Nhóm intent         | Chủ đề gợi ý                                             |
| ------------------- | -------------------------------------------------------- |
| Hướng dẫn sử dụng   | "Tré Bình Định ăn với gì? 7 cách ăn ngon nhất"           |
| Bảo quản            | "Cách bảo quản tré rơm tươi ngon lên đến 7 ngày"         |
| So sánh / phân biệt | "Phân biệt tré rơm và nem chua — khác gì nhau?"          |
| Mua làm quà         | "Top 5 đặc sản Quy Nhơn mua làm quà ai cũng thích"       |
| Công thức           | "Cách làm chả ram tôm đất tại nhà đúng vị Bình Định"     |
| Văn hóa ẩm thực     | "Tré Bình Định — Câu chuyện 30 năm giữ nghề của Bà Liên" |
| Mùa / dịp lễ        | "Đặc sản Bình Định biếu Tết — Gợi ý set quà ý nghĩa"     |

  - [ ] Mỗi bài tối thiểu 800–1.200 từ, có ảnh gốc (hoặc ảnh chụp thật sản phẩm) với alt text mô tả.
  - [ ] Mỗi bài chứa internal link đến ít nhất 1–2 trang sản phẩm liên quan.
  - [x] Đặt lịch publish: 2–4 bài/tháng.
- **✅ Done criteria:** Có content calendar dạng bảng với ít nhất 10 chủ đề, keyword mục tiêu, và ngày dự kiến publish. Trong tháng đầu publish thêm ít nhất 2–3 bài mới.

---

### 3.3 Tối ưu meta description cho toàn site

- **Hành động:**
  - [x] Viết meta description riêng cho mỗi trang quan trọng. Nguyên tắc:
    - 120–155 ký tự.
    - Chứa keyword chính + lời kêu gọi hành động.
    - Không lặp title.
  - [x] Ví dụ:

| Trang            | Meta description                                                                                                              |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Trang chủ        | `Tré Bà Liên — đặc sản tré rơm, chả ram, nem chả Bình Định làm thủ công, không chất bảo quản. Ship toàn quốc. Đặt hàng ngay!` |
| Chả Ram Tôm Đất  | `Chả ram tôm đất Bình Định chính gốc — giòn rụm, nhân tôm đất tươi. Gói 500g tiện biếu tặng. Freeship từ 300K.`               |
| Trang giới thiệu | `Hơn 30 năm giữ nghề làm tré thủ công ở Bình Định. Tìm hiểu câu chuyện Tré Bà Liên và quy trình sản xuất truyền thống.`       |

- **✅ Done criteria:** Mỗi trang chính (trang chủ, sản phẩm, giới thiệu, liên hệ, blog listing, từng bài blog) có meta description riêng, không trùng nhau, đúng độ dài.

---

### 3.4 Kiểm tra Core Web Vitals & tốc độ tải

- **Hành động:**
  - [ ] Chạy Google PageSpeed Insights cho trang chủ, 1 trang sản phẩm, 1 bài blog (cả mobile lẫn desktop).
  - [ ] Ghi nhận điểm LCP, FID/INP, CLS.
  - [ ] Nếu LCP > 2.5s → tối ưu ảnh (nén, dùng WebP/AVIF, lazy loading cho ảnh below-the-fold).
  - [ ] Nếu CLS > 0.1 → kiểm tra ảnh/iframe có khai báo width/height không, font loading có gây layout shift không.
  - [ ] Kiểm tra mobile-friendliness: font size đủ đọc, tap target đủ lớn, không bị overflow ngang.
- **✅ Done criteria:** Tất cả trang chính đạt "Good" (xanh) trên PageSpeed Insights cho cả 3 chỉ số Core Web Vitals, hoặc ít nhất không còn chỉ số nào ở mức "Poor" (đỏ).
- **Ghi chú triển khai (01/04/2026):** Đã thử gọi PSI API và nhận lỗi `429 Quota exceeded` khi dùng endpoint public không API key. Cần chạy thủ công trên giao diện PageSpeed Insights hoặc dùng API key riêng của dự án để hoàn tất mục này.

---

## 📋 Tổng hợp nhanh

| #   | Task                                    | Ưu tiên | Trạng thái |
| --- | --------------------------------------- | ------- | ---------- |
| 1.1 | Fix 2 trang pháp lý footer              | 🔴 Ngay  | ✅          |
| 1.2 | Gỡ/sửa category rỗng footer             | 🔴 Ngay  | ✅          |
| 1.3 | Fix giá sai + placeholder nhóm mực      | 🔴 Ngay  | 🟨          |
| 1.4 | Chuẩn hóa NAP/địa chỉ                   | 🔴 Ngay  | 🟨          |
| 2.1 | Viết lại title tag toàn site            | 🟡 Tuần  | ✅          |
| 2.2 | Sửa alt text ảnh blog                   | 🟡 Tuần  | 🟨          |
| 2.3 | Thống nhất taxonomy danh mục            | 🟡 Tuần  | 🟨          |
| 3.1 | Technical SEO (robots, sitemap, schema) | 🟢 Tháng | 🟨          |
| 3.2 | Content plan blog 10–15 bài             | 🟢 Tháng | 🟨          |
| 3.3 | Meta description toàn site              | 🟢 Tháng | ✅          |
| 3.4 | Core Web Vitals & tốc độ                | 🟢 Tháng | ⬜          |

---

> **Ghi chú cho AI Agent:** Sau khi hoàn thành mỗi task, chụp screenshot hoặc ghi log URL + trạng thái trước/sau để làm bằng chứng. Nếu gặp lỗi CMS không có quyền chỉnh sửa, ghi lại task đó và báo lại cho người quản trị.
