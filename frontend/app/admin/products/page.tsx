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

  return (
    <AdminRoute>
      <main className="p-6 max-w-3xl">
        <h1 className="text-2xl font-bold mb-6">Manage Products</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 border p-4 rounded mb-8">
          <h2 className="font-semibold">{editingId ? "Edit Product" : "Add New Product"}</h2>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border rounded px-3 py-2" required />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border rounded px-3 py-2" required />
          <input name="price" type="number" step="0.01" placeholder="Price" value={form.price} onChange={handleChange} className="border rounded px-3 py-2" required />
          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="border rounded px-3 py-2" required />
          <input name="image" placeholder="Image URL (optional)" value={form.image} onChange={handleChange} className="border rounded px-3 py-2" />
          <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} className="border rounded px-3 py-2" required />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div className="flex gap-3">
            <button type="submit" className="bg-black text-white px-4 py-2 rounded">
              {editingId ? "Update Product" : "Add Product"}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="border px-4 py-2 rounded">
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="flex flex-col gap-2">
          {products.map((product) => (
            <div key={product._id} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-gray-600">${product.price.toFixed(2)} · {product.stock} in stock</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleEdit(product)} className="text-sm underline">Edit</button>
                <button onClick={() => handleDelete(product._id)} className="text-sm text-red-600 underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </AdminRoute>
  );
}