import Button from "@/components/atoms/Button";

export default function Hero() {
  return (
    <>
      <div className="py-[100px] text-center">
        <div className="text-[45px] font-semibold text-white leading-[70px]">
          Expand Your{" "}
          <span className="text-green font-bold">
            Knowledge
          </span>{" "}
          <br className="hidden lg:block" />
          by{" "}
          <span className="text-green font-bold">
            Joining
          </span>{" "}
          Our Greatest Events
        </div>
        <p className="my-[30px] text-base font-normal leading-[30px] text-gray-text">
          Kami menyediakan berbagai acara terbaik untuk membantu{" "}
          <br className="hidden lg:block" />
          anda dalam meningkatkan skills di bidang teknologi
        </p>
        <div className="flex justify-center">
          <a
            href="#grow-today"
            className="inline-flex items-center justify-center py-[13px] px-[35px] rounded-full text-base font-semibold text-center no-underline transition-all duration-300 bg-green text-navy hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green shadow-[0px_4px_15px_rgba(1,251,52,0.35)]"
          >
            Browse Now
          </a>
        </div>
      </div>

      <div className="flex flex-row flex-nowrap justify-center items-center gap-12 mb-12 lg:mb-0 lg:-bottom-[200px] relative z-10 w-full">
        <div className="shrink-0 w-[301px] h-[175px] lg:w-[662px] lg:h-[410px] rounded-2xl overflow-hidden shadow-lg">
          <img
            src="/images/1.png"
            alt="semina"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="shrink-0 w-[389px] h-[230px] lg:min-w-[838px] lg:min-h-[520px] -mt-10 z-10 rounded-2xl overflow-hidden shadow-xl">
          <img
            src="/images/2.png"
            alt="semina"
            className="w-full h-full object-fill"
          />
        </div>
        <div className="shrink-0 w-[301px] h-[175px] lg:w-[662px] lg:h-[410px] rounded-2xl overflow-hidden shadow-lg">
          <img
            src="/images/1.png"
            alt="semina"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
}
