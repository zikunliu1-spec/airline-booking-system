"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { flightSchedules } from "@/services/flightData";

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const flightNumber = searchParams.get("flight");

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

  const bookingReference = useMemo(() => {
    return `DF${Math.floor(100000 + Math.random() * 900000)}`;
  }, []);

  const isFull = selectedFlight
    ? selectedFlight.availableSeats <= 0
    : false;

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

      if (!response.ok) {
        alert(data.message || "Booking failed.");
        setLoading(false);
        return;
      }

      router.push(
        `/invoice?bookingReference=${bookingReference}`
      );
    } catch (error) {
      console.error(error);
      alert("Failed to create booking.");
    }

    setLoading(false);
  }

  if (!selectedFlight) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen flex items-center justify-center bg-slate-100">
          <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
            <h1 className="text-3xl font-bold text-red-500 mb-4">
              Flight Not Found
            </h1>

            <button
              onClick={() => router.push("/search")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Back to Search
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-100 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-700 to-blue-500 text-white rounded-3xl p-10 shadow-xl mb-8">
            <p className="uppercase tracking-[0.3em] text-yellow-300 font-semibold mb-2">
              Flight Booking
            </p>

            <h1 className="text-5xl font-black mb-4">
              Confirm your booking.
            </h1>

            <p className="text-lg text-blue-100">
              Complete passenger details and confirm your Dairy Flat Airline
              reservation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-blue-700 font-bold text-lg">
                    {selectedFlight.flightNumber}
                  </p>

                  <h2 className="text-4xl font-black text-slate-900">
                    {selectedFlight.origin} →{" "}
                    {selectedFlight.destination}
                  </h2>
                </div>

                <div className="bg-yellow-100 text-yellow-700 px-5 py-3 rounded-2xl font-bold text-xl">
                  ${selectedFlight.price} NZD
                </div>
              </div>

              <div className="space-y-5">
                <div className="bg-slate-100 rounded-2xl p-5">
                  <p className="text-sm text-slate-500 mb-1">
                    Aircraft
                  </p>

                  <p className="font-bold text-slate-900 text-lg">
                    {selectedFlight.aircraft}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="bg-slate-100 rounded-2xl p-5">
                    <p className="text-sm text-slate-500 mb-1">
                      Departure
                    </p>

                    <p className="font-bold text-slate-900">
                      {selectedFlight.departureDate}
                    </p>

                    <p className="text-slate-700">
                      {selectedFlight.departureTime}
                    </p>
                  </div>

                  <div className="bg-slate-100 rounded-2xl p-5">
                    <p className="text-sm text-slate-500 mb-1">
                      Arrival
                    </p>

                    <p className="font-bold text-slate-900">
                      {selectedFlight.arrivalDate}
                    </p>

                    <p className="text-slate-700">
                      {selectedFlight.arrivalTime}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-100 rounded-2xl p-5">
                  <p className="text-sm text-slate-500 mb-1">
                    Booking Reference
                  </p>

                  <p className="font-black text-2xl text-blue-700">
                    {bookingReference}
                  </p>
                </div>

                <div className="bg-slate-100 rounded-2xl p-5">
                  <p className="text-sm text-slate-500 mb-1">
                    Aircraft Capacity
                  </p>

                  <p className="font-bold text-xl text-green-600">
                    {selectedFlight.capacity} seats
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-3xl font-black text-slate-900 mb-8">
                Passenger Details
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block font-semibold text-slate-700 mb-2">
                    First Name
                  </label>

                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) =>
                      setFirstName(e.target.value)
                    }
                    className="w-full border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
                    placeholder="Enter first name"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-2">
                    Last Name
                  </label>

                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) =>
                      setLastName(e.target.value)
                    }
                    className="w-full border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
                    placeholder="Enter last name"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="w-full border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-2">
                    Passport Number
                  </label>

                  <input
                    type="text"
                    value={passportNumber}
                    onChange={(e) =>
                      setPassportNumber(e.target.value)
                    }
                    className="w-full border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
                    placeholder="Enter passport number"
                  />
                </div>

                <button
                  onClick={handleBooking}
                  disabled={loading || isFull}
                  className={`w-full mt-4 py-4 rounded-2xl font-bold text-lg transition ${
                    isFull
                      ? "bg-red-400 text-white cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
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
        </div>
      </main>
    </>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading booking page...</div>}>
      <BookingContent />
    </Suspense>
  );
}