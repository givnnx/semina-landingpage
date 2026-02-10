import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "price" | "default";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variants = {
    default: "",
    price:
      "text-green font-medium text-sm bg-navy rounded-[41px] py-[5px] px-[13px]",
  };

  return (
    <span className={`${variants[variant]} ${className}`}>{children}</span>
  );
}
