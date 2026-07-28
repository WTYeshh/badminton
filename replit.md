# SmashAcademy — Premium Badminton Coaching Academy

## Project Overview

A modern, premium frontend for a Badminton Coaching Academy, built with:

- **React + Vite** (port 5000)
- **Tailwind CSS** — custom dark premium theme (`#0A0A0A` background, `#72F27C` accent green)
- **React Router v6** — full client-side routing
- **Framer Motion** — smooth page and section animations
- **Lucide React** — icons

## How to Run

```bash
npm install
npm run dev
```

The app runs at port 5000 (configured via workflow).

## Project Structure

```
src/
  components/
    ui/          # Reusable UI (Button, Card, Badge, Logo, SectionLabel)
    layout/      # Navbar, Footer, PageLayout
    sections/    # BookingDrawer (court booking slide-out)
  pages/
    Home.jsx
    Coaching.jsx
    Courts.jsx
    Gallery.jsx
    Contact.jsx
    Membership.jsx
    Tournament.jsx
    CourtAvailability.jsx
    admin/       # Full admin dashboard (Dashboard, Courts, Bookings, Members, Coaches, Announcements, Calendar, Settings)
  data/          # Mock data files (courts, bookings, members, coaches, announcements, programs)
  App.jsx        # React Router setup
  main.jsx
  index.css      # Tailwind base + custom utilities
```

## Routes

| Path | Page |
|------|------|
| `/` | Homepage |
| `/coaching` | Coaching Programs |
| `/courts` | Court Explorer + Booking |
| `/gallery` | Gallery |
| `/contact` | Contact |
| `/membership` | Membership Plans |
| `/tournament` | Tournaments |
| `/availability` | Court Availability Grid |
| `/admin` | Admin Dashboard |
| `/admin/courts` | Court Management |
| `/admin/bookings` | Booking Management |
| `/admin/members` | Members |
| `/admin/coaches` | Coaches |
| `/admin/announcements` | Announcements |
| `/admin/calendar` | Calendar |
| `/admin/settings` | Settings |

## Design System

- **Background:** `#0A0A0A`
- **Surface:** `#111111`
- **Cards:** `#181818`
- **Border:** `#2A2A2A`
- **Text:** `#F5F5F5`
- **Muted text:** `#9E9E9E`
- **Accent green:** `#72F27C`
- **Fonts:** Satoshi (headings), Inter (body), Space Grotesk (numbers)

## Backend Readiness

All data lives in `src/data/` as mock JS files. To connect to a backend (Supabase/Firebase), replace the data imports in each page/component with API calls — the component structure remains the same.

## User Preferences

- Keep code modular, clean, and beginner-friendly
- Use placeholder/mock data until backend is ready
- Prioritize quality and whitespace over quantity of features
