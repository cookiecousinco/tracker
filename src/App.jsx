import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

// Component imports
import BatchProduction from "./components/BatchProduction";
import Expenses from "./components/Expenses";
import InventoryPrices from "./components/InventoryPrices";
import ProfitLoss from "./components/ProfitLoss";
import RecordSales from "./components/RecordSales";
import SalesHistory from "./components/SalesHistory";

/* ---------------------------------------------------------
   ERROR BOUNDARY — THIS IS IMPORTANT
   It will show errors *inside your page* instead of a blank screen.
----------------------------------------------------------- */
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
        <div style={{ color: "red", padding: "20px" }}>
          <h2>Component Error:</h2>
          <p>{String(this.state.error)}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ---------------------------------------------------------
   MAIN APP
----------------------------------------------------------- */
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

          {sidebarOpen && (
            <nav className="flex flex-col mt-4 space-y-3 px-4">
              <Link to="/" className="ho
