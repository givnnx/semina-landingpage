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
    "py-[13px] px-[35px] rounded-full text-base font-semibold border-0 text-center no-underline transition-all duration-200 cursor-pointer inline-flex items-center justify-center enabled:active:scale-[0.96] transition-transform disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    navy: "bg-navy text-white hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green",
    green:
      "text-navy bg-green hover:brightness-105 shadow-[0px_4px_15px_rgba(1,251,52,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-ink",
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
