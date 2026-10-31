"use client";

import Link from "next/link";
import * as React from "react";
import { Save, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

type TravelPackagePayload = {
  name: string;
  country: string;
  category: string;
  priceUsd: number;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

const categories = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Free Treatment",
  "Charity",
  "Insect Killing",
  "Health Tips"
];

const fieldClassName = "h-10 rounded-md bg-muted/50";

const fieldRowClassName = "grid gap-5 md:grid-cols-2";

export default function CreateEventPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleCreateEventPage = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const payload: TravelPackagePayload = {
      name: String(formData.get("name") ?? "").trim(),
      country: String(formData.get("country") ?? "").trim(),
      // Base UI Select only contributes "category" to FormData after a
      // value is chosen; fall back to the placeholder.
      category: String(formData.get("category") || categories[0]),
      priceUsd: Number(formData.get("priceUsd") ?? 0),
      duration: String(formData.get("duration") ?? "").trim(),
      departureDate: String(formData.get("departureDate") ?? ""),
      imageUrl: String(formData.get("imageUrl") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
    };

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:5000/createEvent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Read the body as text first: on failures the Express API returns an
      // HTML error page, and res.json() would throw before we see the
      // status. Check res.ok BEFORE trying to parse the body as JSON.
      const body = await res.text();

      if (!res.ok) {
        throw new Error(
          `Failed to add the package (HTTP ${res.status}). ${body.startsWith("<") ? res.statusText : body}`,
        );
      }

      router.push("/upcomingEvent");
    } catch (err) {
      // Without this catch any failure silently skipped the redirect:
      // the throw became an unhandled rejection and router.push never ran.
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-10">

      <Card className="mx-auto mt-10 max-w-3xl gap-0 p-6 sm:p-10">
        <form onSubmit={handleCreateEventPage} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="event-title">Event title</Label>
            <Input
              id="event-title"
              name="title"
              placeholder="Name of event"
              className={fieldClassName}
            />
          </div>

          <div className={fieldRowClassName}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="event-location">Location</Label>
              <Input
                id="event-location"
                name="location"
                placeholder="Add location"
                className={fieldClassName}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="event-type">Type</Label>
              <Select name="type">
                <SelectTrigger
                  id="event-type"
                  className={`${fieldClassName} w-full`}
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="event-date">Event Date</Label>
            <Input
              id="event-date"
              name="date"
              type="date"
              className={fieldClassName}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="event-image">Image URL</Label>
            <Input
              id="event-image"
              name="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              className={fieldClassName}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="event-description">Description</Label>
            <Textarea
              id="event-description"
              name="description"
              placeholder="Describe the travel experience..."
              className="min-h-28 rounded-md bg-muted/50"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {error}
            </p>
          )}

          <div className="mt-3 flex flex-wrap justify-end gap-3">
            <Button
              nativeButton={false}
              size="lg"
              render={<Link href="/" />}
              className="cursor-pointer bg-pink-100 rounded-md border-destructive/40 text-destructive hover:bg-pink-200 hover:text-destructive"
            >
              <Trash2 data-icon="inline-start" />
              Cancel
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="cursor-pointer rounded-md bg-green-800 text-white hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save data-icon="inline-start" />
              {isSubmitting ? "Adding..." : "Add Travel Package"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
