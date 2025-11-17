import React from "react";

/**
 * PremiumTable
 * Props:
 *  - columns: array of strings (column keys)
 *  - data: array of objects (each object keys should match columns)
 *  - dense: boolean (optional) - use smaller spacing when true
 */
export default function PremiumTable({ columns = [], data = [], dense = false }) {
  const rowClass = dense ? "py-2 px-3 text-sm" : "py-3 px-4";

  return (
    <div className="premium-card overflow-hidden">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-brand-pink/30">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`text-left ${rowClass} font-semibold text-brand-brown`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={`${rowClass} text-center text-gray-500`}>
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={idx}
                className={`transition ${idx % 2 === 0 ? "bg-white" : "bg-white/90"} hover:bg-brand-pink/10 cursor-default`}
              >
                {columns.map((col, cidx) => (
                  <td key={cidx} className={`${rowClass} text-brand-brown break-words`}>
                    {/* Show empty cell gracefully */}
                    {row[col] !== undefined && row[col] !== null ? row[col] : "—"}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
