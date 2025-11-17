import React, { useEffect, useState } from "react";
import { getAllData, addData } from "../data/db";

export default function BatchProduction() {
  const [ingredients, setIngredients] = useState([]);
  const [batchIngredients, setBatchIngredients] = useState([]);
  const [flavor, setFlavor] = useState("");
  const [yieldCount, setYieldCount] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    getAllData("inventory").then((data) => setIngredients(data));
  }, []);

  useEffect(() => {
    const cost = batchIngredients.reduce((sum, ing) => sum + ing.cost, 0);
    setTotalCost(cost);
  }, [batchIngredients]);

  function addIngredientRow() {
    setBatchIngredients([
      ...batchIngredients,
      { id: Date.now(), ingredientId: "", qty: 0, cost: 0 },
    ]);
  }

  function updateIngredientRow(id, field, value) {
    const updated = batchIngredients.map((row) => {
      if (row.id !== id) return row;

      if (field === "ingredientId") {
        const ing = ingredients.find((i) => i.id == value);
        return { ...row, ingredientId: value, cost: (row.qty / 1) * ing.price };
      }

      if (field === "qty") {
        const ing = ingredients.find((i) => i.id == row.ingredientId);
        const cost = ing ? (Number(value) / 1) * ing.price : 0;
        return { ...row, qty: Number(value), cost };
      }

      return row;
    });

    setBatchIngredients(updated);
  }

  function saveBatch() {
    if (!flavor || !yieldCount || batchIngredients.length === 0) return;

    const batch = {
      flavor,
      yield: Number(yieldCount),
      ingredients: batchIngredients,
      totalCost,
      costPerCookie: totalCost / Number(yieldCount),
      createdAt: Date.now(),
    };

    addData("batches", batch).then(() => {
      setFlavor("");
      setYieldCount("");
      setBatchIngredients([]);
      setTotalCost(0);
    });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-brand-darkbrown">Batch Production</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <input
          value={flavor}
          onChange={(e) => setFlavor(e.target.value)}
          placeholder="Cookie Flavor (e.g. Ruby Bite)"
          className="border p-2 rounded"
        />

        <input
          value={yieldCount}
          type="number"
          onChange={(e) => setYieldCount(e.target.value)}
          placeholder="Yield (cookies produced)"
          className="border p-2 rounded"
        />
      </div>

      <button onClick={addIngredientRow} className="bg-brand-brown text-brand-cream px-4 py-2 rounded-xl shadow mb-6">
        + Add Ingredient Used
      </button>

      {batchIngredients.map((row) => (
        <div key={row.id} className="grid grid-cols-3 gap-4 mb-4 p-4 border rounded-xl">
          <select
            className="border p-2 rounded"
            value={row.ingredientId}
            onChange={(e) => updateIngredientRow(row.id, "ingredientId", e.target.value)}
          >
            <option value="">Select Ingredient</option>
            {ingredients.map((ing) => (
              <option key={ing.id} value={ing.id}>
                {ing.item} ({ing.unit})
              </option>
            ))}
          </select>

          <input
            type="number"
            className="border p-2 rounded"
            placeholder="Qty used (same unit)"
            value={row.qty}
            onChange={(e) => updateIngredientRow(row.id, "qty", e.target.value)}
          />

          <div className="p-2 font-semibold text-brand-darkbrown">Cost: KSh {row.cost.toFixed(2)}</div>
        </div>
      ))}

      <div className="mt-6 p-4 bg-brand-lightbrown text-white rounded-xl text-lg font-bold">
        Total Batch Cost: KSh {totalCost.toFixed(2)} <br />
        Cost Per Cookie: KSh {yieldCount ? (totalCost / yieldCount).toFixed(2) : "0.00"}
      </div>

      <button
        onClick={saveBatch}
        className="mt-6 bg-brand-brown text-brand-cream px-6 py-3 rounded-xl shadow text-lg font-bold"
      >
        Save Batch
      </button>
    </div>
  );
}
