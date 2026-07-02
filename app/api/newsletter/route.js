export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return Response.json({ ok: false, error: "Missing email" }, { status: 400 });
    }

    // (Database saving removed for Phase 1 since DB is disabled)
    // For now, we just pretend it was successful so the UI shows a success message.

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Newsletter API Error:", error);
    return Response.json({ ok: false, error: "Failed to subscribe" }, { status: 500 });
  }
}
