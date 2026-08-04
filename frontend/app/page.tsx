import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <p className="text-xs uppercase tracking-[0.2em] text-[#9a968f] mb-4">
        Welcome to
      </p>
      <h1 className="text-5xl font-bold tracking-tight text-[#ece9e2] mb-4">
        MyStore
      </h1>
      <p className="max-w-md text-[#ece9e2]/70 mb-8">
        Quality electronics, curated and ready to ship. Browse the full
        catalog and check out in minutes.
      </p>
      <Link
        href="/products"
        className="bg-[#d98e4a] text-[#0f1115] font-semibold px-6 py-2.5 rounded-lg hover:bg-[#6fa8c9] transition"
      >
        Shop Products
      </Link>
    </main>
  );
}