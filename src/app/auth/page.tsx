import { LoginForm } from "@/components/auth/login-form";
import { SignupForm } from "@/components/auth/signup-form";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to Cre8r
          </h2>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Login</h3>
            <LoginForm />
          </div>
          <div>
            <h3 className="text-lg font-medium">Sign Up</h3>
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}
