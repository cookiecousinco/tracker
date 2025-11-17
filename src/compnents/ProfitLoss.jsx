import React, { useEffect, useState } from "react";
import { getAllData } from "../data/db";

export default function ProfitLoss() {
  const [sales, setSales] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    getAllData("sales").then(setSales);
    getAllData("expenses").then(setExpenses);
    getAllData("batches").then(setBatches);
  }, []);

  const totalRevenue = sales.reduce((sum, s) => sum + s.totalRevenue, 0);
  const totalCOGS = sales.reduce((sum, s) => sum + s.totalCost, 0);
  const grossProfit = totalRevenue - totalCOGS;

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = grossProfit - totalExpenses;

  const mpesaRevenue = sales
    .filter((s) => s.payment === "MPESA")
    .reduce((sum, s) => sum + s.totalRevenue, 0);
  const cashRevenue = sales
    .filter((s) => s.payment === "Cash")
    .reduce((sum, s) => sum + s.totalRevenue, 0);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-brand-darkbrown">Profit & Loss Dashboard</h2>

      {/* Summary Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8 font-bold text-white">
        <div className="bg-brand-brown p-6 rounded-xl">
          <h3>Total Revenue</h3>
          <p className="text-2xl">KSh {totalRevenue.toFixed(2)}</p>
        </div>

        <div className="bg-brand-lightbrown p-6 rounded-xl">
          <h3>Total COGS</h3>
          <p className="text-2xl">KSh {totalCOGS.toFixed(2)}</p>
        </div>

        <div className="bg-green-700 p-6 rounded-xl">
          <h3>Gross Profit</h3>
          <p className="text-2xl">KSh {grossProfit.toFixed(2)}</p>
        </div>

        <div className="bg-red-700 p-6 rounded-xl">
          <h3>Total Expenses</h3>
          <p className="text-2xl">KSh {totalExpenses.toFixed(2)}</p>
        </div>

        <div className="bg-blue-800 p-6 rounded-xl col-span-2">
          <h3>Net Profit</h3>
          <p className="text-3xl">KSh {netProfit.toFixed(2)}</p>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-2 gap-6 mb-12 font-bold text-white">
        <div className="bg-green-600 p-6 rounded-xl">
          <h3>MPESA Revenue</h3>
          <p className="text-2xl">KSh {mpesaRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-yellow-600 p-6 rounded-xl">
          <h3>Cash Revenue</h3>
          <p className="text-2xl">KSh {cashRevenue.toFixed(2)}</p>
        </div>
      </div>

      {/* Quick Batch Summary */}
      <h3 className="text-xl font-bold mb-4 text-brand-darkbrown">Batch Production Summary</h3>
      <table className="w-full text-left border rounded-xl overflow-hidden shadow mb-10">
        <thead className="bg-brand-lightbrown text-white">
          <tr>
            <th className="p-2">Flavor</th>
            <th className="p-2">Yield</th>
            <th className="p-2">Total Cost</th>
            <th className="p-2">Cost per Cookie</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((b) => (
            <tr key={b.id} className="border-b">
              <td className="p-2">{b.flavor}</td>
              <td className="p-2">{b.yield}</td>
              <td className="p-2">KSh {b.totalCost.toFixed(2)}</td>
              <td className="p-2">KSh {b.costPerCookie.toFixed(2)}</td>
              <td className="p-2">{new Date(b.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
