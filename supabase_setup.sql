-- 1. Add new columns to the Product table
ALTER TABLE "Product" 
ADD COLUMN IF NOT EXISTS "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS "img" TEXT,
ADD COLUMN IF NOT EXISTS "images" TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS "note" TEXT,
ADD COLUMN IF NOT EXISTS "slug" TEXT,
ADD COLUMN IF NOT EXISTS "isMarketPrice" BOOLEAN DEFAULT FALSE;

-- 2. Add columns to the Category table
ALTER TABLE "Category" 
ADD COLUMN IF NOT EXISTS "description" TEXT,
ADD COLUMN IF NOT EXISTS "image" TEXT;

-- 3. Create junction table for Product and Category
CREATE TABLE IF NOT EXISTS "ProductCategory" (
    "productId" TEXT REFERENCES "Product" (id) ON DELETE CASCADE,
    "categoryId" TEXT REFERENCES "Category" (id) ON DELETE CASCADE,
    PRIMARY KEY ("productId", "categoryId")
);

-- 4. Migrate existing category data (if dropping categoryId from Product)
-- NOTE: If you are setting up a fresh DB, this INSERT may not do anything or you can ignore it.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Product' AND column_name='categoryId') THEN
    INSERT INTO "ProductCategory" ("productId", "categoryId")
    SELECT id, "categoryId" FROM "Product" WHERE "categoryId" IS NOT NULL
    ON CONFLICT DO NOTHING;
    
    ALTER TABLE "Product" DROP COLUMN "categoryId";
  END IF;
END $$;

-- 5. Update Order table schema
ALTER TABLE "Order" DROP COLUMN IF EXISTS "productId";
ALTER TABLE "Order" RENAME COLUMN "productName" TO "orderDescription";
ALTER TABLE "Order" RENAME COLUMN "status" TO "deliveryStatus";
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "paymentStatus" TEXT DEFAULT 'unpaid';

-- 6. Enable Row Level Security (RLS) for all relevant tables
ALTER TABLE "Product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Category" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProductCategory" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Order" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "InventoryLog" ENABLE ROW LEVEL SECURITY;

-- 7. Create RLS Policies
-- Note: Your Next.js app uses the SERVICE_ROLE key which bypasses RLS,
-- but adding these ensures your DB is secure if you ever use the ANON key
-- on the frontend.

-- Product & Category & ProductCategory: Public can READ (select)
CREATE POLICY "Public profiles are viewable by everyone." 
ON "Product" FOR SELECT USING (true);

CREATE POLICY "Categories are viewable by everyone." 
ON "Category" FOR SELECT USING (true);

CREATE POLICY "ProductCategories are viewable by everyone." 
ON "ProductCategory" FOR SELECT USING (true);

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
