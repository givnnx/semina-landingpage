export default function BrandSection({
  className = "",
}: {
  className?: string;
}) {
  return (
    <section
      className={`brand-partner pt-[100px] lg:pt-[330px] pb-[100px] text-center ${className}`}
    >
      <p className="text-lg text-gray-text font-medium mb-[30px]">
        Events held by top & biggest global companies
      </p>
      <div className="flex flex-wrap justify-center items-center gap-[70px] gap-y-[35px]">
        <img src="/images/apple-111.svg" alt="semina" />
        <img src="/images/Adobe.svg" alt="semina" />
        <img src="/images/slack-21.svg" alt="semina" />
        <img src="/images/spotify-11.svg" alt="semina" />
        <img src="/images/google-2015.svg" alt="semina" />
      </div>
    </section>
  );
}
