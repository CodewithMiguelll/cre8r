import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to Cre8r
          </h2>
        </div>
        <LoginForm />
        <div className="flex flex-col space-y-3">
          <p className="text-center text-sm text-gray-600">
            Don't have an account?
          </p>
          <Link href="/auth/signup" className="w-full">
            <Button variant="outline" className="w-full">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
