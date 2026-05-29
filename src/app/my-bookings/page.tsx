"use client";

import { useState } from "react";

type StoredBooking = {
  _id?: string;
  bookingReference: string;
  flightNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  passportNumber: string;
  status: string;
  price: number;
  origin: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  aircraft: string;
};

export default function MyBookingsPage() {
  const [email, setEmail] = useState("");
  const [bookingReference, setBookingReference] = useState("");
  const [results, setResults] = useState<StoredBooking[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!email.trim() && !bookingReference.trim()) {
      alert("Please enter an email address or booking reference.");
      return;
    }

    setLoading(true);
    setHasSearched(true);
    setResults([]);

    try {
      const params = new URLSearchParams();

      if (email.trim()) {
        params.append("email", email.trim());
      }

      if (bookingReference.trim()) {
        params.append("bookingReference", bookingReference.trim());
      }

      const response = await fetch(`/api/bookings?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setResults(data.bookings);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error(error);
      setResults([]);
      alert("Failed to fetch bookings from MongoDB.");
    }

    setLoading(false);
  }

  function clearSearch() {
    setEmail("");
    setBookingReference("");
    setResults([]);
    setHasSearched(false);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#f4f8fc] text-slate-950">
      <section className="bg-gradient-to-r from-sky-700 via-cyan-600 to-blue-500 px-8 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-200">
            My Bookings
          </p>

          <h1 className="mt-4 text-5xl font-extrabold">
            Find your flight reservations.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-sky-100">
            Search by email address or booking reference to view your MongoDB
            booking records.
          </p>
        </div>
      </section>

      <section className="-mt-10 px-8 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl bg-white p-8 shadow-2xl">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-semibold text-slate-700">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-slate-700">
                  Booking Reference
                </label>

                <input
                  type="text"
                  value={bookingReference}
                  onChange={(e) => setBookingReference(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={handleSearch}
                disabled={loading}
                className="rounded-2xl bg-sky-600 px-8 py-4 font-bold text-white transition hover:bg-sky-500 disabled:bg-slate-400"
              >
                {loading ? "Searching..." : "Find My Bookings"}
              </button>

              <button
                onClick={clearSearch}
                className="rounded-2xl border border-slate-300 bg-white px-8 py-4 font-bold text-slate-700 transition hover:bg-slate-100"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {!hasSearched && (
              <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
                <h2 className="text-3xl font-bold text-slate-800">
                  Search your bookings
                </h2>

                <p className="mt-4 text-slate-500">
                  Enter your email address or booking reference to display your
                  flight reservations.
                </p>
              </div>
            )}

            {hasSearched && !loading && results.length === 0 && (
              <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
                <h2 className="text-3xl font-bold text-slate-800">
                  No bookings found
                </h2>

                <p className="mt-4 text-slate-500">
                  Please check your email address or booking reference.
                </p>
              </div>
            )}

            {results.map((booking) => (
              <div
                key={booking._id || booking.bookingReference}
                className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-2xl"
              >
                <div className="mb-10 flex flex-col justify-between gap-8 md:flex-row">
                  <div>
                    <p className="text-lg font-bold uppercase tracking-wide text-sky-700">
                      Booking Reference
                    </p>

                    <h2 className="mt-4 text-4xl font-extrabold text-slate-950">
                      {booking.bookingReference}
                    </h2>

                    <p className="mt-5 text-2xl font-bold text-slate-700">
                      {booking.origin} → {booking.destination}
                    </p>
                  </div>

                  <div className="flex flex-col items-start md:items-center">
                    <div
                      className={
                        booking.status === "Cancelled"
                          ? "flex min-w-[220px] items-center justify-center rounded-full bg-red-100 px-8 py-4 text-xl font-extrabold text-red-700"
                          : "flex min-w-[220px] items-center justify-center rounded-full bg-green-100 px-8 py-4 text-xl font-extrabold text-green-700"
                      }
                    >
                      {booking.status}
                    </div>

                    <p className="mt-6 text-3xl font-extrabold text-sky-700">
                      ${booking.price} NZD
                    </p>
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  <div className="rounded-3xl bg-slate-100 p-8">
                    <p className="text-lg font-bold text-sky-700">Passenger</p>

                    <p className="mt-4 text-2xl font-extrabold text-slate-950">
                      {booking.firstName} {booking.lastName}
                    </p>

                    <p className="mt-3 text-lg text-slate-700">
                      {booking.email}
                    </p>

                    <p className="mt-2 text-lg text-slate-700">
                      Passport: {booking.passportNumber}
                    </p>
                  </div>

                  <div className="rounded-3xl bg-slate-100 p-8">
                    <p className="text-lg font-bold text-sky-700">Flight</p>

                    <p className="mt-4 text-2xl font-extrabold text-slate-950">
                      {booking.flightNumber}
                    </p>

                    <p className="mt-3 text-lg text-slate-700">
                      Aircraft: {booking.aircraft}
                    </p>
                  </div>

                  <div className="rounded-3xl bg-slate-100 p-8">
                    <p className="text-lg font-bold text-sky-700">Departure</p>

                    <p className="mt-4 text-2xl font-extrabold text-slate-950">
                      {booking.departureDate}
                    </p>

                    <p className="mt-3 text-lg text-slate-700">
                      {booking.departureTime}
                    </p>
                  </div>

                  <div className="rounded-3xl bg-slate-100 p-8">
                    <p className="text-lg font-bold text-sky-700">Arrival</p>

                    <p className="mt-4 text-2xl font-extrabold text-slate-950">
                      {booking.arrivalDate}
                    </p>

                    <p className="mt-3 text-lg text-slate-700">
                      {booking.arrivalTime}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}