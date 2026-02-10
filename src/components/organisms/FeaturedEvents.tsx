import EventCard, { EventData } from "../molecules/EventCard";
import SectionTitle from "../molecules/SectionTitle";

export default function FeaturedEvents({
  data,
  title,
  subTitle,
}: {
  data: EventData[];
  title: string;
  subTitle: string;
}) {
  return (
    <section className="bg-gray-50 py-[100px]">
      <div className="container mx-auto px-4 lg:px-0">
        <SectionTitle title={title} subTitle={subTitle} />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6">
          {data.map((event, index) => (
            <div className="w-full" key={event._id || index}>
              <EventCard data={event} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
