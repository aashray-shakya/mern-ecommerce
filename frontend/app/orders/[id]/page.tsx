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

  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!order) return <p className="p-6">Loading order...</p>;

  return (
    <main className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-2">Order Confirmed 🎉</h1>
      <p className="text-gray-600 mb-6">Order ID: {order._id}</p>

      <div className="flex flex-col gap-3 mb-6">
        {order.items.map((item) => (
          <div key={item.product} className="flex justify-between border-b pb-2">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <p className="text-xl font-bold">Total: ${order.totalPrice.toFixed(2)}</p>
      <p className="mt-2 text-sm text-gray-600">Status: {order.status}</p>

      <div className="mt-6 text-sm text-gray-600">
        <p className="font-semibold">Shipping to:</p>
        <p>{order.shippingAddress.fullName}</p>
        <p>{order.shippingAddress.address}</p>
        <p>
          {order.shippingAddress.city}, {order.shippingAddress.postalCode}
        </p>
        <p>{order.shippingAddress.country}</p>
      </div>
    </main>
  );
}