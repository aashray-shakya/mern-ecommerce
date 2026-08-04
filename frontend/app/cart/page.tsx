"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../lib/api";

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCart(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Please log in to view your cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    await api.put(`/cart/${productId}`, { quantity });
    fetchCart();
  };

  const removeItem = async (productId) => {
    await api.delete(`/cart/${productId}`);
    fetchCart();
  };

  if (loading) return <p className="p-6">Loading cart...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <main className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {cart.items.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <p className="font-semibold">{item.product.name}</p>
                  <p className="text-sm text-gray-600">
                    ${item.product.price.toFixed(2)} each
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      updateQuantity(item.product._id, item.quantity - 1)
                    }
                    className="border px-2 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product._id, item.quantity + 1)
                    }
                    className="border px-2 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.product._id)}
                    className="text-red-600 text-sm ml-3"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xl font-bold mt-6">Total: ${total.toFixed(2)}</p>

          <button
            onClick={() => router.push("/checkout")}
            className="mt-4 bg-black text-white px-6 py-2 rounded"
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </main>
  );
}