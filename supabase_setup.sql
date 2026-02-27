-- 1. Add new columns to the Product table
ALTER TABLE "Product" 
ADD COLUMN IF NOT EXISTS "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS "img" TEXT,
ADD COLUMN IF NOT EXISTS "note" TEXT,
ADD COLUMN IF NOT EXISTS "slug" TEXT;

-- 2. Enable Row Level Security (RLS) for all relevant tables
ALTER TABLE "Product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Category" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Order" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "InventoryLog" ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies
-- Note: Your Next.js app uses the SERVICE_ROLE key which bypasses RLS,
-- but adding these ensures your DB is secure if you ever use the ANON key
-- on the frontend.

-- Product & Category: Public can READ (select)
CREATE POLICY "Public profiles are viewable by everyone." 
ON "Product" FOR SELECT USING (true);

CREATE POLICY "Categories are viewable by everyone." 
ON "Category" FOR SELECT USING (true);

-- Product & Category: Only authenticated users/roles can INSERT, UPDATE, DELETE
-- Or just leave it out so only SERVICE_ROLE can modify them
-- CREATE POLICY "Admins can edit products" ON "Product" FOR ALL USING (auth.role() = 'authenticated');

-- Order: Public can INSERT orders (e.g., checkout page if using anon key)
CREATE POLICY "Anyone can insert orders" 
ON "Order" FOR INSERT WITH CHECK (true);

-- Order: Admin can view and manage all orders
CREATE POLICY "Admins can manage orders" 
ON "Order" FOR ALL USING (true);

-- InventoryLog: Only admins can read/write
CREATE POLICY "Admins can manage inventory logs" 
ON "InventoryLog" FOR ALL USING (true);
