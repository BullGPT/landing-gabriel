import { NextResponse } from "next/server";
import { deliver } from "@/lib/destinations";
import type { Lead, LeadStage } from "@/lib/lead";
import { questions } from "@/config/questions";

export const runtime = "nodejs";

const MAX_FIELD_LENGTH = 2000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = parseLead(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  const { failed } = await deliver(parsed.lead);

  // On répond 200 même si une intégration échoue : le lead est loggé côté
  // serveur et le prospect ne doit jamais être bloqué par un outil tiers.
  return NextResponse.json({ ok: true, warnings: failed });
}

function parseLead(
  body: unknown,
): { ok: true; lead: Lead } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "invalid_body" };
  }

  const raw = body as Record<string, unknown>;
  const stage = raw.stage;
  if (stage !== "optin" && stage !== "solicitud") {
    return { ok: false, error: "invalid_stage" };
  }

  const answers = sanitizeRecord(raw.answers);
  const attribution = sanitizeRecord(raw.attribution);

  const missing = requiredFields(stage).find((field) => !answers[field]);
  if (missing) {
    return { ok: false, error: `missing_field:${missing}` };
  }

  if (stage === "optin" && !EMAIL_RE.test(answers.email)) {
    return { ok: false, error: "invalid_email" };
  }

  return {
    ok: true,
    lead: {
      stage: stage as LeadStage,
      answers,
      attribution,
      submittedAt: new Date().toISOString(),
    },
  };
}

function requiredFields(stage: LeadStage): string[] {
  if (stage === "optin") {
    return ["nombre", "email", "telefono", "consentimiento"];
  }
  return questions
    .filter((q) => q.kind === "choice" || q.required)
    .map((q) => q.id);
}

function sanitizeRecord(value: unknown): Record<string, string> {
  if (typeof value !== "object" || value === null) return {};
  const out: Record<string, string> = {};
  for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
    if (typeof entry === "string" && entry.trim()) {
      out[key] = entry.trim().slice(0, MAX_FIELD_LENGTH);
    }
  }
  return out;
}
