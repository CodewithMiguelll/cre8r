import { SignupForm } from "@/components/auth/signup-form";

interface SignupPageProps {
  searchParams: Promise<
    | {
        next?: string | string[];
      }
    | undefined
  >;
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const resolvedSearchParams = await searchParams;
  const redirectTo =
    typeof resolvedSearchParams?.next === "string"
      ? resolvedSearchParams.next
      : "/profile-setup";

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-semibold mb-2">Create Account</h1>
        <p className="text-sm text-gray-600 mb-8">
          Start your Cre8r journey with a new account.
        </p>
        <SignupForm redirectTo={redirectTo} />
      </div>
    </main>
  );
}
