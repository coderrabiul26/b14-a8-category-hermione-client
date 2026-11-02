'use client'
import { HandHeart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useJoinEvent } from "@/components/joinedEvent/use-join-event";
import { UpcomingEvent } from "@/lib/type";

type TJoinEventButtonProps = {
  eventData: UpcomingEvent;
};

const JoinEventButton = ({ eventData }: TJoinEventButtonProps) => {
  const { joinEvent, isSubmitting, hasJoined } = useJoinEvent(eventData);

  return (
    <div>
      <Button
        onClick={joinEvent}
        disabled={isSubmitting || hasJoined}
        className="w-full bg-green-600 font-semibold text-white hover:bg-green-700"
      >
        <HandHeart className="mr-2" size={18} />
        {isSubmitting ? "Joining..." : hasJoined ? "Joined" : "Join This Event"}
      </Button>
    </div>
  );
};

export default JoinEventButton;
