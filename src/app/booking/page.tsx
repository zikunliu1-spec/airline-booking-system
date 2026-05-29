"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { flightSchedules } from "@/services/flightData";

function BookingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const flightNumber =
    searchParams.get("flightNumber") || searchParams.get("flight");

  const selectedFlight = useMemo(() => {
    return flightSchedules.find(
      (flight) => flight.flightNumber === flightNumber
    );
  }, [flightNumber]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmedCount, setConfirmedCount] = useState(0);

  const bookingReference = useMemo(() => {
    return `DF${Math.floor(100000 + Math.random() * 900000)}`;
  }, []);

  useEffect(() => {
    async function loadBookings() {
      if (!selectedFlight) return;

      try {
        const response = await fetch(
          `/api/bookings?flightNumber=${selectedFlight.flightNumber}`
        );
        const data = await response.json();

        if (data.success) {
          setConfirmedCount(data.bookings.length);
        }
      } catch (error) {
        console.error("Failed to load bookings", error);
      }
    }

    loadBookings();
  }, [selectedFlight]);

  if (!selectedFlight) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f8fc]">
        <div className="rounded-3xl bg-white p-10 text-center shadow-xl">
          <h1 className="text-3xl font-bold text-red-500">
            Flight Not Found
          </h1>

          <p className="mt-4 text-slate-600">
            Please return to the search page and select a scheduled flight.
          </p>

          <button
            onClick={() => router.push("/search")}
            className="mt-6 rounded-2xl bg-sky-600 px-8 py-4 font-bold text-white transition hover:bg-sky-500"
          >
            Back to Search
          </button>
        </div>
      </main>
    );
  }

  const currentAvailableSeats = selectedFlight.capacity - confirmedCount;
  const isFull = currentAvailableSeats <= 0;

  async function handleBooking() {
    if (!selectedFlight) {
      alert("Flight not found.");
      return;
    }

    if (isFull) {
      alert("This flight is fully booked.");
      return;
    }

    if (!firstName || !lastName || !email || !passportNumber) {
      alert("Please complete all passenger details.");
      return;
    }

    setLoading(true);

    try {
      const booking = {
        bookingReference,
        flightNumber: selectedFlight.flightNumber,
        firstName,
        lastName,
        email,
        passportNumber,
        status: "Confirmed",
        price: selectedFlight.price,
        origin: selectedFlight.origin,
        destination: selectedFlight.destination,
        departureDate: selectedFlight.departureDate,
        departureTime: selectedFlight.departureTime,
        arrivalDate: selectedFlight.arrivalDate,
        arrivalTime: selectedFlight.arrivalTime,
        aircraft: selectedFlight.aircraft,
      };

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Booking failed.");
        setLoading(false);
        return;
      }

      router.push(
        `/invoice?bookingReference=${bookingReference}&flightNumber=${selectedFlight.flightNumber}&firstName=${firstName}&lastName=${lastName}&email=${email}&passportNumber=${passportNumber}`
      );
    } catch (error) {
      console.error(error);
      alert("Failed to create booking.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#f4f8fc] text-slate-950">
      <section className="bg-gradient-to-r from-sky-700 via-cyan-600 to-blue-500 px-8 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-200">
            Flight Booking
          </p>

          <h1 className="mt-4 text-5xl font-extrabold">
            Complete your passenger booking.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-sky-100">
            Review your selected flight, enter passenger details and receive a
            unique booking reference.
          </p>
        </div>
      </section>

      <section className="-mt-10 px-8 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-3xl bg-white p-8 shadow-2xl">
              <p className="text-sm font-bold uppercase tracking-wide text-sky-700">
                Selected Flight
              </p>

              <h2 className="mt-3 text-4xl font-extrabold text-slate-900">
                {selectedFlight.flightNumber}
              </h2>

              <p className="mt-2 text-2xl font-semibold text-slate-700">
                {selectedFlight.origin} → {selectedFlight.destination}
              </p>

              <div className="mt-8 space-y-5">
                <div className="rounded-2xl bg-slate-100 p-5">
                  <p className="text-sm font-semibold text-slate-500">
                    Departure
                  </p>
                  <p className="mt-2 text-lg font-bold text-slate-900">
                    {selectedFlight.departureDate}
                  </p>
                  <p className="text-slate-700">
                    {selectedFlight.departureTime} ·{" "}
                    {selectedFlight.departureTimezone}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-100 p-5">
                  <p className="text-sm font-semibold text-slate-500">
                    Arrival
                  </p>
                  <p className="mt-2 text-lg font-bold text-slate-900">
                    {selectedFlight.arrivalDate}
                  </p>
                  <p className="text-slate-700">
                    {selectedFlight.arrivalTime} ·{" "}
                    {selectedFlight.arrivalTimezone}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="rounded-2xl bg-slate-100 p-5">
                    <p className="text-sm font-semibold text-slate-500">
                      Aircraft
                    </p>
                    <p className="mt-2 font-bold text-slate-900">
                      {selectedFlight.aircraft}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-100 p-5">
                    <p className="text-sm font-semibold text-slate-500">
                      Seats
                    </p>
                    <p
                      className={
                        isFull
                          ? "mt-2 font-bold text-red-600"
                          : "mt-2 font-bold text-slate-900"
                      }
                    >
                      {isFull
                        ? "Flight is full"
                        : `${currentAvailableSeats} / ${selectedFlight.capacity}`}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-sky-50 p-5">
                  <p className="text-sm font-semibold text-sky-700">
                    Total Fare
                  </p>
                  <p className="mt-2 text-3xl font-extrabold text-sky-800">
                    ${selectedFlight.price} NZD
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-2xl">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-sky-700">
                    Passenger Details
                  </p>

                  <h2 className="mt-3 text-3xl font-extrabold text-slate-900">
                    Traveller information
                  </h2>

                  <p className="mt-2 text-slate-600">
                    These details will be attached to the booking reference.
                  </p>
                </div>

                <div className="rounded-2xl bg-amber-100 px-5 py-4 text-right">
                  <p className="text-sm font-semibold text-amber-700">
                    Reference
                  </p>
                  <p className="text-xl font-extrabold text-amber-800">
                    {bookingReference}
                  </p>
                </div>
              </div>

              {isFull && (
                <div className="mt-8 rounded-2xl bg-red-50 p-5 text-red-700">
                  <p className="font-bold">This flight is fully booked.</p>
                  <p className="mt-1 text-sm">
                    Please return to the search page and choose another
                    scheduled flight.
                  </p>
                </div>
              )}

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-semibold text-slate-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    disabled={isFull || loading}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none disabled:bg-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-slate-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    disabled={isFull || loading}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none disabled:bg-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-slate-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    disabled={isFull || loading}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none disabled:bg-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-slate-700">
                    Passport Number
                  </label>
                  <input
                    type="text"
                    value={passportNumber}
                    disabled={isFull || loading}
                    onChange={(e) => setPassportNumber(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none disabled:bg-slate-100"
                  />
                </div>
              </div>

              <button
                onClick={handleBooking}
                disabled={loading || isFull}
                className={
                  isFull
                    ? "mt-8 rounded-2xl bg-slate-400 px-10 py-4 text-lg font-bold text-white"
                    : "mt-8 rounded-2xl bg-sky-600 px-10 py-4 text-lg font-bold text-white transition hover:bg-sky-500 disabled:bg-slate-400"
                }
              >
                {loading
                  ? "Processing Booking..."
                  : isFull
                  ? "Flight Full"
                  : "Confirm Booking"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#f4f8fc] text-slate-900">
          <div className="rounded-3xl bg-white p-10 text-2xl font-bold shadow-xl">
            Loading booking page...
          </div>
        </main>
      }
    >
      <BookingPageContent />
    </Suspense>
  );
}