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

  if (loading) return <p className="p-6">Loading orders...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <main className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <Link
              key={order._id}
              href={`/orders/${order._id}`}
              className="border rounded p-4 flex justify-between hover:shadow-sm"
            >
              <div>
                <p className="font-semibold">Order #{order._id.slice(-6)}</p>
                <p className="text-sm text-gray-600">{order.status}</p>
              </div>
              <p className="font-bold">${order.totalPrice.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}