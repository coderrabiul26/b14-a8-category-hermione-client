import { UpcomingEvent } from '@/lib/type';
import { CalendarDays, Delete, Edit, MapPin, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from "next/link";
import { Button } from '../ui/button';
type TJoinedEventCardProps={
    event: UpcomingEvent
}
const ManageEventCard = ({event}:TJoinedEventCardProps) => {
    return (
       <div className="group overflow-hidden rounded-2xl border border-green-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Event Image */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={event.imageUrl}
          sizes=""
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-green-600 px-4 py-1.5 text-xs font-semibold text-white">
          {event.type}
        </span>
      </div>

      {/* Card Content */}
      <div className="space-y-4 p-5">

        <div>

          <h2 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-green-700">
            {event.title}
          </h2>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
            {event.description}
          </p>
        </div>

        {/* Event Information */}
        <div className="space-y-3 border-y border-gray-100 py-4">

          <div className="flex items-center gap-3 text-sm text-gray-600">
            <CalendarDays size={18} className="text-green-600" />
            <span>
              {new Date(event.date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-600">
            <MapPin size={18} className="text-green-600" />
            <span>{event.location}</span>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-1">

          <Link
            href={`/eventDetails/${event._id}`}
            className="flex-1 rounded-lg border border-green-600 px-3 py-2.5 text-center text-sm font-semibold text-green-700 transition hover:bg-green-50"
          >
            View Event
          </Link>
          <Button className='py-5'><Edit></Edit>Edit</Button>
          <Button className='py-5'><Trash2></Trash2>Delete</Button>

          

        </div>
      </div>
    </div>
    );
};

export default ManageEventCard;