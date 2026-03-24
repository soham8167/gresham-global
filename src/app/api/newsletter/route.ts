import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { transporter } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("[newsletter] body received:", body);

    const { email } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Valid email is required." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    console.log("[newsletter] connected to db:", db.databaseName);

    const existing = await db
      .collection("newsletter_subscribers")
      .findOne({ email });

    if (existing) {
      return NextResponse.json(
        { error: "This email is already subscribed." },
        { status: 409 }
      );
    }

    await db.collection("newsletter_subscribers").insertOne({
      email,
      subscribedAt: new Date(),
    });
    console.log("[newsletter] inserted to db");

    await transporter.sendMail({
      from:    `"Gresham Global" <${process.env.SMTP_FROM}>`,
      to:      email,
      subject: "You're subscribed to Gresham Global Newsletter!",
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:auto;padding:32px;border:1px solid #eee;border-radius:12px;">
          <h2 style="color:#dc2626;">Welcome to Gresham Global!</h2>
          <p>Thank you for subscribing to our newsletter.</p>
          <br/>
          <p style="color:#888;font-size:13px;">If you didn't subscribe, you can safely ignore this email.</p>
          <p style="color:#888;font-size:13px;">© ${new Date().getFullYear()} Gresham Global. All rights reserved.</p>
        </div>
      `,
    });
    console.log("[newsletter] confirmation email sent to:", email);

    return NextResponse.json(
      { success: true, message: "Subscribed successfully!" },
      { status: 200 }
    );

  } catch (err) {
    console.error("[newsletter] ERROR:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}