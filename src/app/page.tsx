import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100">
      <section className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">

        <h1 className="mb-6 text-5xl font-bold text-slate-900">
          Dairy Flat Airline
        </h1>

        <p className="mb-10 max-w-2xl text-lg text-slate-600">
          Luxury regional airline booking system built with Next.js and MongoDB.
        </p>

        <Link
          href="/search"
          className="rounded-xl bg-slate-900 px-8 py-4 text-white transition hover:bg-slate-700"
        >
          Search Flights
        </Link>

      </section>
    </main>
  );
}