"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/search", label: "Search Flights" },
    { href: "/my-bookings", label: "My Bookings" },
    { href: "/history", label: "History" },
    { href: "/cancel", label: "Cancel Booking" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight text-sky-700"
        >
          Dairy Flat Airline
        </Link>

        <div className="flex items-center gap-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive
                    ? "rounded-full bg-sky-600 px-5 py-2 text-sm font-bold text-white shadow"
                    : "rounded-full px-5 py-2 text-sm font-semibold text-slate-600 transition hover:bg-sky-50 hover:text-sky-700"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}