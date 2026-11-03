import Link from "next/link";
import { MapPinOff, ArrowLeft } from "lucide-react";

export default function EventNotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-green-50/40 px-4 py-10">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <MapPinOff size={36} className="text-green-700" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900">
          Event no longer available
        </h1>

        <p className="mt-3 text-gray-500">
          The event you are looking for may have been cancelled, edited by its
          organizer, or is not accessible right now.
        </p>

        <Link
          href="/upcomingEvent"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          <ArrowLeft size={16} />
          Back to Events
        </Link>
      </div>
    </main>
  );
}
