import React from "react";
import { getCurrentUser } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 h-screen pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <nav className="border-b border-border/20 bg-card/30 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center py-4 px-5 md:px-10">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm group-hover:bg-primary/30 transition-colors duration-300"></div>
              <Image 
                src="/logo.svg" 
                alt="Interviewer logo" 
                width={28} 
                height={28} 
                className="relative z-10"
              />
            </div>
            <span className="text-xl font-semibold bg-clip-text text-transparent bg-gray-900">
              Interviewer
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
          
            
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center relative group cursor-pointer">
              <span className="text-gray-900 font-medium">{user.name?.[0]?.toUpperCase() || 'U'}</span>
              <div className="absolute -right-1 -top-1 w-3 h-3 bg-success-100 rounded-full border-2 border-card"></div>
              
              <div className="absolute top-full mt-2 right-0 w-48 rounded-lg glass-effect opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2 shadow-lg">
                <div className="px-4 py-2 border-b border-border/20">
                  <p className="text-sm font-medium truncate">{user.name || 'User'}</p>
                  <p className="text-xs text-gray-950 truncate">{user.email || 'user@example.com'}</p>
                </div>
                <div className="px-2 py-1">
                  <Link href="/signout" className="flex items-center gap-2 text-sm text-destructive-100 hover:bg-white/5 rounded px-2 py-1.5 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    Sign out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto py-10 px-5 md:px-10 relative z-10">
        {children}
      </div>
      
      <footer className="border-t border-border/10 py-6 text-center text-xs text-light-400 mt-10">
        <div className="container mx-auto px-5">
          <p className="text-gray-950">© {new Date().getFullYear()} Interviewer - AI-powered interview practice</p>
        </div>
      </footer>
    </main>
  );
};

export default RootLayout;