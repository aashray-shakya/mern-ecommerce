"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../../lib/api";

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Order not found");
      }
    };
    fetchOrder();
  }, [id]);

  if (error) return <p className="p-6 text-red-400">{error}</p>;
  if (!order) return <p className="p-6 text-[#ece9e2]">Loading order...</p>;

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight text-[#ece9e2] mb-1">
        Order Confirmed 🎉
      </h1>
      <p className="text-[#9a968f] mb-6">Order ID: {order._id}</p>

      <div className="glass rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <div className="flex flex-col gap-3 mb-6 divide-y divide-white/10">
          {order.items.map((item) => (
            <div
              key={item.product}
              className="flex justify-between pt-3 first:pt-0 text-[#ece9e2]"
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <p className="text-xl font-bold text-[#d98e4a]">
          Total: ${order.totalPrice.toFixed(2)}
        </p>
        <p className="mt-2 text-sm text-[#9a968f] capitalize">
          Status: {order.status}
        </p>

        <div className="mt-6 text-sm text-[#9a968f]">
          <p className="font-semibold text-[#ece9e2] mb-1">Shipping to:</p>
          <p>{order.shippingAddress.fullName}</p>
          <p>{order.shippingAddress.address}</p>
          <p>
            {order.shippingAddress.city}, {order.shippingAddress.postalCode}
          </p>
          <p>{order.shippingAddress.country}</p>
        </div>
      </div>
    </main>
  );
}