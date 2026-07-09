import { LoginForm } from "@/components/auth/login-form";

interface LoginPageProps {
  searchParams?: {
    next?: string;
  };
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-semibold mb-2">Sign In</h1>
        <p className="text-sm text-gray-600 mb-8">
          Log in to your Cre8r account and continue creating.
        </p>
        <LoginForm redirectTo={searchParams?.next ?? "/explore"} />
      </div>
    </main>
  );
}
