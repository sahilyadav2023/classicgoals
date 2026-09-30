import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, service, budget, message } = body;

    // Basic server-side validation
    if (!name || !phone || !email || !service || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Send via Resend (requires RESEND_API_KEY env var)
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "theclassicgoals00@gmail.com";

    if (RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(RESEND_API_KEY);

      await resend.emails.send({
        from: "Classic Goals Website <onboarding@resend.dev>",
        to: TO_EMAIL,
        replyTo: email,
        subject: `New Enquiry from ${name} — ${service.toUpperCase()}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #12294F; border-bottom: 2px solid #00A651; padding-bottom: 0.5rem;">
              New Website Enquiry
            </h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
              <tr><td style="padding: 0.5rem; font-weight: bold; color: #6B7280; width: 140px;">Name</td><td style="padding: 0.5rem; color: #12294F;">${name}</td></tr>
              <tr style="background: #F8F6F1;"><td style="padding: 0.5rem; font-weight: bold; color: #6B7280;">Phone</td><td style="padding: 0.5rem; color: #12294F;">${phone}</td></tr>
              <tr><td style="padding: 0.5rem; font-weight: bold; color: #6B7280;">Email</td><td style="padding: 0.5rem; color: #12294F;">${email}</td></tr>
              <tr style="background: #F8F6F1;"><td style="padding: 0.5rem; font-weight: bold; color: #6B7280;">Service</td><td style="padding: 0.5rem; color: #12294F;">${service}</td></tr>
              <tr><td style="padding: 0.5rem; font-weight: bold; color: #6B7280;">Budget</td><td style="padding: 0.5rem; color: #12294F;">${budget || "Not specified"}</td></tr>
              <tr style="background: #F8F6F1;"><td style="padding: 0.5rem; font-weight: bold; color: #6B7280; vertical-align: top;">Message</td><td style="padding: 0.5rem; color: #12294F;">${message.replace(/\n/g, "<br>")}</td></tr>
            </table>
            <p style="margin-top: 1.5rem; font-size: 12px; color: #9CA3AF;">
              Sent from classicgoals.in contact form
            </p>
          </div>
        `,
      });
    } else {
      // Log to console if no Resend key (dev mode)
      console.log("[CONTACT FORM]", { name, phone, email, service, budget, message });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[CONTACT API ERROR]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
