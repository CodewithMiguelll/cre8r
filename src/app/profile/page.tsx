"use client";

import { useCallback, useEffect, useState } from "react";
import { useUser } from "@/lib/use-user";
import { createClient } from "@/lib/supabase";
import ProfileHeader from "@/components/profile/profile-header";
import ProfileCarousel from "@/components/profile/profile-carousel";
import EditProfileForm from "@/components/profile/edit-profile-form";
import { Skeleton } from "@/components/ui/skeleton";

interface Profile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
  website: string | null;
  email: string;
  created_at: string;
}

export default function ProfilePage() {
  const { user: currentUser, loading: isAuthLoading } = useUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  // Get userId from URL params - for viewing other profiles
  const getProfileUserId = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("userId") || currentUser?.id || "";
    }
    return currentUser?.id || "";
  };

  const profileUserId = getProfileUserId();

  const getProfileErrorMessage = useCallback((err: unknown) => {
    if (err instanceof Error && err.message) {
      return err.message;
    }

    if (typeof err === "object" && err !== null) {
      const maybeError = err as {
        message?: string;
        details?: string;
        hint?: string;
        code?: string;
      };

      if (maybeError.message) return maybeError.message;
      if (maybeError.details) return maybeError.details;
      if (maybeError.hint) return maybeError.hint;
      if (maybeError.code) return `Supabase error: ${maybeError.code}`;
    }

    return "Failed to load profile";
  }, []);

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await createClient
        .from("profiles")
        .select("*")
        .eq("id", profileUserId)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (!data) {
        if (profileUserId === currentUser?.id) {
          const { data: createdProfile, error: createError } =
            await createClient
              .from("profiles")
              .insert({
                id: profileUserId,
                email: currentUser?.email ?? "",
                full_name: currentUser?.user_metadata?.full_name ?? null,
                username: currentUser?.user_metadata?.username ?? null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              })
              .select("*")
              .single();

          if (createError) throw createError;

          setProfile(createdProfile as Profile);
          setIsOwnProfile(true);
          setFollowers(0);
          setFollowing(0);
          return;
        }

        setError("Profile not found");
        return;
      }

      setProfile(data as Profile);
      setIsOwnProfile(profileUserId === currentUser?.id);

      // TODO: Fetch actual follower counts from a followers table
      setFollowers(0);
      setFollowing(0);
    } catch (err) {
      const message = getProfileErrorMessage(err);
      setError(message);
      console.error("Error fetching profile:", {
        err,
        profileUserId,
        currentUserId: currentUser?.id,
      });
    } finally {
      setIsLoading(false);
    }
  }, [
    currentUser?.email,
    currentUser?.id,
    currentUser?.user_metadata?.full_name,
    currentUser?.user_metadata?.username,
    getProfileErrorMessage,
    profileUserId,
  ]);

  useEffect(() => {
    if (!profileUserId) {
      setIsLoading(false);
      return;
    }

    fetchProfile();
  }, [fetchProfile, profileUserId]);

  const handleProfileUpdate = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <Skeleton className="h-48 w-48 rounded-full mx-auto" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-muted-foreground">
            Please log in to view profiles.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <Skeleton className="h-48 w-48 rounded-full mx-auto" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-red-500">
            {error || "Profile not found"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {isEditing && isOwnProfile ? (
          <EditProfileForm
            profile={profile}
            onSuccess={handleProfileUpdate}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <>
            <ProfileHeader
              profile={profile}
              followers={followers}
              following={following}
              isOwnProfile={isOwnProfile}
              onEditClick={() => setIsEditing(true)}
            />
            <ProfileCarousel userId={profileUserId} />
          </>
        )}
      </div>
    </div>
  );
}
