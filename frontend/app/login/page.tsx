"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { fetchUser } = useAuth();

  const inputClass =
    "bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[#ece9e2] placeholder-[#9a968f] focus:outline-none focus:border-[#d98e4a]/50 transition";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/login", { email, password });
      await fetchUser();
      router.push("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <main className="p-6 max-w-sm mx-auto mt-10">
      <h1 className="text-3xl font-bold tracking-tight text-[#ece9e2] mb-8">
        Login
      </h1>
      <form
        onSubmit={handleSubmit}
        className="glass rounded-2xl p-6 flex flex-col gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
          required
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-[#d98e4a] text-[#0f1115] font-semibold py-2.5 rounded-lg hover:bg-[#6fa8c9] transition"
        >
          Log In
        </button>
      </form>
      <p className="text-sm mt-4 text-[#9a968f]">
        No account?{" "}
        <a href="/register" className="underline text-[#d98e4a]">
          Register here
        </a>
      </p>
    </main>
  );
}