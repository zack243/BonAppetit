import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not set");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Bon Appétit RDC <contact@bonappetit.cd>",
        to: ["contact@bonappetit.cd"],
        reply_to: email,
        subject: `Nouveau message de ${name} — Bon Appétit RDC`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #1D5D2B; padding: 24px; border-radius: 12px 12px 0 0;">
              <h2 style="color: #F4D233; margin: 0; font-size: 22px;">Nouveau message — Bon Appétit RDC</h2>
            </div>
            <div style="background: #FFF8EC; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid rgba(29,93,43,0.1);">
              <p><strong>Nom :</strong> ${name}</p>
              <p><strong>Email :</strong> ${email}</p>
              ${phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : ""}
              <hr style="border: none; border-top: 1px solid rgba(29,93,43,0.1); margin: 16px 0;" />
              <p><strong>Message :</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
