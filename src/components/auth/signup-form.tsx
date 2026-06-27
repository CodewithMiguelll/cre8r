"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const supabase = createClient;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
      } else if (data?.session || data?.user) {
        const { data: sessionData } = await supabase.auth.getSession();

        if (sessionData.session) {
          router.refresh();
          router.push("/profile-setup");
          return;
        }

        setMessage(
          "Check your email for the confirmation link! You may need to confirm your email before setting up your profile.",
        );
      } else {
        setMessage("Check your email for the confirmation link!");
      }
    } catch (error) {
      setMessage("An error occurred while signing up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Signing up..." : "Sign Up"}
      </Button>
      {message && <p className="text-sm text-red-600">{message}</p>}
    </form>
  );
}
