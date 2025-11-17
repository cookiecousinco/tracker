import React from "react";
import PremiumTable from "./PremiumTable";

export default function Dashboard() {
  // Example KPIs (replace with real computed values later)
  const kpis = [
    { label: "Total Revenue", value: "KES 42,300" },
    { label: "Total Expenses", value: "KES 13,800" },
    { label: "Net Profit", value: "KES 28,500" },
    { label: "Sales Today", value: "34 Packs" },
  ];

  const salesColumns = ["Item", "Packs", "Revenue"];
  const salesData = [
    { Item: "Chocolate Chip", Packs: 12, Revenue: "KES 1,800" },
    { Item: "Oatmeal Raisin", Packs: 8, Revenue: "KES 1,200" },
    { Item: "Shortbread", Packs: 14, Revenue: "KES 2,100" },
  ];

  return (
    <div className="space-y-10">
      
      {/* Title */}
      <h1 className="font-serif text-4xl text-brand-brown">
        Dashboard Overview
      </h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="premium-card text-center py-6 shadow-card border border-brand-pink/30"
          >
            <div className="text-brand-brown text-xl font-semibold">
              {kpi.label}
            </div>
            <div className="text-brand-dark-pink text-3xl font-bold mt-2">
              {kpi.value}
            </div>
          </div>
        ))}
      </div>

      {/* TREND LINE CHART */}
      <div className="premium-card">
        <h2 className="font-serif text-2xl mb-4">Weekly Profit Trend</h2>

        <svg viewBox="0 0 300 120" className="w-full h-32">
          {/* Background Line */}
          <polyline
            points="0,100 300,100"
            className="stroke-brand-pink/40"
            strokeWidth="2"
            fill="none"
          />

          {/* Trend Line */}
          <polyline
            points="0,100 50,80 100,90 150,60 200,70 250,40 300,50"
            className="stroke-brand-dark-pink"
            strokeWidth="4"
            fill="none"
          />

          {/* Trend Points */}
          {[
            { cx: 50, cy: 80 },
            { cx: 100, cy: 90 },
            { cx: 150, cy: 60 },
            { cx: 200, cy: 70 },
            { cx: 250, cy: 40 },
            { cx: 300, cy: 50 },
          ].map((point, idx) => (
            <circle
              key={idx}
              cx={point.cx}
              cy={point.cy}
              r="4"
              className="fill-brand-dark-pink"
            />
          ))}
        </svg>
      </div>

      {/* EXPENSE BREAKDOWN */}
      <div className="premium-card">
        <h2 className="font-serif text-2xl mb-6">Expense Breakdown</h2>

        <div className="space-y-4">
          {[
            { label: "Ingredients", percent: 60 },
            { label: "Electricity", percent: 20 },
            { label: "Transport", percent: 15 },
            { label: "Misc", percent: 5 },
          ].map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-1">
                <span className="font-medium">{item.label}</span>
                <span className="font-bold text-brand-dark-pink">
                  {item.percent}%
                </span>
              </div>

              <div className="w-full bg-brand-pink/30 h-4 rounded-full overflow-hidden">
                <div
                  className="bg-brand-dark-pink h-full"
                  style={{ width: `${item.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RECENT SALES TABLE */}
      <div>
        <h2 className="font-serif text-2xl mb-4">Recent Sales</h2>
        <PremiumTable columns={salesColumns} data={salesData} />
      </div>
    </div>
  );
}
