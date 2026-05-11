"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function completeProfileSetup(data: {
  username: string;
  full_name: string;
  bio: string;
  location: string;
  portfolio_links: string[];
  creative_interests: string[];
}) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(
          cookiesToSet: Array<{ name: string; value: string; options?: any }>,
        ) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      username: data.username,
      full_name: data.full_name,
      bio: data.bio,
      location: data.location,
      portfolio_links: data.portfolio_links.filter((link) => link.trim()),
      creative_interests: data.creative_interests,
      profile_completed: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
