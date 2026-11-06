/* ==========================================================================
   Treści strony, które zmieniają się z sezonem.
   Sezon wybiera się automatycznie wg daty (mar–maj wiosna, cze–sie lato,
   wrz–lis jesień, gru–lut zima). Można go wymusić linkiem: ?sezon=zima
   Zdjęcia w hero (łuk + polaroid) ustawia się w <head> w index.html (szybsze ładowanie).
   Domyślna treść w HTML to jesień – po zmianie tutaj zaktualizuj też index.html.
   ========================================================================== */

window.CAFE = {
  // Godziny otwarcia (wg posta na IG: „codziennie w godzinach 9-19”)
  hours: { open: 9, close: 19 },
  location: { lat: 50.0350478, lng: 19.9130438 },

  // Wymiary zdjęć w assets/img/ (plik.webp + plik-320.webp) – potrzebne do srcset
  images: {
    'kawa-na-wynos-kubki-cafe-zakrzowek': [498, 640],
    'frugoo-matcha-widok-na-zalew-zakrzowek': [480, 640],
    'poziomianki-nad-zalewem-zakrzowek': [480, 640],
    'drozdzowki-z-owocami-nad-zakrzowkiem': [480, 640],
    'malinianki-z-kremem-pistacjowym-nad-zalewem': [480, 640],
    'szachy-i-kawa-w-kawiarni-krakow': [640, 478],
    'baristki-cafe-zakrzowek-krakow': [480, 640],
    'croissanty-wytrawne-cafe-zakrzowek': [640, 640],
    'sala-na-przyjecia-cafe-zakrzowek-krakow': [481, 640],
    'spotkanie-podroznicze-cafe-zakrzowek': [480, 640]
  },

  seasons: {
    wiosna: {
      label: 'Wiosna',
      themeColor: '#f6f1ea',
      particles: 'petals',
      title1: 'Kawa',
      title2: 'w kwiatach',
      titleItalic: 'i widok na wiosenny Zakrzówek',
      lead: 'Pierwsze ciepłe spacery wokół zalewu zaczynają się u nas. Weź kawę na wynos w naszym kubku albo usiądź i złap wiosenne słońce.',
      walkerImg: { src: 'drozdzowki-z-owocami-nad-zakrzowkiem', alt: 'Drożdżówki z kruszonką i owocami na drewnianej desce, w tle zieleń nad Zakrzówkiem' },
      badge: 'kawa na wynos ☼ wiosna ☼ kawa na wynos ☼ wiosna ☼ ',
      walkerTitle: 'Wiosenny spacer? Zrób przystanek na kawę.',
      walkerLead: 'Jesteśmy przy ul. Wyłom 22, tuż przy ścieżkach wokół zalewu. Kawa na wynos, coś słodkiego i dalej w drogę – albo zostań na dłużej.',
      seasonKicker: 'Oferta wiosenna',
      seasonTitle: 'Wiosna w witrynie',
      seasonLead: 'Kwiaty, lekkie śniadania z witryny i kawa, którą zabierzesz na spacer.',
      marquee: ['kawa na wynos', 'wiosna nad Zakrzówkiem', 'drożdżówki', 'croissanty', 'matcha', 'widok na zalew'],
      highlights: [
        { tag: 'na spacer', title: 'Kawa na wynos', text: 'W naszych kubkach z logo – gotowa na dalszy spacer wokół zalewu.', img: 'kawa-na-wynos-kubki-cafe-zakrzowek', alt: 'Dwie kawy na wynos w kubkach z logo Café Zakrzówek' },
        { tag: 'z witryny', title: 'Drożdżówki z owocami', text: 'Puszyste, z kruszonką i owocami. Najlepiej smakują z widokiem na zieleń.', img: 'drozdzowki-z-owocami-nad-zakrzowkiem', alt: 'Drożdżówki z kruszonką i owocami na drewnianej desce' },
        { tag: 'codziennie', title: 'Croissanty wytrawne', text: 'Caprese, z boczkiem i jajkiem, z hummusem albo guacamole – śniadanie przed spacerem.', img: 'croissanty-wytrawne-cafe-zakrzowek', alt: 'Croissanty wytrawne z pomidorem i warzywami na drewnianej desce' }
      ],
      menuSeasonal: [
        { name: 'Kawa na wynos', desc: 'Kawa z karty w kubku na spacer.' },
        { name: 'Drożdżówki z owocami', desc: 'Z kruszonką, prosto z witryny.' },
        { name: 'Matcha latte' }
      ]
    },

    lato: {
      label: 'Lato',
      themeColor: '#f3efe7',
      particles: 'sun',
      title1: 'Lato',
      title2: 'nad zalewem',
      titleItalic: 'drożdżówka, słońce i widok',
      lead: 'Widok, który zatrzymuje lato na dłużej. Po plażowaniu albo w połowie spaceru wokół Zakrzówka – wpadnij na coś zimnego.',
      walkerImg: { src: 'kawa-na-wynos-kubki-cafe-zakrzowek', alt: 'Dwie kawy na wynos w kubkach Café Zakrzówek i bukiet kwiatów' },
      badge: 'coś zimnego? ☼ na wynos ☼ coś zimnego? ☼ na wynos ☼ ',
      walkerTitle: 'Upał na spacerze? Wpadnij na coś zimnego.',
      walkerLead: 'Jesteśmy przy ul. Wyłom 22, tuż nad Zakrzówkiem. Lemoniada z matchą na wynos albo chwila w cieniu z widokiem na turkusową wodę.',
      seasonKicker: 'Oferta letnia',
      seasonTitle: 'Smaki lata',
      seasonLead: 'Pozycje sezonowe znikają szybko – część z nich to edycje mocno limitowane.',
      marquee: ['frugoo matcha', 'jagodzianki', 'poziomianki', 'kawy zimne', 'lato nad Zakrzówkiem', 'na wynos'],
      highlights: [
        { tag: 'nowość', title: 'Frugoo Matcha', text: 'Połączenie lemoniady marakuja i matchy – idealne na upalne dni.', img: 'frugoo-matcha-widok-na-zalew-zakrzowek', alt: 'Frugoo Matcha w szklance na balkonie z widokiem na zalew Zakrzówek' },
        { tag: 'limitowane', title: 'Jagodzianki i poziomianki', text: 'Sezonowe drożdżówki z owocami. Poziomianki to edycja mocno limitowana!', img: 'poziomianki-nad-zalewem-zakrzowek', alt: 'Poziomianki na drewnianej desce, w tle zalew Zakrzówek' },
        { tag: 'sezonowo', title: 'Malinianki pistacjowe', text: 'Maliny w cieście drożdżowym z kremem pistacjowym na bazie białej czekolady.', img: 'malinianki-z-kremem-pistacjowym-nad-zalewem', alt: 'Malinianki z kremem pistacjowym i malinami' }
      ],
      menuSeasonal: [
        { name: 'Frugoo Matcha', desc: 'Lemoniada marakuja + matcha.', badge: 'nowość' },
        { name: 'Jagodzianki', desc: 'Sezon na jagody – póki są.' },
        { name: 'Poziomianki', desc: 'Edycja mocno limitowana.', badge: 'limit' },
        { name: 'Malinianki z kremem pistacjowym', desc: 'Na bazie białej czekolady.' }
      ]
    },

    jesien: {
      label: 'Jesień',
      themeColor: '#f2e9dc',
      particles: 'leaves',
      title1: 'Jesień',
      title2: 'przy kawie',
      titleItalic: 'z widokiem na złoty Zakrzówek',
      lead: 'Kiedy liście wokół zalewu zmieniają kolor, spacer najlepiej kończyć u nas: ciepła kawa, gazetka, partia szachów i coś słodkiego z witryny.',
      walkerImg: { src: 'baristki-cafe-zakrzowek-krakow', alt: 'Baristki Café Zakrzówek z kawą i gazetą w kawiarni' },
      badge: 'ciepła kawa ☼ na wynos ☼ ciepła kawa ☼ na wynos ☼ ',
      walkerTitle: 'Chłodniej na spacerze? Rozgrzej się u nas.',
      walkerLead: 'Jesteśmy przy ul. Wyłom 22, tuż przy ścieżkach wokół zalewu. Ciepła kawa na wynos w drogę albo stolik w środku z widokiem.',
      seasonKicker: 'Oferta jesienna',
      seasonTitle: 'Jesień u nas',
      seasonLead: 'Dłuższe popołudnia przy stoliku – z kawą, czymś słodkim i grą planszową.',
      marquee: ['ciepła kawa', 'gry planszowe', 'malinianki', 'gazetka do kawy', 'jesień nad Zakrzówkiem', 'na wynos'],
      highlights: [
        { tag: 'na miejscu', title: 'Gry planszowe i szachy', text: 'Przestrzeń do rozrywki i odpoczynku – zostań na partię.', img: 'szachy-i-kawa-w-kawiarni-krakow', alt: 'Goście grający w szachy przy kawie w Café Zakrzówek' },
        { tag: 'klasyk', title: 'Malinianki', text: 'Maliny zawinięte w ciasto drożdżowe, przykryte kruszonką.', img: 'drozdzowki-z-owocami-nad-zakrzowkiem', alt: 'Drożdżówki z kruszonką i owocami na drewnianej desce, w tle zieleń nad Zakrzówkiem' },
        { tag: 'do kawy', title: 'Kawa i gazetka', text: 'Kawa, gazetka i nasze świetne baristki gotowe do pracy.', img: 'baristki-cafe-zakrzowek-krakow', alt: 'Baristki Café Zakrzówek z kawą i gazetą w kawiarni' }
      ],
      menuSeasonal: [
        { name: 'Malinianki', desc: 'Klasyk: maliny w cieście drożdżowym z kruszonką.' },
        { name: 'Croissanty na ciepło', desc: 'Wybrane pozycje z witryny chętnie podgrzejemy.' },
        { name: 'Napoje ciepłe', desc: 'Na rozgrzanie po spacerze.' }
      ]
    },

    zima: {
      label: 'Zima',
      themeColor: '#1b242b',
      particles: 'snow',
      title1: 'Zima',
      title2: 'w cieple',
      titleItalic: 'gorąca kawa z widokiem na zalew',
      lead: 'Zimowy spacer nad Zakrzówkiem najlepiej kończy się w cieple: kawa, matcha albo coś rozgrzewającego i widok przez duże okna.',
      walkerImg: { src: 'kawa-na-wynos-kubki-cafe-zakrzowek', alt: 'Dwie kawy na wynos w kubkach z logo Café Zakrzówek' },
      badge: 'rozgrzej się ☼ na wynos ☼ rozgrzej się ☼ na wynos ☼ ',
      walkerTitle: 'Zimno na spacerze? Wpadnij się ogrzać.',
      walkerLead: 'Jesteśmy przy ul. Wyłom 22, tuż przy ścieżkach wokół zalewu. Gorąca kawa na wynos do rąk albo ciepły stolik w środku.',
      seasonKicker: 'Oferta zimowa',
      seasonTitle: 'Zima u nas',
      seasonLead: 'Ciepło, kawa i sala na spotkania – także w większym gronie.',
      marquee: ['gorąca kawa', 'napoje ciepłe', 'matcha', 'sala na przyjęcia', 'zima nad Zakrzówkiem', 'na wynos'],
      highlights: [
        { tag: 'na rozgrzanie', title: 'Kawy i napoje ciepłe', text: 'Cappuccino, matcha latte i coś słodkiego do tego – w środku albo na wynos.', img: 'szachy-i-kawa-w-kawiarni-krakow', alt: 'Cappuccino i matcha latte na stoliku obok szachownicy' },
        { tag: 'w większym gronie', title: 'Przyjęcia i imprezy firmowe', text: 'Duża, klimatyczna sala z pięknym widokiem. Zarezerwuj termin wcześniej.', img: 'sala-na-przyjecia-cafe-zakrzowek-krakow', alt: 'Sala na przyjęcia w Café Zakrzówek z nakrytymi stołami' },
        { tag: 'na ciepło', title: 'Croissanty wytrawne', text: 'Codziennie w witrynie – chętnie podgrzejemy.', img: 'croissanty-wytrawne-cafe-zakrzowek', alt: 'Croissanty wytrawne z warzywami na drewnianej desce' }
      ],
      menuSeasonal: [
        { name: 'Napoje ciepłe', desc: 'Na rozgrzanie po zimowym spacerze.' },
        { name: 'Croissanty na ciepło', desc: 'Prosto z witryny, podgrzane.' },
        { name: 'Matcha latte' }
      ]
    }
  }
};
