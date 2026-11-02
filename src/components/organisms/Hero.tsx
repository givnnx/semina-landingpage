import Link from "next/link";
import { EventData } from "@/components/molecules/EventCard";
import HeroCarousel from "@/components/molecules/HeroCarousel";

export default function Hero({ events = [] }: { events?: EventData[] }) {
  return (
    <>
      <div className="pt-10 sm:pt-14 lg:pt-20 pb-10 sm:pb-12 text-center max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-white leading-tight lg:leading-[1.35]">
          Expand Your{" "}
          <span className="text-gradient-blue-teal font-bold">Knowledge</span>{" "}
          <br className="hidden sm:block" />
          by{" "}
          <span className="text-gradient-pink-peach font-bold">Joining</span> Our Greatest Events
        </h1>
        <p className="my-6 sm:my-8 text-base font-normal leading-relaxed text-gray-text max-w-2xl mx-auto">
          Kami menyediakan berbagai acara terbaik untuk membantu Anda dalam
          meningkatkan skills di bidang teknologi, desain, dan bisnis.
        </p>
        <div className="flex justify-center">
          <Link
            href="/browse"
            className="inline-flex items-center justify-center min-h-12 py-3 px-8 rounded-full text-base font-semibold text-center no-underline transition-all duration-300 bg-green text-navy hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green shadow-[0px_4px_15px_rgba(1,251,52,0.35)] cursor-pointer"
          >
            Browse Now
          </Link>
        </div>
      </div>

      <div className="bg-[linear-gradient(to_bottom,var(--navy)_55%,var(--background)_45%)] pt-2 pb-6">
        <HeroCarousel events={events} />
      </div>
    </>
  );
}
