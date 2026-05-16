import { NextResponse } from "next/server";
import { firestore } from "@/lib/firebase";

export async function GET() {
  try {
    const db = firestore;

    const applicationsRef = db.collection("applications");
    const snapshot = await applicationsRef.get();

    const applications = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
