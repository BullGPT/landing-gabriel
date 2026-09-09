"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/** Capture les UTM au premier chargement, sur n'importe quelle page d'entrée. */
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
