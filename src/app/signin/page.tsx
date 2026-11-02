import BrandSection from "@/components/organisms/BrandSection";
import FormSignin from "@/components/organisms/FormSignin";
import Navbar from "@/components/organisms/Navbar";

export default function Signin() {
  return (
    <>
      <section className="bg-navy">
        <Navbar />
      </section>
      <section className="login header bg-navy py-12 lg:py-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col items-center gap-10">
            <div>
              <div className="text-[45px] font-medium text-white text-center">
                Sign In
              </div>
            </div>
            <FormSignin />
          </div>
        </div>
      </section>
      <BrandSection className="bg-navy pt-4 pb-16" variant="dark" />
    </>
  );
}
