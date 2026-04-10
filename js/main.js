/* ============================================================
   main.js – StoryGames: Los Mejores Juegos Modo Historia
   Descripción: Lógica principal de la página: catálogo de
                juegos, filtrado, búsqueda, modal de detalle,
                sistema "Mis Juegos" con localStorage y
                formulario para añadir juegos personalizados.
   ============================================================ */

"use strict";

/* ──────────────────────────────────────────────
   1. BASE DE DATOS DE JUEGOS
   ────────────────────────────────────────────── */

/**
 * Catálogo oficial con los mejores videojuegos de modo historia.
 * Cada objeto contiene toda la información necesaria para
 * renderizar la tarjeta y el modal de detalle.
 */
const JUEGOS = [
  {
    id: 1,
    titulo: "The Last of Us Part I",
    estudio: "Naughty Dog",
    anio: 2013,
    genero: "accion",
    generoEtiqueta: "⚔️ Acción",
    plataforma: "PlayStation · PC",
    puntuacion: 9.5,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/1888930/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de The Last of Us Part I: Joel y Ellie en un mundo postapocalíptico",
    descripcion:
      "En un mundo devastado por una pandemia fúngica, Joel, un superviviente endurecido, " +
      "debe escoltar a Ellie, una adolescente inmune, a través de los Estados Unidos. " +
      "Una historia brutal y emotiva sobre el amor, la pérdida y lo que significa ser humano.",
    caracteristicas: [
      "Narrativa cinematográfica de altísima calidad",
      "Personajes con una profundidad emocional excepcional",
      "Combate que equilibra tensión y recursos limitados",
      "Banda sonora de Gustavo Santaolalla premiada mundialmente",
      "Considerado uno de los mejores videojuegos de la historia",
    ],
    duracion: "15-20h",
    metacritic: 95,
    premios: ["GOTY 2013 – múltiples medios", "BAFTA 2014 – Mejor Juego"],
    dificultad: "Media",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 2,
    titulo: "God of War (2018)",
    estudio: "Santa Monica Studio",
    anio: 2018,
    genero: "accion",
    generoEtiqueta: "⚔️ Acción",
    plataforma: "PlayStation · PC",
    puntuacion: 9.4,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/1593500/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de God of War: Kratos y Atreus en los reinos nórdicos",
    descripcion:
      "Kratos, el dios de la guerra, ahora vive en los reinos nórdicos junto a su joven " +
      "hijo Atreus. Juntos emprenden un viaje épico lleno de dioses, monstruos y " +
      "secretos oscuros del pasado, en una experiencia que redefine el género.",
    caracteristicas: [
      "Narrativa padre-hijo emotiva y bien construida",
      "Cámara en plano secuencia que nunca corta",
      "Mitología nórdica explorada con detalle",
      "Combate estratégico con el hacha Leviatán",
      "Ganador del GOTY 2018 en múltiples premios",
    ],
    duracion: "20-25h",
    metacritic: 94,
    premios: ["GOTY 2018 – The Game Awards", "BAFTA 2019 – Mejor Juego"],
    dificultad: "Media",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 3,
    titulo: "Red Dead Redemption 2",
    estudio: "Rockstar Games",
    anio: 2018,
    genero: "aventura",
    generoEtiqueta: "🗺️ Aventura",
    plataforma: "PS4 · Xbox One · PC",
    puntuacion: 9.7,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/1174180/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Red Dead Redemption 2: Arthur Morgan en el salvaje oeste",
    descripcion:
      "Arthur Morgan, forajido del gang Van der Linde, lucha por sobrevivir al declive " +
      "del salvaje oeste americano en 1899. Un mundo abierto de una escala y fidelidad " +
      "sin precedentes, con una historia de redención que parte el corazón.",
    caracteristicas: [
      "Mundo abierto más detallado en la historia de los videojuegos",
      "Historia de redención compleja y profundamente humana",
      "Más de 60 horas de historia principal",
      "Sistema de honor que moldea la narrativa",
      "Banda sonora y efectos de sonido excepcionales",
    ],
    duracion: "60-80h",
    metacritic: 97,
    premios: ["GOTY 2018 – múltiples medios", "BAFTA 2019 – Mejor Narrativa"],
    dificultad: "Media",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 4,
    titulo: "The Witcher 3: Wild Hunt",
    estudio: "CD Projekt Red",
    anio: 2015,
    genero: "rpg",
    generoEtiqueta: "🧙 RPG",
    plataforma: "PC · PS4 · Xbox · Switch",
    puntuacion: 9.8,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/292030/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de The Witcher 3: Geralt de Rivia en el mundo de Wild Hunt",
    descripcion:
      "Geralt de Rivia, el brujo más famoso del continente, busca a su hija adoptiva Ciri " +
      "mientras el mundo arde en guerra. Un RPG masivo con más de 200 horas de contenido " +
      "y decisiones morales que tienen consecuencias reales.",
    caracteristicas: [
      "Más de 36 finales distintos según tus decisiones",
      "Dos expansiones premiadas: Hearts of Stone y Blood and Wine",
      "Sistema de decisiones morales sin respuestas fáciles",
      "Mundo vivo con clima dinámico y ciclo día/noche",
      "El RPG mejor valorado de la última década",
    ],
    duracion: "100-200h",
    metacritic: 93,
    premios: ["GOTY 2015 – The Game Awards", "BAFTA 2016 – Mejor Juego"],
    dificultad: "Media",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 5,
    titulo: "Disco Elysium",
    estudio: "ZA/UM",
    anio: 2019,
    genero: "rpg",
    generoEtiqueta: "🧙 RPG",
    plataforma: "PC · PS4 · PS5",
    puntuacion: 9.2,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/632470/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Disco Elysium: el detective amnésico en la ciudad de Revachol",
    descripcion:
      "Un detective amnésico despierta en una ciudad en decadencia y debe investigar un " +
      "asesinato mientras reconstruye su identidad. Un RPG completamente textual y único " +
      "que redefine la narración interactiva con humor negro y filosofía profunda.",
    caracteristicas: [
      "Narrativa completamente impulsada por el diálogo y el texto",
      "Más de un millón de palabras escritas con maestría",
      "Sistema de habilidades que representa voces internas del personaje",
      "Comentario social y político brillante",
      "Ganador de cuatro premios BAFTA incluyendo mejor juego",
    ],
    duracion: "25-35h",
    metacritic: 97,
    premios: [
      "GOTY 2019 – The Game Awards",
      "BAFTA 2020 – Cuatro premios incluyendo Mejor Juego",
    ],
    dificultad: "Fácil",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 6,
    titulo: "Horizon Zero Dawn",
    estudio: "Guerrilla Games",
    anio: 2017,
    genero: "aventura",
    generoEtiqueta: "🗺️ Aventura",
    plataforma: "PlayStation · PC",
    puntuacion: 8.9,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/1151640/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Horizon Zero Dawn: Aloy enfrentando máquinas en un mundo salvaje",
    descripcion:
      "En un futuro lejano donde la humanidad ha retrocedido a la edad tribal y máquinas " +
      "mecánicas dominan la Tierra, Aloy busca conocer sus orígenes. Una aventura de " +
      "ciencia ficción con un misterio central fascinante e inesperado.",
    caracteristicas: [
      "Lore y misterio narrativo de primer nivel",
      "Protagonista femenina con motivaciones claras y profundas",
      "Mezcla única de naturaleza primitiva y tecnología avanzada",
      "Mundo abierto visualmente espectacular",
      "Giro narrativo que cambia completamente la perspectiva",
    ],
    duracion: "30-40h",
    metacritic: 89,
    premios: [
      "GOTY 2017 – múltiples medios",
      "BAFTA 2018 – Mejor Protagonista",
    ],
    dificultad: "Media",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 7,
    titulo: "Detroit: Become Human",
    estudio: "Quantic Dream",
    anio: 2018,
    genero: "drama",
    generoEtiqueta: "🎭 Drama",
    plataforma: "PlayStation · PC",
    puntuacion: 8.7,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/1222140/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Detroit Become Human: Connor, Kara y Markus, los tres androides protagonistas",
    descripcion:
      "En un Detroit del futuro cercano, tres androides —Kara, Connor y Markus— " +
      "despiertan a la conciencia y deben decidir su destino. Un drama interactivo " +
      "con más de mil formas de terminar la historia según tus elecciones.",
    caracteristicas: [
      "Más de 1000 variaciones narrativas y finales",
      "Tres perspectivas narrativas que se entrelazan",
      "Temas de libertad, identidad y derechos civiles",
      "Producción cinematográfica de altísimo nivel",
      "Cada decisión tiene consecuencias permanentes e irreversibles",
    ],
    duracion: "10-15h",
    metacritic: 78,
    premios: [
      "Premio al Mejor Guión Interactivo 2018",
      "Mejor Drama Interactivo – Critics Choice 2018",
    ],
    dificultad: "Fácil",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 8,
    titulo: "Celeste",
    estudio: "Maddy Makes Games",
    anio: 2018,
    genero: "indie",
    generoEtiqueta: "🌱 Indie",
    plataforma: "PC · Switch · PS4 · Xbox",
    puntuacion: 9.1,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/504230/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Celeste: Madeline escalando la montaña Celeste con estética pixel art",
    descripcion:
      "Madeline escala la montaña Celeste para enfrentarse a sí misma. Lo que parece un " +
      "plataformas difícil se convierte en una poderosa metáfora sobre la ansiedad, " +
      "la autoaceptación y la salud mental. Una joya indie que conmueve profundamente.",
    caracteristicas: [
      "Narrativa sobre salud mental tratada con respeto y ternura",
      "Diseño de niveles que refleja el estado emocional del personaje",
      "Banda sonora de Lena Raine aclamada mundialmente",
      "Modo de asistencia completamente personalizable",
      "Ganador del premio al mejor juego independiente en múltiples galas",
    ],
    duracion: "8-12h",
    metacritic: 94,
    premios: [
      "GOTY 2018 – múltiples medios",
      "BAFTA 2019 – Mejor Juego Independiente",
    ],
    dificultad: "Difícil",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 9,
    titulo: "Hades",
    estudio: "Supergiant Games",
    anio: 2020,
    genero: "indie",
    generoEtiqueta: "🌱 Indie",
    plataforma: "PC · Switch · PS · Xbox",
    puntuacion: 9.3,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/1145360/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Hades: Zagreus escapando del inframundo griego con su lanza",
    descripcion:
      "Zagreus, hijo del dios Hades, intenta escapar del inframundo griego en este roguelike " +
      "que integra la narrativa de forma revolucionaria. Cada muerte avanza la historia " +
      "y desbloquea nuevos diálogos, creando una experiencia única e irresistible.",
    caracteristicas: [
      "Narrativa que avanza con cada intento, incluso en la derrota",
      "Más de 20.000 líneas de diálogo totalmente dobladas",
      "Diseño de personajes carismático con relaciones profundas",
      "Ganador de Game of the Year 2020 en los BAFTA",
      "Perfecta integración entre mecánicas y narrativa",
    ],
    duracion: "20-50h",
    metacritic: 93,
    premios: ["GOTY 2020 – BAFTA", "Hugo Award 2021 – Mejor Videojuego"],
    dificultad: "Difícil",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 10,
    titulo: "Bioshock Infinite",
    estudio: "Irrational Games",
    anio: 2013,
    genero: "accion",
    generoEtiqueta: "⚔️ Acción",
    plataforma: "PC · PS3 · Xbox 360",
    puntuacion: 9.0,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/8870/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de BioShock Infinite: Booker DeWitt y Elizabeth en la ciudad flotante Columbia",
    descripcion:
      "Booker DeWitt llega a Columbia, una ciudad utópica flotante en las nubes, para " +
      "rescatar a Elizabeth. Lo que comienza como una misión simple se convierte en " +
      "un viaje a través del tiempo, los universos paralelos y la identidad.",
    caracteristicas: [
      "Giro narrativo considerado uno de los mejores de la historia",
      "Ambientación única y visualmente opulenta",
      "Exploración de temas como el excepcionalismo y el fanatismo",
      "Dinámica de compañero con Elizabeth profundamente emocional",
      "Final que recontextualiza completamente la historia",
    ],
    duracion: "10-15h",
    metacritic: 94,
    premios: ["GOTY 2013 – múltiples medios", "BAFTA 2014 – Mejor Historia"],
    dificultad: "Media",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 11,
    titulo: "NieR: Automata",
    estudio: "PlatinumGames",
    anio: 2017,
    genero: "rpg",
    generoEtiqueta: "🧙 RPG",
    plataforma: "PC · PS4 · Xbox · Switch",
    puntuacion: 9.3,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/524220/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de NieR: Automata: la androide 2B en un mundo postapocalíptico",
    descripcion:
      "En un futuro donde máquinas alienígenas han conquistado la Tierra, los androides " +
      "2B, 9S y A2 luchan para recuperar el planeta. Una obra maestra filosófica sobre " +
      "la existencia, la memoria y lo que significa ser consciente.",
    caracteristicas: [
      "Múltiples rutas narrativas que se complementan entre sí",
      "Banda sonora de Keiichi Okabe considerada una de las mejores de la historia",
      "Crítica filosófica profunda sobre la existencia y la conciencia",
      "Mezcla de géneros: hack and slash, bullet hell y RPG",
      "Final secreto que transciende el propio videojuego",
    ],
    duracion: "25-50h",
    metacritic: 88,
    premios: ["GOTY 2017 – Famitsu", "Premio IGN Mejor Historia 2017"],
    dificultad: "Media",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 12,
    titulo: "Persona 5 Royal",
    estudio: "Atlus",
    anio: 2019,
    genero: "rpg",
    generoEtiqueta: "🧙 RPG",
    plataforma: "PS4 · PS5 · PC · Xbox · Switch",
    puntuacion: 9.4,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/1687950/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Persona 5 Royal: Joker y los Ladrones Fantasma con estética estilizada",
    descripcion:
      "Joker y los Ladrones Fantasma exploran el Metaverso para cambiar los corazones " +
      "corruptos de los adultos. Un JRPG con estilo visual incomparable, narrativa " +
      "social profunda y más de 100 horas de contenido de altísima calidad.",
    caracteristicas: [
      "Diseño artístico y estético único e inconfundible",
      "Sistema de relaciones sociales (Confidentes) profundamente desarrollado",
      "Historia sobre la justicia, la corrupción y la rebeldía juvenil",
      "Más de 100 horas de contenido en la versión Royal",
      "Banda sonora de Shoji Meguro entre las más aclamadas del género",
    ],
    duracion: "100-130h",
    metacritic: 95,
    premios: [
      "GOTY 2020 – Famitsu",
      "Premio al Mejor RPG 2020 – múltiples medios",
    ],
    dificultad: "Media",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 13,
    titulo: "Cyberpunk 2077",
    estudio: "CD Projekt Red",
    anio: 2020,
    genero: "accion",
    generoEtiqueta: "⚔️ Acción",
    plataforma: "PC · PS4 · PS5 · Xbox",
    puntuacion: 8.8,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/1091500/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Cyberpunk 2077: V en la megalópolis de Night City de noche",
    descripcion:
      "En la megalópolis de Night City, el mercenario V busca un implante de inmortalidad " +
      "que resulta ser una bomba de tiempo. Una historia sobre identidad, corporativismo " +
      "y humanidad ambientada en el universo cyberpunk más detallado jamás creado en videojuegos.",
    caracteristicas: [
      "Night City: la ciudad abierta más densa y detallada de la historia",
      "Narrativa con múltiples finales y decisiones con consecuencias reales",
      "Sistema de personalización de personaje profundo y versátil",
      "Historia de Johnny Silverhand con actuación de Keanu Reeves",
      "Expansión Phantom Liberty aclamada con narrativa independiente",
    ],
    duracion: "25-60h",
    metacritic: 86,
    premios: [
      "Premio al Mejor Mundo Abierto 2020 – The Game Awards",
      "Premio Mejor Diseño Visual 2023 – Phantom Liberty",
    ],
    dificultad: "Media",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 14,
    titulo: "Sekiro: Shadows Die Twice",
    estudio: "FromSoftware",
    anio: 2019,
    genero: "accion",
    generoEtiqueta: "⚔️ Acción",
    plataforma: "PC · PS4 · Xbox One",
    puntuacion: 9.0,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/814380/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Sekiro: Shadows Die Twice: el shinobi Lobo con su brazo protésico",
    descripcion:
      "En el Japón feudal del período Sengoku, el shinobi conocido como Lobo busca rescatar " +
      "a su joven señor y vengarse de quienes lo mutilaron. Un juego que eleva la dificultad " +
      "a arte, exigiendo maestría y precisión absoluta al jugador.",
    caracteristicas: [
      "Sistema de combate por postura único y profundamente satisfactorio",
      "Ambientación en el Japón feudal de una autenticidad excepcional",
      "Jefes memorables que requieren estudio y dominio completo",
      "Narrativa oscura sobre la lealtad, la muerte y la inmortalidad",
      "GOTY 2019 en The Game Awards",
    ],
    duracion: "30-40h",
    metacritic: 90,
    premios: [
      "GOTY 2019 – The Game Awards",
      "BAFTA 2020 – Mejor Diseño de Juego",
    ],
    dificultad: "Muy difícil",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 15,
    titulo: "Mass Effect Legendary Edition",
    estudio: "BioWare",
    anio: 2021,
    genero: "rpg",
    generoEtiqueta: "🧙 RPG",
    plataforma: "PC · PS4 · Xbox One",
    puntuacion: 9.2,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/1328670/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Mass Effect Legendary Edition: el Comandante Shepard frente a la galaxia",
    descripcion:
      "La trilogía completa remasterizada del Comandante Shepard, quien debe unir a las " +
      "razas galácticas para enfrentar a los Segadores. Una saga épica de ciencia ficción " +
      "con decisiones que se trasladan entre los tres juegos y más de 100 horas de historia.",
    caracteristicas: [
      "Saga narrativa épica que abarca tres títulos completamente conectados",
      "Sistema de decisiones con consecuencias a lo largo de toda la trilogía",
      "Elenco de personajes memorable con relaciones profundas",
      "Universo de ciencia ficción vasto y coherentemente construido",
      "Uno de los mejores ejemplos de narrativa transmedia en videojuegos",
    ],
    duracion: "75-100h",
    metacritic: 92,
    premios: [
      "Premio al Mejor Compilatorio 2021 – múltiples medios",
      "GOTY 2021 – IGN",
    ],
    dificultad: "Media",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 16,
    titulo: "Marvel's Spider-Man Remastered",
    estudio: "Insomniac Games",
    anio: 2022,
    genero: "accion",
    generoEtiqueta: "⚔️ Acción",
    plataforma: "PlayStation · PC",
    puntuacion: 9.1,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/1817070/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Marvel's Spider-Man Remastered: Spider-Man balanceándose sobre Nueva York",
    descripcion:
      "Peter Parker equilibra su vida como Spider-Man y como científico mientras una " +
      "conspiración amenaza Nueva York. La mejor adaptación de Spider-Man en videojuegos, " +
      "con un movimiento por la ciudad absolutamente fluido y satisfactorio.",
    caracteristicas: [
      "Sistema de balanceo considerado el mejor del género de superhéroes",
      "Historia original que trata al personaje con respeto y profundidad",
      "Manhattan recreado con un nivel de detalle impresionante",
      "Sistema de combate fluido, espectacular y variado",
      "Actuaciones de voz y captura de movimiento de primer nivel",
    ],
    duracion: "15-20h",
    metacritic: 87,
    premios: [
      "Premio al Mejor Juego de Acción 2018 – The Game Awards",
      "BAFTA 2019 – Mejor Personaje Principal",
    ],
    dificultad: "Media",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 17,
    titulo: "Baldur's Gate 3",
    estudio: "Larian Studios",
    anio: 2023,
    genero: "rpg",
    generoEtiqueta: "🧙 RPG",
    plataforma: "PC · PS5 · Xbox Series",
    puntuacion: 9.6,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/1086940/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Baldur's Gate 3: un grupo de aventureros enfrentando monstruos en Faerûn",
    descripcion:
      "Con un parásito illithid en el cerebro, un grupo de aventureros debe encontrar la " +
      "cura antes de ser transformados. El RPG más ambicioso de la historia reciente, con " +
      "una libertad de elección y reactividad narrativa sin precedentes en el género.",
    caracteristicas: [
      "Más de 200 horas de contenido con elecciones de consecuencias reales",
      "Cooperativo de hasta 4 jugadores en toda la campaña",
      "Sistema de combate táctico basado en D&D 5a Edición",
      "Compañeros con relaciones y arcos narrativos profundamente escritos",
      "GOTY 2023 en The Game Awards, Steam y múltiples medios especializados",
    ],
    duracion: "100-200h",
    metacritic: 96,
    premios: ["GOTY 2023 – The Game Awards", "BAFTA 2024 – Mejor Juego"],
    dificultad: "Difícil",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 18,
    titulo: "Hollow Knight",
    estudio: "Team Cherry",
    anio: 2017,
    genero: "indie",
    generoEtiqueta: "🌱 Indie",
    plataforma: "PC · Switch · PS4 · Xbox",
    puntuacion: 9.0,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/367520/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Hollow Knight: el Caballero en el reino subterráneo de Hallownest",
    descripcion:
      "En el vasto reino subterráneo de Hallownest, un pequeño caballero explora ruinas " +
      "plagadas de insectos infectados. Un metroidvania que eleva el género con su arte " +
      "oscuro, narrativa ambiental profunda y una dificultad perfectamente equilibrada.",
    caracteristicas: [
      "Mapa enorme con zonas interconectadas llenas de secretos",
      "Arte dibujado a mano con una estética oscura única",
      "Narrativa ambiental rica contada sin texto innecesario",
      "Sistema de combate preciso y profundamente satisfactorio",
      "Más de 40 horas de contenido sin contar el DLC gratuito",
    ],
    duracion: "30-60h",
    metacritic: 90,
    premios: [
      "Premio IGN Mejor Indie 2017",
      "BAFTA 2018 – Premio Especial al Juego Independiente",
    ],
    dificultad: "Difícil",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 19,
    titulo: "Undertale",
    estudio: "Toby Fox",
    anio: 2015,
    genero: "indie",
    generoEtiqueta: "🌱 Indie",
    plataforma: "PC · Switch · PS4",
    puntuacion: 9.1,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/391540/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Undertale: un niño humano en el mundo subterráneo de los monstruos",
    descripcion:
      "Un niño cae al mundo subterráneo de los monstruos y debe encontrar el camino a casa. " +
      "Un RPG revolucionario donde puedes completar el juego sin matar a nadie, con " +
      "personajes entrañables, humor genuino y momentos que rompen la cuarta pared.",
    caracteristicas: [
      "Sistema de combate que permite resolver conflictos sin violencia",
      "Personajes con personalidades únicas e historias emotivas",
      "Banda sonora íntegramente compuesta por Toby Fox",
      "Narrativa que subvierte y deconstruye los tropos del RPG",
      "Múltiples rutas con implicaciones morales profundamente distintas",
    ],
    duracion: "6-10h",
    metacritic: 92,
    premios: [
      "GOTY 2015 – múltiples medios independientes",
      "Premio IGN Mejor Indie 2015",
    ],
    dificultad: "Fácil",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 20,
    titulo: "Final Fantasy VII Remake",
    estudio: "Square Enix",
    anio: 2021,
    genero: "rpg",
    generoEtiqueta: "🧙 RPG",
    plataforma: "PC · PS4 · PS5",
    puntuacion: 8.9,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/1462040/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Final Fantasy VII Remake: Cloud Strife con su espadón en Midgar",
    descripcion:
      "El remake del legendario JRPG de 1997 reimagina con todo detalle el primer arco " +
      "en la ciudad de Midgar. Cloud Strife y el grupo AVALANCHA luchan contra la " +
      "corporación Shinra en un juego que honra y reinventa el original simultáneamente.",
    caracteristicas: [
      "Remake fiel que expande y profundiza el original con respeto",
      "Sistema de combate híbrido que combina acción y estrategia por turnos",
      "Personajes icónicos redibujados con nueva profundidad emocional",
      "Banda sonora reimaginada por Nobuo Uematsu y otros compositores",
      "Apartado visual de referencia en el género RPG",
    ],
    duracion: "35-40h",
    metacritic: 87,
    premios: [
      "Premio al Mejor RPG 2020 – The Game Awards",
      "BAFTA 2021 – Mejor Música",
    ],
    dificultad: "Media",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 21,
    titulo: "Alan Wake 2",
    estudio: "Remedy Entertainment",
    anio: 2023,
    genero: "aventura",
    generoEtiqueta: "🗺️ Aventura",
    plataforma: "PC · PS5 · Xbox Series X",
    puntuacion: 9.1,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/1850050/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Alan Wake 2: el escritor en el oscuro Lugar Oscuro sobrenatural",
    descripcion:
      "Alan Wake regresa después de trece años atrapado en el Lugar Oscuro, mientras la agente " +
      "del FBI Saga Anderson investiga unos misteriosos rituales de culto. Un thriller psicológico " +
      "que fusiona cine noir y terror sobrenatural de forma magistral.",
    caracteristicas: [
      "Narrativa en dos hilos paralelos que se entrelazan",
      "Dirección artística cinematográfica sin precedentes en el género",
      "Mecanismo de 'Mind Place' para resolver el misterio narrativo",
      "Secuencias musicales en vivo integradas en la historia",
      "Universo compartido con Control de Remedy",
    ],
    duracion: "15-20h",
    metacritic: 89,
    premios: [
      "BAFTA 2024 – Mejor Dirección de Arte",
      "The Game Awards 2023 – Mejor Dirección",
    ],
    dificultad: "Media",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 22,
    titulo: "Control",
    estudio: "Remedy Entertainment",
    anio: 2019,
    genero: "accion",
    generoEtiqueta: "⚔️ Acción",
    plataforma: "PC · PS4 · Xbox One",
    puntuacion: 8.8,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/870780/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Control: Jesse Faden flotando con poderes telequinéticos en el Bureau",
    descripcion:
      "Jesse Faden llega al Edificio Federal de Control buscando a su hermano y se convierte en la " +
      "nueva Directora de una agencia secreta del gobierno que investiga fenómenos paranormales. " +
      "Un thriller sobrenatural con lore fascinante y combate teletinético espectacular.",
    caracteristicas: [
      "Construcción de lore a través de documentos y vídeos cassette",
      "Combate con poderes telequinéticos dinámico y satisfactorio",
      "Diseño brutalista del Edificio Federal único en los videojuegos",
      "Narrativa que mezcla lo cotidiano con lo absolutamente extraño",
      "DLC que conecta con el universo de Alan Wake",
    ],
    duracion: "12-18h",
    metacritic: 85,
    premios: [
      "BAFTA 2020 – Mejor Diseño de Juego",
      "The Game Awards 2019 – Mejor Dirección de Arte",
    ],
    dificultad: "Difícil",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 23,
    titulo: "A Plague Tale: Innocence",
    estudio: "Asobo Studio",
    anio: 2019,
    genero: "aventura",
    generoEtiqueta: "🗺️ Aventura",
    plataforma: "PC · PS4 · Xbox One",
    puntuacion: 8.7,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/752590/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de A Plague Tale Innocence: Amicia y Hugo huyendo de las ratas en Francia",
    descripcion:
      "En la Francia medieval de 1349, la joven noble Amicia de Rune debe proteger a su pequeño " +
      "hermano Hugo mientras huyen de la Inquisición y de una plaga de ratas demoníacas. Una historia " +
      "de hermanos y supervivencia que sorprende por su calidad narrativa y emocional.",
    caracteristicas: [
      "Vínculo entre hermanos que crece de forma orgánica y emotiva",
      "Ambientación histórica de la Francia medieval con gran detalle",
      "Mecánicas de sigilo y puzles creativos con la luz y la oscuridad",
      "Producción audiovisual de calidad triple A con presupuesto reducido",
      "Historia que desemboca en un clímax épico e inesperado",
    ],
    duracion: "12-15h",
    metacritic: 81,
    premios: [
      "BAFTA 2020 – Mejor Juego Británico nominado",
      "Premio Revelación del Año 2019 – múltiples medios",
    ],
    dificultad: "Media",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 24,
    titulo: "A Plague Tale: Requiem",
    estudio: "Asobo Studio",
    anio: 2022,
    genero: "aventura",
    generoEtiqueta: "🗺️ Aventura",
    plataforma: "PC · PS5 · Xbox Series X",
    puntuacion: 8.9,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/1182900/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de A Plague Tale Requiem: Amicia en el sur de Francia medieval",
    descripcion:
      "Amicia y Hugo continúan su huida por el sur de Francia buscando una cura para la maldición " +
      "que devora al pequeño. Una secuela que supera al original en escala, belleza visual y " +
      "profundidad emocional, con un desenlace devastador.",
    caracteristicas: [
      "Uno de los juegos más bellos visualmente de la generación PS5/Xbox Series",
      "Historia más ambiciosa y oscura que la del primer juego",
      "Evolución significativa del combate y las mecánicas de sigilo",
      "Banda sonora de Olivier Derivière tremendamente emotiva",
      "Final que parte el corazón de forma inesperada",
    ],
    duracion: "15-18h",
    metacritic: 87,
    premios: [
      "The Game Awards 2022 – Mejor Narrativa nominado",
      "Premio al Mejor Diseño Visual 2022 – varios medios",
    ],
    dificultad: "Media",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 25,
    titulo: "Outer Wilds",
    estudio: "Mobius Digital",
    anio: 2019,
    genero: "indie",
    generoEtiqueta: "🌱 Indie",
    plataforma: "PC · PS4 · Xbox One",
    puntuacion: 9.2,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/753640/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Outer Wilds: el explorador espacial ante el sistema solar en bucle temporal",
    descripcion:
      "Atrapado en un bucle temporal de 22 minutos que culmina en una supernova, un explorador " +
      "espacial debe descubrir el misterio de una civilización alienígena extinta antes de que el " +
      "sol explote de nuevo. Un juego de exploración y descubrimiento puro, sin combate, que " +
      "redefine lo que puede ser un videojuego.",
    caracteristicas: [
      "Exploración libre sin marcadores ni guías: el conocimiento ES el progreso",
      "Sistema solar simulado físicamente en tiempo real",
      "Misterio narrativo construido desde el descubrimiento puro",
      "Emoción genuina al resolver cada pieza del puzzle cósmico",
      "Final filosófico que recontextualiza toda la experiencia",
    ],
    duracion: "15-25h",
    metacritic: 85,
    premios: [
      "BAFTA 2020 – Mejor Juego",
      "The Game Awards 2019 – Mejor Juego Independiente",
    ],
    dificultad: "Media",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 26,
    titulo: "What Remains of Edith Finch",
    estudio: "Giant Sparrow",
    anio: 2017,
    genero: "drama",
    generoEtiqueta: "🎭 Drama",
    plataforma: "PC · PS4 · Xbox One",
    puntuacion: 8.9,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/501300/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de What Remains of Edith Finch: la mansión familiar Finch entre los árboles",
    descripcion:
      "Edith Finch regresa a la mansión familiar para descubrir las historias de sus antepasados, " +
      "todos muertos en circunstancias extrañas. Cada historia se cuenta de una forma completamente " +
      "diferente, convirtiendo este juego de dos horas en una de las experiencias narrativas más " +
      "impactantes de la última década.",
    caracteristicas: [
      "Cada historia usa un lenguaje visual y mecánico completamente distinto",
      "Narrativa sobre la mortalidad, la memoria y la familia",
      "Duración corta pero con impacto emocional desproporcionado",
      "Premio BAFTA al Mejor Juego de 2017",
      "Considerado un referente del walking simulator narrativo",
    ],
    duracion: "2-3h",
    metacritic: 88,
    premios: [
      "BAFTA 2018 – Mejor Juego",
      "The Game Awards 2017 – Mejor Narrativa",
    ],
    dificultad: "Fácil",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 27,
    titulo: "Firewatch",
    estudio: "Campo Santo",
    anio: 2016,
    genero: "drama",
    generoEtiqueta: "🎭 Drama",
    plataforma: "PC · PS4 · Xbox One",
    puntuacion: 8.5,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/383870/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Firewatch: la torre de vigilancia al atardecer en los bosques de Wyoming",
    descripcion:
      "Henry acepta un trabajo como vigilante de incendios en el bosque de Shoshone y establece " +
      "una relación única por walkie-talkie con su supervisora Delinda mientras investigan sucesos " +
      "misteriosos. Un juego sobre la soledad, la culpa y las consecuencias de huir de los problemas.",
    caracteristicas: [
      "Relación entre personajes construida exclusivamente a través del diálogo por radio",
      "Ambientación en los bosques de Wyoming absolutamente atmosférica",
      "Música de Chris Remo que captura perfectamente la melancolía del lugar",
      "Historia íntima y adulta poco habitual en los videojuegos",
      "Dirección artística con paleta de colores cálida y reconocible",
    ],
    duracion: "4-6h",
    metacritic: 76,
    premios: [
      "BAFTA 2017 – Mejor Debut de un Estudio",
      "GDC 2016 – Premio Narrative Design",
    ],
    dificultad: "Fácil",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 28,
    titulo: "Life is Strange",
    estudio: "Dontnod Entertainment",
    anio: 2015,
    genero: "drama",
    generoEtiqueta: "🎭 Drama",
    plataforma: "PC · PS4 · Xbox One",
    puntuacion: 8.8,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/319630/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Life is Strange: Max Caulfield en Arcadia Bay con sus poderes temporales",
    descripcion:
      "Max Caulfield descubre que puede rebobinar el tiempo y usa este poder para investigar la " +
      "desaparición de una compañera junto a su mejor amiga Chloe. Un drama adolescente episódico " +
      "sobre la amistad, las elecciones y las consecuencias que se agigantó culturalmente más allá " +
      "de los videojuegos.",
    caracteristicas: [
      "Sistema de decisiones que se ramifica con consecuencias en todos los episodios",
      "Representación honesta de temas como el bullying y la salud mental",
      "Banda sonora indie que define completamente la atmósfera",
      "Relación entre Max y Chloe que impactó culturalmente a millones",
      "Final que todavía divide a la comunidad con su dilema moral",
    ],
    duracion: "10-12h",
    metacritic: 85,
    premios: [
      "BAFTA 2016 – Mejor Historia",
      "The Game Awards 2015 – Mejor Juego Independiente nominado",
    ],
    dificultad: "Fácil",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 29,
    titulo: "Metal Gear Solid V: The Phantom Pain",
    estudio: "Kojima Productions / Konami",
    anio: 2015,
    genero: "accion",
    generoEtiqueta: "⚔️ Acción",
    plataforma: "PC · PS4 · Xbox One",
    puntuacion: 9.0,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/287700/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Metal Gear Solid V The Phantom Pain: Big Boss con parche en el ojo",
    descripcion:
      "Big Boss despierta de un coma de nueve años y reconstruye su ejército privado mientras " +
      "investiga la destrucción de su base anterior. La obra maestra técnica de Kojima que " +
      "deconstruye los tropos del espionaje militar con una narrativa que desafía las expectativas " +
      "del jugador.",
    caracteristicas: [
      "Sistema de infiltración sandbox más completo de la saga Metal Gear",
      "Estructura narrativa que subvierte las expectativas del jugador en el capítulo 2",
      "Sistema de gestión de base de operaciones profundo y adictivo",
      "Banda sonora de los años 80 perfectamente integrada en el tono",
      "Reflexión sobre los ciclos de odio y venganza en el contexto bélico",
    ],
    duracion: "45-80h",
    metacritic: 95,
    premios: [
      "The Game Awards 2015 – Mejor Diseño de Juego",
      "BAFTA 2016 – Mejor Diseño de Juego nominado",
    ],
    dificultad: "Media",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 30,
    titulo: "Death Stranding",
    estudio: "Kojima Productions",
    anio: 2020,
    genero: "aventura",
    generoEtiqueta: "🗺️ Aventura",
    plataforma: "PC · PS4 · PS5",
    puntuacion: 8.6,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/1190460/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Death Stranding: Sam Porter Bridges cargando paquetes en paisaje desolado",
    descripcion:
      "Sam Porter Bridges atraviesa una América devastada por un evento sobrenatural que ha conectado " +
      "el mundo de los vivos con el de los muertos, transportando paquetes para reconectar a la " +
      "humanidad. Un juego sobre los lazos humanos, la conexión y la cooperación disfrazado de " +
      "simulador de mensajería postapocalíptico.",
    caracteristicas: [
      "Mecánica de entrega de paquetes convertida en metáfora sobre los lazos humanos",
      "Multijugador asíncrono donde cooperas sin ver a otros jugadores directamente",
      "Banda sonora de CHVRCHES, Low Roar y Silent Poets perfectamente integrada",
      "Narrativa sobre la maternidad, la paternidad y la resurrección",
      "Definición de un nuevo género: el Strand Game",
    ],
    duracion: "40-55h",
    metacritic: 82,
    premios: [
      "BAFTA 2020 – Mejor Música",
      "The Game Awards 2019 – Mejor Dirección",
    ],
    dificultad: "Media",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 31,
    titulo: "Ghost of Tsushima Director's Cut",
    estudio: "Sucker Punch Productions",
    anio: 2024,
    genero: "accion",
    generoEtiqueta: "⚔️ Acción",
    plataforma: "PC · PS4 · PS5",
    puntuacion: 9.0,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/2215430/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Ghost of Tsushima: Jin Sakai con armadura samurái en los campos de Tsushima",
    descripcion:
      "En 1274, el samurái Jin Sakai debe defender la isla de Tsushima de la invasión mongola " +
      "adoptando tácticas de guerrilla deshonrosas para los samuráis. Una odisea samurái de belleza " +
      "pictórica sobre el conflicto entre el honor y la supervivencia.",
    caracteristicas: [
      "Modo Kurosawa en blanco y negro que homenajea el cine japonés clásico",
      "Mundo abierto de belleza pictórica con el viento como guía de dirección",
      "Historia sobre el conflicto entre el honor samurái y la eficacia guerrillera",
      "Sistema de combate con posturas que se adaptan a cada tipo de enemigo",
      "Expansión Iki Island con profundidad narrativa independiente",
    ],
    duracion: "25-40h",
    metacritic: 83,
    premios: [
      "Premio al Mejor Mundo Abierto 2021 – múltiples medios",
      "BAFTA 2021 – Mejor Diseño de Juego nominado",
    ],
    dificultad: "Media",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 32,
    titulo: "Elden Ring",
    estudio: "FromSoftware / George R.R. Martin",
    anio: 2022,
    genero: "rpg",
    generoEtiqueta: "🧙 RPG",
    plataforma: "PC · PS4 · PS5 · Xbox",
    puntuacion: 9.5,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/1245620/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Elden Ring: el protagonista ante el árbol Erdtree dorado en las Tierras Intermedias",
    descripcion:
      "En las Tierras Intermedias, un Sin Gracia debe recuperar los fragmentos del Anillo Áureo y " +
      "convertirse en el Señor de Elden. Un mundo abierto de fantasía oscura co-creado con George " +
      "R.R. Martin que redefine el género con una libertad y una escala sin precedentes.",
    caracteristicas: [
      "Mundo abierto más ambicioso de FromSoftware con exploración completamente libre",
      "Lore profundo y oscuro co-escrito por George R.R. Martin",
      "Más de 100 jefes opcionales con diseños únicos e icónicos",
      "Sistema de combate que perfecciona la fórmula Soulsborne",
      "Comunidad global de descubrimiento colaborativo sin precedentes",
    ],
    duracion: "60-130h",
    metacritic: 96,
    premios: [
      "GOTY 2022 – The Game Awards",
      "GOTY 2022 – BAFTA",
      "GOTY 2022 – múltiples medios internacionales",
    ],
    dificultad: "Muy difícil",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 33,
    titulo: "Dark Souls III",
    estudio: "FromSoftware",
    anio: 2016,
    genero: "rpg",
    generoEtiqueta: "🧙 RPG",
    plataforma: "PC · PS4 · Xbox One",
    puntuacion: 9.0,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/374320/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Dark Souls III: el Portador de Cenizas ante las llamas de Lothric",
    descripcion:
      "En el reino de Lothric, donde la Llama se extingue y los no-muertos vuelven a despertar, " +
      "un Portador de Cenizas debe recolectar las almas de los Señores de Cenizas. El capítulo " +
      "final de la trilogía de Dark Souls entrega el combate más pulido y los jefes más memorables " +
      "de la serie.",
    caracteristicas: [
      "Ritmo de combate acelerado que supera a sus predecesores",
      "Jefes icónicos como los Caballeros de Farron y el Príncipe Gemelo",
      "Lore que cierra los hilos narrativos de toda la saga Dark Souls",
      "Diseño de niveles interconectado que recompensa la exploración",
      "Dos expansiones DLC que amplían el mundo y la narrativa",
    ],
    duracion: "35-60h",
    metacritic: 89,
    premios: [
      "The Game Awards 2016 – Mejor RPG",
      "Famitsu 2016 – Puntuación Perfecta",
    ],
    dificultad: "Muy difícil",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 34,
    titulo: "Fallout: New Vegas",
    estudio: "Obsidian Entertainment",
    anio: 2010,
    genero: "rpg",
    generoEtiqueta: "🧙 RPG",
    plataforma: "PC · PS3 · Xbox 360",
    puntuacion: 9.1,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/22380/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Fallout New Vegas: el Mojave postapocalíptico con las luces de Vegas al fondo",
    descripcion:
      "Un mensajero dado por muerto despierta en el desierto del Mojave postapocalíptico y debe " +
      "descubrir quién lo disparó mientras las facciones del Yermo se disputan el control de la " +
      "Presa Hoover. Considerado el mejor Fallout por su escritura, sus personajes y la libertad " +
      "real que ofrece al jugador.",
    caracteristicas: [
      "Sistema de facciones con reputación que afecta radicalmente la experiencia",
      "Escritura y diálogos de una calidad literaria excepcional para un videojuego",
      "Cuatro finales principales con decenas de variantes según tus acciones",
      "Compañeros con arcos narrativos propios y profundidad de personaje real",
      "Crítica política sobre el imperialismo disfrazada de aventura postapocalíptica",
    ],
    duracion: "30-60h",
    metacritic: 84,
    premios: [
      "Premio al Mejor RPG 2010 – múltiples publicaciones",
      "Considerado el mejor RPG occidental de su generación por la crítica especializada",
    ],
    dificultad: "Media",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 35,
    titulo: "Hellblade: Senua's Sacrifice",
    estudio: "Ninja Theory",
    anio: 2017,
    genero: "drama",
    generoEtiqueta: "🎭 Drama",
    plataforma: "PC · PS4 · Xbox One",
    puntuacion: 9.0,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/414340/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Hellblade Senua's Sacrifice: Senua con su espada ante el cielo nórdico",
    descripcion:
      "Senua, una guerrera celta con psicosis, viaja al inframundo nórdico para rescatar el alma " +
      "de su amado. Una experiencia sin precedentes sobre la enfermedad mental que utilizó audio " +
      "binaural y asesoramiento psicológico real para recrear la experiencia de vivir con psicosis.",
    caracteristicas: [
      "Audio binaural que simula las voces de la psicosis con precisión clínica",
      "Desarrollado en colaboración con neurólogos y personas con psicosis real",
      "Combate simple que sirve a la narrativa sin distraer de la experiencia",
      "Mitología nórdica usada como metáfora de la enfermedad mental",
      "Una de las representaciones más empáticas de la salud mental en el arte",
    ],
    duracion: "6-8h",
    metacritic: 84,
    premios: [
      "BAFTA 2018 – Mejor Juego de Historia",
      "The Game Awards 2017 – Mejor Juego Independiente nominado",
    ],
    dificultad: "Media",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 36,
    titulo: "Ori and the Blind Forest",
    estudio: "Moon Studios",
    anio: 2015,
    genero: "indie",
    generoEtiqueta: "🌱 Indie",
    plataforma: "PC · Xbox One",
    puntuacion: 9.0,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/261570/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Ori and the Blind Forest: Ori iluminando el Bosque de Nibel con su luz",
    descripcion:
      "Ori, un guardián espiritual del bosque, debe restaurar los elementos vitales del Bosque de " +
      "Nibel para salvar a su árbol hogar. Un plataformas de precisión con una narrativa visual " +
      "emotiva, una dirección de arte exquisita y una banda sonora orquestal que te parte el corazón.",
    caracteristicas: [
      "Dirección de arte acuarelada de una belleza sin igual en los plataformas",
      "Banda sonora orquestal de Gareth Coker que acompaña perfectamente cada emoción",
      "Apertura narrativa visual sin texto que emociona de forma universal",
      "Sistema de plataformas de precisión exigente y enormemente satisfactorio",
      "Secuencia del escape del árbol en Ginso: una de las más adrenalíticas del género",
    ],
    duracion: "8-12h",
    metacritic: 88,
    premios: [
      "BAFTA 2016 – Mejor Diseño Visual",
      "The Game Awards 2015 – Mejor Juego Independiente",
    ],
    dificultad: "Difícil",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 37,
    titulo: "Inside",
    estudio: "Playdead",
    anio: 2016,
    genero: "indie",
    generoEtiqueta: "🌱 Indie",
    plataforma: "PC · PS4 · Xbox One",
    puntuacion: 9.1,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/304430/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Inside: el niño anónimo corriendo en un mundo distópico oscuro y silencioso",
    descripcion:
      "Un niño anónimo huye a través de un mundo distópico oscuro y silencioso hacia un destino " +
      "inquietante. Un juego sin una sola palabra de diálogo ni texto que narra con pura imagen y " +
      "atmósfera una historia perturbadora sobre el control, la humanidad y la identidad.",
    caracteristicas: [
      "Narrativa completamente visual sin texto ni diálogos de ningún tipo",
      "Atmósfera perturbadora y opresiva sostenida de principio a fin",
      "Puzles ingeniosos que integran la narrativa en cada solución",
      "Final secreto que recontextualiza completamente el significado de la historia",
      "Uno de los juegos más densos narrativamente en menos tiempo de la historia",
    ],
    duracion: "3-4h",
    metacritic: 93,
    premios: [
      "BAFTA 2017 – Mejor Juego",
      "The Game Awards 2016 – Mejor Juego Independiente",
    ],
    dificultad: "Media",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 38,
    titulo: "Gris",
    estudio: "Nomada Studio",
    anio: 2018,
    genero: "indie",
    generoEtiqueta: "🌱 Indie",
    plataforma: "PC · PS4 · Nintendo Switch",
    puntuacion: 8.8,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/683320/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Gris: la joven protagonista en su mundo de acuarelas desvanecidas y grises",
    descripcion:
      "Una joven atraviesa un mundo desvanecido mientras supera el duelo, recuperando gradualmente " +
      "el color del mundo a medida que sana emocionalmente. Una experiencia artística casi sin " +
      "mecánicas de juego que usa el color y la música como lenguaje narrativo sobre la pérdida " +
      "y la recuperación.",
    caracteristicas: [
      "Dirección de arte basada en acuarelas de una belleza excepcional",
      "Narrativa completamente visual sobre el duelo y la recuperación emocional",
      "Cada nuevo color que aparece simboliza una fase del proceso de duelo",
      "Banda sonora de Berlinist perfectamente sincronizada con las emociones",
      "Experiencia accessible diseñada para todos los niveles sin puntos de fallo",
    ],
    duracion: "3-4h",
    metacritic: 82,
    premios: [
      "BAFTA 2020 – Mejor Diseño Visual nominado",
      "Premio al Mejor Debut de Estudio 2018 – múltiples medios",
    ],
    dificultad: "Fácil",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 39,
    titulo: "Journey",
    estudio: "thatgamecompany",
    anio: 2012,
    genero: "indie",
    generoEtiqueta: "🌱 Indie",
    plataforma: "PC · PS3 · PS4",
    puntuacion: 8.8,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/638230/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Journey: la figura encapuchada ante la montaña luminosa en el desierto dorado",
    descripcion:
      "Una figura encapuchada recorre un desierto de arenas doradas hacia una montaña luminosa, " +
      "pudiendo encontrarse con extraños sin nombre a lo largo del camino. Uno de los argumentos " +
      "más fuertes para el videojuego como arte puro: sin palabras, transmite alegría, miedo y " +
      "solidaridad de forma universal.",
    caracteristicas: [
      "Multijugador con extraños anónimos sin texto, voz ni identificación posible",
      "Narrativa de la vida contada a través de pura metáfora visual",
      "Banda sonora de Austin Wintory nominada a los Grammy Awards",
      "Experiencia diseñada para emocionar a cualquier persona sin importar su cultura",
      "Final que permanece con el jugador durante días o semanas",
    ],
    duracion: "2-3h",
    metacritic: 92,
    premios: [
      "BAFTA 2013 – Mejor Juego",
      "Grammy Awards – Banda Sonora nominada (primero en la historia)",
    ],
    dificultad: "Fácil",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 40,
    titulo: "Kingdom Come: Deliverance",
    estudio: "Warhorse Studios",
    anio: 2018,
    genero: "rpg",
    generoEtiqueta: "🧙 RPG",
    plataforma: "PC · PS4 · Xbox One",
    puntuacion: 8.8,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/379430/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Kingdom Come Deliverance: Henry el herrero en la Bohemia medieval de 1403",
    descripcion:
      "Henry, hijo de un herrero, busca venganza tras el asesinato de su familia en la Bohemia " +
      "medieval de 1403. Un RPG sin magia ni dragones que apuesta por el realismo histórico " +
      "absoluto: nada de salvado automático, combate basado en esgrima real y consecuencias " +
      "para cada acción.",
    caracteristicas: [
      "Fidelidad histórica a la Bohemia de 1403 sin fantasía ni elementos irreales",
      "Sistema de combate basado en esgrima histórica real único en su género",
      "Narrativa de un personaje sin habilidades especiales que crece de forma orgánica",
      "Sin salvado automático: cada decisión tiene peso real y permanente",
      "Mundo vivo donde los NPCs tienen rutinas, opiniones y consecuencias",
    ],
    duracion: "40-70h",
    metacritic: 76,
    premios: [
      "Premio a la Mejor Campaña de Kickstarter en Videojuegos 2014",
      "Premio al RPG Más Ambicioso del Año 2018 – múltiples medios",
    ],
    dificultad: "Difícil",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 41,
    titulo: "Dragon Age: Origins",
    estudio: "BioWare",
    anio: 2009,
    genero: "rpg",
    generoEtiqueta: "🧙 RPG",
    plataforma: "PC · PS3 · Xbox 360",
    puntuacion: 9.1,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/47810/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Dragon Age Origins: el Guardián Gris ante la oscuridad de la plaga",
    descripcion:
      "Un Guardián Gris de origen personalizable debe unir las facciones de Ferelden para detener " +
      "la oscura plaga de los espectros. El último gran RPG clásico de BioWare, con decisiones " +
      "morales complejas, compañeros memorables y un sistema de combate táctico pausable que " +
      "recuerda a los CRPGs de los 90.",
    caracteristicas: [
      "Seis orígenes distintos de personaje que cambian el inicio y las relaciones",
      "Sistema de aprobación de compañeros que afecta a las relaciones y el final",
      "Combate táctico pausable que heredero de los grandes RPG clásicos",
      "Escritura de compañeros con motivaciones claras y arcos narrativos propios",
      "Considerado el legado espiritual de Baldur's Gate para una nueva generación",
    ],
    duracion: "40-80h",
    metacritic: 91,
    premios: [
      "BAFTA 2010 – Mejor Juego de Rol",
      "The Game Awards – Mejor RPG del Año 2009",
    ],
    dificultad: "Difícil",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 42,
    titulo: "Divinity: Original Sin 2",
    estudio: "Larian Studios",
    anio: 2017,
    genero: "rpg",
    generoEtiqueta: "🧙 RPG",
    plataforma: "PC · PS4 · Xbox One",
    puntuacion: 9.4,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/435150/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Divinity Original Sin 2: los Fuente-Divinidad listos para la aventura",
    descripcion:
      "Varios Fuente-Divinidad encarcelados deben escapar y competir para ascender a la divinidad " +
      "en un mundo de fantasía donde la magia está prohibida. El mejor CRPG de la última década " +
      "según muchos críticos, con un sistema de combate por turnos profundísimo y libertad " +
      "narrativa casi ilimitada.",
    caracteristicas: [
      "Sistema de combate por turnos con física, elementos y superficies reactivas",
      "Modo cooperativo para hasta 4 jugadores con narrativa completamente funcional",
      "Libertad de solución de problemas raramente vista en el género",
      "Escritura que trata las relaciones entre personajes con profundidad real",
      "El predecesor directo de Baldur's Gate 3 en filosofía de diseño",
    ],
    duracion: "60-100h",
    metacritic: 93,
    premios: [
      "The Game Awards 2017 – Mejor RPG",
      "Metacritic – uno de los 10 mejores juegos de 2017",
    ],
    dificultad: "Difícil",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 43,
    titulo: "Deus Ex: Human Revolution",
    estudio: "Eidos Montréal",
    anio: 2011,
    genero: "accion",
    generoEtiqueta: "⚔️ Acción",
    plataforma: "PC · PS3 · Xbox 360",
    puntuacion: 8.8,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/238010/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Deus Ex Human Revolution: Adam Jensen con sus mejoras cibernéticas doradas",
    descripcion:
      "Adam Jensen, jefe de seguridad convertido en cíborg por una conspiración, investiga el " +
      "ataque a su empresa en un 2027 donde la humanidad debate los límites de la mejora corporal. " +
      "Un RPG de acción que reflexiona con profundidad sobre el transhumanismo, la identidad y " +
      "el libre albedrío.",
    caracteristicas: [
      "Sistema de mejoras cibernéticas que definen completamente el estilo de juego",
      "Reflexión filosófica profunda sobre el transhumanismo y los límites del cuerpo humano",
      "Múltiples enfoques para cada misión: combate, sigilo, hackeo o diálogo",
      "Ambientación cyberpunk noir visualmente densa y coherente",
      "Uno de los mejores argumentos del pensamiento crítico en los videojuegos",
    ],
    duracion: "20-30h",
    metacritic: 89,
    premios: [
      "BAFTA 2012 – Mejor Diseño de Juego nominado",
      "The Game Awards 2011 – Mejor RPG de Acción",
    ],
    dificultad: "Media",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 44,
    titulo: "Prey (2017)",
    estudio: "Arkane Studios",
    anio: 2017,
    genero: "accion",
    generoEtiqueta: "⚔️ Acción",
    plataforma: "PC · PS4 · Xbox One",
    puntuacion: 8.8,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/480490/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Prey 2017: Morgan Yu en la estación espacial Talos I ante los Tifón",
    descripcion:
      "Morgan Yu despierta en la estación espacial Talos I, infestada por los Tifón, unos " +
      "alienígenas que pueden imitar cualquier objeto. Un immersive sim con una narrativa que " +
      "cuestiona la identidad, la memoria y lo que nos hace humanos, con libertad de resolución " +
      "absoluta.",
    caracteristicas: [
      "Immersive sim con libertad de resolución de problemas casi ilimitada",
      "Narrativa sobre la identidad y la memoria que sorprende con sus giros",
      "Estación espacial diseñada como entidad coherente que el jugador aprende a conocer",
      "Sistema de poderes alienígenas que complementa las habilidades humanas",
      "Final que recontextualiza completamente todo lo vivido durante el juego",
    ],
    duracion: "20-30h",
    metacritic: 82,
    premios: [
      "The Game Awards 2017 – Mejor Diseño de Juego nominado",
      "IGN Best of 2017 – Mejor Juego de Ciencia Ficción",
    ],
    dificultad: "Difícil",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 45,
    titulo: "Oxenfree",
    estudio: "Night School Studio",
    anio: 2016,
    genero: "indie",
    generoEtiqueta: "🌱 Indie",
    plataforma: "PC · PS4 · Xbox One",
    puntuacion: 8.5,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/388880/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Oxenfree: Alex y sus amigos en la isla sobrenatural con la radio paranormal",
    descripcion:
      "Alex y sus amigos visitan una isla abandonada para una fiesta y accidentalmente abren un " +
      "portal sobrenatural. Un thriller sobrenatural adolescente con un sistema de diálogo fluido " +
      "y continuo que permite hablar con los personajes sin interrumpir el movimiento.",
    caracteristicas: [
      "Sistema de diálogo en tiempo real que permite interrumpir y solapar conversaciones",
      "Atmósfera sobrenatural de radio paranormal tensa y perturbadora",
      "Relaciones entre adolescentes escritas con naturalidad y autenticidad",
      "Múltiples finales según las decisiones tomadas con los personajes",
      "Nueva partida+ que añade una capa narrativa completamente nueva",
    ],
    duracion: "5-6h",
    metacritic: 79,
    premios: [
      "BAFTA 2017 – Mejor Historia nominado",
      "Sundance 2016 – Premio a la Innovación",
    ],
    dificultad: "Fácil",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 46,
    titulo: "The Forgotten City",
    estudio: "Modern Storyteller",
    anio: 2021,
    genero: "indie",
    generoEtiqueta: "🌱 Indie",
    plataforma: "PC · PS4 · Xbox One",
    puntuacion: 8.9,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/874260/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de The Forgotten City: la ciudad romana bajo la Ley de Oro en el siglo I",
    descripcion:
      "Transportado a una ciudad romana del siglo I bajo la Ley de Oro —si uno peca, todos mueren—, " +
      "el protagonista debe usar bucles temporales para resolver el misterio que mantiene a sus " +
      "ciudadanos atrapados. Una mod de Skyrim convertida en juego completo ganador del premio BAFTA.",
    caracteristicas: [
      "Comienza como una mod de Skyrim y evoluciona en una joya narrativa independiente",
      "Mecánica de bucle temporal que permite explorar consecuencias sin permanencia",
      "Sistema de diálogo que permite múltiples enfoques filosóficos y morales",
      "Ambientación romana de una autenticidad histórica sorprendente",
      "Premio BAFTA ganado por lo que comenzó como contenido gratuito",
    ],
    duracion: "6-10h",
    metacritic: 85,
    premios: ["BAFTA 2022 – Mejor Debut", "GDC 2022 – Premio a la Narrativa"],
    dificultad: "Fácil",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 47,
    titulo: "Pentiment",
    estudio: "Obsidian Entertainment",
    anio: 2022,
    genero: "indie",
    generoEtiqueta: "🌱 Indie",
    plataforma: "PC · Xbox One · Xbox Series X",
    puntuacion: 8.9,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/1929440/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Pentiment: Andreas Maler en el monasterio bávaro del siglo XVI iluminado",
    descripcion:
      "Andreas Maler, iluminador de manuscritos en la Baviera del siglo XVI, se ve atrapado en una " +
      "serie de asesinatos que amenazan a su comunidad monástica. Un juego de misterio histórico " +
      "con una dirección artística imitando los manuscritos medievales iluminados y una escritura " +
      "excepcionalmente documentada.",
    caracteristicas: [
      "Dirección artística que imita los manuscritos medievales iluminados a mano",
      "Investigación histórica rigurosa que informa cada aspecto del diseño",
      "Consecuencias permanentes en los personajes a lo largo de 25 años de historia",
      "Reflexión sobre la historia, la memoria y quién narra los hechos del pasado",
      "Uno de los juegos más únicos visualmente en la historia del medio",
    ],
    duracion: "12-15h",
    metacritic: 91,
    premios: [
      "The Game Awards 2022 – Mejor Juego Independiente nominado",
      "BAFTA 2023 – Mejor Debut nominado",
    ],
    dificultad: "Fácil",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 48,
    titulo: "Ghostwire: Tokyo",
    estudio: "Tango Gameworks",
    anio: 2022,
    genero: "aventura",
    generoEtiqueta: "🗺️ Aventura",
    plataforma: "PC · PS5",
    puntuacion: 8.2,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/1475810/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Ghostwire Tokyo: Akito usando magia elemental en un Tokio vacío y fantasmal",
    descripcion:
      "Akito, un joven superviviente, y KK, un cazafantasmas que habita en su cuerpo, deben " +
      "enfrentarse a los espíritus que han vaciado Tokio de sus habitantes. Una aventura sobrenatural " +
      "en un Tokio vacío y espectacular que mezcla el folclore japonés con la modernidad urbana.",
    caracteristicas: [
      "Tokio recreado con fidelidad asombrosa en su arquitectura y cultura",
      "Folclore japonés (yokai, tengu, kappa) integrado en el mundo del juego",
      "Sistema de combate con magia de elementos basada en gestos de mano",
      "Toneladas de referencias a la cultura pop japonesa contemporánea",
      "Historia sobre el duelo, la muerte y el aprendizaje de soltar",
    ],
    duracion: "15-20h",
    metacritic: 76,
    premios: [
      "Premio al Mejor Diseño de Mundo 2022 – varios medios",
      "Mejor Representación del Folclore Japonés – Polygon 2022",
    ],
    dificultad: "Media",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 49,
    titulo: "Assassin's Creed Origins",
    estudio: "Ubisoft Montreal",
    anio: 2017,
    genero: "aventura",
    generoEtiqueta: "🗺️ Aventura",
    plataforma: "PC · PS4 · Xbox One",
    puntuacion: 8.5,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/582160/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Assassin's Creed Origins: Bayek de Siwa en el Antiguo Egipto ptolemaico",
    descripcion:
      "Bayek de Siwa busca venganza en el Antiguo Egipto ptolemaico y sin querer pone las bases de " +
      "la Hermandad de los Asesinos. Un reinicio de la saga que deslumbra con su recreación del " +
      "Egipto antiguo y un protagonista genuinamente emotivo.",
    caracteristicas: [
      "Recreación del Egipto ptolemaico del siglo I a.C. de una escala asombrosa",
      "Protagonista con motivaciones emocionales claras y profundas",
      "Tour Discovery Mode: recorrido educativo por el Egipto antiguo sin combate",
      "Historia de los orígenes de la Hermandad que recontextualiza toda la franquicia",
      "Sistema de combate renovado que alejó la saga del automatismo previo",
    ],
    duracion: "30-60h",
    metacritic: 83,
    premios: [
      "The Game Awards 2017 – Mejor Diseño de Mundo nominado",
      "BAFTA 2018 – Mejor Diseño de Juego nominado",
    ],
    dificultad: "Media",
    esUsuario: false,
    jugado: false,
  },
  {
    id: 50,
    titulo: "Returnal",
    estudio: "Housemarque",
    anio: 2023,
    genero: "accion",
    generoEtiqueta: "⚔️ Acción",
    plataforma: "PC · PS5",
    puntuacion: 8.7,
    imagen:
      "https://cdn.akamai.steamstatic.com/steam/apps/1649240/capsule_616x353.jpg",
    imagenAlt:
      "Portada oficial de Returnal: Selene Vassos en el planeta alienígena Atropos bajo la lluvia",
    descripcion:
      "Selene Vassos, astronauta de Astra Corp, queda atrapada en un bucle temporal en un planeta " +
      "alienígena hostil y debe descubrir el misterio de su presencia allí. Un roguelite de acción " +
      "con una narrativa ambiental y fragmentada sobre el trauma, el duelo y los ciclos de " +
      "autodestrucción.",
    caracteristicas: [
      "Bucle temporal como mecánica central que refuerza la narrativa del trauma",
      "Combate bullet hell en tercera persona exigente y enormemente satisfactorio",
      "Narrativa fragmentada que se revela gradualmente entre las muertes",
      "Diseño procedural que mantiene fresca cada nueva partida",
      "Historia sobre el duelo materno y los ciclos de autosabotaje tratada con seriedad",
    ],
    duracion: "20-40h",
    metacritic: 86,
    premios: [
      "BAFTA 2022 – Mejor Juego de Acción nominado",
      "The Game Awards 2021 – Mejor Juego de Acción nominado",
    ],
    dificultad: "Muy difícil",
    esUsuario: false,
    jugado: false,
  },
];

/* ──────────────────────────────────────────────
   2. ESTADO DE LA APLICACIÓN
   ────────────────────────────────────────────── */

/**
 * Estado reactivo de la aplicación.
 * Centraliza el filtro activo y el término de búsqueda.
 */
const estado = {
  filtroActivo: "todos",
  terminoBusqueda: "",
};

/* ──────────────────────────────────────────────
   3. REFERENCIAS AL DOM
   ────────────────────────────────────────────── */

/**
 * Selecciona y almacena todos los elementos del DOM necesarios.
 * Se agrupan aquí para evitar llamadas repetidas a querySelector.
 */
const elementos = {
  // Navegación
  encabezado: document.getElementById("encabezado"),
  menuHamburguesa: document.getElementById("menuHamburguesa"),
  navLista: document.getElementById("navLista"),
  navEnlaces: document.querySelectorAll(".nav-enlace"),

  // Catálogo
  juegosCuadricula: document.getElementById("juegosCuadricula"),
  contadorResultados: document.getElementById("contadorResultados"),
  sinResultados: document.getElementById("sinResultados"),
  btnLimpiarFiltros: document.getElementById("btnLimpiarFiltros"),
  filtrosBotones: document.querySelectorAll(".filtro-btn"),
  buscador: document.getElementById("buscador"),

  // Modal de detalle
  modalOverlay: document.getElementById("modalOverlay"),
  modalContenido: document.getElementById("modalContenido"),
  modalCerrar: document.getElementById("modalCerrar"),
  modalImagen: document.getElementById("modalImagen"),
  modalBadge: document.getElementById("modalBadge"),
  modalTitulo: document.getElementById("modalTitulo"),
  modalMeta: document.getElementById("modalMeta"),
  modalPuntuacion: document.getElementById("modalPuntuacion"),
  modalDescripcion: document.getElementById("modalDescripcion"),
  modalCaracteristicasLista: document.getElementById(
    "modalCaracteristicasLista",
  ),

  // Misceláneos
  btnVolverArriba: document.getElementById("btnVolverArriba"),
};

/* ──────────────────────────────────────────────
   4. UTILIDADES
   ────────────────────────────────────────────── */

/**
 * Genera estrellas visuales según una puntuación numérica.
 * @param {number} puntuacion - Valor entre 0 y 10.
 * @returns {string} - Cadena con emojis de estrella.
 */
const generarEstrellas = (puntuacion) => {
  const llenas = Math.floor(puntuacion / 2);
  const media = puntuacion % 2 >= 1 ? 1 : 0;
  const vacias = 5 - llenas - media;
  return "⭐".repeat(llenas) + (media ? "✨" : "") + "☆".repeat(vacias);
};

/**
 * Normaliza texto para comparación insensible a
 * mayúsculas, tildes y caracteres especiales.
 * @param {string} texto
 * @returns {string}
 */
const normalizarTexto = (texto) =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

/**
 * Convierte texto a formato válido para clases CSS:
 * minúsculas, sin tildes, con guiones en lugar de espacios.
 * @param {string} texto
 * @returns {string}
 */
const normalizarParaClase = (texto) =>
  normalizarTexto(texto).replace(/\s+/g, "-");

/**
 * Devuelve la etiqueta de género con emoji según el slug recibido.
 * Para géneros personalizados no reconocidos, genera una etiqueta genérica.
 * @param {string} genero - Slug del género.
 * @returns {string}
 */
const obtenerEtiquetaGenero = (genero) => {
  const etiquetas = {
    accion: "⚔️ Acción",
    rpg: "🧙 RPG",
    aventura: "🗺️ Aventura",
    drama: "🎭 Drama",
    indie: "🌱 Indie",
  };
  const slug = normalizarTexto(genero);
  if (etiquetas[slug]) return etiquetas[slug];
  // Capitalizar primera letra para géneros personalizados
  return "🎮 " + genero.charAt(0).toUpperCase() + genero.slice(1);
};

/**
 * Aplica el estilo de color del género al badge del modal.
 * @param {HTMLElement} elemento - El span del badge.
 * @param {string}      genero   - El slug del género.
 * @param {string}      etiqueta - El texto visible del badge.
 */
const aplicarEstiloGenero = (elemento, genero, etiqueta) => {
  const estilos = {
    accion: { bg: "rgba(239,68,68,0.85)", color: "#fff" },
    rpg: { bg: "rgba(124,58,237,0.85)", color: "#fff" },
    aventura: { bg: "rgba(16,185,129,0.85)", color: "#fff" },
    drama: { bg: "rgba(245,158,11,0.85)", color: "#000" },
    indie: { bg: "rgba(59,130,246,0.85)", color: "#fff" },
  };

  const estilo = estilos[genero] || {
    bg: "rgba(100,100,100,0.85)",
    color: "#fff",
  };
  elemento.textContent = etiqueta;
  elemento.style.background = estilo.bg;
  elemento.style.color = estilo.color;
};

/* ──────────────────────────────────────────────
   5. SISTEMA "MIS JUEGOS" (localStorage)
   ────────────────────────────────────────────── */

/** Clave usada para almacenar los juegos del usuario en localStorage. */
const CLAVE_STORAGE = "storygames_mis_juegos";

/**
 * Carga los juegos guardados por el usuario desde localStorage.
 * @returns {Array} - Array de juegos del usuario (vacío si no hay ninguno).
 */
const cargarJuegosUsuario = () => {
  try {
    const datos = localStorage.getItem(CLAVE_STORAGE);
    return datos ? JSON.parse(datos) : [];
  } catch (error) {
    console.error("Error al cargar los juegos del usuario:", error.message);
    return [];
  }
};

/**
 * Guarda el array de juegos del usuario en localStorage.
 * @param {Array} juegos - Array de juegos a persistir.
 */
const guardarJuegosUsuario = (juegos) => {
  try {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(juegos));
  } catch (error) {
    console.error("Error al guardar los juegos del usuario:", error.message);
  }
};

/**
 * Agrega un nuevo juego creado por el usuario al catálogo personal.
 * Determina la imagen según steamId, imagenUrl o usa un placeholder.
 * @param {Object} datosFormulario - Campos recogidos del formulario.
 */
const agregarJuegoUsuario = (datosFormulario) => {
  try {
    // Determinar la URL de la imagen de portada
    let urlImagen;
    if (datosFormulario.steamId && datosFormulario.steamId.trim()) {
      urlImagen = `https://cdn.akamai.steamstatic.com/steam/apps/${datosFormulario.steamId.trim()}/capsule_616x353.jpg`;
    } else if (datosFormulario.imagenUrl && datosFormulario.imagenUrl.trim()) {
      urlImagen = datosFormulario.imagenUrl.trim();
    } else {
      urlImagen =
        "https://via.placeholder.com/616x353/1a1a2e/a78bfa?text=Mi+Juego";
    }

    // Construir el objeto del nuevo juego con la estructura estándar
    const nuevoJuego = {
      id: "user_" + Date.now(),
      titulo: datosFormulario.titulo.trim(),
      estudio: datosFormulario.estudio.trim(),
      anio: parseInt(datosFormulario.anio, 10),
      genero: normalizarTexto(datosFormulario.genero),
      generoEtiqueta: obtenerEtiquetaGenero(datosFormulario.genero),
      plataforma: datosFormulario.plataforma
        ? datosFormulario.plataforma.trim()
        : "PC",
      puntuacion: parseFloat(datosFormulario.puntuacion),
      imagen: urlImagen,
      imagenAlt: `Portada de ${datosFormulario.titulo.trim()}`,
      descripcion: datosFormulario.descripcion.trim(),
      caracteristicas: datosFormulario.caracteristicas
        ? datosFormulario.caracteristicas
            .split("\n")
            .map((c) => c.trim())
            .filter((c) => c.length > 0)
        : [],
      duracion: datosFormulario.duracion
        ? datosFormulario.duracion.trim()
        : "—",
      metacritic: datosFormulario.metacritic
        ? parseInt(datosFormulario.metacritic, 10)
        : 0,
      premios: datosFormulario.premios
        ? datosFormulario.premios
            .split(",")
            .map((p) => p.trim())
            .filter((p) => p.length > 0)
        : [],
      dificultad: datosFormulario.dificultad || "Media",
      esUsuario: true,
      jugado: true,
    };

    // Guardar en localStorage y actualizar el catálogo visible
    const juegosGuardados = cargarJuegosUsuario();
    juegosGuardados.push(nuevoJuego);
    guardarJuegosUsuario(juegosGuardados);
    renderizarJuegos();

    console.info(
      `✅ Juego "${nuevoJuego.titulo}" añadido correctamente a Mi Lista.`,
    );
  } catch (error) {
    console.error("Error al agregar el juego del usuario:", error.message);
  }
};

/**
 * Elimina un juego del catálogo personal del usuario tras pedir confirmación.
 * @param {string} id - ID del juego a eliminar (formato "user_XXXX").
 */
const eliminarJuegoUsuario = (id) => {
  const confirmacion = confirm(
    "¿Estás seguro de que quieres eliminar este juego de tu lista?",
  );
  if (!confirmacion) return;

  try {
    const juegos = cargarJuegosUsuario();
    const juegosFiltrados = juegos.filter((j) => String(j.id) !== String(id));

    if (juegos.length === juegosFiltrados.length) {
      console.warn(`No se encontró ningún juego con id "${id}" para eliminar.`);
      return;
    }

    guardarJuegosUsuario(juegosFiltrados);
    renderizarJuegos();
    console.info(`✅ Juego con id "${id}" eliminado de Mi Lista.`);
  } catch (error) {
    console.error("Error al eliminar el juego del usuario:", error.message);
  }
};

/**
 * Devuelve el catálogo completo: juegos oficiales + juegos del usuario.
 * @returns {Array} - Array combinado de todos los juegos disponibles.
 */
const obtenerTodosLosJuegos = () => {
  return [...JUEGOS, ...cargarJuegosUsuario()];
};

/* ──────────────────────────────────────────────
   6. RENDERIZADO DE TARJETAS
   ────────────────────────────────────────────── */

/**
 * Crea el elemento HTML de una tarjeta de juego individual.
 * Incluye badges de género, puntuación, duración, Metacritic,
 * dificultad y, para juegos del usuario, botón de eliminar.
 * @param {Object} juego - Objeto con los datos del juego.
 * @returns {HTMLElement} - Elemento article listo para el DOM.
 */
const crearTarjetaJuego = (juego) => {
  const article = document.createElement("article");
  article.className = "tarjeta-juego";
  article.setAttribute("role", "button");
  article.setAttribute("tabindex", "0");
  article.setAttribute("aria-label", `Ver detalles de ${juego.titulo}`);
  article.dataset.id = juego.id;

  // Badge especial para juegos añadidos por el usuario
  const badgeUsuario = juego.esUsuario
    ? `<span class="tarjeta-badge-usuario">⭐ Mi Lista</span>`
    : "";

  // Botón de eliminar (solo para juegos del usuario)
  const btnEliminar = juego.esUsuario
    ? `<button
        class="tarjeta-btn-eliminar"
        data-id="${juego.id}"
        aria-label="Eliminar ${juego.titulo} de mi lista"
        title="Eliminar de mi lista"
      >🗑️</button>`
    : "";

  // Clase CSS para la dificultad (sin tildes ni espacios)
  const claseDificultad = normalizarParaClase(juego.dificultad || "media");

  article.innerHTML = `
    <div class="tarjeta-imagen-contenedor">
      <img
        class="tarjeta-imagen"
        src="${juego.imagen}"
        alt="${juego.imagenAlt}"
        loading="lazy"
        width="600"
        height="338"
      >
      ${badgeUsuario}
      <span
        class="tarjeta-genero"
        data-genero="${juego.genero}"
        aria-hidden="true"
      >${juego.generoEtiqueta}</span>
      <span
        class="tarjeta-puntuacion"
        aria-label="Puntuación: ${juego.puntuacion} de 10"
      >⭐ ${juego.puntuacion}</span>
      <span class="tarjeta-duracion">⏱ ${juego.duracion || "—"}</span>
    </div>

    <div class="tarjeta-cuerpo">
      <p class="tarjeta-plataforma">${juego.plataforma}</p>
      <h3 class="tarjeta-titulo">${juego.titulo}</h3>
      <p class="tarjeta-estudio">${juego.estudio} · ${juego.anio}</p>
      <div class="tarjeta-meta-extra">
        <span
          class="tarjeta-metacritic"
          title="Puntuación Metacritic"
        >MC: ${juego.metacritic || "—"}</span>
        <span class="tarjeta-dificultad dificultad-${claseDificultad}">
          ${juego.dificultad || "—"}
        </span>
      </div>
      <p class="tarjeta-descripcion">${juego.descripcion}</p>

      <div class="tarjeta-pie">
        <span class="tarjeta-anio">📅 ${juego.anio}</span>
        <div class="tarjeta-pie-acciones">
          ${btnEliminar}
          <button
            class="tarjeta-btn-detalle"
            aria-label="Ver más detalles de ${juego.titulo}"
            data-id="${juego.id}"
          >Ver detalles →</button>
        </div>
      </div>
    </div>
  `;

  // Evento clic en la tarjeta: abre el modal salvo que se haga clic en eliminar
  article.addEventListener("click", (evento) => {
    if (evento.target.closest(".tarjeta-btn-eliminar")) return;
    abrirModal(juego.id);
  });

  // Soporte de teclado: Enter y Espacio abren el modal
  article.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter" || evento.key === " ") {
      evento.preventDefault();
      abrirModal(juego.id);
    }
  });

  return article;
};

/**
 * Filtra y renderiza las tarjetas en el catálogo
 * según el estado actual (filtro activo + término de búsqueda).
 * Usa el catálogo completo (oficial + usuario).
 */
const renderizarJuegos = () => {
  const terminoNormalizado = normalizarTexto(estado.terminoBusqueda.trim());
  const todosLosJuegos = obtenerTodosLosJuegos();

  // Filtrar juegos según el filtro activo y el término de búsqueda
  const juegosFiltrados = todosLosJuegos.filter((juego) => {
    // Filtro especial "misjuegos": solo muestra los juegos del usuario
    if (estado.filtroActivo === "misjuegos") {
      return juego.esUsuario === true;
    }

    const coincideGenero =
      estado.filtroActivo === "todos" || juego.genero === estado.filtroActivo;

    const coincideBusqueda =
      terminoNormalizado === "" ||
      normalizarTexto(juego.titulo).includes(terminoNormalizado) ||
      normalizarTexto(juego.estudio).includes(terminoNormalizado) ||
      normalizarTexto(juego.generoEtiqueta).includes(terminoNormalizado);

    return coincideGenero && coincideBusqueda;
  });

  // Limpiar la cuadrícula antes de renderizar
  elementos.juegosCuadricula.innerHTML = "";

  if (juegosFiltrados.length === 0) {
    // Mostrar mensaje de sin resultados
    elementos.juegosCuadricula.classList.add("oculto");
    elementos.sinResultados.classList.remove("oculto");
    elementos.contadorResultados.textContent = "No se encontraron juegos.";
    return;
  }

  // Ocultar el mensaje de sin resultados y mostrar la cuadrícula
  elementos.juegosCuadricula.classList.remove("oculto");
  elementos.sinResultados.classList.add("oculto");

  // Crear e insertar cada tarjeta usando un fragmento para mayor eficiencia
  const fragmento = document.createDocumentFragment();
  juegosFiltrados.forEach((juego) => {
    fragmento.appendChild(crearTarjetaJuego(juego));
  });
  elementos.juegosCuadricula.appendChild(fragmento);

  // Actualizar el contador de resultados
  const total = juegosFiltrados.length;
  elementos.contadorResultados.textContent = `Mostrando ${total} juego${
    total !== 1 ? "s" : ""
  }`;
};

/* ──────────────────────────────────────────────
   7. MODAL DE DETALLE
   ────────────────────────────────────────────── */

/**
 * Almacena el elemento que tenía el foco antes de abrir el modal,
 * para restaurarlo al cerrarlo (accesibilidad).
 * @type {HTMLElement|null}
 */
let elementoFocoAnterior = null;

/**
 * Abre el modal con la información completa del juego seleccionado.
 * Busca el juego en el catálogo completo (oficial + usuario).
 * Añade duración, dificultad, Metacritic y sección de premios.
 * @param {number|string} idJuego - ID del juego a mostrar.
 */
const abrirModal = (idJuego) => {
  try {
    // Buscar en el catálogo completo; los IDs pueden ser número o string
    const juego = obtenerTodosLosJuegos().find(
      (j) => String(j.id) === String(idJuego),
    );
    if (!juego) throw new Error(`No se encontró el juego con id ${idJuego}`);

    // Guardar el elemento con foco actual para restaurarlo al cerrar
    elementoFocoAnterior = document.activeElement;

    // Rellenar el contenido principal del modal
    elementos.modalImagen.src = juego.imagen;
    elementos.modalImagen.alt = juego.imagenAlt;
    elementos.modalTitulo.textContent = juego.titulo;
    elementos.modalDescripcion.textContent = juego.descripcion;

    // Badge de género con color
    aplicarEstiloGenero(
      elementos.modalBadge,
      juego.genero,
      juego.generoEtiqueta,
    );

    // Metadatos enriquecidos: estudio, año, plataforma, duración, dificultad y Metacritic
    elementos.modalMeta.innerHTML = `
      <span class="modal-meta-item">🏢 ${juego.estudio}</span>
      <span class="modal-meta-item">📅 ${juego.anio}</span>
      <span class="modal-meta-item">🎮 ${juego.plataforma}</span>
      <span class="modal-meta-item">⏱ ${juego.duracion || "—"}</span>
      <span class="modal-meta-item">🎯 ${juego.dificultad || "—"}</span>
      <span class="modal-meta-item">📊 MC: ${juego.metacritic || "—"}</span>
    `;

    // Puntuación con representación de estrellas
    elementos.modalPuntuacion.innerHTML = `
      <span aria-hidden="true">${juego.puntuacion}</span>
      <span class="puntuacion-estrellas" aria-hidden="true">
        ${generarEstrellas(juego.puntuacion)}
      </span>
      <span class="visualmente-oculto">
        Puntuación: ${juego.puntuacion} de 10
      </span>
    `;

    // Lista de características
    elementos.modalCaracteristicasLista.innerHTML = juego.caracteristicas
      .map((c) => `<li>${c}</li>`)
      .join("");

    // Sección de premios: se crea dinámicamente si no existe en el DOM
    let seccionPremios = document.getElementById("modalPremiosSeccion");
    if (!seccionPremios) {
      seccionPremios = document.createElement("div");
      seccionPremios.id = "modalPremiosSeccion";
      elementos.modalContenido.appendChild(seccionPremios);
    }

    if (juego.premios && juego.premios.length > 0) {
      seccionPremios.innerHTML = `
        <div class="modal-premios">
          <h3 class="modal-premios-titulo">🏆 Premios</h3>
          <div class="modal-premios-lista">
            ${juego.premios
              .map((p) => `<span class="modal-premio-badge">${p}</span>`)
              .join("")}
          </div>
        </div>
      `;
    } else {
      seccionPremios.innerHTML = "";
    }

    // Mostrar el modal y bloquear el scroll del fondo
    elementos.modalOverlay.classList.remove("oculto");
    document.body.style.overflow = "hidden";

    // Mover el foco al botón de cerrar (accesibilidad)
    elementos.modalCerrar.focus();
  } catch (error) {
    console.error("Error al abrir el modal:", error.message);
  }
};

/**
 * Cierra el modal con una animación de salida suave.
 */
const cerrarModal = () => {
  elementos.modalOverlay.classList.add("cerrando");

  const alTerminarAnimacion = () => {
    elementos.modalOverlay.classList.remove("cerrando");
    elementos.modalOverlay.classList.add("oculto");
    document.body.style.overflow = ""; // Restaurar scroll

    // Restaurar el foco al elemento anterior (accesibilidad)
    if (elementoFocoAnterior) {
      elementoFocoAnterior.focus();
      elementoFocoAnterior = null;
    }

    elementos.modalOverlay.removeEventListener(
      "animationend",
      alTerminarAnimacion,
    );
  };

  elementos.modalOverlay.addEventListener("animationend", alTerminarAnimacion);
};

/**
 * Atrapa el foco dentro del modal cuando está abierto
 * para garantizar navegación accesible por teclado.
 * @param {KeyboardEvent} evento
 */
const trampaFocoModal = (evento) => {
  if (evento.key !== "Tab") return;

  const elementosEnfocables = elementos.modalContenido.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );

  const primero = elementosEnfocables[0];
  const ultimo = elementosEnfocables[elementosEnfocables.length - 1];

  if (evento.shiftKey) {
    // Shift+Tab: si estamos en el primero, saltar al último
    if (document.activeElement === primero) {
      evento.preventDefault();
      ultimo.focus();
    }
  } else {
    // Tab: si estamos en el último, saltar al primero
    if (document.activeElement === ultimo) {
      evento.preventDefault();
      primero.focus();
    }
  }
};

/* ──────────────────────────────────────────────
   8. NAVEGACIÓN Y SCROLL
   ────────────────────────────────────────────── */

/**
 * Actualiza el enlace activo de la navegación según
 * la sección visible en el viewport al hacer scroll.
 */
const actualizarEnlaceActivo = () => {
  const secciones = document.querySelectorAll("main section[id]");
  let seccionActualId = "";

  secciones.forEach((seccion) => {
    const offsetTop = seccion.offsetTop - 100;
    if (window.scrollY >= offsetTop) {
      seccionActualId = seccion.id;
    }
  });

  elementos.navEnlaces.forEach((enlace) => {
    const href = enlace.getAttribute("href").slice(1); // Quitar el #
    enlace.classList.toggle("activo", href === seccionActualId);
  });
};

/**
 * Gestiona todos los efectos relacionados con el scroll de la página:
 * - Sombra del encabezado al bajar
 * - Visibilidad del botón "Volver arriba"
 * - Enlace activo en la navegación
 */
const alHacerScroll = () => {
  const scrollY = window.scrollY;

  // Sombra en el encabezado cuando se baja
  elementos.encabezado.classList.toggle("con-sombra", scrollY > 20);

  // Mostrar u ocultar el botón "Volver arriba"
  if (scrollY > 400) {
    elementos.btnVolverArriba.classList.remove("oculto");
  } else {
    elementos.btnVolverArriba.classList.add("oculto");
  }

  // Actualizar el enlace activo en la barra de navegación
  actualizarEnlaceActivo();
};

/**
 * Alterna la visibilidad del menú de navegación en móvil.
 */
const alternarMenuMovil = () => {
  const estaAbierto =
    elementos.menuHamburguesa.getAttribute("aria-expanded") === "true";
  const nuevoEstado = !estaAbierto;

  elementos.menuHamburguesa.setAttribute("aria-expanded", String(nuevoEstado));
  elementos.navLista.classList.toggle("abierto", nuevoEstado);
};

/**
 * Cierra el menú móvil si está abierto.
 */
const cerrarMenuMovil = () => {
  elementos.menuHamburguesa.setAttribute("aria-expanded", "false");
  elementos.navLista.classList.remove("abierto");
};

/* ──────────────────────────────────────────────
   9. FILTROS Y BÚSQUEDA
   ────────────────────────────────────────────── */

/**
 * Aplica un filtro de género y re-renderiza el catálogo.
 * Acepta el slug del género, "todos" o "misjuegos".
 * @param {string} filtro - El slug del filtro a aplicar.
 */
const aplicarFiltro = (filtro) => {
  estado.filtroActivo = filtro;

  // Actualizar el estado visual de los botones de filtro
  elementos.filtrosBotones.forEach((btn) => {
    const esActivo = btn.dataset.filtro === filtro;
    btn.classList.toggle("activo", esActivo);
    btn.setAttribute("aria-pressed", String(esActivo));
  });

  renderizarJuegos();
};

/**
 * Limpia todos los filtros activos y el término de búsqueda.
 */
const limpiarFiltros = () => {
  estado.filtroActivo = "todos";
  estado.terminoBusqueda = "";
  elementos.buscador.value = "";
  aplicarFiltro("todos");
};

/* ──────────────────────────────────────────────
   10. FORMULARIO "AÑADIR MI JUEGO"
   ────────────────────────────────────────────── */

/**
 * Elimina todos los mensajes de error de validación del formulario.
 * @param {HTMLFormElement} formulario - El formulario a limpiar.
 */
const limpiarErroresFormulario = (formulario) => {
  formulario.querySelectorAll(".input-error").forEach((el) => {
    el.classList.remove("input-error");
  });
  formulario.querySelectorAll(".formulario-error").forEach((el) => {
    el.remove();
  });
};

/**
 * Muestra un mensaje de error accesible debajo de un campo.
 * @param {HTMLElement} campo   - El campo de entrada con error.
 * @param {string}      mensaje - El mensaje descriptivo del error.
 */
const mostrarErrorCampo = (campo, mensaje) => {
  campo.classList.add("input-error");
  // Eliminar error previo del mismo campo si ya existe
  const errorPrevio = campo.parentElement.querySelector(".formulario-error");
  if (errorPrevio) errorPrevio.remove();

  const parrafoError = document.createElement("p");
  parrafoError.className = "formulario-error";
  parrafoError.setAttribute("role", "alert");
  parrafoError.textContent = mensaje;
  campo.insertAdjacentElement("afterend", parrafoError);
};

/**
 * Valida todos los campos obligatorios del formulario.
 * Muestra mensajes de error en los campos inválidos.
 * @param {HTMLFormElement} formulario - El formulario a validar.
 * @returns {boolean} - true si todo es válido, false si hay errores.
 */
const validarFormulario = (formulario) => {
  limpiarErroresFormulario(formulario);
  let esValido = true;

  // Campos obligatorios con sus mensajes de error
  const camposObligatorios = [
    { id: "formTitulo", mensaje: "El título es obligatorio." },
    {
      id: "formEstudio",
      mensaje: "El estudio o desarrollador es obligatorio.",
    },
    { id: "formAnio", mensaje: "El año de lanzamiento es obligatorio." },
    { id: "formGenero", mensaje: "El género es obligatorio." },
    { id: "formPlataforma", mensaje: "La plataforma es obligatoria." },
    { id: "formPuntuacion", mensaje: "La puntuación es obligatoria." },
    { id: "formDescripcion", mensaje: "La descripción es obligatoria." },
  ];

  camposObligatorios.forEach(({ id, mensaje }) => {
    const campo = formulario.querySelector(`#${id}`);
    if (!campo) return;
    if (!campo.value.trim()) {
      mostrarErrorCampo(campo, mensaje);
      esValido = false;
    }
  });

  // Validación extra: puntuación debe estar entre 0 y 10
  const campoPuntuacion = formulario.querySelector("#formPuntuacion");
  if (campoPuntuacion && campoPuntuacion.value.trim()) {
    const valor = parseFloat(campoPuntuacion.value);
    if (isNaN(valor) || valor < 0 || valor > 10) {
      mostrarErrorCampo(
        campoPuntuacion,
        "La puntuación debe ser un número entre 0 y 10.",
      );
      esValido = false;
    }
  }

  // Validación extra: año debe ser razonable
  const campoAnio = formulario.querySelector("#formAnio");
  if (campoAnio && campoAnio.value.trim()) {
    const anio = parseInt(campoAnio.value, 10);
    const anioActual = new Date().getFullYear();
    if (isNaN(anio) || anio < 1970 || anio > anioActual + 5) {
      mostrarErrorCampo(
        campoAnio,
        `El año debe estar entre 1970 y ${anioActual + 5}.`,
      );
      esValido = false;
    }
  }

  return esValido;
};

/**
 * Inicializa el manejo del formulario "Añadir mi juego":
 * registra el submit con validación, la animación de éxito y
 * la limpieza al cerrar el modal del formulario.
 */
const manejarFormulario = () => {
  const formulario = document.getElementById("formularioJuego");
  const formModal = document.getElementById("formModal");
  const formModalCerrar = document.getElementById("formModalCerrar");

  // Si el formulario o el modal no existen en el DOM, salir sin errores
  if (!formulario || !formModal) return;

  /**
   * Cierra el modal del formulario y deja todo limpio para la próxima apertura.
   */
  const cerrarFormModal = () => {
    formModal.classList.add("oculto");
    formulario.reset();
    limpiarErroresFormulario(formulario);

    // Ocultar la vista previa de imagen si existe
    const preview = document.getElementById("formImagenPreview");
    if (preview) {
      preview.src = "";
      preview.style.display = "none";
    }
  };

  // Manejar el envío del formulario
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    // Validar antes de continuar
    if (!validarFormulario(formulario)) return;

    // Recoger todos los datos del formulario
    const datosFormulario = {
      titulo: formulario.querySelector("#formTitulo")?.value || "",
      estudio: formulario.querySelector("#formEstudio")?.value || "",
      anio: formulario.querySelector("#formAnio")?.value || "",
      genero: formulario.querySelector("#formGenero")?.value || "",
      plataforma: formulario.querySelector("#formPlataforma")?.value || "",
      puntuacion: formulario.querySelector("#formPuntuacion")?.value || "",
      descripcion: formulario.querySelector("#formDescripcion")?.value || "",
      steamId: formulario.querySelector("#formSteamId")?.value || "",
      imagenUrl: formulario.querySelector("#formImagenUrl")?.value || "",
      duracion: formulario.querySelector("#formDuracion")?.value || "",
      metacritic: formulario.querySelector("#formMetacritic")?.value || "",
      dificultad: formulario.querySelector("#formDificultad")?.value || "Media",
      caracteristicas:
        formulario.querySelector("#formCaracteristicas")?.value || "",
      premios: formulario.querySelector("#formPremios")?.value || "",
    };

    // Añadir el juego al catálogo personal
    agregarJuegoUsuario(datosFormulario);

    // Animación de éxito en el botón de envío antes de cerrar
    const btnEnviar = formulario.querySelector('[type="submit"]');
    if (btnEnviar) {
      const textoOriginal = btnEnviar.textContent;
      btnEnviar.classList.add("exito");
      btnEnviar.textContent = "✅ ¡Juego añadido!";
      btnEnviar.disabled = true;

      setTimeout(() => {
        btnEnviar.classList.remove("exito");
        btnEnviar.textContent = textoOriginal;
        btnEnviar.disabled = false;
        cerrarFormModal();
      }, 2000);
    } else {
      cerrarFormModal();
    }
  });

  // Cerrar el modal al hacer clic en el botón de cerrar
  if (formModalCerrar) {
    formModalCerrar.addEventListener("click", cerrarFormModal);
  }

  // Cerrar el modal al hacer clic en el fondo (overlay)
  formModal.addEventListener("click", (evento) => {
    if (evento.target === formModal) cerrarFormModal();
  });
};

/* ──────────────────────────────────────────────
   11. OBSERVADOR DE INTERSECCIÓN (animaciones)
   ────────────────────────────────────────────── */

/**
 * Usa IntersectionObserver para añadir animaciones de entrada
 * a las tarjetas estáticas cuando entran en el viewport.
 */
const iniciarObservadorAnimaciones = () => {
  // Solo activar si el navegador soporta IntersectionObserver
  if (!("IntersectionObserver" in window)) return;

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.style.opacity = "1";
          entrada.target.style.transform = "translateY(0)";
          observador.unobserve(entrada.target); // Dejar de observar tras animar
        }
      });
    },
    { threshold: 0.1 },
  );

  // Observar las tarjetas "sobre" y estadísticas para animarlas al aparecer
  document.querySelectorAll(".sobre-tarjeta, .stat-tarjeta").forEach((el) => {
    observador.observe(el);
  });
};

/* ──────────────────────────────────────────────
   12. REGISTRO DE EVENTOS
   ────────────────────────────────────────────── */

/**
 * Registra todos los event listeners de la aplicación.
 * Se centraliza aquí para mantener el código organizado y legible.
 */
const registrarEventos = () => {
  /* ── Scroll de la página ── */
  window.addEventListener("scroll", alHacerScroll, { passive: true });

  /* ── Menú hamburguesa (móvil) ── */
  elementos.menuHamburguesa.addEventListener("click", alternarMenuMovil);

  // Cerrar el menú móvil al hacer clic en cualquier enlace de navegación
  elementos.navLista.querySelectorAll(".nav-enlace").forEach((enlace) => {
    enlace.addEventListener("click", cerrarMenuMovil);
  });

  /* ── Botones de filtro de género ── */
  elementos.filtrosBotones.forEach((btn) => {
    btn.addEventListener("click", () => aplicarFiltro(btn.dataset.filtro));
  });

  /* ── Buscador de juegos ── */
  elementos.buscador.addEventListener("input", (evento) => {
    estado.terminoBusqueda = evento.target.value;
    renderizarJuegos();
  });

  // Limpiar la búsqueda al presionar Escape
  elementos.buscador.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
      estado.terminoBusqueda = "";
      elementos.buscador.value = "";
      renderizarJuegos();
    }
  });

  /* ── Botón limpiar filtros ── */
  elementos.btnLimpiarFiltros.addEventListener("click", limpiarFiltros);

  /* ── Modal de detalle: cerrar ── */
  elementos.modalCerrar.addEventListener("click", cerrarModal);

  // Cerrar al hacer clic en el fondo del overlay
  elementos.modalOverlay.addEventListener("click", (evento) => {
    if (evento.target === elementos.modalOverlay) cerrarModal();
  });

  // Cerrar con Escape y trampa de foco para accesibilidad
  document.addEventListener("keydown", (evento) => {
    if (
      evento.key === "Escape" &&
      !elementos.modalOverlay.classList.contains("oculto")
    ) {
      cerrarModal();
    }

    // Activar trampa de foco solo cuando el modal está visible
    if (!elementos.modalOverlay.classList.contains("oculto")) {
      trampaFocoModal(evento);
    }
  });

  /* ── Botón "Volver arriba" ── */
  elementos.btnVolverArriba.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ── Cerrar menú móvil al hacer clic fuera de él ── */
  document.addEventListener("click", (evento) => {
    const dentroNav = elementos.navLista.contains(evento.target);
    const esBurger = elementos.menuHamburguesa.contains(evento.target);
    const menuAbierto =
      elementos.menuHamburguesa.getAttribute("aria-expanded") === "true";

    if (!dentroNav && !esBurger && menuAbierto) {
      cerrarMenuMovil();
    }
  });

  /* ── Cerrar menú móvil al redimensionar a escritorio ── */
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) cerrarMenuMovil();
  });

  /* ── Botón "Añadir mi juego": abre el modal del formulario ── */
  const btnAgregarJuego = document.getElementById("btnAgregarJuego");
  if (btnAgregarJuego) {
    btnAgregarJuego.addEventListener("click", () => {
      const formModal = document.getElementById("formModal");
      if (formModal) formModal.classList.remove("oculto");
    });
  }

  /* ── Delegación de eventos para eliminar juegos del usuario ── */
  elementos.juegosCuadricula.addEventListener("click", (evento) => {
    const btnEliminar = evento.target.closest(".tarjeta-btn-eliminar");
    if (btnEliminar) {
      // Evitar que el evento llegue al artículo y abra el modal
      evento.stopPropagation();
      eliminarJuegoUsuario(btnEliminar.dataset.id);
    }
  });

  /* ── Vista previa de imagen al introducir un Steam ID en el formulario ── */
  const formSteamId = document.getElementById("formSteamId");
  const formImagenPreview = document.getElementById("formImagenPreview");

  if (formSteamId && formImagenPreview) {
    formSteamId.addEventListener("input", () => {
      const steamId = formSteamId.value.trim();
      if (steamId) {
        const url = `https://cdn.akamai.steamstatic.com/steam/apps/${steamId}/capsule_616x353.jpg`;
        formImagenPreview.src = url;
        formImagenPreview.style.display = "block";
        formImagenPreview.alt = `Vista previa de la portada para Steam ID ${steamId}`;
      } else {
        formImagenPreview.src = "";
        formImagenPreview.style.display = "none";
      }
    });
  }
};

/* ──────────────────────────────────────────────
   13. INICIALIZACIÓN
   ────────────────────────────────────────────── */

/**
 * Función principal de inicialización.
 * Coordina el arranque de todos los módulos de la aplicación.
 */
const inicializar = () => {
  try {
    // Renderizar el catálogo inicial con todos los juegos
    renderizarJuegos();

    // Registrar todos los event listeners
    registrarEventos();

    // Inicializar el manejo del formulario "Añadir mi juego"
    manejarFormulario();

    // Iniciar el observador de animaciones de entrada
    iniciarObservadorAnimaciones();

    // Ejecutar el manejador de scroll al cargar para establecer el estado inicial
    alHacerScroll();

    console.info("✅ StoryGames: aplicación inicializada correctamente.");
  } catch (error) {
    console.error("❌ Error al inicializar la aplicación:", error.message);
  }
};

/* Iniciar la aplicación cuando el DOM esté completamente cargado */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializar);
} else {
  inicializar();
}
