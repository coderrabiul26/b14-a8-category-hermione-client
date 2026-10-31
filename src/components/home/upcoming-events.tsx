import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/home/event-card";
import { getUpcomingEvents } from "@/lib/events";

export async function UpcomingEvents() {
  // Framework ready for MongoDB — will return the 6 soonest upcoming events.
  const events = await getUpcomingEvents();

  return (
    <section id="upcoming-events" className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <header className="mb-10">
        <span className="text-sm font-bold tracking-widest text-primary uppercase">
          Don't miss out
        </span>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
            Recent Upcoming Events
          </h2>
          <Button nativeButton={false} variant="outline" render={<Link href="/events" />}>
            View All Events
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
