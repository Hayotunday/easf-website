import nodemailer from "nodemailer";
import type { ApplicationData } from "@/types/application-types";

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

function formatSection(title: string, value: string) {
  return `<p><strong>${title}</strong><br/>${value.replace(/\n/g, "<br/>")}</p>`;
}

export async function sendApplicationEmail(data: ApplicationData) {
  const html = `
    <h1>New Scholarship Application</h1>
    <p>A new applicant has submitted the scholarship form.</p>
    ${formatSection("Full Name", data.fullName)}
    ${formatSection("Email", data.email)}
    ${formatSection("Phone", data.phone)}
    ${formatSection("Date of Birth", data.dateOfBirth)}
    ${formatSection("Gender", data.gender)}
    ${formatSection("Address", data.address)}
    ${formatSection("Nationality", data.nationality)}
    ${formatSection("Program", data.program)}
    ${formatSection("Study Mode", data.studyMode)}
    ${formatSection("Course of Study", data.courseOfStudy)}
    ${formatSection("Preferred Institution", data.institution)}
    ${formatSection("Previous School", data.previousSchool)}
    ${formatSection("O-Level Summary", data.olevelGrade)}
    ${formatSection("Expected Graduation Year", data.intendedGraduation)}
    <p><strong>Essays</strong></p>
    ${data.essays
      .map(
        (essay, index) =>
          `<p><strong>Question ${index + 1}</strong><br/>${essay
            .trim()
            .replace(/\n/g, "<br/>")}</p>`,
      )
      .join("")}
    <p><strong>Passport Photo Uploaded</strong>: ${data.passportPhoto ? "Yes" : "No"}</p>
    <p><strong>Academic Results Uploaded</strong>: ${data.academicResults ? "Yes" : "No"}</p>
  `;

  const text = `New Scholarship Application\n
Full Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}
Date of Birth: ${data.dateOfBirth}
Gender: ${data.gender}
Address: ${data.address}
Nationality: ${data.nationality}
Program: ${data.program}
Study Mode: ${data.studyMode}
Course of Study: ${data.courseOfStudy}
Preferred Institution: ${data.institution}
Previous School: ${data.previousSchool}
O-Level Summary: ${data.olevelGrade}
Expected Graduation Year: ${data.intendedGraduation}

Essays:\n${data.essays
    .map((essay, index) => `Question ${index + 1}: ${essay}`)
    .join("\n\n")}

Passport Photo Uploaded: ${data.passportPhoto ? "Yes" : "No"}
Academic Results Uploaded: ${data.academicResults ? "Yes" : "No"}
`;

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
