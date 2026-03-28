# Handoff -- Schoterpoort website rebuild

## Status: LIVE op GitHub Pages (2026-03-28)
URL: https://han-s-kl.github.io/schoterpoort/
CMS: https://han-s-kl.github.io/schoterpoort/admin/
Repo: https://github.com/han-s-kl/schoterpoort (publiek)
Branch: main (5 commits voor op feature/initial-site)
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

### CMS -- Volledig tweetalig (2026-03-28, bijgewerkt)

**Architectuur:** Single-file CMS in `public/admin/index.html`
- GitHub Contents API voor lezen/opslaan (direct commits)
- Inline auth -- wachtwoordformulier, versleuteld PAT (AES-256-GCM)
  - Wachtwoord: `schoterpijnboomzaanen`
  - PAT verloopt ~90 dagen na 2026-03-27, moet dan vernieuwd worden

**Sidebar (alleen NL, EN wordt automatisch vertaald):**
- Algemene gegevens (adres, e-mail, telefoonnummers, openingstijden, avondspreekuur toggle, keuzemenu)
- Home
- Patientenomgeving
- Medewerkers > 4 categorieën (staff.json editor, alleen NL velden)
- Diensten > Spreekuur, Herhaalrecept, Apotheek, Huisbezoek, Spoedpost
- Praktisch > Tarieven, Eigen risico, Klachtenregeling, Administratieformulier, Urineonderzoek, Vacatures

**Editor types:**
1. **Algemene gegevens** -- adres, e-mail, telefoonnummers, openingstijden + avondspreekuur toggle, keuzemenu (practices.json)
2. **Sectie-editor** (markdown pagina's) -- splitst markdown per kopje, WYSIWYG contenteditable per sectie
3. **Home-editor** (JSON) -- mededelingen (kleurcodes amber/blauw/grijs), telefonisch consult, afspraak afzeggen, kwaliteit-blokken, wist-u-dat items
4. **Spreekuur-editor** (JSON) -- 5 consulttype-blokken, afspraak afzeggen (rood accent)
5. **Herhaalrecept-editor** (JSON) -- 7 secties: intro, patientenomgeving, receptenlijn, vragen, welke medicijnen, wanneer klaar, voorbeelden
6. **Patientenomgeving-editor** (JSON) -- intro, portaal-links, belangrijk-items (kleurcodes), app URL, helpdesk
7. **Staff-editor** (JSON) -- lijst/detail views, EN-velden verborgen (auto-vertaald)
8. **Tabel-editor** -- markdown tabellen als visuele tabel met invoervelden

**WYSIWYG features:**
- Contenteditable velden (geen raw HTML/markdown zichtbaar)
- Floating selection toolbar: selecteer tekst -> popup met **Vet** en **Link** knoppen
- Markdown <-> HTML conversie bij laden/opslaan
- Kleurcodes: rood (spoed/afzeggen), amber (waarschuwing), blauw (info), grijs (neutraal)
- Avondspreekuur toggle verbergt/toont gerelateerde velden

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
- Gezondheidsinfo -- categorie-indexpagina
- Routebeschrijving -- alleen ContactSpoedBlock, geen bewerkbare tekst

### Auto-vertaling (2026-03-28)

- GitHub Action `.github/workflows/translate.yml`
- Script `scripts/translate.mjs` -- Claude API (Haiku model)
- Trigger: push naar main met wijzigingen in NL JSON/markdown bestanden
- Vertaalt automatisch naar EN en commit resultaat
- Secret: `ANTHROPIC_API_KEY` in GitHub repo settings

## Eerstvolgende taak: CMS read-only blokken

In het CMS moeten niet-bewerkbare/dynamische blokken ook getoond worden (read-only, grijs) zodat de redacteur context heeft bij de bewerkbare blokken.

**Aanpak:** `renderReadOnlyBlock(label, content)` functie in CMS die een grijs, niet-bewerkbaar blok rendert. Per editor toevoegen op de juiste plek.

**Voorbeelden per pagina:**
- Herhaalrecept: praktijknummers + keuzetoets als grijs blok
- Spreekuur: openingstijden + keuzemenu + spoed-info als grijs blok
- Spoedpost: "Tijdens kantooruren" en "Buiten kantooruren" als grijs blok
- Huisbezoek/Routebeschrijving/Aanmelding: ContactSpoedBlock info als grijs blok
- Administratieformulier: telefoon/email/praktijkmanager als grijs blok

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
4. **GitHub default branch** -- `feature/initial-site` is default op GitHub, `main` is deploy branch (main is 5 commits voor). Overweeg synchronisatie
5. **Nieuws** -- volledig verwijderd, geen nieuwspagina's of RSS feed
