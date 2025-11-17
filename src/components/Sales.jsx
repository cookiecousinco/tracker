import React, { useEffect, useMemo, useState } from "react";
import PremiumSlider from "./PremiumSlider";
import PremiumTable from "./PremiumTable";
import { ShoppingCart, CreditCard, Wallet } from "lucide-react";

/**
 * Sales page with Custom Pack support (any cookie counts)
 *
 * Relies on BatchProduction localStorage keys:
 * - "batch-ingredients" : [{ name, qty, unitCost }, ...]
 * - "batch-yield" : number
 *
 * If those exist we compute costPerCookie = totalBatchCost / yield
 * otherwise costPerCookie defaults to 0 and user is shown a small note.
 */

const COOKIE_TYPES = [
  { key: "ruby", label: "Ruby Bite" },
  { key: "oat", label: "Golden Oat Crunch" },
  { key: "choco", label: "Choco Overload" },
  { key: "white", label: "White Gold Chip" },
  { key: "confetti", label: "Confetti Cloud" },
  { key: "ginger", label: "Ginger Snap" },
];

export default function Sales() {
  // Sales history
  const [sales, setSales] = useState(() => {
    const s = localStorage.getItem("sales-data");
    return s ? JSON.parse(s) : [];
  });

  // Pack controls
  const [packType, setPackType] = useState("6-pack"); // '6-pack' | '12-pack' | 'custom'
  const [packPrice, setPackPrice] = useState(350); // selling price for the whole pack
  const [paymentMethod, setPaymentMethod] = useState("MPESA");

  // Custom pack composition state (counts per cookie type)
  const [composition, setComposition] = useState(() => {
    // default all zeros
    const obj = {};
    COOKIE_TYPES.forEach((c) => (obj[c.key] = 0));
    return obj;
  });

  // Packs sold count (number of packs in this sale)
  const [packsSold, setPacksSold] = useState(1);

  // Read batch data to compute cost per cookie (if available)
  const batchIngredients = useMemo(() => {
    try {
      const raw = localStorage.getItem("batch-ingredients");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  const batchYield = useMemo(() => {
    try {
      const raw = localStorage.getItem("batch-yield");
      return raw ? Number(JSON.parse(raw)) : null;
    } catch {
      return null;
    }
  }, []);

  const costPerCookie = useMemo(() => {
    if (!batchIngredients || !batchYield || batchYield <= 0) return 0;
    const batchCost = batchIngredients.reduce((sum, ing) => {
      // each ingredient object expected to have { qty, unitCost }
      const qty = Number(ing.qty || 0);
      const unitCost = Number(ing.unitCost || 0);
      return sum + qty * unitCost;
    }, 0);
    return batchCost / batchYield;
  }, [batchIngredients, batchYield]);

  // Derived: total cookies in one custom pack (sum of composition)
  const totalCookiesInCustomPack = useMemo(
    () => COOKIE_TYPES.reduce((s, c) => s + Number(composition[c.key] || 0), 0),
    [composition]
  );

  // For standard packs, define packSizes
  const packSize = useMemo(() => {
    if (packType === "6-pack") return 6;
    if (packType === "12-pack") return 12;
    // custom: size is sum of composition
    return totalCookiesInCustomPack;
  }, [packType, totalCookiesInCustomPack]);

  // Cost per pack (based on costPerCookie & packSize)
  const costPerPack = useMemo(() => {
    return Number((costPerCookie * packSize).toFixed(2));
  }, [costPerCookie, packSize]);

  // Revenue and profit for this sale (one pack)
  const revenuePerPack = packPrice;
  const profitPerPack = Number((revenuePerPack - costPerPack).toFixed(2));
  const marginPercent =
    revenuePerPack > 0 ? Number(((profitPerPack / revenuePerPack) * 100).toFixed(1)) : 0;

  // Save sales persistence
  useEffect(() => {
    localStorage.setItem("sales-data", JSON.stringify(sales));
  }, [sales]);

  // Handlers
  function setCompositionValue(key, val) {
    setComposition((prev) => ({ ...prev, [key]: Number(val) }));
  }

  function recordSale() {
    // guard: pack size > 0
    if (packSize <= 0) {
      alert("Pack has no cookies. Please choose a pack or build a custom pack.");
      return;
    }

    const sale = {
      timestamp: new Date().toISOString(),
      packType,
      packsSold,
      packPrice,
      paymentMethod,
      packSize,
      composition: packType === "custom" ? { ...composition } : null,
      revenue: packsSold * revenuePerPack,
      cost: packsSold * costPerPack,
      profit: Number((packsSold * profitPerPack).toFixed(2)),
      marginPercent,
    };

    setSales((s) => [sale, ...s]);
  }

  // Table rows for history
  const tableRows = sales.map((s) => {
    // compose a small description for composition if custom
    const compDesc =
      s.composition && Object.keys(s.composition).length
        ? COOKIE_TYPES.map((c) => `${c.label}:${s.composition[c.key] || 0}`).join(", ")
        : s.packType;

    return {
      Date: new Date(s.timestamp).toLocaleString(),
      Pack: s.packType,
      Size: s.packSize,
      Packs: s.packsSold,
      Composition: compDesc,
      Payment: s.paymentMethod,
      Revenue: `KES ${s.revenue}`,
      Cost: `KES ${s.cost}`,
      Profit: `KES ${s.profit}`,
    };
  });

  return (
    <div className="space-y-10">
      {/* Title */}
      <div className="flex items-center gap-4">
        <ShoppingCart size={38} className="text-brand-dark-pink" />
        <h1 className="font-serif text-4xl text-brand-brown">Record Sale</h1>
      </div>

      {/* Top note about costPerCookie */}
      <div className="text-sm text-gray-700">
        {costPerCookie > 0 ? (
          <span>
            Cost per cookie (derived from last batch):{" "}
            <strong>KES {costPerCookie.toFixed(2)}</strong> (batch yield:{" "}
            {batchYield || "—"})
          </span>
        ) : (
          <span className="text-red-600">
            Warning: Batch cost data not found. Cost calculations will be zero until you
            set up a batch in Batch Production.
          </span>
        )}
      </div>

      {/* Entry Card */}
      <div className="premium-card border border-brand-pink/30 shadow-card">
        <h2 className="font-serif text-2xl mb-4">Sale Details</h2>

        {/* Pack Type */}
        <div className="mb-4">
          <label className="font-medium text-brand-brown">Pack Type</label>

          <div className="flex gap-3 mt-2">
            <button
              onClick={() => setPackType("6-pack")}
              className={`premium-card px-4 py-2 border ${
                packType === "6-pack" ? "border-brand-dark-pink bg-brand-pink/20" : "border-brand-pink/50"
              }`}
            >
              6-Pack
            </button>

            <button
              onClick={() => setPackType("12-pack")}
              className={`premium-card px-4 py-2 border ${
                packType === "12-pack" ? "border-brand-dark-pink bg-brand-pink/20" : "border-brand-pink/50"
              }`}
            >
              12-Pack
            </button>

            <button
              onClick={() => setPackType("custom")}
              className={`premium-card px-4 py-2 border ${
                packType === "custom" ? "border-brand-dark-pink bg-brand-pink/20" : "border-brand-pink/50"
              }`}
            >
              Custom Pack
            </button>
          </div>
        </div>

        {/* If custom, show composition sliders */}
        {packType === "custom" && (
          <div className="mb-6 space-y-4">
            <div className="text-sm text-gray-700">
              Configure how many of each cookie will be in the custom pack.
            </div>

            {COOKIE_TYPES.map((c) => (
              <div key={c.key}>
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">{c.label}</div>
                  <div className="font-semibold text-brand-dark-pink">
                    {composition[c.key] || 0}
                  </div>
                </div>

                <input
                  type="range"
                  min={0}
                  max={20}
                  value={composition[c.key] || 0}
                  onChange={(e) => setCompositionValue(c.key, e.target.value)}
                  className="w-full h-2 bg-brand-pink/30 rounded-full"
                />
              </div>
            ))}

            <div className="text-right text-sm">
              Total cookies in pack: <strong>{totalCookiesInCustomPack}</strong>
            </div>
          </div>
        )}

        {/* Pack price input */}
        <div className="flex items-center gap-6 mb-4">
          <label className="font-medium text-brand-brown">Pack Price (KES)</label>
          <input
            type="number"
            value={packPrice}
            onChange={(e) => setPackPrice(Number(e.target.value))}
            className="border rounded-lg px-4 py-2 w-36 shadow-inner outline-brand-dark-pink"
          />
        </div>

        {/* Packs sold */}
        <div className="mb-4">
          <PremiumSlider
            label="Number of packs sold in this transaction"
            value={packsSold}
            min={1}
            max={100}
            step={1}
            onChange={(v) => setPacksSold(v)}
          />
        </div>

        {/* Payment method */}
        <div className="mb-4">
          <label className="font-medium text-brand-brown">Payment Method</label>
          <div className="flex gap-4 mt-3">
            <button
              onClick={() => setPaymentMethod("MPESA")}
              className={`premium-card px-4 py-2 border ${
                paymentMethod === "MPESA" ? "border-brand-dark-pink bg-brand-pink/20" : "border-brand-pink/50"
              }`}
            >
              <CreditCard size={18} /> MPESA
            </button>

            <button
              onClick={() => setPaymentMethod("Cash")}
              className={`premium-card px-4 py-2 border ${
                paymentMethod === "Cash" ? "border-brand-dark-pink bg-brand-pink/20" : "border-brand-pink/50"
              }`}
            >
              <Wallet size={18} /> Cash
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-2 mt-6">
          <div className="flex justify-between">
            <span>Pack size</span>
            <strong>{packSize} cookies</strong>
          </div>

          <div className="flex justify-between">
            <span>Cost per pack</span>
            <strong>KES {costPerPack.toFixed(2)}</strong>
          </div>

          <div className="flex justify-between">
            <span>Revenue per pack</span>
            <strong>KES {revenuePerPack}</strong>
          </div>

          <div className="flex justify-between">
            <span>Profit per pack</span>
            <strong className="text-brand-dark-pink">KES {profitPerPack}</strong>
          </div>

          <div className="flex justify-between">
            <span>Margin</span>
            <strong>{marginPercent}%</strong>
          </div>
        </div>

        {/* Record button */}
        <div className="mt-6">
          <button
            onClick={recordSale}
            className="premium-card w-full text-center py-3 border border-brand-dark-pink/40 hover:bg-brand-pink/20 transition font-semibold"
          >
            Record Sale
          </button>
        </div>
      </div>

      {/* Sales History */}
      <div>
        <h2 className="font-serif text-2xl mb-4">Sales History</h2>
        <PremiumTable
          columns={["Date", "Pack", "Size", "Packs", "Composition", "Payment", "Revenue", "Cost", "Profit"]}
          data={tableRows}
        />
      </div>
    </div>
  );
}
