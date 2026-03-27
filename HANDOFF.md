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
- Contact, Telefoonnummers, Contact kinderen -- .astro-only interactieve pagina's
- Gezondheidsinfo -- categorie-indexpagina

## Volgende stappen

### Prioriteit 1: Home en Patientenomgeving bewerkbaar maken via CMS

Zelfde aanpak als spreekuur: JSON databestand + .astro template leest hieruit + CMS editor.

**Home (`index.astro`)** -- maak `src/data/home.json`:
- Mededelingen: KLAAR (blocks collection, al bewerkbaar via Mededelingen in CMS)
- Telefonisch consult blokje: tekst (1 veld)
- Afspraak afzeggen blokje: tekst (1 veld)
- Kwaliteit: 3 blokjes (NPA-keurmerk titel+tekst, Ons artsenteam titel+tekst, onderste blok tekst)
- Wist u dat?: 8 blokjes (elk tekst, icon blijft hardcoded)

**Patientenomgeving (`patientenomgeving.astro`)** -- maak `src/data/patientenomgeving.json`:
- Introductietekst (1 tekstveld + opsomming)
- 4 portaal-links (titel + URL per stuk, gestructureerd)
- Belangrijk: 3 blokjes in 2 opmaaktypes (tekst per blok + type indicator)
- Mobiele app: link URL (1 veld)
- Hulp nodig: telefoonnummer + website-link (2 velden)

**Implementatie per pagina:**
1. JSON databestand aanmaken met huidige hardcoded content
2. .astro template aanpassen: `import data from '../data/xxx.json'` + data in template
3. CMS NAV_ITEMS: nieuw item met mode 'home' / 'patientenomgeving'
4. CMS editor functies: `openHomeEditor()` / `openPatientenomgevingEditor()`
5. Gestructureerde velden met WYSIWYG contenteditable + bold/link knoppen

**Referentie:** Spreekuur-implementatie als voorbeeld:
- `src/data/spreekuur.json` -- datastructuur
- `src/pages/spreekuur.astro` -- template leest uit JSON
- `public/admin/index.html` -- `openSpreekuurEditor()`, `SPREEKUUR_SECTIONS`, `saveSpreekuur()`

### Prioriteit 2: Auto-vertaling
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
