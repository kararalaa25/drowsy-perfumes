
-- Add order_details column (nullable for backward compat)
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS order_details text DEFAULT '';

-- Drop old restrictive policies
DROP POLICY IF EXISTS "Allow anonymous insert" ON public.orders;
DROP POLICY IF EXISTS "Allow read for authenticated" ON public.orders;

-- Create proper RLS policies
-- Public can insert orders (no auth required for customers)
CREATE POLICY "Anyone can insert orders"
ON public.orders FOR INSERT
TO public
WITH CHECK (true);

-- Only authenticated users can read orders (admin)
CREATE POLICY "Authenticated users can read orders"
ON public.orders FOR SELECT
TO authenticated
USING (true);

-- Only authenticated users can update orders (admin)
CREATE POLICY "Authenticated users can update orders"
ON public.orders FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);
