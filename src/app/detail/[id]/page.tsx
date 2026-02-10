import Button from "@/components/atoms/Button";
import Footer from "@/components/organisms/Footer";
import Navbar from "@/components/organisms/Navbar";
import StatisticsSection from "@/components/organisms/StatisticsSection";
import StoriesSection from "@/components/organisms/StoriesSection";
import FeaturedEvents from "@/components/organisms/FeaturedEvents";
import { getDetailEvent } from "@/utils/eventDetail";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detailPage = await getDetailEvent(id);

  if (!detailPage) {
    return <div>Event not found.</div>;
  }

  return (
    <>
      <section className="bg-navy">
        <Navbar />
      </section>

      <div className="bg-navy text-center py-12">
        <div className="container mx-auto px-4 lg:px-0 flex justify-center">
          <img
            src={
              detailPage.image?.name.startsWith("/")
                ? detailPage.image.name
                : `/images/details-image.png`
            }
            className="rounded-[30px] w-full max-w-[1055px] h-[500px] object-cover"
            alt="semina"
          />
        </div>
        <div className="container mx-auto px-4 lg:px-0 relative z-10 bg-transparent pb-20"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-0 -mt-20 relative z-10 bg-transparent pb-20">
        <div className="flex flex-wrap lg:justify-center gap-[100px]">
          <div className="flex flex-col max-w-[600px] w-full bg-white p-8 md:p-0 md:bg-transparent rounded-2xl md:rounded-none">
            <div className="text-[42px] font-semibold text-navy md:text-white mb-6">
              {detailPage.title}
            </div>

            <div className="mt-8">
              <h6 className="text-xl font-semibold text-navy mb-4">
                Event Details
              </h6>
              <p className="text-base text-navy leading-loose">
                {detailPage.about}
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {(detailPage.keyPoint || []).map((key: string, i: number) => (
                <div className="flex items-start gap-3" key={i}>
                  <span className="text-green">✓</span>
                  <span className="text-navy">{key}</span>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h6 className="text-xl font-semibold text-navy mb-4">
                Event Location
              </h6>
              <div className="p-2 border border-gray-200 rounded-[18px] w-max">
                <div className="relative overflow-hidden rounded-[18px] w-full md:w-[442px] h-[295px]">
                  <img
                    src="/images/maps.png"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-[360px]">
            <div className="bg-white rounded-[24px] p-6 border border-gray-200">
              <h6 className="text-[18px] font-medium text-navy mb-4">
                Your Speaker
              </h6>
              <div className="flex items-center gap-3">
                <img
                  src="/images/avatar.png"
                  alt="semina"
                  width="60"
                  className="rounded-full"
                />
                <div>
                  <div className="font-medium text-base text-navy">
                    {detailPage.talent?.name}
                  </div>
                  <span className="text-sm text-gray-text">
                    {detailPage.talent?.role}
                  </span>
                </div>
              </div>

              <hr className="my-[30px] border-gray-200" />

              <h6 className="text-[18px] font-medium text-navy mb-4">
                Get Ticket
              </h6>
              {detailPage.tickets.map((ticket: any) => (
                <div key={ticket._id}>
                  <div className="text-[42px] font-bold text-navy my-3">
                    {ticket.price === 0 ? "free" : `$${ticket.price}`}
                    <span className="text-base font-normal text-gray-text ml-1">
                      /person
                    </span>
                  </div>
                  <div className="flex gap-3 items-center text-navy font-normal mb-3">
                    <span>📍</span> {detailPage.venueName}
                  </div>
                  <div className="flex gap-3 items-center text-navy font-normal mb-3">
                    <span>🕒</span> 10:00 AM
                  </div>
                  <div className="flex gap-3 items-center text-navy font-normal mb-3">
                    <span>📅</span> {formatDate(detailPage.date)}
                  </div>

                  {detailPage.stock !== 0 && (
                    <Link href={`/checkout/${id}?ticketId=${ticket._id}`}>
                      <Button variant="green" className="w-full mt-4">
                        Join Now
                      </Button>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <FeaturedEvents data={[]} title="Similar Events" subTitle="Next One" />
      <StoriesSection />
      <StatisticsSection />
      <Footer />
    </>
  );
}
