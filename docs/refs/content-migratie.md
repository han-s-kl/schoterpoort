# Content migratie regels

## Litteken: content verloren bij scraping

Bij de eerste migratie van schoterpoort.com zijn meerdere rondes nodig geweest omdat:
1. Scrape-agents tekst samenvatten in plaats van volledig overnemen
2. Externe links (thuisarts.nl, RIVM, NHG) als platte tekst werden opgeslagen zonder URLs
3. Afbeeldingen (medische foto's, logo's, app badges) niet werden meegenomen
4. PDF-documenten (jaarverslagen, beleidsplan, klachtenreglement, administratieformulier) niet werden gedownload

## Regels

- Bij het scrapen van een pagina: neem ALLE tekst over, vat NIETS samen
- Controleer elke hyperlink -- platte tekst is geen link
- Download alle afbeeldingen naar public/images/
- Download alle PDF's naar public/documents/
- Vergelijk na scraping de originele pagina met het resultaat
- Check de wp-sitemap.xml voor pagina's die niet in de navigatie staan

## Sidebar-content

De originele site had een sidebar op elke pagina met:
- Gezondheidsinfo links (reizigersadvisering, thuisarts, pharos, etc.)
- Praktijkinfo (jaarverslagen, beleidsplan, privacy, etc.)
- Nieuws

In de rebuild staat deze info in de footer en op de /gezondheid overzichtspagina.
