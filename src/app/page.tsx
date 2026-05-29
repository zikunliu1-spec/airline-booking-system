"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { flightSchedules } from "@/services/flightData";
import { getConfirmedBookingCount } from "@/utils/bookingStorage";

export default function HomePage() {
  const featuredFlights = flightSchedules.slice(0, 5);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="min-h-screen bg-[#f4f8fc] text-slate-950">
      <section className="relative bg-gradient-to-r from-sky-700 via-cyan-600 to-blue-500 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=1800&q=80')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/85 via-sky-800/65 to-sky-700/30" />

        <div className="relative mx-auto max-w-6xl px-8 py-28">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.35em] text-amber-200">
            Regional Air Travel
          </p>

          <h1 className="max-w-3xl text-6xl font-extrabold leading-tight">
            Fly regional. Book with confidence.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-sky-100">
            Search and book scheduled small-aircraft flights from Dairy Flat
            Airport to selected regional and international destinations.
          </p>

          <div className="mt-9 flex gap-4">
            <Link
              href="/search"
              className="rounded-full bg-amber-300 px-8 py-4 font-bold text-slate-950 hover:bg-amber-200"
            >
              Search Flights
            </Link>

            <Link
              href="/my-bookings"
              className="rounded-full border border-white/70 px-8 py-4 font-bold text-white hover:bg-white hover:text-slate-950"
            >
              My Bookings
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-16 px-8">
        <div className="mx-auto grid max-w-6xl gap-6 rounded-3xl bg-white p-8 shadow-2xl md:grid-cols-4">
          <div className="border-r border-slate-200 pr-6">
            <p className="text-sm font-semibold text-slate-500">Main Airport</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              Dairy Flat
            </p>
            <p className="mt-1 text-slate-600">NZNE</p>
          </div>

          <div className="border-r border-slate-200 pr-6">
            <p className="text-sm font-semibold text-slate-500">
              Destinations
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900">5</p>
            <p className="mt-1 text-slate-600">
              Sydney, Rotorua, Claris, Tuuta, Tekapo
            </p>
          </div>

          <div className="border-r border-slate-200 pr-6">
            <p className="text-sm font-semibold text-slate-500">
              Booking System
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900">Online</p>
            <p className="mt-1 text-slate-600">
              Search, book, view and cancel
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-500">Database</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">MongoDB</p>
            <p className="mt-1 text-slate-600">Atlas connection ready</p>
          </div>
        </div>
      </section>

      <section className="px-8 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.9fr_1.4fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-sky-700">
              Route Planner
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight text-slate-900">
              Find flights by route and real calendar dates.
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              The timetable works with real dates rather than only named
              weekdays. Customers can search a date range, select a flight,
              enter passenger details and receive a unique booking reference.
            </p>

            <Link
              href="/search"
              className="mt-8 inline-block rounded-2xl bg-sky-600 px-7 py-4 font-bold text-white hover:bg-sky-500"
            >
              Start Searching →
            </Link>
          </div>

          <div className="space-y-5">
            {featuredFlights.map((flight) => {
              const confirmedCount = isClient
                ? getConfirmedBookingCount(flight.flightNumber)
                : 0;

              const currentAvailableSeats = flight.capacity - confirmedCount;
              const isFull = currentAvailableSeats <= 0;

              return (
                <div
                  key={flight.flightNumber}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="grid items-center gap-5 md:grid-cols-[1.1fr_0.8fr_0.8fr_auto]">
                    <div>
                      <p className="text-sm font-bold text-sky-700">
                        {flight.flightNumber}
                      </p>

                      <h3 className="mt-1 text-2xl font-bold text-slate-900">
                        {flight.origin} → {flight.destination}
                      </h3>

                      <p className="mt-2 text-sm font-semibold text-slate-600">
                        {flight.aircraft}
                      </p>

                      <p
                        className={
                          isFull
                            ? "mt-1 text-sm font-semibold text-red-600"
                            : "mt-1 text-sm text-slate-600"
                        }
                      >
                        {isFull
                          ? "Fully booked"
                          : `${currentAvailableSeats} / ${flight.capacity} seats available`}
                      </p>
                    </div>

                    <div className="border-l border-slate-200 pl-5">
                      <p className="text-sm text-slate-500">Departure</p>
                      <p className="mt-1 font-bold text-slate-900">
                        {flight.departureDate}
                      </p>
                      <p className="text-slate-700">{flight.departureTime}</p>
                    </div>

                    <div className="border-l border-slate-200 pl-5">
                      <p className="text-sm text-slate-500">Arrival</p>
                      <p className="mt-1 font-bold text-slate-900">
                        {flight.arrivalDate}
                      </p>
                      <p className="text-slate-700">{flight.arrivalTime}</p>
                    </div>

                    <div className="text-right">
                      <p className="rounded-full bg-amber-100 px-4 py-2 font-bold text-amber-700">
                        ${flight.price} NZD
                      </p>

                      {!isFull ? (
                        <Link
                          href={`/booking?flightNumber=${flight.flightNumber}`}
                          className="mt-4 inline-block rounded-full bg-sky-600 px-5 py-2 text-sm font-bold text-white hover:bg-sky-500"
                        >
                          Book
                        </Link>
                      ) : (
                        <button
                          disabled
                          className="mt-4 inline-block rounded-full bg-slate-400 px-5 py-2 text-sm font-bold text-white"
                        >
                          Fully Booked
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-sky-700">
            Our Fleet
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            Aircraft selected for small regional services.
          </h2>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div className="overflow-hidden rounded-3xl bg-slate-50 shadow">
              <img
                src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=900&q=80"
                alt="Business jet aircraft"
                className="h-56 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900">
                  SyberJet SJ30i
                </h3>
                <p className="mt-2 text-slate-600">
                  Luxury aircraft used for the weekly Sydney prestige service.
                </p>
                <p className="mt-4 font-bold text-sky-700">6 passengers</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl bg-slate-50 shadow">
              <img
                src="https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=900&q=80"
                alt="Small aircraft at an airport"
                className="h-56 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900">
                  Cirrus SF50
                </h3>
                <p className="mt-2 text-slate-600">
                  Used for Rotorua shuttle flights and Great Barrier services.
                </p>
                <p className="mt-4 font-bold text-sky-700">4 passengers</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl bg-slate-50 shadow">
              <img
                src="https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&w=900&q=80"
                alt="Aircraft on runway"
                className="h-56 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900">
                  HondaJet Elite
                </h3>
                <p className="mt-2 text-slate-600">
                  Supports the Chatham Islands and Lake Tekapo scheduled routes.
                </p>
                <p className="mt-4 font-bold text-sky-700">5 passengers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-sky-800 to-sky-700 px-8 py-12 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-2xl font-bold">Dairy Flat Airline</h2>
            <p className="mt-3 text-sky-100">
              Online booking system for regional scheduled flights.
            </p>
          </div>

          <div>
            <h3 className="font-bold">Quick Links</h3>
            <div className="mt-3 flex flex-col gap-2 text-sky-100">
              <Link href="/search">Search Flights</Link>
              <Link href="/my-bookings">My Bookings</Link>
              <Link href="/history">Booking History</Link>
              <Link href="/cancel">Cancel Booking</Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Project</h3>
            <p className="mt-3 text-sky-100">
              159.352 Assignment 2 · Next.js · MongoDB Atlas · Vercel
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}