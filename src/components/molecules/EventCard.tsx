import Link from "next/link";
import { formatDate } from "../../utils/formatDate";
import Badge from "../atoms/Badge";
import { API_BASE_URL } from "../../utils/fetchData";
export interface Ticket {
  _id: string;
  type?: string;
  price: number;
  statusTicketCategories?: boolean;
}

interface Category {
  name: string;
}

interface Image {
  name: string;
}

export interface EventData {
  _id: string;
  title: string;
  category: Category;
  venueName: string;
  date: string;
  tickets: Ticket[];
  image: Image;
  about?: string;
  keyPoint?: string[];
  organizer?: string;
  stock?: number;
  talent?: {
    name: string;
    role: string;
    image: Image;
  };
  statusTicketCategories?: boolean;
}

export default function EventCard({ data }: { data: EventData }) {
  const price = data.tickets?.[0]?.price ?? 0;
  const imageUrl = data.image?.name
    ? `${API_BASE_URL}/${data.image.name}`
    : "https://placehold.co/400x200";

  return (
    <div className="bg-white rounded-2xl overflow-hidden relative h-full group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-border-light">
      <Badge variant="price" className="absolute z-10 right-4 top-4">
        {price === 0 ? "free" : `$${price}`}
      </Badge>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={data.title}
        className="w-full h-[200px] object-cover"
      />
      <div className="p-5">
        <div className="font-semibold text-lg text-navy mb-2 line-clamp-1">
          {data.title}
        </div>
        <div className="font-normal text-sm text-muted-light mb-6">
          {data.category?.name || "General"}
        </div>
        <div className="font-medium text-sm text-navy">
          {data.venueName}, {formatDate(data.date)}
        </div>
        <Link
          href={`/detail/${data._id}`}
          aria-label={`View details for ${data.title}`}
          className="absolute inset-0 z-20 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-ink"
        ></Link>
      </div>
    </div>
  );
}
