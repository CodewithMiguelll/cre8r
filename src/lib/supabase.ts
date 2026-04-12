import { createBrowserClient, createServerClient } from "@supabase/ssr";

// Browser client - safe to use in client components
export const createClient = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

// Server-only client - use in API routes and server actions
export async function getServerClient() {
  const { cookies } = await import("next/headers");

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          return (await cookies()).getAll();
        },
        async setAll(cookiesToSet: any[]) {
          const cookieStore = await cookies();
          cookiesToSet.forEach(
            ({
              name,
              value,
              options,
            }: {
              name: string;
              value: string;
              options?: any;
            }) => {
              cookieStore.set(name, value, options);
            },
          );
        },
      },
    },
  );
}
