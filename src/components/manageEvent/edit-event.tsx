
"use client";

import * as React from "react";
import {
  Save,
  Trash2,
  Edit,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { UpcomingEvent } from "@/lib/type";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const categories = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Free Treatment",
  "Charity",
  "Insect Killing",
  "Health Tips",
];

const fieldClassName = "h-9 rounded-md bg-muted/50";

type TEditEventProps = {
  event: UpcomingEvent;
};

const EditEvent = ({ event }: TEditEventProps) => {
  const router = useRouter();

  const [selectedType, setSelectedType] = React.useState(event.type);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleEditEvent = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);

      const editedData = {
        title: formData.get("title")?.toString().trim(),
        location: formData.get("location")?.toString().trim(),
        type: selectedType,
        date: formData.get("date")?.toString(),
        imageUrl: formData.get("imageUrl")?.toString().trim(),
        description: formData.get("description")?.toString().trim(),
      };

      const res = await fetch(
        `http://localhost:5000/editEvent/${event._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedData),
        }
      );

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.message || "Failed to update event");
      }

      router.push('/upcomingEvent');

    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button className="py-5">
            <Edit size={16} />
            Edit
          </Button>
        }
      />

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">

        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>

          <DialogDescription>
            Update your event information and save your changes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleEditEvent} className="space-y-4">

          {/* Event Title */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="event-title">
              Event Title
            </Label>

            <Input
              id="event-title"
              name="title"
              placeholder="Name of event"
              defaultValue={event.title}
              className={fieldClassName}
              required
            />
          </div>

          {/* Location and Type */}
          <div className="grid gap-3 md:grid-cols-2">

            <div className="flex flex-col gap-2">
              <Label htmlFor="event-location">
                Location
              </Label>

              <Input
                id="event-location"
                name="location"
                placeholder="Add location"
                defaultValue={event.location}
                className={fieldClassName}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="event-type">
                Event Type
              </Label>

              <Select
                value={selectedType}
                onValueChange={(value) => setSelectedType(value)}
              >
                <SelectTrigger
                  id="event-type"
                  className={`${fieldClassName} w-full`}
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

          </div>

          {/* Event Date */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="event-date">
              Event Date
            </Label>

            <Input
              id="event-date"
              name="date"
              type="date"
              defaultValue={
                new Date(event.date).toISOString().split("T")[0]
              }
              className={fieldClassName}
              required
            />
          </div>

          {/* Image URL */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="event-image">
              Image URL
            </Label>

            <Input
              id="event-image"
              name="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              defaultValue={event.imageUrl}
              className={fieldClassName}
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="event-description">
              Description
            </Label>

            <Textarea
              id="event-description"
              name="description"
              placeholder="Describe your event..."
              defaultValue={event.description}
              className="min-h-24 rounded-md bg-muted/50"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">

            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                >
                  <Trash2 size={16} />
                  Cancel
                </Button>
              }
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-800 text-white hover:bg-green-700"
            >
              <Save size={16} />

              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>

          </div>

        </form>

      </DialogContent>
    </Dialog>
  );
};

export default EditEvent;
