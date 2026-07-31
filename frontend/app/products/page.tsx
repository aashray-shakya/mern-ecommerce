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

  if (loading) return <p className="p-6">Loading products...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product._id}`}
            className="border rounded-lg p-4 hover:shadow-md transition"
          >
            <h2 className="font-semibold">{product.name}</h2>
            <p className="text-gray-600 text-sm">{product.category}</p>
            <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}