import BrandSection from "@/components/organisms/BrandSection";
import FormSignup from "@/components/organisms/FormSignup";
import Navbar from "@/components/organisms/Navbar";

export default function Signup() {
  return (
    <>
      <section className="bg-navy">
        <Navbar />
      </section>

      <section className="login header bg-navy py-12 lg:py-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="md:pr-10">
              <div className="text-[45px] font-semibold text-white leading-tight mb-6">
                Expand Your <br className="hidden md:block" />
                Knowledge & Skills
              </div>
              <p className="text-base font-normal text-gray-text leading-[30px]">
                Kami menyediakan berbagai acara terbaik untuk membantu{" "}
                <br className="hidden lg:block" />
                anda dalam meningkatkan skills di bidang teknologi
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <FormSignup />
            </div>
          </div>
        </div>
      </section>

      <BrandSection className="bg-navy pt-4 pb-16" variant="dark" />
    </>
  );
}
