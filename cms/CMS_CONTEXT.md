# Specialty Food Store CMS - Project Context

## Overview
This repository (`specialty-food-store`) is the **Next.js frontend** for Tré Bà Liên.  
Sanity is used as a **headless CMS source for blog content**, but this repo is not a standalone Sanity Studio project.

The `cms/` folder is documentation/checklist context for CMS integration and operations.

## Security & Quota Note (Public Dataset)
- If a dataset is `public`, any third party can send read requests to the project API endpoints.
- Those requests are counted against this project's monthly quota (API / APICDN / bandwidth), even if traffic is not from our app.
- On Free/Growth Trial plans, these quotas are hard-capped. Once exhausted, public API/CDN responses can be blocked until monthly reset or plan upgrade.
- `private dataset` means read access requires authenticated users/tokens, but asset files are still not fully private by default.

## Implemented Blog Hardening (Current)
The frontend blog stack now includes practical protections to reduce quota burn risk:
- A centralized blog server layer (`src/server/blog/repo.ts`, `src/server/blog/service.ts`) handles list/detail/sitemap queries with scoped projections and cache settings.
- Blog list/detail/sitemap consume that layer so metadata/page rendering no longer duplicates Sanity query logic in multiple files.
- Sanity client now defaults to APICDN for public reads (`useCdn`) and fixed `perspective: "published"` to avoid draft leakage and unstable responses.
- Middleware protection is active on blog routes (`/tin-tuc`, `/blog`) with per-fingerprint burst/window rate-limits and temporary `429` blocking for abusive request patterns.
- Netlify code-based rate limits are configured in `netlify.toml` for blog paths (`/tin-tuc/*`, `/blog/*`) and rewrite throttled requests to `/truy-cap-qua-nhanh`.
- A dedicated rate-limit notice page (`src/app/truy-cap-qua-nhanh/page.tsx`) presents a clear Vietnamese message to users when they are throttled.
- Blog metadata now reads SEO fields from CMS (`metaTitle`, `metaDescription`, `metaKeywords`, `canonicalUrl`, `noIndex`) to keep SEO behavior editable in Studio.
- Global GA4 tracking snippet is integrated in `src/app/layout.tsx` with measurement ID `G-09RWKSY68P`.

### Remaining Infrastructure Recommendation
- For distributed attacks across many IPs, combine app-level throttling with edge WAF/CDN firewall rules (provider-level bot management) to avoid relying only on per-instance memory rate limits.

## Source Audit Plan (Send to Dev Team)
Goal: reduce quota abuse risk and accidental data exposure while preserving current frontend behavior.

### Phase 1 - Discovery (Code Inventory)
1. Locate all Sanity client initializations in source:
   - Search patterns: `createClient(`, `@sanity/client`, `projectId`, `dataset`, `useCdn`, `token`.
2. Map where queries are executed:
   - Browser-side frontend code.
   - Server-side code (API routes, server actions, edge/functions, cron jobs).
3. Identify public endpoints that proxy or expose Sanity data.

### Phase 2 - Risk Checks (Pass/Fail)
1. Token exposure:
   - Fail if any write/read token is shipped to browser bundles.
2. Query amplification:
   - Fail if a single page load triggers multiple redundant Sanity requests.
3. Caching posture:
   - Fail if server responses to repeated content queries are uncached (or cache TTL too short).
4. Query payload size:
   - Fail if queries return full documents when only partial fields are needed.
5. Route abuse protection:
   - Fail if public API routes that call Sanity have no rate-limiting or bot guard.

### Phase 3 - Remediation Plan
1. Move sensitive reads to backend/BFF and avoid direct client-side querying for non-public data needs.
2. Introduce response caching (ISR/revalidate or CDN cache headers) for blog listing/detail endpoints.
3. Minimize GROQ projections (return only required fields).
4. Add request throttling/WAF/rate limits on API routes that call Sanity.
5. Keep `useCdn: true` for public read paths where real-time freshness is not required.

### Phase 4 - Verification (Load + Quota Monitoring)
1. Run controlled load tests for common flows:
   - homepage, blog list, post detail, search.
2. Capture effective requests-per-view and KB-per-view from logs.
3. Estimate monthly traffic ceiling from observed metrics:
   - `views_per_month ~= min(APICDN_quota / req_per_view, bandwidth_quota / mb_per_view)`.
4. Set warning thresholds at 70%, 85%, 95% of monthly quota in monitoring/alerts.

### Quick Commands for Initial Audit
```bash
rg -n "createClient\\(|@sanity/client|useCdn|projectId|dataset|token" src app pages lib
rg -n "fetch\\(|client\\.fetch\\(|groq\\`|\\*\\[" src app pages lib
rg -n "api|route|server|action|edge|middleware" src app pages
```

## Code Conventions
- **Language**: TypeScript (`.ts`, `.tsx`), ensuring strong typing for schemas and configurations.
- **Framework**: Next.js 16 (App Router) + React 19.
- **Styling**: Tailwind CSS v4 + shadcn/ui.
- **Code Quality**: ESLint + TypeScript strict mode.
- **Module Resolution**: Uses modern `esnext` with Next.js bundler resolution.

## Existing Schema Modules
The Sanity dataset schema lives within `schemaTypes/` and combines multiple document and object types.

### 1. `post` (Document)
Defines blog posts or food-related stories.
- **Fields**: 
  - `title` (String): The title of the post.
  - `slug` (Slug): Generated from title.
  - `author` (Reference -> `author`): Who wrote it.
  - `mainImage` (Image): With hotspot support built-in.
  - `categories` (Array of References -> `category`): Plural taxonomy tagging.
  - `publishedAt` (Datetime).
  - `excerpt` (Text): Short summary of the post.
  - `metaTitle` (String): SEO page title (optional, fallback to title).
  - `metaDescription` (Text): SEO summary for search snippets.
  - `metaKeywords` (Array<String>): Optional SEO keyword tags.
  - `canonicalUrl` (URL): Canonical URL to avoid duplicate indexing.
  - `noIndex` (Boolean): Search engine indexing toggle.
  - `body` (Block Content for portable text).

### 2. `author` (Document)
Defines an author for posts.
- **Fields**: Name, Slug, Image, Bio (Block content).

### 3. `category` (Document)
Taxonomical structure for posts.
- **Fields**: Title, Description.

### 4. `blockContent` (Array/Object)
Standard rich-text editor setup for portable text within Sanity, defining default typography styles, lists, blockquote decorators, and image injection inside the rich text areas.

## Development Scripts
- `npm run dev`: Starts the Next.js frontend on `localhost:3939`.
- `yarn build`: Builds production output for deployment.

*Note: The project locally requires Node v22 for full compatibility with current toolchain and dependencies.*

## Project Guidelines & Rules
When contributing to or modifying this Sanity CMS implementation, refer to the following rules:

1. **Schema Modifications:**
   - Always map new schemas or updates directly inside the corresponding file in `schemaTypes/`. If you create a new document `type`, remember to import and add it to the `schemaTypes` array in `schemaTypes/index.ts`.
   - Before dropping or renaming fields on existing types (like `post` or `category`), ensure backward-compatibility considerations with existing data in production.
   - For `array` fields, prefer `defineArrayMember(...)` for each item in `of` to avoid TypeScript editor inference errors (e.g. `'of' does not exist in type ...`).

2. **Node & Dependency Management:**
   - Execute all build or development operations using **Node 22** (`nvm use 22`).
   - Keep package management consistent (`npm` or `yarn`) and avoid mixing lockfile updates in one commit.
   - Resolve TypeScript module errors by respecting modern ES Module constraints configured in `tsconfig.json`.

3. **Code Style:**
   - Follow existing TypeScript + ESLint conventions of this frontend project.
   - Keep UI style consistent with Tailwind utility patterns and shared UI components.

4. **Testing in Dev:**
   - Run frontend dev server via `npm run dev` (port `3939` from `package.json`).
   - Before merge/deploy, validate key routes (`/`, `/san-pham`, `/tin-tuc`, `/admin`) and lint/type-check status.

5. **Changelog & Documentation Maintenance (CRITICAL):**
   - **Anytime** a meaningful architecture/security/content-flow update happens, update `cms/CMS_CHANGELOG.md`, `cms/CMS_CONTEXT.md`, `AI_CONTEXT.md`, and `AI_WORKLOG.md` accordingly.
