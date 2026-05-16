import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import type { ApplicationData } from "@/types/application-types";

interface ApplicationWithId extends ApplicationData {
  id: string;
  createdAt?: string;
}

export async function POST(request: Request) {
  try {
    const applications = (await request.json()) as ApplicationWithId[];

    if (!applications || applications.length === 0) {
      return NextResponse.json(
        { error: "No applications provided" },
        { status: 400 },
      );
    }

    // Prepare data for Excel
    const excelData = applications.map((app) => ({
      ID: app.id,
      "Full Name": app.fullName,
      Email: app.email,
      Phone: app.phone,
      "Date of Birth": app.dateOfBirth,
      Gender: app.gender,
      Address: app.address,
      Nationality: app.nationality,
      Program: app.program,
      "Study Mode": app.studyMode,
      "Course of Study": app.courseOfStudy,
      Institution: app.institution,
      "Previous School": app.previousSchool,
      "O-Level Grade": app.olevelGrade,
      "Intended Graduation": app.intendedGraduation,
      "Passport Photo": app.passportPhoto ? "Yes" : "No",
      "Academic Results": app.academicResults ? "Yes" : "No",
      Essays: app.essays?.join("; ") || "",
      "Created At": app.createdAt || "",
    }));

    // Create workbook
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    const columnWidths = [
      { wch: 20 }, // ID
      { wch: 20 }, // Full Name
      { wch: 25 }, // Email
      { wch: 15 }, // Phone
      { wch: 15 }, // Date of Birth
      { wch: 10 }, // Gender
      { wch: 25 }, // Address
      { wch: 15 }, // Nationality
      { wch: 20 }, // Program
      { wch: 15 }, // Study Mode
      { wch: 20 }, // Course of Study
      { wch: 20 }, // Institution
      { wch: 20 }, // Previous School
      { wch: 15 }, // O-Level Grade
      { wch: 15 }, // Intended Graduation
      { wch: 12 }, // Passport Photo
      { wch: 12 }, // Academic Results
      { wch: 40 }, // Essays
      { wch: 20 }, // Created At
    ];

    worksheet["!cols"] = columnWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");

    // Generate buffer
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="applications-${new Date().toISOString().split("T")[0]}.xlsx"`,
      },
    });
  } catch (error) {
    console.error("Error exporting Excel:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Export failed",
      },
      { status: 500 },
    );
  }
}
