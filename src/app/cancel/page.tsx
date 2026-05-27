import Link from "next/link";

export default function CancelBookingPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-3xl">
        <section className="rounded-2xl bg-white p-10 shadow-md">
          <div className="mb-8 text-center">
            <div className="mb-4 text-6xl">✈️</div>

            <h1 className="mb-3 text-5xl font-bold text-slate-900">
              Cancel Booking
            </h1>

            <p className="text-lg text-slate-600">
              Review your booking details before cancellation.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-6">
            <div className="mb-6 flex items-center justify-between">
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

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-white p-4">
                <p className="mb-2 text-sm text-slate-500">
                  Departure
                </p>

                <p className="text-xl font-bold text-slate-900">
                  08:30 AM
                </p>
              </div>

              <div className="rounded-xl bg-white p-4">
                <p className="mb-2 text-sm text-slate-500">
                  Arrival
                </p>

                <p className="text-xl font-bold text-slate-900">
                  11:15 AM
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5">
            <p className="font-semibold text-red-700">
              Warning:
            </p>

            <p className="mt-2 text-red-600">
              Cancelling this booking may result in cancellation fees depending
              on airline policy.
            </p>
          </div>

          <div className="mt-8 flex gap-4">
            <Link
              href="/cancelled"
              className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Confirm Cancellation
            </Link>

            <Link
              href="/my-bookings"
              className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Keep Booking
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}