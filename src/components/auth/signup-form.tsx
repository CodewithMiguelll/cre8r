"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

interface SignupFormProps {
  redirectTo?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const defaultCallbackPath = "/auth/callback";

export function SignupForm({ redirectTo = "/profile-setup" }: SignupFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success">("error");
  const [canResend, setCanResend] = useState(false);
  const supabase = useMemo(() => createClient, []);

  const getRedirectUrl = () => {
    const origin =
      typeof window !== "undefined" ? window.location.origin : (baseUrl ?? "");
    const callbackUrl = new URL(defaultCallbackPath, origin);
    callbackUrl.searchParams.set("next", redirectTo);
    return callbackUrl.toString();
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setCanResend(false);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: getRedirectUrl(),
        },
      });

      if (error) {
        setMessage(error.message);
        setMessageType("error");
        return;
      }

      if (data?.session) {
        router.refresh();
        router.push(redirectTo);
        return;
      }

      setMessage(
        "A confirmation email was sent. Check your inbox or spam folder, and use the button below to resend it if it does not arrive.",
      );
      setMessageType("success");
      setCanResend(true);
    } catch {
      setMessage(
        "We could not create your account right now. Please try again.",
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: getRedirectUrl(),
        },
      });

      if (error) {
        setMessage(error.message);
        setMessageType("error");
        return;
      }

      setMessage(
        "Confirmation email resent. Please check your inbox or spam folder.",
      );
      setMessageType("success");
    } catch {
      setMessage(
        "Unable to resend the confirmation email right now. Please try again later.",
      );
      setMessageType("error");
    } finally {
      setResendLoading(false);
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
      <div className="flex flex-col gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
        {canResend && (
          <Button
            type="button"
            variant="secondary"
            disabled={resendLoading}
            onClick={handleResend}
          >
            {resendLoading ? "Resending..." : "Resend confirmation email"}
          </Button>
        )}
      </div>
      {message && (
        <p
          className={`text-sm ${messageType === "error" ? "text-red-600" : "text-green-600"}`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
