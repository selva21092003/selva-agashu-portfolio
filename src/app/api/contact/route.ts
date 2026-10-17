import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Simple in-memory rate limiter (5 requests per 10 minutes per IP)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.lastReset > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";

    // Rate Limiting Check
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many messages sent. Please wait a few minutes before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, subject, message, honeypot } = body;

    // 1. Honeypot Anti-Spam Check
    if (honeypot && honeypot.trim() !== "") {
      // Silently accept without sending to confuse bots
      return NextResponse.json({ success: true, message: "Message dispatched successfully." });
    }

    // 2. Input Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Please provide a valid name (at least 2 characters)." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json({ error: "Please provide a message with at least 10 characters." }, { status: 400 });
    }

    const cleanName = name.trim().slice(0, 100);
    const cleanEmail = email.trim().toLowerCase().slice(0, 120);
    const cleanSubject = (subject && typeof subject === "string" && subject.trim().length > 0)
      ? subject.trim().slice(0, 150)
      : `Portfolio Message from ${cleanName}`;
    const cleanMessage = message.trim().slice(0, 3000);

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "selvaagashu@gmail.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio Inquiries <onboarding@resend.dev>";

    // 3. Fallback when API key is not yet configured
    if (!apiKey || apiKey === "your_resend_api_key_here") {
      console.warn("[Contact API] RESEND_API_KEY is not set. Simulating email dispatch.");
      return NextResponse.json({
        success: true,
        message: "Message recorded in development mode (Configure RESEND_API_KEY in .env.local to send live emails).",
        simulated: true,
      });
    }

    // 4. Send via Resend
    const resend = new Resend(apiKey);

    const formattedTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short",
    });

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f17; color: #f1f5f9; padding: 24px; }
    .container { max-width: 580px; margin: 0 auto; background-color: #131a29; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 16px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #0284c7 0%, #059669 100%); padding: 20px 24px; color: #ffffff; }
    .header h2 { margin: 0; font-size: 20px; font-weight: 700; }
    .header p { margin: 4px 0 0 0; font-size: 12px; opacity: 0.85; }
    .body { padding: 24px; }
    .field-group { margin-bottom: 16px; }
    .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; margin-bottom: 4px; font-weight: 600; }
    .field-value { font-size: 14px; color: #f8fafc; font-weight: 500; }
    .message-box { background-color: #080b12; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 16px; margin-top: 12px; font-size: 14px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap; }
    .footer { padding: 16px 24px; background-color: #0e1422; border-top: 1px solid rgba(255, 255, 255, 0.08); text-align: center; font-size: 11px; color: #64748b; }
    .tag { display: inline-block; padding: 2px 8px; border-radius: 6px; font-size: 10px; font-family: monospace; background: rgba(2, 132, 199, 0.2); color: #38bdf8; border: 1px solid rgba(2, 132, 199, 0.4); }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>📬 New Portfolio Inquiry</h2>
      <p>Received via Selva Agashu's Portfolio Contact Dispatcher</p>
    </div>
    <div class="body">
      <div class="field-group">
        <div class="field-label">Sender Name</div>
        <div class="field-value">${cleanName}</div>
      </div>
      <div class="field-group">
        <div class="field-label">Sender Email</div>
        <div class="field-value">
          <a href="mailto:${cleanEmail}" style="color: #38bdf8; text-decoration: none;">${cleanEmail}</a>
        </div>
      </div>
      <div class="field-group">
        <div class="field-label">Subject / Role</div>
        <div class="field-value">${cleanSubject}</div>
      </div>
      <div class="field-group">
        <div class="field-label">Message Content</div>
        <div class="message-box">${cleanMessage}</div>
      </div>
      <div style="margin-top: 20px;">
        <span class="tag">IP: ${ip}</span>
        <span class="tag" style="margin-left: 6px;">Time: ${formattedTime} (IST)</span>
      </div>
    </div>
    <div class="footer">
      Hit "Reply" in your email client to directly reply to ${cleanName} (&lt;${cleanEmail}&gt;).
    </div>
  </div>
</body>
</html>
    `;

    const data = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: cleanEmail,
      subject: `[Portfolio] ${cleanSubject}`,
      html: emailHtml,
      text: `New message from ${cleanName} (${cleanEmail}):\n\nSubject: ${cleanSubject}\n\n${cleanMessage}\n\nTime: ${formattedTime}`,
    });

    if (data.error) {
      console.error("[Contact API] Resend error:", data.error);
      return NextResponse.json({ error: data.error.message || "Failed to send message via email provider." }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Message dispatched directly to Selva Agashu.",
      id: data.data?.id,
    });
  } catch (err: unknown) {
    console.error("[Contact API] Internal error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request. Please try again or reach out directly." },
      { status: 500 }
    );
  }
}
