# Café Zakrzówek ☼ – strona www

Strona na GitHub Pages: https://wiksas.github.io/cafe-zakrzowek/
Panel treści (Sveltia CMS): https://wiksas.github.io/cafe-zakrzowek/admin/

Treści są w plikach `_data/*.yml`. GitHub Pages przy każdym commicie składa z nich gotowy HTML (Jekyll),
więc cała treść jest w kodzie strony od razu – bez czekania na JavaScript (ważne dla Google).

## Panel treści (Sveltia CMS)

1. Wejdź na `/admin/`.
2. Kliknij **Sign In Using Access Token**. Okno podpowie link do GitHuba z gotowymi uprawnieniami – wygeneruj token,
   wklej go i gotowe (token zostaje zapisany w tej przeglądarce). Potrzebne jest konto GitHub z prawem zapisu do repozytorium.
   Token „fine-grained” musi mieć dostęp do repozytorium `wiksas/cafe-zakrzowek` z uprawnieniem **Contents: Read and write**.
3. Edytuj i kliknij **Zapisz** – to commit na `main`. Strona przebudowuje się sama w ok. 1–3 minuty.

Alternatywnie **Work with Local Repository** (Chrome/Edge) edytuje pliki w lokalnym folderze repozytorium – potem trzeba je samemu zacommitować.

Logowanie przyciskiem „Sign In with GitHub” (bez tokenu – wygodniejsze dla obsługi kawiarni) wymaga wdrożenia
[Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth) na Cloudflare Workers i aplikacji OAuth na GitHubie.
Potem w `admin/config.yml` odkomentuj `base_url` i dopisz `oauth` do `auth_methods`.

### Co jest w panelu

| Sekcja panelu | Plik | Co zmienia |
|---|---|---|
| Wersje sezonowe → Wiosna / Lato / Jesień / Zima | `_data/sezony/*.yml` | nagłówek, tekst, zdjęcia hero, plakietka, sekcja „Na spacer”, oferta sezonowa (karty; pierwsza karta jest duża, etykieta na zdjęciu opcjonalna), hasła na pasku, zakładka „Sezonowo” w menu |
| Treści strony → Dane kawiarni i SEO | `_data/firma.yml` | nazwa, telefon, e-mail, adres, godziny, linki, tytuł i opis w Google, obrazek do udostępniania |
| Treści strony → pozostałe | `_data/strona/*.yml` | góra strony, „Na spacer”, galeria, menu, przestrzeń, przyjęcia, pytania (FAQ), dojazd |

Pytania (FAQ) trafiają automatycznie także do danych strukturalnych dla Google – wystarczy edytować je w jednym miejscu.

### Zdjęcia

Zdjęcia wgrane przez panel są automatycznie zmieniane na WebP (maks. 1280 px) i trafiają do `assets/img/`.
Pliki z przyrostkiem `-320.webp` to mniejsze wersje dla telefonów – są tylko dla zdjęć przygotowanych ręcznie.
Jeśli obok zdjęcia `nazwa.webp` położysz `nazwa-320.webp` (320 px szerokości) i dopiszesz wymiary do `_data/obrazy.yml`,
strona sama zacznie używać mniejszej wersji.

## Wersje sezonowe

Sezon wybiera się automatycznie wg daty: mar–maj **wiosna**, cze–sie **lato**, wrz–lis **jesień**, gru–lut **zima** (zima ma ciemny motyw).
W HTML zapisywana jest wersja sezonu z chwili budowania strony; skrypt i tak przełącza na bieżący.
Odwiedzający mogą zmienić sezon ikonami w nagłówku. Link do konkretnej wersji: `?sezon=wiosna|lato|jesien|zima`.

## Pliki techniczne

| Co | Gdzie |
|---|---|
| Szablon strony | `index.html` (Liquid), `_includes/` |
| Dane sezonów dla skryptu | `js/seasons.js` – generowany z `_data/`, nie edytuj ręcznie |
| Zachowanie strony | `js/main.js` |
| Wygląd, kolory sezonów | `css/style.css` (`html[data-season="…"]`) |
| Konfiguracja panelu | `admin/config.yml` |
| Adres strony (canonical, sitemap, og) | `_config.yml` → `url` i `baseurl` |

Po zmianie CSS lub `main.js` podbij `?v=RRRRMMDD` w `index.html` i `404.html` (`seasons.js` wersjonuje się sam).

## Podgląd lokalny

Potrzebny Docker (ten sam obraz, którego używa GitHub Pages):

```
docker run --rm -v "%cd%:/github/workspace" -w /github/workspace -e GITHUB_WORKSPACE=/github/workspace ^
  -e INPUT_SOURCE=. -e INPUT_DESTINATION=./_site -e INPUT_FUTURE=false -e INPUT_BUILD_REVISION=local ^
  -e INPUT_VERBOSE=false -e INPUT_TOKEN= -e GITHUB_REPOSITORY=wiksas/cafe-zakrzowek ^
  ghcr.io/actions/jekyll-build-pages:v1.0.13
mkdir _preview & xcopy /e /i /y _site _preview\cafe-zakrzowek
python -m http.server 8765 --directory _preview
```

i otwórz http://127.0.0.1:8765/cafe-zakrzowek/

## Zmiana domeny

Zmień `url` i `baseurl` w `_config.yml` (np. `url: "https://cafezakrzowek.pl"`, `baseurl: ""`) oraz `site_url`
i `display_url` w `admin/config.yml`. Canonical, `og:*`, JSON-LD, `sitemap.xml`, `robots.txt` i strona 404 przeliczą się same.
Ze starego adresu ustaw przekierowanie 301. `robots.txt` działa dopiero w katalogu głównym domeny – na `github.io/cafe-zakrzowek/`
sitemapę trzeba zgłosić ręcznie w Search Console.

## Do sprawdzenia z kawiarnią

- Godziny: przyjęto **9–19 codziennie** (post na IG z kwietnia 2026); OpenStreetMap podaje 9–20.
- FAQ powstało z informacji z Instagrama – kawiarnia powinna potwierdzić odpowiedzi i dopisać pytania, które klienci faktycznie zadają.
- W menu są tylko pozycje widoczne w postach. Pełna karta napojów jest w relacjach na IG – warto ją wpisać przez panel.
- Zdjęcia z IG mają ~480–640 px – przydadzą się oryginały w wyższej rozdzielczości.

## Rekomendacje (wymagają danych od klienta albo pracy poza stroną)

- **Własna domena** i przekierowanie 301 z `github.io`; wtedy `robots.txt` zacznie działać.
- **Google Search Console** (weryfikacja przez DNS), wysłanie `sitemap.xml`; potem Bing Webmaster Tools (import z GSC).
- **Wizytówka Google**: uzupełnić kategorię, godziny, zdjęcia, link do strony; wpisać bezpośredni link do wizytówki
  w panelu (Dane kawiarni → Wizytówka Google) – teraz to wyszukiwanie w Mapach.
- **Opinie na stronie**: potrzebne prawdziwe opinie (tekst + podpis, za zgodą autorów). Bez gwiazdek w JSON-LD.
- **Podstrona „Sala na przyjęcia”**: osobna fraza („sala na urodziny / imprezę firmową Kraków”). Potrzebne dane:
  pojemność sali, oferta cateringowa, zdjęcia sali, ewentualnie ceny.
- **Podstrona z pełnym menu**, gdy będzie dostępna karta.
- **Statystyki**: narzędzie bez ciasteczek (np. Plausible, GoatCounter) – bez banera zgody; liczyć kliknięcia „Zadzwoń”, „Prowadź”, e-mail.
- **Polityka prywatności**: przy dodaniu formularza lub statystyk (potrzebne dane administratora: nazwa firmy, adres, NIP).
- **Katalogi lokalne** (np. Zomato, TripAdvisor, Facebook) z identyczną nazwą, adresem i telefonem.
