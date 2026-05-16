import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "./firebase";
import type { ApplicationData } from "@/types/application-types";

export async function submitApplication(data: ApplicationData) {
  console.log("Submitting form");
  try {
    console.log("submitting 1");
    const docRef = await addDoc(collection(firestore, "applications"), {
      ...data,
      submittedAt: serverTimestamp(),
      status: "pending",
    });

    console.log("submitting 2");
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
