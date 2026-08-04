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

  if (loading) return <p className="p-6 text-[#ece9e2]">Loading cart...</p>;
  if (error) return <p className="p-6 text-red-400">{error}</p>;

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight text-[#ece9e2] mb-8">
        Your Cart
      </h1>

      {cart.items.length === 0 ? (
        <p className="text-[#9a968f]">Your cart is empty.</p>
      ) : (
        <>
          <div className="glass rounded-2xl divide-y divide-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            {cart.items.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center justify-between p-4"
              >
                <div>
                  <p className="font-semibold text-[#ece9e2]">
                    {item.product.name}
                  </p>
                  <p className="text-sm text-[#9a968f]">
                    ${item.product.price.toFixed(2)} each
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      updateQuantity(item.product._id, item.quantity - 1)
                    }
                    className="w-7 h-7 flex items-center justify-center rounded bg-white/10 text-[#ece9e2] hover:bg-white/20 transition"
                  >
                    -
                  </button>
                  <span className="text-[#ece9e2] w-4 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product._id, item.quantity + 1)
                    }
                    className="w-7 h-7 flex items-center justify-center rounded bg-white/10 text-[#ece9e2] hover:bg-white/20 transition"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.product._id)}
                    className="text-red-400 text-sm ml-3 hover:text-red-300 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xl font-bold text-[#ece9e2] mt-6">
            Total: ${total.toFixed(2)}
          </p>

          <button
            onClick={() => router.push("/checkout")}
            className="mt-4 bg-[#d98e4a] text-[#0f1115] font-semibold px-6 py-2.5 rounded-lg hover:bg-[#6fa8c9] transition"
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </main>
  );
}