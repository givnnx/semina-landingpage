import Link from "next/link";

export default function StoriesSection() {
  return (
    <section className="stories bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 flex justify-center">
            <img
              src="/images/story.png"
              alt="Story highlight"
              className="w-full max-w-md lg:max-w-none rounded-2xl object-cover shadow-lg"
            />
          </div>
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="mb-2">
              <span className="text-sm font-bold uppercase tracking-wider text-gradient-pink-peach inline-block">
                Story
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-semibold text-navy leading-snug">
              One Great Event. <br className="hidden sm:block" />
              For The Better World.
            </h2>
            <p className="text-base font-normal text-muted-light leading-relaxed my-6 max-w-prose">
              Baca kisah bagaimana Shayna berhasil membangun sebuah Startup yang
              membantu warga untuk mendapatkan bantuan selama pandemic.
            </p>
            <Link
              href="/stories"
              className="inline-flex items-center justify-center py-[13px] px-[35px] rounded-full text-base font-semibold text-center no-underline transition-all duration-200 cursor-pointer bg-navy text-white hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
            >
              Read Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
