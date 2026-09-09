import type { Lead } from "./lead";

/**
 * Destinations des leads. Chaque destination est activée par sa variable
 * d'environnement : si elle est absente, la destination est simplement ignorée.
 * Pour en brancher une nouvelle (CRM, Notion, WhatsApp), ajouter une fonction
 * ici et l'inscrire dans `destinations`.
 */

type Destination = {
  name: string;
  enabled: () => boolean;
  send: (lead: Lead) => Promise<void>;
};

const webhook: Destination = {
  name: "webhook",
  enabled: () => Boolean(process.env.LEAD_WEBHOOK_URL),
  async send(lead) {
    const res = await fetch(process.env.LEAD_WEBHOOK_URL!, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) {
      throw new Error(`webhook responded ${res.status}`);
    }
  },
};

const resendEmail: Destination = {
  name: "email",
  enabled: () =>
    Boolean(process.env.RESEND_API_KEY && process.env.LEAD_NOTIFY_EMAIL),
  async send(lead) {
    const rows = Object.entries(lead.answers)
      .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escapeHtml(v)}</td></tr>`)
      .join("");
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.LEAD_FROM_EMAIL ?? "onboarding@resend.dev",
        to: process.env.LEAD_NOTIFY_EMAIL,
        subject: `Nuevo lead: ${lead.answers.nombre ?? "sin nombre"}`,
        html: `<table>${rows}</table>`,
      }),
    });
    if (!res.ok) {
      throw new Error(`resend responded ${res.status}`);
    }
  },
};

const destinations: Destination[] = [webhook, resendEmail];

/**
 * Envoie le lead vers toutes les destinations actives.
 * Une destination qui échoue n'empêche pas les autres : on ne veut jamais
 * perdre un lead à cause d'une intégration tierce en panne.
 */
export async function deliver(lead: Lead): Promise<{ delivered: string[]; failed: string[] }> {
  const active = destinations.filter((d) => d.enabled());

  if (active.length === 0) {
    // Aucune destination branchée : on log pour ne rien perdre pendant le dev.
    console.log("[lead] aucune destination configurée:", JSON.stringify(lead));
    return { delivered: [], failed: [] };
  }

  const results = await Promise.allSettled(active.map((d) => d.send(lead)));
  const delivered: string[] = [];
  const failed: string[] = [];

  results.forEach((r, i) => {
    if (r.status === "fulfilled") {
      delivered.push(active[i].name);
    } else {
      failed.push(active[i].name);
      console.error(`[lead] ${active[i].name} a échoué:`, r.reason);
    }
  });

  if (failed.length > 0) {
    console.error("[lead] contenu non délivré:", JSON.stringify(lead));
  }

  return { delivered, failed };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
