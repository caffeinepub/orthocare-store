import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";

const ADMIN_EMAIL = "admin@orthocare.com";
const ADMIN_PASSWORD = "Admin@1234";

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem(
          "orthocare_admin_session",
          JSON.stringify({ loggedIn: true, email }),
        );
        navigate({ to: "/admin" });
      } else {
        setError("Invalid credentials");
      }
      setLoading(false);
    }, 600);
  }

  return (
    <div className="min-h-screen bg-admin-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-4 shadow-lg">
            <ShieldCheck className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-admin-navy font-display">
            OrthoCare Store
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Admin Portal</p>
        </div>

        <Card className="shadow-xl border-0 rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-admin-navy">Sign In</CardTitle>
            <CardDescription>
              Access the administration dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-admin-navy font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@orthocare.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-ocid="admin.login.input"
                  className="h-11 border-border focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-admin-navy font-medium"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  data-ocid="admin.password.input"
                  className="h-11"
                />
              </div>

              {error && (
                <div
                  data-ocid="admin.login.error_state"
                  className="bg-destructive/10 text-destructive text-sm px-4 py-3 rounded-lg border border-destructive/20"
                >
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 text-base font-semibold"
                disabled={loading}
                data-ocid="admin.login.submit_button"
              >
                {loading ? "Signing in…" : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-secondary rounded-xl text-xs text-muted-foreground space-y-1">
              <p className="font-semibold text-admin-navy text-sm">
                Demo credentials
              </p>
              <p>
                Email:{" "}
                <span className="font-mono text-admin-navy">
                  admin@orthocare.com
                </span>
              </p>
              <p>
                Password:{" "}
                <span className="font-mono text-admin-navy">Admin@1234</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Built with love using caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
