

import EventCard from "@/components/home/event-card";
import { UpcomingEvent } from "@/lib/type";

// export const metadata: Metadata = {
//   title: "Upcoming Events — HelpingHands",
//   description:
//     "Browse all upcoming donation, cloth distribution, cleanup, and free treatment events organized by the HelpingHands community.",
// };

/**
 * Framework page — currently renders the same sample data as the homepage.
 * Once MongoDB is connected this page will list events fetched from the
 * database (e.g. sorted by date) instead of the placeholder data layer.
 */
export default async function EventsPage() {
  const res= await fetch('http://localhost:5000/upcomingEvent')
  const eventData= await res.json()
  console.log(eventData);

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
        {eventData.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}
