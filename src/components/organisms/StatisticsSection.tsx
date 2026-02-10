import StatItem from "../molecules/StatItem";

export default function StatisticsSection() {
  return (
    <section className="statistics container mx-auto pb-[100px]">
      <div className="flex flex-wrap justify-center items-center gap-12">
        <StatItem value="190K+" label="Events Created" />
        <div className="h-[50px] w-[1px] bg-gray-200 hidden md:block"></div>
        <StatItem value="3M" label="People Joined" />
        <div className="h-[50px] w-[1px] bg-gray-200 hidden md:block"></div>
        <StatItem value="5K+" label="Success Startup" />
        <div className="h-[50px] w-[1px] bg-gray-200 hidden md:block"></div>
        <StatItem value="113K+" label="Top Speakers" />
      </div>
    </section>
  );
}
