import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Decorative newsletter section — no subscription functionality required yet.
 */
export function Newsletter() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-4 pb-20 md:px-6">
      <div className="relative overflow-hidden rounded-3xl border bg-secondary/50 px-6 py-12 md:px-12">
        <div
          aria-hidden
          className="absolute -top-16 -left-16 size-56 rounded-full bg-primary/10 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -right-10 -bottom-20 size-64 rounded-full bg-card/60 blur-2xl"
        />

        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <span className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
            <MailCheck className="size-7" />
          </span>

          <div className="space-y-2">
            <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
              Stay in the giving loop
            </h2>
            <p className="text-muted-foreground">
              One short email every month — upcoming events, volunteer stories,
              and how your contributions helped. No spam, ever.
            </p>
          </div>

          {/* decorative form — functionality comes later */}
          <div className="flex w-full max-w-md items-center gap-2 rounded-2xl bg-card p-2 shadow-lg">
            <Input
              type="email"
              placeholder="Enter your email address"
              aria-label="Email address"
              className="h-9 flex-1 border-0 bg-transparent focus-visible:ring-0"
            />
            <Button size="lg" className="px-5">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Join 3,000+ subscribers who care about their community.
          </p>
        </div>
      </div>
    </section>
  );
}
