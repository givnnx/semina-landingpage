import { cn } from "@/utils/utils";
import React from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  variant?: "light" | "dark";
}

export default function TextInput({
  label,
  className = "",
  variant = "light",
  id,
  ...props
}: TextInputProps) {
  const reactId = React.useId();
  const inputId = id || reactId;

  return (
    <div className="flex flex-col items-start w-full">
      <label
        htmlFor={inputId}
        className={`mb-2 text-sm font-semibold ${
          variant === "dark" ? "text-white" : "text-navy"
        }`}
      >
        {label}
      </label>
      <input
        id={inputId}
        className={cn(
          "w-full py-3 px-4 rounded-xl border-2 border-input-border text-navy bg-white placeholder:text-muted-light text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-ink focus:border-green-ink disabled:opacity-50 disabled:cursor-not-allowed",
          className,
        )}
        {...props}
      />
    </div>
  );
}
