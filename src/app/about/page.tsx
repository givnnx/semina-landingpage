import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import StatisticsSection from "@/components/organisms/StatisticsSection";
import BrandSection from "@/components/organisms/BrandSection";

export default function About() {
  return (
    <main>
      <section className="bg-navy">
        <Navbar />
      </section>

      <section className="bg-surface-subtle py-16">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-accent-magenta">
              Our Mission
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold text-navy mt-2">
              Empowering Tech Talent Across Southeast Asia
            </h1>
            <p className="text-muted-light mt-4 text-base leading-relaxed">
              Semina connects aspiring developers, designers, and product leaders with industry practitioners through high-impact workshops, conferences, and masterclasses.
            </p>
          </div>
        </div>
      </section>

      <StatisticsSection />
      <BrandSection />
      <Footer />
    </main>
  );
}
