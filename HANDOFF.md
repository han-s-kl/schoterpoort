# Handoff -- Schoterpoort website rebuild

## Status: LIVE op GitHub Pages
URL: https://han-s-kl.github.io/schoterpoort/
Repo: https://github.com/han-s-kl/schoterpoort
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

## Volgende stap: CMS met rollen en permissies

### Vereisten
1. **Admin login** (1 account) die:
   - Andere content-editors kan aanmaken/beheren
   - Kan aangeven welke tekstblokken bewerkbaar zijn voor editors
   - Volledige toegang heeft tot alle content
2. **Content-editor login** (meerdere accounts) die:
   - Alleen aangewezen tekstblokken kan bewerken
   - NIET het design/layout kan wijzigen
   - NIET het menu kan aanpassen
   - NIET afbeeldingen/PDF's kan verwijderen
3. **Versiecontrole** -- elke wijziging is terug te draaien
4. **Hosting**: TransIP (PHP + database beschikbaar)

### Mogelijke oplossingen
- **Tina CMS** -- visuele editor, Git-based, rollen, veld-level permissies, gratis self-hosted
- **Payload CMS** -- headless CMS, admin/editor rollen, versiecontrole, draft/publish, PostgreSQL nodig
- **Strapi** -- headless CMS, rollen, versiecontrole, vereist Node.js
- **Keystatic** -- Git-based, Astro-integratie, simpeler rollensysteem
- **Decap CMS** (al geconfigureerd) -- mist rollen en granulaire permissies

### Aanbeveling
Onderzoek Tina CMS of Payload CMS. Tina is het eenvoudigst (Git-based, geen database), Payload is het krachtigst (echte rollen/permissies). Keuze hangt af van TransIP hosting mogelijkheden.

## Overige openstaande punten
1. **ZIVVER Conversation Starter** -- placeholder URL in contact-kinderen.astro
2. **Decap CMS** -- wordt vervangen door nieuw CMS (zie boven)
3. **Build warnings** -- `en/[slug].astro` conflicteert met `/en/spreekuur` en `/en/telefoonnummers`. Verwijder die uit de topLevel array.
4. **GitHub Pages base path** -- hardcoded `/schoterpoort/` prefix in markdown. Bij migratie naar eigen domein: base path verwijderen.
5. **Git push** -- `gh auth switch --user han-s-kl` nodig
6. **Klachtenformulier backend** -- mailto: -> PHP op TransIP. Zie docs/refs/formulieren-backend.md.
7. **Contact-kinderen ZIVVER URL** -- ZIVVER Conversation Starter activeren.
