import nodemailer from "nodemailer";
import type { ApplicationData } from "@/types/application-types";
import { questions } from "./data";

const { EMAIL_USER, EMAIL_PASS, EMAIL_TO } = process.env;

if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_TO) {
  throw new Error(
    "Missing SMTP configuration. Add EMAIL_USER, EMAIL_PASS, and EMAIL_TO to your environment.",
  );
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function safeText(value?: string) {
  return (value ?? "").toString().trim();
}

function htmlEscape(value?: string) {
  return (value ?? "")
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br/>");
}

function formatRow(label: string, value?: string) {
  return `<tr style="border-bottom:1px solid #e5e7eb;"><td style="padding:8px 0;font-weight:700;vertical-align:top;width:180px;">${htmlEscape(
    label,
  )}</td><td style="padding:8px 0;">${htmlEscape(value)}</td></tr>`;
}

function formatEssay(essay: string, index: number) {
  return `
    <div style="margin-bottom:14px;padding:14px;border:1px solid #e5e7eb;border-radius:12px;background:#f8fafc;">
      <div style="font-weight:700;margin-bottom:8px;">Question ${index + 1}</div>
      <div style="line-height:1.6;color:#111;">${htmlEscape(essay || "(not provided)")}</div>
    </div>
  `;
}

export async function sendApplicationEmail(data: ApplicationData) {
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#111;line-height:1.6;">
      <div style="margin-bottom:24px;padding:20px;border:1px solid #e5e7eb;border-radius:16px;background:#f8fafc;">
        <h1 style="margin:0 0 8px;font-size:24px;color:#0f172a;">New EASF Scholarship Application</h1>
        <p style="margin:0;color:#475569;">A new application has been submitted. Review the applicant details, academic information, essays, and uploads below.</p>
      </div>

      <section style="margin-bottom:24px;">
        <h2 style="margin:0 0 12px;font-size:18px;color:#0f172a;">Applicant Details</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#111;">
          ${formatRow("Full Name", data.fullName)}
          ${formatRow("Email", data.email)}
          ${formatRow("Phone", data.phone)}
          ${formatRow("Date of Birth", data.dateOfBirth)}
          ${formatRow("Gender", data.gender)}
          ${formatRow("Nationality", data.nationality)}
          ${formatRow("Address", data.address)}
        </table>
      </section>

      <section style="margin-bottom:24px;">
        <h2 style="margin:0 0 12px;font-size:18px;color:#0f172a;">Academic Information</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#111;">
          ${formatRow("Program", data.program)}
          ${formatRow("Study Mode", data.studyMode)}
          ${formatRow("Course of Study", data.courseOfStudy)}
          ${formatRow("Vocational Course", data.vocationalCourse)}
          ${formatRow("Previous School", data.previousSchool)}
          ${formatRow("O-Level Summary", data.olevelGrade)}
          ${formatRow("Graduation Year", data.yearGraduation)}
        </table>
      </section>

      <section style="margin-bottom:24px;">
        <h2 style="margin:0 0 12px;font-size:18px;color:#0f172a;">Essays</h2>
        ${(data.essays || []).map((essay, index) => formatEssay(safeText(essay), index)).join("")}
      </section>

      <section style="margin-bottom:24px;">
        <h2 style="margin:0 0 12px;font-size:18px;color:#0f172a;">Upload Summary</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#111;">
          ${formatRow("Passport Photo", data.passportPhoto ? `Yes (${htmlEscape(data.passportPhoto.name)})` : "No")}
          ${formatRow("Academic Results", data.academicResults ? `Yes (${htmlEscape(data.academicResults.name)})` : "No")}
        </table>
      </section>

      <div style="padding:16px;border:1px solid #e5e7eb;border-radius:14px;background:#f1f5f9;color:#475569;font-size:13px;">
        Message: This email contains the completed EASF application details. Reply to the applicant at <a href="mailto:${htmlEscape(data.email)}" style="color:#2563eb;">${htmlEscape(data.email)}</a>.
      </div>
    </div>
  `;

  const text = `New Scholarship Application\n\nFull Name: ${safeText(data.fullName)}\nEmail: ${safeText(data.email)}\nPhone: ${safeText(data.phone)}\nDate of Birth: ${safeText(data.dateOfBirth)}\nGender: ${safeText(data.gender)}\nNationality: ${safeText(data.nationality)}\nAddress: ${safeText(data.address)}\n\nAcademic Information:\nProgram: ${safeText(data.program)}\nStudy Mode: ${safeText(data.studyMode)}\nCourse of Study: ${safeText(data.courseOfStudy)}\nVocational Course: ${safeText(data.vocationalCourse)}\nPrevious School: ${safeText(data.previousSchool)}\nO-Level Summary: ${safeText(data.olevelGrade)}\nGraduation Year: ${safeText(data.yearGraduation)}\n\nEssays:\n${(
    data.essays || []
  )
    .map(
      (essay, index) =>
        `${index + 1}. ${questions[index]}\nAnswer: ${safeText(essay)}`,
    )
    .join(
      "\n\n",
    )}\n\nPassport Photo: ${data.passportPhoto ? `Yes (${safeText(data.passportPhoto.name)})` : "No"}\nAcademic Results: ${data.academicResults ? `Yes (${safeText(data.academicResults.name)})` : "No"}\n\nReply to: ${safeText(data.email)}\n`;

  try {
    const info = await transporter.sendMail({
      from: `"${data.fullName}" <${EMAIL_USER}>`,
      to: EMAIL_TO,
      subject: `New EASF Application from ${data.fullName}`,
      replyTo: data.email,
      text,
      html,
    });

    return {
      success: true,
      info,
      sentFrom: data.email,
      applicantFrom: data.email,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown email error",
    };
  }
}
