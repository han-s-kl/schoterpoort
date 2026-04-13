# Handoff -- Schoterpoort website

## Status: 1 omgeving LIVE (TransIP staging), klaar voor cutover naar TransIP root

| Omgeving | URL | Doel | Auto-deploy |
|---|---|---|---|
| TransIP staging (in submap) | https://schoterpoort.com/staging/ | enige actieve preview, CMS draait hier | `.github/workflows/deploy-staging.yml` op push naar main |
| GitHub Pages | han-s-kl.github.io/schoterpoort/ | **UITGESCHAKELD 2026-04-14** -- geeft nu 404 | `deploy.yml` push-trigger uitgecomment |
| schoterpoort.com root | redirect 302 naar schoterpoort.praktijkinfo.nl | huidige patient-facing site (oude WordPress) | -- |

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
- `github` (default): `base: '/schoterpoort'`, `site: han-s-kl.github.io`
- `staging`: `base: '/staging'`, `site: schoterpoort.com` -- voor TransIP staging submap
- `transip`: `base: '/'`, `site: schoterpoort.com` -- voor de straks-uiteindelijke TransIP root deploy

`scripts/rewrite-base-path.mjs` is een post-build pass die hardcoded `/schoterpoort/...` strings in 33 markdown bestanden ombuigt naar de juiste prefix per target.

Scripts:
- `npm run build` -- github target (CI gebruikt dit, GitHub Pages)
- `npm run build:staging` -- staging target (CI gebruikt dit, TransIP /www/staging/)
- `npm run build:transip` -- transip target (nog niet in gebruik, voor de echte cutover)

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
- `deploy.yml` (oud) -- bouwt github target en publiceert via GitHub Pages
- `deploy-staging.yml` (nieuw, 2026-04-10) -- bouwt staging target en rsynct naar `www/staging/` op TransIP via SSH key uit secrets
- Required GitHub repo secrets: `TRANSIP_SSH_KEY`, `TRANSIP_HOST`, `TRANSIP_USER`, `TRANSIP_PATH`
- Beide workflows draaien parallel op elke push naar main; CMS commits triggeren ze automatisch ook

### CMS (`public/admin/index.html`)
- Wachtwoord: `schoterpijnboomzaanen`
- Versleuteld GitHub PAT in de file (AES-256-GCM); PAT verloopt ~90 dagen na 2026-03-27 -- aandachtspunt
- Sidebar bewerkbare items: Algemene gegevens, Home, Medewerkers (per categorie), Diensten (Spreekuur, Herhaalrecept, Apotheek, Huisbezoek, Spoedpost, Patientenomgeving), Praktisch (Tarieven, Eigen risico, Administratieformulier, Urineonderzoek, Vacatures, Gezondheidsinfo subgroep)
- NL/EN toggle bovenaan
- Bevat sinds 2026-04-10 een **Foto** en **PDF** upload knop in de WYSIWYG floating toolbar -- uploadt direct naar `public/images/uploads/` resp `public/documents/uploads/` via GitHub Contents API en voegt de markdown reference op cursor-positie in
- Niet meer in CMS: Klachtenregeling (verwijderd uit NAV op 2026-04-10 omdat de pagina van markdown naar hardcoded astro is gegaan)

### Speciale architecture beslissingen
- **Klachtenregeling** is een hardcoded astro pagina met de ZIVVER-kaart inline tussen de intro en externe behandeling secties. Geen markdown, geen CMS bewerkbaarheid (content is wettelijk vast en verandert zelden).
- **Klachtenformulier pagina bestaat niet meer**. De `/klachtenformulier` route is opgeheven, de inhoud is samengevoegd met `/klachtenregeling`. De link op `/formulieren` wijst nu naar `/klachtenregeling`.
- **Contact-kinderen pagina bestaat niet meer**. De inhoud zit nu in de "result-under16" stap van `/contact`. Deep-link `/contact#under16` opent direct die stap. Menu en patientenomgeving warning wijzen naar de deep-link.
- **Praktijkverpleegkundigen pagina** is van markdown naar hardcoded astro (`src/pages/medewerkers/praktijkverpleegkundigen.astro` + EN). Heeft per sectie (somatiek / spreekuurondersteuner / GGZ) eigen StaffCards onder de bijbehorende uitleg. Geen telefoonnummer op de cards (alleen in de tekst boven).

### Communicatie-routing patienten (samenvatting voor context)
- 16+ jaar -> patientenomgeving (uwzorgonline)
- < 16 jaar -> ZIVVER conversation starter via `/contact#under16`
- Klachten -> aparte ZIVVER conversation starter via `/klachtenregeling`
- Spoed -> bellen
- Niet meer: mailto:info@schoterpoort.com als interactiekanaal (alleen nog passief in footer voor algemene info)

---

## Wat dit jaar live is gegaan (2026-03 / 2026-04)

### Maart 2026
- Volledige rebuild WordPress -> Astro + Tailwind, 73 pages NL + EN
- Engelse vertaling (NL is SSOT)
- Custom CMS gebouwd (Sveltia/Decap werkten niet) met directe GitHub commits
- Eigen NL/EN tweetalig CMS, WYSIWYG editors, read-only context blokken, geneste navigatie
- Mededelingen-flow met blokken (warning/info/neutral) op de homepage
- Contact-flow met triage-keuzemenu (spoed -> doel -> leeftijd -> resultaat)

### April 2026 (deze sessie en de twee daarvoor)
- **Fix mededelingen delete bug** met defensive guard in `saveHome` (commit 512ca9b, 2026-04-10)
- **Deploy delay feedback** in CMS save status: "Opgeslagen -- live op de site over ~1 minuut" (f9826bf)
- **Image en PDF upload** in CMS WYSIWYG (87b1070): camera/paperclip-knop in floating toolbar, schrijft via Contents API naar `public/images/uploads/` of `public/documents/uploads/`
- **Multi-target build** voor staging-deploy (83dcaf4): env-var DEPLOY_TARGET, post-build base-path rewrite
- **Staging op TransIP** opgezet (.htaccess uitzondering + eerste deploy)
- **ZIVVER conversation starters** geactiveerd (e71ffb0, 2b48216, f1f4c26, fc42e50, 1939c4d, 1262b68): contact-kinderen + klachtenformulier
- **/contact-kinderen pagina samengevoegd** met `/contact#under16` deep-link, oude pagina verwijderd
- **/klachtenformulier verwijderd** en samengevoegd met `/klachtenregeling`
- **Lazin Germawi bio + foto** overgenomen van oude site (5c3d9d3)
- **Praktijkverpleegkundigen pagina herstructureerd** (e2b7441, e4f1297): per-sectie staff cards, dubbele "Naast hun opleiding..." text bij Martine/Britta opgeschoond
- **Externe links + PDFs auto in nieuw tab** via centraal inline script in BaseLayout (959b1a5)
- **Stale CMS klachtenregeling entry verwijderd** (bdd8519)
- **Contact button op homepage** toegevoegd (8a79ddb)
- **PracticeCard component** gemaakt en uniform toegepast op home + telefoonnummers + spreekuur (41ea239, f5c5deb)
- **Profielfoto's 2x groter** in StaffCard (6d4ae37)
- **Doctor avatars op PracticeCards** met witte ring/wrapper (aaa862a, b7c672b, ad3ddb5, a2514b0, c420c4d)
- **GitHub Actions auto-deploy naar TransIP staging** (bb3f898, 7d92b3a) -- elke push triggert nu zowel deploy.yml als deploy-staging.yml
- **Single dashes** in POH-GGZ paragraaf (d464936)

---

## Volgende stappen / openstaande punten

### Voor de echte cutover van GitHub Pages naar TransIP root
1. **PHP smoke test resultaten verwerken**: PHP 8.1 / FPM beschikbaar, alle relevante extensies, mail() **werkt niet** zonder SPF aanpassing (relay 451 to DATA). Voor klachten en contact-kinderen is dat niet meer relevant (ZIVVER), maar voor toekomstige formulieren wel.
2. **PHP auth proxy bouwen** zodat de PAT uit `public/admin/index.html` kan. CMS spreekt dan met `schoterpoort.com/admin-api/` ipv `api.github.com`, en de proxy commit server-side. Hiervoor heeft Core 1 database, 8.1 PHP, dus haalbaar.
3. **301 redirect cache verlopen laten**: huidige `Redirect 302` (was 301 tot 2026-04-10) is nu in browser-caches aan het verlopen. Wachten ~weken-maanden voor de oude 301 uit alle caches is.
4. **DNS/htaccess cutover**: `Redirect 302` weghalen, `dist/` van `npm run build:transip` in `/www/` zetten ipv `/www/staging/`, alles via een nieuwe `.htaccess` (rewrite voor pretty URLs)
5. **Markdown content opschonen**: hardcoded `/schoterpoort/` prefixes in `src/content/pages/*.md` (33 stuks) kunnen weg na cutover; rewrite-base-path script wordt overbodig
6. **Mail aan UwZorgOnline** -- concept staat in sessie-historie

### Korte termijn acties (kunnen nu of bij volgende sessie)
- **HANDOFF.md (deze file)** is bijgewerkt 2026-04-11
- **CLAUDE.md project file** opschonen van verwijzingen naar verwijderde pagina's (contact-kinderen, klachtenformulier)
- **docs/refs/formulieren-backend.md** is achterhaald (PHP backend werd ZIVVER) -- bijwerken of verwijderen
- **docs/refs/content-vergelijking.md / .xlsx** -- alleen referentie, niet actief gebruikt
- **PAT-rotation reminder**: PAT verloopt rond 2026-06-25 (90 dagen na 2026-03-27). Vóór die tijd nieuwe genereren en in de CMS encrypted PAT vervangen, of de auth proxy live hebben.

### Zwevend / nog niet gepland
- **Klachtenformulier backend** -- definitief afgevoerd (vervangen door ZIVVER)
- **Andere online formulieren** (afspraak, vraag) -- niet gepland, ZIVVER zou ook hier kunnen
- **Eigen domein zonder /schoterpoort/ prefix** -- valt samen met cutover
- **Branch sync**: GitHub default branch is `feature/initial-site`, `main` is de deploy branch. Overweeg synchronisatie of default omzetten naar main.

---

## Belangrijke memories die voor alle sessies gelden

(Staan in `~/.claude/projects/-Users-hkluppel-Development-schoterpoort/memory/MEMORY.md`)

- **Externe links + PDFs**: openen automatisch in nieuw tab via script in BaseLayout. NIET handmatig `target="_blank"` toevoegen, dat doet het script al.
- **EN pagina's meenemen**: bij elke template/content wijziging ook `src/pages/en/` of `src/content/pages-en/` checken
- **CMS tweetalig**: alle CMS-bewerkbare content moet NL én EN variant hebben
- **Altijd main pushen** na PR merge voor GitHub Pages
- **Nieuws via RSS** later, niet via CMS
- **CMS keuze**: eigen CMS gebouwd, Sveltia/Decap werkten niet
