"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserAuth } from "../_utils/auth-context";

export default function Profile() {
  const { user } = useUserAuth();
  const router = useRouter();

  // State for GitHub data
  const [githubData, setGitHubData] = useState(null);

  // Function to go back to the previous page
  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    if (user && user.providerData) {
      // Find the GitHub provider data (if user logged in via GitHub)
      const githubProvider = user.providerData.find(
        (provider) => provider.providerId === "github.com"
      );

      if (githubProvider) {
        setGitHubData(githubProvider);
      }
    }
  }, [user]);

  if (!user)
    return (
      <div className="text-white text-center">
        Please log in to view your profile.
      </div>
    );

  if (!githubData) return <div>Loading...</div>;

  return (
    <div className="bg-black h-screen flex items-center justify-center">
      <div className="bg-off-white p-6 rounded-lg shadow-lg max-w-md mx-auto w-full text-center">
        <div className="flex justify-center mb-6">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-4 border-green-400"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center text-white text-2xl">
              {user.displayName?.charAt(0)}
            </div>
          )}
        </div>

        <h2 className="text-3xl font-semibold mb-2 text-white">
          {user.displayName || "N/A"}
        </h2>

        <p className="text-xl mb-1 text-white">
          <span className="font-bold">Email: </span>
          {user.email || "N/A"}
        </p>

        <button
          onClick={handleBack}
          className="bg-white text-black py-1 px-2 mt-2 rounded-md mb-4 hover:bg-gray-600 transition duration-3 hover:text-white"
        >
          Back
        </button>
      </div>
    </div>
  );
}
