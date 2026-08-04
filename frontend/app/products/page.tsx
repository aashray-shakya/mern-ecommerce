"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="p-6 text-[#ece9e2]">Loading products...</p>;
  if (error) return <p className="p-6 text-red-400">{error}</p>;

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-8 text-[#ece9e2]">
        Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product._id}`}
            className="group glass rounded-2xl overflow-hidden hover:-translate-y-1 hover:border-[#d98e4a]/40 transition duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          >
            <div className="aspect-square w-full bg-white/5 overflow-hidden">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#9a968f] text-sm">
                  No image
                </div>
              )}
            </div>
            <div className="p-4">
              <p className="text-xs uppercase tracking-wide text-[#9a968f] mb-1">
                {product.category}
              </p>
              <h2 className="font-semibold text-[#ece9e2]">{product.name}</h2>
              <span className="inline-block mt-2 bg-[#d98e4a] text-[#0f1115] text-sm font-semibold px-2 py-1 rounded">
                ${product.price.toFixed(2)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}