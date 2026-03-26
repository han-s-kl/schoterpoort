# Formulieren backend

## Huidige staat
Het klachtenformulier (/klachtenformulier) gebruikt `mailto:info@schoterpoort.com` als form action.
Dit opent de e-mailclient van de gebruiker -- niet ideaal.

## Bij migratie naar TransIP
TransIP biedt PHP-hosting. Vervang de mailto: action door een PHP-script:

1. Maak `public/api/klacht.php` met:
   - Validatie van verplichte velden
   - `mail()` functie naar info@schoterpoort.com
   - CSRF-token check
   - Redirect naar bedankpagina
2. Wijzig `src/pages/klachtenformulier.astro`:
   - `action="/api/klacht.php"` i.p.v. `mailto:`
   - `method="POST"` (blijft)
   - Voeg CSRF-token hidden field toe
3. Maak een bedankpagina (`/klacht-verstuurd`)

## Geldt ook voor
- Contact-kinderen formulier (/contact-kinderen) -- nu ZIVVER placeholder
- Eventueel toekomstige formulieren
