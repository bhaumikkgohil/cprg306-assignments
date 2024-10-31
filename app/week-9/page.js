"use client";

import { useRouter } from "next/compat/router";
import { useEffect } from "react";
import { useUserAuth } from "./_utils/auth-context";

export default function LandingPage() {
  const { user, loading, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (router) {
        router.push("/week-9/profile");
      } else {
        console.error("Router object is not available.");
      }
    }
  }, [user, router]);

  if (loading)
    return (
      <div className="flex justify-center items-center bg-black h-screen">
        <div className="w-12 h-12 border-4 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div>
      {!user ? (
        <div className="flex flex-col justify-center items-center h-screen bg-black">
          <p className="text-white text-4xl text-bold">
            Sorry, you cannot see the contents of this page without
            authentication.
          </p>
          <button
            className="text-orange-600 text-4xl text-bold hover:text-green-400 hover:underline "
            onClick={gitHubSignIn}
          >
            Login with GitHub
          </button>
        </div>
      ) : (
        <div className="flex flex-col p-4 h-screen justify-center items-center bg-black">
          <div className="flex text-white text-3xl text-bold">
            <span>Logged in as </span>
            <p className="text-green-400 ml-3 text-3xl text-bold">
              {user.displayName} ({user.email}).
            </p>
          </div>
          <button
            className="text-white text-3xl text-bold hover:text-orange-400 hover:underline"
            onClick={firebaseSignOut}
          >
            Logout
          </button>
          <a
            className="text-white text-3xl text-bold hover:text-orange-400 hover:underline"
            href="/week-9/shopping-list"
          >
            Continue to your Shopping List
          </a>
        </div>
      )}
    </div>
  );
}
