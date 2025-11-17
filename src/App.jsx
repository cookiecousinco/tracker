import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Component imports
import BatchProduction from "./components/BatchProduction";
import Expenses from "./components/Expenses";
import InventoryPrices from "./components/InventoryPrices";
import ProfitLoss from "./components/ProfitLoss";
import RecordSales from "./components/RecordSales";
import SalesHistory from "./components/SalesHistory";

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

        {/* SIDEBAR */}
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

          {/* Sidebar links will go here */}
          <nav className="flex flex-col mt-4 space-y-3 px-4">
            <Link to="/" className="hover:underline">Batch Production</Link>
            <Link to="/expenses" className="hover:underline">Expenses</Link>
            <Link to="/inventory-prices" className="hover:underline">Inventory Prices</Link>
            <Link to="/profit-loss" className="hover:underline">Profit & Loss</Link>
            <Link to="/record-sales" className="hover:underline">Record Sales</Link>
            <Link to="/sales-history" className="hover:underline">Sales History</Link>
          </nav>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 p-6 overflow-y-auto">
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
