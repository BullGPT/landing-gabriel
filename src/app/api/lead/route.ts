import { NextResponse } from "next/server";
import { deliver } from "@/lib/destinations";
import type { Lead } from "@/lib/lead";
import { DISQUALIFYING, questions } from "@/config/questions";

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

  // On répond 200 même si une intégration échoue : le lead est loggé côté
  // serveur et le prospect ne doit jamais être bloqué par un outil tiers.
  return NextResponse.json({
    ok: true,
    outcome: parsed.lead.outcome,
    warnings: failed,
  });
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

  const missing = requiredFields().find((field) => !answers[field]);
  if (missing) {
    return { ok: false, error: `missing_field:${missing}` };
  }

  return {
    ok: true,
    lead: {
      answers,
      attribution,
      outcome:
        answers[DISQUALIFYING.questionId] === DISQUALIFYING.answer
          ? "no-match"
          : "llamada",
      submittedAt: new Date().toISOString(),
    },
  };
}

/** Les questions à choix sont obligatoires ; la réponse libre ne l'est pas. */
function requiredFields(): string[] {
  const fromQuestions = questions
    .filter((q) => Boolean(q.options))
    .map((q) => q.id);
  return [...fromQuestions, "nombre", "telefono", "consentimiento"];
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
