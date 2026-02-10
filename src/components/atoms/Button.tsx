import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "navy" | "green";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  variant = "navy",
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "py-[13px] px-[35px] rounded-[45px] text-base border-0 text-center no-underline transition-all duration-300 outline-none cursor-pointer inline-block";

  const variants = {
    navy: "bg-navy font-medium text-white hover:text-white focus:outline-[2.5px] focus:outline-gray-400/75",
    green:
      "text-navy font-semibold bg-green shadow-[0px_4px_15px_rgba(1,251,52,0.35)] hover:text-navy",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
