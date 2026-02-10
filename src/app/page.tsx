import BrandSection from "../components/organisms/BrandSection";
import FeaturedEvents from "../components/organisms/FeaturedEvents";
import Footer from "../components/organisms/Footer";
import Header from "../components/organisms/Header";
import StatisticsSection from "../components/organisms/StatisticsSection";
import StoriesSection from "../components/organisms/StoriesSection";
import { getData } from "../utils/fetchData";
import { EventData } from "../components/molecules/EventCard";

export default async function Home() {
  let data: EventData[] = [];

  try {
    const res = await getData("api/v1/events");
    if (res && res.data) {
      data = res.data;
    }
  } catch (err) {
    console.log(err);
  }

  return (
    <main>
      <Header />
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
