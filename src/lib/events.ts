/**
 * Upcoming events data layer.
 *
 * This project is not connected to MongoDB yet. This file is the single place
 * where data fetching happens, so when the database is available the homepage
 * and events page switch to real data by replacing the body of the functions
 * below — the UI stays untouched, with only the return values changing.
 */

export type EventCategory =
  | "donation"
  | "clothes"
  | "cleanup"
  | "treatment"
  | "awareness";

export interface UpcomingEvent {
  id: string;
  title: string;
  category: EventCategory;
  /** ISO date string, e.g. "2026-11-08" */
  date: string;
  location: string;
  participants: number;
  /** Optional image URL — cards fall back to a themed placeholder. */
  image?: string;
}

// TODO(MongoDB): replace this sample data with a real connection.
// The target query will look something like:
//   db.collection("events")
//     .find({ date: { $gte: new Date() } })
//     .sort({ date: 1 })
//     .limit(6)
const EVENTS: UpcomingEvent[] = [
  {
    id: "e-01",
    title: "Winter Blanket & Warm Cloth Drive",
    category: "clothes",
    date: "2026-11-08",
    location: "Mirpur, Dhaka",
    participants: 42,
  },
  {
    id: "e-02",
    title: "Free Health Check-up Camp",
    category: "treatment",
    date: "2026-11-12",
    location: "Savar Community Center",
    participants: 60,
  },
  {
    id: "e-03",
    title: "Riverside Cleanup Weekend",
    category: "cleanup",
    date: "2026-11-15",
    location: "Turag River Bank, Gazipur",
    participants: 88,
  },
  {
    id: "e-04",
    title: "Food & Essential Donation Run",
  category: "donation",
    date: "2026-11-20",
    location: "Keraniganj, Dhaka",
    participants: 35,
  },
  {
    id: "e-05",
    title: "Plantation & Climate Awareness Rally",
    category: "awareness",
    date: "2026-12-02",
    location: "National Botanical Garden",
    participants: 120,
  },
  {
    id: "e-06",
    title: "Volunteer Blood Donation Fest",
    category: "treatment",
    date: "2026-12-06",
    location: "TSC, University of Dhaka",
    participants: 75,
  },
];

/** 6 most recent upcoming events — ready for MongoDB's `.limit(6)` later. */
export async function getUpcomingEvents(): Promise<UpcomingEvent[]> {
  return EVENTS;
}
