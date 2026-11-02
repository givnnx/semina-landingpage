import Link from "next/link";
import BrandSection from "../components/organisms/BrandSection";
import FeaturedEvents from "../components/organisms/FeaturedEvents";
import Footer from "../components/organisms/Footer";
import Header from "../components/organisms/Header";
import StatisticsSection from "../components/organisms/StatisticsSection";
import StoriesSection from "../components/organisms/StoriesSection";
import { getData } from "../utils/fetchData";
import { EventData } from "../components/molecules/EventCard";

interface HomeProps {
  searchParams?: Promise<{ checkout?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  let data: EventData[] = [];
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const isCheckoutSuccess = resolvedSearchParams.checkout === "success";

  try {
    const res = await getData("api/v1/participants/events");
    if (res && res.data) {
      data = res.data;
    }
  } catch (err) {
    console.log(err);
  }

  return (
    <main>
      {isCheckoutSuccess && (
        <div className="bg-navy border-b border-green/30 text-white py-3.5 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <img
                src="/icons/ic-check.svg"
                alt=""
                className="w-5 h-5 shrink-0"
              />
              <span className="text-sm font-medium">
                Payment confirmed! Your ticket reservation has been recorded successfully.
              </span>
            </div>
            <Link
              href="/orders"
              className="inline-flex items-center justify-center min-h-9 px-4 rounded-full text-xs font-semibold bg-green text-navy hover:brightness-105 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-green"
            >
              View My Tickets
            </Link>
          </div>
        </div>
      )}
      <Header events={data} />
      <BrandSection />
      <FeaturedEvents
        data={data}
        title="Featured Events"
        subTitle="Grow Today"
      />
      <StoriesSection />
      <StatisticsSection />
      <Footer />
    </main>
  );
}
