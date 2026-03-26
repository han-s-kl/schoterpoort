# Handoff -- Schoterpoort website rebuild

## Status: LIVE op GitHub Pages
URL: https://han-s-kl.github.io/schoterpoort/
Repo: https://github.com/han-s-kl/schoterpoort
Branch: main (feature/initial-site gemerged)

## Wat is gedaan
- Volledige rebuild van schoterpoort.com (WordPress -> Astro + Tailwind)
- 89 pagina's (47 NL + 42 EN)
- Alle content, links, afbeeldingen, PDFs gemigreerd en geaudit
- Engelse vertaling (NL is SSOT, EN gegenereerd)
- Contact-flow met triage (spoed/afspraak/bericht)
- ZIVVER formulier voor kinderen <16
- Spreekuur redesign met praktijkkaarten uit practices.json (SSOT)
- Taalwissel NL/EN met vlaggetjes
- Decap CMS op /admin (config nog niet definitief)
- SessionStart hook voor project-inrichting check
- Git pre-commit hook (astro build)

## Openstaande punten
1. **ZIVVER Conversation Starter** -- placeholder URL in contact-kinderen.astro. Praktijk moet Conversation Starter activeren bij ZIVVER en URL aanpassen.
2. **Decap CMS** -- `public/admin/config.yml` bevat `repo: owner/schoterpoort`. Moet worden `han-s-kl/schoterpoort`.
3. **Build warnings** -- `en/[slug].astro` genereert `/en/spreekuur` en `/en/telefoonnummers` die conflicteren met de standalone .astro pagina's. Oplossing: verwijder `spreekuur` en `telefoonnummers` uit de topLevel array in `en/[slug].astro`.
4. **GitHub Pages base path** -- alle interne links moeten url() helper gebruiken. Markdown content heeft hardcoded `/schoterpoort/` prefix. Bij migratie naar eigen domein moet base path verwijderd worden.
5. **Git push** -- `gh auth switch --user han-s-kl` nodig voor push naar GitHub (standaard account is hklplrhft).
6. **Klachtenformulier backend** -- Gebruikt nu mailto:. Bij migratie naar TransIP: vervang door PHP-script. Zie docs/refs/formulieren-backend.md.
7. **Contact-kinderen ZIVVER URL** -- Placeholder URL. ZIVVER Conversation Starter moet geactiveerd worden.
