"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../../lib/api";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await api.post("/cart", { productId: id, quantity: 1 });
      setMessage("Added to cart!");
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Please log in to add items to cart"
      );
    }
  };

  if (loading) return <p className="p-6 text-[#ece9e2]">Loading...</p>;
  if (error) return <p className="p-6 text-red-400">{error}</p>;

  return (
    <main className="p-6 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="aspect-square w-full glass rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#9a968f]">
            No image
          </div>
        )}
      </div>

      <div className="glass rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <p className="text-xs uppercase tracking-wide text-[#9a968f] mb-2">
          {product.category}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-[#ece9e2]">
          {product.name}
        </h1>
        <p className="mt-4 text-[#ece9e2]/80">{product.description}</p>

        <span className="inline-block mt-6 bg-[#d98e4a] text-[#0f1115] text-lg font-semibold px-3 py-1.5 rounded">
          ${product.price.toFixed(2)}
        </span>

        <p className="text-sm text-[#9a968f] mt-3">
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </p>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="mt-6 bg-[#d98e4a] text-[#0f1115] font-semibold px-6 py-2.5 rounded-lg hover:bg-[#6fa8c9] transition disabled:opacity-40"
        >
          Add to Cart
        </button>

        {message && <p className="mt-3 text-sm text-[#ece9e2]/70">{message}</p>}
      </div>
    </main>
  );
}

//auto push test