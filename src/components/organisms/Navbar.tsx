"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "../atoms/Logo";
import { usePathname, useRouter } from "next/navigation";
import NavLink from "@/components/atoms/NavLink";
import Cookies from "js-cookie";
import { jwtDecode } from "@/utils/jwt";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [token, setToken] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const payload = jwtDecode(token);
      if (payload) {
        setUser(payload);
      }
    }

    setToken(token ?? null);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    setToken(null);
    setUser({});
    router.push("/");
  };

  // Logic to show "Sign In" or "User Menu"
  const isSigninPage = pathname === "/signin";

  return (
    <nav className="container mx-auto py-5 navbar navbar-expand-lg navbar-dark px-4 lg:px-0">
      <div className="flex flex-wrap items-center justify-between w-full">
        <Logo />
        <button
          className="lg:hidden block text-gray-text hover:text-white focus-visible:outline-2 focus-visible:outline-green p-2 rounded-lg cursor-pointer"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="text-2xl leading-none">☰</span>
        </button>

        <div
          id="mobile-nav-menu"
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } lg:flex flex-col lg:flex-row items-center w-full lg:w-auto gap-4 lg:gap-8 mt-4 lg:mt-0`}
        >
          <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-6">
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/browse"}>Browse</NavLink>
            <NavLink href={"/stories"}>Stories</NavLink>
            <NavLink href={"/about"}>About</NavLink>
          </div>

          {!isSigninPage && (
            <div className="lg:hidden flex flex-col items-center gap-3 w-full pt-4 border-t border-white/10">
              {token ? (
                <>
                  <span className="text-white text-sm font-medium">
                    Hello, {user.firstName || "Member"}
                  </span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full py-2.5 rounded-full text-sm font-semibold bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href={"/signin"}
                  className="w-full text-center py-2.5 rounded-full text-sm font-semibold bg-green text-navy hover:brightness-105 transition-all"
                >
                  Sign In
                </Link>
              )}
            </div>
          )}
        </div>

        {!isSigninPage && (
          <div className="hidden lg:block">
            {token ? (
              <div className="flex items-center gap-4">
                <span className="text-white text-sm font-medium">
                  Hello, {user.firstName || "Member"}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full text-xs font-semibold bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-green cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href={"/signin"}
                className="py-[13px] px-[35px] rounded-full text-base font-semibold text-center no-underline transition-all duration-300 bg-green text-navy hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
