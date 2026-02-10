import { cn } from "@/utils/utils";
import React from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function TextInput({
  label,
  className = "",
  ...props
}: TextInputProps) {
  return (
    <div className={`flex flex-col items-start w-full ${className}`}>
      <label className="mb-2 text-base text-navy">{label}</label>
      <input
        className={cn(
          "w-full py-[13px] px-4 rounded-[14px] border-[1.5px] border-navy text-navy placeholder-gray-text focus:outline-none focus:border-green focus:shadow-none",
          className,
        )}
        {...props}
      />
    </div>
  );
}
