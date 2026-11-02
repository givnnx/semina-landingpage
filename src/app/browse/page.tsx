import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import BrowseCatalog from "@/components/organisms/BrowseCatalog";
import { EventData } from "@/components/molecules/EventCard";
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

      <section className="bg-surface-subtle py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10 text-center lg:text-left">
            <span className="text-sm font-bold uppercase tracking-wider text-gradient-pink-peach inline-block">
              Catalog
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold text-navy mt-1">
              Explore All Events
            </h1>
            <p className="text-muted-light mt-2 text-base max-w-2xl">
              Discover workshops, masterclasses, and conferences designed to accelerate your career.
            </p>
          </div>

          <BrowseCatalog initialEvents={events} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
