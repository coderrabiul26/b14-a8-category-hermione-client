

import EventCard from "@/components/home/event-card";
import { UpcomingEvent } from "@/lib/type";
import { filterUpcomingEvents } from "@/lib/event-date";

export default async function RecentUpcomingEvent() {
  const res= await fetch('http://localhost:5000/recentUpcomingEvent')
  // The server limits to 6 (assignment condition) — only past-date
  // events are filtered on the client side.
  const eventData: UpcomingEvent[] = filterUpcomingEvents(await res.json())
 

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <header className="mb-10 flex flex-col items-start gap-3">
        <span className="text-sm font-bold tracking-widest text-primary uppercase">
          Mark your calendar
        </span>
        <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
          Recent Upcoming Events
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Every planned event across the community — pick the ones you want to
          join or support.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {eventData.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}
