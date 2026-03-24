# Schoterpoort -- Huisartsenpraktijk Website

## Project
Website voor Huisartsenpraktijk Schoterpoort in Haarlem (schoterpoort.com).
Vier huisartsen, NPA-gecertificeerd, onderwijspraktijk UvA/Amsterdam UMC.

## Tech Stack
- **Framework:** Astro 6 (statische site generator)
- **Styling:** Tailwind CSS 4 met @tailwindcss/typography
- **CMS:** Decap CMS (git-based, op /admin)
- **Hosting:** Cloudflare Pages (gepland)
- **Taal:** TypeScript (strict)

## Commando's
- `npm run dev` -- dev server op port 4321
- `npm run build` -- productie build (astro build)
- `npm run preview` -- preview productie build

## Architectuur

### Content
- `src/content/pages/*.md` -- informatiepagina's (markdown + frontmatter)
- `src/content/news/*.md` -- nieuwsberichten
- `src/content.config.ts` -- collection schemas

### Data
- `src/data/practices.json` -- 4 huisartsen met contactgegevens, assistenten
- `src/data/staff.json` -- alle 26+ medewerkers met bio's, foto's, werkdagen
- `src/data/navigation.json` -- menustructuur

### Routing
- `src/pages/[slug].astro` -- catch-all voor top-level content pagina's (topLevel array!)
- `src/pages/medewerkers/[slug].astro` -- medewerkerspagina's per categorie
- `src/pages/gezondheid/[slug].astro` -- gezondheidsinformatie
- `src/pages/nieuws/[slug].astro` -- nieuwsberichten
- Zie docs/refs/routing.md voor details

### Componenten
- `src/components/layout/` -- Header, Footer
- `src/components/staff/StaffCard.astro` -- medewerker weergave met foto/fallback

## Kritieke regels

### Content
- NOOIT content verwijderen -- anders indelen mag, tekst weghalen niet
- Alle originele tekst, links, afbeeldingen en PDF's van schoterpoort.com moeten behouden blijven
- Bij nieuwe pagina's: voeg slug toe aan topLevel array in src/pages/[slug].astro

### Beveiliging
- Medische gegevens vallen onder NEN 7510 en AVG
- Beveiligde communicatie via ZIVVER (niet via gewone e-mail)
- Geen medische data in formulieren zonder encryptie
- Geen secrets in code of CLAUDE.md

### Communicatie-routing patienten
- 16+ jaar: patientenomgeving (uwzorgonline), NIET mailen
- <16 jaar: beveiligd via ZIVVER (/contact-kinderen)
- Spoed: altijd bellen
- E-mailadres niet prominent tonen (vermijd ongestructureerde e-mails)

## Referenties
- docs/refs/content-migratie.md -- regels voor content behoud
- docs/refs/data-structuur.md -- practices.json en staff.json opbouw
- docs/refs/routing.md -- hoe pagina-routing werkt
