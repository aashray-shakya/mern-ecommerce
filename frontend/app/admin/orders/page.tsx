"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";
import AdminRoute from "../../../components/AdminRoute";

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

  if (loading) return <p className="p-6 text-[#ece9e2]">Loading orders...</p>;
  if (error) return <p className="p-6 text-red-400">{error}</p>;

  return (
    <AdminRoute>
      <main className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-[#ece9e2] mb-8">
          All Orders
        </h1>

        {orders.length === 0 ? (
          <p className="text-[#9a968f]">No orders yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="glass rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-[#ece9e2]">
                      Order #{order._id.slice(-6)}
                    </p>
                    <p className="text-sm text-[#9a968f]">
                      {order.user?.name} ({order.user?.email})
                    </p>
                    <p className="text-sm text-[#9a968f]">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <p className="font-bold text-[#d98e4a]">
                    ${order.totalPrice.toFixed(2)}
                  </p>
                </div>

                <div className="flex flex-col gap-1 text-sm mb-3 text-[#ece9e2]/80">
                  {order.items.map((item) => (
                    <p key={item.product}>
                      {item.name} × {item.quantity}
                    </p>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm text-[#9a968f]">Status:</label>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-sm text-[#ece9e2]"
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status} className="bg-[#1c1b19]">
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
    </AdminRoute>
  );
}