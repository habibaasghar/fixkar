import Link from "next/link";
import { categories, cities } from "@/lib/services";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

export default function Home() {
  const lahore = cities[0];

  return (
    <div>
      <section className="border-b border-black/5 bg-gradient-to-b from-emerald-50 to-white">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            {lahore.name} mein Verified Home Service Professionals
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-600">
            AC Repair, Electrician, Plumbing aur Deep Cleaning — sab ek jagah.
            WhatsApp par book karein, service ke baad seedha professional ko
            pay karein.
          </p>
          <div className="mt-8 flex justify-center">
            <WhatsAppCTA message="Hi, I need a home service in Lahore." />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14">
        <h2 className="text-xl font-bold text-neutral-900">
          {lahore.name} ke liye Services
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${lahore.slug}/${cat.slug}`}
              className="group rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
            >
              <h3 className="text-lg font-bold text-neutral-900 group-hover:text-emerald-700">
                {cat.name}
              </h3>
              <p className="mt-2 text-sm text-neutral-500">
                {cat.commonIssues.slice(0, 3).join(" · ")}
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-emerald-700">
                Details dekhein →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-black/5 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-xl font-bold text-neutral-900">Hum kyun?</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <TrustPoint
              title="Verified Professionals"
              text="Har professional onboarding ke waqt verify hota hai."
            />
            <TrustPoint
              title="WhatsApp Booking"
              text="Call ya form ki zaroorat nahi — seedha WhatsApp par baat karein."
            />
            <TrustPoint
              title="Pay After Service"
              text="Kaam mukammal hone ke baad hi professional ko payment karein."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function TrustPoint({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <p className="font-semibold text-neutral-900">{title}</p>
      <p className="mt-1 text-sm text-neutral-500">{text}</p>
    </div>
  );
}
