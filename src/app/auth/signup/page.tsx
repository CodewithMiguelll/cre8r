import Link from "next/link";
import { SignupForm } from "@/components/auth/signup-form";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your Cre8r account
          </h2>
        </div>
        <SignupForm />
        <div className="flex flex-col space-y-3">
          <p className="text-center text-sm text-gray-600">
            Already have an account?
          </p>
          <Link href="/auth/login" className="w-full">
            <Button variant="outline" className="w-full">
              Log In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
