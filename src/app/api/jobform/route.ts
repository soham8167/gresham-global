import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { transporter } from "@/lib/mailer";
import { v2 as cloudinary } from "cloudinary";

// ── Cloudinary config ──
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ALLOWED_MIME_TYPES: Record<string, string> = {
  "application/pdf":                                                            "pdf",
  "application/msword":                                                         "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":   "docx",
  "application/vnd.ms-powerpoint":                                              "ppt",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
};

const MAX_FILE_SIZE_MB    = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const fullName       = (formData.get("fullName")       as string)?.trim();
    const email          = (formData.get("email")          as string)?.trim();
    const phone          = (formData.get("phone")          as string)?.trim();
    const city           = (formData.get("city")           as string)?.trim();
    const workExperience = (formData.get("workExperience") as string)?.trim();
    const about          = (formData.get("about")          as string)?.trim();
    const jobTitle       = (formData.get("jobTitle")       as string)?.trim();
    const jobId          = (formData.get("jobId")          as string)?.trim();
    const resume         = formData.get("resume") as File | null;

    // ── Validation ──
    if (!fullName || !email || !phone || !city || !workExperience || !about) {
      return NextResponse.json(
        { error: "All required fields must be filled." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!resume || resume.size === 0) {
      return NextResponse.json(
        { error: "Please upload your CV/Resume." },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES[resume.type]) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: PDF, DOC, DOCX, PPT, PPTX." },
        { status: 400 }
      );
    }

    if (resume.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: `File size must be under ${MAX_FILE_SIZE_MB}MB.` },
        { status: 400 }
      );
    }

    // ── Read file buffer ONCE — reused for Cloudinary + email attachment ──
    const fileExt     = ALLOWED_MIME_TYPES[resume.type];
    const arrayBuffer = await resume.arrayBuffer();
    const buffer      = Buffer.from(arrayBuffer);  // ← kept in memory for attachment
    const base64File  = buffer.toString("base64");
    const dataUri     = `data:${resume.type};base64,${base64File}`;

    // ── Upload to Cloudinary (for permanent storage backup) ──
    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder:        "gresham-global/job-applications",
      resource_type: "raw",
      public_id:     `${Date.now()}-${fullName.replace(/\s+/g, "_")}-resume.${fileExt}`,
      use_filename:  false,
      type:          "upload",
    });

    const resumeUrl = uploadResult.secure_url;
    console.log("[jobform] resume uploaded to Cloudinary:", resumeUrl);

    // ── Save to MongoDB ──
    const client = await clientPromise;
    const db     = client.db();

    await db.collection("job_applications").insertOne({
      fullName,
      email,
      phone,
      city,
      workExperience,
      about,
      jobTitle:    jobTitle    || "",
      jobId:       jobId       || "",
      resumeUrl,
      submittedAt: new Date(),
    });
    console.log("[jobform] saved to MongoDB");

    // ── Email styles ──
    const rowStyle   = "padding:8px 0;border-bottom:1px solid #f0f0f0;";
    const labelStyle = "color:#888;font-size:13px;width:140px;vertical-align:top;padding-right:12px;";
    const valueStyle = "font-size:14px;color:#222;";

    // ── Summary table — team email only ──
    const summaryTable = `
      <table style="width:100%;border-collapse:collapse;">
        <tr style="${rowStyle}"><td style="${labelStyle}">Name</td>            <td style="${valueStyle}">${fullName}</td></tr>
        <tr style="${rowStyle}"><td style="${labelStyle}">Email</td>           <td style="${valueStyle}">${email}</td></tr>
        <tr style="${rowStyle}"><td style="${labelStyle}">Phone</td>           <td style="${valueStyle}">${phone}</td></tr>
        <tr style="${rowStyle}"><td style="${labelStyle}">City</td>            <td style="${valueStyle}">${city}</td></tr>
        <tr style="${rowStyle}"><td style="${labelStyle}">Work Experience</td> <td style="${valueStyle}">${workExperience}</td></tr>
        <tr style="${rowStyle}"><td style="${labelStyle}">Position Applied</td><td style="${valueStyle}">${jobTitle || "—"}</td></tr>
        <tr>
          <td style="${labelStyle};vertical-align:top;">About</td>
          <td style="${valueStyle}">${about}</td>
        </tr>
      </table>
    `;

    // ── Confirmation email → applicant (simple message only) ──
    await transporter.sendMail({
      from:    `"Gresham Global" <${process.env.SMTP_FROM}>`,
      to:      email,
      subject: `Application Received — ${jobTitle || "Position"} | Gresham Global`,
      html: `
        <div style="font-family:sans-serif;max-width:540px;margin:auto;padding:32px;border:1px solid #eee;border-radius:12px;">
          <h2 style="color:#dc2626;margin-top:0;">Hi ${fullName},</h2>
          <p>Thank you for applying to <strong>${jobTitle || "the position"}</strong> at <strong>Gresham Global</strong>.</p>
          <p>We've received your application and our team will review it shortly.</p>
          <p>We'll be in touch if your profile matches our requirements.</p>
          <br/>
          <p style="color:#888;font-size:13px;">© ${new Date().getFullYear()} Gresham Global. All rights reserved.</p>
        </div>
      `,
    });
    console.log("[jobform] confirmation email sent to:", email);

    // ── Notification email → team with summary table + CV directly attached ──
    await transporter.sendMail({
      from:    `"Gresham Global Careers" <${process.env.SMTP_FROM}>`,
      to:      process.env.SMTP_FROM,
      subject: `New Job Application — ${jobTitle || "Position"} from ${fullName}`,
      html: `
        <div style="font-family:sans-serif;max-width:540px;margin:auto;padding:32px;border:1px solid #eee;border-radius:12px;">
          <h2 style="color:#dc2626;margin-top:0;">New Job Application</h2>
          ${summaryTable}
          <br/>
          <p style="color:#888;font-size:12px;color:#555;">CV is attached to this email.</p>
          <p style="color:#888;font-size:13px;">Submitted at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
        </div>
      `,
      // ── THIS is the fix — CV attached directly as a file ──
      attachments: [
        {
          filename:    `${fullName.replace(/\s+/g, "_")}-resume.${fileExt}`,
          content:     buffer,
          contentType: resume.type,
        },
      ],
    });
    console.log("[jobform] notification email with CV attachment sent to team");

    return NextResponse.json(
      { success: true, message: "Application submitted successfully!" },
      { status: 200 }
    );

  } catch (err) {
    console.error("[jobform] ERROR:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}