"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";
import AdminRoute from "../../../components/AdminRoute";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
      stock: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
    };

    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, payload);
      } else {
        await api.post("/products", payload);
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Action failed. Are you an admin?");
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      stock: product.stock,
    });
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  const inputClass =
    "bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[#ece9e2] placeholder-[#9a968f] focus:outline-none focus:border-[#d98e4a]/50 transition";

  return (
    <AdminRoute>
      <main className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-[#ece9e2] mb-8">
          Manage Products
        </h1>

        <form
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-6 flex flex-col gap-3 mb-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        >
          <h2 className="font-semibold text-[#ece9e2]">
            {editingId ? "Edit Product" : "Add New Product"}
          </h2>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className={inputClass} required />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className={inputClass} required />
          <input name="price" type="number" step="0.01" placeholder="Price" value={form.price} onChange={handleChange} className={inputClass} required />
          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className={inputClass} required />
          <input name="image" placeholder="Image URL (optional)" value={form.image} onChange={handleChange} className={inputClass} />
          <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} className={inputClass} required />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="flex gap-3">
            <button type="submit" className="bg-[#d98e4a] text-[#0f1115] font-semibold px-4 py-2 rounded-lg hover:bg-[#6fa8c9] transition">
              {editingId ? "Update Product" : "Add Product"}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="bg-white/10 text-[#ece9e2] px-4 py-2 rounded-lg hover:bg-white/20 transition">
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="glass rounded-2xl divide-y divide-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          {products.map((product) => (
            <div key={product._id} className="flex justify-between items-center p-4">
              <div>
                <p className="font-semibold text-[#ece9e2]">{product.name}</p>
                <p className="text-sm text-[#9a968f]">
                  ${product.price.toFixed(2)} · {product.stock} in stock
                </p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleEdit(product)} className="text-sm text-[#6fa8c9] hover:underline">
                  Edit
                </button>
                <button onClick={() => handleDelete(product._id)} className="text-sm text-red-400 hover:underline">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </AdminRoute>
  );
}