import React from "react";

export default function PremiumSlider({ label, value, min = 0, max = 100, step = 1, onChange }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="font-semibold text-lg">{label}</span>
        <span className="text-brand-dark-pink font-semibold">{value}</span>
      </div>

      <div className="relative w-full">
        <input
          type="range"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          className="
            w-full appearance-none h-3 rounded-full 
            bg-brand-pink/40 shadow-inner 
            accent-brand-dark-pink
            cursor-pointer
          "
          style={{
            WebkitAppearance: "none",
          }}
        />

        {/* Custom Thumb */}
        <style>{`
          input[type='range']::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 24px;
            width: 24px;
            border-radius: 50%;
            background: white;
            border: 3px solid #ff9aae;
            box-shadow: 0 4px 10px rgba(0,0,0,0.15);
            cursor: pointer;
            transition: transform 0.15s ease;
          }
          input[type='range']::-webkit-slider-thumb:hover {
            transform: scale(1.18);
          }
        `}</style>
      </div>
    </div>
  );
}
