# AI_WORKLOG.md - Nhat Ky Ban Giao Nhanh

Muc tieu cua file nay: cho AI Agent/LTV den sau doc 2-3 phut la biet tinh hinh that cua repo va cac thay doi moi nhat.

---

## 2026-04-05 - Dong Bo Tai Lieu FE/CMS + Chuan Hoa Internal Paths

### Van de
- User xac nhan repo dang la FE landing/ecommerce runtime.
- Mot so tai lieu trong `cms/*` va `README` van de ngu canh cu, de gay nham lan.

### Da thuc hien
1. Cap nhat `cms/CMS_CONTEXT.md`:
   - Sua overview va conventions cho dung boi canh FE-first.
   - Sua scripts dev/build theo repo hien tai.
2. Cap nhat `README.md`:
   - Thay noi dung mac dinh create-next-app bang huong dan project that.
3. Cap nhat `src/app/admin/layout.tsx`:
   - Bo hard-code path (`/admin`, `/admin/login`, `/`) -> dung `PATH`.
4. Cap nhat `cms/CMS_CHANGELOG.md`:
   - Them muc log cho dot realignment tai lieu.

### Ket qua
- Tai lieu huong dan va runtime context da thong nhat.
- Giam kha nang AI/LTV sua nham theo ngữ cảnh CMS standalone.

---

## 2026-04-05 - Chinh Lai Ngu Canh Va Tai Lieu AI

### Van de
- Co nham lan giua:
  - Repo FE dang chay (`src/*`), va
  - Tai lieu CMS (`cms/*`).
- `AI_CONTEXT.md` va `AI_WORKLOG.md` cu da loi thoi 1 so diem (mo ta route/folder va pham vi du an chua ro rang).

### Da thuc hien
1. Viet lai `AI_CONTEXT.md` theo hien trang code:
   - Xac nhan repo nay la FE landing/ecommerce.
   - Lam ro `cms/*` + `planing/*` la tai lieu, khong runtime.
   - Bo sung blog hardening, rate-limit (middleware + Netlify), GA4, routing SEO.
2. Viet lai `AI_WORKLOG.md` de ngan gon, uu tien thong tin ban giao thuc dung.

### Ket qua
- Ngu canh cho AI/LTV moi da dong bo voi code hien tai.
- Giam rui ro tiep tuc sua nham sang tai lieu CMS khi user dang yeu cau FE.

---

## 2026-04-05 - Tich Hop GA4 Site-Wide

### Da thuc hien
- Gan Google tag vao `src/app/layout.tsx` bang `next/script`.
- Measurement ID: `G-09RWKSY68P`.

### Trang thai
- Da compile/type-check pass cho thay doi nay.

---

## 2026-04-04 - Bao Ve Blog Truoc Spam/Quota Burn

### Da thuc hien
1. Tao tang blog service/repo:
   - `src/server/blog/repo.ts`
   - `src/server/blog/service.ts`
2. Refactor blog list/detail/sitemap sang dung tang service tap trung.
3. Bat `useCdn` + `perspective: "published"` trong `src/sanity/client.ts`.
4. Them app-level rate-limit trong `src/middleware.ts` cho `/tin-tuc/*` va `/blog/*`.
5. Them Netlify code-based rate-limit trong `netlify.toml`.
6. Them trang thong bao `src/app/truy-cap-qua-nhanh/page.tsx`.

### Muc tieu
- Giam request amplification vao Sanity khi bi spam.
- Bao ve quota Free plan tot hon.

---

## Luu Y Cho Nguoi Lam Tiep

1. Truoc khi code:
   - Doc `AI_CONTEXT.md` de nho ro pham vi FE vs CMS docs.
2. Neu sua route public:
   - Cap nhat `PATH` + `next.config.ts` + `robots.ts` + `sitemap.ts` (neu can crawl).
3. Neu sua hardening/rate-limit:
   - Kiem tra ca 2 lop:
     - App middleware (`src/middleware.ts`)
     - Netlify config (`netlify.toml`)
4. Neu user yeu cau "chi FE":
   - Tranh sua `cms/*` tru khi user muon cap nhat tai lieu.
