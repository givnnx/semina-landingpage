import Footer from "@/components/organisms/Footer";
import Navbar from "@/components/organisms/Navbar";
import FormCheckout from "@/components/organisms/FormCheckout";
import { getDetailEvent } from "@/utils/eventDetail";
import { formatDate } from "@/utils/formatDate";
import { getData } from "@/utils/fetchData";

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

  return (
    <>
      <section className="bg-navy">
        <Navbar />
      </section>

      <section className="bg-navy pb-[100px]">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="text-center text-[32px] font-semibold text-white mb-[70px]">
            Invest In Yourself
          </div>

          <div className="flex flex-wrap lg:justify-center items-center gap-12 mb-12">
            <img
              src="/images/details-image.png"
              className="rounded-[30px] w-full lg:w-[368px] h-[255px] object-cover"
              alt="semina"
            />
            <div className="flex flex-col gap-3 text-white">
              <h5 className="text-[22px] font-semibold">{detailPage.title}</h5>

              <div className="flex items-center gap-3 font-normal text-base">
                <span>📍</span>
                <span>{detailPage.venueName}</span>
              </div>
              <div className="flex items-center gap-3 font-normal text-base">
                <span>🕒</span>
                <span>10:00 AM</span>
              </div>
              <div className="flex items-center gap-3 font-normal text-base">
                <span>📅</span>
                <span>{formatDate(detailPage.date)}</span>
              </div>
            </div>
            <div className="text-[42px] font-bold text-white ml-auto lg:ml-10 border-b-[5px] border-double border-white">
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
