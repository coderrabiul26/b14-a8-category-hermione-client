import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinkGroups = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Upcoming Events", href: "/upcomingEvent" },
      { label: "Joined Events", href: "/joinedEvent" }
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
];

const contactLinks = [
  { label: "786 901 1622"},
  { label: "info@wecare.com", href: "mailto:info@wecare.com" },
];

const socialLinks = [
  {
    label: "X (Twitter)",
    href: "https://x.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
      </svg>
    ),
  },
];

const linkClassName =
  "text-sm text-neutral-200 transition-colors outline-none hover:text-brand focus-visible:text-white";

const groupHeadingClassName =
  "text-sm font-medium tracking-wide text-neutral-400 uppercase";

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-white mt-10">
      <div className="mx-auto w-full max-w-6xl px-4 pt-16 pb-8 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <span className="block font-heading text-6xl sm:text-7xl">
            WeCare
          </span>
        </Link>
        <p className="mt-3 text-sm text-neutral-400">
          You are the correct person to join here for social development works for charity. A big platform for the kind persons who wants to help people.
        </p>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <h3 className={groupHeadingClassName}>Newsletter</h3>
            <p className="mt-2 text-xs text-neutral-400">
              Subscribe for exclusive social events and inspiration.
            </p>
            <form
              className="relative mt-4 max-w-64"
              action={subscribeNewsletter}
            >
              <Input
                type="email"
                name="email"
                placeholder="Enter email"
                required
                aria-label="Email address"
                className="h-10 rounded-md border-0 bg-white/10 pr-10 text-sm text-white placeholder:text-neutral-400 focus-visible:bg-white/10 dark:bg-white/10"
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                aria-label="Subscribe"
                className="absolute top-0 right-0 size-10 cursor-pointer rounded-md text-white hover:bg-white/10 hover:text-white"
              >
                <ArrowUpRight />
              </Button>
            </form>
          </div>

          {footerLinkGroups.map((group) => (
            <div key={group.title}>
              <h3 className={groupHeadingClassName}>{group.title}</h3>
              <ul className="mt-4 space-y-3.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={linkClassName}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className={groupHeadingClassName}>Contact Us</h3>
            <ul className="mt-4 space-y-3.5">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkClassName}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="text-xs text-neutral-400">
            © 2026 WeCare. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-neutral-300 transition-colors outline-none hover:text-white focus-visible:text-white [&_svg]:fill-current [&_svg]:size-4"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

async function subscribeNewsletter(formData: FormData) {
  "use server";
  // TODO: subscribe the email via the mailing provider.
  void formData;
}
