import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

// Import your components
import BatchProduction from "./components/BatchProduction";
import Expenses from "./components/Expenses";
import InventoryPrices from "./components/InventoryPrices";
import ProfitLoss from "./components/ProfitLoss";
import RecordSales from "./components/RecordSales";
import SalesHistory from "./components/SalesHistory";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="flex h-screen bg-brand-cream">
        
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "w-64" : "w-16"
          } bg-brand-pink text-white transition-all duration-300 flex flex-col`}
        >
          <button
            className="bg-brand-dark-pink p-3"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "◀" : "▶"}
          </button>

          {sidebarOpen && (
            <nav className="flex flex-col mt-4 space-y-3 px-4">
              <Link to="/" className="hover:underline">Batch Production</Link>
              <Link to="/expenses" className="hover:underline">Expenses</Link>
              <Link to="/inventory-prices" className="hover:underline">Inventory Prices</Link>
              <Link to="/profit-loss" className="hover:underline">Profit & Loss</Link>
              <Link to="/record-sales" className="hover:underline">Record Sales</Link>
              <Link to="/sales-history" className="hover:underline">Sales History</Link>
            </nav>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<BatchProduction />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/inventory-prices" element={<InventoryPrices />} />
            <Route path="/profit-loss" element={<ProfitLoss />} />
            <Rout
