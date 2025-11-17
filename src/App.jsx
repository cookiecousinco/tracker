import React, { useState } from "react";

export default function App() {
  const [activeTab, setActiimport React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import all components
import InventoryPrices from "./components/InventoryPrices";
import BatchProduction from "./components/BatchProduction";
import RecordSales from "./components/RecordSales";
import SalesHistory from "./components/SalesHistory";
import Expenses from "./components/Expenses";
import ProfitLoss from "./components/ProfitLoss";

export default function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <div className="flex h-screen w-screen overflow-hidden">
        {/* Sidebar */}
        <div
          className={`bg-brand-brown text-brand-cream h-full transition-all duration-300 shadow-xl flex flex-col ${
            collapsed ? "w-16" : "w-64"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 font-bold text-xl border-b border-brand-lightbrown">
            {!collapsed && <span>Cookie Cousin</span>}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-brand-cream font-bold text-lg"
            >
              {collapsed ? "▶" : "◀"}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-2 space-y-2">
            <SidebarLink to="/inventory" label="Inventory" collapsed={collapsed} />
            <SidebarLink to="/batch" label="Batch Production" collapsed={collapsed} />
            <SidebarLink to="/sales" label="Record Sales" collapsed={collapsed} />
            <SidebarLink to="/history" label="Sales History" collapsed={collapsed} />
            <SidebarLink to="/expenses" label="Expenses" collapsed={collapsed} />
            <SidebarLink to="/pl" label="Profit & Loss" collapsed={collapsed} />
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-8 bg-brand-cream text-brand-darkbrown">
          <Routes>
            <Route path="/inventory" element={<InventoryPrices />} />
            <Route path="/batch" element={<BatchProduction />} />
            <Route path="/sales" element={<RecordSales />} />
            <Route path="/history" element={<SalesHistory />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/pl" element={<ProfitLoss />} />
            <Route path="*" element={<Welcome />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function SidebarLink({ to, label, collapsed }) {
  return (
    <Link
      to={to}
      className="block px-3 py-2 rounded-lg hover:bg-brand-lightbrown hover:text-white transition"
    >
      {collapsed ? label[0] : label}
    </Link>
  );
}

function Welcome() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome to Cookie Cousin Tracker</h1>
      <p className="text-lg">Use the sidebar to navigate through the system.</p>
    </div>
  );
}
veTab] = useState("inventory");

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
