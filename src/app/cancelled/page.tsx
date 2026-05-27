import Link from "next/link";

export default function CancelledPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-3xl">
        <section className="rounded-2xl bg-white p-10 text-center shadow-md">
          <div className="mb-4 text-6xl">✅</div>

          <h1 className="mb-4 text-5xl font-bold text-slate-900">
            Booking Cancelled
          </h1>

          <p className="mb-8 text-lg text-slate-600">
            Your booking has been cancelled successfully.
          </p>

          <Link
            href="/"
            className="inline-block rounded-xl bg-slate-900 px-8 py-4 font-semibold text-white transition hover:bg-slate-700"
          >
            Return Home
          </Link>
        </section>
      </div>
    </main>
  );
}