import {
  FormControl,
  FormField as UIFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";

interface FormFieldProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}

const FormField = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: FormFieldProps) => {
  const getInputIcon = () => {
    if (type === "email") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-light-400 transition-colors group-focus-within:text-primary"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    } else if (type === "password") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-light-400 transition-colors group-focus-within:text-primary"
        >
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    } else if (name === "name") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-light-400 transition-colors group-focus-within:text-primary"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    }
    return null;
  };

  const icon = getInputIcon();

  return (
    <UIFormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="group">
          <FormLabel className="text-sm font-medium text-light-100 sm:text-base">
            {label}
          </FormLabel>
          <div className="relative">
            {icon}
            <FormControl>
              <Input
                className={`
                  transition-all duration-300 
                  rounded-lg border border-border/30 bg-card 
                  text-sm sm:text-base
                  focus:ring-2 focus:ring-primary/50 focus:border-primary
                  ${icon ? 'pl-10 sm:pl-12' : 'pl-3 sm:pl-4'}
                  py-2 sm:py-2.5 h-10 sm:h-11
                  w-full
                `}
                placeholder={placeholder}
                type={type}
                {...field}
              />
            </FormControl>
          </div>
          <div className="text-xs sm:text-sm text-destructive-100 mt-1.5 flex items-center gap-1.5">
            {fieldState.error && (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" x2="12" y1="8" y2="12" />
                  <line x1="12" x2="12.01" y1="16" y2="16" />
                </svg>
                <FormMessage />
              </>
            )}
          </div>
        </FormItem>
      )}
    />
  );
};

export default FormField;