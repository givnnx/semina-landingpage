import Navbar from "./Navbar";
import Hero from "./Hero";

export default function Header() {
  return (
    <header className="header bg-navy min-h-[880px]">
      <Navbar />
      <Hero />
    </header>
  );
}
