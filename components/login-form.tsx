"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
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
import Image from "next/image";
import Link from "next/link";
import { Leaf } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/authentication/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      console.log("✅ Login success:", data);

      // Navigate to /browser after successful login
      router.push("/seller");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-green-500 border-[2.5px] rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center flex justify-center">
            <h1 className="text-3xl flex mx-auto text-green-600 font-normal  font-momo">
              Wast <Leaf className="w-8 h-8" />
            </h1>
          </CardTitle>
          <CardDescription>
            <h2 className="text-2xl my-2 font-bold bricolage-grotesque text-center">
              Sign-in to Wasto
            </h2>
            <p className="text-center">
              Welcome back! please sign-in to continue
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Button variant="outline" className="w-full" type="button">
                  <Image src="/google.svg" alt="google" width={20} height={20} />{" "}
                  Login with Google
                </Button>
                <div className="flex items-center gap-2">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <span className="text-gray-500 text-sm">or</span>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <p className="text-red-600 text-sm text-center">{error}</p>
              )}
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full bricolage-grotesque"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Continue"}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="bricolage-grotesque font-semibold text-green-600 text-md"
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
