# Project: Specialty Dried Goods Store

## 1. Project Overview
**Objective**: Build a production-ready e-commerce application for Specialty Dried Stores (Fruits, Nuts, Spices, Jerky, Herbs) using Next.js App Router.
**Key Features**: High-density product grids, weight-based pricing, inventory tracking (batch/expiry), and a premium organic responsive design.

## 2. Tech Stack & Requirements
- **Framework**: Next.js 14+ (App Router) + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **State Management**: React Hook Form + TanStack Query (Server State), Zustand/Context (Client State - Cart)
- **Styling**: TailwindCSS + shadcn/ui
- **Theme**: Earth-tone palettes (Amber, Sage, Slate), Minimal, Organic
- **Animation**: Framer Motion (Staggered reveals, smooth interactions)
- **Validation**: Zod (Strict schemas)
- **Icons**: lucide-react

## 3. Domain Specifics
- **Pricing**: Weight-based (Price per 100g, 500g, 1kg)
- **Inventory**: Track "Best Before" dates and "Batch Numbers"
- **UX**: Quick Add functionality, high-density grids

## 4. Architecture & Folder Structure
- `src/server/<module>/repo.ts` (Database access)
- `src/server/<module>/service.ts` (Business logic)
- `src/server/<module>/schemas.ts` (Zod definitions)
- `src/app/api/...` (REST endpoints)
- `src/hooks/use-cart.ts` (Client-side persistence)

## 5. Implementation Plan

### Phase 1: Foundation & Design System `[x]`
- [x] Initialize project with Next.js App Router
- [x] Setup TailwindCSS with Earth-tone palette (Amber, Sage, Slate)
- [x] Install and configure shadcn/ui components (Button, Card, Sheet, Input, etc.)
- [x] Configure `lucide-react` icons
- [x] Setup Framer Motion for core transitions

### Phase 2: Database & Backend Logic `[x]`
- [x] Initialize Prisma with PostgreSQL
- [x] Define Schema: `Product`, `Category`, `InventoryLog`
    - **Product**: `sku`, `pricePerUnit`, `unitType`, `stockQuantity`, `origin`, `shelfLifeDays`
    - **InventoryLog**: `batchNumber`, `expiryDate`, `quantityChange`
- [x] Run migrations and create seed script
- [x] Implement `src/server/products/repo.ts` & `service.ts`
- [x] Implement `src/server/categories/repo.ts` & `service.ts`

### Phase 3: Core UI & Layout `[x]`
- [x] Create Main Layout (Header, Footer, Mobile Nav)
- [x] Implement Cart Drawer (Slide-in from right) with `use-cart.ts`
- [x] Create reusable UI components with micro-animations (Hover scale, Success feedback)

### Phase 4: Product Catalog Features `[x]`
- [x] Build Product Grid with Staggered Animation
- [x] Implement Product Card with "Quick Add"
- [x] Build Category Filtering & Sort
- [x] Create Product Detail Page (Dynamic routes, SEO meta)

### Phase 5: Cart & Checkout Flow `[x]`
- [x] Implement Cart State logic (Add, Remove, Update Quantity)
- [x] Build Cart Slide-over UI
- [x] Checkout Page Form (Zod validation for shipping)

### Phase 6: Final Polish & SEO `[x]`
- [x] accessibility Audit (Color contrast, Aria labels)
- [x] SEO Optimization (Metadata, OpenGraph)
- [x] Performance Tuning (Image optimization, Lazy loading)

## 6. Current Status
- **Status**: Review
- **Next Step**: Build Admin Dashboard

### Phase 7: Admin Dashboard `[x]`
- [x] Create Admin Layout (Sidebar, Protected Route placeholder)
- [x] Build Dashboard Overview (Profit Summary, Recent Orders)
- [x] Implement Order Management (List, Status Update)
- [x] Implement Inventory/Reservation Management (Stock levels)
- [x] Mock Data for Admin features (until DB connected)

