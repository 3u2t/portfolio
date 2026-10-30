"use client";

import { useEffect } from "react";

// Fires a lightweight site beacon once per page load.
// Server side it is rate-limited per IP and does nothing
// unless notification delivery is configured. Best-effort only.
export default function SiteBeacon() {
  useEffect(() => {
    try {
      const img = new Image();
      img.src = "/api/health";
    } catch {
      /* best-effort */
    }
  }, []);
  return null;
}
