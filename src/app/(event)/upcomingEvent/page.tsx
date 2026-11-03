import EventCard from "@/components/home/event-card";
import { UpcomingEvent } from "@/lib/type";
import { filterUpcomingEvents } from "@/lib/event-date";

export default async function EventsPage() {
  const res= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upcomingEvent`,{cache: 'no-store'})
  const eventData: UpcomingEvent[] = await res.json()

  // No past-date events on the listing.
  const upcomingEvents = filterUpcomingEvents(eventData);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <header className="mb-10 flex flex-col items-start gap-3">
        <span className="text-sm font-bold tracking-widest text-primary uppercase">
          Mark your calendar
        </span>
        <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
          All Upcoming Events
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Every planned event across the community — pick the ones you want to
          join or support.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {upcomingEvents.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>

      {upcomingEvents.length === 0 && (
        <p className="mt-10 text-center text-muted-foreground">
          No upcoming events right now. Check back soon!
        </p>
      )}
    </div>
  );
}
