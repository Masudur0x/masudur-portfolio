export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface LeadPayload {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  intent?: string;
  budget?: string;
  message?: string;
  source?: string;
  transcript?: { role: "user" | "assistant"; content: string }[];
}

export async function POST(req: Request) {
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    return Response.json(
      { error: "Server missing LEAD_WEBHOOK_URL" },
      { status: 500 },
    );
  }

  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = (body.name ?? "").trim().slice(0, 120);
  const email = (body.email ?? "").trim().slice(0, 200);
  const phone = (body.phone ?? "").trim().slice(0, 60);
  const company = (body.company ?? "").trim().slice(0, 160);
  const intent = (body.intent ?? "").trim().slice(0, 500);
  const budget = (body.budget ?? "").trim().slice(0, 60);
  const message = (body.message ?? "").trim().slice(0, 4000);
  const source = (body.source ?? "chat").trim().slice(0, 60);
  const transcript = Array.isArray(body.transcript)
    ? body.transcript.slice(-30)
    : [];

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json(
      { error: "Name and a valid email are required" },
      { status: 400 },
    );
  }

  const transcriptText = transcript
    .map((m) => `${m.role === "user" ? "Visitor" : "AI"}: ${m.content}`)
    .join("\n");

  const notesParts = [
    budget ? `Budget: ${budget}` : "",
    message,
    transcriptText ? `\n--- Conversation ---\n${transcriptText}` : "",
  ].filter(Boolean);

  const payload = {
    full_name: name,
    email,
    phone,
    company,
    interest: intent,
    notes: notesParts.join("\n\n"),
    source,
  };

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return Response.json(
        { error: `n8n webhook returned ${res.status}`, detail: detail.slice(0, 500) },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json(
      { error: "Failed to reach n8n webhook", detail: (err as Error).message },
      { status: 502 },
    );
  }
}
