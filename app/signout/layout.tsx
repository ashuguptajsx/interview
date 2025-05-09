import React from "react";

export default function SignOutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {children}
    </div>
  );
} 