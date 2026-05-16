import { firestore } from "./firebase";
import type { ApplicationData } from "@/types/application-types";

export async function submitApplication(data: ApplicationData) {
  try {
    const docRef = await firestore.collection("applications").add({
      ...data,
      submittedAt: new Date().toISOString(),
      status: "pending",
    });

    return {
      success: true,
      applicationId: docRef.id,
    };
  } catch (error) {
    console.error("Error submitting application:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
