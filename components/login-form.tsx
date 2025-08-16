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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-green-500 border-[2.5px] rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center">
            <h1 className="text-3xl text-green-600 text-semibold bricolage-grotesque">
              LOGO
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
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Button variant="outline" className="w-full">
                  <Image src="/google.svg" alt="google" width={20} height={20} /> Login with Google
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
                <Input id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full bricolage-grotesque">
                  Continue
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
