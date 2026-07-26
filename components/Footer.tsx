import { SITE_NAME } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-black/5 bg-neutral-50">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-neutral-500">
        <p>
          {SITE_NAME} — Verified home service professionals in Lahore.
          Booking is via WhatsApp; you pay the professional directly after
          the job is done.
        </p>
        <p className="mt-2">
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
