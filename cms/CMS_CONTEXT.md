# Specialty Food Store CMS - Project Context

## Overview
This project (`specialty-food-store-cms`) is a Sanity Studio built using React and TypeScript. It serves as the Content Management System (CMS) backend for a "Specialty Food Store." The CMS content interacts with an expected Next.js or React frontend (not completely present here but implied). 

The studio runs on Vite and Sanity v5.13+, which leverages full explicit ES Modules and modern TypeScript rules.

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
- **Framework**: React 19 + Sanity Studio v5.
- **Styling**: Uses `styled-components` for customized React components within Sanity.
- **Code Quality**: Uses ESLint (`@sanity/eslint-config-studio`) and Prettier for code formatting.
- **Module Resolution**: The project relies on `"esnext"` or `node16` / `nodenext` with module resolution enforced.

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
- `yarn dev`: Starts the Sanity studio in development mode on `localhost:3636` (as defined in our updated `package.json`).
- `yarn build`: Bundles the output for deployment.
- `yarn deploy`: Pushes the Sanity CMS builds directly to the hosted sanity platform.

*Note: The project locally requires Node v22 for full compatibility with ES Modules inside Sanity build scripts.*

## Project Guidelines & Rules
When contributing to or modifying this Sanity CMS implementation, refer to the following rules:

1. **Schema Modifications:**
   - Always map new schemas or updates directly inside the corresponding file in `schemaTypes/`. If you create a new document `type`, remember to import and add it to the `schemaTypes` array in `schemaTypes/index.ts`.
   - Before dropping or renaming fields on existing types (like `post` or `category`), ensure backward-compatibility considerations with existing data in production.
   - For `array` fields, prefer `defineArrayMember(...)` for each item in `of` to avoid TypeScript editor inference errors (e.g. `'of' does not exist in type ...`).

2. **Node & Dependency Management:**
   - Execute all build or development operations using **Node 22** (`nvm use 22`).
   - Adding or upgrading packages must be handled via `yarn` (given the presence of a `yarn.lock` file).
   - Resolve TypeScript module errors by respecting modern ES Module constraints (`"esnext"`, `"node16"`) in `tsconfig.json`.

3. **Code Style:**
   - All definitions should adhere strictly to typing conventions established by `@sanity/eslint-config-studio`.
   - Never commit ad-hoc inline styles inside React fragments when the project configures `styled-components`. Extend or utilize proper styled-components.

4. **Testing in Dev:**
   - Run dev commands using port 3636: `yarn dev`. This triggers `sanity dev --port 3636`.
   - Double-check runtime differences or package mismatch warnings using `yarn dev` terminal outputs directly before merging.

5. **Changelog & Documentation Maintenance (CRITICAL):**
   - **Anytime** a code update, script change, new file generation, or a terminal execution happens, the `session-changelog.md` and `project-context.md` files **MUST** be updated to reflect the latest state of the project.
