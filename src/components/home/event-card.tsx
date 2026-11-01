'use client'
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, HeartPulse } from "lucide-react";
import { UpcomingEvent } from "@/lib/type";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { toast } from "../ui/toast";

interface EventCardProps {
  event: UpcomingEvent;
}

const EventCard = ({ event }: EventCardProps) => {

  const {data: session}= authClient.useSession()
  const user= session?.user
  
  const joinedData={
    ...event,
    userName: user?.name,
    userEmail: user?.email,
    joinedDate: new Date()
  }
  console.log(joinedData);



  const handleJoinEvent = async () => {
  if (!user) {
    alert("Please login to join this event");
    return;
  }

  const res = await fetch("http://localhost:5000/joinedEvent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(joinedData),
  });
  const resData = await res.json();
   toast.add({
            title: "Event joining successful!",
            description: "You successfully joined the event",
            type: "success",
            timeout: 3000,
        })
  redirect('/upcomingEvent')
};

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
          Free Treatment
        </span>
      </div>

      {/* Card Content */}
      <div className="space-y-4 p-5">

        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-700">
            <HeartPulse size={17} />
            Healthcare Campaign
          </div>

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
          <Button onClick={handleJoinEvent} className="flex-1 rounded-lg bg-green-600 px-3 py-5 text-center text-sm font-semibold text-white transition hover:bg-green-700">
            Join Event
          </Button>
          

        </div>
      </div>
    </div>
  );
};

export default EventCard;