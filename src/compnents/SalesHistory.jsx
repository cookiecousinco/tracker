import React, { useEffect, useState } from "react";
import { getAllData, deleteData } from "../data/db";

export default function SalesHistory() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    loadSales();
  }, []);

  function loadSales() {
    getAllData("sales").then((data) => {
      const sorted = data.sort((a, b) => b.createdAt - a.createdAt);
      setSales(sorted);
    });
  }

  function remove(id) {
    deleteData("sales", id).then(loadSales);
  }

  function formatDate(ts) {
    return new Date(ts).toLocaleString();
  }

  const totalRevenue = sales.reduce((sum, s) => sum + s.totalRevenue, 0);
  const totalProfit = sales.reduce((sum, s) => sum + s.profit, 0);

  const mpesaTotal = sales
    .filter((s) => s.payment === "MPESA")
    .reduce((sum, s) => sum + s.totalRevenue, 0);

  const cashTotal = sales
    .filter((s) => s.payment === "Cash")
    .reduce((sum, s) => sum + s.totalRevenue, 0);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-brand-darkbrown">Sales History</h2>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6 text-white font-bold">
        <div className="bg-brand-lightbrown p-4 rounded-xl">Total Revenue: KSh {totalRevenue.toFixed(2)}</div>
        <div className="bg-brand-brown p-4 rounded-xl">Total Profit: KSh {totalProfit.toFixed(2)}</div>
        <div className="bg-green-700 p-4 rounded-xl">MPESA: KSh {mpesaTotal.toFixed(2)} | Cash: KSh {cashTotal.toFixed(2)}</div>
      </div>

      {/* Sales Table */}
      <table className="w-full text-left border rounded-xl overflow-hidden shadow">
        <thead className="bg-brand-lightbrown text-white">
          <tr>
            <th className="p-2">Date</th>
            <th className="p-2">Pack</th>
            <th className="p-2">Flavor</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Price</th>
            <th className="p-2">Revenue</th>
            <th className="p-2">Profit</th>
            <th className="p-2">Payment</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((row) => (
            <tr key={row.id} className="border-b">
              <td className="p-2">{formatDate(row.createdAt)}</td>
              <td className="p-2">{row.packType}</td>
              <td className="p-2">{row.flavor}</td>
              <td className="p-2">{row.quantity}</td>
              <td className="p-2">KSh {row.price}</td>
              <td className="p-2">KSh {row.totalRevenue.toFixed(2)}</td>
              <td className="p-2">KSh {row.profit.toFixed(2)}</td>
              <td className="p-2">{row.payment}</td>
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
