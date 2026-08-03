import React from "react";

export function PricingTable({
  priceRanges,
  note,
}: {
  priceRanges: { item: string; range: string }[];
  note?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-3 font-semibold">Service Type</th>
              <th className="px-4 py-3 font-semibold text-right">Approximate Market Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {priceRanges.map((p) => (
              <tr key={p.item} className="hover:bg-gray-50/50">
                <td className="px-4 py-3.5 font-medium text-gray-900">{p.item}</td>
                <td className="px-4 py-3.5 text-right font-bold text-blue-600">{p.range}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <p className="text-[11px] text-gray-500 italic">{note}</p>}
    </div>
  );
}
