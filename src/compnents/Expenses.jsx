import React, { useEffect, useState } from "react";
import { addData, getAllData, deleteData } from "../data/db";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ category: "", amount: "", notes: "" });

  const CATEGORIES = [
    "Electricity",
    "Transport",
    "Packaging",
    "Ingredients (Extra)",
    "Marketing",
    "Maintenance",
    "Miscellaneous",
  ];

  useEffect(() => {
    loadExpenses();
  }, []);

  function loadExpenses() {
    getAllData("expenses").then((data) => {
      const sorted = data.sort((a, b) => b.createdAt - a.createdAt);
      setExpenses(sorted);
    });
  }

  function setField(field, value) {
    setForm({ ...form, [field]: value });
  }

  function saveExpense() {
    if (!form.category || !form.amount) return;

    const expense = {
      ...form,
      amount: Number(form.amount),
      createdAt: Date.now(),
    };

    addData("expenses", expense).then(() => {
      setForm({ category: "", amount: "", notes: "" });
      loadExpenses();
    });
  }

  function remove(id) {
    deleteData("expenses", id).then(loadExpenses);
  }

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  function formatDate(ts) {
    return new Date(ts).toLocaleString();
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-brand-darkbrown">Expenses</h2>

      {/* Expense Form */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <select
          className="border p-2 rounded"
          value={form.category}
          onChange={(e) => setField("category", e.target.value)}
        >
          <option value="">Select Category</option>
          {CATEGORIES.map((c, idx) => (
            <option key={idx} value={c}>{c}</option>
          ))}
        </select>

        <input
          type="number"
          className="border p-2 rounded"
          placeholder="Amount (KSh)"
          value={form.amount}
          onChange={(e) => setField("amount", e.target.value)}
        />

        <input
          className="border p-2 rounded"
          placeholder="Notes (optional)"
          value={form.notes}
          onChange={(e) => setField("notes", e.target.value)}
        />
      </div>

      <button
        onClick={saveExpense}
        className="bg-brand-brown text-brand-cream px-6 py-3 rounded-xl shadow mb-8"
      >
        Add Expense
      </button>

      {/* Total */}
      <div className="p-4 bg-brand-lightbrown text-white rounded-xl font-bold mb-6">
        Total Expenses Recorded: KSh {totalExpenses.toFixed(2)}
      </div>

      {/* Expenses Table */}
      <table className="w-full text-left border rounded-xl overflow-hidden shadow">
        <thead className="bg-brand-lightbrown text-white">
          <tr>
            <th className="p-2">Date</th>
            <th className="p-2">Category</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Notes</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e.id} className="border-b">
              <td className="p-2">{formatDate(e.createdAt)}</td>
              <td className="p-2">{e.category}</td>
              <td className="p-2">KSh {e.amount.toFixed(2)}</td>
              <td className="p-2">{e.notes}</td>
              <td className="p-2">
                <button
                  onClick={() => remove(e.id)}
                  className="text-red-600 font-bold"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
