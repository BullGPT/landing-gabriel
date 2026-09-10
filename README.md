# Landing VSL — marché espagnol

Implémentation de la maquette Claude Design « Landing VSL Llamada »
(sources dans [`design/`](design/)).

```
/           Landing : VSL + formulaire de réservation verrouillé
/gracias    Appel réservé
/no-match   Prospect non qualifié, redirigé vers l'offre d'entrée
```

Le formulaire est **verrouillé** tant que la vidéo n'a pas atteint 22:30 sur
24:00. On ne peut pas avancer dans la vidéo : pause et retour de 10 s
uniquement. Au franchissement du seuil, le formulaire se déverrouille et la page
défile jusqu'à lui.

## Démarrer

```bash
npm install
npm run dev
```

### Tester le déverrouillage sans attendre 22 minutes

```bash
NEXT_PUBLIC_PREVIEW_SPEED=300 npm run dev
```

L'horloge avance alors 300× plus vite : le formulaire s'ouvre en ~5 secondes.
**Cette variable doit valoir 1 en production.**

## À remplir avant la mise en ligne

Les placeholders de la maquette sont regroupés dans
[`src/config/site.ts`](src/config/site.ts).

| Champ | Placeholder actuel |
| --- | --- |
| `brand` | `[MARCA]` |
| `midTicketName` | `[NOMBRE DEL MID TICKET]` |
| `vsl.vimeoId` / `vsl.hash` | `null` — voir ci-dessous |

Restent aussi à fournir : la miniature de la VSL, et les trois emplacements de
preuve sociale marqués `POR RELLENAR` sur la page. La maquette les laisse vides
à dessein — pas de faux témoignage.

## La vidéo

Tant que `vsl.vimeoId` vaut `null`, le lecteur affiche un placeholder et
l'horloge est **simulée** : la page est testable, mais le compteur tourne même
sans vidéo.

Dès qu'un `vimeoId` est renseigné, c'est le lecteur Vimeo qui donne l'heure via
son SDK ([`useVimeoBridge.ts`](src/components/vsl/useVimeoBridge.ts)) — le
compteur ne peut plus avancer sans lecture réelle. Le chrome Vimeo est masqué
(`controls=0`) puisque la page fournit ses propres boutons.

Réglages dans `site.vsl` : `durationSeconds` (1440 = 24:00) et
`unlockAtSeconds` (1350 = 22:30).

## Où arrivent les leads

`POST /api/lead` valide les réponses, calcule l'issue (`llamada` ou `no-match`)
côté serveur, puis dispatche vers les destinations activées par variable
d'environnement (voir [`.env.example`](.env.example)) :

- `LEAD_WEBHOOK_URL` — webhook Make / Zapier / n8n
- `RESEND_API_KEY` + `LEAD_NOTIFY_EMAIL` — notification email

Tant qu'aucune n'est configurée, chaque lead est écrit dans les logs serveur :
rien ne se perd. Une destination en panne n'empêche jamais le prospect
d'avancer. Pour en brancher une nouvelle, ajouter une entrée dans
[`src/lib/destinations.ts`](src/lib/destinations.ts).

Les UTM et le referrer sont capturés au premier chargement et joints au lead.

## Questionnaire

[`src/config/questions.ts`](src/config/questions.ts) — 7 questions plus le bloc
de coordonnées. Sur grand écran (≥ 900 px) tout s'affiche d'un coup ; sur mobile
les questions défilent une par une.

La réponse `No en este momento` à la question sur l'investissement (`q6`) envoie
vers `/no-match` au lieu de `/gracias` : c'est réglé par `DISQUALIFYING` dans ce
même fichier.

## Reste à faire

- Pixels de conversion (Meta `Schedule`, GA4) sur `/gracias` — l'emplacement est
  marqué par un commentaire dans la page.
- Pages légales `/privacidad`, `/aviso-legal`, `/cookies` : liées depuis le
  footer et le formulaire, mais pas encore écrites.
- Le verrou est côté navigateur. Il filtre les curieux, pas quelqu'un qui
  ouvrirait la console. Un verrou réel demanderait de valider la progression
  côté serveur.
