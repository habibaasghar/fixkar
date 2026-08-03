"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconWrench, IconPhone, IconShield, IconUser } from "@/components/icons";
import { whatsappUrl } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: <IconWrench size={20} /> },
    { href: "/services", label: "Services", icon: <IconWrench size={20} /> },
    {
      href: whatsappUrl("Hi, I need emergency home service in Lahore."),
      label: "Emergency",
      icon: <IconPhone size={20} />,
      isExternal: true,
      isHighlight: true,
    },
    { href: "/trust-safety", label: "Trust", icon: <IconShield size={20} /> },
    { href: "/partner", label: "Partner", icon: <IconUser size={20} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur-md md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          if (item.isExternal) {
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center text-amber-600 font-bold text-[10px]"
              >
                <div className="p-1 rounded-full bg-amber-100">{item.icon}</div>
                <span className="mt-0.5">{item.label}</span>
              </a>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center text-[10px] font-semibold transition ${
                isActive ? "text-blue-600 font-bold" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {item.icon}
              <span className="mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
