"use client";

import { useState } from "react";
import Link from "next/link";

export default function SearchPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!from || !to || !startDate || !endDate) {
      setError("Please complete all search fields before searching.");
      setShowResults(false);
      return;
    }

    if (from === to) {
      setError("Departure and destination airports cannot be the same.");
      setShowResults(false);
      return;
    }

    setError("");
    setShowResults(true);
  };

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-3 text-4xl font-bold text-slate-900">
          Search Flights
        </h1>

        <p className="mb-8 text-slate-600">
          Search available scheduled flights by route and date range.
        </p>

        <section className="rounded-2xl bg-white p-8 shadow-md">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                From
              </label>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 outline-none focus:border-slate-500"
              >
                <option value="">Select departure airport</option>
                <option value="NZNE">Dairy Flat Airport (NZNE)</option>
                <option value="YSSY">Sydney Airport (YSSY)</option>
                <option value="NZRO">Rotorua Airport (NZRO)</option>
                <option value="NZGB">Claris Airport (NZGB)</option>
                <option value="NZCI">Tuuta Airport (NZCI)</option>
                <option value="NZTL">Lake Tekapo Airport (NZTL)</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                To
              </label>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 outline-none focus:border-slate-500"
              >
                <option value="">Select destination airport</option>
                <option value="NZNE">Dairy Flat Airport (NZNE)</option>
                <option value="YSSY">Sydney Airport (YSSY)</option>
                <option value="NZRO">Rotorua Airport (NZRO)</option>
                <option value="NZGB">Claris Airport (NZGB)</option>
                <option value="NZCI">Tuuta Airport (NZCI)</option>
                <option value="NZTL">Lake Tekapo Airport (NZTL)</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 outline-none focus:border-slate-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 outline-none focus:border-slate-500"
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-600">
              {error}
            </p>
          )}

          <div className="mt-8">
            <button
              onClick={handleSearch}
              className="rounded-xl bg-slate-900 px-8 py-4 font-semibold text-white transition hover:bg-slate-700"
            >
              Search Available Flights
            </button>
          </div>

          {showResults && (
            <div className="mt-10 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">DF101</h2>
                    <p className="text-slate-600">Dairy Flat → Sydney</p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-semibold text-slate-900">
                      $399 NZD
                    </p>
                    <p className="text-sm text-slate-500">One-way fare</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl bg-white p-4">
                    <p className="text-sm text-slate-500">Departure</p>
                    <p className="mt-1 font-semibold text-slate-900">
                      08:30 AM
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <p className="text-sm text-slate-500">Arrival</p>
                    <p className="mt-1 font-semibold text-slate-900">
                      11:15 AM
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <p className="text-sm text-slate-500">Aircraft</p>
                    <p className="mt-1 font-semibold text-slate-900">
                      SyberJet SJ30i
                    </p>
                  </div>
                </div>

                <Link
                  href="/booking"
                  className="mt-6 inline-block rounded-xl bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-700"
                >
                  Book Flight
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}