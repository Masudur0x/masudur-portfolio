export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RETELL_ENDPOINT = "https://api.retellai.com/v2/create-web-call";

export async function POST() {
  const apiKey = process.env.RETELL_API_KEY;
  const agentId = process.env.RETELL_AGENT_ID;

  if (!apiKey || !agentId) {
    return Response.json(
      { error: "Server is missing RETELL_API_KEY or RETELL_AGENT_ID" },
      { status: 500 },
    );
  }

  let res: Response;
  try {
    res = await fetch(RETELL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ agent_id: agentId }),
    });
  } catch {
    return Response.json(
      { error: "Could not reach Retell" },
      { status: 502 },
    );
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return Response.json(
      { error: `Retell rejected the call (${res.status})`, detail: text },
      { status: 502 },
    );
  }

  const data = (await res.json()) as {
    access_token?: string;
    call_id?: string;
  };

  if (!data.access_token) {
    return Response.json(
      { error: "Retell response missing access_token" },
      { status: 502 },
    );
  }

  return Response.json({
    accessToken: data.access_token,
    callId: data.call_id ?? null,
  });
}
