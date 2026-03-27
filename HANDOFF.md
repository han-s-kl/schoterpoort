# Handoff -- Schoterpoort website rebuild

## Status: LIVE op GitHub Pages
URL: https://han-s-kl.github.io/schoterpoort/
CMS: https://han-s-kl.github.io/schoterpoort/admin/
Repo: https://github.com/han-s-kl/schoterpoort (publiek)
Branch: main
88 pagina's (44 NL + 44 EN), build <1 seconde

## Wat is gedaan
- Volledige rebuild van schoterpoort.com (WordPress -> Astro + Tailwind)
- 88 pagina's (NL + EN) met alle content, links, afbeeldingen, PDFs
- Engelse vertaling (NL is SSOT, EN gegenereerd)
- Contact-flow met triage (spoed/afspraak/bericht)
- ZIVVER formulier voor kinderen <16
- Spreekuur + patientenomgeving als styled Astro pagina's (practices.json SSOT)
- Klachtenformulier (HTML form, mailto: tijdelijk)
- Taalwissel NL/EN met SVG vlaggetjes
- Staff bios: letterlijke originele tekst, initialen buiten bio's
- SessionStart hook + git pre-commit hook (astro build)
- CLAUDE.md, docs/refs/, HANDOFF.md ingericht

## CMS -- Decap CMS (werkend op main)

### Wat is gedaan
- **Decap CMS** -- teruggeschakeld van Sveltia CMS vanwege toolbar bug (loshangende editor_components)
- **Blocks content collectie** -- homepage mededelingen dynamisch vanuit `src/content/blocks/`
- **Inline auth** -- wachtwoordformulier in index.html, versleuteld PAT (AES-256-GCM)
  - Wachtwoord: `schoterpijnboomzaanen`
  - PAT verloopt ~90 dagen na 2026-03-27, moet dan vernieuwd worden
- **Alleen NL collecties** in CMS: Mededelingen (3), Nieuwsberichten (5), Pagina's (35), Medewerkers, Navigatie
- EN collecties verwijderd -- worden straks automatisch vertaald via GitHub Action
- **Routing refactored** -- topLevel whitelist vervangen door excluded blacklist (nieuwe pagina's werken automatisch)
- GitHub Pages deploy workflow: `.github/workflows/deploy.yml`
- `public/admin/auth.html` verwijderd (was ongebruikt, inline auth in index.html)

## Volgende stappen

### Prioriteit 1: CMS afmaken
1. ~~**Editor UX fixen**~~ -- opgelost door switch naar Decap CMS
2. **Test opslaan** -- wijziging via CMS -> commit op GitHub verificeren
3. ~~**auth.html opruimen**~~ -- verwijderd

### Prioriteit 2: Auto-vertaling
4. **Anthropic API key** aanmaken (nodig voor vertaling)
5. **GitHub Action** -- `.github/workflows/translate.yml` + `scripts/translate.mjs`
6. NL-wijziging via CMS -> Action vertaalt automatisch naar EN

### Prioriteit 3: TransIP migratie (wacht op TransIP hosting)
7. **PHP auth proxy** -- eigen login (email/wachtwoord), GitHub PAT server-side
8. **Versleuteld PAT verwijderen** uit public/admin/index.html
9. **Deploy pipeline** -- GitHub Actions SFTP naar TransIP
10. **Base path** -- `/schoterpoort/` verwijderen, site URL aanpassen

## Overige openstaande punten
1. **ZIVVER Conversation Starter** -- placeholder URL in contact-kinderen.astro
2. **GitHub Pages base path** -- hardcoded `/schoterpoort/` prefix in markdown
3. **Klachtenformulier backend** -- mailto: -> PHP op TransIP. Zie docs/refs/formulieren-backend.md
4. **Contact-kinderen ZIVVER URL** -- ZIVVER Conversation Starter activeren
