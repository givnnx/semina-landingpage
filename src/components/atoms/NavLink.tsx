"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`nav-link inline-flex items-center min-h-11 px-3 lg:px-4 py-2 text-base font-medium transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green ${
        isActive
          ? "text-white border-b-2 border-green"
          : "text-gray-text"
      }`}
    >
      {children}
    </Link>
  );
}
