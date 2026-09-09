import { NextResponse } from "next/server";
import { deliver } from "@/lib/destinations";
import type { Lead } from "@/lib/lead";
import { questions } from "@/config/questions";

export const runtime = "nodejs";

const MAX_FIELD_LENGTH = 2000;

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

  // On répond 200 même en cas d'échec d'une intégration : le lead est loggé
  // côté serveur et le prospect ne doit jamais voir une erreur à cette étape.
  return NextResponse.json({ ok: true, warnings: failed });
}

function parseLead(
  body: unknown,
): { ok: true; lead: Lead } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "invalid_body" };
  }

  const raw = body as Record<string, unknown>;
  const answers = sanitizeRecord(raw.answers);
  const attribution = sanitizeRecord(raw.attribution);

  for (const question of questions) {
    const isRequired = question.kind === "choice" || question.required;
    if (isRequired && !answers[question.id]) {
      return { ok: false, error: `missing_field:${question.id}` };
    }
  }

  const email = answers.email ?? "";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return { ok: false, error: "invalid_email" };
  }

  return {
    ok: true,
    lead: { answers, attribution, submittedAt: new Date().toISOString() },
  };
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
