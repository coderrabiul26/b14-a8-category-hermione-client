
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
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

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

  const {data:session}=authClient.useSession()

  // Get today's date in local YYYY-MM-DD format
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleCreateEventPage = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Validate event date before sending to the server
    if (!data.date || String(data.date) < today) {
      setError("Please select today or a future date.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const createEventData = {
      ...data,
      eventCreated: new Date(),
      userEmail: session?.user.email
    };

    const token=await getTokenFromClient()

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/createEvent`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
          authorization: `Bearer ${token}`
         },
        body: JSON.stringify(createEventData),
      });

      if (!res.ok) {
        throw new Error("Failed to add event");
      }

      toast.add({
        title: "successful!",
        description: "Event has been created",
        type: "success",
        timeout: 3000,
      });

      router.push("/upcomingEvent");

    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
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
              required
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
                required
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
              min={today}
              className={fieldClassName}
              required
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
              required
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
