import BrandSection from "@/components/organisms/BrandSection";
import FormSignin from "@/components/organisms/FormSignin";
import Navbar from "@/components/organisms/Navbar";

export default function Signin() {
  return (
    <>
      <section className="bg-navy">
        <Navbar />
      </section>
      <section className="login header bg-navy min-h-screen py-[50px] flex items-center">
        <div className="container mx-auto px-4 lg:px-0">
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
      <BrandSection className="bg-navy pt-0" />
    </>
  );
}
