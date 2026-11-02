import Footer from "@/components/organisms/Footer";
import Navbar from "@/components/organisms/Navbar";
import FormCheckout from "@/components/organisms/FormCheckout";
import { getDetailEvent } from "@/utils/eventDetail";
import { formatDate } from "@/utils/formatDate";
import { getData, API_BASE_URL } from "@/utils/fetchData";

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ ticketId?: string }>;
}) {
  const { id } = await params;
  const sp = searchParams ? await searchParams : {};
  const detailPage = await getDetailEvent(id);
  const paymentsRes = await getData("api/v1/participants/payments");
  const payments = Array.isArray(paymentsRes?.data) ? paymentsRes.data : [];
  if (!detailPage) {
    return <div>Event not found.</div>;
  }

  const coverImageUrl = detailPage.image?.name
    ? detailPage.image.name.startsWith("/")
      ? detailPage.image.name
      : `${API_BASE_URL}/${detailPage.image.name}`
    : "/images/details-image.png";

  return (
    <>
      <section className="bg-navy">
        <Navbar />
      </section>

      <section className="bg-navy py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-center text-2xl sm:text-3xl lg:text-[32px] font-semibold text-white mb-8 sm:mb-12">
            Invest In Yourself
          </h1>

          <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12 mb-12 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8">
            <img
              src={coverImageUrl}
              className="rounded-2xl w-full md:w-[320px] lg:w-[368px] h-[220px] object-cover border border-white/10 shrink-0"
              alt={detailPage.title}
            />
            <div className="flex flex-col gap-3 text-white flex-1">
              <span className="text-xs font-bold text-green uppercase tracking-wider">
                {detailPage.category?.name || "Event Checkout"}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold leading-snug">{detailPage.title}</h2>

              <div className="flex items-center gap-3 font-normal text-sm sm:text-base text-gray-text">
                <img src="/icons/ic-marker-white.svg" alt="" className="w-5 h-5 shrink-0" />
                <span>{detailPage.venueName}</span>
              </div>
              <div className="flex items-center gap-3 font-normal text-sm sm:text-base text-gray-text">
                <img src="/icons/ic-time-white.svg" alt="" className="w-5 h-5 shrink-0" />
                <span>10:00 AM - 04:00 PM</span>
              </div>
              <div className="flex items-center gap-3 font-normal text-sm sm:text-base text-gray-text">
                <img src="/icons/ic-calendar-white.svg" alt="" className="w-5 h-5 shrink-0" />
                <span>{formatDate(detailPage.date)}</span>
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-white border-b-4 border-double border-white py-1">
              ${detailPage.tickets?.[0]?.price ?? 0}
            </div>
          </div>

          <FormCheckout
            eventId={id}
            tickets={detailPage.tickets || []}
            payments={payments}
            selectedTicketId={sp.ticketId}
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
