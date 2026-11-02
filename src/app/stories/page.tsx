import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import StoriesSection from "@/components/organisms/StoriesSection";
import StatisticsSection from "@/components/organisms/StatisticsSection";
import BrandSection from "@/components/organisms/BrandSection";

export default function Stories() {
  return (
    <main>
      <section className="bg-navy">
        <Navbar />
      </section>

      <section className="bg-surface-subtle py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-gradient-pink-peach inline-block">
            Community Impact
          </span>
          <h1 className="text-3xl lg:text-4xl font-bold text-navy mt-1">
            Participant Success Stories
          </h1>
          <p className="text-muted-light mt-2 max-w-xl mx-auto text-base">
            How learners, designers, and engineers transformed their career paths through Semina sessions.
          </p>
        </div>
      </section>

      <StoriesSection />
      <StatisticsSection />
      <BrandSection />
      <Footer />
    </main>
  );
}
