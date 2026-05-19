import { firestore } from "./firebase";
import type { ApplicationData } from "@/types/application-types";

export async function submitApplication(data: ApplicationData) {
  try {
    const sanitizeMeta = (meta: ApplicationData["passportPhoto"]): any =>
      meta
        ? {
            name: meta.name,
            type: meta.type,
            size: meta.size,
            hash: meta.url,
          }
        : null;

    const payload = {
      ...data,
      passportPhoto: sanitizeMeta(data.passportPhoto),
      academicResults: sanitizeMeta(data.academicResults),
      submittedAt: new Date().toISOString(),
      status: "pending",
    };

    const docRef = await firestore.collection("applications").add(payload);

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
