# Handoff -- Schoterpoort website

## Status: 1 omgeving LIVE (TransIP staging), klaar voor cutover naar TransIP root

| Omgeving | URL | Doel | Auto-deploy |
|---|---|---|---|
| TransIP staging (in submap) | https://schoterpoort.com/staging/ | enige actieve preview, CMS draait hier | `.github/workflows/deploy-staging.yml` op push naar main |
| GitHub Pages | han-s-kl.github.io/schoterpoort/ | **UITGESCHAKELD 2026-04-14** -- geeft nu 404 | `deploy.yml` push-trigger uitgecomment, Pages-site gedeletet via `gh api` |
| schoterpoort.com root | redirect 302 naar schoterpoort.praktijkinfo.nl | huidige patiënt-facing site (oude WordPress) | -- |

**Belangrijk:** sinds 2026-04-14 draait er nog maar één auto-deploy (`deploy-staging.yml` → TransIP staging). GitHub Pages is afgesloten via `gh api -X DELETE /repos/han-s-kl/schoterpoort/pages` zodat `han-s-kl.github.io/schoterpoort/*` 404 geeft op zowel frontend als admin. Re-enablen kan altijd: push-trigger in `deploy.yml` weer aanzetten + Pages opnieuw opzetten in repo Settings.

CMS: https://schoterpoort.com/staging/admin/ (wachtwoord: zie onder)
Repo: https://github.com/han-s-kl/schoterpoort (publiek)
Branch: main
Build: ~1 sec lokaal, ~1 min via Actions
Pages: 73 NL + EN

---

## Huidige architectuur

### Tech stack
- Astro 6 (static site generator) + Tailwind CSS 4
- TypeScript strict, content collections voor markdown pages
- Custom CMS in `public/admin/index.html` (single-file vanilla JS, GitHub Contents API als backend)

### Multi-target build
`astro.config.mjs` leest `DEPLOY_TARGET` env-var:
- `github` (default): `base: '/schoterpoort'`, `site: han-s-kl.github.io` -- **niet meer in gebruik** sinds Pages disabled
- `staging`: `base: '/staging'`, `site: schoterpoort.com` -- gebruikt door CI voor TransIP staging submap
- `transip`: `base: '/'`, `site: schoterpoort.com` -- staat klaar voor de uiteindelijke TransIP root deploy

`scripts/rewrite-base-path.mjs` is een post-build pass die hardcoded `/schoterpoort/...` strings in markdown-bestanden ombuigt naar de juiste prefix per target. Kan weg na cutover.

Scripts:
- `npm run build` -- github target (niet meer actief)
- `npm run build:staging` -- staging target (enige die via CI draait)
- `npm run build:transip` -- transip target (staat klaar voor cutover, nog niet in gebruik)

### TransIP situatie
- Webhosting Core (€8,99/mnd), PHP 8.1, SFTP+SSH ingeschakeld, doc-root `/www`, 20 GB
- Geen subdomeinen op Core (alleen Pro/Max), dus staging zit in submap `/www/staging/`
- `.htaccess` in `/www/`:
  ```apache
  RewriteEngine On
  RewriteCond %{REQUEST_URI} !^/staging
  RewriteRule ^(.*)$ https://schoterpoort.praktijkinfo.nl/$1 [R=302,L]
  ```
  Alle paths behalve `/staging*` worden 302-redirected naar de oude praktijkinfo site. **Niet aanraken zonder backup**.
- Backup van originele single-line `Redirect 302` staat als `/www/.htaccess - Copy`
- SSH host: `schoxi.ssh.transip.me`, user: `schoterpoortcom`, doc-root: `/www`
- 2 SSH-keys actief: persoonlijke key (mac-claude, voor handmatige acties) en CI key (github-actions, gebruikt door Actions met private key in repo secrets)

### CI/CD
- `deploy.yml` -- **disabled 2026-04-14**. Push-trigger staat uitgecomment; alleen `workflow_dispatch` werkt nog als je handmatig GitHub Pages terug wilt zetten.
- `deploy-staging.yml` -- bouwt staging target en rsynct naar `/www/staging/` op TransIP via SSH key uit secrets. Enige actieve workflow.
- Required GitHub repo secrets: `TRANSIP_SSH_KEY`, `TRANSIP_HOST`, `TRANSIP_USER`, `TRANSIP_PATH`
- Workflow draait op elke push naar main; CMS-commits triggeren 'm automatisch ook.

### CMS (`public/admin/index.html`)
- Wachtwoord: `schoterpijnboomzaanen`
- Versleuteld GitHub PAT in de file (AES-256-GCM); PAT verloopt ~90 dagen na 2026-03-27, dus rond **2026-06-25** -- **aandachtspunt**
- CMS bereikbaar via `https://schoterpoort.com/staging/admin/` (werkt na cutover automatisch op `schoterpoort.com/admin/`)

**CMS sidebar structuur:**
- Algemene gegevens (practices.json editor, bilingual voor de inline `*En` velden)
- Home (home.json + mededelingen-blokken uit `src/content/blocks/`)
- ─────
- Medewerkers
  - Huisartsen (staff list)
  - Praktijkondersteuners (combined: personen-tiles + 3 intro-tekst secties)
  - Praktijkassistenten (combined: personen + 1 intro-tekst)
  - Huisartsen in opleiding (combined: personen + 1 intro-tekst)
- Diensten
  - Spreekuur & afspraken (JSON editor)
  - Herhaalrecept (JSON editor)
  - Apotheek / Huisbezoek / Spoedpost (markdown editors)
  - Patiëntenomgeving (JSON editor)
- Praktisch
  - Tarieven 2025 / Eigen risico / Administratieformulier / Urineonderzoekformulier / Vacatures (markdown editors)
  - Gezondheidsinfo subgroep (7 markdown pages in richtext modus)

**CMS features (2026-04-14):**
- **Pagina-instellingen sectie** bovenaan elke editor (behalve Algemene gegevens) met: Pagina titel (h1), Menu titel (nav label), read-only URL, Beschrijving (SEO meta). Save schrijft pageTitle naar de juiste data-bron (frontmatter / JSON / md-wrapper) en menu label naar `navigation.json` (of `-en.json` in EN mode).
- **Sidebar leest labels uit `navigation.json`** -- wijzigingen aan menu-titels verschijnen direct in zowel de CMS-sidebar als het publieke menu.
- **NL/EN toggle** bovenin wisselt alle content-velden tussen NL en EN bron. Algemene gegevens gebruikt inline `*En` velden voor bilingual (dagen, lunchNote, avondspreekuur.note, keuzemenu[].label). Andere editors hebben aparte NL/EN JSON / markdown files.
- **Plain-text paste**: paste uit Word, websites of mail strippen automatisch naar platte tekst. Formatting daarna via de floating toolbar (bold, italic, link, foto upload, PDF upload).
- **Foto + PDF upload knop** in de WYSIWYG floating toolbar -- uploadt naar `public/images/uploads/` / `public/documents/uploads/` via GitHub Contents API en voegt de markdown referentie op cursor-positie in.
- **60-seconden cooldown na save** met live countdown-status: `"Opgeslagen. Live over ~Ns. Opnieuw opslaan kan over Ns. Engels ook aangepast?"` (de EN-reminder verschijnt alleen bij NL-save).
- **Re-entry guard** op de save-button om dubbelklik races te voorkomen (naast de reguliere disabled-state).
- **Staff bio velden** (since / background / interests) zijn verborgen voor categorieën Praktijkondersteuners en Praktijkassistenten -- deze worden voor die groepen nooit ingevuld.
- **Topbar pencil verwijderd** -- de Pagina-instellingen sectie is nu de enige plek om de pagina-titel te bewerken.
- **Read-only praktijk-info context blokken** (Openingstijden, Keuzemenu, Spoedpost gegevens) in de Spreekuur / Huisbezoek / Spoedpost / Administratieformulier editors, zichtbaar in zowel NL als EN mode.
- **Pagina titels van hardcoded pages** komen uit:
  - `home.json.pageTitle` / `home-en.json.pageTitle`
  - `spreekuur.json.pageTitle` / `spreekuur-en.json.pageTitle`
  - `herhaalrecept.json.pageTitle` / `herhaalrecept-en.json.pageTitle`
  - `patientenomgeving.json.pageTitle` / `patientenomgeving-en.json.pageTitle`
  - `src/content/pages/praktijkondersteuners.md` + `pages-en/praktijkondersteuners.md` -- frontmatter-only wrapper file
- **Niet meer in CMS**: Klachtenregeling (hardcoded astro pagina).

### Speciale architecture beslissingen
- **Praktijkondersteuners pagina** is hardcoded astro (`src/pages/medewerkers/praktijkondersteuners.astro` + EN). h1/title komt uit de wrapper `src/content/pages/praktijkondersteuners.md`. De pagina heeft 4 secties:
  - Praktijkverpleegkundigen somatiek (intro uit `praktijkondersteuners-somatiek.md` + StaffCards)
  - Spreekuurondersteuner (intro uit `praktijkondersteuners-spreekuurondersteuner.md` + Marjoleine's card zonder team-regel)
  - Praktijkondersteuners GGZ (intro uit `praktijkondersteuners-ggz.md` + StaffCards)
  - Praktijkmanager (alleen Eefje's card, geen intro-tekst)
- **Eefje van der Burgh** (Praktijkmanager) staat sinds 2026-04-14 in de Praktijkondersteuners-categorie, niet meer bij Praktijkassistenten. Staff-role filter en publieke pagina zijn beide aangepast.
- **Marjoleine** heeft dubbele rol: op `/medewerkers/praktijkassistenten` toont alleen haar team "Praktijk Duijn" (rol-regel verborgen), op `/medewerkers/praktijkondersteuners` toont alleen haar rol "Spreekuurondersteuner" (team-regel verborgen). Geregeld via een role-override map in `[slug].astro` en een conditionele team-prop in `praktijkondersteuners.astro`.
- **StaffCard team rendering**: `team`-regel toont onder `role` als het veld gevuld is. Op de Huisartsen-pagina wordt team niet doorgegeven (zou redundant zijn -- team is daar gelijk aan "Praktijk <naam>"). Op de praktijkondersteuners supportNurse-sectie idem.
- **Klachtenregeling** is een hardcoded astro pagina met de ZIVVER-kaart inline tussen de intro en externe behandeling secties. Geen markdown, geen CMS bewerkbaarheid (content is wettelijk vast en verandert zelden).
- **Klachtenformulier pagina bestaat niet meer**. De `/klachtenformulier` route is opgeheven, de inhoud is samengevoegd met `/klachtenregeling`. De link op `/formulieren` wijst nu naar `/klachtenregeling`.
- **Contact-kinderen pagina bestaat niet meer**. De inhoud zit nu in de "result-under16" stap van `/contact`. Deep-link `/contact#under16` opent direct die stap. Menu en patiëntenomgeving-warning wijzen naar de deep-link.
- **Routebeschrijving pagina** is uitgebouwd met een OpenStreetMap iframe embed op de exacte coördinaten (`52.398120, 4.642359`), een Google Maps link voor route-instructies, en drie kleine reis-info blokken (auto / OV / fiets). Map-pin icoontje in de Header naast het adres linkt hier naartoe.

### Slug-overzicht (na 2026-04-13 renames)

Alle 5 mismatches tussen menu-titel en slug zijn in één grote pass opgelost:

| Menu titel | URL slug (NL & EN) |
|---|---|
| Praktijkondersteuners | `/medewerkers/praktijkondersteuners` |
| Spreekuur & afspraken | `/spreekuur-afspraken` |
| Tarieven 2025 | `/tarieven-2025` |
| Urineonderzoekformulier | `/urineonderzoekformulier` |
| Gezondheidsinfo | `/gezondheidsinfo` |

Oude URLs (`/medewerkers/praktijkverpleegkundigen`, `/spreekuur`, `/tarieven`, `/urineonderzoek-formulier`, `/gezondheid`) geven nu 404. Geen redirects actief. Voor productie-cutover overweeg 301-redirects via `.htaccess`.

### Communicatie-routing patiënten
- 16+ jaar -> patiëntenomgeving (uwzorgonline)
- < 16 jaar -> ZIVVER conversation starter via `/contact#under16`
- Klachten -> aparte ZIVVER conversation starter via `/klachtenregeling`
- Spoed -> bellen
- Niet meer: `mailto:info@schoterpoort.com` als interactiekanaal (alleen nog passief in footer; verwijderd van homepage)

---

## Wat dit jaar live is gegaan

### Maart 2026
- Volledige rebuild WordPress -> Astro + Tailwind, 73 pages NL + EN
- Engelse vertaling (NL is SSOT)
- Custom CMS gebouwd (Sveltia/Decap werkten niet) met directe GitHub commits
- Eigen NL/EN tweetalig CMS, WYSIWYG editors, read-only context blokken, geneste navigatie
- Mededelingen-flow met blokken (warning/info/neutral) op de homepage
- Contact-flow met triage-keuzemenu (spoed -> doel -> leeftijd -> resultaat)

### April 2026 (1e helft, tot 2026-04-11)
- **Fix mededelingen delete bug** met defensive guard in `saveHome`
- **Deploy delay feedback** in CMS save status
- **Image en PDF upload** in CMS WYSIWYG
- **Multi-target build** voor staging-deploy (DEPLOY_TARGET env-var, post-build base-path rewrite)
- **Staging op TransIP** opgezet (.htaccess uitzondering + eerste deploy)
- **ZIVVER conversation starters** geactiveerd voor contact-kinderen + klachtenformulier
- **/contact-kinderen pagina samengevoegd** met `/contact#under16` deep-link
- **/klachtenformulier verwijderd** en samengevoegd met `/klachtenregeling`
- **Lazin Germawi bio + foto** overgenomen van oude site
- **Praktijkverpleegkundigen pagina** herstructureerd met per-sectie staff cards
- **Externe links + PDFs auto in nieuw tab** via centraal inline script in BaseLayout
- **Contact button op homepage**
- **PracticeCard component** uniform toegepast op home + telefoonnummers + spreekuur
- **Profielfoto's 2x groter** in StaffCard
- **Doctor avatars op PracticeCards** met witte ring
- **GitHub Actions auto-deploy naar TransIP staging**

### April 2026 (2e helft, 2026-04-12 tot 2026-04-14)

**CMS architectuur**
- **Pagina-instellingen CMS-sectie** gebouwd voor alle editors: editable Pagina titel + Menu titel + read-only URL + Beschrijving per pagina
- **CMS sidebar leest labels uit `navigation.json`** -- labelwijzigingen propageren direct naar zowel sidebar als publieke menu
- **pageTitle uitgeplaatst naar JSON** voor home/spreekuur/herhaalrecept/patiëntenomgeving; nieuwe wrapper `praktijkondersteuners.md` voor de hardcoded praktijkondersteuners pagina
- **Combined staff-page editor**: per categorie (Praktijkondersteuners / Praktijkassistenten / Huisartsen in opleiding) toont het CMS nu personen-tiles + intro-tekst secties in één view (geen losse "Tekst --" items meer)
- **Algemene gegevens bilingual**: NL/EN toggle werkt nu voor practices.json bilingual velden (dagen, lunchNote, avondspreekuur.note, keuzemenu[].label via inline `*En` suffix)
- **Team-veld** in StaffCard getoond onder rol (voor assistenten en HAIOs); `since/background/interests` velden verborgen in CMS voor nurses + assistants categorieën
- **60-seconden cooldown** na save met live countdown + "Engels ook aangepast?" reminder (alleen NL)
- **Re-entry guard** tegen dubbelklik save-race
- **Plain-text paste** in alle contenteditable velden
- **Read-only praktijk-info context blokken** ook zichtbaar in EN-mode
- **Topbar pencil verwijderd** (was buggy én dubbelop met Pagina-instellingen)

**Slug / label renames**
- `/medewerkers/praktijkverpleegkundigen` → `/medewerkers/praktijkondersteuners`
- `/spreekuur` → `/spreekuur-afspraken`
- `/tarieven` → `/tarieven-2025`
- `/urineonderzoek-formulier` → `/urineonderzoekformulier`
- `/gezondheid` → `/gezondheidsinfo`
- Menu label "Praktijkverpleegkundigen" → "Praktijkondersteuners"
- Menu label "Urineonderzoek formulier" → "Urineonderzoekformulier"

**Content / layout wijzigingen**
- **Homepage**: Telefonisch consult blok verwijderd, email-adres weg uit contactregel, contact-button aanwezig
- **Telefoonnummers**: Algemeen nummer verplaatst onder praktijk-kaarten, Keuzemenu telefoon + Terugbelafspraken blokken toegevoegd, "Spoed tijdens kantooruren" op positie 2, "Alleen bereikbaar tussen 11 en 12 uur" subregel bij Praktijkverpleegkundigen
- **Spreekuur & afspraken**: `soortenIntro` veld voor triage-tekst verplaatst boven de 4 soorten-kaarten
- **Huisbezoek**: ContactSpoedBlock verwijderd
- **"Meer info over de Spoedpost" link** toegevoegd op 4 pagina's (homepage, telefoonnummers, spreekuur-afspraken, contact)
- **Routebeschrijving pagina** uitgebouwd: OpenStreetMap embed op exacte coördinaten + Google Maps link + reis-info auto/OV/fiets
- **Map-pin icoontje** in globale Header naast adres, link naar Routebeschrijving
- **Eefje (Praktijkmanager)** verplaatst van Praktijkassistenten naar Praktijkondersteuners
- **Marjoleine dubbele rol**: op assistenten alleen team tonen, op praktijkondersteuners alleen rol
- **Marjoleine team** gevuld met "Praktijk Duijn" in staff.json

**Taal-opschoning**
- Alle ` -- ` (dubbel streepje) vervangen door ` - ` (enkel) site-wide -- 54 replacements in 38 files
- Nederlands `patient` → `patiënt` met trema in alle NL content -- 75 replacements in 17 files (URLs/imports/slugs blijven ASCII)

**Deployment**
- **GitHub Pages uitgeschakeld** (2026-04-14): `deploy.yml` push-trigger uitgecomment + Pages-site gedeletet via `gh api`. `han-s-kl.github.io/schoterpoort/*` geeft nu 404. Staging op TransIP is nu de enige publieke URL.

---

## Volgende stappen / openstaande punten

### Voor de echte cutover van staging naar TransIP root
1. **PHP smoke test resultaten verwerken**: PHP 8.1 / FPM beschikbaar, alle relevante extensies, `mail()` **werkt niet** zonder SPF aanpassing (relay 451 to DATA). Voor klachten en contact-kinderen is dat niet meer relevant (ZIVVER), maar voor toekomstige formulieren wel.
2. **PHP auth proxy bouwen** zodat de PAT uit `public/admin/index.html` kan (optioneel, alternatief voor PAT rotation). CMS spreekt dan met `schoterpoort.com/admin-api/` i.p.v. `api.github.com`.
3. **301 redirect cache verlopen laten**: de 302-redirect naar praktijkinfo staat al weken actief. Oude 301 zou inmiddels uit browser-caches moeten zijn. Te verifiëren op cutover-dag.
4. **DNS/htaccess cutover**: 302-redirect weghalen, `dist/` uit `npm run build:transip` in `/www/` zetten i.p.v. `/www/staging/`, nieuwe `.htaccess` voor pretty URLs. **Direct effect**: `schoterpoort.com/` serveert de nieuwe site en `schoterpoort.com/admin/` werkt automatisch (CMS komt dan fysiek in `/www/admin/`). Geen tijdelijke rewrite nodig.
5. **Markdown content opschonen**: hardcoded `/schoterpoort/` prefixes in `src/content/pages/*.md` kunnen weg na cutover. `scripts/rewrite-base-path.mjs` wordt dan overbodig.
6. **301 redirects voor oude slug-URLs**: `/medewerkers/praktijkverpleegkundigen` → `/medewerkers/praktijkondersteuners`, `/spreekuur` → `/spreekuur-afspraken`, etc. Via `.htaccess` rewrite in `/www/`.
7. **Mail aan UwZorgOnline** -- concept staat in sessie-historie (nog niet verstuurd).

### Korte termijn acties
- **PAT-rotation reminder**: PAT verloopt rond **2026-06-25** (~2 maanden vanaf nu). Vóór die tijd nieuwe genereren en in de CMS encrypted PAT vervangen, of de auth proxy (stap 2) live hebben.
- **CLAUDE.md project file** opschonen van verwijzingen naar verwijderde pagina's (contact-kinderen, klachtenformulier, oude slug-namen)
- **docs/refs/formulieren-backend.md** is achterhaald (PHP backend werd ZIVVER) -- bijwerken of verwijderen
- **docs/refs/content-vergelijking.md / .xlsx** -- alleen referentie, niet actief gebruikt. Kan blijven staan.

### Zwevend / nog niet gepland
- **Klachtenformulier backend** -- definitief afgevoerd (vervangen door ZIVVER)
- **Andere online formulieren** (afspraak, vraag) -- niet gepland, ZIVVER zou ook hier kunnen
- **Branch sync**: GitHub default branch is `feature/initial-site`, `main` is de deploy branch. Overweeg synchronisatie of default omzetten naar main.
- **Huisartsen-pagina CMS Pagina-instellingen**: de staff-list view (Huisartsen) heeft geen Pagina-instellingen sectie zoals de andere 3 categorieën. Aparte view layout, zou follow-up werk zijn.

---

## Belangrijke memories die voor alle sessies gelden

(Staan in `~/.claude/projects/-Users-hkluppel-Development-schoterpoort/memory/MEMORY.md`)

- **Externe links + PDFs**: openen automatisch in nieuw tab via script in BaseLayout. NIET handmatig `target="_blank"` toevoegen, dat doet het script al.
- **EN pagina's meenemen**: bij elke template/content wijziging ook `src/pages/en/` of `src/content/pages-en/` checken.
- **CMS tweetalig**: alle CMS-bewerkbare content moet NL én EN variant hebben.
- **Altijd main pushen na commit** -- `git push origin main` direct na elke commit, niet apart vragen.
- **Nieuws via RSS** later, niet via CMS.
- **CMS keuze**: eigen CMS gebouwd, Sveltia/Decap werkten niet.
- **CMS race bij directe commits**: waarschuw als ik `staff.json` / `home.json` / `practices.json` / content markdown direct via commit aanpas terwijl de gebruiker mogelijk in het CMS werkt -- SHA-mismatch in de open CMS-tab vernietigt dan z'n bewerking.
