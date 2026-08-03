import React from "react";
import { Card } from "@/components/ui/Card";
import { IconCheck, IconShield, IconPhone, IconClock } from "@/components/icons";

export function TrustPoint({
  title,
  text,
  icon = "check",
}: {
  title: string;
  text: string;
  icon?: "check" | "shield" | "phone" | "clock";
}) {
  const iconMap = {
    check: <IconCheck className="text-green-600" size={24} />,
    shield: <IconShield className="text-blue-600" size={24} />,
    phone: <IconPhone className="text-amber-600" size={24} />,
    clock: <IconClock className="text-blue-600" size={24} />,
  };

  return (
    <Card className="h-full">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 border border-gray-100 mb-3">
        {iconMap[icon]}
      </div>
      <h4 className="text-base font-bold text-gray-900">{title}</h4>
      <p className="mt-1 text-xs text-gray-600 leading-relaxed">{text}</p>
    </Card>
  );
}
