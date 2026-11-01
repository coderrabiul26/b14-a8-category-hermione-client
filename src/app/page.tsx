import { Banner } from "@/components/home/banner";
import { Features } from "@/components/home/features";
import { Gallery } from "@/components/home/gallery";
import { Newsletter } from "@/components/home/newsletter";
import RecentUpcomingEvent from "@/components/home/recent-upcoming-event";

export default function Home() {
  return (
    <>
      <Banner />
      <Features />
      <RecentUpcomingEvent></RecentUpcomingEvent>
      <Gallery />
      <Newsletter />
    </>
  );
}
