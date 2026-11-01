export interface UpcomingEvent {
  _id: string;
  title: string;
  location: string;
  type: string;
  /** ISO date string, e.g. "2026-11-08" */
  date: Date|string;
  imageUrl: string;
  description: string;
  eventCreated: string;
  userEmail: string;
}