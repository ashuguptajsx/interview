import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg border border-input bg-secondary/50 px-5 py-2 text-sm shadow-sm",
          "ring-offset-background placeholder:text-light-400/70",
          "focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-1",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "transition-all duration-200 ease-in-out",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
