import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-slate-900">
          Dairy Flat Airline
        </Link>

        <div className="flex gap-6 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <Link href="/search" className="hover:text-slate-900">
            Search Flights
          </Link>
          <Link href="/my-bookings" className="hover:text-slate-900">
            My Bookings
          </Link>
          <Link href="/cancel" className="hover:text-slate-900">
            Cancel Booking
          </Link>
        </div>
      </nav>
    </header>
  );
}