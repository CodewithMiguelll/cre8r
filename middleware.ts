import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: any[]) {
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
              response.cookies.set(name, value, options);
            },
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const publicRoutes = [
    "/auth",
    "/auth/login",
    "/auth/signup",
    "/profile-setup",
    "/about",
  ];
  const isPublicRoute = publicRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  if (user && !isPublicRoute) {
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("profile_completed")
        .eq("id", user.id)
        .single();

      if (profile && !profile.profile_completed) {
        const redirectResponse = NextResponse.redirect(
          new URL("/profile-setup", request.url),
        );

        response.cookies.getAll().forEach((cookie) => {
          redirectResponse.cookies.set(cookie.name, cookie.value);
        });

        return redirectResponse;
      }
    } catch {
      // Let the request continue; client-side auth checks will handle errors.
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
