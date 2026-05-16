import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } =
  process.env;

const privateKey = FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
const hasAdminCredentials = Boolean(
  FIREBASE_PROJECT_ID && FIREBASE_CLIENT_EMAIL && privateKey,
);

const app = getApps().length
  ? getApps()[0]
  : initializeApp(
      hasAdminCredentials
        ? {
            credential: cert({
              projectId: FIREBASE_PROJECT_ID,
              clientEmail: FIREBASE_CLIENT_EMAIL,
              privateKey,
            }),
          }
        : undefined,
    );

export const firestore = getFirestore(app);
