"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    const performSignOut = async () => {
      try {
        // Call the server-side API endpoint for sign-out
        const response = await fetch("/api/auth/signout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          // Successfully signed out
          console.log("Successfully signed out");
        } else {
          console.error("Failed to sign out:", response.statusText);
        }

        // Always redirect to sign-in page
        router.push("/sign-in");
      } catch (error) {
        console.error("Error during sign out:", error);
        // Redirect to sign-in even if there's an error
        router.push("/sign-in");
      }
    };

    performSignOut();
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-100 animate-pulse">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </div>
        <h2 className="text-2xl font-semibold">Signing Out</h2>
        <p className="text-light-400 text-sm">Please wait, redirecting you...</p>
      </div>
    </div>
  );
} 