import { NextResponse } from "next/server";
import { sendApplicationEmail } from "@/lib/email";
import { submitApplication } from "@/lib/firebase-service";
import type { ApplicationData } from "@/types/application-types";

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as ApplicationData;

    if (!data.fullName || !data.email) {
      return NextResponse.json(
        { success: false, error: "Missing required application fields." },
        { status: 400 },
      );
    }

    const firestoreResult = await submitApplication(data);
    if (!firestoreResult.success) {
      return NextResponse.json(
        { success: false, error: firestoreResult.error },
        { status: 500 },
      );
    }

    const emailResult = await sendApplicationEmail(data);
    if (!emailResult.success) {
      return NextResponse.json(
        { success: false, error: emailResult.error },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      applicationId: firestoreResult.applicationId,
      email: {
        sentFrom: emailResult.sentFrom,
        applicantFrom: emailResult.applicantFrom,
        info: emailResult.info,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 },
    );
  }
}
