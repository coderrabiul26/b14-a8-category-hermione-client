import { UpcomingEvent } from "./type";

/**
 * Today's date as a local "YYYY-MM-DD" key. The en-CA locale formats
 * dates in ISO style, so plain string comparisons work correctly.
 */
export const getTodayKey = () => new Date().toLocaleDateString("en-CA");

/** Normalizes an event's date (string or Date) to its "YYYY-MM-DD" key. */
export const getEventDateKey = (event: UpcomingEvent) => {
  const value = event.date;
  if (typeof value === "string") return value.slice(0, 10);
  return value.toISOString().slice(0, 10);
};

/** True when the event is dated today or in the future. */
export const isUpcoming = (event: UpcomingEvent) =>
  getEventDateKey(event) >= getTodayKey();

/** Hides past-date events from the given list. */
export const filterUpcomingEvents = (events: UpcomingEvent[]) =>
  events.filter(isUpcoming);
