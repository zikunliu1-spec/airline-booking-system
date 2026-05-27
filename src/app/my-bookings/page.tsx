import Link from "next/link";

export default function MyBookingsPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="mb-2 text-5xl font-bold text-slate-900">
            My Bookings
          </h1>

          <p className="text-lg text-slate-600">
            View and manage your booked flights.
          </p>
        </div>

        <div className="space-y-6">
          {/* Booking Card */}
          <section className="rounded-2xl bg-white p-8 shadow-md">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">
                  DF101
                </h2>

                <p className="mt-2 text-slate-600">
                  Dairy Flat → Sydney
                </p>
              </div>

              <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                Confirmed
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="mb-2 text-sm text-slate-500">
                  Departure
                </p>

                <p className="text-xl font-bold text-slate-900">
                  08:30 AM
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="mb-2 text-sm text-slate-500">
                  Arrival
                </p>

                <p className="text-xl font-bold text-slate-900">
                  11:15 AM
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="mb-2 text-sm text-slate-500">
                  Aircraft
                </p>

                <p className="text-xl font-bold text-slate-900">
                  SyberJet SJ30i
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="mb-2 text-sm text-slate-500">
                  Price
                </p>

                <p className="text-xl font-bold text-slate-900">
                  $399 NZD
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <Link
                href="/invoice"
                className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700"
              >
                View Invoice
              </Link>

              <Link
                href="/cancel"
                className="rounded-xl border border-red-300 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-50"
              >
                Cancel Booking
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}