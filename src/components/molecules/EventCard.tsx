import Link from "next/link";
import { formatDate } from "../../utils/formatDate";
import Badge from "../atoms/Badge";

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
  return (
    <div className="bg-white rounded-[20px] overflow-hidden relative h-full group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Badge variant="price" className="absolute z-10 right-4 top-4">
        {data.tickets[0].price === 0 ? "free" : `$${data.tickets[0].price}`}
      </Badge>
      <img
        src={`${process.env.NEXT_PUBLIC_API || ""}/${data.image.name}`}
        alt="semina"
        className="w-full h-[200px] object-cover"
      />
      <div className="p-5">
        <div className="font-medium text-[18px] text-navy mb-2">
          {data.title}
        </div>
        <div className="font-normal text-sm text-gray-text mb-[30px]">
          {data.category.name}
        </div>
        <div className="font-medium text-sm text-navy">
          {data.venueName}, {formatDate(data.date)}
        </div>
        <Link
          href={`/detail/${data._id}`}
          className="absolute inset-0 z-20 cursor-pointer"
        ></Link>
      </div>
    </div>
  );
}
