"use client";

import { useState } from "react";

type Booking = {
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

export default function CancelBookingPage() {
  const [bookingReference, setBookingReference] = useState("");
  const [booking, setBooking] = useState<Booking | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function searchBooking() {
    if (!bookingReference.trim()) {
      setMessage("Please enter a booking reference.");
      return;
    }

    setLoading(true);
    setMessage("");
    setBooking(null);

    try {
      const response = await fetch(
        `/api/bookings?bookingReference=${bookingReference}`
      );

      const data = await response.json();

      if (data.success && data.bookings.length > 0) {
        setBooking(data.bookings[0]);
      } else {
        setMessage("Booking not found.");
      }
    } catch (error) {
      setMessage("Failed to fetch booking.");
    }

    setLoading(false);
  }

  async function cancelBooking() {
    if (!booking) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/bookings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingReference: booking.bookingReference,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setBooking(data.booking);
        setMessage("Booking cancelled successfully.");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Failed to cancel booking.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#f4f8fc] text-slate-950">
      <section className="bg-gradient-to-r from-sky-700 via-cyan-600 to-blue-500 px-8 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-200">
            Cancel Booking
          </p>

          <h1 className="mt-4 text-5xl font-extrabold">
            Manage cancellation requests.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-sky-100">
            Enter a booking reference to cancel an existing reservation stored
            in MongoDB Atlas.
          </p>
        </div>
      </section>

      <section className="-mt-10 px-8 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl bg-white p-8 shadow-2xl">
            <p className="text-sm font-bold uppercase tracking-wide text-sky-700">
              Find Booking
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-900">
              Enter your booking reference
            </h2>

            <div className="mt-8">
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

            <div className="mt-8 flex gap-4">
              <button
                onClick={searchBooking}
                disabled={loading}
                className="rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white transition hover:bg-blue-500"
              >
                {loading ? "Searching..." : "Search Booking"}
              </button>

              <button
                onClick={() => {
                  setBookingReference("");
                  setBooking(null);
                  setMessage("");
                }}
                className="rounded-2xl border border-slate-300 bg-white px-8 py-4 font-bold text-slate-700 transition hover:bg-slate-100"
              >
                Clear
              </button>
            </div>

            {message && (
              <div className="mt-6 rounded-2xl bg-blue-50 border border-blue-200 px-6 py-4 text-blue-700">
                {message}
              </div>
            )}
          </div>

          {booking && (
            <div className="mt-8 rounded-3xl bg-white p-8 shadow-2xl">
              <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-sky-700">
                    Booking Reference
                  </p>

                  <h3 className="mt-3 text-4xl font-extrabold text-slate-950">
                    {booking.bookingReference}
                  </h3>

                  <p className="mt-4 text-2xl font-bold text-slate-700">
                    {booking.origin} → {booking.destination}
                  </p>
                </div>

                <div className="flex flex-col items-start md:items-center">
                  <div
                    className={`flex min-w-[220px] items-center justify-center rounded-full px-8 py-4 text-xl font-extrabold ${
                      booking.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {booking.status}
                  </div>

                  <p className="mt-6 text-3xl font-extrabold text-sky-700">
                    ${booking.price} NZD
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl bg-slate-100 p-6">
                  <p className="text-lg font-bold text-sky-700">Passenger</p>

                  <p className="mt-4 text-2xl font-extrabold text-slate-950">
                    {booking.firstName} {booking.lastName}
                  </p>

                  <p className="mt-3 text-lg text-slate-700">
                    {booking.email}
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-100 p-6">
                  <p className="text-lg font-bold text-sky-700">Flight</p>

                  <p className="mt-4 text-2xl font-extrabold text-slate-950">
                    {booking.flightNumber}
                  </p>

                  <p className="mt-3 text-lg text-slate-700">
                    {booking.aircraft}
                  </p>
                </div>
              </div>

              {booking.status !== "Cancelled" && (
                <button
                  onClick={cancelBooking}
                  disabled={loading}
                  className="mt-8 rounded-2xl bg-red-600 px-8 py-4 font-bold text-white transition hover:bg-red-500"
                >
                  {loading ? "Cancelling..." : "Cancel Booking"}
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}