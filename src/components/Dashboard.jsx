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

  // Example Recent Sales
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

      {/* Trend Chart */}
      <div className="premium-card">
        <h2 className="font-serif text-2xl mb-4">Weekly Profit Trend</h2>

        <svg viewBox="0 0 300 120" className="w-full h-32">
          {/* Background line */}
          <polyline
            points="0,100 300,100"
            className="stroke-brand-pink/40"
            strokeWidth="2"
            fill="none"
          />
          {/* Trend Line */}
          <polyline
            points="0,100 50,80 100,90 150,60 200,70 250,
