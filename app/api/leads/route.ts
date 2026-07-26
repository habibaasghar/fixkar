// MVP placeholder: logs the lead server-side.
// TODO: replace with a Supabase insert once the DB is set up (see BUSINESS_PLAN.md).
export async function POST(request: Request) {
  const body = await request.json();
  const { name, phone, city, service, area } = body ?? {};

  if (!name || !phone || !service) {
    return Response.json(
      { ok: false, error: "Name, phone, and service are required." },
      { status: 400 }
    );
  }

  console.log("[lead]", { name, phone, city, service, area, at: new Date().toISOString() });

  return Response.json({ ok: true });
}
