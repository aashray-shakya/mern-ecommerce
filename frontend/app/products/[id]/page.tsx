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

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <main className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-600 mt-1">{product.category}</p>
      <p className="mt-4">{product.description}</p>
      <p className="text-xl font-bold mt-4">${product.price.toFixed(2)}</p>
      <p className="text-sm text-gray-500 mt-1">
        {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
      </p>

      <button
        onClick={handleAddToCart}
        disabled={product.stock === 0}
        className="mt-6 bg-black text-white px-6 py-2 rounded disabled:opacity-40"
      >
        Add to Cart
      </button>

      {message && <p className="mt-3 text-sm">{message}</p>}
    </main>
  );
}