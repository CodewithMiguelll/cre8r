import { ProfileSetupForm } from "@/components/auth/profile-setup-form";

export default function ProfileSetupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
            Complete Your Profile
          </h1>
          <p className="text-center text-gray-600">
            Help the Cre8r community learn more about you and your creative work
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-8">
          <ProfileSetupForm />
        </div>
      </div>
    </div>
  );
}
