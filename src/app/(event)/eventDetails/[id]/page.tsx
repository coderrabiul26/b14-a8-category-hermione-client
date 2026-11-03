import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  MapPin,
  HeartPulse,
  Users,
  Clock,
  ShieldCheck,
  Mail,
  ArrowLeft,
  CheckCircle2,
  HandHeart,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import JoinEventButton from "@/components/joinedEvent/join-event-button";

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/eventDetails/${id}`
  );

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error("Failed to fetch event details");
  }

  const eventData = await res.json();


  return (
    <main className="min-h-screen bg-green-50/40 py-10">
      <div className="mx-auto max-w-6xl px-4">

        {/* Back Button */}
        <Link
          href="/upcomingEvent"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-900"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>

        {/* Event Banner */}
        <div className="relative h-[280px] overflow-hidden rounded-2xl sm:h-[400px]">
          <Image
            src={eventData.imageUrl}
            alt={eventData.title}
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 p-6 sm:p-10">
            <Badge className="mb-4 border-0 bg-green-600 text-white hover:bg-green-700">
              {eventData.type}
            </Badge>

            <h1 className="max-w-3xl text-3xl font-bold text-white sm:text-5xl">
              {eventData.title}
            </h1>

            <p className="mt-3 flex items-center gap-2 text-sm text-white/90 sm:text-base">
              <MapPin size={18} />
              {eventData.location}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8 grid gap-8 lg:grid-cols-3">

          {/* Left Content */}
          <div className="space-y-8 lg:col-span-2">

            {/* Event Overview */}
            <Card className="border-green-100 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <HeartPulse className="text-green-600" />
                  About This Event
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="leading-8 text-gray-600">
                  {eventData.description}
                </p>
              </CardContent>
            </Card>

            {/* Volunteer Guidelines */}
            <Card className="border-green-100 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <ShieldCheck className="text-green-600" />
                  Volunteer Guidelines
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {[
                    "Arrive at the event location on time.",
                    "Treat every patient and participant with kindness and respect.",
                    "Follow the instructions of the event coordinators.",
                    "Maintain hygiene and cleanliness throughout the campaign.",
                    "Respect patient privacy and keep personal information confidential.",
                    "Work cooperatively with other volunteers and medical professionals.",
                  ].map((guideline, index) => (
                    <div key={index} className="flex gap-3">
                      <CheckCircle2
                        size={20}
                        className="mt-0.5 shrink-0 text-green-600"
                      />
                      <p className="text-sm leading-6 text-gray-600">
                        {guideline}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Organizer Information */}
            <Card className="border-green-100 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Users className="text-green-600" />
                  Event Organizer
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                    <HandHeart size={28} className="text-green-700" />
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900">
                      Organized by
                    </p>
                    <p className="break-all text-sm text-gray-500">
                      {eventData.userEmail}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">

            {/* Event Information */}
            <Card className="border-green-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">
                  Event Information
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">

                <div className="flex gap-3">
                  <CalendarDays className="shrink-0 text-green-600" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Event Date
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(eventData.date).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <MapPin className="shrink-0 text-green-600" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Location
                    </p>
                    <p className="text-sm text-gray-500">
                      {eventData.location}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Clock className="shrink-0 text-green-600" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Event Type
                    </p>
                    <p className="text-sm text-gray-500">
                      {eventData.type}
                    </p>
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* Join Event */}
            <Card className="border-green-200 bg-green-50 shadow-sm">
              <CardContent className="pt-6">
                <div className="mb-4 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                    <HandHeart size={30} className="text-green-700" />
                  </div>

                  <h3 className="text-xl font-bold text-green-900">
                    Make a Difference!
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-green-800/80">
                    Join our volunteer team and help bring positive change to the community.
                  </p>
                </div>

                <JoinEventButton eventData={eventData}></JoinEventButton>

                <p className="mt-3 text-center text-xs text-green-700">
                  Your time and kindness can change lives.
                </p>
              </CardContent>
            </Card>

          </aside>
        </div>
      </div>
    </main>
  );
};

export default EventDetailsPage;
