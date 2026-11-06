# Café Zakrzówek ☼ – strona www

Statyczna strona (HTML + CSS + JS, bez budowania). Wystarczy wrzucić cały folder na dowolny hosting.
Obecny adres: https://wiksas.github.io/strona01/ (GitHub Pages).

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
| Teksty sezonowe, karty „Teraz u nas”, pasek z hasłami, oferta sezonowa w menu | `js/seasons.js` → `seasons` |
| Zdjęcia w hero (łuk + polaroid) dla każdego sezonu | `index.html` → skrypt w `<head>` (`H = {…}`) |
| Domyślna treść w HTML (widoczna bez JS i dla wyszukiwarek) | `index.html` – obecnie wersja jesienna |
| Menu („Z witryny”, „Kawa i matcha”) | `index.html` → sekcja `#menu` |
| Pytania (FAQ) | `index.html` → sekcja `#pytania` **i** blok `FAQPage` w JSON-LD (treść musi być identyczna) |
| Godziny otwarcia | `js/seasons.js` → `hours`, `index.html` (FAQ, JSON-LD, teksty) |
| Kolory sezonów | `css/style.css` → `html[data-season="…"]` |
| Zdjęcia | `assets/img/` – `nazwa.webp` + `nazwa-320.webp`; nowe zdjęcie dopisz też do `images` w `js/seasons.js` i do `sitemap.xml` |

Po każdej zmianie CSS/JS podbij wersję `?v=RRRRMMDD` w `index.html` i `404.html`.

## Zmiana domeny

Adres `https://wiksas.github.io/strona01/` jest wpisany w: `index.html` (canonical, `og:*`, JSON-LD), `404.html` (`<base>`),
`robots.txt`, `sitemap.xml`. Przy przejściu na własną domenę zmień go we wszystkich tych miejscach i ustaw przekierowanie 301
ze starego adresu. `robots.txt` działa tylko w katalogu głównym domeny – na `github.io/strona01/` Google go nie czyta,
więc sitemapę trzeba zgłosić ręcznie w Search Console.

## Do sprawdzenia z kawiarnią

- Godziny: przyjęto **9–19 codziennie** (post na IG z kwietnia 2026); OpenStreetMap podaje 9–20.
- FAQ powstało z informacji z Instagrama – kawiarnia powinna potwierdzić odpowiedzi i dopisać pytania, które klienci faktycznie zadają.
- W menu są tylko pozycje widoczne w postach. Pełna karta napojów jest w relacjach na IG – warto ją dostać i wpisać.
- Zdjęcia z IG mają ~480–640 px – przydadzą się oryginały w wyższej rozdzielczości.

## Rekomendacje (wymagają danych od klienta albo pracy poza stroną)

- **Własna domena** i przekierowanie 301 z `github.io`; wtedy `robots.txt` zacznie działać.
- **Google Search Console** (weryfikacja przez DNS), wysłanie `sitemap.xml`; potem Bing Webmaster Tools (import z GSC).
- **Wizytówka Google**: uzupełnić kategorię, godziny, zdjęcia, link do strony; podmienić link „Opinie w Google” i `hasMap`
  w JSON-LD na bezpośredni link do wizytówki (teraz to wyszukiwanie w Mapach).
- **Opinie na stronie**: potrzebne prawdziwe opinie (tekst + podpis, za zgodą autorów). Bez gwiazdek w JSON-LD.
- **Podstrona „Sala na przyjęcia”**: osobna fraza („sala na urodziny / imprezę firmową Kraków”). Potrzebne dane:
  pojemność sali, oferta cateringowa, zdjęcia sali, ewentualnie ceny.
- **Podstrona z pełnym menu**, gdy będzie dostępna karta.
- **Statystyki**: narzędzie bez ciasteczek (np. Plausible, GoatCounter) – bez banera zgody; liczyć kliknięcia „Zadzwoń”, „Prowadź”, e-mail.
- **Polityka prywatności**: przy dodaniu formularza lub statystyk (potrzebne dane administratora: nazwa firmy, adres, NIP).
- **Katalogi lokalne** (np. Zomato, TripAdvisor, Facebook) z identyczną nazwą, adresem i telefonem.
