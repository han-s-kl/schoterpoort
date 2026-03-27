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
- Engelse vertaling (NL is SSOT, EN gegenereerd)
- Contact-flow met triage (spoed/afspraak/bericht)
- ZIVVER formulier voor kinderen <16
- Spreekuur + patientenomgeving als styled Astro pagina's (practices.json SSOT)
- Klachtenformulier (HTML form, mailto: tijdelijk)
- Taalwissel NL/EN met SVG vlaggetjes
- Staff bios: letterlijke originele tekst, initialen buiten bio's
- SessionStart hook + git pre-commit hook (astro build)
- CLAUDE.md, docs/refs/, HANDOFF.md ingericht
- Nieuwssectie volledig verwijderd (was thuisarts.nl content, niet relevant)

### CMS -- Volledig herstructureerd (2026-03-27)

**Architectuur:** Single-file CMS in `public/admin/index.html`
- GitHub Contents API voor lezen/opslaan (direct commits)
- Inline auth -- wachtwoordformulier, versleuteld PAT (AES-256-GCM)
  - Wachtwoord: `schoterpijnboomzaanen`
  - PAT verloopt ~90 dagen na 2026-03-27, moet dan vernieuwd worden

**Sidebar -- navigatie-gebaseerd (alle menu's standaard open):**
- Medewerkers > 4 categorieën (staff.json editor)
- Diensten > Spreekuur (JSON editor), Herhaalrecept, Apotheek, Huisbezoek, Spoedpost
- Praktisch > Tarieven, Eigen risico, Klachtenregeling, Administratieformulier, Urineonderzoek, Vacatures
- Mededelingen (3 blokken gestapeld)

**Editor types:**
1. **Sectie-editor** (markdown pagina's) -- splitst markdown per kopje, toont elk als apart bewerkbaar veld. Kopjes zijn labels (niet bewerkbaar), tekst is WYSIWYG contenteditable
2. **Spreekuur-editor** (JSON) -- gestructureerde velden: openingstijden (rijen + noten), keuzemenu, 6 tekstblokken, spoed-items. Bron: `src/data/spreekuur.json`, `spreekuur.astro` leest hieruit
3. **Staff-editor** (JSON) -- lijst/detail views voor `src/data/staff.json`, filter op role
4. **Blocks-editor** (mededelingen) -- alle 3 blokken gestapeld met EasyMDE
5. **Tabel-editor** -- markdown tabellen worden visueel als tabel met invoervelden getoond (apotheek, tarieven)

**WYSIWYG features:**
- Contenteditable velden (geen raw HTML/markdown zichtbaar)
- **B Vet** en **Link** knoppen (execCommand) op alle tekstvelden en tabel-cellen
- Markdown <-> HTML conversie bij laden/opslaan (bold, links)
- Spreekuur velden slaan HTML direct op (set:html in .astro)

**Niet in CMS (bewust):**
- Home -- `index.astro` met complexe layout, mededelingen zijn WEL bewerkbaar via Mededelingen
- Contact, Telefoonnummers, Contact kinderen -- .astro-only interactieve pagina's
- Patientenomgeving -- .astro-only met portaal-links
- Gezondheidsinfo -- categorie-indexpagina

## Volgende stappen

### Prioriteit 1: Auto-vertaling
1. **Anthropic API key** aanmaken
2. **GitHub Action** -- `.github/workflows/translate.yml` + `scripts/translate.mjs`
3. NL-wijziging via CMS -> Action vertaalt automatisch naar EN

### Prioriteit 2: TransIP migratie (wacht op TransIP hosting)
1. **PHP auth proxy** -- eigen login (email/wachtwoord), GitHub PAT server-side
2. **Versleuteld PAT verwijderen** uit public/admin/index.html
3. **Deploy pipeline** -- GitHub Actions SFTP naar TransIP
4. **Base path** -- `/schoterpoort/` verwijderen, site URL aanpassen
5. **Mail aan UwZorgOnline** -- concept staat in sessie-historie (vraag om migratie-instructies)

## Overige openstaande punten
1. **ZIVVER Conversation Starter** -- placeholder URL in contact-kinderen.astro
2. **GitHub Pages base path** -- hardcoded `/schoterpoort/` prefix in markdown links
3. **Klachtenformulier backend** -- mailto: -> PHP op TransIP. Zie docs/refs/formulieren-backend.md
