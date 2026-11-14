"use client";

import { useEffect } from "react";

export default function FirebaseAnalytics() {
  useEffect(() => {
    let active = true;

    async function initializeAnalytics() {
      const [{ firebaseApp }, { getAnalytics, isSupported }] = await Promise.all([
        import("@/lib/firebase"),
        import("firebase/analytics"),
      ]);
      if (active && (await isSupported())) {
        getAnalytics(firebaseApp);
      }
    }

    void initializeAnalytics().catch((error: unknown) => {
      console.error("Firebase Analytics initialization failed", error);
    });

    return () => {
      active = false;
    };
  }, []);

  return null;
}
