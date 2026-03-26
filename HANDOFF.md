# Handoff -- Schoterpoort website rebuild

## Status: LIVE op GitHub Pages
URL: https://han-s-kl.github.io/schoterpoort/
Repo: https://github.com/han-s-kl/schoterpoort
Branch: main (CMS werk op feature/cms-setup)
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

## CMS -- Sveltia CMS (in progress, branch feature/cms-setup)

### Wat is gedaan (Fase 1 + 2)
- **Sveltia CMS** vervangt Decap CMS (drop-in, betere UX, zelfde config formaat)
- **Blocks content collectie** -- homepage mededelingen geextraheerd naar `src/content/blocks/` en `blocks-en/` (3 NL + 3 EN markdown bestanden)
- Mededelingen op homepage renderen nu dynamisch vanuit de blocks collectie
- Blocks schema: title, type (warning/info/neutral), visible, order
- **config.yml** uitgebreid met 10 collecties:
  - Editor: blocks, blocks-en, news, news-en, pages, pages-en (delete: false)
  - Admin-only: staff, navigation-nl, navigation-en
- **Editorial workflow** ingeschakeld (wijzigingen worden PRs)
- Build: 88 pagina's, geen errors

### Gekozen aanpak: Sveltia CMS + PHP auth proxy met bot-token
- Editors loggen in met email/wachtwoord (geen GitHub account nodig)
- PHP proxy op TransIP valideert credentials tegen MySQL
- Bot-token (GitHub PAT) wordt gebruikt voor alle GitHub API calls
- Rol-gefilterde config: editors zien alleen hun toegestane collecties
- Zie plan: `.claude/plans/ancient-roaming-taco.md`

### Volgende stappen (wacht op TransIP hosting)

**Fase 3: PHP auth proxy**
- `cms-api/login.php` -- login formulier + sessie
- `cms-api/callback.php` -- retourneert bot-token na auth
- `cms-api/admin.php` -- gebruikersbeheer (CRUD)
- MySQL tabel: cms_users (email, password_hash, display_name, role, allowed_collections)
- GitHub PAT (fine-grained) aanmaken met repo-schrijfrechten

**Fase 4: Rol-gefilterde CMS config**
- `cms-api/cms-config.php` -- genereert config.yml per gebruikersrol
- Admin: alle collecties, Editor: alleen allowed_collections

**Fase 5: Deploy pipeline**
- GitHub Actions: astro build + SFTP deploy naar TransIP
- astro.config.mjs: site URL en base path aanpassen voor eigen domein

## Overige openstaande punten
1. **ZIVVER Conversation Starter** -- placeholder URL in contact-kinderen.astro
2. **Build warnings** -- `en/[slug].astro` conflicteert met `/en/spreekuur` en `/en/telefoonnummers`. Verwijder die uit de topLevel array.
3. **GitHub Pages base path** -- hardcoded `/schoterpoort/` prefix in markdown. Bij migratie naar eigen domein: base path verwijderen.
4. **Git push** -- `gh auth switch --user han-s-kl` nodig
5. **Klachtenformulier backend** -- mailto: -> PHP op TransIP. Zie docs/refs/formulieren-backend.md.
6. **Contact-kinderen ZIVVER URL** -- ZIVVER Conversation Starter activeren.
