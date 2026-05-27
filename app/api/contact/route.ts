import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  website?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getTextValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validatePayload(payload: ContactPayload) {
  const name = getTextValue(payload.name);
  const email = getTextValue(payload.email);
  const company = getTextValue(payload.company);
  const message = getTextValue(payload.message);
  const website = getTextValue(payload.website);

  if (website) {
    return { ok: false as const, error: "Submission rejected." };
  }

  if (name.length < 2) {
    return { ok: false as const, error: "Please enter your name." };
  }

  if (!emailPattern.test(email)) {
    return { ok: false as const, error: "Please enter a valid email address." };
  }

  if (message.length < 20) {
    return { ok: false as const, error: "Please provide a more detailed message." };
  }

  return {
    ok: true as const,
    value: {
      name,
      email,
      company,
      message,
    },
  };
}

function getSmtpConfig() {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const contactEmail = process.env.CONTACT_EMAIL;
  const contactFromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !contactEmail) {
    return null;
  }

  return {
    smtpHost,
    smtpPort: Number(smtpPort),
    smtpUser,
    smtpPass,
    contactEmail,
    contactFromEmail: contactFromEmail ?? smtpUser,
  };
}

export async function POST(request: Request) {
  const smtpConfig = getSmtpConfig();

  if (!smtpConfig || Number.isNaN(smtpConfig.smtpPort)) {
    return NextResponse.json(
      {
        error:
          "Email delivery is not configured yet. Add SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and CONTACT_EMAIL to the environment.",
      },
      { status: 503 },
    );
  }

  const payload = (await request.json()) as ContactPayload;
  const validation = validatePayload(payload);

  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: smtpConfig.smtpHost,
    port: smtpConfig.smtpPort,
    secure: smtpConfig.smtpPort === 465,
    auth: {
      user: smtpConfig.smtpUser,
      pass: smtpConfig.smtpPass,
    },
  });

  try {
    await transporter.sendMail({
      from: smtpConfig.contactFromEmail,
      to: smtpConfig.contactEmail,
      replyTo: validation.value.email,
      subject: `Portfolio message from ${validation.value.name}`,
      text: [
        `Name: ${validation.value.name}`,
        `Email: ${validation.value.email}`,
        `Company / Role: ${validation.value.company || "Not provided"}`,
        "",
        validation.value.message,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #181613;">
          <h2 style="margin-bottom: 16px;">New portfolio message</h2>
          <p><strong>Name:</strong> ${validation.value.name}</p>
          <p><strong>Email:</strong> ${validation.value.email}</p>
          <p><strong>Company / Role:</strong> ${validation.value.company || "Not provided"}</p>
          <p style="margin-top: 20px;"><strong>Message</strong></p>
          <p>${validation.value.message.replace(/\n/g, "<br />")}</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Message sent successfully. Expect a reply soon." });
  } catch {
    return NextResponse.json(
      {
        error: "The message could not be delivered. Please verify the email configuration and try again.",
      },
      { status: 500 },
    );
  }
}