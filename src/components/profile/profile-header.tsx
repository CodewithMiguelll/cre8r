import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface Profile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
  website: string | null;
  email: string;
  created_at: string;
}

interface ProfileHeaderProps {
  profile: Profile;
  followers: number;
  following: number;
  isOwnProfile: boolean;
  onEditClick: () => void;
}

export default function ProfileHeader({
  profile,
  followers,
  following,
  isOwnProfile,
  onEditClick,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-6">
      {/* Profile Picture */}
      <div className="relative w-32 h-32 md:w-48 md:h-48">
        {profile.avatar_url ? (
          <Image
            src={profile.avatar_url}
            alt={profile.full_name}
            fill
            className="rounded-full object-cover border-4 border-primary"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-linear-to-br from-purple-400 to-blue-500 flex items-center justify-center text-4xl md:text-6xl text-white font-bold">
            {profile.full_name?.charAt(0)?.toUpperCase() || "C"}
          </div>
        )}
      </div>

      {/* Name and Username */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold">{profile.full_name}</h1>
        <p className="text-muted-foreground">@{profile.email.split("@")[0]}</p>
      </div>

      {/* Bio */}
      {profile.bio && <p className="text-lg max-w-2xl">{profile.bio}</p>}

      {/* Location */}
      {profile.website && (
        <Link
          href={profile.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {profile.website}
        </Link>
      )}

      {/* Stats */}
      <div className="flex gap-12 md:gap-16">
        <div className="flex flex-col items-center">
          <p className="text-2xl md:text-3xl font-bold">{followers}</p>
          <p className="text-sm text-muted-foreground">Followers</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-2xl md:text-3xl font-bold">{following}</p>
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        {isOwnProfile && (
          <Button onClick={onEditClick} variant="default">
            Edit Profile
          </Button>
        )}
        {!isOwnProfile && (
          <>
            <Button variant="default">Follow</Button>
            <Button variant="outline">Message</Button>
          </>
        )}
      </div>
    </div>
  );
}
