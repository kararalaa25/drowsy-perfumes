-- Roles infrastructure
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Tighten orders access to admins only
DROP POLICY IF EXISTS "Authenticated users can read orders" ON public.orders;
DROP POLICY IF EXISTS "Authenticated users can update orders" ON public.orders;

CREATE POLICY "Admins can read orders"
ON public.orders FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update orders"
ON public.orders FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Server-side validation for public order submissions
CREATE OR REPLACE FUNCTION public.validate_order()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.customer_name := btrim(NEW.customer_name);
  NEW.phone := btrim(NEW.phone);
  NEW.governorate := btrim(NEW.governorate);
  NEW.city := btrim(COALESCE(NEW.city, ''));
  NEW.product_name := btrim(NEW.product_name);
  NEW.order_details := left(btrim(COALESCE(NEW.order_details, '')), 1000);

  IF char_length(NEW.customer_name) < 2 OR char_length(NEW.customer_name) > 100 THEN
    RAISE EXCEPTION 'invalid customer_name';
  END IF;
  IF NEW.phone !~ '^[0-9+ -]{8,20}$' THEN
    RAISE EXCEPTION 'invalid phone';
  END IF;
  IF char_length(NEW.governorate) < 2 OR char_length(NEW.governorate) > 100 THEN
    RAISE EXCEPTION 'invalid governorate';
  END IF;
  IF char_length(NEW.city) > 100 THEN
    RAISE EXCEPTION 'invalid city';
  END IF;
  IF char_length(NEW.product_name) < 2 OR char_length(NEW.product_name) > 200 THEN
    RAISE EXCEPTION 'invalid product_name';
  END IF;

  IF TG_OP = 'INSERT' THEN
    NEW.status := 'pending';
    NEW.created_at := now();
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS validate_order_trigger ON public.orders;
CREATE TRIGGER validate_order_trigger
BEFORE INSERT OR UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.validate_order();