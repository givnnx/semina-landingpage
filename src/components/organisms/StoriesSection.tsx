import Button from "@/components/atoms/Button";

export default function StoriesSection() {
  return (
    <section className="stories bg-white pt-[100px] pb-[70px]">
      <div className="flex flex-col lg:flex-row justify-center items-center container mx-auto px-4 lg:px-0">
        <img
          src="/images/story.png"
          alt="semina"
          className="hidden lg:block mr-[100px]"
          width="515"
        />
        <div className="flex flex-col">
          <div>
            <div className="mb-2">
              <span className="text-sm font-bold uppercase tracking-wider text-accent-magenta">
                Story
              </span>
            </div>
            <div className="text-[32px] font-medium text-navy leading-normal">
              One Great Event. <br className="hidden lg:block" />
              For The Better World.
            </div>
          </div>
          <p className="text-base font-normal text-muted-light leading-[30px] my-6">
            Baca kisah bagaimana Shayna berhasil membangun{" "}
            <br className="hidden lg:block" />
            sebuah Startup yang membantu warga untuk{" "}
            <br className="hidden lg:block" />
            mendapatkan bantuan selama pandemic.
          </p>
          <Button variant="navy" className="w-max">
            Read
          </Button>
        </div>
      </div>
    </section>
  );
}
