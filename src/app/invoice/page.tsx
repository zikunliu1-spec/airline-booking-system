"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { flightSchedules } from "@/services/flightData";

function InvoicePageContent() {
  const searchParams = useSearchParams();

  const bookingReference = searchParams.get("bookingReference");
  const flightNumber = searchParams.get("flightNumber");
  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName");
  const email = searchParams.get("email");
  const passportNumber = searchParams.get("passportNumber");

  const selectedFlight = flightSchedules.find(
    (flight) => flight.flightNumber === flightNumber
  );

  return (
    <main className="min-h-screen bg-[#f4f8fc] text-slate-950">
      <section className="bg-gradient-to-r from-sky-700 via-cyan-600 to-blue-500 px-8 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-200">
            Booking Invoice
          </p>

          <h1 className="mt-4 text-5xl font-extrabold">
            Your flight is confirmed.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-sky-100">
            Review your passenger details, selected flight and total fare below.
          </p>
        </div>
      </section>

      <section className="-mt-10 px-8 pb-16">
        <div className="mx-auto max-w-6xl">
          {selectedFlight ? (
            <div className="rounded-3xl bg-white p-8 shadow-2xl">
              <div className="mb-8 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-3xl bg-sky-50 p-6">
                  <p className="text-sm font-bold uppercase tracking-wide text-sky-700">
                    Confirmation
                  </p>

                  <h2 className="mt-3 text-3xl font-extrabold text-slate-900">
                    Booking Confirmed
                  </h2>

                  <p className="mt-3 text-slate-600">
                    Your reservation has been recorded successfully. Please keep
                    your booking reference for check-in and cancellation.
                  </p>
                </div>

                <div className="rounded-3xl bg-amber-100 p-6">
                  <p className="text-sm font-semibold text-amber-700">
                    Booking Reference
                  </p>

                  <p className="mt-3 text-4xl font-extrabold text-amber-800">
                    {bookingReference}
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 p-6">
                  <h3 className="mb-5 text-2xl font-bold text-slate-900">
                    Passenger Details
                  </h3>

                  <div className="space-y-4">
                    <p className="text-slate-700">
                      Name
                      <span className="block font-bold text-slate-900">
                        {firstName} {lastName}
                      </span>
                    </p>

                    <p className="text-slate-700">
                      Email
                      <span className="block font-bold text-slate-900">
                        {email}
                      </span>
                    </p>

                    <p className="text-slate-700">
                      Passport Number
                      <span className="block font-bold text-slate-900">
                        {passportNumber}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 p-6">
                  <h3 className="mb-5 text-2xl font-bold text-slate-900">
                    Flight Details
                  </h3>

                  <div className="space-y-4">
                    <p className="text-slate-700">
                      Flight
                      <span className="block font-bold text-slate-900">
                        {selectedFlight.flightNumber}
                      </span>
                    </p>

                    <p className="text-slate-700">
                      Route
                      <span className="block font-bold text-slate-900">
                        {selectedFlight.origin} → {selectedFlight.destination}
                      </span>
                    </p>

                    <p className="text-slate-700">
                      Aircraft
                      <span className="block font-bold text-slate-900">
                        {selectedFlight.aircraft}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 p-6">
                  <h3 className="mb-5 text-2xl font-bold text-slate-900">
                    Departure
                  </h3>

                  <p className="text-lg font-bold text-slate-900">
                    {selectedFlight.departureDate}
                  </p>

                  <p className="mt-2 text-lg font-semibold text-slate-800">
                    {selectedFlight.departureTime}
                  </p>

                  <p className="mt-2 text-slate-600">
                    {selectedFlight.departureTimezone}
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 p-6">
                  <h3 className="mb-5 text-2xl font-bold text-slate-900">
                    Arrival
                  </h3>

                  <p className="text-lg font-bold text-slate-900">
                    {selectedFlight.arrivalDate}
                  </p>

                  <p className="mt-2 text-lg font-semibold text-slate-800">
                    {selectedFlight.arrivalTime}
                  </p>

                  <p className="mt-2 text-slate-600">
                    {selectedFlight.arrivalTimezone}
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-3xl bg-sky-600 p-6 text-white">
                <p className="text-lg font-semibold">Total Fare</p>

                <p className="mt-2 text-4xl font-extrabold">
                  ${selectedFlight.price} NZD
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl bg-white p-10 text-center shadow-2xl">
              <h2 className="text-2xl font-bold text-red-600">
                Invoice information not found
              </h2>
              <p className="mt-3 text-slate-500">
                Please complete a booking before viewing an invoice.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default function InvoicePage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#f4f8fc] text-slate-900">
          <div className="rounded-3xl bg-white p-10 text-2xl font-bold shadow-xl">
            Loading invoice...
          </div>
        </main>
      }
    >
      <InvoicePageContent />
    </Suspense>
  );
}