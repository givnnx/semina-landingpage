import Link from "next/link";
import Logo from "../atoms/Logo";

export default function Footer() {
  return (
    <footer className="footer bg-navy py-14 lg:py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 text-white">
          <div className="sm:col-span-2 lg:col-span-2">
            <Logo />
            <p className="text-base font-normal text-gray-text leading-relaxed mt-6 max-w-sm">
              Semina adalah platform di mana Anda dapat menemukan seminar dan
              workshop terbaik sesuai dengan minat dan tujuan karier Anda.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="font-semibold text-white mb-2 text-base">Explore</div>
            <Link
              href="/browse"
              className="text-gray-text hover:text-white transition-colors duration-200 text-sm"
            >
              All Events
            </Link>
            <Link
              href="/stories"
              className="text-gray-text hover:text-white transition-colors duration-200 text-sm"
            >
              Success Stories
            </Link>
            <Link
              href="/about"
              className="text-gray-text hover:text-white transition-colors duration-200 text-sm"
            >
              About Semina
            </Link>
            <Link
              href="/orders"
              className="text-gray-text hover:text-white transition-colors duration-200 text-sm"
            >
              My Tickets
            </Link>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="font-semibold text-white mb-2 text-base">Company</div>
            <Link
              href="/about"
              className="text-gray-text hover:text-white transition-colors duration-200 text-sm"
            >
              Our Mission
            </Link>
            <Link
              href="/stories"
              className="text-gray-text hover:text-white transition-colors duration-200 text-sm"
            >
              Community
            </Link>
            <Link
              href="/browse"
              className="text-gray-text hover:text-white transition-colors duration-200 text-sm"
            >
              Partnerships
            </Link>
            <Link
              href="/about"
              className="text-gray-text hover:text-white transition-colors duration-200 text-sm"
            >
              Speakers
            </Link>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="font-semibold text-white mb-2 text-base">Account</div>
            <Link
              href="/signin"
              className="text-gray-text hover:text-white transition-colors duration-200 text-sm"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="text-gray-text hover:text-white transition-colors duration-200 text-sm"
            >
              Create Account
            </Link>
            <Link
              href="/orders"
              className="text-gray-text hover:text-white transition-colors duration-200 text-sm"
            >
              Order History
            </Link>
            <Link
              href="/browse"
              className="text-gray-text hover:text-white transition-colors duration-200 text-sm"
            >
              Ticket Pricing
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center text-gray-text text-sm border-t border-white/10 mt-12 pt-8 gap-4">
          <p>© {new Date().getFullYear()} Semina. All rights reserved.</p>
          <p className="text-gray-text text-xs">Practical workshops and conferences for tech practitioners.</p>
        </div>
      </div>
    </footer>
  );
}
