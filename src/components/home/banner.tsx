import Link from "next/link";
import {
  ArrowRight,
  HandHeart,
  Shirt,
  Sparkles,
  Stethoscope,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CAUSE_CHIPS = [
  { icon: HandHeart, label: "Donations" },
  { icon: Shirt, label: "Cloth Distribution" },
  { icon: Trash2, label: "Cleanup Drives" },
  { icon: Stethoscope, label: "Free Treatment" },
];

const STATS = [
  { value: "2,400+", label: "People served" },
  { value: "60+", label: "Events organized" },
  { value: "150+", label: "Active volunteers" },
];

export function Banner() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-10 pb-16 md:px-6 md:pt-14">
      <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-b from-accent/60 via-muted/40 to-background px-6 py-12 md:px-12 md:py-16">
        {/* decorative blobs — carry the primary/secondary brand colors */}
        <div
          aria-hidden
          className="absolute -top-24 -right-24 size-72 rounded-full bg-primary/10 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-28 -left-20 size-72 rounded-full bg-secondary/30 blur-3xl"
        />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col items-start gap-6">
            <Badge variant="secondary" className="h-6 gap-1.5 px-3">
              <Sparkles data-icon="inline-start" className="size-3.5!" />
              Growing together, serving together
            </Badge>

            <h1 className="font-heading text-4xl leading-tight font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
              Small acts of kindness,{" "}
              <span className="text-primary">big change</span> for our
              communities.
            </h1>

            <p className="max-w-xl text-base text-muted-foreground md:text-lg">
              HelpingHands connects volunteers, donors, and organizers for
              donation runs, cloth distribution, neighborhood cleanups, and
              free medical treatment — so no one in the community is left
              behind.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button nativeButton={false} size="lg" className="px-6" render={<Link href="/events" />}>
                Join an Event
                <ArrowRight data-icon="inline-end" />
              </Button>
              <Button nativeButton={false} size="lg" variant="outline" className="px-6" render={<Link href="/events" />}>
                Donate Now
              </Button>
            </div>

            {/* stats strip */}
            <dl className="mt-4 grid w-full max-w-md grid-cols-3 gap-4 border-t pt-6">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-2xl font-extrabold text-primary">
                    {stat.value}
                  </dt>
                  <dd className="text-xs text-muted-foreground">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* cause chips — a quick visual summary of what we do */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {CAUSE_CHIPS.map((chip, index) => (
              <div
                key={chip.label}
                className="flex items-center gap-3 rounded-2xl border bg-card/80 px-4 py-4 backdrop-blur-sm transition-colors hover:border-primary/40"
              >
                <span
                  className={
                    "grid size-10 shrink-0 place-items-center rounded-xl " +
                    [
                      "bg-primary/10 text-primary",
                      "bg-secondary text-secondary-foreground",
                      "bg-chart-4/10 text-chart-4",
                      "bg-chart-3/10 text-chart-3",
                    ][index]
                  }
                >
                  <chip.icon className="size-5" />
                </span>
                <span className="text-sm font-semibold">{chip.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
