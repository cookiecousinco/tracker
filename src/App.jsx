import React, { useState } from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";

// Lucide Icons
import {
  Menu,
  Package,
  Receipt,
  ClipboardList,
  PieChart,
  ShoppingBag,
  Clock,
} from "lucide-react";

// Pages
import BatchProduction from "./components/BatchProduction";
import Expenses from "./components/Expenses";
import InventoryPrices from "./components/InventoryPrices";
import ProfitLoss from "./components/ProfitLoss";
import RecordSales from "./components/RecordSales";
import SalesHistory from "./components/SalesHistory";
import Dashboard from "./components/Dashboard"; // You will add this later

// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, color: "red" }}>
          <h2>Component Error:</h2>
          <p>{String(this.state.error)}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="flex h-screen bg-brand-cream">

        {/* ❄️ Animated Glass Sidebar */}
        <div
          className={`glass-sidebar transition-all duration-500 flex flex-col rounded-r-premium
          ${sidebarOpen ? "w-72" : "w-20"}`}
        >
          {/* Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-4 text-black hover:text-brand-dark-pink transition"
          >
            <Menu size={28} />
          </button>

          {/* Navigation */}
          <nav className="flex flex-col mt-6 space-y-4 px-4">

            <Link to="/" className="premium-link flex items-center space-x-3">
              <Package size={22} />
              {sidebarOpen && <span>Batch Production</span>}
            </Link>

            <Link to="/expenses" className="premium-link flex items-center space-x-3">
              <Receipt size={22} />
              {sidebarOpen && <span>Expenses</span>}
            </Link>

            <Link to="/inventory-prices" className="premium-link flex items-center space-x-3">
              <ClipboardList size={22} />
              {sidebarOpen && <span>Inventory Prices</span>}
            </Link>

            <Link to="/profit-loss" className="premium-link flex items-center space-x-3">
              <PieChart size={22} />
              {sidebarOpen && <span>Profit & Loss</span>}
            </Link>

            <Link to="/record-sales" className="premium-link flex items-center space-x-3">
              <ShoppingBag size={22} />
              {sidebarOpen && <span>Record Sales</span>}
            </Link>

            <Link to="/sales-history" className="premium-link flex items-center space-x-3">
              <Clock size={22} />
              {sidebarOpen && <span>Sales History</span>}
            </Link>

          </nav>
        </div>

        {/* 🌟 Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">

          <Routes>

            <Route
              path="/"
              element={
                <ErrorBoundary>
                  <BatchProduction />
                </ErrorBoundary>
              }
            />

            <Route
              path="/expenses"
              element={
                <ErrorBoundary>
                  <Expenses />
                </ErrorBoundary>
              }
            />

            <Route
              path="/inventory-prices"
              element={
                <ErrorBoundary>
                  <InventoryPrices />
                </ErrorBoundary>
              }
            />

            <Route
              path="/profit-loss"
              element={
                <ErrorBoundary>
                  <ProfitLoss />
                </ErrorBoundary>
              }
            />

            <Route
              path="/record-sales"
              element={
                <ErrorBoundary>
                  <RecordSales />
                </ErrorBoundary>
              }
            />

            <Route
              path="/sales-history"
              element={
                <ErrorBoundary>
                  <SalesHistory />
                </ErrorBoundary>
              }
            />

          </Routes>
        </div>
      </div>
    </Router>
  );
}
