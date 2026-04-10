# Handoff -- Schoterpoort website rebuild

## Status: LIVE op GitHub Pages (2026-03-28)
URL: https://han-s-kl.github.io/schoterpoort/
CMS: https://han-s-kl.github.io/schoterpoort/admin/
Repo: https://github.com/han-s-kl/schoterpoort (publiek)
Branch: main (20+ commits voor op feature/initial-site)
77 pagina's (NL + EN), build ~1 seconde, working tree clean

## Wat is gedaan

### Website
- Volledige rebuild van schoterpoort.com (WordPress -> Astro + Tailwind)
- 77 pagina's (NL + EN) met alle content, links, afbeeldingen, PDFs
- Engelse vertaling (NL is SSOT, EN automatisch vertaald)
- Contact-flow met triage (spoed/afspraak/bericht)
- ZIVVER formulier voor kinderen <16
- Spreekuur + patientenomgeving als styled Astro pagina's (JSON SSOT)
- Klachtenformulier (HTML form, mailto: tijdelijk)
- Taalwissel NL/EN met SVG vlaggetjes
- Staff bios: letterlijke originele tekst, initialen buiten bio's
- SessionStart hook + git pre-commit hook (astro build)
- CLAUDE.md, docs/refs/, HANDOFF.md ingericht
- Nieuwssectie volledig verwijderd (was thuisarts.nl content, niet relevant)
- CSS fix: h2 direct na h1 krijgt geen border-top meer (prose styling)

### CMS -- Volledig tweetalig (2026-03-28, bijgewerkt)

**Architectuur:** Single-file CMS in `public/admin/index.html`
- GitHub Contents API voor lezen/opslaan (direct commits)
- Inline auth -- wachtwoordformulier, versleuteld PAT (AES-256-GCM)
  - Wachtwoord: `schoterpijnboomzaanen`
  - PAT verloopt ~90 dagen na 2026-03-27, moet dan vernieuwd worden

**Sidebar (NL/EN switchen via toggle in topbar):**
- Algemene gegevens (adres, e-mail, telefoonnummers, openingstijden, avondspreekuur toggle, keuzemenu)
- Home
- Medewerkers > 4 categorieen (staff.json editor, alleen NL velden)
- Diensten > Spreekuur, Herhaalrecept, Apotheek, Huisbezoek, Spoedpost, Patientenomgeving
- Praktisch > Tarieven, Eigen risico, Klachtenregeling, Administratieformulier, Urineonderzoek, Vacatures
  - Gezondheidsinfo > 7 pagina's (reizigersadvisering, soa, spiraal, tekenbeet, urineweginfecties, wrattenspreekuur, zwangerschap)

**Editor types:**
1. **Algemene gegevens** -- adres, e-mail, telefoonnummers, openingstijden + avondspreekuur toggle, keuzemenu (practices.json)
2. **Sectie-editor** (markdown pagina's) -- splitst markdown per kopje, WYSIWYG contenteditable per sectie. Lege h1-secties worden overgeslagen.
3. **WYSIWYG richtext-editor** (gezondheidsinfo pagina's) -- enkele contentEditable div met volledige markdown round-trip. Headings, bold, italic, links, lijsten, afbeeldingen visueel weergegeven. H1 wordt gestript (komt van paginatitel). Floating toolbar: B, I, H (cyclet h2->h3->p), Link.
4. **Home-editor** (JSON) -- mededelingen (kleurcodes amber/blauw/grijs), telefonisch consult, afspraak afzeggen, kwaliteit-blokken, wist-u-dat items
5. **Spreekuur-editor** (JSON) -- 5 consulttype-blokken, afspraak afzeggen (rood accent)
6. **Herhaalrecept-editor** (JSON) -- 7 secties: intro, patientenomgeving, receptenlijn, vragen, welke medicijnen, wanneer klaar, voorbeelden
7. **Patientenomgeving-editor** (JSON) -- intro, portaal-links, belangrijk-items (kleurcodes), app URL, helpdesk
8. **Staff-editor** (JSON) -- lijst/detail views, EN-velden bewerkbaar via NL/EN toggle in topbar
9. **Tabel-editor** -- markdown tabellen als visuele tabel met invoervelden

**WYSIWYG features:**
- Contenteditable velden (geen raw HTML/markdown zichtbaar)
- Floating selection toolbar: selecteer tekst -> popup met **B Vet**, **I**, **H**, **Link** knoppen
- Markdown <-> HTML conversie bij laden/opslaan (inline + block-level voor richtext)
- Kleurcodes: rood (spoed/afzeggen), amber (waarschuwing), blauw (info), grijs (neutraal)
- Avondspreekuur toggle verbergt/toont gerelateerde velden
- Titel bewerkbaar via potlood-icoon in topbar (alle markdown pagina's)

**Read-only context blokken (2026-03-28):**
- Grijze, niet-bewerkbare blokken die practices.json data tonen zodat de redacteur context heeft
- Link "Beheer via Algemene gegevens" navigeert direct naar practice-info editor
- Per pagina:
  - Spreekuur: praktijkkaarten, openingstijden, keuzemenu, spoed
  - Herhaalrecept: receptenlijn keuzetoets + 4 praktijknummers
  - Spoedpost: tijdens/buiten kantooruren blokken
  - Huisbezoek: contact + keuzemenu + spoed (ContactSpoedBlock)
  - Administratieformulier: telefoon + email + praktijkmanager
- Blokken worden correct opgeruimd bij navigatie (destroyEditors)

**Geneste sidebar-navigatie:**
- Ondersteuning voor sub-groepen (children binnen children)
- Gezondheidsinfo als sub-groep onder Praktisch, standaard opengeklapt
- NavId-lookup werkt voor 3 niveaus diep

**Data-architectuur:**
- Elke pagina heeft eigen .astro template (geen generieke catch-all meer)
- JSON-backed pagina's: `home.json`, `spreekuur.json`, `patientenomgeving.json`, `herhaalrecept.json` + EN varianten
- Markdown pagina's: `src/content/pages/*.md` + `src/content/pages-en/*.md` (21 NL + 21 EN)
- Blocks (mededelingen): `src/content/blocks/*.md` + `src/content/blocks-en/*.md`
- Gedeelde data: `practices.json` (SSOT voor telefoonnummers, adres, openingstijden, keuzemenu), `staff.json` (SSOT voor medewerkers incl. EN vertalingen)
- `ContactSpoedBlock.astro` -- herbruikbaar component voor contact+spoed info
- Auto-vertaling: staff.json EN-velden (role, background, interests, since, specializations) + alle JSON/markdown

**Niet in CMS (bewust):**
- Contact, Telefoonnummers, Contact kinderen -- .astro-only interactieve pagina's
- Gezondheidsinfo indexpagina -- categorie-overzicht, geen bewerkbare tekst
- Routebeschrijving -- alleen ContactSpoedBlock, geen bewerkbare tekst

### Vertalingen -- Handmatig via CMS (2026-04-10)

Auto-vertaling is verwijderd. EN-content wordt nu handmatig beheerd via het CMS:

- **NL/EN toggle in topbar** -- knop bovenaan om te wisselen tussen NL en EN editing. De sidebar blijft hetzelfde, elke editor laadt automatisch de juiste taalversie.
- **Bestaande EN-vertalingen blijven behouden** -- geen wijzigingen aan content
- **Wat is bewerkbaar in EN:**
  - Markdown pagina's (`src/content/pages-en/*.md`)
  - JSON pagina's (home, spreekuur, herhaalrecept, patientenomgeving)
  - Staff EN-velden (roleEn, backgroundEn, interestsEn, sinceEn, specializationsEn) -- alleen-lezen velden voor naam/team/foto blijven gedeeld
- **Niet bewerkbaar in EN** (bewust):
  - Algemene gegevens (practices.json) -- adres, telefoon, openingstijden zijn taalonafhankelijk
- Verwijderde bestanden: `.github/workflows/translate.yml`, `scripts/translate.mjs`, `@anthropic-ai/sdk` dependency

## Volgende stappen

### Prioriteit 1: TransIP migratie (wacht op TransIP hosting)
1. **PHP auth proxy** -- eigen login (email/wachtwoord), GitHub PAT server-side
2. **Versleuteld PAT verwijderen** uit public/admin/index.html (PAT verloopt ~90 dagen na 2026-03-27)
3. **Deploy pipeline** -- GitHub Actions SFTP naar TransIP
4. **Base path** -- `/schoterpoort/` verwijderen, site URL aanpassen
5. **Mail aan UwZorgOnline** -- concept staat in sessie-historie (vraag om migratie-instructies)

## Overige openstaande punten
1. **ZIVVER Conversation Starter** -- placeholder URL in contact-kinderen.astro
2. **GitHub Pages base path** -- hardcoded `/schoterpoort/` prefix in markdown links
3. **Klachtenformulier backend** -- mailto: -> PHP op TransIP. Zie docs/refs/formulieren-backend.md
4. **GitHub default branch** -- `feature/initial-site` is default op GitHub, `main` is deploy branch (20+ commits voor). Overweeg synchronisatie
5. **Nieuws** -- volledig verwijderd, geen nieuwspagina's of RSS feed
