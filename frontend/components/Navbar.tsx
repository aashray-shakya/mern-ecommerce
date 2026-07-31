import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <Link href="/" className="text-xl font-bold">
        MyStore
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/products">Products</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}