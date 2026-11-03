'use client'
import * as React from "react";
import { redirect } from "next/navigation";

import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";
import { UpcomingEvent } from "@/lib/type";

const API_ERROR =
  "Could not join this event. Please try again.";

export function useJoinEvent(eventData: UpcomingEvent) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [hasJoined, setHasJoined] = React.useState(false);

  const joinEvent = async () => {
    if (!user) {
      toast.add({
        title: "Login required",
        description: "Please login to join this event",
        type: "warning",
        timeout: 3000,
      });
      redirect("/signin");
      return;
    }

    if (isSubmitting || hasJoined) return;

    setIsSubmitting(true);
    let alreadyJoined = false;
    let joinSuccess = false;

    try {
      const { _id, ...eventFields } = eventData;

      const joinedData = {
        ...eventFields,
        eventId: _id,
        userName: user.name,
        userEmail: user.email,
        joinedDate: new Date(),
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/joinedEvent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(joinedData),
      });

      if (res.status === 409) {
        alreadyJoined = true;
      } else if (!res.ok) {
        throw new Error("Failed to join event");
      } else {
        joinSuccess = true;
      }
    } catch (err) {
      console.error(err);

      toast.add({
        title: "Something went wrong",
        description: err instanceof Error ? err.message : API_ERROR,
        type: "error",
        timeout: 3000,
      });
      return;
    } finally {
      setIsSubmitting(false);
    }

    setHasJoined(true);

    if (alreadyJoined) {
      toast.add({
        title: "Already joined",
        description: "You have already joined this event",
        type: "info",
        timeout: 3000,
      });
      return;
    }

    if (joinSuccess) {
      toast.add({
        title: "Event joining successful!",
        description: "You successfully joined the event",
        type: "success",
        timeout: 3000,
      });

      redirect("/upcomingEvent");
    }
  };

  return { joinEvent, isSubmitting, hasJoined };
}
