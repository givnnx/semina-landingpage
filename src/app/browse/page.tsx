import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import EventCard, { EventData } from "@/components/molecules/EventCard";
import { getData } from "@/utils/fetchData";

export default async function Browse() {
  let events: EventData[] = [];
  try {
    const res = await getData("api/v1/participants/events");
    if (res && res.data) {
      events = res.data;
    }
  } catch (err) {
    console.error("Error loading events in browse page:", err);
  }

  return (
    <main>
      <section className="bg-navy">
        <Navbar />
      </section>

      <section className="bg-surface-subtle py-16">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="mb-10 text-center lg:text-left">
            <span className="text-sm font-bold uppercase tracking-wider text-accent-magenta">
              Catalog
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold text-navy mt-1">
              Explore All Events
            </h1>
            <p className="text-muted-light mt-2 text-base">
              Discover workshops, masterclasses, and conferences designed to accelerate your career.
            </p>
          </div>

          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {events.map((event, index) => (
                <div className="w-full" key={event._id || index}>
                  <EventCard data={event} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-border-light shadow-sm">
              <h2 className="text-xl font-semibold text-navy">No Upcoming Events Right Now</h2>
              <p className="text-muted-light mt-2">
                Check back soon or explore our past stories.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
