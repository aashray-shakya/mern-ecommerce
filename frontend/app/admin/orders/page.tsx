"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";

const STATUS_OPTIONS = ["pending", "processing", "shipped", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Not authorized. Are you an admin?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  if (loading) return <p className="p-6">Loading orders...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <main className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">All Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order._id} className="border rounded p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold">Order #{order._id.slice(-6)}</p>
                  <p className="text-sm text-gray-600">
                    {order.user?.name} ({order.user?.email})
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <p className="font-bold">${order.totalPrice.toFixed(2)}</p>
              </div>

              <div className="flex flex-col gap-1 text-sm mb-3">
                {order.items.map((item) => (
                  <p key={item.product}>
                    {item.name} × {item.quantity}
                  </p>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm">Status:</label>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}