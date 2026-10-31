import {
  CalendarPlus,
  HeartHandshake,
  MapPinned,
  Wallet,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const FEATURES = [
  {
    icon: CalendarPlus,
    title: "Discover Upcoming Events",
    description:
      "Browse donation runs, cleanup drives, and free treatment camps — always sorted by date so you never miss one.",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: HeartHandshake,
    title: "Volunteer in One Click",
    description:
      "Join any community event, see how many people are already in, and lend your hand where it matters most.",
    tone: "bg-secondary text-secondary-foreground",
  },
  {
    icon: MapPinned,
    title: "Community-First Locations",
    description:
      "Every event is mapped to the neighborhoods that need support, so help reaches the right place at the right time.",
    tone: "bg-chart-4/10 text-chart-4",
  },
  {
    icon: Wallet,
    title: "Transparent Giving",
    description:
      "Track what was donated, distributed, and spent for each campaign — trust built in the open.",
    tone: "bg-chart-3/10 text-chart-3",
  },
];

export function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <header className="mb-10 flex flex-col items-start gap-3">
        <span className="text-sm font-bold tracking-widest text-primary uppercase">
          What we offer
        </span>
        <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
          Everything a helping community needs
        </h2>
        <p className="max-w-xl text-muted-foreground">
          HelpingHands is built so organizing good work feels as easy as
          showing up for it.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <Card key={feature.title} className="gap-3 transition-all hover:-translate-y-1 hover:ring-primary/30!">
            <CardHeader>
              <span
                className={
                  "mb-2 grid size-11 place-items-center rounded-xl " +
                  feature.tone
                }
              >
                <feature.icon className="size-5" />
              </span>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-[0.8125rem] leading-relaxed">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
