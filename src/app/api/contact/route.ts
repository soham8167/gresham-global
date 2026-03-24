import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { transporter } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("[contact] body received:", body);

    const { fullName, email, designation, organisation, services, message } = body;

    if (!fullName?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Full name and email are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    console.log("[contact] connected to db:", db.databaseName);

    await db.collection("contact_submissions").insertOne({
      fullName:     fullName.trim(),
      email:        email.trim(),
      designation:  designation?.trim()  || "",
      organisation: organisation?.trim() || "",
      services:     Array.isArray(services) ? services : [],
      message:      message?.trim()         || "",
      submittedAt:  new Date(),
    });
    console.log("[contact] inserted to db");

    const servicesHtml =
      Array.isArray(services) && services.length > 0
        ? `<ul style="margin:4px 0;padding-left:18px;">${services
            .map((s: string) => `<li>${s}</li>`)
            .join("")}</ul>`
        : "<span>—</span>";

    const rowStyle   = "padding:8px 0;border-bottom:1px solid #f0f0f0;";
    const labelStyle = "color:#888;font-size:13px;width:120px;vertical-align:top;padding-right:12px;";
    const valueStyle = "font-size:14px;color:#222;";

    const summaryTable = `
      <table style="width:100%;border-collapse:collapse;">
        <tr style="${rowStyle}"><td style="${labelStyle}">Name</td>         <td style="${valueStyle}">${fullName}</td></tr>
        <tr style="${rowStyle}"><td style="${labelStyle}">Email</td>        <td style="${valueStyle}">${email}</td></tr>
        <tr style="${rowStyle}"><td style="${labelStyle}">Designation</td>  <td style="${valueStyle}">${designation  || "—"}</td></tr>
        <tr style="${rowStyle}"><td style="${labelStyle}">Organisation</td> <td style="${valueStyle}">${organisation || "—"}</td></tr>
        <tr style="${rowStyle}"><td style="${labelStyle};vertical-align:top;">Services</td><td style="${valueStyle}">${servicesHtml}</td></tr>
        <tr>                    <td style="${labelStyle};vertical-align:top;">Message</td> <td style="${valueStyle}">${message || "—"}</td></tr>
      </table>
    `;

    // Confirmation email → user
    await transporter.sendMail({
      from:    `"Gresham Global" <${process.env.SMTP_FROM}>`,
      to:      email,
      subject: "We received your message — Gresham Global",
      html: `
        <div style="font-family:sans-serif;max-width:540px;margin:auto;padding:32px;border:1px solid #eee;border-radius:12px;">
          <h2 style="color:#dc2626;margin-top:0;">Hi ${fullName},</h2>
          <p>Thank you for reaching out to <strong>Gresham Global</strong>.</p>
          <p>We've received your message and our team will get back to you shortly.</p>
          <hr style="margin:24px 0;border:none;border-top:1px solid #eee;" />
          <p style="font-weight:600;margin-bottom:12px;">Your submission summary:</p>
          ${summaryTable}
          <br/>
          <p style="color:#888;font-size:13px;">© ${new Date().getFullYear()} Gresham Global. All rights reserved.</p>
        </div>
      `,
    });
    console.log("[contact] confirmation email sent to:", email);

    // Notification email → team
    await transporter.sendMail({
      from:    `"Gresham Global Website" <${process.env.SMTP_FROM}>`,
      to:      process.env.SMTP_FROM,
      subject: `New Contact Form Submission — ${fullName}`,
      html: `
        <div style="font-family:sans-serif;max-width:540px;margin:auto;padding:32px;border:1px solid #eee;border-radius:12px;">
          <h2 style="color:#dc2626;margin-top:0;">New Contact Submission</h2>
          ${summaryTable}
          <br/>
          <p style="color:#888;font-size:13px;">Submitted at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
        </div>
      `,
    });
    console.log("[contact] notification email sent to team");

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );

  } catch (err) {
    console.error("[contact] ERROR:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}