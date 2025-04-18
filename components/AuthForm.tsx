"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/Client";
import { signUp, signIn } from "@/lib/actions/auth.actions";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (type: FormType) =>
  z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        const { name, email, password } = values;
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result?.success) {
          toast.error(result?.message);
          return;
        }

        toast.success("Account created successfully!");
        router.push("/sign-in");
      } else {
        const { email, password } = values;
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredentials.user.getIdToken();

        if (!idToken) {
          toast.error("Error retrieving ID token");
          return;
        }

        const result = await signIn({ email, idToken });

        if (!result?.success) {
          toast.error(result?.message || "Error signing in");
          return;
        }

        toast.success("Signed in successfully!");
        router.push("/");
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      if (error.code?.startsWith("auth/")) {
        toast.error(`Firebase error: ${error.message}`);
      } else {
        toast.error(`Server error: ${error.message || "Unknown error"}`);
      }
    }
  }

  const isSignIn = type === "sign-in";

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md relative">
        <div className="absolute -inset-1 bg-gradient-to-br from-primary/50 via-primary/20 to-primary/5 rounded-xl blur-md opacity-50"></div>
        <div className="relative bg-card border border-border/30 rounded-xl shadow-xl">
          <Form {...form}>
            <div className="flex flex-col gap-6 p-6 sm:p-8">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="relative flex items-center justify-center w-16 h-16">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm"></div>
                  <div className="relative bg-gradient-to-br from-primary/30 to-primary/10 p-3 rounded-full">
                    <Image 
                      src="/logo.svg" 
                      alt="logo" 
                      height={28} 
                      width={28}
                      className="relative"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-100 to-primary-200">Interviewer</h2>
                  <p className="text-light-400 text-xs sm:text-sm mt-1">Practice job interviews with AI</p>
                </div>
              </div>
              
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {!isSignIn && (
                  <FormField 
                    control={form.control} 
                    name="name" 
                    label="Name" 
                    placeholder="Your name" 
                  />
                )}
                <FormField
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="Your email address"
                  type="email"
                />
                <FormField
                  control={form.control}
                  name="password"
                  label="Password"
                  placeholder="Your password"
                  type="password"
                />
                <Button 
                  type="submit" 
                  className="w-full mt-4 relative overflow-hidden group bg-primary hover:bg-primary/90 transition-colors"
                >
                  <span className="relative z-10 text-sm sm:text-base">
                    {isSignIn ? "Sign in" : "Create account"}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
                </Button>
              </form>
              
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/30"></div>
                </div>
                <div className="relative flex justify-center text-xs sm:text-sm">
                  <span className="bg-card px-2 text-light-400">or</span>
                </div>
              </div>
              
              <div className="text-center text-xs sm:text-sm">
                <p className="text-light-400">
                  {isSignIn ? "Don't have an account yet?" : "Already have an account?"}{" "}
                  <Link 
                    href={!isSignIn ? "/sign-in" : "/sign-up"} 
                    className="font-medium text-primary hover:text-primary/90 transition-colors"
                  >
                    {!isSignIn ? "Sign in" : "Sign up"}
                  </Link>
                </p>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;