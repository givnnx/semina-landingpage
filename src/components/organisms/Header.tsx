import Navbar from "./Navbar";
import Hero from "./Hero";
import { EventData } from "@/components/molecules/EventCard";

export default function Header({ events = [] }: { events?: EventData[] }) {
  return (
    <header className="header bg-navy">
      <Navbar />
      <Hero events={events} />
    </header>
  );
}
