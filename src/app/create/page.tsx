"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/lib/use-user";
import { CreatePageClient } from "./_components/create-page-client";

export default function CreatePage() {
  const { user, isLoading } = useUser();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    redirect("/auth/login?next=/create");
  }

  return <CreatePageClient />;
}
