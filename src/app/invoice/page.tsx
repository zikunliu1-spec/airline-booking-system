import Link from "next/link";

export default function InvoicePage() {
  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 rounded-2xl bg-white p-8 text-center shadow-md">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-emerald-600">
            Booking Confirmed
          </p>

          <h1 className="mb-4 text-4xl font-bold text-slate-900">
            Your Flight Has Been Reserved
          </h1>

          <p className="text-slate-600">
            Please keep your booking reference for check-in and future enquiries.
          </p>
        </div>

        <section className="rounded-2xl bg-white p-8 shadow-md">
          <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Invoice Summary
              </h2>
              <p className="text-slate-500">Dairy Flat Airline</p>
            </div>

            <div className="text-right">
              <p className="text-sm text-slate-500">Booking Reference</p>
              <p className="text-xl font-bold text-slate-900">DF-A1B2C3</p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-lg font-bold text-slate-900">
                Passenger Details
              </h3>

              <div className="space-y-3 text-sm text-slate-700">
                <p>
                  <span className="font-semibold">Name:</span> Sample Passenger
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  passenger@example.com
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> 021 000 0000
                </p>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-bold text-slate-900">
                Flight Details
              </h3>

              <div className="space-y-3 text-sm text-slate-700">
                <p>
                  <span className="font-semibold">Flight:</span> DF101
                </p>
                <p>
                  <span className="font-semibold">Route:</span> Dairy Flat → Sydney
                </p>
                <p>
                  <span className="font-semibold">Departure:</span> 08:30 AM
                </p>
                <p>
                  <span className="font-semibold">Arrival:</span> 11:15 AM
                </p>
                <p>
                  <span className="font-semibold">Aircraft:</span> SyberJet SJ30i
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-slate-50 p-6">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-slate-700">
                Total Price
              </span>

              <span className="text-2xl font-bold text-slate-900">
                $399 NZD
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/"
              className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700"
            >
              Return Home
            </Link>

            <Link
              href="/my-bookings"
              className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              View My Bookings
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}