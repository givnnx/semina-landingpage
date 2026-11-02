import Footer from "@/components/organisms/Footer";
import Navbar from "@/components/organisms/Navbar";
import StatisticsSection from "@/components/organisms/StatisticsSection";
import StoriesSection from "@/components/organisms/StoriesSection";
import FeaturedEvents from "@/components/organisms/FeaturedEvents";
import { getDetailEvent } from "@/utils/eventDetail";
import { formatDate } from "@/utils/formatDate";
import { getData, API_BASE_URL } from "@/utils/fetchData";
import { EventData } from "@/components/molecules/EventCard";
import Link from "next/link";

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detailPage = await getDetailEvent(id);

  if (!detailPage) {
    return (
      <div className="min-h-screen bg-navy flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
        <p className="text-gray-text mb-6">The event you are looking for does not exist or has been removed.</p>
        <Link
          href="/browse"
          className="inline-flex items-center justify-center min-h-11 px-6 rounded-full text-sm font-semibold bg-green text-navy hover:brightness-105 transition-all"
        >
          Back to Events
        </Link>
      </div>
    );
  }

  let similarEvents: EventData[] = [];
  try {
    const allEventsRes = await getData("api/v1/participants/events");
    if (allEventsRes?.data) {
      similarEvents = allEventsRes.data
        .filter((e: EventData) => e._id !== id)
        .slice(0, 4);
    }
  } catch {
    // fallback empty
  }

  const coverImageUrl = detailPage.image?.name
    ? detailPage.image.name.startsWith("/")
      ? detailPage.image.name
      : `${API_BASE_URL}/${detailPage.image.name}`
    : "/images/details-image.png";

  const speakerImageUrl = detailPage.talent?.image?.name
    ? detailPage.talent.image.name.startsWith("/")
      ? detailPage.talent.image.name
      : `${API_BASE_URL}/${detailPage.talent.image.name}`
    : "/images/avatar.png";

  return (
    <main>
      {/* Zone 1 — Dark Navy Event Showcase Header */}
      <section className="bg-navy pb-12 lg:pb-16 border-b border-white/10">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 lg:mt-10">
          <div className="max-w-3xl">
            <span className="inline-block bg-green/15 text-green border border-green/30 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
              {detailPage.category?.name || "Featured Event"}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              {detailPage.title}
            </h1>
            <p className="text-gray-text mt-2 text-sm sm:text-base flex flex-wrap items-center gap-2">
              <span>{detailPage.venueName}</span>
              <span>•</span>
              <span>{formatDate(detailPage.date)}</span>
            </p>
          </div>

          <div className="mt-8 rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[16/9] max-h-[480px] bg-navy-dark">
            <img
              src={coverImageUrl}
              alt={detailPage.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Zone 2 — Main Content & Sticky Ticket Sidebar */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Details, Key Points, Map */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-10">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-navy mb-4">
                  Event Details
                </h2>
                <p className="text-base text-navy leading-relaxed max-w-prose whitespace-pre-line">
                  {detailPage.about}
                </p>
              </div>

              {detailPage.keyPoint && detailPage.keyPoint.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-navy mb-4">
                    What You Will Learn
                  </h3>
                  <div className="space-y-3">
                    {detailPage.keyPoint.map((key: string, i: number) => (
                      <div className="flex items-start gap-3" key={i}>
                        <img
                          src="/icons/ic-check.svg"
                          alt=""
                          className="w-5 h-5 shrink-0 mt-0.5"
                        />
                        <span className="text-navy text-base leading-snug">
                          {key}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold text-navy mb-4">
                  Event Location
                </h3>
                <div className="rounded-2xl border border-border-light overflow-hidden max-w-md shadow-sm">
                  <img
                    src="/images/maps.png"
                    alt="Event venue map preview"
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-4 bg-surface-subtle flex items-center gap-3">
                    <img
                      src="/icons/ic-marker.svg"
                      alt=""
                      className="w-5 h-5 shrink-0"
                    />
                    <span className="text-navy font-medium text-sm">
                      {detailPage.venueName}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sticky Sidebar: Speaker & Ticket Card */}
            <aside className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-8">
              <div className="bg-surface-subtle rounded-3xl p-6 sm:p-8 border border-border-light shadow-lg">
                <h3 className="text-base font-semibold text-muted-light uppercase tracking-wider mb-4">
                  Featured Speaker
                </h3>
                <div className="flex items-center gap-4">
                  <img
                    src={speakerImageUrl}
                    alt={detailPage.talent?.name || "Speaker"}
                    width="56"
                    height="56"
                    className="rounded-full object-cover border border-border-light"
                  />
                  <div>
                    <div className="font-bold text-base text-navy">
                      {detailPage.talent?.name || "Expert Speaker"}
                    </div>
                    <span className="text-sm text-muted-light">
                      {detailPage.talent?.role || "Industry Practitioner"}
                    </span>
                  </div>
                </div>

                <hr className="my-6 border-border-light" />

                <h3 className="text-base font-semibold text-muted-light uppercase tracking-wider mb-4">
                  Tickets & Schedule
                </h3>
                {detailPage.tickets?.map((ticket: any) => (
                  <div key={ticket._id} className="space-y-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-bold text-navy">
                        {ticket.price === 0 ? "Free" : `$${ticket.price}`}
                      </span>
                      <span className="text-sm font-medium text-muted-light">
                        / person ({ticket.type || "General"})
                      </span>
                    </div>

                    <div className="space-y-2.5 pt-2 text-sm text-navy font-medium">
                      <div className="flex items-center gap-3">
                        <img
                          src="/icons/ic-marker.svg"
                          alt=""
                          className="w-5 h-5 shrink-0"
                        />
                        <span>{detailPage.venueName}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <img
                          src="/icons/ic-time.svg"
                          alt=""
                          className="w-5 h-5 shrink-0"
                        />
                        <span>10:00 AM - 04:00 PM</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <img
                          src="/icons/ic-calendar.svg"
                          alt=""
                          className="w-5 h-5 shrink-0"
                        />
                        <span>{formatDate(detailPage.date)}</span>
                      </div>
                    </div>

                    {detailPage.stock !== 0 ? (
                      <Link
                        href={`/checkout/${id}?ticketId=${ticket._id}`}
                        className="w-full mt-4 inline-flex items-center justify-center min-h-12 py-3 px-6 rounded-full text-base font-semibold text-center no-underline transition-all duration-200 bg-green text-navy hover:brightness-105 shadow-[0px_4px_15px_rgba(1,251,52,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-ink cursor-pointer"
                      >
                        Join Now
                      </Link>
                    ) : (
                      <div className="w-full mt-4 text-center py-3 px-6 rounded-full text-sm font-semibold bg-gray-text/20 text-muted-light cursor-not-allowed">
                        Sold Out
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <FeaturedEvents data={similarEvents} title="Similar Events" subTitle="Next One" />
      <StoriesSection />
      <StatisticsSection />
      <Footer />
    </main>
  );
}
