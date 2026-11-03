"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function EventDetailsError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-green-50/40 px-4 py-10">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle size={36} className="text-red-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900">
          Something went wrong
        </h1>

        <p className="mt-3 text-gray-500">
          We could not load the event details. This might be a temporary
          problem with the connection.
        </p>

        <button
          onClick={() => retry()}
          className="mt-6 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
