-- Tighten public insert policy
DROP POLICY IF EXISTS "Anyone can insert orders" ON public.orders;
CREATE POLICY "Anyone can submit a valid order"
ON public.orders FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(btrim(customer_name)) BETWEEN 2 AND 100
  AND btrim(phone) ~ '^[0-9+ -]{8,20}$'
  AND char_length(btrim(governorate)) BETWEEN 2 AND 100
  AND char_length(COALESCE(city, '')) <= 100
  AND char_length(btrim(product_name)) BETWEEN 2 AND 200
  AND char_length(COALESCE(order_details, '')) <= 1000
);

-- Restrict SECURITY DEFINER helpers
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

-- Admin bootstrap for the designated dashboard account
CREATE OR REPLACE FUNCTION public.claim_admin_role()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_email text;
BEGIN
  SELECT email INTO v_email FROM auth.users WHERE id = auth.uid();
  IF v_email IS NULL OR lower(v_email) <> 'admin2016@drowsy.local' THEN
    RETURN false;
  END IF;
  INSERT INTO public.user_roles (user_id, role)
  VALUES (auth.uid(), 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN true;
END;
$$;

REVOKE ALL ON FUNCTION public.claim_admin_role() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.claim_admin_role() TO authenticated;

-- Grant the role to the existing admin account if present
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin' FROM auth.users WHERE lower(email) = 'admin2016@drowsy.local'
ON CONFLICT (user_id, role) DO NOTHING;