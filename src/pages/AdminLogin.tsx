import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toEmail = (value: string) =>
    value.includes("@") ? value.trim() : `${value.trim().toLowerCase()}@drowsy.local`;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const email = toEmail(username);

    let { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    // First-time setup: create the admin account if it does not exist yet
    if (authError && username.trim().toUpperCase() === "ADMIN2016" && password === "ADMIN2016") {
      const { error: signUpError } = await supabase.auth.signUp({ email, password });
      if (!signUpError) {
        ({ error: authError } = await supabase.auth.signInWithPassword({ email, password }));
      }
    }

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
            <Lock className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-2xl font-serif font-semibold text-foreground">Admin Login</h1>
          <p className="text-sm text-muted-foreground">Sign in to manage orders</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              autoCapitalize="none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-sm text-destructive text-center">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
