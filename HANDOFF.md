# Handoff -- Schoterpoort website rebuild

## Status: LIVE op GitHub Pages
URL: https://han-s-kl.github.io/schoterpoort/
CMS: https://han-s-kl.github.io/schoterpoort/admin/
Repo: https://github.com/han-s-kl/schoterpoort (publiek)
Branch: main
77 pagina's (NL + EN), build <1 seconde

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

### CMS -- Volledig tweetalig (2026-03-28)

**Architectuur:** Single-file CMS in `public/admin/index.html`
- GitHub Contents API voor lezen/opslaan (direct commits)
- Inline auth -- wachtwoordformulier, versleuteld PAT (AES-256-GCM)
  - Wachtwoord: `schoterpijnboomzaanen`
  - PAT verloopt ~90 dagen na 2026-03-27, moet dan vernieuwd worden

**Sidebar (alle menu's standaard open):**
- Algemene gegevens (adres, e-mail, 3 telefoonnummers)
- Home + Home (EN)
- Patientenomgeving + Patientenomgeving (EN)
- Medewerkers > 4 categorieën (staff.json editor)
- Diensten > Spreekuur + (EN), Herhaalrecept + (EN), Apotheek + (EN), Huisbezoek + (EN), Spoedpost + (EN)
- Praktisch > Tarieven + (EN), Eigen risico + (EN), Klachtenregeling + (EN), Administratieformulier + (EN), Urineonderzoek + (EN), Vacatures + (EN)

**Editor types:**
1. **Algemene gegevens** -- simpele invoervelden voor adres, e-mail, telefoonnummers (practices.json)
2. **Sectie-editor** (markdown pagina's) -- splitst markdown per kopje, WYSIWYG contenteditable per sectie. Kopjes zijn labels (niet bewerkbaar)
3. **Home-editor** (JSON) -- mededelingen (WYSIWYG), telefonisch consult, afspraak afzeggen, 3 kwaliteit-blokken (titel+tekst+zichtbaar), 8 wist-u-dat items
4. **Spreekuur-editor** (JSON) -- openingstijden (rijen + noten), keuzemenu, 6 tekstblokken, spoed-items
5. **Patientenomgeving-editor** (JSON) -- intro, 4 portaal-links, 3 belangrijk-items, app URL, helpdesk
6. **Staff-editor** (JSON) -- lijst/detail views voor staff.json, filter op role
7. **Tabel-editor** -- markdown tabellen als visuele tabel met invoervelden

**WYSIWYG features:**
- Contenteditable velden (geen raw HTML/markdown zichtbaar)
- **B Vet** en **Link** knoppen op alle tekstvelden en tabel-cellen
- Markdown <-> HTML conversie bij laden/opslaan
- Geen `#`/`##` prefix bij kopjes
- Kwaliteit-blokken: vast aantal met zichtbaar/verborgen checkbox

**Data-architectuur:**
- JSON-backed pagina's: `home.json`, `spreekuur.json`, `patientenomgeving.json` + EN varianten (`*-en.json`)
- Markdown pagina's: `src/content/pages/*.md` + `src/content/pages-en/*.md`
- Blocks (mededelingen): `src/content/blocks/*.md` + `src/content/blocks-en/*.md`
- Gedeelde data: `practices.json` (telefoonnummers, adres), `staff.json`, `navigation.json`
- Alle telefoonnummers/adres/e-mail lezen uit practices.json (single source of truth)

**Niet in CMS (bewust):**
- Contact, Telefoonnummers, Contact kinderen -- .astro-only interactieve pagina's
- Gezondheidsinfo -- categorie-indexpagina

### Auto-vertaling (2026-03-28)

- GitHub Action `.github/workflows/translate.yml`
- Script `scripts/translate.mjs` -- Claude API (Haiku model)
- Trigger: push naar main met wijzigingen in NL JSON/markdown bestanden
- Vertaalt automatisch naar EN en commit resultaat
- Secret: `ANTHROPIC_API_KEY` in GitHub repo settings

## Volgende stappen

### Prioriteit 1: TransIP migratie (wacht op TransIP hosting)
1. **PHP auth proxy** -- eigen login (email/wachtwoord), GitHub PAT server-side
2. **Versleuteld PAT verwijderen** uit public/admin/index.html
3. **Deploy pipeline** -- GitHub Actions SFTP naar TransIP
4. **Base path** -- `/schoterpoort/` verwijderen, site URL aanpassen
5. **Mail aan UwZorgOnline** -- concept staat in sessie-historie (vraag om migratie-instructies)

## Overige openstaande punten
1. **ZIVVER Conversation Starter** -- placeholder URL in contact-kinderen.astro
2. **GitHub Pages base path** -- hardcoded `/schoterpoort/` prefix in markdown links
3. **Klachtenformulier backend** -- mailto: -> PHP op TransIP. Zie docs/refs/formulieren-backend.md
4. **GitHub default branch** -- `feature/initial-site` is default op GitHub, `main` is deploy branch. Overweeg synchronisatie
