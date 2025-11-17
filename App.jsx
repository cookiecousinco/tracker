import React, { useState } from "react";

export default function App() {
  const [activeTab, setActiveTab] = useState("inventory");

  return (
    <div className="min-h-screen bg-brand-cream text-brand-brown p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center">CookieCousin.co Tracker</h1>
        <p className="text-center text-brand-lightbrown">Baked with love, tracked with precision.</p>
      </header>

      {/* Navigation Tabs */}
      <nav className="flex justify-center space-x-4 mb-10">
        {[
          { key: "inventory", label: "Inventory Prices" },
          { key: "batch", label: "Batch Production" },
          { key: "sales", label: "Record Sales" },
          { key: "history", label: "Sales History" },
          { key: "expenses", label: "Expenses" },
          { key: "pnl", label: "Profit & Loss" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold shadow 
              ${activeTab === tab.key ? "bg-brand-brown text-brand-cream" : "bg-brand-lightbrown text-white"}`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        {activeTab === "inventory" && <InventoryPrices />}
        {activeTab === "batch" && <BatchProduction />}
        {activeTab === "sales" && <RecordSales />}
        {activeTab === "history" && <SalesHistory />}
        {activeTab === "expenses" && <Expenses />}
        {activeTab === "pnl" && <ProfitLoss />}
      </main>
    </div>
  );
}

// Placeholder components — we will build them next
function InventoryPrices() {
  return <div className="text-center text-brand-darkbrown">Inventory Prices Module Coming Soon…</div>;
}
function BatchProduction() {
  return <div className="text-center text-brand-darkbrown">Batch Production Module Coming Soon…</div>;
}
function RecordSales() {
  return <div className="text-center text-brand-darkbrown">Sales Recorder Coming Soon…</div>;
}
function SalesHistory() {
  return <div className="text-center text-brand-darkbrown">Sales History Coming Soon…</div>;
}
function Expenses() {
  return <div className="text-center text-brand-darkbrown">Expenses Module Coming Soon…</div>;
}
function ProfitLoss() {
  return <div className="text-center text-brand-darkbrown">P&L Dashboard Coming Soon…</div>;
}
