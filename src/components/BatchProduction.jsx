import React, { useState, useEffect } from "react";
import PremiumSlider from "./PremiumSlider";
import PremiumTable from "./PremiumTable";
import { ChefHat, PlusCircle } from "lucide-react";

export default function BatchProduction() {
  // Default ingredient usage for a batch
  const defaultIngredients = [
    { name: "Self-Raising Flour (g)", qty: 500, unitCost: 180 / 2000 }, // cost per gram
    { name: "Milk (ml)", qty: 200, unitCost: 20 / 500 },                // cost per ml
    { name: "Sugar (g)", qty: 150, unitCost: 150 / 1000 },              // cost per gram
    { name: "Butter (g)", qty: 200, unitCost: 430 / 500 },              // cost per gram
  ];

  const [ingredients, setIngredients] = useState(() => {
    const saved = localStorage.getItem("batch-ingredients");
    return saved ? JSON.parse(saved) : defaultIngredients;
  });

  const [yieldCount, setYieldCount] = useState(() => {
    const saved = localStorage.getItem("batch-yield");
    return saved ? JSON.parse(saved) : 24; // default 24 cookies per batch
  });

  useEffect(() => {
    localStorage.setItem("batch-ingredients", JSON.stringify(ingredients));
    localStorage.setItem("batch-yield", JSON.stringify(yieldCount));
  }, [ingredients, yieldCount]);

  // Update ingredient usage
  const updateQty = (index, newQty) => {
    const updated = [...ingredients];
    updated[index].qty = newQty;
    setIngredients(updated);
  };

  // Update unit cost manually
  const updateUnitCost = (index, cost) => {
    const updated = [...ingredients];
    updated[index].unitCost = parseFloat(cost) || 0;
    setIngredients(updated);
  };

  // Add a new ingredient line
  const addIngredient = () => {
    const updated = [
      ...ingredients,
      { name: "New Ingredient", qty: 0, unitCost: 0 },
    ];
    setIngredients(updated);
  };

  // Compute total cost for single ingredient
  const ingredientTotal = (i) => (i.qty * i.unitCost).toFixed(2);

  // Compute batch totals
  const batchCost = ingredients.reduce(
    (sum, i) => sum + i.qty * i.unitCost,
    0
  );

  const costPerCookie = batchCost / yieldCount;
  const costPerPack = costPerCookie * 6; // assuming 6 cookies per pack

  // Prepare table rows
  const tableRows = ingredients.map((i) => ({
    Ingredient: i.name,
    "Usage": `${i.qty}`,
    "Unit Cost": `KES ${i.unitCost.toFixed(2)}`,
    "Total": `KES ${ingredientTotal(i)}`
  }));

  return (
    <div className="space-y-10">
      {/* Title */}
      <div className="flex items-center gap-4">
        <ChefHat size={38} className="text-brand-dark-pink" />
        <h1 className="font-serif text-4xl text-brand-brown">Batch Production</h1>
      </div>

      {/* Ingredient Cards */}
      <div className="space-y-8">
        {ingredients.map((ing, index) => (
          <div
            key={index}
            className="premium-card border border-brand-pink/30 shadow-card"
          >
            <h2 className="font-serif text-2xl mb-4">{ing.name}</h2>

            {/* Unit Cost */}
            <div className="flex items-center gap-6 mb-6">
              <label className="font-medium text-brand-brown">
                Unit Cost (KES):
              </label>

              <input
                type="number"
                value={ing.unitCost}
                onChange={(e) => updateUnitCost(index, e.target.value)}
                className="border rounded-lg px-4 py-2 w-32 shadow-inner outline-brand-dark-pink"
              />
            </div>

            {/* Quantity Slider */}
            <PremiumSlider
              label="Quantity Used"
              value={ing.qty}
              onChange={(v) => updateQty(index, v)}
            />

            {/* Total */}
            <div className="text-right text-xl font-semibold mt-6 text-brand-dark-pink">
              Total: KES {ingredientTotal(ing)}
            </div>
          </div>
        ))}
      </div>

      {/* Add Ingredient */}
      <button
        onClick={addIngredient}
        className="premium-card flex items-center gap-2 px-5 py-3 text-xl border border-brand-dark-pink/40 hover:bg-brand-pink/20 transition"
      >
        <PlusCircle size={26} />
        Add Ingredient
      </button>

      {/* Batch Yield */}
      <div className="premium-card border border-brand-pink/30 shadow-card">
        <h2 className="font-serif text-2xl mb-4">Batch Yield</h2>

        <PremiumSlider
          label="Cookies Produced"
          value={yieldCount}
          onChange={(v) => setYieldCount(v)}
        />
      </div>

      {/* Summary */}
      <div className="premium-card border border-brand-pink/30 shadow-card">
        <h2 className="font-serif text-2xl mb-6">Cost Summary</h2>

        <div className="space-y-3">
          <div className="flex justify-between text-lg">
            <span>Total Batch Cost:</span>
            <span className="font-bold text-brand-dark-pink">KES {batchCost.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-lg">
            <span>Cost per Cookie:</span>
            <span className="font-bold text-brand-dark-pink">
              KES {costPerCookie.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between text-lg">
            <span>Cost per Pack (6 cookies):</span>
            <span className="font-bold text-brand-dark-pink">
              KES {costPerPack.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div>
        <h2 className="font-serif text-2xl mb-4">Batch Ingredient Table</h2>
        <PremiumTable
          columns={["Ingredient", "Usage", "Unit Cost", "Total"]}
          data={tableRows}
        />
      </div>
    </div>
  );
}
