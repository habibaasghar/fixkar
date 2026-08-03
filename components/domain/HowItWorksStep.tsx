import React from "react";

export function HowItWorksStep({
  stepNumber,
  title,
  description,
}: {
  stepNumber: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm relative">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white font-extrabold text-lg shadow-sm mb-4">
        0{stepNumber}
      </div>
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      <p className="mt-2 text-xs text-gray-600 leading-relaxed max-w-xs">{description}</p>
    </div>
  );
}

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

export function AreaCoverageList({
  cityName,
  areas,
}: {
  cityName: string;
  areas: string[];
}) {
  return (
    <div className="rounded-2xl bg-gray-50 p-6 border border-gray-100">
      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
        Active Service Areas in {cityName}
      </h4>
      <div className="mt-3 flex flex-wrap gap-2">
        {areas.map((area) => (
          <span
            key={area}
            className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 border border-gray-200"
          >
            📍 {area}
          </span>
        ))}
      </div>
    </div>
  );
}
