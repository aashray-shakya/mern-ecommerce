"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/products");
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== "admin") {
    return <p className="p-6">Checking access...</p>;
  }

  return children;
}