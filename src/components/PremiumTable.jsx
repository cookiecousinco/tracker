import React from "react";

export default function PremiumTable({ columns = [], data = [] }) {
  return (
    <div className="premium-card overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-brand-pink/40">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="text-left py-3 px-4 font-semibold text-brand-brown"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-gray-500"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-brand-pink/20 transition cursor-pointer"
              >
                {columns.map((col, cidx) => (
                  <td key={cidx} className="py-3 px-4 text-brand-brown">
                    {row[col]}
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
