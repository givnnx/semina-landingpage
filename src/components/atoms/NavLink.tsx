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
      className={`nav-link text-base font-normal transition-all hover:text-white px-[30px] ${
        isActive ? "text-white border-b-2 border-green pb-0" : "text-gray-text"
      }`}
    >
      {children}
    </Link>
  );
}
