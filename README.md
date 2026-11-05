# Café Zakrzówek ☼ – strona www

Statyczna strona (HTML + CSS + JS, bez budowania). Wystarczy wrzucić cały folder na dowolny hosting.

Podgląd lokalny:

```
python -m http.server 8765
```

i otwórz http://127.0.0.1:8765

## Wersje sezonowe

Sezon wybiera się automatycznie wg daty: mar–maj **wiosna**, cze–sie **lato**, wrz–lis **jesień**, gru–lut **zima** (zima ma ciemny, wieczorny motyw).
Odwiedzający mogą przełączyć sezon ikonami w nagłówku (wybór pamiętany do końca sesji).
Link do konkretnej wersji: `?sezon=wiosna`, `?sezon=lato`, `?sezon=jesien`, `?sezon=zima`.

## Gdzie co edytować

| Co | Plik |
|---|---|
| Teksty sezonowe, zdjęcia w hero, karty „Teraz u nas”, pasek z hasłami | `js/seasons.js` → `seasons` |
| Karta / menu (zakładki) | `js/seasons.js` → `menu` |
| Godziny otwarcia (status „Otwarte teraz”) | `js/seasons.js` → `hours` + `index.html` (JSON-LD) |
| Kolory sezonów | `css/style.css` → `html[data-season="…"]` |
| Zdjęcia | `assets/img/` (pochodzą z Instagrama @cafe.zakrzowek) |

## Do sprawdzenia z kawiarnią

- Godziny: przyjęto **9–19 codziennie** (post na IG z kwietnia 2026); OpenStreetMap podaje 9–20.
- Pozycje w zakładkach Kawy ciepłe / Kawy zimne / Matcha / Napoje ciepłe / Napoje zimne są przykładowe – kategorie pochodzą z wyróżnionych relacji na IG, ale pełna karta jest tylko w relacjach. Zakładka „Z witryny” i pozycje sezonowe pochodzą z postów.
- Zdjęcia z IG mają ~480–640 px – przydadzą się oryginały w wyższej rozdzielczości.
