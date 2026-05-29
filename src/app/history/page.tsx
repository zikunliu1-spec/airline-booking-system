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
  createdAt?: string;
};

export default function HistoryPage() {
  const [email, setEmail] = useState("");
  const [results, setResults] = useState<StoredBooking[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSearch() {
    if (!email.trim()) {
      alert("Please enter a passenger email address.");
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch(
        `/api/bookings?email=${encodeURIComponent(email.trim())}`
      );

      const data = await response.json();

      if (data.success) {
        setResults(data.bookings);
      } else {
        setResults([]);
        alert("Failed to fetch booking history.");
      }
    } catch (error) {
      console.error(error);
      setResults([]);
      alert("Failed to connect to the booking database.");
    } finally {
      setIsLoading(false);
    }
  }

  function clearSearch() {
    setEmail("");
    setResults([]);
    setHasSearched(false);
    setIsLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#f4f8fc] text-slate-950">
      <section className="bg-gradient-to-r from-sky-700 via-cyan-600 to-blue-500 px-8 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-200">
            Booking History
          </p>

          <h1 className="mt-4 text-5xl font-extrabold">
            Search passenger booking history.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-sky-100">
            Enter a passenger email address to fetch all bookings stored in
            MongoDB Atlas.
          </p>
        </div>
      </section>

      <section className="-mt-10 px-8 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl bg-white p-8 shadow-2xl">
            <label className="mb-2 block font-semibold text-slate-700">
              Passenger Email Address
            </label>

            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter passenger email address"
              className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none"
            />

            <div className="mt-8 flex gap-4">
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="rounded-2xl bg-sky-600 px-8 py-4 font-bold text-white transition hover:bg-sky-500 disabled:bg-slate-400"
              >
                {isLoading ? "Searching..." : "Search History"}
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
                  Search booking history
                </h2>

                <p className="mt-4 text-slate-500">
                  Enter an email address to display all bookings for that
                  passenger.
                </p>
              </div>
            )}

            {hasSearched && !isLoading && results.length === 0 && (
              <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
                <h2 className="text-3xl font-bold text-slate-800">
                  No booking history found
                </h2>

                <p className="mt-4 text-slate-500">
                  No MongoDB booking records are linked to this email address.
                </p>
              </div>
            )}

            {results.map((booking) => (
              <div
                key={booking._id || booking.bookingReference}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg"
              >
                <div className="flex flex-col justify-between gap-6 md:flex-row">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-sky-700">
                      {booking.bookingReference}
                    </p>

                    <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
                      {booking.origin} → {booking.destination}
                    </h2>

                    <p className="mt-2 text-slate-600">
                      {booking.flightNumber} · {booking.aircraft}
                    </p>
                  </div>

                  <div className="text-left md:text-right">
                    <p
                      className={
                        booking.status === "Cancelled"
                          ? "inline-flex rounded-full bg-red-100 px-5 py-2 font-bold text-red-700"
                          : "inline-flex rounded-full bg-green-100 px-5 py-2 font-bold text-green-700"
                      }
                    >
                      {booking.status}
                    </p>

                    <p className="mt-4 text-3xl font-extrabold text-sky-700">
                      ${booking.price} NZD
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-4">
                  <div className="rounded-2xl bg-slate-100 p-5">
                    <p className="text-sm font-semibold text-slate-500">
                      Passenger
                    </p>

                    <p className="mt-2 font-bold text-slate-900">
                      {booking.firstName} {booking.lastName}
                    </p>

                    <p className="mt-1 text-sm text-slate-700">
                      {booking.email}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-100 p-5">
                    <p className="text-sm font-semibold text-slate-500">
                      Passport
                    </p>

                    <p className="mt-2 font-bold text-slate-900">
                      {booking.passportNumber}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-100 p-5">
                    <p className="text-sm font-semibold text-slate-500">
                      Departure
                    </p>

                    <p className="mt-2 font-bold text-slate-900">
                      {booking.departureDate}
                    </p>

                    <p className="mt-1 text-sm text-slate-700">
                      {booking.departureTime}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-100 p-5">
                    <p className="text-sm font-semibold text-slate-500">
                      Arrival
                    </p>

                    <p className="mt-2 font-bold text-slate-900">
                      {booking.arrivalDate}
                    </p>

                    <p className="mt-1 text-sm text-slate-700">
                      {booking.arrivalTime}
                    </p>
                  </div>
                </div>

                {booking.createdAt && (
                  <p className="mt-6 text-sm text-slate-500">
                    Created at: {new Date(booking.createdAt).toLocaleString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}