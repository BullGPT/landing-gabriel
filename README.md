# Landing VSL — marché espagnol

Funnel en 4 étapes, implémenté d'après la maquette Claude Design
« Landing VSL Llamada » (sources dans [`design/`](design/)).

```
/            Captura     opt-in nom + email + téléphone
/vsl         VSL         vidéo Vimeo + CTA (immédiat ou différé)
/solicitud   Formulario  questionnaire de qualification
/gracias     Gracias     confirmation, contact WhatsApp sous 24 h
```

Le lead est enregistré **deux fois** : à l'opt-in puis à la candidature. Un
prospect qui abandonne après la vidéo reste donc joignable.

## Démarrer

```bash
npm install
npm run dev
```

## À remplir avant la mise en ligne

Tous les placeholders de la maquette sont regroupés dans
[`src/config/site.ts`](src/config/site.ts) — aucun n'est codé en dur dans le JSX.

| Champ | Placeholder actuel |
| --- | --- |
| `brand` | `[MARCA]` |
| `domain` | `[DOMINIO]` |
| `whatsappNumber` | `[NÚMERO]` |
| `proof.reviewsCount` / `studentsCount` | `[X]` |
| `proof.statFigure` / `statSource` | `[CIFRA]` / `[FUENTE]` |
| `vsl.vimeoId` / `vsl.hash` | `null` (placeholder 16:9 affiché) |

Restent aussi à fournir, en tant qu'images : la capture de l'interface, la
capture d'un message d'élève, les trois témoignages vidéo et la vidéo bonus.
Chacune est signalée par un commentaire dans le composant concerné.

## Réglages du funnel

- **CTA de la VSL** — `vsl.ctaMode` : `"always"` (visible d'emblée) ou
  `"delayed"` avec `vsl.ctaDelaySeconds`, pour n'ouvrir l'accès qu'après le pitch.
- **Étape 3** — `application.mode` : `"internal"` pour le questionnaire React de
  ce repo (branché sur `/api/lead`), ou `"typeform"` avec `application.typeformId`
  pour l'embed prévu par la maquette.
- **Split test du titre** — la maquette propose 4 variantes de H1. On la choisit
  par `NEXT_PUBLIC_HERO_VARIANT=A|B|C|D`, sans redéployer de code.
- **Questions** — [`src/config/questions.ts`](src/config/questions.ts) ; ajouter
  ou retirer une question ne demande aucune modification du formulaire.

## Où arrivent les leads

`POST /api/lead` valide puis dispatche vers les destinations activées par
variable d'environnement (voir [`.env.example`](.env.example)) :

- `LEAD_WEBHOOK_URL` — webhook Make / Zapier / n8n
- `RESEND_API_KEY` + `LEAD_NOTIFY_EMAIL` — notification email

Tant qu'aucune n'est configurée, chaque lead est écrit dans les logs serveur :
rien ne se perd. Une destination en panne n'empêche jamais le prospect
d'avancer — les échecs sont loggés et l'API répond `200`.

Pour brancher une nouvelle destination (CRM, Notion, WhatsApp), ajouter une
entrée dans [`src/lib/destinations.ts`](src/lib/destinations.ts).

Les paramètres UTM et le referrer sont capturés au premier chargement, conservés
pendant la session et joints aux deux enregistrements.

## Reste à faire

- Pixels de conversion (Meta `Lead`, GA4 `generate_lead`) sur `/gracias` —
  l'emplacement est marqué par un commentaire dans la page.
- Pages légales : `/privacidad`, `/aviso-legal`, `/cookies` sont liées depuis le
  footer et l'opt-in mais n'existent pas encore.
