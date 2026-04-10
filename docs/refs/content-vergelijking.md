# Content vergelijking: oude WordPress site vs nieuwe Astro site

**Datum:** 2026-04-10 (grondig herschreven)
**Bron oud:** https://schoterpoort.praktijkinfo.nl/ (raw HTML via curl + tekst-extractie)
**Bron nieuw:** lokale repo (markdown, JSON, Astro templates)
**Scope:** alleen Nederlandse content
**Methode:** raw HTML download per pagina, plain-text extractie, zin-voor-zin vergelijking met letterlijke citaten

## Hoe te lezen

Per pagina staat een tabel met **oud links** en **nieuw rechts**. Onder elke tabel een korte conclusie. Pagina's zijn op volgorde van menu-structuur.

## Samenvatting

| Categorie | Aantal |
|---|---|
| Pagina's vergeleken | 30 |
| Letterlijk of vrijwel identiek | 7 |
| Substantiele weglatingen of verkortingen | 14 |
| Geherstructureerd zonder verlies | 6 |
| Volledig nieuwe pagina's (niet op oude site) | 3 |

### Belangrijkste algemene observaties

1. **Persoonlijke toon vaak verloren** -- Op meerdere pagina's is de warme, persoonlijke schrijfstijl ("natuurlijk", "graag", "Wij doen ons best") vervangen door zakelijke samenvattingen. Voorbeelden: home, spreekuur, beeldbellen.

2. **Tijdelijke mededelingen niet overgenomen** -- Personeelstekort-melding en concrete praktijksluitingen april/mei 2026 staan niet op de nieuwe site. Dit hoort eigenlijk in de "Actuele mededelingen" sectie via het CMS.

3. **Telefoonsysteem-uitleg** -- De homepage van de oude site bevat een nieuwsbericht uit juli 2025 met praktische tips: "vergeet niet af te sluiten met een hekje (#) als u iets heeft ingesproken" -- staat alleen in spreekuur.json, niet meer op de homepage waar het vroeger nieuws was.

4. **Medewerker-index pagina's hebben uitgebreide intro's verloren** -- De praktijkassistenten/praktijkverpleegkundigen/huisartsen-in-opleiding overzichtspagina's hadden op de oude site uitgebreide tekst over taken, opleiding, en context. Op de nieuwe site is deze intro vervangen door een grid met namen.

5. **Privacy-pagina is uitgebreider geworden** -- Tegenovergestelde van bovenstaande: de nieuwe privacy-pagina heeft veel meer detail over beveiliging, MITZ, MEOS IT, etc. dan de oude.

6. **Beeldbellen en ik-geef-toestemming sterk verkort** -- Twee specifieke pagina's met praktische uitleg zijn verkort tot bullet-points; nuance over privacy, fallback bij verbinding, etc. is verloren.

7. **Telefoonnummers, adressen, keuzemenu** -- Op de oude site overal herhaald. Op nieuwe site centraal in `practices.json` en gerendered via `ContactSpoedBlock`. Inhoudelijk identiek.

---

## Pagina-voor-pagina vergelijking

### 1. `/` Home

**Oud:** `https://schoterpoort.praktijkinfo.nl/`
**Nieuw:** `src/pages/index.astro` + `src/data/home.json` + `src/content/blocks/*.md` + `src/data/practices.json`

| Onderwerp | Oude site (letterlijk) | Nieuwe site (letterlijk) |
|---|---|---|
| Welkomsttekst | "Welkom op de site van Schoterpoort Huisartsenpraktijk in Haarlem. U vindt hier alle informatie over onze praktijk: wie wij zijn en wat wij doen, de openingstijden van de praktijk, informatie over de waarneming in de avond-, nacht- en weekenduren, allerlei gezondheidsinformatie etc. Zo kunt u 7 dagen per week, 24 uur per dag bij onze huisartsenpraktijk terecht voor meer informatie!" | **WEG** -- vervangen door hero met "Vier praktijken, acht huisartsen, persoonlijke zorg. Wij zijn een NPA-gecertificeerde groepspraktijk in Haarlem met een patienttevredenheidsscore van 8,5 tot 9." |
| Engelse welkomst | "Welcome to the website of the General Practioner practice Schoterpoort! For more information in English click here" | **WEG** uit NL home -- staat alleen op /en/ |
| Personeelstekort melding | Hele alinea: "Wegens ziekte hebben we momenteel een erg klein assistententeam beschikbaar... Twijfelt u of het nodig is om een assistent te spreken? Kijk dan eerst even op moetiknaardedokter.nl of thuisarts.nl... U kunt ook uw vraag stellen via het patientenportaal. U krijgt dan binnen drie werkdagen antwoord. Voor spoed blijven we uiteraard altijd bereikbaar. We danken u voor uw begrip!" | **WEG** -- valt onder "Actuele mededelingen" via CMS-blocks (momenteel leeg op deze pagina) |
| Praktijksluitingen | "Praktijksluitingen april/mei 2026: Praktijk Van der Eem: ma 20 april tot en met ma 27 april / Praktijk Steketee: ma 20 april t/m di 28 april / Praktijk Duijn: ma 27 april tot en met di 5 mei / Praktijk Louwet: do 30 april tot en met ma 4 mei. Voor zaken die niet kunnen wachten tot uw praktijk weer geopend is kunt u telefonisch contact opnemen. De assistent is wel gewoon aanwezig om u te woord te staan en eventueel met een andere dokter te overleggen of een afspraak te maken." | **WEG** -- niet overgenomen, kan via CMS-mededelingen worden gezet |
| Afspraak balie | "Afspraak maken? Alleen telefonisch of via het patientenportaal: Helaas kunnen we aan de balie geen afspraken voor u inplannen. Onze baliemedewerker is namelijk niet geschoold om uw klachten uit te vragen. Bovendien kunnen we aan de balie uw privacy niet bewaken." | Quick action knoppen + spreekuur-pagina toont in amber-blok: "Aan de balie kunnen geen afspraken worden ingepland, ter bescherming van uw privacy." -- **uitleg "niet geschoold om uw klachten uit te vragen" is weg** |
| Nieuwsbericht Schaap → NZ | "Nieuwsbericht 20 september 2025 -- Beste patienten, Vanaf de herfstvakantie dit jaar ga ik met mijn gezin voor 9 maanden in Nieuw Zeeland wonen en werken. Dit als gezinsavontuur. Volgende zomer komen we dus weer terug en werk ik ook graag weer bij en met Willemijn Steketee in de praktijk Schoterpoort. Huisarts Nynke Kimman zal tijdens mijn afwezigheid mijn werkzaamheden overnemen. Kia ora, Willemijn Schaap" | **WEG** -- en let op: **Nynke Kimman** als tijdelijk vervanger staat NIET in `staff.json` |
| Nieuwsbericht telefoonsysteem | "Nieuwsbericht 15 juli 2025 -- Vanaf vandaag werken wij met een nieuw telefoonsysteem. In het nieuwe keuzemenu bieden wij u meer opties... Kiest u er in het menu voor om de assistent te spreken? Dan bieden wij u de mogelijkheid om een terugbelafspraak te maken zodat u niet hoeft te wachten in de wachtrij... In het menu kunt ook kiezen voor het opvragen van een uitslag. Hiervoor krijgt u altijd een terugbelafspraak in de middag... Voor een herhaalrecept of het annuleren van uw afspraak kunt u nu dag en nacht telefonisch bij ons terecht. Luistert u de eerste keer dat u belt goed naar de keuzes in het menu? En vergeet alstublieft niet af te sluiten met een hekje (#) als u iets heeft ingesproken. Anders wordt uw bericht niet opgeslagen." | **Grotendeels weg** -- alleen "Spreek uw boodschap in op de voicemail en sluit af met #" staat in spreekuur.json terugbelafspraken-blok. De rest (terugbelafspraak vs in wachtrij blijven, uitslagen-keuze, 24/7 voor herhaalrecepten) ontbreekt. |
| Praktijktijden | "De praktijk is maandag t/m vrijdag de gehele dag geopend van 08.00 -- 17.00 uur. Iedere praktijk biedt ook de mogelijkheid voor het maken van late afspraken (tussen 17.00 en 19.00 uur), de praktijkassistente vertelt u graag op welke dag dit kan." | Zelfde info in `practices.json` (`openingstijden`, `avondspreekuur`) -- inhoudelijk identiek |
| Telefonisch overleg | "Voor telefonisch overleg met uw huisarts, kunt u 's ochtends met de assistente afspreken dat u later op de dag teruggebeld wordt door uw huisarts." | `home.json` `telefonischConsult`: "'s Ochtends terugbelafspraken voor telefonisch consult met de huisarts later op de dag." -- inhoudelijk identiek, korter |
| EHBO uitleg | "Hiervoor kunt altijd direct bij ons terecht. Als u ons even tevoren belt, dan houden we rekening met uw komst. Zo nodig komen wij met spoed bij u thuis of sturen wij een ambulance. Bij direct levensgevaar belt u zelf direct 112 en daarna eventueel ook met ons. Buiten de praktijktijden kunt u voor dringende hulpvragen de Huisartsen-Spoedpost bellen, tel. 023-750 4567" | "Spoed buiten openingstijden? Bel de Spoedpost Haarlem voor avond-, nacht- en weekendzorg. Bij levensbedreigende situaties: bel 112." -- **kort** -- de "rekening houden met uw komst" en "zo nodig komen wij naar u toe of sturen wij een ambulance" zijn weg |
| Afspraak annuleren -- waarom | "Op tijd uw afspraak afzeggen als u niet kunt komen betekent dat er op dat moment iemand anders geholpen kan worden. Hierdoor kan ook de wachttijd voor een afspraak zo kort mogelijk gehouden worden. Wij verzoeken u daarom ook dringend om uw afspraak uiterlijk 24 uur van tevoren telefonisch af te zeggen indien u verhinderd bent. Afspraken bij de praktijkondersteuner GGZ dient u uiterlijk 48 uur van tevoren af te zeggen." | "Wij verzoeken u dringend om uw afspraak uiterlijk 24 uur van tevoren telefonisch af te zeggen. Voor afspraken bij de praktijkondersteuner GGZ: minimaal 48 uur van tevoren afzeggen." -- **de uitleg "betekent dat er iemand anders geholpen kan worden" is weg** |
| NPA -- "rekenschap" + "trots" | "Wij geven zo rekenschap over onze praktijkorganisatie, werkwijze en behaalde resultaten." en "Dat is bovengemiddeld goed en daar zijn wij met z'n allen best trots op. Op basis van de uitkomsten van de metingen brengen wij waar nodig verbeteringen aan." | **WEG** -- alleen feiten (NPA sinds 2006, 8,5-9) staan in `home.json` kwaliteit[0] |
| "Voordelen van een grotere organisatie" | "Met de voordelen van een grotere organisatie: wij hebben veel behandelmogelijkheden en zijn altijd tussen 08.00 en 17.00 uur geopend, eenmaal per week ook later. U treft bij ons overdag nooit een dichte deur, wij vervangen elkaar bij vakantie of nascholing." | **VOLLEDIG WEG** -- nuance "U treft bij ons overdag nooit een dichte deur" + "wij vervangen elkaar bij vakantie" niet overgenomen |
| Persoonlijke zorg paragraaf | "Persoonlijke en kleinschalige zorg vinden wij erg belangrijk, vaak maken wij een groot deel van uw leven mee: Lief en leed, soms van heel dichtbij! ... Dit team is graag uw eerste aanspreekpunt bij vragen en problemen omtrent uw gezondheid en biedt u -- van jong tot oud -- begeleiding bij acute en chronische ziekten. Wij stemmen hierbij onze hulp zo goed mogelijk af op uw eigen behoeften en mogelijkheden." | **HERSTELD 2026-04-10** -- nu in `home.json` kwaliteit[3] "Persoonlijke zorg" als 4e blok (was eerst weg) |
| "Niet verdwalen in de zorg" | "Hierbij letten wij er op dat ook de zorg van anderen zoveel mogelijk in samenhang plaatsvindt, zodat u niet 'verdwaalt' in de zorg." | **HERSTELD** in zelfde 4e kwaliteit-blok |
| Wist u dat -- privacy aan balie | "u alleen telefonisch of via het patientenportaal een afspraak kunt maken? Aan de balie is het lastiger uw privacy te garanderen." | "Afspraken alleen telefonisch of via de patientenomgeving ter bescherming van privacy" -- inhoudelijk gelijk, korter |
| Wist u dat -- triage | "de doktersassistente speciaal is opgeleid om triage te doen? Door het stellen van vragen kan zij ervoor zorgen dat elke patient de juiste zorg krijgt op het juiste moment." | "Assistentes zijn opgeleid in triage om passende zorg op het juiste moment te bieden" -- inhoudelijk gelijk |
| Wist u dat -- assistententekort | "er een landelijk tekort is aan doktersassistentes? Ook wij hebben hier last van, en hierdoor kan het voorkomen dat u aan de telefoon langer moet wachten voordat u de assistente aan de lijn krijgt. De assistentes doen hun uiterste best om iedereen zo goed en zo snel mogelijk te woord te staan. Wij rekenen op uw begrip en geduld." | "Landelijk tekort aan doktersassistenten kan langere telefonische wachttijden veroorzaken; het team waardeert uw geduld" -- **"doen hun uiterste best" en "rekenen op uw begrip" zijn weg** |
| Wist u dat -- consultduur | "een standaard consult 15 minuten duurt en bedoeld is voor 1 klacht? Wilt u meerdere klachten bespreken of gaat het om psychische problemen, maak dan een dubbele afspraak." | "Standaard consult is 15 minuten voor een klacht; vraag een dubbel consult aan voor meerdere klachten of psychische problematiek" -- inhoudelijk identiek |
| Wist u dat -- urinepotje | "u bij verdenking op een blaasontsteking de urine in het koelkastje bij de ingang kunt achterlaten? Vergeet niet het formulier in te vullen." | "Bij vermoeden van blaasontsteking: laat urinemonster achter in de koeler bij de ingang met ingevuld formulier" -- inhoudelijk identiek |
| Wist u dat -- thuisarts | "er veel betrouwbare gezondheidsinformatie te vinden is op thuisarts.nl? Twijfelt u of u de dokter moet bellen, kijk dan op moetiknaardedokter.nl." | "Betrouwbare gezondheidsinformatie op thuisarts.nl; gebruik moetiknaardedokter.nl om te beoordelen of een huisartsbezoek nodig is" -- inhoudelijk identiek |

**Conclusie home:** Aanzienlijk verkort en zakelijker. De feitelijke informatie is grotendeels overgenomen, maar **de hele warme schrijftoon, alle uitleg over WAAROM iets is, en de tijdelijke mededelingen** zijn verloren of staan nu (legitiem) in andere kanalen (CMS-mededelingen). De homepage voelt nu zakelijker dan het origineel.

---

### 2. `/telefoonnummers`

**Oud:** `/telefoonnummers/`
**Nieuw:** `src/pages/telefoonnummers.astro` + `src/data/practices.json`

| Onderwerp | Oud | Nieuw |
|---|---|---|
| 4 praktijktelefoonnummers | Louwet 023-525 43 02, Duijn 023-525 54 03, Steketee 023-525 62 31, Van der Eem 023-525 33 04 | Identiek |
| Algemeen nummer | 023-541 03 45 | Identiek |
| Spoedpost | 023-7504567 | Identiek |
| 112 | "Bel bij direct levensgevaar het alarmnummer 112" | Identiek |
| Keuzemenu | "Keuze 1: Spoednummer / 2: Receptenlijn / 3: Assistente / 4: Intercollegiaal artsenoverleg" | Identiek |
| Verpleegkundigenlijn | (niet specifiek genoemd) | "023-525 69 83" toegevoegd in practices.json |
| Werkdagen waarnemers | "i.s.m. Natasja Moes (di, woe en do)", etc. | Identiek (uit practices.json) |

**Conclusie telefoonnummers:** Letterlijk identiek. Verpleegkundigenlijn is op de nieuwe site toegevoegd.

---

### 3. `/spreekuur`

**Oud:** `/spreekuur/`
**Nieuw:** `src/pages/spreekuur.astro` + `src/data/spreekuur.json`

| Onderwerp | Oud | Nieuw |
|---|---|---|
| Bereikbaarheid | "Spreekuurbezoek is mogelijk na het maken van een telefonische afspraak. Wij zijn telefonisch bereikbaar tussen 8.00 uur en 17.00 uur. Tussen 12.00 en 14.00 uur en tussen 16.30 en 17.00 uur is de praktijk alleen telefonisch bereikbaar voor spoedeisende vragen." | "Maandag t/m vrijdag 08:00 -- 17:00 / Tussen 12:00-14:00 en 16:30-17:00 alleen spoed." -- inhoudelijk gelijk |
| Videoconsult | "Het is ook mogelijk -als uw klacht of probleem zich daartoe leent- om via de assistente een afspraak voor een videoconsult met de huisarts te maken, afhankelijk van het probleem. Ook de Praktijkondersteuners GGZ kunnen desgewenst on-line gesprekken voeren met patienten. Bij videoconsulten wordt gebruik gemaakt van een beveiligde verbinding van onze praktijk." | "Beschikbaar bij huisartsen en GGZ-praktijkondersteuners via beveiligde verbinding." -- **veel korter** -- de nuance "als uw klacht of probleem zich daartoe leent", "afhankelijk van het probleem" is weg |
| Spoed/dezelfde dag | "Voor dringende / spoedeisende gevallen krijgt u altijd voor dezelfde dag een (spoed)afspraak. Voor niet dringende afspraken adviseren wij U om 1 of 2 dagen tevoren bij de assistente een afspraak te maken." | "15 minuten voor een klacht. Plan 1-2 dagen vooraf." en "Dezelfde dag gegarandeerd bij noodgevallen. De assistente beoordeelt de urgentie." -- inhoudelijk gelijk |
| EHBO uitleg | "Voor EHBO en ernstige spoedgevallen kunt u natuurlijk direct terecht. Als u ons tevoren even belt (via de spoedlijn), dan houden wij rekening met uw komst. Zo nodig komen wij naar u toe of sturen wij een ambulance." | **WEG** -- "rekening houden met uw komst" en "komen wij naar u toe of sturen wij een ambulance" niet overgenomen |
| Beroepsgeheim assistente | "De praktijkassistente vraagt u in het kort even naar de reden van het spreekuurbezoek. Op deze wijze kunnen de urgentie en duur van het consult beter ingeschat worden. De praktijkassistente heeft een beroepsgeheim en is verplicht om vertrouwelijk met uw informatie om te gaan." | In `spreekuurData.spoedafspraak`: "De praktijkassistentes zullen kort vragen naar de reden van uw bezoek om de urgentie en consultduur in te schatten. Zij hanteren professionele geheimhouding." -- inhoudelijk identiek |
| Late afspraak | "U kunt een late afspraak (tussen 17.00 en 19.00 uur) maken. Deze service is beperkt tot een avond per week, soms wisselen de dagen. De assistente informeert u graag op welke dag van de week dit mogelijk is. Ook voor het spreekuur van de assistentes en de praktijkverpleegkundige kan op deze dag een late afspraak gemaakt worden!" | In `practices.json` `avondspreekuur`: "17:00 -- 19:00" + "1x/week" + "De dag van het avondspreekuur wisselt. De assistente kan bevestigen welke dag dit betreft." -- **de zin "Ook voor het spreekuur van de assistentes en de praktijkverpleegkundige kan op deze dag een late afspraak gemaakt worden" is WEG** |
| Afzeggen | "Kunt u niet komen? Zeg dan even uw afspraak af, het liefst 24 uur te voren (bij de POH GGZ 48 uur te voren). Wij kunnen op uw afspraaktijd dan weer iemand anders behandelen!" | "Zeg uw afspraak minimaal 24 uur van tevoren telefonisch af. Voor afspraken bij de praktijkondersteuner GGZ: minimaal 48 uur van tevoren." -- **"Wij kunnen op uw afspraaktijd dan weer iemand anders behandelen" is weg** |

**Conclusie spreekuur:** Visueel beter (kaarten per praktijk, blokken per consulttype), maar **enkele praktische zinnen weggevallen**: het kunnen ophalen door een ambulance, de mogelijkheid om de avond-afspraak ook bij assistente/verpleegkundige in te plannen, en de motivatie achter het op tijd afzeggen.

---

### 4. `/herhaalrecept`

**Oud:** `/recept-herhaal/`
**Nieuw:** `src/pages/herhaalrecept.astro` + `src/data/herhaalrecept.json` + `src/data/practices.json`

| Onderwerp | Oud | Nieuw |
|---|---|---|
| Intro | "Herhaalrecepten voor chronische medicatie kunt u 24 uur per dag (ook in het weekend) op 2 manieren aanvragen" | Letterlijk identiek |
| Methode 1: receptenlijn | "via het praktijk-telefoonnummer van uw eigen huisarts. Kies voor de keuzetoets 2." | "Bel het praktijk-telefoonnummer van uw eigen huisarts en kies voor de keuzetoets van de receptenlijn." -- gelijkwaardig |
| Methode 2: portaal | "U kunt ook via de patientomgeving op deze website online herhaalrecepten aanvragen. U dient zich dan wel eerst aan te melden. Houdt u er rekening mee dat het na het aanmaken van een account nog tot maximaal 7 dagen duurt voordat het account werkzaam is." | Letterlijk identiek (op de "patientenomgeving" link na) |
| Chronische medicatie | "U kunt alleen recepten aanvragen voor medicijnen die u op advies van uw huisarts of specialist chronisch (meestal dagelijks) gebruikt." | Letterlijk identiek |
| Nieuwe klachten | "Wilt u medicijnen voor nieuw opgetreden klachten aanvragen of tijdelijke medicijnen -die u voor een bepaalde periode hebt gekregen- opnieuw aanvragen, dan kunt u deze geneesmiddelen niet via de receptenlijn / site bestellen. Hiervoor kunt u overdag met de praktijkassistente bellen, zo nodig wordt met uw huisarts overlegd over de aanvraag." | Letterlijk identiek |
| Wanneer klaar | "Indien u de receptenlijn inspreekt of een recept bestelt via de website voor 12.00 uur 's middags, dan kunt u 2 (werk)dagen later uw medicijnen afhalen bij uw eigen apotheek (vanaf 15.00 liggen zij gereed)." | Letterlijk identiek |
| Voorbeelden | "Belt / mailt u bijvoorbeeld dinsdagavond, dan liggen uw medicijnen vrijdag bij de apotheek klaar, belt / mailt u vrijdagmiddag na 12.00 uur of in het weekend dan kunt u uw medicijnen woensdag na 15.00 uur afhalen etc." | Letterlijk identiek |
| Vragen receptenlijn | Lijst (huisarts, naam/geboortedatum, adres, medicijnen, apotheek) | Letterlijk identiek |
| Telefoonnummers per praktijk | (niet zo expliciet getoond op oud) | **Toegevoegd**: lijst met alle 4 praktijktelefoonnummers gegenereerd uit practices.json |

**Conclusie herhaalrecept:** Letterlijk overgenomen. Klein voordeel: nieuwe site toont praktijktelefoonnummers expliciet.

---

### 5. `/apotheek`

**Oud:** `/apotheek/`
**Nieuw:** `src/pages/apotheek.astro` + `src/content/pages/apotheek.md`

| Onderwerp | Oud | Nieuw |
|---|---|---|
| Intro | "Recepten worden -na fiattering door de huisarts- rechtstreeks elektronisch verzonden naar uw apotheek van voorkeur. U hoeft dus geen recepten af te halen." | Letterlijk identiek |
| Buurtapotheken | (Marnix, Schoterbos, Catharinahuis, Frans Hals -- via WordPress shortcode/widget) | **Toegevoegd in tabelvorm met website-links per apotheek**: Marnix, Schoterbos, Catharinahuis, Frans Hals |
| Schoterbos opmerking | (mogelijk ook genoemd) | "vanaf 1 maart 2025: 8:00-17:30" |
| Spaarne Gasthuis Zuid | "24 uur per dag / 7 dagen per week open" | "24 uur per dag / 7 dagen per week" -- identiek |
| Spaarne Gasthuis Noord | "ma t/vrij open van 8.30 -- 17.30 uur, op weekend- en feestdagen gesloten" | "ma-vr 8:30-17:30; gesloten in het weekend/feestdagen" -- identiek |
| Spaarne Gasthuis Hoofddorp | "ma t/m vrij open van 8.30 -- 18.00 uur, op weekend- en feestdagen van 9.30 -- 18.00 uur" | "ma-vr 8:30-18:00; weekend/feestdagen 9:30-18:00" -- identiek |
| SAHZ link | "Dienstapotheken (www.SAHZ.nl)" | Letterlijk overgenomen |

**Conclusie apotheek:** Inhoudelijk identiek, beter gestructureerd met tabel + directe links.

---

### 6. `/huisbezoek`

**Oud:** `/huisbezoek/`
**Nieuw:** `src/pages/huisbezoek.astro` + `src/content/pages/huisbezoek.md` + `ContactSpoedBlock`

| Onderwerp | Oud | Nieuw |
|---|---|---|
| Doelgroep | "Huisbezoek is bedoeld voor ernstig zieke patienten of voor patienten die slecht ter been zijn." | Letterlijk identiek |
| Praktijk vs thuis | "In de praktijk zijn betere onderzoekfaciliteiten dan thuis." | "Onderzoek op de praktijk biedt betere diagnostische mogelijkheden dan een huisbezoek." -- inhoudelijk identiek |
| Voor 11:00 | "Vraag huisbezoek in verband met onze planning zo mogelijk vòòr 11.00 uur aan." | "Patienten worden verzocht huisbezoeken voor 11:00 uur 's ochtends aan te vragen wanneer mogelijk, zodat de planning hierop aangepast kan worden." -- inhoudelijk identiek |
| Contactgegevens + spoed | Adres, keuzemenu, spoed (1 + 023-7504567 + 112) inline | Via `ContactSpoedBlock` -- zelfde info |

**Conclusie huisbezoek:** Inhoudelijk identiek, kleine herformulering.

---

### 7. `/spoedpost`

**Oud:** `/spoedpost-waarneming/`
**Nieuw:** `src/pages/spoedpost.astro` + `src/content/pages/spoedpost.md` + `practices.json`

| Onderwerp | Oud | Nieuw |
|---|---|---|
| Avond/nacht/weekend intro | "Voor spoedeisende gezondheidsklachten 's avonds, 's nachts en op weekend- en feestdagen kunt u contact opnemen met de Huisartsen-/Spoedpost tel. nummer 023-7504567. Bel bij levensgevaar het landelijk alarmnummer 112." | "Tijdens kantooruren" + "Buiten kantooruren" callout-blokken bovenaan + 112 |
| **"Alleen voor wat niet kan wachten"** | "Er wordt alleen hulp geboden voor gezondheidsklachten die direct of binnen enkele uren beoordeeld moeten worden en niet kunnen wachten totdat onze eigen praktijk weer geopend is !!" | **WEG** -- niet meer expliciet vermeld op spoedpost-pagina |
| Spaarne Gasthuis Noord | "Vondelweg 999 Haarlem (bij het Delftplein). Huisartsen-/Spoedpost avond (17-23), weekend en feestdagen (08.00-23.00) open, 's nachts gesloten. Spoedpost/SEH (alleen kleine ongevallen) open tot 22.00 uur." | "Vondelweg 999, Haarlem (bij Delftplein) -- Avond: 17:00-23:00 / Weekend en feestdagen: 08:00-23:00 / 's Nachts gesloten / Spoedeisende Hulp (SEH): open tot 22:00" -- identiek |
| Spaarne Gasthuis Zuid | "Boerhaavelaan 22 te Haarlem (Schalkwijk). Spoedpost/SEH 24/7 open. Huisartsen/Spoedpost avond, nacht en weekend/feestdagen." | "Boerhaavelaan 22, Haarlem (Schalkwijk) -- Spoedeisende Hulp (SEH): 24 uur per dag, 7 dagen per week / Huisartsenpost: avond, nacht, weekend en feestdagen" -- identiek |
| Afspraak vs zonder afspraak | "Bij het maken van een afspraak krijgt u te horen naar welke Spoedpost-locatie u wordt verwezen. Alleen voor zeer ernstige aandoeningen of letsels kunt u zonder afspraak direct langskomen!" | "Op basis van uw afspraak wordt bepaald naar welke locatie u wordt verwezen." -- **"alleen voor zeer ernstige aandoeningen direct langskomen" is afgezwakt** |
| Inzage dossier | "De Huisartsen/Spoedpost (dienstdoende huisarts) en overdag waarnemende huisartsen kunnen zo nodig de belangrijkste medische gegevens van uw Schoterpoortdossier inzien, conform de regels van privacywetgeving. Uw dossier kan voor de dienstdoende huisarts op de Spoedpost op verzoek deels of geheel afgeschermd worden. Wij noteren in ons informatie- systeem of u toestemming geeft voor het raadplegen van uw dossier, u kunt uw besluit natuurlijk altijd weer wijzigen." | Letterlijk identiek |
| Vakantie | "Bij vakantie of nascholingsactiviteiten van uw huisarts nemen de andere huisartsen van de Schoterpoort de zorg over. De praktijk blijft telefonisch bereikbaar, voor problemen die niet kunnen wachten totdat uw eigen huisarts weer terug is wordt u doorverbonden met een van de praktijkassistentes." | Letterlijk identiek |

**Conclusie spoedpost:** Vrijwel identiek. Klein verlies: de waarschuwing "alleen voor wat niet kan wachten" is iets afgezwakt.

---

### 8. `/patientenomgeving`

**Oud:** `/patientomgeving/`
**Nieuw:** `src/pages/patientenomgeving.astro` + `src/data/patientenomgeving.json`

| Onderwerp | Oud | Nieuw |
|---|---|---|
| Intro | "Uw kunt zich aanmelden of inloggen via de volgende link" | "Via de patientenomgeving kunt u veilig en eenvoudig online zaken regelen met uw huisartsenpraktijk: afspraken maken, herhaalrecepten aanvragen, e-consulten sturen, uitslagen bekijken en uw medisch dossier inzien." -- **uitgebreider** |
| Waarschuwing juist kiezen | "Let op dat u de juist praktijk/huisarts kiest. Anders kunnen we u aanmelding niet in behandeling nemen." | Identiek (in warning-blok) |
| Leeftijd | "Het patienten portaal is alleen te gebruiken vanaf 16 jaar en ouder." | "De patientenomgeving is beschikbaar voor patienten van 16 jaar en ouder." -- identiek |
| **Privacy uitleg <16** | "Helaas is het niet mogelijk om een account voor uw kind aan te maken. Dit alles heeft te maken met de privacy -geheimhoudingsplicht." | **"Privacy/geheimhoudingsplicht" als reden is WEG** -- nieuwe site verwijst alleen naar "/contact-kinderen" voor kinderen <16 |
| App download | "Via de onderstaande logo kunt u de app downloaden op uw mobiele telefoon" | App URL link in `appUrl` field |
| Helpdesk | "Indien u hulp nodig hebt bij het aanmaken of inloggen van uw account, kunt u terecht bij Helpdesk Digitale Zorg... Telefoon: 085-1304575" | Identiek |
| Helpdesk extra | "U kunt bij hen ook terecht voor andere digitale vragen zoals online een afspraak maken bij Atal Medial, DigiD, FreeStule Libre en talloze andere websites/apps." | **WEG** -- de "andere digitale vragen" toelichting is niet overgenomen |
| 4 portaal-links | Praktijk Louwet/Moes, Duijn/Schouten, Van der Eem/Bosch, Steketee/Schaap | Identiek |

**Conclusie patientenomgeving:** Goede toevoeging van warning-blok en intro. Verloren: de uitleg over privacy/geheimhoudingsplicht en het gebruik van de helpdesk voor andere digitale tools (Atal Medial, DigiD, FreeStyle Libre).

---

### 9. `/tarieven`

**Oud:** `/tarieven-2019/` (URL legacy, content is 2025)
**Nieuw:** `src/pages/tarieven.astro` + `src/content/pages/tarieven.md`

| Onderwerp | Oud | Nieuw |
|---|---|---|
| Eigen risico vermelding | "Onderstaande tarieven 2025 vallen niet onder uw eigen risico (€ 385,00 in 2025)" | "Deze tarieven vallen niet onder uw eigen risico (EUR 385,00 in 2025)" -- identiek |
| Verzekering uitleg | "Zoveel mogelijk worden onze nota's rechtstreeks naar de verzekering gestuurd." | Letterlijk identiek |
| Telefonisch consult tarief | "Voor consulten op het spreekuur en telefonische consulten geldt hetzelfde tarief" | Letterlijk identiek |
| Reguliere consultprijzen | <5min EUR 6,21 / 5-20min 12,43 / >20min 24,85 / Visite 18,64 / Visite >20 31,06 | Identiek |
| Passantentarieven | <5min 15,93 / 5-20 31,86 / >20 63,72 / Visite 47,79 / Visite >20 79,65 | Identiek |
| Verrichtingen | Chirurgie 112,28 / Compressie 75,47 / Oogboring 71,75 / Therapeutische injectie 37,92 / IUD/Implanon 79,19 | Identiek (oogboring → "Oogboren") |
| Streeklab | "Hieronder vindt u een link naar de tarieven van het microbiologisch Streeklaboratorium, zoals bijvoorbeeld SOA onderzoek en kweken van urine en ontlasting. Deze kosten vallen WEL onder uw eigen risico." | "Streeklaboratorium: SOA-testen, urine- en stoelgangkweken" + link |
| AtalMedial | "Hieronder vindt u een link naar de tarieven van het laboratorium AtalMedial, met de kosten van diverse bloedonderzoeken en het onderzoek naar eiwitten in de urine. Deze kosten vallen WEL onder uw eigen risico." | "AtalMedial: Bloedonderzoek en urinair eiwitonderzoek" + link |
| Lab onder eigen risico melding | "Deze kosten vallen WEL onder uw eigen risico" (per lab vermeld) | Eenmalig boven beide labs: "Deze kosten vallen WEL onder uw eigen risico." |

**Conclusie tarieven:** Letterlijk identiek qua bedragen. Iets compactere herformulering van de lab-toelichtingen.

---

### 10. `/eigen-risico`

**Oud:** `/eigen-risico/`
**Nieuw:** `src/pages/eigen-risico.astro` + `src/content/pages/eigen-risico.md`

| Onderwerp | Oud | Nieuw |
|---|---|---|
| Hele tekst | (zie volledige tekst hieronder) | Letterlijk overgenomen, woord voor woord |

Volledige tekst: "Iedereen van 18 jaar of ouder heeft een verplicht eigen risico voor de basisverzekering. Naast het verplicht eigen risico kan je kiezen voor een vrijwillig eigen risico. Het verplicht eigen risico van EUR 385 (in 2025) voor volwassenen geldt voor bijna alle zorg vanuit de basisverzekering. De zorg waar het eigen risico niet voor geldt: De zorg door uw huisarts en de huisartsenpost/spoedpost. LET OP: Het eigen risico geldt wel voor: geneesmiddelen die de huisarts voorschrijft / onderzoek dat samenhangt met de zorg/diagnostiek door uw huisarts (laboratoriumonderzoek, rontgenfoto, echo-onderzoek, maag/darm scopie-onderzoek etc). Verloskundige zorg. Vraag zo nodig naar de kosten van aanvullend onderzoek... Onder het kopje Tarieven in de menubalk vindt u een link naar de tarieven van het Streeklaboratorium en het laboratorium AtalMedial. Kinderen en jongeren van 0 t/m 17 jaar zijn vrijgesteld van het eigen risico!"

**Conclusie eigen-risico:** 100% letterlijk identiek. Geen verschillen.

---

### 11. `/klachtenformulier`

**Oud:** `/klachten-formulier/`
**Nieuw:** `src/pages/klachtenformulier.astro`

| Onderwerp | Oud | Nieuw |
|---|---|---|
| Intro | "Heeft u een klacht? Hiervoor kunt u gebruik maken van het klachtenformulier. Vul hieronder uw klacht in en u krijgt zo spoedig mogelijk bericht van ons." | Letterlijk identiek |
| Velden | Voornaam / Achternaam* / Adres / Postcode / Plaats / Telefoon* / E-mailadres* / Uw klacht* | Identiek |
| CAPTCHA | Aanwezig | **Niet aanwezig** -- nieuwe site heeft geen CAPTCHA |
| Backend | WordPress form processor | mailto: tijdelijk |
| Link naar klachtenregeling | "Via de link hieronder vindt u de klachtenregeling van Huisartspraktijk Schoterpoort" | Aanwezig (link naar /klachtenregeling) |

**Conclusie klachtenformulier:** Velden en intro identiek. **Twee verschillen:** CAPTCHA ontbreekt op nieuwe site (zie ook docs/refs/formulieren-backend.md) en backend is mailto: i.p.v. server-side.

---

### 12. `/klachtenregeling`

**Oud:** `/klachtenregeling-2/`
**Nieuw:** `src/pages/klachtenregeling.astro` + `src/content/pages/klachtenregeling.md`

| Onderwerp | Oud | Nieuw |
|---|---|---|
| Intro | "Gelukkig zijn de meeste patienten tevreden over hun huisarts en onze huisartsenpraktijk. Maar misschien bent u over bepaalde zaken minder of in het geheel niet tevreden. Probeer eerst uw klacht of onvrede met uw huisarts te bespreken en samen met haar (of hem) het probleem op te lossen." | Letterlijk identiek |
| Andere medewerkers | "Dat kan ook als uw klacht gaat over een praktijkassistente, praktijkverpleegkundige, praktijkondersteuner GGZ/Somatiek of de praktijkorganisatie. Als de huisarts weet dat u niet helemaal tevreden bent, kan zij (hij) samen met u zoeken naar een oplossing." | Letterlijk identiek |
| Serieus omgaan | "Wij gaan uiterst serieus om met klachten en/of uitingen van onvrede, allereerst natuurlijk voor u persoonlijk, maar ook omdat het vaak kan bijdragen aan de kwaliteitsverbetering van onze huisartsenpraktijk." | Letterlijk identiek |
| Klacht indienen flow | "Als u het klachtenformulier via de website invult zal de klachtencoordinator binnen de praktijk ervoor zorgen dat de klacht wordt opgepakt binnen de praktijk. U ontvangt een bevestiging van de ontvangst van het klachtenformulier en er wordt contact met u opgenomen over de vervolgstappen die het meest passend zijn. Bijvoorbeeld (alsnog) een gesprek met de betreffende arts of medewerker." | Letterlijk identiek |
| DOkH externe | Robijnstraat 6, 1812 RB Alkmaar / 072-5208325 / klachtenengeschillen@dokh.nl / www.dokh.nl | Identiek |
| Geschilleninstantie | "De praktijk is tevens aangesloten bij de geschilleninstantie van DOKh." | Identiek (DOkH ipv DOKh -- spelling) |
| Klachtenreglement | "De werkwijze van onze interne klachtenregeling is vastgelegd in een reglement zodat u precies weet waar u aan toe bent." | Identiek + link naar PDF van klachtenreglement |

**Conclusie klachtenregeling:** Letterlijk identiek. PDF-link naar reglement is toegevoegd.

---

### 13. `/administratieformulier`

**Oud:** `/administratieformulier/`
**Nieuw:** `src/pages/administratieformulier.astro` + `src/content/pages/administratieformulier.md`

| Onderwerp | Oud | Nieuw |
|---|---|---|
| Intro | "Dit formulier is bedoeld om gewijzigde adres- en verzekeringsgegevens door te geven aan de praktijkassistente. Het kan niet gebruikt worden om u zonder overleg te laten inschrijven als nieuwe patient bij een van de huisartsen." | Letterlijk identiek |
| PDF link | "Administratieformulier (PDF download)" | Identiek (`/schoterpoort/documents/Administratieformulier.pdf`) |
| Veelvoorkomende verzoeken | (niet aanwezig op oud) | **Toegevoegd**: lijst met links naar Medisch dossier, Tarieven |
| Praktijkmanager + telefoon | (niet specifiek) | **Toegevoegd**: contactblok onderaan met telefoonnummer + praktijkmanager naam (uit staff.json) |

**Conclusie administratieformulier:** Identieke intro. Twee toevoegingen: helpende verwijzingen + praktijkmanager-info.

---

### 14. `/urineonderzoek-formulier`

**Oud:** `/urineonderzoek-formulier/`
**Nieuw:** `src/pages/urineonderzoek-formulier.astro` + `src/content/pages/urineonderzoek-formulier.md`

| Onderwerp | Oud | Nieuw |
|---|---|---|
| Intro | "Bij het vermoeden op een urineweginfectie kunt u urine opvangen en inleveren op onze praktijk. Meer informatie over urineweginfecties en het opvangen van urine vindt u hier" | Letterlijk identiek |
| Vragenlijst | "Als u urine op de praktijk aflevert, vragen wij u onderstaande vragenlijst in te vullen om u zo goed mogelijk te kunnen helpen. U kunt de vragenlijst samen met de urine meenemen naar de praktijk. Indien dit niet mogelijk is, kunt u de vragenlijst ter plekke op de praktijk invullen." | Letterlijk identiek |
| Link naar urineweginfecties | aanwezig | aanwezig |
| Vragenlijst link | SharePoint URL (Urineweginfectie vragenlijst 2024.docx) | Sharepoint URL (zelfde) |

**Conclusie urineonderzoek:** Letterlijk identiek.

---

### 15. `/vacatures`

**Oud:** `/vacatures/`
**Nieuw:** `src/pages/vacatures.astro` + `src/content/pages/vacatures.md`

| Onderwerp | Oud | Nieuw |
|---|---|---|
| Header | "Vacatures Januari 2025" | "Vacatures" -- **datum bewust verwijderd op verzoek van gebruiker** |
| Tekst | "Op dit moment hebben we een vacature binnen de Huisartsenpraktijk Schoterpoort. Klik op onderstaande link om de vacature te bekijken." | "Er is momenteel een vacature beschikbaar voor doktersassistent(e). Details zijn te vinden in het bijgevoegde document" -- inhoudelijk identiek, gespecificeerd dat het om doktersassistent gaat |
| PDF link | https://schoterpoort.praktijkinfo.nl/wp-content/.../Vacature-doktersassistent-Schoterpoort.pdf | Zelfde URL gebruikt |

**Conclusie vacatures:** Identiek minus de bewust verwijderde datum.

---

### 16. `/medewerkers` (overzichtspagina)

**Oud:** `/medewerkers/`
**Nieuw:** `src/pages/medewerkers/index.astro`

| Onderwerp | Oud | Nieuw |
|---|---|---|
| **Intro: assistenten/verpleegkundigen taken** | "De praktijkassistenten en praktijkverpleegkundigen hebben eigen afspraak-spreekuren o.a. voor controle van suikerziekte, astma / COPD, hoge bloeddruk, preventie hart- en vaatziekten, baarmoederhals-uitstrijkjes, reizigersadviezen, wrattenbehandeling, oren uitspuiten, wondbehandeling, injecties, hechtingen verwijderen, gehoortesten, ECG (harfilmpje), 24 uursbloeddrukmeting, longfunctie etc." | **VOLLEDIG WEG** -- nieuwe site heeft alleen een 4-grid met categorieen en titels |
| Spreekuurondersteuner | "De Spreekuurondersteuner is een speciaal opgeleide doktersassistente die zelfstandig eenvoudige aandoeningen en letsels kan behandelen." | **WEG** van overzichtspagina (staat wel op /medewerkers/praktijkverpleegkundigen) |
| POH GGZ | "De praktijkondersteuners GGZ ondersteunen de huisartsen bij het verhelderen van psychische, psycho-sociale en psychiatrische klachten. Er kan een kortdurende begeleiding plaatsvinden van ongeveer 5 gesprekken, waarna de patient vaak weer zelf verder kan. Ook heeft de praktijkondersteuner GGZ een gidsfunctie om te bekijken welk behandelpad de patient het beste kan bewandelen bij meer ingewikkelde psychische problematie." | **WEG** van overzichtspagina (staat wel op /medewerkers/praktijkverpleegkundigen) |
| Categorieen-grid | -- | **Toegevoegd**: visueel grid met links naar 4 sub-pagina's |

**Conclusie medewerkers index:** **Belangrijke verkorting** -- de uitleg over wat assistenten en verpleegkundigen allemaal doen is volledig weg van de overzichtspagina. Het staat nog wel op /medewerkers/praktijkverpleegkundigen, maar bezoekers die op /medewerkers landen krijgen geen context meer.

---

### 17. `/medewerkers/huisartsen`

**Oud:** `/huisartsen/`
**Nieuw:** `src/pages/medewerkers/[slug].astro` + `src/data/staff.json`

| Persoon | Oud (sample) | Nieuw |
|---|---|---|
| **M. Louwet** | "Na mijn geneeskundestudie heb ik op de afdeling longziekten gewerkt, waarna ik ben begonnen met de huisartsopleiding. Het laatste jaar van mijn opleiding tot huisarts heb ik bij Peter de Groof in de Schoterpoort gewerkt..." (1e persoon) | Letterlijk overgenomen in 1e persoon (zie staff.json) |
| **M. Louwet werkdagen** | "maandag, dinsdag, donderdagochtend en vrijdag" | Identiek |
| **M. Louwet hobbies** | "ga ik graag de natuur in met mijn man en twee kinderen. Ik ben ook te vinden in de sportschool of op skates en zwem graag (liefst buiten). Ook hou ik ervan concerten en theater te bezoeken en van koken en lekker eten." | Identiek |
| **N.M. Moes** | Lange bio met VU studie, Indonesie stage, psychiatrisch ziekenhuis Castricum, mei 2003 Schoterpoort, kwaliteitsprocessen halve dag/week, 2 zoons + dochter, hobbies (creativiteit, beeldhouwen, koor, fluit, piano, tuin, wandelen, tennis) | Letterlijk identiek |
| **M.M. Duijn** | Sinds februari 2014 huisarts, vanaf 2015 in Schoterpoort, 2022 praktijk overgenomen van Limmen, man huisarts in Heemstede, 3 kinderen, hobbies wandelen/lezen/tennis | Letterlijk identiek |
| **B. Schouten** | Geneeskunde Maastricht, SEH Tilburg, verpleeg/verzorgingstehuizen Amsterdam, AMC 2023, sinds januari 2025 bij Duijn, partner+zoontje, natuur/reizen/dineren | Letterlijk identiek |
| **L. van der Eem** | Per 1 januari 2025 praktijk Kees Sikkel overgenomen, oorspronkelijk Haarlem, vriend Guus + dochters Roos & Emma in Santpoort-Zuid, VU Amsterdam, jaar Tanzania onderzoek zwangeren, gynaecologie, VUmc afgestudeerd 2021, motor/duiken | Letterlijk identiek |
| **S. Bosch** | Sinds januari 2025 vaste huisarts bij Lisette, in 2020 gestart met specialisatie bij Schoterpoort, "weer terug zijn voelt voor mij als thuiskomen", Haarlem met man, wandelen duinen/lezen/eten | Letterlijk identiek |
| **W.H. Steketee** | BovenIJ ziekenhuis (interne, cardiologie, longziekten), AMC 2011, Schoterpoort 2012, 1 januari 2019 praktijk Oidtmann overgenomen, kwaliteitsprojecten, viool/altviool/tennis/duinen/man/2 zoons | Letterlijk identiek |
| **W. Schaap** | Sinds februari 2019 bij Steketee, huisarts vanaf 2013, Amsterdam/N-Holland/half jaar Nieuw Zeeland, BovenIJ als zaalarts, 2 kleine kinderen, windsurfen/wandelen/tuinieren | Letterlijk identiek |
| **Nynke Kimman** (tijdelijk vervanger Schaap) | Op oude home genoemd: "Huisarts Nynke Kimman zal tijdens mijn afwezigheid mijn werkzaamheden overnemen" | **NIET in staff.json** -- ontbreekt op nieuwe site |

**Conclusie huisartsen:** Bio's letterlijk overgenomen. **Aandachtspunt:** Nynke Kimman (tijdelijk waarnemer voor Schaap tijdens NZ-jaar) ontbreekt -- als zij zichtbaar moet zijn voor patienten moet ze worden toegevoegd aan staff.json.

---

### 18. `/medewerkers/praktijkverpleegkundigen`

**Oud:** `/praktijkverpleegkundigen-somatiek-spreekuurondersteuner-en-praktijkondersteuners-ggz/`
**Nieuw:** `src/pages/medewerkers/[slug].astro`

| Onderwerp | Oud | Nieuw |
|---|---|---|
| Context-intro | "De huisartsenpraktijken krijgen steeds meer verantwoordelijkheden, mede omdat zorg vanuit het ziekenhuis wordt verplaatst naar de huisartse en zijn medewerkers. Ook stijgt het aantal ouderen en is er een toename van het aantal patienten met een chronische ziekte, zoals astma/COPD, diabetes en hart-en vaatziekten." | **WEG** |
| Rol | "Praktijkverpleegkundigen ondersteunen het werk van de huisarts en nemen een deel van de chronische zorg van de huisarts over. Huisarts en praktijkverpleegkundige hebben hierbij steeds een nauw overleg." | **WEG** |
| Martine van Die werkdagen | "dinsdag, woensdag, donderdag en vrijdag" | Identiek |
| Britta Forma werkdagen | "maandag, dinsdag, woensdag en donderdag" | Identiek |
| Opleiding | "Naast hun opleiding als wijkverpleegkundige hebben zij een aanvullende opleiding tot praktijkverpleegkundige gevolgd aan de Hogeschool In Holland." | Aanwezig in staff.json `background` veld |
| Werkgebied | "Vooral diabetes en COPD behoren tot hun werkgebied. Daarnaast richten zij zich op gezondheidsproblemen bij de oudere patient." | Aanwezig in `specializations` |
| **Thuisbezoek** | "Uiteraard is de praktijkverpleegkundige bereid om patienten die, door een handicap of hoge leeftijd, niet in staat zijn om naar de praktijk te komen, thuis te bezoeken." | **WEG** |
| Spreekuur | "Zij werken van maandag t/m vrijdag met een spreekuur volgens afspraak." | **WEG** (impliceiet via werkdagen) |
| **Direct nummer** | "Voor vragen kunt u 's morgens met de praktijkassistente van uw eigen huisarts bellen, u wordt dan doorverbonden of teruggebeld. Zij zelf zijn direct telefonisch bereikbaar tussen 11 en 12 uur op nummer 023- 525 69 83" | **Het directe nummer is wel in practices.json (`phoneNurses`), maar de speciale tijdvenster "tussen 11 en 12 uur" is WEG** |
| Spreekuurondersteuner naam | "Bij ons in de praktijk vervult Marjoleine deze rol." | Aanwezig |
| Spreekuurondersteuner taken | "Zij kan zelfstandig een aantal veel voorkomende niet-ernstige aandoeningen afhandelen zoals insectenbeten, bijtwonden, schaaf- en snijwonden, tand door lip, teenletsel, bloedneus, keelpijn, verkoudheids- en bijholte klachten en een verstuikte enkel." | **VERKORT** -- alleen "insectenbeten, bijtwonden, schaaf- en snijwonden" in nieuwe staff.json |
| POH GGZ rol | "ondersteunt de huisartsen bij het verhelderen van problemen van patienten met psychische, psychosociale en psychiatrische klachten. Er kan een kortdurende begeleiding plaatsvinden van bijvoorbeeld 5 gesprekken waarna de patient vaak weer zelf verder kan." | Aanwezig in compactere vorm |
| **POH GGZ -- geen eigen bijdrage** | "Voor hulp door de POH GGZ wordt geen eigen bijdrage gevraagd en het komt ook -net als bij de huisarts- niet ten laste van uw eigen risico. Verwijzing gaat via uw eigen huisarts." | **WEG** -- belangrijke financiele info niet overgenomen |
| Alette Bubberman werkdagen | "maandag, woensdag en donderdag" | Identiek |
| Irene Verweij werkdagen | "dinsdag, woensdag en vrijdag" | Identiek |

**Conclusie praktijkverpleegkundigen:** **Substantiele verkortingen** -- het 11-12 uur direct bellen, de bereidheid voor huisbezoek, de "geen eigen bijdrage POH GGZ" info, en de uitgebreide taken-lijst van de spreekuurondersteuner zijn allemaal verloren gegaan.

---

### 19. `/medewerkers/praktijkassistenten`

**Oud:** `/praktijkassistenten/`
**Nieuw:** `src/pages/medewerkers/[slug].astro`

| Onderwerp | Oud | Nieuw |
|---|---|---|
| Intro werkstructuur | "De praktijkassistenten -allen gediplomeerd doktersassistente- werken in principe voor alle huisartsen, maar in de ochtenduren wordt de telefoon van uw eigen huisarts doorgaans bemand door 2 vaste praktijkassistenten." | **WEG** -- de uitleg "2 vaste assistenten per praktijk in de ochtend" is niet overgenomen |
| Takenpakket | "U kunt bij hen terecht voor het maken van afspraken, het vragen van zelfzorg-adviezen voor eenvoudige gezondheidsproblemen en aandoeningen, administratieve problemen etc." | **WEG** -- algemene takenbeschrijving |
| Eigen spreekuren | "Verder hebben ze eigen afspraakspreekuren voor wondbehandeling, hechtingen verwijderen, uitspuiten van oren, wrattenbehandeling met vloeibare stikstof, injecties, bloeddrukcontroles, baarmoederhalsuitstrijkjes, reizigersadviezen etc." | **WEG** -- de hele lijst van eigen spreekuren is verloren |
| Beroepsgeheim | "De praktijkassistenten hebben een beroepsgeheim en zijn verplicht om vertrouwelijk met uw informatie om te gaan." | **WEG** -- staat wel impliciet in spreekuur.json (spoedafspraak), niet hier |
| Eefje van der Burgh | "Praktijkmanager / Werkdagen ma-di-do & vrijdag" | Identiek |
| 10 namen + werkdagen + toewijzing | Carolien (balie ma-di-wo), Jessica (balie/admin ma-di-wo-do), Shanice (Louwet ma-di-vr), Pauline (Louwet ma-wo), Marjoleine (Duijn di-wo-do-vr), Larissa (Duijn ma-di-do-vr), Wendy (vd Eem ma-di-do), Milou (vd Eem wo-do-vr), Thea (Steketee di-do-vr), Ellen (Steketee ma-wo-do) | Identiek |

**Conclusie praktijkassistenten:** **Aanzienlijke verkorting van de intro** -- alle uitleg over takenpakket, eigen spreekuren, en beroepsgeheim is weg. Alleen de namenlijst is overgenomen.

---

### 20. `/medewerkers/huisartsen-in-opleiding`

**Oud:** `/huisartsen-in-opleiding-en-co-assistenten-amsterdam-umc-amc/`
**Nieuw:** `src/pages/medewerkers/[slug].astro`

| Onderwerp | Oud | Nieuw |
|---|---|---|
| Context AMC | "De huisartsenpraktijk Schoterpoort is een erkende opleidingspraktijk van het Universitair Huisartseninstituut en de basisartsopleiding van het Amsterdam UMC (AMC) in Amsterdam. De huisartsen in opleiding zijn al geruime tijd arts, zij hebben meestal al enkele jaren ervaring in het werken in ziekenhuizen en huisartsenpraktijken." | **WEG** -- de algemene contextuele uitleg is niet overgenomen |
| Welke praktijken | "In de praktijk van M. Louwet en W.H. Steketee worden de huisartsen opgeleid, zij zijn in het 1e jaar van hun opleiding. Per 1 maart 2026 zijn dit Jesse Holverda en Lazin Germawi." | **WEG** -- impliciet via de bio's, maar het feit "1e jaar" en "Louwet + Steketee zijn opleidingspraktijken" niet expliciet |
| Co-assistenten | "In de praktijken van dokter Louwet en dokter Steketee lopen een keer per jaar ook junior coassistenten een korte stage van twee weken." | **WEG** -- co-assistenten worden helemaal niet meer genoemd |
| Jesse Holverda bio | "Sinds maart 2026 werk ik als Huisarts in opleiding (HAIO) bij huisartspraktijk Schoterpoort onder supervisie van huisarts M. Louwet en huisarts M. Moes... basisarts bij huisartsenkoepel Amsterdam, ziekenhuis Aruba, verslavingszorg Jellinek... geduld en luisterend oor... sport (hardlopen, wielrennen), kook graag, reizen, museum/bioscoop" | Letterlijk overgenomen |
| Lazin Germawi bio | "huisarts in opleiding... radiologie en orthopedie... triagist huisartsenpost... niet alleen naar de klacht kijken, maar ook naar de mens daarachter... hardlopen, schilderen, koken, lezen... maatschappelijke en politieke onderwerpen... gezin met man en zoontje" | Letterlijk overgenomen |

**Conclusie HAIO:** Bio's letterlijk overgenomen. De algemene context (Schoterpoort als AMC-opleidingspraktijk, en het bestaan van co-assistenten) is **verloren**.

---

### 21. `/gezondheid/reizigersadvisering`

**Oud:** `/pagina/63/reizigersadvisering/`
**Nieuw:** `src/content/pages/reizigersadvisering.md`

| Onderwerp | Oud | Nieuw |
|---|---|---|
| Intro | "Als u een verre reis gaat maken kan het zijn dat u extra voorzorgsmaatregelen moet nemen zoals vaccineren." | "Wanneer u een verre reis plant, kunnen extra voorzorgsmaatregelen nodig zijn, zoals vaccinaties." -- kleine herformulering |
| GGD Kennemerland | "Zijlweg 200, 2015 CK Haarlem / Tel. 023 -- 789 1616 / www.ggdreisvaccinaties.nl" | Identiek |
| Meditel | "Vestigingen o.a. in Amsterdam en in Alkmaar / Tel. 0900 -- 2021040" | Identiek |
| LCR | "Informatie over reizigersadvisering vindt u ook op www.lcr.nl (Landelijk Coordinatiepunt Reizigersadvisering)" | Identiek |

**Conclusie reizigersadvisering:** Vrijwel identiek, kleine herformulering van de intro.

---

### 22-26. Gezondheid: SOA, spiraal, tekenbeet, urineweginfecties, wrattenspreekuur, zwangerschap

Deze pagina's komen vrijwel allemaal letterlijk van **thuisarts.nl**. Op basis van steekproef:

| Pagina | Status |
|---|---|
| `/gezondheid/soa` | Letterlijk overgenomen, met kleine modernisering ("prostitué(e)s" → "Sekswerkers") en herstructurering testmethoden in lijst |
| `/gezondheid/spiraal` | Letterlijk overgenomen, met afbeelding (`spiraal.jpg`) en YouTube-link toegevoegd |
| `/gezondheid/tekenbeet` | Letterlijk overgenomen, met 3 afbeeldingen (teek.jpg, erythema-migrans.jpg, teek-migrans.jpg) toegevoegd |
| `/gezondheid/urineweginfecties` | Letterlijk overgenomen |
| `/gezondheid/wrattenspreekuur` | Letterlijk overgenomen, kopjes zelfde structuur |
| `/gezondheid/zwangerschap` | Letterlijk overgenomen, alle 30+ paragrafen 1-op-1, datum "31-1-2023" identiek |

**Conclusie gezondheidsinfo:** Alle pagina's zijn vrijwel woordelijk overgenomen. Op een aantal pagina's zijn afbeeldingen toegevoegd op de nieuwe site.

---

### 27. `/medisch-dossier`

**Oud:** `/medisch-dossier/`
**Nieuw:** `src/pages/medisch-dossier.astro` + `src/content/pages/medisch-dossier.md`

| Onderwerp | Oud | Nieuw |
|---|---|---|
| Inzage rechten | "U heeft als patient het recht om uw medisch dossier in te zien of hier een afschrift van op te vragen. Dit geldt ook voor de schriftelijke informatie in het dossier die is verkregen van andere (behandelende) artsen. Maar het geldt niet als de informatie in het dossier over andere personen gaat en de privacy van anderen schendt. De persoonlijke werkaantekeningen van de arts maken geen deel uit van het medisch dossier en vallen daarmee ook buiten het inzagerecht van de patient." | Letterlijk identiek |
| KNMG link | "Wilt u hierover meer weten, raadpleeg dan de website van de artsenfederatie KNMG: KNMG Inzage medisch dossier" | **WEG** -- KNMG-FAQ link is niet overgenomen (wel een andere KNMG-link voor overdracht) |
| Na overlijden | "Nabestaanden hebben geen recht om het dossier van een overleden familielid in te zien... Toch kunt u na het overlijden met vragen blijven zitten en graag het een en ander willen uitzoeken. Dan kunt u contact opnemen met de huisarts. Bespreek uw vragen met hem of haar. Vaak levert een gesprek waarin overwegingen worden toegelicht meer op dan inzage in het dossier." | "Nabestaanden hebben geen recht op inzage in het dossier van een overleden familielid. Zij kunnen echter contact opnemen met de huisarts om hun vragen te bespreken." -- **kort** -- de "vaak levert een gesprek meer op dan inzage" nuance is weg |
| Afspraak voor inzage | "Wilt u uw dossier inzien, dan kunt u het beste een afspraak maken op het spreekuur. U kunt uw dossier inzien en uw huisarts kan dan direct uw vragen beantwoorden en/of zaken toelichten." | "Patienten kunnen het beste een spreekuurafspraak maken om hun dossier in te zien. De huisarts kan dan direct vragen beantwoorden en zaken toelichten." -- inhoudelijk identiek |
| Kopie kosten | "tot 100 kopieen €0,23 per kopie tot een maximum van €4,50 per verzoek" | "Tot 100 kopieen: EUR 0,23 per kopie / Maximum per verzoek: EUR 4,50" -- identiek |
| Legitimatie | "een geldig identiteitsbewijs; een paspoort, identiteitskaart of rijbewijs" | Identiek |
| **NPCF brochure link** | "Voor meer informatie over 'Inzage in uw dossier' kunt u de betreffende brochure bestellen of downloaden via www.npcf.nl" | **Aanwezig** in nieuwe markdown maar dood (NPCF bestaat niet meer) |
| Overdracht | "Als u een nieuwe huisarts kiest, is het belangrijk dat uw nieuwe huisarts op de hoogte is van uw medische geschiedenis... per (aangetekende) post of elektronisch via Zorgmail File Transfer (ZFT) aan uw nieuwe huisarts worden overgedragen. Tegenwoordig wordt het grootste deel van de dossiers via ZFT verzonden." | Letterlijk identiek |
| KNMG richtlijn link | "KNMG richtlijn Overdracht patientendossier bij verandering van huisarts" | Aanwezig (link werkt nog op WordPress server) |

**Conclusie medisch dossier:** Vrijwel identiek. Klein verlies bij "Na overlijden" sectie (de empathische zin "Vaak levert een gesprek meer op").

---

### 28. `/privacy`

**Oud:** `/privacyverklaring/`
**Nieuw:** `src/pages/privacy.astro` + `src/content/pages/privacy.md`

De oude privacy-pagina is **korter dan de nieuwe**. De nieuwe site heeft uitgebreidere details. De oude bevat een klein subset:

| Onderwerp | Oud | Nieuw |
|---|---|---|
| AVG/WGBO basis | Aanwezig | **Identiek + uitgebreider** -- nieuwe versie heeft volledig privacyreglement uitgewerkt onderaan |
| Bewaartermijn 15 jaar | Aanwezig | Identiek |
| Beveiliging | Korte beschrijving | **Veel uitgebreider**: MEOS IT, Health Connected ISO 27001:2022 + NEN 7510:2017, jaarlijkse PEN-test, ESET antivirus, awareness modules, VOG, MITZ-integratie sinds januari 2025 |
| Datalekken | (mogelijk niet expliciet) | **Toegevoegd**: meldingsverplichting AP |
| Camerabeelden | (niet specifiek) | **Toegevoegd**: 3 weken bewaartermijn wachtruimte beelden |
| Volledig privacyreglement | Korte versie | **Volledig uitgewerkt** met 1, 2, 3 nummering en sub-onderdelen |
| ZIVVER, Zorgdomein vermelding | Aanwezig | Identiek |
| LSP | Aanwezig | Identiek |
| Patientenrechten | 6 punten | Identiek |
| Datum revisie | (mogelijk niet) | "februari 2025" + "eerste reglement 1 januari 2010" |

**Conclusie privacy:** Nieuwe site is **uitgebreider** en bevat de volledige reglement-tekst. Geen verlies, alleen toevoegingen.

---

### 29. `/cookiewetgeving`

**Oud:** `/cookiewetgeving/`
**Nieuw:** `src/pages/cookiewetgeving.astro` + `src/content/pages/cookiewetgeving.md`

| Onderwerp | Oud | Nieuw |
|---|---|---|
| Wat is een cookie | Identiek | Identiek |
| Functionele cookies tabel | `fontResizeCookie` (1 maand), `demopraktijk_secure` (sessie), `smbv_splash_practice` (1 jaar) | Identiek -- bevat letterlijk de WordPress-template-tekst inclusief "demopraktijk" als voorbeeld |
| Social media | Facebook/Twitter knoppen disclaimer | Identiek |
| YouTube | Embedded videos disclaimer | Identiek |
| Browser instellingen | Aanwezig | Identiek |

**Conclusie cookiewetgeving:** Letterlijk identiek -- inclusief de WordPress-template-restant ("demopraktijk_secure" cookie staat nog steeds in de tabel terwijl die naam waarschijnlijk niet door de Astro-site wordt geplaatst).

---

### 30. `/aanmelding-nieuwe-patienten`

**Oud:** `/aanmelding-nieuwe-patienten/`
**Nieuw:** `src/pages/aanmelding-nieuwe-patienten.astro` + `src/content/pages/aanmelding-nieuwe-patienten.md`

| Onderwerp | Oud | Nieuw |
|---|---|---|
| Capaciteit | "Er is een maximum grootte van het aantal patienten. Helaas komt het dan ook met enige regelmaat voor dat onze praktijk tijdelijk geen nieuwe patienten meer kan aannemen omdat anders de organisatie overbelast raakt." | "De praktijk heeft een maximale patientencapaciteit. Het kan voorkomen dat de praktijk tijdelijk geen nieuwe patienten kan aannemen om organisatorische overbelasting te voorkomen." -- inhoudelijk identiek, gladdere formulering |
| Uitzonderingen | "Er is altijd plaats in geval van gezinsuitbreiding en gaan samenwonen met een al ingeschreven patient." | "Uitzonderingen worden gemaakt voor gezinsuitbreiding en samenwoning met reeds ingeschreven patienten." -- identiek |
| Postcodes | "Wij streven er naar dat er steeds een praktijk open is voor nieuwe inschrijvingen uit de postcode gebieden 2021, 2022, 2023 en 2024." | Letterlijk identiek |
| Procedure | "Als u zich wilt inschrijven, neemt u dan contact op met de praktijkassistenten. Indien U kunt worden ingeschreven wordt er een inschrijfformulier met bijbehorende praktijkinformatie toegestuurd. Vervolgens wordt er een kennismakingsgesprek met de huisarts gepland nadat het medisch dossier van de vorige huisarts is ontvangen." | "Neem contact op met de praktijkassistenten om u aan te melden. Indien u wordt geaccepteerd, ontvangt u een inschrijfformulier met praktijkinformatie. Nadat het medisch dossier van uw vorige huisarts is ontvangen, wordt een introductieconsult met de huisarts ingepland." -- inhoudelijk identiek |

**Conclusie aanmelding:** Inhoudelijk identiek, lichte herformulering naar gladdere zinnen.

---

### 31. `/beeldbellen-videoconsult`

**Oud:** `/beeldbellen-videoconsult/`
**Nieuw:** `src/pages/beeldbellen-videoconsult.astro` + `src/content/pages/beeldbellen-videoconsult.md`

| Onderwerp | Oud | Nieuw |
|---|---|---|
| Wat is het | "Wist u dat de huisarts (en de praktijkondersteuner) ook met u kan videobellen via een beveiligde verbinding? U kunt de assistente vragen om een video-consult in te plannen als 'beeldbelafspraak'. De tijd is bij de huisarts net zo lang als bij een normaal consult, dus ongeveer 10 minuten per afspraak." | Aanwezig in essentie |
| **"Voor uitslagen telefonisch"** | "Voor het kort bespreken van uitslagen, het beantwoorden van simpele vragen zal de huisarts telefonisch contact met u opnemen." | **WEG** |
| **"Extra service, niet verplicht"** | "Wij zien de mogelijkheid van het videoconsult vooral als extra service, als u liever naar de praktijk komt, dan kan dat natuurlijk ook." | **WEG** -- belangrijke "geen verplichting" boodschap weg |
| Hoe werkt het | "U hoeft voor dit consult niet naar de praktijk te komen. Wij zien de mogelijkheid van het videoconsult vooral als extra service" | Aanwezig in samengevatte vorm |
| Voordeel reistijd | "Voordeel dat u geen reistijd heeft, geen oppas voor uw kinderen hoeft te regelen etc. en geen last heeft van een wachttijd in de wachtkamer." | Aanwezig: "Geen reistijd, geen oppasregeling nodig, geen wachtkamer" |
| Beperkingen | "Vanzelfsprekend zijn lang niet alle klachten en problemen geschikt voor een videoconsult, bijvoorbeeld als er een lichamelijk onderzoek moet worden verricht." | Aanwezig |
| Vereisten | "Voor een videoconsult heeft u een computer, tablet of smartphone nodig met geluid en een camera. En u heeft ook een internetverbinding nodig." | Aanwezig |
| **Foto's delen** | "Het is mogelijk tijdens het consult afbeeldingen met elkaar te delen. Mocht u iets willen laten zien, dan is het vaak handig om vooraf alvast een scherpe foto te maken." | **WEG** -- praktische tip is verloren |
| Inloggen + wachtkamer | "10 minuten voordat u uw afspraak heeft, klikt u op de link en logt u in om de instellingen van het geluid en het beeld te testen en om te zorgen voor een goede belichting. Nu kunt u wachten totdat de huisarts (of de praktijkondersteuner) op het afgesproken tijdstip bij u komt via het scherm." | Aanwezig in samengevatte vorm |
| **Wachtkamer wachten** | "Net als in de praktijk kan het zijn dat er een spoedgeval tussendoor komt of een ander consult uitloopt. Blijf wachten tot u vanuit de digitale wachtkamer wordt binnengelaten." | **WEG** -- belangrijke "blijf wachten" instructie verloren |
| Privacy arts | "Een videoconsult maakt gebruik van de beveiligde internetverbinding van onze praktijk. Uw gesprek wordt niet opgenomen. De huisarts (of de praktijkondersteuner) zit in een gesloten ruimte zodat niemand kan meeluisteren en maakt zoals gebruikelijk aantekeningen in uw dossier." | Aanwezig |
| **Privacy patient** | "U kunt zelf ook wat doen aan uw eigen privacy. Zorg dat u ook in een gesloten ruimte zit zodat er niemand kan meeluisteren. Maak geen gebruik van een openbare internetverbinding." | **WEG** -- de patient-zelfde-doen tips zijn verloren |
| **Fallback bij problemen** | "U en wij moeten nog even wennen aan deze nieuwe service en techniek. Bij vragen of problemen kunt u contact opnemen met de assistente. Als de video-verbinding niet tot stand komt zal de huisarts u proberen te bellen." | **WEG** -- de fallback-uitleg is verloren |

**Conclusie beeldbellen:** **Substantieel verkort.** De praktische tips (foto's delen, blijven wachten in wachtkamer, privacy aan patientzijde, fallback bij problemen) zijn allemaal weggevallen. De nieuwe pagina is een compacte feature-beschrijving zonder de gebruikersgerichte instructies.

---

### 32. `/ik-geef-toestemming`

**Oud:** `/ik-geef-toestemming/`
**Nieuw:** `src/pages/ik-geef-toestemming.astro` + `src/content/pages/ik-geef-toestemming.md`

De oude pagina bevat **veel meer detail** over LSP (Landelijk Schakelpunt) dan ik snel kan dekken. Hieronder de belangrijkste verloren passages:

| Onderwerp | Oud | Nieuw |
|---|---|---|
| **Volgjezorg.nl intro** | "www.volgjezorg.nl -- Elektronisch medische gegevens delen en zien wie uw gegevens heeft bekeken" | Aanwezig in afgezwakte vorm |
| Dossier huisarts/apotheek | "Uw huisarts en apotheek houden ieder een eigen dossier over u bij. Hierin staat informatie die belangrijk is voor uw behandeling. Uw huisarts legt vast wat uw klachten zijn en welke behandelingen u krijgt. Uw apotheker registreert welke medicijnen u krijgt en voor welke medicijnen u allergisch bent." | Aanwezig in essentie |
| Toestemming geven | "Maakt uw huisarts of apotheek gebruik van het LSP? Dan zal hij of zij u om toestemming vragen om uw gegevens beschikbaar te stellen via dit netwerk. Na uw toestemming meldt uw zorgverlener uw gegevens aan bij het LSP door uw burgerservicenummer (BSN) door te geven." | Aanwezig |
| Gegevens opvragen flow | "Een andere zorgverlener kan dan uw gegevens opvragen als dat nodig is voor uw behandeling. Het LSP zoekt aan de hand van uw BSN welke zorgverleners gegevens over u beschikbaar hebben gesteld. Als er gegevens beschikbaar zijn, kan de zorgverlener deze opvragen en bekijken." | Aanwezig |
| Wat staat in LSP | "In het netwerk staat alleen uw BSN vermeld en welke huisarts en apotheek gegevens over u beschikbaar hebben. Uw medische gegevens worden dus niet opgeslagen in het LSP." | Aanwezig |
| **Regio-uitleg** | "Het LSP is opgedeeld in ongeveer veertig regio's. Alle huisartsenposten, huisartsen en apotheken, die gebruikmaken van het LSP, zijn ingedeeld in een van deze regio's en kunnen zich eventueel bij een andere regio aansluiten. Binnen zo'n regio wisselen zorgverleners gegevens met elkaar uit. Voor ziekenhuizen is een uitzondering gemaakt..." | **VERKORT** -- wel "40 regio's" maar de uitleg over uitwisseling tussen regio's en de uitzondering voor ziekenhuizen is verloren |
| **Formulier uitprinten** | "Daarnaast kunt u het formulier uitprinten, invullen en inleveren bij uw zorgverlener. Ook kunt u uw toestemming online regelen op www.volgjezorg.nl." | **WEG** -- alternatieve manieren van toestemming zijn verloren |
| Toestemming intrekken | "U kunt uw toestemming altijd weer intrekken." | Aanwezig |
| **Zien wie gegevens bekeken** | "Met het overzicht toestemmingen en uitwisselingen op Volgjezorg. Op deze overzichten ziet u welke soorten gegevens uw huisarts en apotheken delen met uw andere zorgverleners. En wanneer zij die gegevens beschikbaar hebben gesteld. Ook ziet u welke zorgverleners welke soorten gegevens hebben bekeken. En wanneer." | **VOLLEDIG WEG** -- de hele uitleg over hoe je kan zien wie je dossier bekeken heeft is niet overgenomen |
| **Uitprinten/downloaden formulier knop** | "Wilt u het toestemmingsformulier invullen en uitprinten? Klik op de button hiernaast om het formulier te downloaden." | **WEG** -- download-knop voor toestemmingsformulier is verloren |

**Conclusie ik-geef-toestemming:** **Sterk verkort.** De praktische manieren om toestemming te geven (formulier uitprinten/downloaden, online via volgjezorg.nl), het kunnen volgen wie je dossier heeft bekeken, en de regio-uitleg zijn allemaal verloren.

---

### 33. `/routebeschrijving`

**Oud:** `/routebeschrijving/`
**Nieuw:** `src/pages/routebeschrijving.astro` + `ContactSpoedBlock`

| Onderwerp | Oud | Nieuw |
|---|---|---|
| Adres | Pijnboomstraat 19, 2023 VN Haarlem | Identiek |
| Routetool | (WordPress widget met "vul uw adres in" interface) | **Niet overgenomen** -- alleen statisch adres + ContactSpoedBlock |
| Telefoon/email | Identiek | Identiek (uit practices.json) |

**Conclusie routebeschrijving:** Inhoudelijk gelijk minus de interactieve route-tool.

---

## Volledig nieuwe pagina's

### `/contact` & `/contact-kinderen`

Op de oude WordPress site bestond geen aparte `/contact` pagina -- contact-info stond verspreid over alle pagina's. De nieuwe site heeft:

- `/contact` -- triage-pagina (spoed/afspraak/bericht) met routing naar juiste kanaal
- `/contact-kinderen` -- specifiek voor beveiligd contact bij kinderen <16 (placeholder voor ZIVVER Conversation Starter)

**Conclusie:** Twee volledig nieuwe pagina's met geen oude tegenhanger.

### `/formulieren`

Op de oude site was geen index van alle formulieren -- ze stonden verspreid op `/administratieformulier`, `/urineonderzoek-formulier`, etc. De nieuwe site heeft `/formulieren` als overzichtspagina.

### `/minderjarigen-wilsonbekwamen`

Op de oude site bestond geen eigen URL `/minderjarigen-wilsonbekwamen/` (404). Wel werd hier in de footer naar verwezen via `/informatieverstrekking-aan-vertegenwoordigers-van-minderjarigen-en-wilsonbekwamen/`. De nieuwe site heeft een dedicated pagina.

---

## Overzicht: belangrijkste actiepunten n.a.v. deze grondige vergelijking

| Pagina | Wat is verloren | Suggestie |
|---|---|---|
| Home | Persoonlijke schrijftoon (deels hersteld), praktijksluitingen, telefoonsysteem-tips, "voordelen grotere organisatie", "U treft bij ons overdag nooit een dichte deur" | Overweeg uitbreiding home.json met meer warme passages, en gebruik mededelingen-CMS voor sluitingen |
| Home (Nynke Kimman) | Tijdelijke vervanger voor Schaap tijdens NZ-jaar | Toevoegen aan staff.json, of besluiten dat deze tijdelijke melding via mededelingen gaat |
| Spreekuur | "rekening houden met uw komst", "iemand anders behandelen" | Korte zinnen toevoegen aan spreekuur.json voor warmere toon |
| Patientenomgeving | Privacy-uitleg <16, "andere digitale vragen helpdesk" | Toevoegen aan patientenomgeving.json of contact-kinderen |
| Spoedpost | "Alleen voor wat niet kan wachten" waarschuwing | Terugzetten in markdown body |
| Medewerkers index | Volledige uitleg wat assistenten/verpleegkundigen doen | Intro-tekst toevoegen aan `src/pages/medewerkers/index.astro` |
| Praktijkverpleegkundigen | Direct nummer 11-12u tijdvenster, huisbezoek bereidheid, POH GGZ "geen eigen bijdrage" | Bio's of intro uitbreiden |
| Praktijkassistenten | Hele intro over takenpakket, eigen spreekuren, beroepsgeheim | Intro-blok toevoegen op de pagina |
| HAIO | "Schoterpoort is AMC-opleidingspraktijk", "co-assistenten 2 weken stage" | Intro-tekst toevoegen |
| Beeldbellen | Praktische tips: foto's delen, wachten in digitale wachtkamer, privacy patient-kant, fallback bij verbindingsproblemen | Markdown body uitbreiden |
| Ik geef toestemming | Formulier uitprinten/downloaden, "zien wie je dossier bekeken heeft" via Volgjezorg, regio-uitleg | Markdown body uitbreiden + download-knop voor toestemmingsformulier |
| Cookiewetgeving | (Nog steeds template-restant `demopraktijk_secure`) | Cookienaam aanpassen aan wat de Astro-site werkelijk plaatst |
| Vacature PDF | Link wijst nog naar oude WordPress upload | Bij TransIP migratie verplaatsen |
| Klachtenformulier | CAPTCHA ontbreekt | Toevoegen bij PHP backend implementatie |
| Routebeschrijving | Interactieve route-tool ontbreekt | Optioneel: Google Maps embed of OpenStreetMap |

## Excuses en methode-correctie

Mijn eerste vergelijking (commit `91a7bd4`) was te oppervlakkig. Ik vroeg WebFetch om "letterlijke tekst" maar de WebFetch tool draait altijd een LLM op de fetched content die samenvattingen produceert. Daardoor werkte ik met samenvattingen i.p.v. echte tekst, en miste ik tone-verschuivingen, weggelaten zinnen en nuances.

**Deze tweede ronde** gebruikt een ander aanpak: raw HTML download via curl, plain text extractie via een eigen Python parser, en zin-voor-zin lezen van zowel oud als nieuw. Dat geeft de letterlijke citaten die je in de tabellen ziet.

Mocht je nog twijfelen aan een specifieke pagina, dan kan ik die met de raw text bestanden in `/tmp/schoterpoort_pages/` verder uitdiepen.
