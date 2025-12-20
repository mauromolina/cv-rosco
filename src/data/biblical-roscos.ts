export type BiblicalQuestion = {
  letter: string;
  question: string;
  answer: string;
  contains?: boolean; // true if the answer contains the letter, false/undefined if it starts with the letter
};

export type BiblicalRosco = {
  groupId: number;
  groupName: string;
  theme: string;
  timeLimit: number; // seconds
  questions: BiblicalQuestion[];
};

export const biblicalRoscos: BiblicalRosco[] = [
  {
    groupId: 1,
    groupName: "Grupo 1",
    theme: "Personajes del Antiguo Testamento",
    timeLimit: 300,
    questions: [
      {
        letter: "A",
        question: "Primer hombre creado por Dios.",
        answer: "ADÁN",
      },
      {
        letter: "B",
        question: "Ciudad donde nació Jesús",
        answer: "BELÉN",
      },
      {
        letter: "C",
        question: "Hijo de Adán y Eva, hermano de Abel",
        answer: "CAÍN",
      },
      {
        letter: "D",
        question: "Joven pastor que derrotó a Goliat",
        answer: "DAVID",
      },
      {
        letter: "E",
        question: "Jardín donde vivieron Adán y Eva",
        answer: "EDÉN",
      },
      {
        letter: "F",
        question: "Uno de los frutos del Espíritu mencionado en Gálatas 5",
        answer: "FÉ",
      },
      {
        letter: "G",
        question: "Lugar donde Jesús oró antes de ser arrestado",
        answer: "GETSEMANI",
      },
      {
        letter: "H",
        question: "Rey que intentó matar a Jesús cuando era bebé",
        answer: "HERODES",
      },
      {
        letter: "I",
        question: "Pueblo que Dios sacó de Egipto",
        answer: "ISRAEL",
      },
      {
        letter: "J",
        question: "Profeta que fue tragado por un gran pez",
        answer: "JONAS",
      },
      {
        letter: "K",
        question: "Fruta peluda y verde de sabor acido:",
        answer: "KIWI",
      },
      {
        letter: "L",
        question: "Uno de los 4 evangelistas",
        answer: "LUCAS",
      },
      {
        letter: "M",
        question:
          "Alimento caido del cielo para abastecer a Israel en el desierto",
        answer: "MANA",
      },
      {
        letter: "N",
        question: "Ciudad donde creció Jesus",
        answer: "NAZARET",
      },
      {
        letter: "O",
        question: "Animal usado frecuentemente por Jesus en sus parabolas",
        answer: "OVEJA",
      },
      {
        letter: "P",
        question: "Nombre nuevo que le puso Jesús a Saulo",
        answer: "PABLO",
      },
      {
        letter: "Q",
        question: "Familiar de la reina Ester",
        answer: "MARDOQUEO",
        contains: true,
      },
      {
        letter: "R",
        question: "Mujer que escondió a los espías israelitas en Jericó",
        answer: "RAHAB",
      },
      {
        letter: "S",
        question: "Hombre de gran fuerza que derrotó a los filisteos",
        answer: "SANSÓN",
      },
      {
        letter: "T",
        question: "Discípulo que dudó de la resurrección hasta ver a Jesús",
        answer: "TOMÁS",
      },
      {
        letter: "U",
        question:
          "Uno de los que sostuvieron los brazos de Moisés en la batalla",
        answer: "UR",
      },
      {
        letter: "V",
        question: "Estado civil de la mujer de Sarepta",
        answer: "VIUDA",
      },
      {
        letter: "W",
        question: "Señal que necesitamos para conectarnos a internet.",
        answer: "WIFI",
      },
      {
        letter: "X",
        question:
          "Libro que relata el viaje del pueblo de Israel en el desierto",
        answer: "ÉXODO",
        contains: true,
      },
      {
        letter: "Y",
        question: "Parte de la armadura de Dios que se pone en la cabeza",
        answer: "YELMO",
      },
      {
        letter: "Z",
        question:
          "Hombre pequeño de estatura que subió a un árbol para ver a Jesús",
        answer: "ZAQUEO",
      },
    ],
  },
  {
    groupId: 2,
    groupName: "Grupo 2",
    theme: "Lugares Bíblicos",
    timeLimit: 300,
    questions: [
      {
        letter: "A",
        question: "Hermano de Moisés, primer sumo sacerdote",
        answer: "AARON",
      },
      {
        letter: "B",
        question: "Confirmación de un nuevo nacimiento en Cristo",
        answer: "BAUTISMO",
      },
      {
        letter: "C",
        question: "Oficio de José el padre de Jesús",
        answer: "CARPINTERO",
      },
      {
        letter: "D",
        question: "Alumno o aprendiz de Cristo",
        answer: "DISCIPULO",
      },
      {
        letter: "E",
        question: "Buena noticia, primeros 4 libros del nuevo testamento",
        answer: "EVANGELIO",
      },
      {
        letter: "F",
        question: "Libro de la biblia que es una carta escrita a Filipos",
        answer: "FILIPENSES",
      },
      {
        letter: "G",
        question: "Gigante derrotado con una piedra",
        answer: "GOLIAT",
      },
      {
        letter: "H",
        question: "Planta que Jesus maldijo",
        answer: "HIGUERA",
      },
      {
        letter: "I",
        question: "Sobrenombre de Judas",
        answer: "ISCARIOTE",
      },
      {
        letter: "J",
        question: "Cuidad santa nombrada en apocalipsis",
        answer: "JERUSALEM",
      },
      {
        letter: "K",
        question: "Negocio pequeño donde se venden golosinas",
        answer: "KIOSCO",
      },
      {
        letter: "L",
        question: "Material fino de las vestiduras celestiales",
        answer: "LINO",
      },
      {
        letter: "M",
        question: "Segundo libro del nuevo testamento",
        answer: "MARCOS",
      },
      {
        letter: "N",
        question: "Ciudad a donde Jonas debia ir",
        answer: "NINIVE",
      },
      {
        letter: "O",
        question: "Accion que realizaba Daniel 3 veces al dia",
        answer: "ORAR",
      },
      {
        letter: "P",
        question: "Fiesta que conmemora la liberacion del pueblo de israel:",
        answer: "PASCUA",
      },
      {
        letter: "Q",
        question: "Seres celestiales del apocalipsis",
        answer: "QUERUBINES",
      },
      {
        letter: "R",
        question: "Libro de la biblia con nombre de Mujer",
        answer: "RUTH",
      },
      {
        letter: "S",
        question: "Animal que engaño a Eva",
        answer: "SERPIENTE",
      },
      {
        letter: "T",
        question: "Edificio o construcción donde se adora a Dios",
        answer: "TEMPLO",
      },
      {
        letter: "U",
        question: "Jesús dice: el Padre y yo somos",
        answer: "UNO",
      },
      {
        letter: "V",
        question: "En Juan 15 Jesús se refiere a si mismo como la ...",
        answer: "VID",
      },
      {
        letter: "W",
        question: "Alimento que se prepara con dos panes",
        answer: "SANDWICH",
        contains: true,
      },
      {
        letter: "X",
        question: "Enaltecer  y adorar a Dios",
        answer: "EXALTAR",
        contains: true,
      },
      {
        letter: "Y",
        question: "Gancho para dirigir y guiar el camino de las ovejas",
        answer: "CAYADO",
        contains: true,
      },
      {
        letter: "Z",
        question: "Animal que trago a Jonás",
        answer: "PEZ",
        contains: true,
      },
    ],
  },
  {
    groupId: 3,
    groupName: "Grupo 3",
    theme: "Eventos y Milagros",
    timeLimit: 300,
    questions: [
      {
        letter: "A",
        question:
          "Palabra utilizada para terminar una oración que significa así sea",
        answer: "AMÉN",
      },
      {
        letter: "B",
        question: "Dádiva divina, favor de Dios",
        answer: "BENDICIÓN",
      },
      {
        letter: "C",
        question: "Objeto de madera en el que murió Jesús colgado",
        answer: "CRUZ",
      },
      {
        letter: "D",
        question: "Primicia separada para Dios según el mandato de su palabra",
        answer: "DIEZMO",
      },
      {
        letter: "E",
        question:
          "Cualidad de Dios que expresa que el no tiene principio ni fin",
        answer: "ETERNO",
      },
      {
        letter: "F",
        question: "Pueblo enemigo de Israel.",
        answer: "FILISTEOS",
      },
      {
        letter: "G",
        question: "Lider que dirigio a los 300 soldados",
        answer: "GEDEON",
      },
      {
        letter: "H",
        question: "Actitud del corazon contraria a soberbia",
        answer: "HUMILDAD",
      },
      {
        letter: "I",
        question: "Cuerpo de cristo, novia de Jesús",
        answer: "IGLESIA",
      },
      {
        letter: "J",
        question: "Uno de los nombres de Dios en el antiguo testamento",
        answer: "JEHOVÁ",
      },
      {
        letter: "K",
        question: "Mamífero marsupial parecido a un oso pero pequeño y gris",
        answer: "KOALA",
      },
      {
        letter: "L",
        question: "Dinero que se da para ayuda de un necesitado",
        answer: "LIMOSNA",
      },
      {
        letter: "M",
        question: "Semilla pequeña para referirse a la fe",
        answer: "MOSTAZA",
      },
      {
        letter: "N",
        question: "Hombre que le pregunto a Jesus si podiamos nacer de nuevo",
        answer: "NICODEMO",
      },
      {
        letter: "O",
        question: "Uno de los regalos que los magos le llevaron a Jesus",
        answer: "ORO",
      },
      {
        letter: "P",
        question: "Jesus dijo no la doy como el mundo la da...",
        answer: "PAZ",
      },
      {
        letter: "Q",
        question: "Profeta mayor empieza con E",
        answer: "EZEQUIEL",
        contains: true,
      },
      {
        letter: "R",
        question: "Al tercer día ... ",
        answer: "RESUCITO",
      },
      {
        letter: "S",
        question: "Nombre del templo donde oraban los religiosos",
        answer: "SINAGOGA",
      },
      {
        letter: "T",
        question: "Característica del habla de Moisés",
        answer: "TARTAMUDO",
      },
      {
        letter: "U",
        question: "Se refiere a unico hijo de Dios",
        answer: "UNIGENITO",
      },
      {
        letter: "V",
        question:
          "Condición física y de santidad en que María concibió a Jesús",
        answer: "VIRGEN",
      },
      {
        letter: "W",
        question: "Aplicacion para enviar mensajes",
        answer: "WHATSAPP",
      },
      {
        letter: "X",
        question: "Al hacerlo Jesús murió",
        answer: "EXPIRAR",
        contains: true,
      },
      {
        letter: "Y",
        question:
          "Elemento de madera que une la cabeza de los bueyes usado para comparar nuestras relaciones",
        answer: "YUGO",
      },
      {
        letter: "Z",
        question: "Padre de Juan el Bautista",
        answer: "ZACARÍAS",
      },
    ],
  },
  {
    groupId: 4,
    groupName: "Grupo 4",
    theme: "Objetos y Símbolos Bíblicos",
    timeLimit: 300,
    questions: [
      {
        letter: "A",
        question: "Barco gigante construido por Noé",
        answer: "ARCA",
      },
      {
        letter: "B",
        question: "Libro que contiene la Palabra de Dios",
        answer: "BIBLIA",
      },
      {
        letter: "C",
        question: "Sonido o expresión musical emitida con la voz",
        answer: "CANTO",
      },
      {
        letter: "D",
        question: "Dia de la semana separado para adorar a Dios",
        answer: "DOMINGO",
      },
      {
        letter: "E",
        question:
          "Nombre propio de origen hebreo que significa Dios con nosotros",
        answer: "EMMANUEL",
      },
      {
        letter: "F",
        question: "Uno de los 12 discipulos",
        answer: "FELIPE",
      },
      {
        letter: "G",
        question: "Lugar donde murio Jesús",
        answer: "GOLGOTA",
      },
      {
        letter: "H",
        question: "Aclamación a Jesus cuando entro a Jerusalen",
        answer: "HOSSANA",
      },
      {
        letter: "I",
        question: "Profeta mayor cuyo libro lleva su nombre",
        answer: "ISAIAS",
      },
      {
        letter: "J",
        question: "Apostol traicionero",
        answer: "JUDAS",
      },
      {
        letter: "K",
        question:
          "Actividad en la que se interpreta una canción sobre un fondo musical y letra en una pantalla",
        answer: "KARAOKE",
      },
      {
        letter: "L",
        question: "Que es la palabra de Dios a mis pies",
        answer: "LÁMPARA",
      },
      {
        letter: "M",
        question: "Hermana de Maria que estaba siempre trabajando",
        answer: "MARTA",
      },
      {
        letter: "N",
        question:
          "Accion que realizo Pedro hacia Jesus antes de que cante el gallo",
        answer: "NEGAR",
      },
      {
        letter: "O",
        question: "Arbol del cual se extrae un fruto para hacer aceite",
        answer: "OLIVO",
      },
      {
        letter: "P",
        question: "Remision de la pena merecida o deuda pendiente",
        answer: "PERDÓN",
      },
      {
        letter: "Q",
        question: "Los sacrificios de dios son el espiritu …",
        answer: "QUEBRANTADO",
      },
      {
        letter: "R",
        question: "Base donde tiene que estar fundada nuestra casa",
        answer: "ROCA",
      },
      {
        letter: "S",
        question: "Antiguo nombre de Pablo",
        answer: "SAULO",
      },
      {
        letter: "T",
        question: "Número de veces que Pedro nego a Jesús",
        answer: "TRES",
      },
      {
        letter: "U",
        question: "Acción de aplicar aceite sobre la frente para sanación",
        answer: "UNGIR",
      },
      {
        letter: "V",
        question: "Sentido recobro Bartimeo cuando Jesús lo sano:",
        answer: "VISTA",
      },
      {
        letter: "W",
        question: "Deporte que se practica en el agua con una tabla y vela",
        answer: "WINDSURF",
      },
      {
        letter: "X",
        question:
          "Calidad sobresaliente al hacer las cosas buscando reflejar la perfección de Dios",
        answer: "EXCELENCIA",
        contains: true,
      },
      {
        letter: "Y",
        question: "Norma divina del antiguo testamento",
        answer: "LEY",
        contains: true,
      },
      {
        letter: "Z",
        question: "Animales pequeños que echan a perder las viñas",
        answer: "ZORRAS",
      },
    ],
  },
  {
    groupId: 5,
    groupName: "Grupo 5",
    theme: "Nuevo Testamento y Apóstoles",
    timeLimit: 300,
    questions: [
      {
        letter: "A",
        question: "Ser celestial enviado para dar mensajes específicos",
        answer: "ÁNGEL",
      },
      {
        letter: "B",
        question:
          "Animal que habló en la biblia, mismo animal que llevo a María a Belen",
        answer: "BURRO",
      },
      {
        letter: "C",
        question: "Tierra prometida a la que iba Moises",
        answer: "CANAAN",
      },
      {
        letter: "D",
        question: "Lluvia intensa enviada por Dios para destruir la Tierra",
        answer: "DILUVIO",
      },
      {
        letter: "E",
        question: "Primer martir cristiano",
        answer: "ESTEBAN",
      },
      {
        letter: "F",
        question: "Religiosos que se oponian a Jesus",
        answer: "FARISEOS",
      },
      {
        letter: "G",
        question: "Segun la cancion, va pasando el hombre de...",
        answer: "GALILEA",
      },
      {
        letter: "H",
        question: "Libro que relata los acontecimientos de los apostoles",
        answer: "HECHOS",
      },
      {
        letter: "I",
        question: "Orar por otros",
        answer: "INTERCEDER",
      },
      {
        letter: "J",
        question: "Primo de Jesus que bautizaba en el rio",
        answer: "JUAN",
      },
      {
        letter: "K",
        question: "Arte marcial",
        answer: "KARATE",
      },
      {
        letter: "L",
        question: "Uno de los 5 libros del pentateuco",
        answer: "LEVÍTICO",
      },
      {
        letter: "M",
        question: "Salvador y redentor esperado descendiente de David",
        answer: "MESIAS",
      },
      {
        letter: "N",
        question: "De quien es el reino de los cielos segun la biblia",
        answer: "NIÑOS",
      },
      {
        letter: "O",
        question: "Atributo de Dios que significa que es todopoderoso",
        answer: "OMNIPOTENTE",
      },
      {
        letter: "P",
        question: "Transgresion que nos separa de Dios",
        answer: "PECADO",
      },
      {
        letter: "Q",
        question: "Ultimo libro del antiguo testamento",
        answer: "MALAQUIAS",
        contains: true,
      },
      {
        letter: "R",
        question: "Los discípulos llamaban así a Jesús",
        answer: "RABI",
      },
      {
        letter: "S",
        question: "Lugar donde pusieron el cuerpo de Jesús",
        answer: "SEPULCRO",
      },
      {
        letter: "T",
        question: "Nombre más corto de los libros del nuevo testamento",
        answer: "TITO",
      },
      {
        letter: "U",
        question: "Armonía espiritual y amor entre creyentes",
        answer: "UNIDAD",
      },
      {
        letter: "V",
        question: "El Señor necesita adoradores que le adoren en espíritu y",
        answer: "VERDAD",
      },
      {
        letter: "W",
        question:
          "Conjunto de páginas y recursos que están disponibles en Internet y pueden consultarse mediante un navegador.",
        answer: "WEB",
      },
      {
        letter: "X",
        question:
          "Dar razones y consejos para animar y persuadir a dejar de hacer algo",
        answer: "EXHORTAR",
        contains: true,
      },
      {
        letter: "Y",
        question: "Jerarquia de David y Salomón en la biblia",
        answer: "REYES",
        contains: true,
      },
      {
        letter: "Z",
        question: "Arbusto espinoso que ardía en fuego sin consumirse",
        answer: "ZARZA",
      },
    ],
  },
  {
    groupId: 6,
    groupName: "Grupo 6",
    theme: "Profetas y Libros Bíblicos",
    timeLimit: 300,
    questions: [
      {
        letter: "A",
        question: "Libro de la Biblia que trata de los ultimos tiempos",
        answer: "APOCALIPSIS",
      },
      {
        letter: "B",
        question: "Delincuente que fue soltado en lugar de Jesus",
        answer: "BARRABÁS",
      },
      {
        letter: "C",
        question: "Oracion con voz fuerte, vigor y esfuerzo",
        answer: "CLAMOR",
      },
      {
        letter: "D",
        question: "Mujer usada para que Sanson pierda su fuerza",
        answer: "DALILA",
      },
      {
        letter: "E",
        question: "Expectativa segura y confiada en las promesas de Dios",
        answer: "ESPERANZA",
      },
      {
        letter: "F",
        question: "Cayó del cielo en el altar de Elias.",
        answer: "FUEGO",
      },
      {
        letter: "G",
        question: "Favor inmerecido de Dios",
        answer: "GRACIA",
      },
      {
        letter: "H",
        question: "De la venida del señor no se sabe ni el dia ni la...",
        answer: "HORA",
      },
      {
        letter: "I",
        question: "Que adora imágenes",
        answer: "IDOLATRA",
      },
      {
        letter: "J",
        question: "Rio en el cual se bautizo Jesus",
        answer: "JORDÁN",
      },
      {
        letter: "K",
        question: "Unidad de longitud equivalente a 1000 metros",
        answer: "KILÓMETRO",
      },
      {
        letter: "L",
        question: "Enfermedad cutanea que solia sanar Jesus",
        answer: "LEPRA",
      },
      {
        letter: "M",
        question: "Dios se los dio a Moises",
        answer: "MANDAMIENTOS",
      },
      {
        letter: "N",
        question: "Rey que construyo una estatua en su honor",
        answer: "NABUCONODOSOR",
      },
      {
        letter: "O",
        question: "Regalo voluntario a Dios en expresion de gratitud",
        answer: "OFRENDA",
      },
      {
        letter: "P",
        question: "Palabra lema de JOVENES 2025.",
        answer: "PLAN",
      },
      {
        letter: "Q",
        question: "Lo que hacian con el incienso para ofrecer adoracion a dios",
        answer: "QUEMAR",
      },
      {
        letter: "R",
        question: "Puesto del monarca que gobierna israel",
        answer: "REY",
      },
      {
        letter: "S",
        question: "Liberación de la muerte eterna",
        answer: "SALVACIÓN",
      },
      {
        letter: "T",
        question: "Respeto y adoración hacia Dios",
        answer: "TEMOR",
      },
      {
        letter: "U",
        question: "Cómo estaban los cristianos cuando vino el Pentecostés",
        answer: "UNÁNIMES",
      },
      {
        letter: "V",
        question:
          "Pequeñas partes en que se dividen los capítulos de la biblia",
        answer: "VERSICULOS",
      },
      {
        letter: "W",
        question: "Panqueque grueso",
        answer: "WAFFLE",
      },
      {
        letter: "X",
        question: "Lo que debemos hacer antes de tomar la santa cena",
        answer: "EXAMINARSE",
        contains: true,
      },
      {
        letter: "Y",
        question:
          "Abstencion voluntaria de comida con el fin de buscar la presencia de dios",
        answer: "AYUNO",
        contains: true,
      },
      {
        letter: "Z",
        question: "Expectativa confiada y segura de la fidelidad de Dios",
        answer: "ESPERANZA",
        contains: true,
      },
    ],
  },
];
