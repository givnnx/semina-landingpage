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
    router.push("/");
  };

  // Logic to show "Sign In" or "User Menu"
  const isSigninPage = pathname === "/signin";

  return (
    <nav className="container mx-auto py-5 navbar navbar-expand-lg navbar-dark px-4 lg:px-0">
      <div className="flex flex-wrap items-center justify-between w-full">
        <Logo />
        <button
          className="lg:hidden block text-gray-text focus:outline-none"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="navbar-toggler-icon">☰</span>
        </button>

        <div
          className={`${isMenuOpen ? "block" : "hidden"} lg:block w-full lg:w-auto`}
          id="navbarNavAltMarkup"
        >
          <div
            className={`flex flex-col lg:flex-row items-center gap-4 lg:gap-0 mt-3 lg:mt-0 ${!isSigninPage ? "mx-auto" : "ml-auto"}`}
          >
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/browse"}>Browse</NavLink>
            <NavLink href={"/stories"}>Stories</NavLink>
            <NavLink href={"/about"}>About</NavLink>
          </div>
        </div>

        {!isSigninPage && (
          <div className="hidden lg:block">
            {token ? (
              <div className="flex items-center gap-3">
                <span className="text-white">Hello, {user.firstName}</span>
                <img
                  src={
                    user.avatar
                      ? `${process.env.NEXT_PUBLIC_API_URL}/${user.avatar}`
                      : "/images/avatar.png"
                  }
                  alt="semina"
                  width="60"
                  height="60"
                  className="rounded-full object-cover aspect-square"
                />
              </div>
            ) : (
              <Link
                href={"/signin"}
                className="py-[13px] px-[35px] rounded-[45px] text-base border-0 text-center no-underline transition-all duration-300 outline-none bg-navy font-medium text-white hover:text-white focus:outline-[2.5px] focus:outline-gray-400/75"
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
