# Content vergelijking: oude WordPress site vs nieuwe Astro site

**Datum:** 2026-04-10
**Bron oud:** https://schoterpoort.praktijkinfo.nl/ (WordPress)
**Bron nieuw:** lokale repo (Astro + Tailwind)
**Scope:** alleen Nederlandse content

---

## Samenvatting

| Categorie | Aantal |
|---|---|
| Pagina's vergeleken | 28 |
| Identiek of bijna-identiek | 8 |
| Wijzigingen (aanvullingen of weglatingen) | 17 |
| Volledig nieuwe pagina's (niet op oude site) | 3 |

### Algemene observaties

1. **Telefoonnummers en adressen centraal beheerd**: Op de oude site stonden contactgegevens en het keuzemenu op vrijwel elke pagina herhaald. Op de nieuwe site staat dit in `practices.json` en wordt het via componenten getoond op een handvol relevante pagina's (huisbezoek, spoedpost, administratieformulier). Resultaat: minder herhaling, makkelijker onderhouden.

2. **Nieuwsberichten/mededelingen**: De homepage van de oude site had losse nieuwsberichten (bv. "Vanaf vandaag werken wij met een nieuw telefoonsysteem", "Schaap naar Nieuw-Zeeland"). Deze zijn op de nieuwe site vervangen door een "Actuele mededelingen" sectie die via het CMS bewerkbaar is (`src/content/blocks/`).

3. **Praktijksluitingen**: De oude site lijst praktijksluitingen op de homepage (april/mei 2026 sluitingsdata per praktijk). Deze concrete sluitingsdata zijn **niet** overgenomen naar de nieuwe site -- de mededelingen-sectie kan deze functie wel vervullen via het CMS.

4. **Engelse tekst op NL homepage**: De oude site had een Engelse welkomstparagraaf op de NL homepage ("Welcome to the website of the General Practioner practice Schoterpoort!"). Op de nieuwe site is NL en EN strikt gescheiden -- die zin staat alleen op `/en/`.

5. **Avondspreekuur**: De nieuwe site vermeldt expliciet dat avondspreekuur op 1 dag per week is en de dag varieert. De oude site noemt "late afspraken (tussen 17.00 en 19.00 uur)" zonder dezelfde detaillering.

6. **Health info pagina's (gezondheidsinfo)**: Vrijwel letterlijk overgenomen van de oude site (zelf van thuisarts.nl afkomstig). Inhoud is medisch-inhoudelijk gelijk.

7. **Nieuwe pagina's**: Aanmelding nieuwe patienten, beeldbellen, ik-geef-toestemming hebben hetzelfde onderwerp maar de teksten zijn ingekort/herschreven.

---

## Pagina-voor-pagina vergelijking

### `/` (Home)

**Oud:** `https://schoterpoort.praktijkinfo.nl/`
**Nieuw:** `src/pages/index.astro` + `src/data/home.json` + `src/content/blocks/*.md` + `src/data/practices.json`

#### Verwijderd (alleen op oude site)
- Engelse welkomstparagraaf: "Welcome to the website of the General Practioner practice Schoterpoort! For more information in English click here." (op nieuwe site verplaatst naar /en/)
- Concrete praktijksluitingen april/mei 2026 met exacte data per praktijk (Praktijk Van der Eem, Steketee, Duijn, Louwet)
- Nieuwsbericht 20 september 2025 over Willemijn Schaap die naar Nieuw-Zeeland gaat
- Nieuwsbericht 15 juli 2025 over nieuw telefoonsysteem
- Mededeling "Personeelstekort wegens ziekte" met uitleg over kleiner assistententeam
- Lijst van 4 huisartsen met praktijktelefoonnummers staat op de oude home; nieuwe home toont praktijken in een aparte "Onze praktijken" sectie

#### Toegevoegd (alleen op nieuwe site)
- Hero-sectie met grote titel "Huisartsenpraktijk Schoterpoort" en subtitel met kerninformatie ("Vier praktijken, acht huisartsen, persoonlijke zorg... patienttevredenheidsscore van 8,5 tot 9")
- Quick actions blokken (Spreekuur, Herhaalrecept, Patientenomgeving, Telefoonnummers, Spoedpost) als grote knoppen
- "Actuele mededelingen" sectie via CMS-blocks
- "Spoed buiten openingstijden?" callout met direct belknop
- "Telefonisch consult" en "Afspraak afzeggen" als twee duidelijke kaarten
- Sectie "Gezondheidsinfo" met links naar Thuisarts.nl en MINDD zelftriage widget (geintegreerd)
- Teamfoto onderaan de pagina

#### Identiek/gewijzigd
- "Wist u dat..." lijst is overgenomen, met enkele herformuleringen:
  - Oud: "u bij verdenking op een blaasontsteking de urine in het koelkastje bij de ingang kunt achterlaten?"
  - Nieuw: "Bij vermoeden van blaasontsteking: laat urinemonster achter in de koeler bij de ingang met ingevuld formulier"
  - Nieuw item toegevoegd: verwijzing naar moetiknaardedokter.nl naast thuisarts.nl
- "Wat mag u van ons verwachten" feiten zijn overgenomen (NPA sinds 2006, opnieuw 2025 verlengd, 8,5-9 tevredenheid, 4 huisartsen + 2 in opleiding = 10 artsen, opleidingspraktijk AMC/UMC Amsterdam)
- Adres (Pijnboomstraat 19, 2023 VN Haarlem) en algemeen nummer (023-541 03 45) ongewijzigd
- Praktijktijden ma-vr 08:00-17:00 ongewijzigd

#### Hersteld na eerste gemiste observatie (2026-04-10)
- De **persoonlijke en kleinschalige zorg** paragraaf was bij de eerste rebuild verkort tot een kale samenvatting in het "Hoog niveau" blok. De warme toon ("vaak maken wij een groot deel van uw leven mee: lief en leed", "eerste aanspreekpunt van jong tot oud", "zodat u niet 'verdwaalt' in de zorg") is teruggezet als 4e kwaliteit-blok "Persoonlijke zorg" in `home.json` en `home-en.json`.

---

### `/telefoonnummers`

**Oud:** `/telefoonnummers/`
**Nieuw:** `src/pages/telefoonnummers.astro` + `src/data/practices.json`

#### Verwijderd
- Geen relevante content verwijderd

#### Toegevoegd
- Verpleegkundigenlijn `phoneNurses: 023-525 69 83` zit nu in practices.json (was niet apart genoemd op de oude pagina)

#### Identiek/gewijzigd
- Alle 4 praktijktelefoonnummers identiek: Louwet 023-525 43 02, Duijn 023-525 54 03, Steketee 023-525 62 31, Van der Eem 023-525 33 04
- Algemeen nummer 023-541 03 45 identiek
- Spoedpost na kantooruren 023-750 4567 identiek
- 112 voor levensgevaar identiek
- Keuzemenu identiek: 1 spoed, 2 recepten, 3 assistente, 4 intercollegiaal artsenoverleg
- Toelichting bij praktijken (artsen + waarnemers + werkdagen) identiek

---

### `/spreekuur`

**Oud:** `/spreekuur/`
**Nieuw:** `src/pages/spreekuur.astro` + `src/data/spreekuur.json`

#### Verwijderd
- (Niets significants)

#### Toegevoegd
- Visuele kaarten per praktijk met arts-naam, werkdagen en directe belknop
- Aparte expliciete blokken per consulttype (Standaard, Dubbel, Spoed, Video, Terugbel)
- Openingstijden + keuzemenu in een aparte side-by-side weergave
- Expliciete vermelding dat aan de balie geen afspraken kunnen worden gemaakt (privacy)

#### Gewijzigd
- Oud: "Consulten zijn op telefonische afspraak. Praktijk bereikbaar 8-17. Tussen 12-14 en 16:30-17 alleen spoed."
- Nieuw: zelfde informatie maar verspreid over kaarten en context-blok
- Oud: "spoed: bel uw huisarts gevolgd door 1"
- Nieuw: identiek (`Tijdens kantooruren: bel uw huisarts, keuze {spoedKey}`)
- Afzeg-instructie 24/48 uur identiek

---

### `/herhaalrecept`

**Oud:** `/recept-herhaal/`
**Nieuw:** `src/pages/herhaalrecept.astro` + `src/data/herhaalrecept.json`

#### Verwijderd
- Niets significants

#### Toegevoegd
- Telefoonnummers per praktijk worden expliciet onder de receptenlijn-uitleg getoond (gegenereerd uit practices.json)

#### Identiek/gewijzigd
- Beide methoden identiek: receptenlijn (keuze 2) en patientenomgeving
- 7 dagen vertraging na account aanmaken: identiek
- Vragen die de receptenlijn stelt: identiek (huisartsnaam, naam/geboortedatum, adres, medicijn, apotheek)
- Chronische medicatie alleen, geen nieuwe klachten: identiek
- Wanneer klaar: voor 12:00 → 2 werkdagen later vanaf 15:00, identiek
- Voorbeelden (dinsdagavond → vrijdag, vrijdagmiddag/weekend → woensdag): identiek

---

### `/apotheek`

**Oud:** `/apotheek/`
**Nieuw:** `src/pages/apotheek.astro` + `src/content/pages/apotheek.md`

#### Verwijderd
- Niets

#### Toegevoegd
- Tabelvorm i.p.v. lijst, met kolom voor website-link per apotheek
- "Voor meer informatie over de dienstapotheken: www.sahz.nl" expliciet in eigen sectie

#### Identiek
- Recepten elektronisch verzonden, niet ophalen: identiek
- Marnix Apotheek ma-vr 8-18: identiek
- Schoterbos Apotheek met opmerking "vanaf 1 maart 2025: 8-17:30": identiek
- Catharinahuis ma-vr 8-17:30 + za 8:30-12:30: identiek
- Frans Hals Apotheek ma-vr 8:30-17:30: identiek
- Spaarne Gasthuis Zuid 24/7: identiek
- Spaarne Gasthuis Noord ma-vr 8:30-17:30 (gesloten weekend): identiek
- Spaarne Gasthuis Hoofddorp ma-vr 8:30-18, weekend 9:30-18: identiek

---

### `/huisbezoek`

**Oud:** `/huisbezoek/`
**Nieuw:** `src/pages/huisbezoek.astro` + `src/content/pages/huisbezoek.md`

#### Verwijderd
- Adres + keuzemenu + spoedinfo stond direct in body op oude site → nu via centrale `ContactSpoedBlock`-component (zelfde inhoud, andere weergave)

#### Toegevoegd
- Niets nieuws inhoudelijk

#### Identiek
- "Huisbezoek is bedoeld voor ernstig zieke patienten of voor patienten die slecht ter been zijn": identiek
- "Onderzoek op de praktijk biedt betere diagnostische mogelijkheden": identiek
- "Aanvragen voor 11:00 uur": identiek

---

### `/spoedpost`

**Oud:** `/spoedpost-waarneming/`
**Nieuw:** `src/pages/spoedpost.astro` + `src/content/pages/spoedpost.md` + `practices.json`

#### Verwijderd
- Niets

#### Toegevoegd
- "Tijdens kantooruren" en "Buiten kantooruren" gestyleerde callout-blokken bovenaan
- 112 vermelding apart in eigen blok

#### Identiek
- Twee locaties (Spaarne Gasthuis Noord, Vondelweg 999 en Zuid, Boerhaavelaan 22): identiek
- Tijden Noord (avond 17-23, weekend 8-23, nacht gesloten, SEH tot 22): identiek
- Tijden Zuid (24/7): identiek
- Inzage medisch dossier sectie (LSP, afschermen op verzoek): identiek
- Waarneming bij vakantie: identiek

---

### `/patientenomgeving`

**Oud:** `/patientomgeving/`
**Nieuw:** `src/pages/patientenomgeving.astro` + `src/data/patientenomgeving.json`

#### Verwijderd
- "Deelvensters" met logos van uwzorgonline (visueel verschillend opnieuw vormgegeven op nieuwe site)

#### Toegevoegd
- Expliciete waarschuwing: "Kies de juiste praktijk/huisarts. Anders kunnen we uw aanmelding niet in behandeling nemen" (gekleurde warning-blok)
- Verwijzing naar contactformulier voor kinderen <16 (link naar `/contact-kinderen`)

#### Identiek
- 4 portaal-links naar Praktijk Louwet/Duijn/Van der Eem/Steketee uwzorgonline
- "Patientenomgeving alleen voor 16 jaar en ouder" disclaimer: identiek
- App download verwijzing: identiek
- Helpdesk Digitale Zorg: 085-130 4575 -- identiek

---

### `/tarieven`

**Oud:** `/tarieven-2019/` (URL slug nog 2019, content is 2025)
**Nieuw:** `src/pages/tarieven.astro` + `src/content/pages/tarieven.md`

#### Identiek/Letterlijk
- Alle reguliere tarieven identiek (Consult <5 EUR 6,21, 5-20 EUR 12,43, >20 EUR 24,85, Visite 18,64, Visite >20 31,06)
- Alle passantentarieven identiek (15,93 / 31,86 / 63,72 / 47,79 / 79,65)
- Verrichtingen identiek (Chirurgie 112,28, Compressie 75,47, Oogboring 71,75, Therapeutische injectie 37,92, IUD/Implanon 79,19)
- "Vallen niet onder eigen risico (EUR 385 in 2025)": identiek

#### Toegevoegd
- Sectie over laboratoriumonderzoek met expliciete melding "vallen WEL onder eigen risico"
- Directe links naar Streeklaboratorium en AtalMedial tarieven

---

### `/eigen-risico`

**Oud:** `/eigen-risico/`
**Nieuw:** `src/pages/eigen-risico.astro` + `src/content/pages/eigen-risico.md`

#### Identiek (woordelijk)
- Volledige tekst is letterlijk overgenomen
- "Iedereen van 18 jaar of ouder heeft een verplicht eigen risico..."
- Bedrag EUR 385 (in 2025)
- Lijst van uitzonderingen (huisarts, geneesmiddelen vallen er wel onder, etc.)
- Verloskundige zorg uitzondering
- "Kinderen en jongeren van 0 t/m 17 jaar zijn vrijgesteld"

---

### `/klachtenformulier`

**Oud:** `/klachten-formulier/`
**Nieuw:** `src/pages/klachtenformulier.astro`

#### Identiek
- Formuliervelden: Voornaam, Achternaam (verplicht), Adres, Postcode, Plaats, Telefoon (verplicht), E-mailadres (verplicht), Klacht (verplicht)
- Introductietekst: identiek

#### Verschil
- Oude site had CAPTCHA, nieuwe site heeft dat (nog) niet
- Backend: oude site verwerkte via WordPress, nieuwe site gebruikt mailto: (tijdelijk, zie HANDOFF)

---

### `/klachtenregeling`

**Oud:** `/klachtenregeling-2/`
**Nieuw:** `src/pages/klachtenregeling.astro` + `src/content/pages/klachtenregeling.md`

#### Identiek
- Eerst klacht bespreken met huisarts/medewerker: identiek
- Klachtencoordinator pakt klacht op via formulier: identiek
- DOkH externe klachtenfunctionaris met contactgegevens (Robijnstraat 6 Alkmaar, 072-5208325, klachtenengeschillen@dokh.nl): identiek

#### Toegevoegd
- Link naar PDF van klachtenreglement: nieuw

---

### `/administratieformulier`

**Oud:** `/administratieformulier/`
**Nieuw:** `src/pages/administratieformulier.astro` + `src/content/pages/administratieformulier.md`

#### Identiek
- Doel formulier (gewijzigde adres- en verzekeringsgegevens doorgeven, niet voor inschrijving): letterlijk overgenomen

#### Toegevoegd
- Sectie "Veelvoorkomende verzoeken" met links naar Medisch dossier en Tarieven (bv. attest aanvragen)
- Praktijkmanager vermelding (uit staff.json) wordt onderaan getoond via component

---

### `/urineonderzoek-formulier`

**Oud:** `/urineonderzoek-formulier/`
**Nieuw:** `src/pages/urineonderzoek-formulier.astro` + `src/content/pages/urineonderzoek-formulier.md`

#### Identiek
- Doel: bij vermoeden urineweginfectie urine inleveren
- Vragenlijst link
- Verwijzing naar urineweginfecties pagina

---

### `/vacatures`

**Oud:** `/vacatures/`
**Nieuw:** `src/pages/vacatures.astro` + `src/content/pages/vacatures.md`

#### Verwijderd
- "Januari 2025" datumvermelding boven de vacature (was bewust eruit gehaald)

#### Identiek
- Vacature voor doktersassistent: identiek
- Link naar PDF op de oude WordPress site (`schoterpoort.praktijkinfo.nl/wp-content/...`) wordt nog steeds gebruikt
- Algemene tekst: identiek

---

### `/medewerkers` (overzicht)

**Oud:** `/medewerkers/`
**Nieuw:** `src/pages/medewerkers/index.astro` + `src/data/staff.json`

#### Verwijderd
- Algemene introtekst over functietypen (praktijkassistenten, praktijkverpleegkundigen, spreekuurondersteuner, POH-GGZ) die op oude pagina alle taken samenvatte

#### Toegevoegd
- Visueel grid/index met categorieen die naar 4 sub-pagina's leiden (huisartsen, praktijkverpleegkundigen, praktijkassistenten, huisartsen in opleiding)

---

### `/medewerkers/huisartsen`

**Oud:** `/huisartsen/`
**Nieuw:** `src/pages/medewerkers/[slug].astro` met data uit `staff.json`

#### Identiek (per persoon)
- 8 huisartsen: Margot Louwet, Natasja Moes, Marina Duijn, Britt Schouten, Lisette van der Eem, Sandra Bosch, Willemijn Steketee, Willemijn Schaap
- BIG-nummers identiek waar aanwezig
- Bio-teksten letterlijk of grotendeels identiek (carriereverloop, persoonlijk leven, hobby's)

#### Verschil
- Oude site toont initialen niet bij alle artsen, nieuwe site is consistent met "M. Louwet", "N.M. Moes", etc.

---

### `/medewerkers/praktijkverpleegkundigen`

**Oud:** `/praktijkverpleegkundigen-somatiek-spreekuurondersteuner-en-praktijkondersteuners-ggz/`
**Nieuw:** `src/pages/medewerkers/[slug].astro`

#### Identiek
- Martine van Die en Britta Forma met diabetes/COPD/ouderen specialisaties
- Marjoleine als spreekuurondersteuner
- Alette Bubberman en Irene Verweij als POH-GGZ

#### Verschil
- Werkdagen identiek
- Bio's grotendeels gelijk

---

### `/medewerkers/praktijkassistenten`

**Oud:** `/praktijkassistenten/`
**Nieuw:** `src/pages/medewerkers/[slug].astro`

#### Identiek
- Eefje van der Burgh (Praktijkmanager), Carolien, Jessica, Shanice, Pauline, Marjoleine, Larissa, Wendy, Milou, Thea, Ellen
- Werkdagen voor elke medewerker: identiek
- Toewijzing aan praktijken (dr. Louwet, dr. Duijn, etc.): identiek

#### Verschil
- Op oude site staan geen biografische teksten bij assistentes; nieuwe site idem (geen bio's toegevoegd)

---

### `/medewerkers/huisartsen-in-opleiding`

**Oud:** `/huisartsen-in-opleiding-en-co-assistenten-amsterdam-umc-amc/`
**Nieuw:** `src/pages/medewerkers/[slug].astro`

#### Identiek
- Jesse Holverda (HAIO bij Louwet, sinds maart 2026): identiek
- Lazin Germawi (HAIO bij Steketee): identiek
- Bio-teksten letterlijk overgenomen

---

### `/gezondheid/reizigersadvisering`

**Oud:** `/pagina/63/reizigersadvisering/`
**Nieuw:** `src/content/pages/reizigersadvisering.md`

#### Identiek
- GGD Kennemerland (Zijlweg 200, 023-789 1616, ggdreisvaccinaties.nl)
- Meditel Amsterdam/Alkmaar (0900-2021040)
- LCR.nl verwijzing
- Inleidende tekst over verre reizen en vaccinaties

---

### `/gezondheid/wrattenspreekuur`

**Oud:** `/pagina/71/wrattenspreekuur/`
**Nieuw:** `src/content/pages/wrattenspreekuur.md`

#### Identiek (qua structuur en inhoud)
- Soorten wratten (gewone, voet, water): identiek
- Oorzaak (virus, vochtige omgevingen): identiek
- Zelfbehandeling salicylzuur 30% (voeten) en 20% collodium (handen): identiek
- Stikstofbehandeling, herhaling na 4 weken: identiek

#### Gewijzigd
- Nieuwe site heeft de tekst iets geherstructureerd in genummerde kopjes, maar inhoudelijk gelijk

---

### `/gezondheid/zwangerschap`

**Oud:** `/pagina/72/zwangerschap/`
**Nieuw:** `src/content/pages/zwangerschap.md`

#### Identiek (woordelijk overgenomen van thuisarts.nl)
- Volledige inhoud is letterlijk overgenomen
- Laatste herziene datum (31-1-2023): identiek
- Alle 30+ paragrafen identiek

---

### `/gezondheid/soa`

**Oud:** `/pagina/73/soa/`
**Nieuw:** `src/content/pages/soa.md`

#### Identiek
- Algemene SOA-uitleg, symptomen, wachttijd 3 weken/3 maanden HIV
- Tarieven 2025 (basistarief 19,86, screening 121,17, etc.)
- GGD gratis testen voor risicogroepen (MSM, jongeren, sekswerkers)
- Spaarne Gasthuis als alternatief

#### Gewijzigd
- Nieuwe site herstructureert de testmethoden in een lijst per aandoening
- Risicogroep "jongeren t/m 24 jaar" → nieuwe site noemt "jonger dan 25 jaar" (zelfde grens)
- "Prostitué(e)s" → "Sekswerkers" (gemoderniseerde term)

---

### `/gezondheid/urineweginfecties`

**Oud:** `/pagina/74/urineweginfecties/`
**Nieuw:** `src/content/pages/urineweginfecties.md`

#### Identiek
- Opvang-instructies (middelste deel, schoon potje, binnen 1 uur, koelkast)
- Doelgroep-links naar thuisarts.nl pagina's
- Sectie voor kinderen die nog luiers dragen (vrije plas opvangen)
- Plaszakje als alternatief
- Adres en keuzemenu staan in nieuwe site via component

---

### `/gezondheid/spiraal`

**Oud:** `/pagina/75/spiraal/`
**Nieuw:** `src/content/pages/spiraal.md`

#### Identiek (woordelijk)
- Beschrijving spiraaltje, koper vs hormoon
- Werking, betrouwbaarheid, geldigheid (10 jaar koper, 8 jaar hormoon)
- Plaatsingsprocedure inclusief naproxen 500mg
- Bijwerkingen
- Controle-advies

#### Toegevoegd op nieuwe site
- Afbeelding van spiraaltje (`/schoterpoort/images/health/spiraal.jpg`)
- Verwijzing naar SOA-pagina
- YouTube link naar Mirena-filmpje

---

### `/gezondheid/tekenbeet`

**Oud:** `/pagina/77/tekenbeet/`
**Nieuw:** `src/content/pages/tekenbeet.md`

#### Identiek (woordelijk)
- Volledige tekst, alle secties (wat is een teek, verschijnselen, voorkomen, verwijderen, medicijnen, contact opnemen, meer info)
- RIVM-link, Tekenradar.nl
- Laatst herzien 26-02-2025

#### Toegevoegd op nieuwe site
- Afbeeldingen (teek op huid, erythema migrans)

---

### `/medisch-dossier`

**Oud:** `/medisch-dossier/`
**Nieuw:** `src/pages/medisch-dossier.astro` + `src/content/pages/medisch-dossier.md`

#### Identiek
- Recht op inzage en afschrift, behoudens privacy van anderen
- Persoonlijke werkaantekeningen artsen niet onder inzagerecht
- Na overlijden: nabestaanden hebben geen recht
- Kopie via doktersassistente, minimaal week, EUR 0,23 per kopie max EUR 4,50
- Legitimatie verplicht (paspoort/ID/rijbewijs)
- Overdracht via Zorgmail File Transfer (ZFT)

#### Gewijzigd
- Oude site noemt npcf.nl en KNMG inzage links; nieuwe site noemt KNMG niet expliciet maar voegt link naar KNMG-richtlijn toe

---

### `/privacy`

**Oud:** `/privacyverklaring/`
**Nieuw:** `src/pages/privacy.astro` + `src/content/pages/privacy.md`

#### Identiek (qua kernpunten)
- AVG/WGBO basis
- Bewaartermijn 15 jaar
- Beveiligingsmaatregelen (Health Connected ISO 27001:2022 + NEN 7510:2017, MEOS IT, ESET antivirus, jaarlijkse PEN-test)
- ZIVVER, Zorgdomein voor uitwisseling
- Patientenrechten (inzage, correctie, verwijdering, verzet)
- LSP toestemmingsprocedure
- 6 punten over rechten van patient

#### Toegevoegd op nieuwe site
- Veel uitgebreidere sectie "Beveiliging" met details over MEOS, Health Connected back-ups, awareness modules, VOG, MITZ-integratie sinds januari 2025
- Sectie "Datalekken" met meldingsverplichting
- Camerabeelden wachtruimte 3 weken bewaartermijn
- Volledig privacyreglement uitgewerkt onderaan (1, 2, 3 met sub-onderdelen)
- Eerste reglement in werking 1 januari 2010, revisie februari 2025

---

### `/cookiewetgeving`

**Oud:** `/cookiewetgeving/`
**Nieuw:** `src/pages/cookiewetgeving.astro` + `src/content/pages/cookiewetgeving.md`

#### Identiek
- Wat is een cookie uitleg
- Functionele cookies tabel: fontResizeCookie (1 maand), demopraktijk_secure (sessie), smbv_splash_practice (1 jaar)
- Social media disclaimer
- YouTube embedded videos disclaimer
- Browser instellingen aanpassen

#### Verschil
- Oude tekst gebruikt domeinnaam "demopraktijk.praktijkinfo.nl" letterlijk in tekst → blijft op nieuwe site staan in tabel-cookienamen (waarschijnlijk een copy-paste fout uit WordPress template -- zie suggesties onderaan)

---

### `/aanmelding-nieuwe-patienten`

**Oud:** `/aanmelding-nieuwe-patienten/`
**Nieuw:** `src/pages/aanmelding-nieuwe-patienten.astro` + `src/content/pages/aanmelding-nieuwe-patienten.md`

#### Identiek
- Maximale capaciteit, soms tijdelijk geen nieuwe patienten
- Uitzonderingen voor gezinsuitbreiding/samenwoning
- Postcodegebieden 2021, 2022, 2023, 2024
- Inschrijfprocedure (contact assistenten, formulier, kennismakingsgesprek na ontvangst dossier)

---

### `/beeldbellen-videoconsult`

**Oud:** `/beeldbellen-videoconsult/`
**Nieuw:** `src/pages/beeldbellen-videoconsult.astro` + `src/content/pages/beeldbellen-videoconsult.md`

#### Identiek (qua inhoud)
- Beveiligde verbinding voor huisarts en POH
- 10 minuten consultduur
- Vereisten (camera, geluid, internet)
- Link via mail/sms, digitale wachtkamer
- Geen reistijd voordeel
- Niet geschikt voor lichamelijk onderzoek
- Privacy: geen opname, gesloten ruimte voor arts

---

### `/ik-geef-toestemming`

**Oud:** `/ik-geef-toestemming/`
**Nieuw:** `src/pages/ik-geef-toestemming.astro` + `src/content/pages/ik-geef-toestemming.md`

#### Identiek (qua inhoud)
- LSP uitleg
- Toestemming geven/intrekken via volgjezorg.nl
- Alleen BSN + welke huisarts/apotheek in LSP
- Geen medische gegevens centraal opgeslagen
- 40 regio's

---

## Volledig nieuwe pagina's (niet op oude site)

### `/contact`
Op de oude site was er geen aparte contactpagina (alle contactinfo stond verspreid). De nieuwe site heeft een dedicated contact-flow met triage (spoed/afspraak/bericht) die patienten naar het juiste kanaal stuurt.

### `/contact-kinderen`
Volledig nieuwe pagina voor beveiligd contact bij kinderen <16 jaar. Op de oude site bestond geen dergelijke aparte pagina.

### `/formulieren`
Index-pagina van alle PDF-formulieren. Bestaat niet op de oude site (waar formulieren verspreid stonden).

### `/minderjarigen-wilsonbekwamen`
Volledig nieuwe pagina (404 op oude site). Behandelt informatieverstrekking aan vertegenwoordigers van minderjarigen en wilsonbekwamen.

### `/routebeschrijving`
Bestaat op oude site (basis-pagina met adres) maar nieuwe versie is meer dan een doorverwijzing -- bevat ContactSpoedBlock met volledige praktijk-info.

---

## Suggesties n.a.v. de vergelijking

1. **`demopraktijk_secure` cookie**: De cookienaam in de cookiewetgeving lijkt een template-restant uit WordPress. Hernoemen naar iets specifieks (bv. `schoterpoort_session`) of de tabel aanpassen aan wat de Astro-site werkelijk plaatst (waarschijnlijk geen, omdat er geen login is).

2. **Praktijksluitingen**: De oude homepage toonde concrete sluitingsdata. Overweeg om de mededelingen-functie in het CMS standaard te gebruiken voor dit soort updates.

3. **Vacaturedatum**: Op de oude site staat "Vacatures Januari 2025"; deze is bewust verwijderd. Misschien wel een algemene "Laatst bijgewerkt: ..." datum overwegen.

4. **PDF link voor vacatures**: Link wijst nog naar de oude WordPress upload-folder. Bij migratie weg van WordPress moet deze PDF worden overgezet.

5. **Klachtenformulier CAPTCHA**: De oude site had CAPTCHA, de nieuwe nog niet. Voor een formulier dat persoonlijke gegevens verzamelt kan dit relevant zijn (zie ook `docs/refs/formulieren-backend.md`).
