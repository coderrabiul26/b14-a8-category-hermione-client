import Link from "next/link";
import {
  CalendarDays,
  HandHeart,
  MapPin,
  Megaphone,
  Shirt,
  Stethoscope,
  Trash2,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { EventCategory, UpcomingEvent } from "@/lib/events";

const CATEGORY_CONFIG: Record<
  EventCategory,
  { label: string; className: string; iconClass: string; icon: typeof HandHeart }
> = {
  donation: {
    label: "Donation",
    className: "bg-primary text-primary-foreground",
    iconClass: "text-primary",
    icon: HandHeart,
  },
  clothes: {
    label: "Cloth Distribution",
    className: "bg-secondary text-secondary-foreground",
    iconClass: "text-chart-2",
    icon: Shirt,
  },
  cleanup: {
    label: "Cleanup Drive",
    className: "bg-chart-4/10 text-chart-4",
    iconClass: "text-chart-4",
    icon: Trash2,
  },
  treatment: {
    label: "Free Treatment",
    className: "bg-chart-3/10 text-chart-3",
    iconClass: "text-chart-3",
    icon: Stethoscope,
  },
  awareness: {
    label: "Awareness Rally",
    className: "bg-chart-5/10 text-chart-5",
    iconClass: "text-chart-5",
    icon: Megaphone,
  },
};

/** Big calendar date block shown on every event card. */
function DateBlock({ iso }: { iso: string }) {
  const date = new Date(iso);
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = date.getDate();

  return (
    <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-xl bg-primary/10 text-primary">
      <span className="text-[0.625rem] font-bold tracking-widest uppercase">
        {month}
      </span>
      <span className="text-lg leading-none font-extrabold">{day}</span>
    </div>
  );
}

export function EventCard({ event }: { event: UpcomingEvent }) {
  const category = CATEGORY_CONFIG[event.category];

  return (
    <Link
      href={`/events#${event.id}`}
      className="group block"
    >
      <Card className="justify-between transition-all hover:-translate-y-1 hover:ring-primary/40!">
      {/* media area — themed placeholder until real images are attached */}
      <div className="relative grid h-36 place-items-center bg-gradient-to-br from-accent/50 to-muted/20">
        <category.icon
          aria-hidden
          className={
            "size-12 opacity-20 transition-transform duration-300 group-hover:scale-110 " +
            category.iconClass
          }
        />
        <Badge
          className={"absolute top-3 left-3 h-6 px-3 " + category.className}
        >
          {category.label}
        </Badge>
      </div>

      <CardContent className="flex items-center gap-4">
        <DateBlock iso={event.date} />
        <div className="min-w-0 space-y-1.5">
          <h3 className="line-clamp-2 font-heading text-base leading-snug font-semibold">
            {event.title}
          </h3>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" />
            <span className="truncate">{event.location}</span>
          </p>
        </div>
      </CardContent>

      <CardFooter className="justify-between">
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Users className="size-3.5" />
          {event.participants} joined
        </p>
        <p className="flex items-center gap-1.5 text-xs font-semibold text-primary">
          <CalendarDays className="size-3.5" />
          {new Date(event.date).toLocaleDateString("en-US", {
            weekday: "short",
          })}
        </p>
      </CardFooter>
      </Card>
    </Link>
  );
}
