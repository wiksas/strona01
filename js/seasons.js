/* ==========================================================================
   Treści strony – tu edytujesz wszystko, co zmienia się z sezonem.
   Sezon wybiera się automatycznie wg daty (mar–maj wiosna, cze–sie lato,
   wrz–lis jesień, gru–lut zima). Można go wymusić linkiem: ?sezon=zima
   ========================================================================== */

window.CAFE = {
  // Godziny otwarcia (wg posta na IG: „codziennie w godzinach 9-19”)
  hours: { open: 9, close: 19 },
  location: { lat: 50.0350478, lng: 19.9130438 },

  seasons: {
    wiosna: {
      label: 'Wiosna',
      themeColor: '#f6f1ea',
      particles: 'petals',
      eyebrow: 'U nas już wiosna',
      title1: 'Kawa',
      title2: 'w kwiatach',
      titleItalic: 'i widok na wiosenny Zakrzówek',
      lead: 'Pierwsze ciepłe spacery wokół zalewu zaczynają się u nas. Weź kawę na wynos w naszym kubku albo usiądź i złap wiosenne słońce.',
      heroMain: { src: 'kawa-na-wynos-wiosna.jpg', alt: 'Dwie kawy na wynos w kubkach Café Zakrzówek i bukiet wiosennych kwiatów' },
      heroSecond: { src: 'baristki.jpg', alt: 'Baristki Café Zakrzówek z kawą i gazetą' },
      walkerImg: { src: 'drozdzowka-taras.jpg', alt: 'Drożdżówki z owocami na tle zieleni wokół zalewu' },
      badge: 'kawa na wynos ☼ wiosna ☼ kawa na wynos ☼ wiosna ☼ ',
      walkerTitle: 'Wiosenny spacer? Zrób przystanek na kawę.',
      walkerLead: 'Jesteśmy przy ul. Wyłom 22, tuż przy ścieżkach wokół zalewu. Kawa na wynos, coś słodkiego i dalej w drogę – albo zostań na dłużej.',
      seasonKicker: 'Oferta wiosenna',
      seasonTitle: 'Wiosna w witrynie',
      seasonLead: 'Świeże kwiaty na stolikach, lekkie śniadania i kawa, którą zabierzesz na spacer.',
      eventsExtra: 'komunie i chrzciny',
      marquee: ['kawa na wynos', 'wiosna nad Zakrzówkiem', 'drożdżówki', 'croissanty', 'matcha', 'widok na zalew'],
      highlights: [
        { tag: 'na spacer', title: 'Kawa na wynos', text: 'W naszych kubkach z logo – gotowa na dalszy spacer wokół zalewu.', img: 'kawa-na-wynos-wiosna.jpg', alt: 'Kawy na wynos w kubkach z logo kawiarni' },
        { tag: 'z witryny', title: 'Drożdżówki z owocami', text: 'Puszyste, z kruszonką i owocami. Najlepiej smakują z widokiem na zieleń.', img: 'drozdzowka-taras.jpg', alt: 'Drożdżówki z kruszonką i owocami' },
        { tag: 'codziennie', title: 'Croissanty wytrawne', text: 'Caprese, z boczkiem i jajkiem, z hummusem albo guacamole – śniadanie przed spacerem.', img: 'croissanty.jpg', alt: 'Croissanty wytrawne z warzywami' }
      ],
      menuSeasonal: [
        { name: 'Kawa na wynos', desc: 'Każda kawa z karty w kubku na spacer.' },
        { name: 'Drożdżówki z owocami', desc: 'Z kruszonką, prosto z witryny.' },
        { name: 'Matcha latte', desc: 'Na ciepło albo z lodem.' }
      ]
    },

    lato: {
      label: 'Lato',
      themeColor: '#f3efe7',
      particles: 'sun',
      eyebrow: 'Sezon na lato',
      title1: 'Lato',
      title2: 'nad zalewem',
      titleItalic: 'drożdżówka, słońce i widok',
      lead: 'Widok, który zatrzymuje lato na dłużej. Po plażowaniu albo w połowie spaceru wokół Zakrzówka – wpadnij na coś zimnego.',
      heroMain: { src: 'frugoo-matcha.jpg', alt: 'Frugoo Matcha – matcha wlewana do lemoniady marakuja, w tle zalew Zakrzówek' },
      heroSecond: { src: 'poziomianki-widok.jpg', alt: 'Drożdżówki z truskawkami na tle turkusowego zalewu' },
      walkerImg: { src: 'kawa-na-wynos-wiosna.jpg', alt: 'Kawy na wynos w kubkach Café Zakrzówek' },
      badge: 'coś zimnego? ☼ na wynos ☼ coś zimnego? ☼ na wynos ☼ ',
      walkerTitle: 'Upał na spacerze? Wpadnij na coś zimnego.',
      walkerLead: 'Jesteśmy przy ul. Wyłom 22, tuż nad Zakrzówkiem. Lemoniada z matchą na wynos albo chwila w cieniu z widokiem na turkusową wodę.',
      seasonKicker: 'Oferta letnia',
      seasonTitle: 'Smaki lata',
      seasonLead: 'Pozycje sezonowe znikają szybko – część z nich to edycje mocno limitowane.',
      eventsExtra: 'garden party',
      marquee: ['frugoo matcha', 'jagodzianki', 'poziomianki', 'kawy zimne', 'lato nad Zakrzówkiem', 'na wynos'],
      highlights: [
        { tag: 'nowość', title: 'Frugoo Matcha', text: 'Połączenie lemoniady marakuja i matchy – idealne na upalne dni.', img: 'frugoo-matcha.jpg', alt: 'Frugoo Matcha w szklance' },
        { tag: 'limitowane', title: 'Jagodzianki i poziomianki', text: 'Sezonowe drożdżówki z owocami. Poziomianki to edycja mocno limitowana!', img: 'poziomianki-widok.jpg', alt: 'Poziomianki na tle zalewu' },
        { tag: 'sezonowo', title: 'Malinianki pistacjowe', text: 'Maliny w cieście drożdżowym z kremem pistacjowym na bazie białej czekolady.', img: 'malinianki-pistacjowe.jpg', alt: 'Malinianki z kremem pistacjowym i malinami' }
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
      eyebrow: 'Jesień przy stoliku',
      title1: 'Jesień',
      title2: 'przy kawie',
      titleItalic: 'z widokiem na złoty Zakrzówek',
      lead: 'Kiedy liście wokół zalewu zmieniają kolor, spacer najlepiej kończyć u nas: ciepła kawa, gazetka, partia szachów i coś słodkiego z witryny.',
      heroMain: { src: 'malinianki-pistacjowe.jpg', alt: 'Malinianki na drewnianej desce z widokiem na zalew Zakrzówek' },
      heroSecond: { src: 'gry-planszowe.jpg', alt: 'Partia szachów przy kawie i matcha latte' },
      walkerImg: { src: 'baristki.jpg', alt: 'Baristki Café Zakrzówek z kawą i gazetą' },
      badge: 'ciepła kawa ☼ na wynos ☼ ciepła kawa ☼ na wynos ☼ ',
      walkerTitle: 'Chłodniej na spacerze? Rozgrzej się u nas.',
      walkerLead: 'Jesteśmy przy ul. Wyłom 22, tuż przy ścieżkach wokół zalewu. Ciepła kawa na wynos w drogę albo stolik w środku z widokiem.',
      seasonKicker: 'Oferta jesienna',
      seasonTitle: 'Jesień u nas',
      seasonLead: 'Dłuższe popołudnia przy stoliku – z kawą, czymś słodkim i grą planszową.',
      eventsExtra: 'andrzejki',
      marquee: ['ciepła kawa', 'gry planszowe', 'malinianki', 'gazetka do kawy', 'jesień nad Zakrzówkiem', 'na wynos'],
      highlights: [
        { tag: 'na miejscu', title: 'Gry planszowe i szachy', text: 'Przestrzeń do rozrywki i odpoczynku – zostań na partię.', img: 'gry-planszowe.jpg', alt: 'Gra w szachy przy kawie' },
        { tag: 'klasyk', title: 'Malinianki', text: 'Maliny zawinięte w ciasto drożdżowe, przykryte kruszonką.', img: 'drozdzowka-taras.jpg', alt: 'Malinianki z kruszonką' },
        { tag: 'do kawy', title: 'Kawa i gazetka', text: 'Kawa, gazetka i nasze świetne baristki gotowe do pracy.', img: 'baristki.jpg', alt: 'Baristki z kawą i gazetą' }
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
      eyebrow: 'Zimowe popołudnia',
      title1: 'Zima',
      title2: 'w cieple',
      titleItalic: 'gorąca kawa z widokiem na zalew',
      lead: 'Zimowy spacer nad Zakrzówkiem najlepiej kończy się w cieple: kawa, matcha albo coś rozgrzewającego i widok przez duże okna.',
      heroMain: { src: 'gry-planszowe.jpg', alt: 'Cappuccino i matcha latte przy partii szachów' },
      heroSecond: { src: 'baristki.jpg', alt: 'Baristki Café Zakrzówek z kawą' },
      walkerImg: { src: 'kawa-na-wynos-wiosna.jpg', alt: 'Kawy na wynos w kubkach z logo kawiarni' },
      badge: 'rozgrzej się ☼ na wynos ☼ rozgrzej się ☼ na wynos ☼ ',
      walkerTitle: 'Zimno na spacerze? Wpadnij się ogrzać.',
      walkerLead: 'Jesteśmy przy ul. Wyłom 22, tuż przy ścieżkach wokół zalewu. Gorąca kawa na wynos do rąk albo ciepły stolik w środku.',
      seasonKicker: 'Oferta zimowa',
      seasonTitle: 'Zima u nas',
      seasonLead: 'Ciepło, kawa i miejsce na świąteczne spotkania – także w większym gronie.',
      eventsExtra: 'wigilie firmowe',
      marquee: ['gorąca kawa', 'napoje ciepłe', 'matcha', 'wigilie firmowe', 'zima nad Zakrzówkiem', 'na wynos'],
      highlights: [
        { tag: 'na rozgrzanie', title: 'Kawy i napoje ciepłe', text: 'Cappuccino, matcha latte i coś słodkiego do tego – w środku albo na wynos.', img: 'gry-planszowe.jpg', alt: 'Cappuccino i matcha latte na stoliku' },
        { tag: 'grudzień', title: 'Wigilie i spotkania firmowe', text: 'Duża sala z widokiem na przyjęcia świąteczne. Zarezerwuj termin wcześniej.', img: 'sala-eventowa.jpg', alt: 'Sala przygotowana na przyjęcie' },
        { tag: 'na ciepło', title: 'Croissanty wytrawne', text: 'Codziennie w witrynie – chętnie podgrzejemy.', img: 'croissanty.jpg', alt: 'Croissanty wytrawne' }
      ],
      menuSeasonal: [
        { name: 'Napoje ciepłe', desc: 'Na rozgrzanie po zimowym spacerze.' },
        { name: 'Croissanty na ciepło', desc: 'Prosto z witryny, podgrzane.' },
        { name: 'Przyjęcia świąteczne', desc: 'Rezerwacje sali: 795 455 233.' }
      ]
    }
  },

  /* Karta – kategorie wg wyróżnionych relacji na Instagramie.
     „Z witryny” pochodzi z posta kawiarni; pozostałe pozycje sprawdź z obsługą. */
  menu: [
    { id: 'sezon', label: 'Oferta sezonowa', seasonal: true },
    {
      id: 'witryna', label: 'Z witryny', items: [
        { name: 'Croissant z boczkiem i jajkiem' },
        { name: 'Croissant caprese' },
        { name: 'Croissant z hummusem', desc: 'i grillowanymi warzywami' },
        { name: 'Croissant z guacamole i jajkiem' },
        { name: 'Kanapka z pastą jajeczną' },
        { name: 'Kanapka z twarożkiem' },
        { name: 'Kanapka z szynką i serem' },
        { name: 'Kanapka z pasztetem' },
        { name: 'Drożdżówki', desc: 'malinianki, a sezonowo jagodzianki i poziomianki' }
      ]
    },
    {
      id: 'kawy-cieple', label: 'Kawy ciepłe', items: [
        { name: 'Espresso' }, { name: 'Americano' }, { name: 'Cappuccino' },
        { name: 'Flat white' }, { name: 'Latte' }
      ]
    },
    {
      id: 'kawy-zimne', label: 'Kawy zimne', items: [
        { name: 'Iced latte' }, { name: 'Espresso tonic' }, { name: 'Iced americano' }
      ]
    },
    {
      id: 'matcha', label: 'Matcha', items: [
        { name: 'Matcha latte', desc: 'na ciepło' },
        { name: 'Iced matcha latte' },
        { name: 'Frugoo Matcha', desc: 'lemoniada marakuja + matcha' }
      ]
    },
    {
      id: 'napoje-cieple', label: 'Napoje ciepłe', items: [
        { name: 'Herbata' }, { name: 'Gorąca czekolada' }
      ]
    },
    {
      id: 'napoje-zimne', label: 'Napoje zimne', items: [
        { name: 'Lemoniady' }, { name: 'Soki i napoje' }
      ]
    }
  ]
};
