"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 glass border-x-0 border-t-0 text-[#ece9e2]">
      <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
        <span className="inline-block w-2.5 h-2.5 bg-[#d98e4a] rounded-sm" />
        MyStore
      </Link>
      <div className="flex items-center gap-6 text-sm">
        <Link href="/products" className="hover:text-[#d98e4a] transition">
          Products
        </Link>
        <Link href="/cart" className="hover:text-[#d98e4a] transition">
          Cart
        </Link>

        {!loading && user && (
          <>
            <Link href="/orders" className="hover:text-[#d98e4a] transition">
              My Orders
            </Link>
            {user.role === "admin" && (
              <>
                <Link href="/admin/products" className="hover:text-[#d98e4a] transition">
                  Admin
                </Link>
                <Link href="/admin/orders" className="hover:text-[#d98e4a] transition">
                  All Orders
                </Link>
              </>
            )}
            <span className="text-[#9a968f]">Hi, {user.name}</span>
            <button onClick={handleLogout} className="hover:text-[#d98e4a] transition">
              Logout
            </button>
          </>
        )}

        {!loading && !user && (
          <>
            <Link href="/login" className="hover:text-[#d98e4a] transition">
              Login
            </Link>
            <Link href="/register" className="hover:text-[#d98e4a] transition">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}