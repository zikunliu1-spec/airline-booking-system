import Link from "next/link";

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-3 text-4xl font-bold text-slate-900">
          Complete Your Booking
        </h1>

        <p className="mb-8 text-slate-600">
          Enter passenger details to reserve a seat on the selected flight.
        </p>

        <section className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-md md:col-span-1">
            <h2 className="mb-4 text-xl font-bold text-slate-900">
              Flight Summary
            </h2>

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

              <p>
                <span className="font-semibold">Price:</span> $399 NZD
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-md md:col-span-2">
            <h2 className="mb-6 text-xl font-bold text-slate-900">
              Passenger Information
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  First Name
                </label>

                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Last Name
                </label>

                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email
                </label>

                <input
                  type="email"
                  className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Phone
                </label>

                <input
                  type="tel"
                  className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 outline-none focus:border-slate-500"
                />
              </div>
            </div>

            <Link
              href="/invoice"
              className="mt-8 inline-block rounded-xl bg-slate-900 px-8 py-4 font-semibold text-white transition hover:bg-slate-700"
            >
              Confirm Booking
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}