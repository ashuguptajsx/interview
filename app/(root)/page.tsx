import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import InterviewCard from "@/components/InterviewCard";
import {
  getCurrentUser,
} from "@/lib/actions/auth.actions";
import { getInterviewByUserId, getLatestInterviews } from "@/lib/actions/general.action";

const Page = async () => {
  const user = await getCurrentUser();

  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewByUserId(user?.id!),
    await getLatestInterviews({ userId: user?.id!}),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = latestInterviews?.length! > 0;

  return (
    <>
      <section className="card-cta mb-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/2 to-transparent rounded-xl"></div>
        <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        
        <div className="flex flex-col gap-5 max-w-lg relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary-100 rounded-full text-sm w-fit">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
            AI-powered interview practice
          </div>
          
          <h2 className="text-4xl font-bold leading-tight">
            Master Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-100 to-primary-200">Interview Skills</span> with AI
          </h2>
          
          <p className="text-lg text-light-100/90">
            Get personalized feedback on real interview questions and improve your performance
          </p>
          
          <div className="flex flex-wrap gap-4 mt-2">
            <Button asChild className="btn-primary group">
              <Link href="/interview" className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5-2.5l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"></path></svg>
                Start Interview
                <span className="absolute right-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </span>
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="group">
              <Link href="#past-interviews" className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m13 2-2 2.5h3L12 7"></path><path d="M12 22v-3"></path><circle cx="12" cy="14" r="5"></circle></svg>
                View Past Interviews
              </Link>
          </Button>
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-5 max-w-sm">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-100"><rect width="8" height="8" x="8" y="8" rx="2"></rect><path d="M12 2v2"></path><path d="M12 22v-2"></path><path d="M2 12h2"></path><path d="M22 12h-2"></path><path d="m4.9 4.9 1.4 1.4"></path><path d="m17.7 17.7 1.4 1.4"></path><path d="m17.7 6.3-1.4 1.4"></path><path d="m4.9 19.1 1.4-1.4"></path></svg>
              </div>
              <p className="text-xs text-light-400">AI-Powered</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-100"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path></svg>
              </div>
              <p className="text-xs text-light-400">Real-time Feedback</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-100"><path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12"></path><circle cx="17" cy="7" r="5"></circle></svg>
              </div>
              <p className="text-xs text-light-400">Customizable</p>
            </div>
          </div>
        </div>
        <Image
          src="/ai-interview-hero.png"
          alt="AI interviewer conversation"
          width={450}
          height={450}
          className="max-sm:hidden object-contain z-10 relative drop-shadow-xl"
        />
      </section>

      <section id="past-interviews" className="flex flex-col gap-4 mb-14">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-950">Your Interviews</h2>
            <p className="text-gray-800 text-sm mt-1">Review your past interview sessions</p>
          </div>
          {hasPastInterviews && (
            <Link href="/interview" className="text-primary-100 hover:text-primary-100/80 text-sm font-medium flex items-center gap-1">
              View all
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          )}
        </div>
        
        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview?.id} />
            ))
          ) : (
            <div className="col-span-full glass-effect rounded-xl p-10 text-center">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-100"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path></svg>
              </div>
              <h3 className="text-xl font-medium mb-2 text-gray-950">No interviews yet</h3>
              <p className="text-light-800 mb-6">You haven't created any interview sessions yet.</p>
              <Button asChild className="btn-primary">
                <Link href="/interview" className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>
                  Start your first interview
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-950 ">Available Interviews</h2>
            <p className="text-light-800 text-sm mt-1">Choose from our pre-designed interview templates</p>
          </div>
          
        </div>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <div className="col-span-full glass-effect rounded-xl p-10 text-center">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-100"><path d="M10.1 5.6 5 12l5.1 6.4"></path><path d="M19.2 12H5"></path></svg>
              </div>
              <h3 className="text-xl font-medium mb-2">No templates available</h3>
              <p className="text-light-400 mb-6">There are no interview templates available at the moment.</p>
              <Button asChild className="btn-secondary">
                <Link href="/interview" className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="5" y="5" rx="2"></rect><path d="M12 9v6"></path><path d="M15 12H9"></path></svg>
                  Create a custom interview
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;
