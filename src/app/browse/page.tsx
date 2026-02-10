import BrandSection from "@/components/organisms/BrandSection";
import Footer from "@/components/organisms/Footer";
import Header from "@/components/organisms/Header";

export default function Browse() {
  return (
    <>
      <Header />
      <section className="py-[100px] text-center">
        <div className="container mx-auto">
          <h1 className="text-[32px] font-medium text-navy">Browse Events</h1>
          <p className="text-gray-text mt-4">Coming soon...</p>
        </div>
      </section>
      <BrandSection />
      <Footer />
    </>
  );
}
