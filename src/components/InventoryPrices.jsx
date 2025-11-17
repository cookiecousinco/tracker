import React, { useEffect, useState } from "react";
import PremiumSlider from "./PremiumSlider";
import PremiumTable from "./PremiumTable";
import { Package, PlusCircle } from "lucide-react";

export default function Inventory() {
  // Load initial data from localStorage OR use defaults
  const defaultInventory = [
    { item: "Self-Raising Flour (2000g)", price: 180, qty: 1 },
    { item: "Milk (500ml)", price: 20, qty: 1 },
    { item: "Sugar (1kg)", price: 150, qty: 1 },
    { item: "Butter (500g)", price: 430, qty: 1 },
  ];

  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem("inventory-data");
    return saved ? JSON.parse(saved) : defaultInventory;
  });

  // Save to localStorage whenever inventory changes
  useEffect(() => {
    localStorage.setItem("inventory-data", JSON.stringify(inventory));
  }, [inventory]);

  // Update quantity through premium slider
  const updateQty = (index, newQty) => {
    const updated = [...inventory];
    updated[index].qty = newQty;
    setInventory(updated);
  };

  // Update price
  const updatePrice = (index, newPrice) => {
    const updated = [...inventory];
    updated[index].price = parseInt(newPrice) || 0;
    setInventory(updated);
  };

  // Compute totals
  const rows = inventory.map((row) => ({
    Item: row.item,
    Price: `KES ${row.price}`,
    Quantity: row.qty,
    Total: `KES ${row.qty * row.price}`,
  }));

  // Add new inventory item
  const addNewItem = () => {
    const updated = [
      ...inventory,
      { item: "New Item", price: 0, qty: 1 },
    ];
    setInventory(updated);
  };

  return (
    <div className="space-y-10">
      {/* Title Bar */}
      <div className="flex items-center gap-4">
        <Package size={38} className="text-brand-dark-pink" />
        <h1 className="font-serif text-4xl text-brand-brown">Inventory</h1>
      </div>

      {/* Inventory Items List */}
      <div className="space-y-8">
        {inventory.map((item, index) => (
          <div
            key={index}
            className="premium-card shadow-card border border-brand-pink/30"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-serif text-2xl">{item.item}</h2>
            </div>

            {/* Price Input */}
            <div className="flex items-center gap-6 mb-6">
              <label className="font-medium text-brand-brown">
                Price per unit (KES):
              </label>

              <input
                type="number"
                value={item.price}
                onChange={(e) => updatePrice(index, e.target.value)}
                className="border rounded-lg px-4 py-2 w-32 shadow-inner outline-brand-dark-pink"
              />
            </div>

            {/* Quantity Slider */}
            <div>
              <PremiumSlider
                label="Quantity"
                value={item.qty}
                onChange={(value) => updateQty(index, value)}
              />
            </div>

            {/* Total Display */}
            <div className="text-right text-xl font-semibold mt-6 text-brand-dark-pink">
              Total: KES {item.qty * item.price}
            </div>
          </div>
        ))}
      </div>

      {/* Add New Item */}
      <button
        onClick={addNewItem}
        className="flex items-center gap-2 premium-card px-5 py-3 text-xl border border-brand-dark-pink/40 hover:bg-brand-pink/20 transition"
      >
        <PlusCircle size={26} />
        Add Inventory Item
      </button>

      {/* Summary Table */}
      <div className="mt-8">
        <h2 className="font-serif text-2xl mb-4">Inventory Summary</h2>
        <PremiumTable columns={["Item", "Price", "Quantity", "Total"]} data={rows} />
      </div>
    </div>
  );
}
