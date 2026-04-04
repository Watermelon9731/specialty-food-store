# Session Execution Log & Changelog

This document provides a summary of all fixes and configurations established during this development session.

## 1. TypeScript Configuration Fix
- **Action:** Modifed `tsconfig.json` to alter `"module": "Preserve"` to `"module": "esnext"` and appended `"moduleResolution": "node"`. 
- **Reason:** Prevented initial schema evaluation errors. The editor's TypeScript version was struggling to interpret the newer `"Preserve"` compilation module syntax.

## 2. Package Dev Port Configuration
- **Action:** Specified a port designation inside `package.json` by updating `"dev": "sanity dev"` to `"dev": "sanity dev -p 3636"`.
- **Reason:** Fulfilling the requirement to explicitly target localhost port 3636 for development testing.

## 3. Node Environment enforcement
- **Action:** Used Node Version Manager (`nvm use 22`) for running the terminal.
- **Reason:** Modern `@sanity/cli` architecture aggressively relies on current ES module definitions requiring newer Node binaries to build seamlessly.

## 4. Contextual Project Documentation Map
- **Action:** Generated the overarching `project-context.md` resource inside the root directory. Added the `Project Guidelines & Rules` subset to handle Node, Yarn, ES syntax definitions, and `styled-components`.
- **Reason:** Serves as a dynamic reference to rapidly orient anyone (or an AI assistant) observing the repository's rules, `schemaTypes` (`post`, `author`, `category`, `blockContent`), and frameworks without jumping across multiple project files.

## 5. Sanity Update Crash Resolution
- **Action:** Discovered and intercepted the bugged `yarn upgrade  sanity@...` update trigger natively shipped inside Sanity CLI's auto-updater.
- **Action:** Extracted the update logic by forcefully bumping `sanity` and `@sanity/vision` package thresholds from `^5.13.0` to `^5.14.1` within `package.json`.
- **Action:** Executed a clean `yarn install` block natively.
- **Reason:** The dev server would continuously crash with an `EPERM` exit code 1 upon launch because of Yarn 1.x choking on Sanity's double-spaced upgrade command. This manually bypasses the updater issue and successfully stabilizes Sanity locally.

## 6. Corrected Port Flag in Dev Server Script
- **Action:** Modified `package.json` to change the script from `"sanity dev -p 3636"` to `"sanity dev --port 3636"`.
- **Reason:** The Sanity CLI does not accept `-p` as a short alias (it ignores it), routing the server to default `3333`. Changing to `--port` effectively boots Sanity on localhost `3636`.

## 7. Created the First Sample Blog Post
- **Action:** Created `sample-data.ndjson` featuring robust initial CMS data (an `author`, a `category`, and a rich-text `post`).
- **Action:** Executed `yarn sanity dataset import sample-data.ndjson production --replace` to inject it safely into the backend.
- **Reason:** Fulfilling the requirement to initiate a sample blog post, allowing the user to immediately view testing variables without clicking through the Studio interface manually.

## 8. Authenticated New Port with Sanity CORS
- **Action:** Executed `npx sanity cors add http://localhost:3636 --credentials` inside the terminal.
- **Reason:** Changing the default development port to `3636` caused the remote Sanity API to block all browser data requests due to unauthorized CORS origins. This action explicitly whitelists the new custom localhost port so the Studio can read the `production` dataset securely.

## 9. Added Excerpt Field to Post Schema
- **Action:** Added `excerpt` of type `text` to `schemaTypes/post.ts`.
- **Action:** Added `excerpt` field to `project-context.md` for proper documentation parsing.
- **Reason:** User requested updating the backend structure to allow a short description or excerpt to accompany blog posts safely, complying with the documentation updating rule.

## 10. Added SEO and Quota-Risk Audit Documentation
- **Action:** Updated `project-context.md` with a dedicated `Security & Quota Note (Public Dataset)` section.
- **Action:** Added a practical `Source Audit Plan (Send to Dev Team)` checklist including discovery, pass/fail risk checks, remediation, verification, and initial `rg` commands.
- **Action:** Reformatted quick audit commands into a fenced `bash` block to avoid Markdown parsing issues with `groq\`` syntax.
- **Action:** Updated the `post` schema field summary in `project-context.md` to include newly introduced SEO fields (`metaTitle`, `metaDescription`, `metaKeywords`, `canonicalUrl`, `noIndex`).
- **Reason:** User requested a clear note and an actionable source-code inspection plan that can be shared directly with the development team.

## 11. Fixed Schema Array Typing for IDE TypeScript Error
- **Action:** Updated `schemaTypes/post.ts` to use `defineArrayMember(...)` in `categories` and `metaKeywords` array field definitions.
- **Action:** Added a schema guideline note in `project-context.md` to prefer `defineArrayMember(...)` for array field `of` items.
- **Reason:** Addressed editor-level TypeScript error pattern: `Object literal may only specify known properties, and 'of' does not exist in type ...`.

## 12. Blog Quota Hardening for Sanity Abuse/Spam Risk
- **Action:** Introduced a dedicated blog data layer (`src/server/blog/repo.ts`, `src/server/blog/service.ts`) to centralize GROQ queries, trim payloads, and add `next.revalidate` + cache tags for list/detail/sitemap reads.
- **Action:** Refactored blog list/detail pages and sitemap generation to use the cached server blog service instead of ad-hoc `client.fetch(...)` calls in page files.
- **Action:** Updated `src/sanity/client.ts` to prefer `useCdn` for public reads and enforce `perspective: "published"` for safer public content resolution.
- **Action:** Added middleware guard for blog routes (`/tin-tuc`, `/blog`) with burst/window rate limiting and short-term blocking responses (`429`) to reduce request floods that could amplify Sanity traffic.
- **Action:** Extended blog SEO mapping to consume CMS fields (`metaTitle`, `metaDescription`, `metaKeywords`, `canonicalUrl`, `noIndex`) and updated `src/types/sanity.ts`.
- **Reason:** User requested a direct blog update with explicit attention to Sanity quota exhaustion risk under repeated or malicious traffic from multiple sources.

## 13. Netlify Rate Limit Rules + Friendly Abuse Notice Page
- **Action:** Added two code-based Netlify rate-limit rules in `netlify.toml` for `/tin-tuc/*` and `/blog/*`.
- **Action:** Configured Netlify rate-limit action as `rewrite` to `/truy-cap-qua-nhanh` for friendlier user messaging when access is too frequent.
- **Action:** Added a dedicated page `src/app/truy-cap-qua-nhanh/page.tsx` with a Vietnamese message instructing users to slow down and retry later.
- **Action:** Updated app-level middleware 429 text to Vietnamese: “Bạn đang truy cập quá nhanh, hãy chậm lại...”.
- **Reason:** User requested explicit rate-limiting on Netlify and a clear end-user notice when traffic is limited.
