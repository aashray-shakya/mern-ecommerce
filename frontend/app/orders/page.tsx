"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../../lib/api";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/myorders");
        setOrders(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Please log in to view orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p className="p-6 text-[#ece9e2]">Loading orders...</p>;
  if (error) return <p className="p-6 text-red-400">{error}</p>;

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight text-[#ece9e2] mb-8">
        My Orders
      </h1>
      {orders.length === 0 ? (
        <p className="text-[#9a968f]">You haven't placed any orders yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <Link
              key={order._id}
              href={`/orders/${order._id}`}
              className="glass rounded-xl p-4 flex justify-between items-center hover:-translate-y-0.5 hover:border-[#d98e4a]/40 transition shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            >
              <div>
                <p className="font-semibold text-[#ece9e2]">
                  Order #{order._id.slice(-6)}
                </p>
                <p className="text-sm text-[#9a968f] capitalize">
                  {order.status}
                </p>
              </div>
              <p className="font-bold text-[#d98e4a]">
                ${order.totalPrice.toFixed(2)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}