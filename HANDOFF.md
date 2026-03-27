# Handoff -- Schoterpoort website rebuild

## Status: LIVE op GitHub Pages
URL: https://han-s-kl.github.io/schoterpoort/
CMS: https://han-s-kl.github.io/schoterpoort/admin/
Repo: https://github.com/han-s-kl/schoterpoort (publiek)
Branch: main
77 pagina's (NL + EN), build <1 seconde

## Wat is gedaan
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

## CMS -- Eigen CMS (werkend op main)

### Wat is gedaan
- **Eigen CMS** gebouwd in `public/admin/index.html` (vervangt Sveltia/Decap CMS)
  - Sveltia had toolbar bug (loshangende editor_components)
  - Decap werkte niet met onze custom token auth (vereist OAuth)
- **EasyMDE** markdown editor via CDN
- **GitHub Contents API** voor lezen/opslaan (direct commits)
- **Inline auth** -- wachtwoordformulier, versleuteld PAT (AES-256-GCM)
  - Wachtwoord: `schoterpijnboomzaanen`
  - PAT verloopt ~90 dagen na 2026-03-27, moet dan vernieuwd worden
- **Routing refactored** -- topLevel whitelist vervangen door excluded blacklist
- GitHub Pages deploy workflow: `.github/workflows/deploy.yml`
- `public/admin/config.yml` verwijderd (niet meer nodig)
- `public/admin/auth.html` verwijderd

## Volgende stappen

### Prioriteit 1: CMS herstructureren (navigatie-gebaseerd)
Het CMS moet de website-navigatiestructuur spiegelen:

**Sidebar (links):**
- Home, Contact, Telefoonnummers -- direct naar editor
- Medewerkers -- submenu rechts (4 categorieen -> staff.json)
- Diensten -- submenu rechts (7 pagina's)
- Praktisch -- submenu rechts (7 pagina's)
- Mededelingen -- alle 3 blokken op 1 bewerkpagina

**Medewerkers-editor:**
- Bron: `src/data/staff.json` (26+ medewerkers)
- Per categorie filteren op role
- Velden: naam, rol, team, telefoon, werkdagen, achtergrond, interesses, foto

**Plan:** zie `.claude/plans/delegated-herding-babbage.md`

### Prioriteit 2: Auto-vertaling
1. **Anthropic API key** aanmaken
2. **GitHub Action** -- `.github/workflows/translate.yml` + `scripts/translate.mjs`
3. NL-wijziging via CMS -> Action vertaalt automatisch naar EN

### Prioriteit 3: TransIP migratie (wacht op TransIP hosting)
4. **PHP auth proxy** -- eigen login (email/wachtwoord), GitHub PAT server-side
5. **Versleuteld PAT verwijderen** uit public/admin/index.html
6. **Deploy pipeline** -- GitHub Actions SFTP naar TransIP
7. **Base path** -- `/schoterpoort/` verwijderen, site URL aanpassen

## Overige openstaande punten
1. **ZIVVER Conversation Starter** -- placeholder URL in contact-kinderen.astro
2. **GitHub Pages base path** -- hardcoded `/schoterpoort/` prefix in markdown
3. **Klachtenformulier backend** -- mailto: -> PHP op TransIP. Zie docs/refs/formulieren-backend.md
