# Data structuur

## practices.json

Top-level object met:
- `address`, `email`, `phoneGeneral`, `phoneEmergency`, `phoneNurses`
- `practices[]` -- array van 4 praktijken, elk met:
  - `name`, `phone`
  - `doctors[]` -- array met `name`, `initials`, `role`, `workingDays`
  - `assistants[]` -- namen
  - `trainees[]` -- namen
- `sharedStaff` -- praktijkmanager, baliemedewerkers, PVK's, POH-GGZ

## staff.json

Platte array van alle medewerkers. Velden:
- `name`, `initials`, `role`, `bigNumber`, `team`, `phone`
- `workingDays[]`, `since`, `background`, `specializations[]`, `interests`
- `photo` -- pad relatief aan public/ (bijv. "/images/staff/naam.png")

### Rollen
Unieke rollen: Huisarts, Huisarts in opleiding (HAIO), Praktijkverpleegkundige somatiek, Spreekuurondersteuner, Praktijkondersteuner GGZ, Doktersassistente, Praktijkmanager, Baliemedewerker

### Dubbele rollen
Marjoleine is zowel Spreekuurondersteuner als Doktersassistente. In staff.json staat ze als "Spreekuurondersteuner". Op de assistenten-pagina wordt haar rol overschreven naar "Doktersassistente" via roleOverrides in medewerkers/[slug].astro.

## navigation.json

Array van menu-items met `label`, `href`, en optioneel `children[]`.
Externe links gebruiken volledige URLs (https://...).
