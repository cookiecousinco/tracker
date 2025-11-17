import React, { useEffect, useState } from "react";
import { getAllData, addData } from "../data/db";

export default function RecordSales() {
  const [batches, setBatches] = useState([]);
  const [salesForm, setSalesForm] = useState({
    packType: "",
    flavor: "",
    quantity: 1,
    price: "",
    payment: "MPESA",
  });

  const PACK_OPTIONS = [
    { key: "fullhouse", label: "Full House (6)" },
    { key: "parade", label: "Parade (12)" },
    { key: "loyal6", label: "Loyal Batch (6)" },
    { key: "baker13", label: "Baker's Dozen (13)" },
  ];

  const PACK_SIZES = {
    fullhouse: 6,
    parade: 12,
    loyal6: 6,
    baker13: 13,
  };

  useEffect(() => {
    getAllData("batches").then((data) => setBatches(data));
  }, []);

  function setField(field, value) {
    setSalesForm({ ...salesForm, [field]: value });
  }

  function calculateCostPerPack() {
    const size = PACK_SIZES[salesForm.packType];
    if (!size || !salesForm.flavor) return 0;

    const latestBatch = batches
      .filter((b) => b.flavor.toLowerCase() === salesForm.flavor.toLowerCase())
      .sort((a, b) => b.createdAt - a.createdAt)[0];

    if (!latestBatch) return 0;

    return latestBatch.costPerCookie * size;
  }

  function saveSale() {
    const packSize = PACK_SIZES[salesForm.packType];
    if (!packSize || !salesForm.price || !salesForm.flavor) return;

    const costPerPack = calculateCostPerPack();

    const saleRecord = {
      ...salesForm,
      quantity: Number(salesForm.quantity),
      packSize,
      totalRevenue: Number(salesForm.price) * Number(salesForm.quantity),
      costPerPack,
      totalCost: costPerPack * Number(salesForm.quantity),
      profit: (Number(salesForm.price) - costPerPack) * Number(salesForm.quantity),
      createdAt: Date.now(),
    };

    addData("sales", saleRecord).then(() => {
      setSalesForm({ packType: "", flavor: "", quantity: 1, price: "", payment: "MPESA" });
    });
  }

  const uniqueFlavors = [...new Set(batches.map((b) => b.flavor))];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-brand-darkbrown">Record Sales</h2>

      {/* Form */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <select
          className="border p-2 rounded"
          value={salesForm.packType}
          onChange={(e) => setField("packType", e.target.value)}
        >
          <option value="">Select Pack Type</option>
          {PACK_OPTIONS.map((p) => (
            <option key={p.key} value={p.key}>{p.label}</option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={salesForm.flavor}
          onChange={(e) => setField("flavor", e.target.value)}
        >
          <option value="">Select Flavor</option>
          {uniqueFlavors.map((f, idx) => (
            <option key={idx} value={f}>{f}</option>
          ))}
        </select>

        <input
          type="number"
          className="border p-2 rounded"
          placeholder="Quantity Sold"
          min="1"
          value={salesForm.quantity}
          onChange={(e) => setField("quantity", e.target.value)}
        />

        <input
          className="border p-2 rounded"
          placeholder="Selling Price per Pack"
          value={salesForm.price}
          onChange={(e) => setField("price", e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={salesForm.payment}
          onChange={(e) => setField("payment", e.target.value)}
        >
          <option value="MPESA">MPESA</option>
          <option value="Cash">Cash</option>
        </select>
      </div>

      {/* Cost Calculation Display */}
      <div className="p-4 bg-brand-lightbrown text-white rounded-xl mb-6 font-bold">
        Cost per Pack: KSh {calculateCostPerPack().toFixed(2)}
      </div>

      <button
        onClick={saveSale}
        className="bg-brand-brown text-brand-cream px-6 py-3 rounded-xl shadow text-lg font-bold"
      >
        Save Sale
      </button>
    </div>
  );
}
