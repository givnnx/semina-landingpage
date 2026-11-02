import Link from "next/link";
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
    <section className="bg-surface-subtle py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <SectionTitle title={title} subTitle={subTitle} id="grow-today" />
          <Link
            href="/browse"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-green-ink transition-colors group focus-visible:outline-2 focus-visible:outline-green-ink"
          >
            <span>Explore All Events</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.map((event, index) => (
              <div className="w-full" key={event._id || index}>
                <EventCard data={event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-10 sm:p-12 text-center border border-border-light shadow-sm max-w-lg mx-auto">
            <h3 className="text-lg font-bold text-navy">No Events Available</h3>
            <p className="text-sm text-muted-light mt-2 mb-6">
              Check back soon for new upcoming workshops and conferences.
            </p>
            <Link
              href="/browse"
              className="inline-flex items-center justify-center min-h-11 px-6 rounded-full text-sm font-semibold bg-navy text-white hover:brightness-110 transition-all focus-visible:outline-2 focus-visible:outline-green"
            >
              Browse Catalog
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
