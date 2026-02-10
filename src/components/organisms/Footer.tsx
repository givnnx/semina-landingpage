import Link from "next/link";
import Logo from "../atoms/Logo";

export default function Footer() {
  return (
    <footer className="footer bg-navy py-[70px]">
      <div className="container mx-auto px-4 lg:px-0">
        <Logo />
        <div className="mt-8 flex flex-wrap gap-[150px] gap-y-12 items-baseline text-white">
          <div className="w-full md:w-auto">
            <p className="text-base font-normal text-gray-text leading-[30px]">
              Semina adalah tempat di mana <br className="hidden md:block" />{" "}
              anda dapat mencari event sesuai <br className="hidden md:block" />{" "}
              dengan minat & terdekat.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="font-medium text-white mb-3">Features</div>
            <a
              href="#"
              className="text-gray-text hover:text-white hover:underline transition-all duration-300"
            >
              Virtual
            </a>
            <a
              href="#"
              className="text-gray-text hover:text-white hover:underline transition-all duration-300"
            >
              Pricing
            </a>
            <a
              href="#"
              className="text-gray-text hover:text-white hover:underline transition-all duration-300"
            >
              Merchant
            </a>
            <a
              href="#"
              className="text-gray-text hover:text-white hover:underline transition-all duration-300"
            >
              Tickets
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <div className="font-medium text-white mb-3">Company</div>
            <a
              href="#"
              className="text-gray-text hover:text-white hover:underline transition-all duration-300"
            >
              Jobs
            </a>
            <a
              href="#"
              className="text-gray-text hover:text-white hover:underline transition-all duration-300"
            >
              API
            </a>
            <a
              href="#"
              className="text-gray-text hover:text-white hover:underline transition-all duration-300"
            >
              Press
            </a>
            <a
              href="#"
              className="text-gray-text hover:text-white hover:underline transition-all duration-300"
            >
              Sitemap
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <div className="font-medium text-white mb-3">Learn</div>
            <a
              href="#"
              className="text-gray-text hover:text-white hover:underline transition-all duration-300"
            >
              Guidebook
            </a>
            <a
              href="#"
              className="text-gray-text hover:text-white hover:underline transition-all duration-300"
            >
              Inspiration
            </a>
            <a
              href="#"
              className="text-gray-text hover:text-white hover:underline transition-all duration-300"
            >
              Community
            </a>
            <a
              href="#"
              className="text-gray-text hover:text-white hover:underline transition-all duration-300"
            >
              Tools
            </a>
          </div>
        </div>
        <div className="flex justify-center text-gray-text mt-[70px]">
          All Rights Reserved. Giovanni 2023.
        </div>
      </div>
    </footer>
  );
}
