"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { createFeedBack } from "@/lib/actions/general.action";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

// Define AgentProps interface (assuming this exists elsewhere)
interface AgentProps {
  userName: string;
  userId: string;
  interviewId: string;
  feedbackId?: string;
  type: string;
  questions?: string[];
}

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
}: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);
    const onMessage = (message: any) => { 
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };
    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };
    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };
    const onError = (error: Error) => console.log("Error:", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }

    const handleGenerateFeedback = async (transcript: SavedMessage[]) => {
      console.log("handleGenerateFeedback");

      const result = await createFeedBack({
        interviewId: interviewId!,
        userId: userId!,
        transcript,
        feedbackId,
      });

      if (result && result.success && result.feedbackId) {
        router.push(`/interview/${interviewId}/feedback`);
      } else {
        console.log("Error saving feedback");
        router.push("/");
      }
    };

    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/");
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, feedbackId, interviewId, router, type, userId]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    if (type === "generate") {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
        variableValues: {
          username: userName,
          userid: userId,
        },
      });
    } else {
      let formattedQuestions = "";
      if (questions) {
        formattedQuestions = questions.map((question) => `- ${question}`).join("\n");
      }

      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions,
        },
      });
    }
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="relative">
            <div className="avatar">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md"></div>
              <Image
                src="/logo1.png"
                alt="AI Interviewer"
                width={65}
                height={65}
                className="object-cover relative z-10"
              />
              {isSpeaking && (
                <>
                  <span className="animate-speak"></span>
                  <span className="absolute -inset-3 bg-primary/5 rounded-full animate-pulse"></span>
                </>
              )}
            </div>
            <div className="mt-2 h-[2px] w-1/3 mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full"></div>
          </div>
          <h3 className="text-xl font-medium text-primary-100">AI Interviewer</h3>
          <p className="text-light-400 text-sm mt-1">Your virtual interviewer</p>
          
          <div className="mt-6 w-full max-w-xs px-5 py-4 bg-white/5 rounded-lg border border-white/10 backdrop-blur-md">
            <p className="text-sm text-light-100/80 text-center">
              {callStatus === CallStatus.INACTIVE && "Ready to start your interview"}
              {callStatus === CallStatus.CONNECTING && "Establishing connection..."}
              {callStatus === CallStatus.ACTIVE && "Interview in progress"}
              {callStatus === CallStatus.FINISHED && "Interview completed"}
            </p>
          </div>
        </div>

        <div className="card-border">
          <div className="card-content">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/10 blur-md"></div>
              <Image
                src="/user.png"
                alt="User"
                width={120}
                height={120}
                className="rounded-full object-cover size-[120px] relative z-10"
              />
              <div className="mt-2 h-[2px] w-1/3 mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full"></div>
            </div>
            <h3 className="text-xl font-medium">{userName}</h3>
            <p className="text-light-400 text-sm">Interviewee</p>
            
            <div className="mt-6 w-full max-w-xs px-5 py-4 bg-white/5 rounded-lg border border-white/10 backdrop-blur-md">
              <p className="text-sm text-light-100/80 text-center">
                {messages.length === 0 
                  ? "No messages yet" 
                  : `${messages.length} message${messages.length !== 1 ? 's' : ''} exchanged`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center mt-8">
        {callStatus !== CallStatus.ACTIVE ? (
          <button 
            className={cn(
              "btn-call flex gap-2 items-center",
              callStatus === CallStatus.CONNECTING && "animate-pulse"
            )} 
            onClick={() => handleCall()}
            disabled={callStatus === CallStatus.CONNECTING}
          >
            {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5-2.5l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"></path></svg>
                Start Call
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
                Connecting...
              </>
            )}
          </button>
        ) : (
          <button className="btn-disconnect flex gap-2 items-center" onClick={() => handleDisconnect()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.4 19.9A10 10 0 1 1 4.8 7.8"></path><path d="m22 12-3-3-3 3"></path><path d="M19 9v6.7"></path></svg>
            End Call
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;