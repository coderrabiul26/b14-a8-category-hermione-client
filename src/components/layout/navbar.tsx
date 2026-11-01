"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CalendarDays,
  CalendarPlus,
  ChevronDown,
  ClipboardList,
  LogIn,
  LogOut,
  Menu,
  Sprout,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuGroup,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export const SITE_NAME = "HelpingHands";

const NAV_LINKS = [{ label: "Upcoming Events", icon: CalendarDays, href: "/upcomingEvent" }];

const USER_LINKS = [
  { label: "Create Event", icon: CalendarPlus, href: "/createEvent" },
  { label: "Manage Events", icon: ClipboardList, href: "/manageEvent" },
  { label: "Joined Events", icon: Users, href: "/joinedEvent" },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    const { error } = await authClient.signOut();
    if (error) {
      toast.add({
        title: "Logout failed",
        description: error.message ?? "Something went wrong. Please try again.",
        type: "error",
        timeout: 3000,
      });
      return;
    }
    toast.add({
      title: "Logged out",
      description: "You have been signed out successfully.",
      type: "success",
      timeout: 3000,
    });
    router.push("/signin");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur-md">
      {/* centered layout: logo left, events center, login right */}
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Left — brand */}
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground transition-colors group-hover:bg-primary/90">
            <Sprout className="size-5" />
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            We<span className="text-primary">Care</span>
          </span>
        </Link>

        {/* Center — upcoming events (desktop) */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 md:block">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <link.icon className="size-4 text-primary" />
              {link.label}
              <span className="relative size-1.5 rounded-full bg-primary">
                <span className="absolute inset-0 animate-ping rounded-full bg-primary/60" />
              </span>
            </Link>
          ))}
        </nav>

        {/* Right — login / user avatar (desktop) */}
        <div className="flex items-center gap-2">
          {isPending ? null : user ? (
            <div className="flex items-center gap-1">
              <UserAvatarMenu user={user} />
              <Button
                variant="destructive"
                aria-label="Logout"
                title="Logout"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-foreground"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link href={'/signin'}><Button size="lg" className="hidden px-5 md:inline-flex">
              <LogIn data-icon="inline-start" />
              Login
            </Button></Link>
          )}

          {/* Mobile controls */}
          <Button
            variant="outline"
            size="icon"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows] duration-200 md:hidden",
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <nav className="flex flex-col items-stretch gap-2 border-t bg-background px-4 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <link.icon className="size-4 text-primary" />
                {link.label}
              </Link>
            ))}
            {isPending ? null : user ? (
              <div className="mt-1 flex items-center gap-1">
                <UserAvatarMenu user={user} />
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Logout"
                  onClick={handleLogout}
                >
                  <LogOut className="size-5" />
                </Button>
              </div>
            ) : (
              <Link href={'/signin'}><Button size="lg" className="mt-1">
                <LogIn data-icon="inline-start" />
                Login
              </Button></Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

function UserAvatarMenu({
  user,
}: {
  user: { name?: string | null; email?: string | null; image?: string | null };
}) {
  return (
    <DropdownMenu>
      <Tooltip>
        {/* rendered as a span — the menu trigger button handles click */}
        <TooltipTrigger
          render={<span className="inline-flex rounded-full focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none" />}
        >
          <DropdownMenuTrigger
            aria-label="Open user menu"
            className="flex items-center gap-1 rounded-full py-0.5 transition-opacity hover:opacity-90 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <Avatar size="lg">
              {user.image ? (
                <AvatarImage src={user.image} alt={user.name ?? "Profile picture"} />
              ) : null}
              <AvatarFallback>{user.name ? getInitials(user.name) : "?"}</AvatarFallback>
            </Avatar>
            <ChevronDown
              aria-hidden="true"
              className="size-4 text-muted-foreground"
            />
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom">{user.name}</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="truncate text-sm font-semibold text-foreground">
                {user.name}
              </span>
              <span className="truncate text-xs font-normal text-muted-foreground">
                {user.email}
              </span>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {USER_LINKS.map((link) => (
          <DropdownMenuItem key={link.href} render={<Link href={link.href} />}>
            <link.icon />
            {link.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
