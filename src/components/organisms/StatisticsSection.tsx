import StatItem from "../molecules/StatItem";

export default function StatisticsSection() {
  return (
    <section className="statistics py-14 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center items-center gap-8 sm:gap-10 lg:gap-14">
          <StatItem value="190K+" label="Events Created" />
          <div className="h-[50px] w-[1px] bg-border-light hidden md:block"></div>
          <StatItem value="3M" label="People Joined" />
          <div className="h-[50px] w-[1px] bg-border-light hidden md:block"></div>
          <StatItem value="5K+" label="Success Startup" />
          <div className="h-[50px] w-[1px] bg-border-light hidden md:block"></div>
          <StatItem value="113K+" label="Top Speakers" />
        </div>
      </div>
    </section>
  );
}
