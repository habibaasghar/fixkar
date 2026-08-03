import React from "react";

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
