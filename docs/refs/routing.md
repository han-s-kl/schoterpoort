# Routing

## Hoe pagina's werken

### Content pagina's (markdown)
Markdown bestanden in `src/content/pages/` worden gerenderd door `src/pages/[slug].astro`.

**BELANGRIJK:** Bij een nieuwe pagina moet de slug worden toegevoegd aan de `topLevel` array in `getStaticPaths()` van `src/pages/[slug].astro`. Anders krijg je een 404.

Huidige topLevel array:
```
spreekuur, huisbezoek, tarieven, eigen-risico, apotheek,
spoedpost, klachtenregeling, privacy, medisch-dossier,
information, vacatures, formulieren,
klachtenformulier, administratieformulier, urineonderzoek-formulier,
minderjarigen-wilsonbekwamen, cookiewetgeving,
aanmelding-nieuwe-patienten, ik-geef-toestemming,
routebeschrijving, beeldbellen-videoconsult,
patientenomgeving, herhaalrecept
```

### Medewerkers
`src/pages/medewerkers/[slug].astro` filtert staff.json op basis van roleMap.
Slugs: huisartsen, praktijkverpleegkundigen, praktijkassistenten, huisartsen-in-opleiding.

### Gezondheidsinfo
`src/pages/gezondheid/[slug].astro` filtert pages op healthPageIds.
Slugs: reizigersadvisering, soa, spiraal, tekenbeet, wrattenspreekuur, urineweginfecties, zwangerschap.

### Nieuws
`src/content/news/*.md` met frontmatter: title, date, description.

### Standalone pagina's (Astro)
Sommige pagina's zijn .astro bestanden i.p.v. markdown:
- `src/pages/contact.astro` -- interactieve contact-flow
- `src/pages/contact-kinderen.astro` -- ZIVVER formulier voor kinderen <16
- `src/pages/telefoonnummers.astro` -- telefoonnummers met data uit practices.json

## Dev server herstarten

Na het toevoegen van nieuwe routes moet de dev server herstart worden (`kill + npx astro dev`). De build (`astro build`) pikt nieuwe routes direct op.
