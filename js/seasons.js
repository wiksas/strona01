---
# Plik generowany przez Jekylla z _data/ (edycja treści: Sveltia CMS, /admin/). Nie edytuj ręcznie.
---
{%- assign F = site.data.firma -%}
{%- assign smalls = site.static_files | where_exp: "f", "f.path contains '-320.webp'" | map: "path" -%}
window.CAFE = {
  base: {{ site.baseurl | jsonify }},
  hours: { open: {{ F.godziny.otwarcie }}, close: {{ F.godziny.zamkniecie }} },
  location: { lat: {{ F.szerokosc_geo }}, lng: {{ F.dlugosc_geo }} },
  images: {{ site.data.obrazy | jsonify }},
  smalls: {{ smalls | jsonify }},
  seasons: {
    wiosna: {{ site.data.sezony.wiosna | jsonify }},
    lato: {{ site.data.sezony.lato | jsonify }},
    jesien: {{ site.data.sezony.jesien | jsonify }},
    zima: {{ site.data.sezony.zima | jsonify }}
  }
};
