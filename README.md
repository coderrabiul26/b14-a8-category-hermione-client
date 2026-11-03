# 🤝 WeCare — Donate, Volunteer, Heal

**A community platform that connects volunteers with the events that need them most.**

[WeCare](https://b14-a8-category-hermione-client.vercel.app/) is a web application for organizing and joining community service events — donation runs, cleanup drives, free treatment camps, and more. Anyone can browse upcoming events for free, and registered volunteers can create, manage, and join events in just a few clicks.

## 🔗 Links

| | |
|---|---|
| 🌐 **Live Website** | <https://b14-a8-category-hermione-client.vercel.app/> |
| 💻 **GitHub Repository (Client)** | <https://github.com/coderrabiul26/b14-a8-category-hermione-client.git> |

## ✨ Features

- **Browse upcoming events** — Explore donation runs, cleanup drives, and free treatment camps, always sorted by date with past events automatically hidden.
- **Join an event in one click** — Registered volunteers can join any event; duplicate joins are detected (409-aware) and confirmed with friendly toast notifications.
- **Create, edit & delete your own events** — A dedicated dashboard lets each user manage the events they've created, with update and delete actions per event.
- **Secure authentication** — Email/password sign-up and sign-in powered by Better Auth, with session-aware navbar (avatar dropdown, logout) and protected user pages.
- **My Joined Events** — A personal timeline of every event the user has joined, tracked with join date and event reference.
- **Dark / light theme toggle** — Theme preference is respected instantly across the whole app via `next-themes`.
- **Responsive design** — Fully optimized for mobile, tablet, and desktop with an animated collapsible mobile menu.
- **Engaging landing page** — Hero banner, feature highlights, recent upcoming events, community photo gallery, and a newsletter section.

## 🛠️ Technologies Used

- **Next.js 16** (App Router) + **React 19** with React Compiler
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** components (base-nova style, `@base-ui/react` primitives)
- **Better Auth** (with MongoDB adapter) for authentication
- **MongoDB** backend via a REST API
- **next-themes** for dark mode, **lucide-react** for icons

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm (or any Node package manager)
- A running instance of the [WeCare REST API](#) (backend)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/coderrabiul26/b14-a8-category-hermione-client.git
cd b14-a8-category-hermione-client

# 2. Install dependencies
npm install

# 3. Configure the API base URL
#    Create a .env.local file:
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local

# 4. Start the dev server
npm run dev
```

Open <http://localhost:3000> in your browser.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server (Turbopack) |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the backend REST API (events, joined events, auth token endpoint) |

---

**Project:** B14-A8-Category-Hermione — Client side
