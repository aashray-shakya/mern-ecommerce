"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../lib/api";

export default function CheckoutPage() {
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await api.post("/orders", { shippingAddress: form });
      router.push(`/orders/${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Checkout failed");
      setSubmitting(false);
    }
  };

  const inputClass =
    "bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[#ece9e2] placeholder-[#9a968f] focus:outline-none focus:border-[#d98e4a]/50 transition";

  return (
    <main className="p-6 max-w-sm mx-auto">
      <h1 className="text-3xl font-bold tracking-tight text-[#ece9e2] mb-8">
        Checkout
      </h1>
      <form
        onSubmit={handleSubmit}
        className="glass rounded-2xl p-6 flex flex-col gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      >
        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className={inputClass}
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className={inputClass}
          required
        />
        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className={inputClass}
          required
        />
        <input
          name="postalCode"
          placeholder="Postal Code"
          value={form.postalCode}
          onChange={handleChange}
          className={inputClass}
          required
        />
        <input
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          className={inputClass}
          required
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="bg-[#d98e4a] text-[#0f1115] font-semibold py-2.5 rounded-lg hover:bg-[#6fa8c9] transition disabled:opacity-50"
        >
          {submitting ? "Placing order..." : "Place Order"}
        </button>
      </form>
    </main>
  );
}