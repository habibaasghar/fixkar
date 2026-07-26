import Link from "next/link";
import { SITE_NAME } from "@/lib/site-config";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-extrabold tracking-tight text-emerald-700">
          {SITE_NAME}
        </Link>
        <a
          href="tel:+923000000000"
          className="text-sm font-medium text-neutral-600 hover:text-emerald-700"
        >
          Lahore · Verified Pros
        </a>
      </div>
    </header>
  );
}
