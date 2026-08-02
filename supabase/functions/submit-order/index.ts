import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const clean = (v: unknown) => (typeof v === "string" ? v.trim() : "");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const name = clean(body.name).slice(0, 100);
    const phone = clean(body.phone).slice(0, 20);
    const location = clean(body.location).slice(0, 200);
    const productName = clean(body.productName).slice(0, 200);

    const errors: string[] = [];
    if (name.length < 2) errors.push("name");
    if (!/^07\d{8,9}$/.test(phone.replace(/[ -]/g, ""))) errors.push("phone");
    if (location.length < 3) errors.push("location");
    if (productName.length < 2) errors.push("productName");

    if (errors.length) {
      return new Response(JSON.stringify({ error: "invalid_input", fields: errors }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const [governorate, city = ""] = location.split("/").map((s: string) => s.trim());

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { error } = await supabase.from("orders").insert({
      customer_name: name,
      phone,
      product_name: productName,
      governorate: governorate || location.slice(0, 100),
      city: city.slice(0, 100),
    });

    if (error) {
      console.error("order insert failed:", error.message);
      return new Response(JSON.stringify({ error: "could_not_save_order" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const scriptUrl = Deno.env.get("GOOGLE_SCRIPT_URL");
    if (scriptUrl) {
      try {
        const res = await fetch(scriptUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, phone, location, product: productName }),
        });
        if (!res.ok) console.error(`sheet sync failed [${res.status}]`);
      } catch (e) {
        console.error("sheet sync error:", e instanceof Error ? e.message : String(e));
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("submit-order error:", e instanceof Error ? e.message : String(e));
    return new Response(JSON.stringify({ error: "unexpected_error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});