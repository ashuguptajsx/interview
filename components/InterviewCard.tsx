import dayjs from "dayjs";
import React from "react";
import Image from "next/image";
import { getRandomInterviewCover } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DisplayTechIcons from "./DisplayTechIcons";

const InterviewCard = ({
  id,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback = null as Feedback | null;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("DD/MM/YYYY");
  
  return (
    <div className="group h-full transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]">
      <div className="card-border h-full w-full">
        <div className="card-interview h-full">
          <div>
            <div className="absolute top-3 right-3">
              <span className="badge-text">{normalizedType}</span>
            </div>
            <div className="flex items-center justify-center mb-5 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full p-3 w-fit group-hover:shadow-md group-hover:shadow-primary/10 transition-all duration-300">
              <Image
                src={getRandomInterviewCover()}
                alt="cover"
                width={80}
                height={80}
                className="rounded-full object-cover size-[80px] group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-xl font-semibold capitalize mb-3">{role} Interview</h3>
            <div className="flex flex-row gap-5 mt-2 text-light-400 text-sm">
              <div className="flex flex-row gap-2 items-center">
                <Image
                  src="/calendar.svg"
                  alt="calendar"
                  width={18}
                  height={18}
                  className="opacity-70"
                />
                <p>{formattedDate}</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Image 
                  src="/star.svg" 
                  alt="star" 
                  width={18} 
                  height={18}
                  className="opacity-70"
                />
                <p>{feedback?.totalScore || "---"}/100</p>
              </div>
            </div>
            <div className="mt-4 h-[2px] w-1/4 bg-gradient-to-r from-primary/30 to-transparent rounded-full"></div>
            <p className="line-clamp-2 mt-4 text-light-100/80 text-sm">
              {feedback?.finalAssessment ||
                "You haven't taken the interview yet."}
            </p>
          </div>
          <div className="flex flex-row justify-between items-center mt-5">
            <DisplayTechIcons techStack={techstack} />
            <Link
              href={
                feedback
                  ? `/interview/${id}/feedback`
                  : `/interview/${id}`
              }
            >
              <Button className="btn-primary group/btn">
                <span className="relative z-[1]">
                  {feedback ? "Check Feedback" : "View"}
                </span>
                <span className="absolute right-2 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
