"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { flightSchedules } from "@/services/flightData";

export default function SearchPage() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [bookingCounts, setBookingCounts] = useState<Record<string, number>>(
    {}
  );

  useEffect(() => {
    async function loadBookingCounts() {
      const counts: Record<string, number> = {};

      for (const flight of flightSchedules) {
        try {
          const response = await fetch(
            `/api/bookings?flightNumber=${flight.flightNumber}`
          );

          const data = await response.json();

          counts[flight.flightNumber] = data.success
            ? data.bookings.length
            : 0;
        } catch {
          counts[flight.flightNumber] = 0;
        }
      }

      setBookingCounts(counts);
    }

    loadBookingCounts();
  }, []);

  const clearSearch = () => {
    setOrigin("");
    setDestination("");
    setStartDate("");
    setEndDate("");
    setHasSearched(false);
  };

  const filteredFlights = flightSchedules.filter((flight) => {
    return (
      flight.origin === origin &&
      flight.destination === destination &&
      flight.departureDate >= startDate &&
      flight.departureDate <= endDate
    );
  });

  return (
    <main className="min-h-screen bg-[#f4f8fc] text-slate-950">
      <section className="bg-gradient-to-r from-sky-700 via-cyan-600 to-blue-500 px-8 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-200">
            Flight Search
          </p>

          <h1 className="mt-4 text-5xl font-extrabold">
            Search scheduled flights.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-sky-100">
            Select a route and real calendar date range to find available Dairy
            Flat Airline services across regional destinations.
          </p>
        </div>
      </section>

      <section className="-mt-10 px-8">
        <div className="mx-auto max-w-6xl rounded-3xl bg-white p-8 shadow-2xl">
          <div className="grid gap-6 md:grid-cols-4">
            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                From
              </label>

              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none"
              >
                <option value="">Select origin</option>
                <option value="NZNE">Dairy Flat Airport (NZNE)</option>
                <option value="YSSY">Sydney Airport (YSSY)</option>
                <option value="NZRO">Rotorua Airport (NZRO)</option>
                <option value="NZGB">Claris Airport (NZGB)</option>
                <option value="NZCI">Tuuta Airport (NZCI)</option>
                <option value="NZTL">Lake Tekapo Airport (NZTL)</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                To
              </label>

              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none"
              >
                <option value="">Select destination</option>
                <option value="NZNE">Dairy Flat Airport (NZNE)</option>
                <option value="YSSY">Sydney Airport (YSSY)</option>
                <option value="NZRO">Rotorua Airport (NZRO)</option>
                <option value="NZGB">Claris Airport (NZGB)</option>
                <option value="NZCI">Tuuta Airport (NZCI)</option>
                <option value="NZTL">Lake Tekapo Airport (NZTL)</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                Start Date
              </label>

              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                End Date
              </label>

              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => setHasSearched(true)}
              className="rounded-2xl bg-sky-600 px-8 py-4 font-bold text-white transition hover:bg-sky-500"
            >
              Search Available Flights
            </button>

            <button
              onClick={clearSearch}
              className="rounded-2xl border border-slate-300 bg-white px-8 py-4 font-bold text-slate-700 transition hover:bg-slate-100"
            >
              Clear
            </button>
          </div>
        </div>
      </section>

      <section className="px-8 py-14">
        <div className="mx-auto max-w-6xl space-y-5">
          {hasSearched ? (
            filteredFlights.length > 0 ? (
              filteredFlights.map((flight) => {
                const confirmedCount = bookingCounts[flight.flightNumber] || 0;
                const currentAvailableSeats = flight.capacity - confirmedCount;
                const isFull = currentAvailableSeats <= 0;

                return (
                  <div
                    key={flight.flightNumber}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
                  >
                    <div className="grid items-center gap-5 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.7fr_auto]">
                      <div>
                        <p className="text-sm font-bold uppercase tracking-wide text-sky-700">
                          {flight.flightNumber}
                        </p>

                        <h2 className="mt-1 text-3xl font-extrabold text-slate-900">
                          {flight.origin} → {flight.destination}
                        </h2>

                        <p className="mt-3 text-base font-semibold text-slate-700">
                          {flight.aircraft}
                        </p>

                        <p
                          className={
                            isFull
                              ? "mt-1 text-sm font-semibold text-red-600"
                              : "mt-1 text-sm text-slate-500"
                          }
                        >
                          {isFull
                            ? "Fully booked"
                            : `${currentAvailableSeats} / ${flight.capacity} seats available`}
                        </p>
                      </div>

                      <div className="border-l border-slate-200 pl-5">
                        <p className="text-sm font-semibold text-slate-500">
                          Departure
                        </p>

                        <p className="mt-2 text-lg font-bold text-slate-900">
                          {flight.departureDate}
                        </p>

                        <p className="text-base text-slate-700">
                          {flight.departureTime}
                        </p>

                        <p className="text-sm text-slate-500">
                          {flight.departureTimezone}
                        </p>
                      </div>

                      <div className="border-l border-slate-200 pl-5">
                        <p className="text-sm font-semibold text-slate-500">
                          Arrival
                        </p>

                        <p className="mt-2 text-lg font-bold text-slate-900">
                          {flight.arrivalDate}
                        </p>

                        <p className="text-base text-slate-700">
                          {flight.arrivalTime}
                        </p>

                        <p className="text-sm text-slate-500">
                          {flight.arrivalTimezone}
                        </p>
                      </div>

                      <div className="border-l border-slate-200 pl-5">
                        <p className="text-sm font-semibold text-slate-500">
                          Fare
                        </p>

                        <div className="mt-3 rounded-full bg-amber-100 px-4 py-2 text-center font-bold text-amber-700">
                          ${flight.price} NZD
                        </div>
                      </div>

                      <div className="text-right">
                        {!isFull ? (
                          <Link
                            href={`/booking?flightNumber=${flight.flightNumber}`}
                            className="inline-block rounded-full bg-sky-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-sky-500"
                          >
                            Book Flight
                          </Link>
                        ) : (
                          <button
                            disabled
                            className="rounded-full bg-slate-400 px-6 py-3 text-sm font-bold text-white"
                          >
                            Fully Booked
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="rounded-3xl bg-white p-12 text-center shadow-lg">
                <h2 className="text-3xl font-bold text-slate-800">
                  No flights found
                </h2>

                <p className="mt-4 text-slate-500">
                  Please try another route or select different dates.
                </p>
              </div>
            )
          ) : (
            <div className="rounded-3xl bg-white p-12 text-center shadow-lg">
              <h2 className="text-3xl font-bold text-slate-800">
                Start your flight search
              </h2>

              <p className="mt-4 text-slate-500">
                Choose a route and date range, then click search.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}