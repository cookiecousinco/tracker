import React, { useEffect, useState } from "react";
import { addData, getAllData, updateData, deleteData } from "../data/db";

export default function InventoryPrices() {
  const [ingredients, setIngredients] = useState([]);
  const [form, setForm] = useState({ market: "", brand: "", item: "", unit: "", price: "" });

  useEffect(() => {
    refreshList();
  }, []);

  function refreshList() {
    getAllData("inventory").then((data) => setIngredients(data));
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function saveIngredient() {
    if (!form.item || !form.unit || !form.price) return;

    addData("inventory", {
      ...form,
      price: Number(form.price),
      createdAt: Date.now(),
    }).then(() => {
      setForm({ market: "", brand: "", item: "", unit: "", price: "" });
      refreshList();
    });
  }

  function remove(id) {
    deleteData("inventory", id).then(refreshList);
  }

  function editField(id, field, value) {
    const updated = ingredients.find((i) => i.id === id);
    updated[field] = field === "price" ? Number(value) : value;
    updateData("inventory", updated).then(refreshList);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-brand-darkbrown">Inventory Prices</h2>

      {/* Add Ingredient Form */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <input name="market" value={form.market} onChange={handleChange} placeholder="Market" className="border p-2 rounded" />
        <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" className="border p-2 rounded" />
        <input name="item" value={form.item} onChange={handleChange} placeholder="Item" className="border p-2 rounded" />
        <input name="unit" value={form.unit} onChange={handleChange} placeholder="Unit (e.g. 2000g)" className="border p-2 rounded" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price per Unit (ksh)" className="border p-2 rounded" />
      </div>

      <button onClick={saveIngredient} className="bg-brand-brown text-brand-cream px-4 py-2 rounded-xl shadow mb-8">Add Ingredient</button>

      {/* Ingredient Table */}
      <table className="w-full text-left border rounded-xl overflow-hidden shadow">
        <thead className="bg-brand-lightbrown text-white">
          <tr>
            <th className="p-2">Market</th>
            <th className="p-2">Brand</th>
            <th className="p-2">Item</th>
            <th className="p-2">Unit</th>
            <th className="p-2">Price</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((row) => (
            <tr key={row.id} className="border-b">
              <td className="p-2">{row.market}</td>
              <td className="p-2">{row.brand}</td>
              <td className="p-2">{row.item}</td>
              <td className="p-2">{row.unit}</td>
              <td className="p-2">
                <input
                  className="border p-1 w-24 rounded"
                  type="number"
                  defaultValue={row.price}
                  onBlur={(e) => editField(row.id, "price", e.target.value)}
                />
              </td>
              <td className="p-2">
                <button onClick={() => remove(row.id)} className="text-red-600 font-bold">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
