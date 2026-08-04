import { LoginForm } from "@/components/auth/login-form";

interface LoginPageProps {
  searchParams: Promise<
    | {
        next?: string | string[];
      }
    | undefined
  >;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const resolvedSearchParams = await searchParams;
  const redirectTo =
    typeof resolvedSearchParams?.next === "string"
      ? resolvedSearchParams.next
      : "/explore";

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-semibold mb-2">Sign In</h1>
        <p className="text-sm text-gray-600 mb-8">
          Log in to your Cre8r account and continue creating.
        </p>
        <LoginForm redirectTo={redirectTo} />
      </div>
    </main>
  );
}
