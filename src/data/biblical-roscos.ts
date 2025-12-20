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
        question: "Primer hombre creado por Dios según el Génesis",
        answer: "ADÁN",
      },
      {
        letter: "B",
        question: "Rey de Babilonia que vio la escritura en la pared",
        answer: "BELSASAR",
      },
      {
        letter: "C",
        question: "Hermano de Abel que lo mató por celos",
        answer: "CAÍN",
      },
      {
        letter: "D",
        question: "Rey de Israel conocido por sus salmos y por vencer a Goliat",
        answer: "DAVID",
      },
      {
        letter: "E",
        question: "Profeta que fue llevado al cielo en un carro de fuego",
        answer: "ELÍAS",
      },
      {
        letter: "F",
        question: "Rey de Egipto mencionado en el tiempo de José",
        answer: "FARAÓN",
      },
      {
        letter: "G",
        question: "Gigante filisteo vencido por David con una honda",
        answer: "GOLIAT",
      },
      {
        letter: "H",
        question:
          "Profeta menor que profetizó sobre el amor de Dios hacia Israel",
        answer: "OSEAS",
      },
      {
        letter: "I",
        question: "Hijo de Abraham nacido cuando Sara era anciana",
        answer: "ISAAC",
      },
      {
        letter: "J",
        question: "Patriarca hijo de Isaac, padre de las doce tribus",
        answer: "JACOB",
      },
      {
        letter: "K",
        question: "Lugar donde Dios habló a Moisés desde la zarza ardiente",
        answer: "HOREB",
      },
      {
        letter: "L",
        question: "Sobrino de Abraham que fue rescatado de Sodoma",
        answer: "LOT",
      },
      {
        letter: "M",
        question:
          "Profeta que liberó a Israel de Egipto y recibió los Diez Mandamientos",
        answer: "MOISÉS",
      },
      {
        letter: "N",
        question: "Profeta que construyó el arca para salvarse del diluvio",
        answer: "NOÉ",
      },
      {
        letter: "Ñ",
        question:
          "Contiene Ñ: Montaña donde Moisés recibió las tablas de la ley",
        answer: "SINAÍ",
        contains: true,
      },
      {
        letter: "O",
        question:
          "Profeta menor que profetizó sobre el amor de Dios (ya usado en H)",
        answer: "OSEAS",
      },
      {
        letter: "P",
        question: "Primer rey de Israel ungido por Samuel",
        answer: "SAÚL",
      },
      {
        letter: "Q",
        question: "Reina de Saba que visitó al rey Salomón",
        answer: "REINA",
      },
      {
        letter: "R",
        question: "Mujer moabita que fue bisabuela del rey David",
        answer: "RUT",
      },
      {
        letter: "S",
        question: "Hijo de David conocido por su sabiduría",
        answer: "SALOMÓN",
      },
      {
        letter: "T",
        question: "Lugar donde Jacob luchó con el ángel",
        answer: "PENIEL",
      },
      {
        letter: "U",
        question: "Profeta que ungió a David como rey",
        answer: "SAMUEL",
      },
      {
        letter: "V",
        question: "Reina persa que salvó a su pueblo de la destrucción",
        answer: "ESTER",
      },
      {
        letter: "W",
        question:
          "Nombre en inglés del lugar donde adoraban (en español: templo)",
        answer: "WORSHIP",
      },
      {
        letter: "X",
        question: "Contiene X: Rey persa que permitió el regreso del exilio",
        answer: "CIRO",
        contains: true,
      },
      {
        letter: "Y",
        question: "Nombre de Dios en hebreo (tetragrama)",
        answer: "YAHVÉ",
      },
      {
        letter: "Z",
        question: "Profeta menor que profetizó sobre el día del Señor",
        answer: "ZACARÍAS",
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
        question: "Jardín donde Dios puso a Adán y Eva",
        answer: "EDÉN",
      },
      {
        letter: "B",
        question: "Ciudad donde se construyó una torre para llegar al cielo",
        answer: "BABEL",
      },
      {
        letter: "C",
        question: "Tierra prometida que fluye leche y miel",
        answer: "CANAÁN",
      },
      {
        letter: "D",
        question: "Ciudad del rey David, también llamada Ciudad de David",
        answer: "JERUSALEM",
      },
      {
        letter: "E",
        question: "País donde los israelitas fueron esclavos por 400 años",
        answer: "EGIPTO",
      },
      {
        letter: "F",
        question: "Río que pasaba por el Jardín del Edén",
        answer: "PISÓN",
      },
      {
        letter: "G",
        question: "Región donde los israelitas vivieron durante el exilio",
        answer: "GALILEA",
      },
      {
        letter: "H",
        question: "Monte donde Moisés recibió los Diez Mandamientos",
        answer: "HOREB",
      },
      {
        letter: "I",
        question: "Tierra prometida a Abraham y su descendencia",
        answer: "ISRAEL",
      },
      {
        letter: "J",
        question: "Río donde Juan el Bautista bautizaba",
        answer: "JORDÁN",
      },
      {
        letter: "K",
        question: "Valle donde David venció a Goliat",
        answer: "ELA",
      },
      {
        letter: "L",
        question: "Lugar donde Moisés vio la zarza ardiente",
        answer: "HOREB",
      },
      {
        letter: "M",
        question: "Desierto donde los israelitas vagaron 40 años",
        answer: "SINAÍ",
      },
      {
        letter: "N",
        question: "Ciudad donde Jesús creció en su infancia",
        answer: "NAZARET",
      },
      {
        letter: "Ñ",
        question:
          "Contiene Ñ. Montaña donde Moisés murió viendo la tierra prometida",
        answer: "NEBO",
        contains: true,
      },
      {
        letter: "O",
        question: "Monte donde Abraham iba a sacrificar a Isaac",
        answer: "MORIAH",
      },
      {
        letter: "P",
        question: "Tierra de los filisteos, enemigos de Israel",
        answer: "FILISTEA",
      },
      {
        letter: "Q",
        question: "Lugar donde los israelitas acamparon en el desierto",
        answer: "CADES",
      },
      {
        letter: "R",
        question: "Mar que Moisés dividió para que pasara Israel",
        answer: "ROJO",
      },
      {
        letter: "S",
        question: "Ciudades malvadas destruidas por fuego del cielo",
        answer: "SODOMA",
      },
      {
        letter: "T",
        question: "Templo construido por Salomón en Jerusalén",
        answer: "TEMPLO",
      },
      {
        letter: "U",
        question: "Ciudad de los caldeos de donde salió Abraham",
        answer: "UR",
      },
      {
        letter: "V",
        question: "Valle donde Ezequiel vio los huesos secos",
        answer: "HUESOS",
      },
      {
        letter: "W",
        question: "Contiene W. Lugar de adoración (en inglés)",
        answer: "WORSHIP",
        contains: true,
      },
      {
        letter: "X",
        question: "Contiene X. Imperio que conquistó Babilonia",
        answer: "PERSIA",
        contains: true,
      },
      {
        letter: "Y",
        question: "Lugar donde Jacob puso una piedra como memorial",
        answer: "BETEL",
      },
      {
        letter: "Z",
        question: "Monte donde Jesús se transfiguró",
        answer: "HERMÓN",
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
          "Con A. Embarcación que construyó Noé para salvarse del diluvio",
        answer: "ARCA",
      },
      {
        letter: "B",
        question: "Con B. Ceremonia de inmersión en agua que practicó Juan",
        answer: "BAUTISMO",
      },
      {
        letter: "C",
        question:
          "Con C. Evento donde Jesús murió en una cruz por nuestros pecados",
        answer: "CRUCIFIXIÓN",
      },
      {
        letter: "D",
        question:
          "Con D. Gran inundación que cubrió toda la tierra en tiempos de Noé",
        answer: "DILUVIO",
      },
      {
        letter: "E",
        question: "Con E. Salida de los israelitas de la esclavitud en Egipto",
        answer: "ÉXODO",
      },
      {
        letter: "F",
        question: "Con F. Columna que guiaba a Israel de noche en el desierto",
        answer: "FUEGO",
      },
      {
        letter: "G",
        question: "Con G. Guerra donde David venció al gigante con una piedra",
        answer: "GOLIAT",
      },
      {
        letter: "H",
        question:
          "Con H. Zarza que ardía pero no se consumía donde Dios habló a Moisés",
        answer: "HOREB",
      },
      {
        letter: "I",
        question:
          "Con I. Sacrificio de animales que Dios pidió en el Antiguo Testamento",
        answer: "HOLOCAUSTO",
      },
      {
        letter: "J",
        question: "Con J. Día de reposo y descanso instituido por Dios",
        answer: "SÁBADO",
      },
      {
        letter: "K",
        question: "Contiene K. Lugar santo donde estaba el Arca del Pacto",
        answer: "SANTUARIO",
        contains: true,
      },
      {
        letter: "L",
        question:
          "Con L. Enfermedad de la piel que Jesús sanó en muchas ocasiones",
        answer: "LEPRA",
      },
      {
        letter: "M",
        question: "Con M. Comida que Dios proveyó del cielo en el desierto",
        answer: "MANÁ",
      },
      {
        letter: "N",
        question: "Con N. Nuevo pacto establecido por Jesucristo",
        answer: "NUEVO",
      },
      {
        letter: "Ñ",
        question: "Con Ñ. Señal del pacto que Dios puso en las nubes",
        answer: "ARCOÍRIS",
      },
      {
        letter: "O",
        question: "Con O. Sacrificio que Abel ofreció a Dios y fue acepto",
        answer: "OFRENDA",
      },
      {
        letter: "P",
        question:
          "Con P. Primera festividad instituida cuando Israel salió de Egipto",
        answer: "PASCUA",
      },
      {
        letter: "Q",
        question:
          "Con Q. Acción de expresar descontento contra Dios o sus líderes",
        answer: "QUEJA",
      },
      {
        letter: "R",
        question: "Con R. Evento cuando Jesús volvió a la vida al tercer día",
        answer: "RESURRECCIÓN",
      },
      {
        letter: "S",
        question: "Con S. División milagrosa del mar para que pasara Israel",
        answer: "SEPARACIÓN",
      },
      {
        letter: "T",
        question: "Con T. Cambio de apariencia de Jesús en el monte",
        answer: "TRANSFIGURACIÓN",
      },
      {
        letter: "U",
        question: "Con U. Unión del pueblo de Dios bajo un solo pastor",
        answer: "UNIDAD",
      },
      {
        letter: "V",
        question:
          "Con V. Regreso de Jesús a la vida, también llamado resurrección",
        answer: "VIDA",
      },
      {
        letter: "W",
        question:
          "Contiene W. Milagro de Jesús caminando sobre las aguas (en inglés: walking)",
        answer: "WALKING",
        contains: true,
      },
      {
        letter: "X",
        question: "Contiene X. Liberación del pueblo de Israel del exilio",
        answer: "ÉXODO",
        contains: true,
      },
      {
        letter: "Y",
        question: "Con Y. Día de expiación en el calendario judío",
        answer: "YOM",
      },
      {
        letter: "Z",
        question: "Con Z. Viento fuerte que Dios envió para secar el mar",
        answer: "VIENTO",
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
        question: "Con A. Caja sagrada que contenía las tablas de la ley",
        answer: "ARCA",
      },
      {
        letter: "B",
        question: "Con B. Libro sagrado que contiene la Palabra de Dios",
        answer: "BIBLIA",
      },
      {
        letter: "C",
        question: "Con C. Instrumento de madera donde murió Jesús",
        answer: "CRUZ",
      },
      {
        letter: "D",
        question: "Con D. Moneda pequeña que dio la viuda pobre como ofrenda",
        answer: "DENARIO",
      },
      {
        letter: "E",
        question: "Con E. Armadura espiritual que Pablo menciona en Efesios",
        answer: "ESCUDO",
      },
      {
        letter: "F",
        question: "Con F. Recipiente donde Dios conservó el maná en el arca",
        answer: "FRASCO",
      },
      {
        letter: "G",
        question: "Con G. Corona que pusieron en la cabeza de Jesús",
        answer: "ESPINAS",
      },
      {
        letter: "H",
        question: "Con H. Instrumento musical de cuerdas que tocaba David",
        answer: "ARPA",
      },
      {
        letter: "I",
        question: "Con I. Quemador de perfumes usado en el templo",
        answer: "INCENSARIO",
      },
      {
        letter: "J",
        question: "Con J. Vasija de barro que usó Gedeón en la batalla",
        answer: "JARRO",
      },
      {
        letter: "K",
        question:
          "Contiene K. Instrumento musical de percusión mencionado en los Salmos",
        answer: "PANDERO",
        contains: true,
      },
      {
        letter: "L",
        question:
          "Con L. Fuente de aceite que mantenía encendida la luz del templo",
        answer: "LÁMPARA",
      },
      {
        letter: "M",
        question: "Con M. Piedras que cayeron del cielo como juicio de Dios",
        answer: "METEORITOS",
      },
      {
        letter: "N",
        question: "Con N. Embarcación donde Jesús durmió durante la tormenta",
        answer: "NAVE",
      },
      {
        letter: "Ñ",
        question: "Contiene Ñ. Señal en el cielo del pacto de Dios con Noé",
        answer: "ARCOÍRIS",
        contains: true,
      },
      {
        letter: "O",
        question:
          "Con O. Metal precioso usado para hacer los utensilios del templo",
        answer: "ORO",
      },
      {
        letter: "P",
        question: "Con P. Pan sin levadura que comían en la Pascua",
        answer: "PAN",
      },
      {
        letter: "Q",
        question: "Con Q. Perfume costoso que María derramó sobre Jesús",
        answer: "QUILOS",
      },
      {
        letter: "R",
        question:
          "Con R. Vestidura que echaron suertes por ella al pie de la cruz",
        answer: "ROPA",
      },
      {
        letter: "S",
        question:
          "Con S. Serpiente de bronce que Moisés levantó en el desierto",
        answer: "SERPIENTE",
      },
      {
        letter: "T",
        question: "Con T. Cubierta del lugar santísimo hecha de pieles",
        answer: "TOLDO",
      },
      {
        letter: "U",
        question: "Con U. Recipiente para ungir con aceite sagrado",
        answer: "UNGÜENTARIO",
      },
      {
        letter: "V",
        question: "Con V. Cortina que se rasgó cuando Jesús murió",
        answer: "VELO",
      },
      {
        letter: "W",
        question:
          "Contiene W. Agua que Jesús convirtió en vino (en inglés: water)",
        answer: "WATER",
        contains: true,
      },
      {
        letter: "X",
        question:
          "Contiene X. Instrumento musical de percusión (xilófono bíblico)",
        answer: "CÍMBALOS",
        contains: true,
      },
      {
        letter: "Y",
        question: "Con Y. Yugo que Jesús dijo que era suave",
        answer: "YUGO",
      },
      {
        letter: "Z",
        question: "Con Z. Calzado que Juan el Bautista no era digno de desatar",
        answer: "ZAPATOS",
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
        question: "Con A. Apóstol que negó a Jesús tres veces antes de la crucifixión",
        answer: "ANDRÉS",
      },
      {
        letter: "B",
        question: "Con B. Lugar donde Jesús nació según los evangelios",
        answer: "BELÉN",
      },
      {
        letter: "C",
        question: "Con C. Apóstol que dudó de la resurrección hasta ver las heridas",
        answer: "TOMÁS",
      },
      {
        letter: "D",
        question: "Con D. Uno de los doce apóstoles, también llamado Judas (no Iscariote)",
        answer: "TADEO",
      },
      {
        letter: "E",
        question: "Con E. Evangelista que escribió el libro del Apocalipsis",
        answer: "JUAN",
      },
      {
        letter: "F",
        question: "Con F. Hijo de Zebedeo, hermano de Juan, uno de los doce",
        answer: "FELIPE",
      },
      {
        letter: "G",
        question: "Con G. Región donde Jesús realizó gran parte de su ministerio",
        answer: "GALILEA",
      },
      {
        letter: "H",
        question: "Con H. Rey que mandó matar a los niños menores de dos años",
        answer: "HERODES",
      },
      {
        letter: "I",
        question: "Con I. Apóstol que traicionó a Jesús por treinta monedas",
        answer: "JUDAS",
      },
      {
        letter: "J",
        question: "Con J. Discípulo amado, escribió el cuarto evangelio",
        answer: "JUAN",
      },
      {
        letter: "K",
        question: "Contiene K. Lugar donde Jesús fue bautizado por Juan",
        answer: "JORDÁN",
        contains: true,
      },
      {
        letter: "L",
        question: "Con L. Amigo de Jesús que resucitó después de cuatro días muerto",
        answer: "LÁZARO",
      },
      {
        letter: "M",
        question: "Con M. Madre de Jesús, virgen cuando concibió por el Espíritu Santo",
        answer: "MARÍA",
      },
      {
        letter: "N",
        question: "Con N. Ciudad donde Jesús creció en su juventud",
        answer: "NAZARET",
      },
      {
        letter: "Ñ",
        question: "Contiene Ñ. Tipo de enseñanza que usaba Jesús con historias",
        answer: "PARÁBOLA",
        contains: true,
      },
      {
        letter: "O",
        question: "Con O. Monte donde Jesús enseñó las bienaventuranzas",
        answer: "OLIVOS",
      },
      {
        letter: "P",
        question: "Con P. Primer nombre del apóstol Pedro antes de seguir a Jesús",
        answer: "SIMÓN",
      },
      {
        letter: "Q",
        question: "Con Q. Lo que Jesús hizo cuando resucitó: permanecer o quedarse",
        answer: "QUEDAR",
      },
      {
        letter: "R",
        question: "Con R. Evento cuando Jesús volvió a la vida al tercer día",
        answer: "RESURRECCIÓN",
      },
      {
        letter: "S",
        question: "Con S. Apóstol que fue pescador y recibió las llaves del reino",
        answer: "SIMÓN",
      },
      {
        letter: "T",
        question: "Con T. Apóstol conocido como 'el mellizo' que dudó de la resurrección",
        answer: "TOMÁS",
      },
      {
        letter: "U",
        question: "Con U. Acción de ungir con aceite que realizaron con Jesús",
        answer: "UNCIÓN",
      },
      {
        letter: "V",
        question: "Con V. Lugar donde Jesús convirtió el agua en vino",
        answer: "CANÁ",
      },
      {
        letter: "W",
        question: "Contiene W. Lugar donde adoraban en el templo (en inglés)",
        answer: "WORSHIP",
        contains: true,
      },
      {
        letter: "X",
        question: "Contiene X. Sufrimiento que Jesús experimentó en la cruz",
        answer: "CRUCIFIXIÓN",
        contains: true,
      },
      {
        letter: "Y",
        question: "Con Y. Nombre de Dios en el Nuevo Testamento (Yahvé)",
        answer: "YAHVÉ",
      },
      {
        letter: "Z",
        question: "Con Z. Hijo de Zebedeo, uno de los doce apóstoles",
        answer: "ZEBEDEO",
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
        question: "Con A. Profeta que predijo la venida del Mesías, autor de un libro profético",
        answer: "ISAÍAS",
      },
      {
        letter: "B",
        question: "Con B. Profeta que fue tragado por un gran pez por tres días",
        answer: "JONÁS",
      },
      {
        letter: "C",
        question: "Con C. Libro que registra las genealogías y eventos históricos de Israel",
        answer: "CRÓNICAS",
      },
      {
        letter: "D",
        question: "Con D. Libro donde se registran las leyes dadas por Moisés",
        answer: "DEUTERONOMIO",
      },
      {
        letter: "E",
        question: "Con E. Profeta que fue llevado al cielo en un carro de fuego",
        answer: "ELÍAS",
      },
      {
        letter: "F",
        question: "Con F. Libro que cuenta la historia de una mujer moabita fiel",
        answer: "RUT",
      },
      {
        letter: "G",
        question: "Con G. Primer libro de la Biblia que narra la creación",
        answer: "GÉNESIS",
      },
      {
        letter: "H",
        question: "Con H. Profeta menor que profetizó sobre el amor de Dios hacia Israel infiel",
        answer: "OSEAS",
      },
      {
        letter: "I",
        question: "Con I. Profeta que tuvo visiones del templo celestial y la gloria de Dios",
        answer: "ISAÍAS",
      },
      {
        letter: "J",
        question: "Con J. Profeta joven que fue llamado antes de nacer",
        answer: "JEREMÍAS",
      },
      {
        letter: "K",
        question: "Contiene K. Libro de sabiduría escrito principalmente por Salomón",
        answer: "PROVERBIOS",
        contains: true,
      },
      {
        letter: "L",
        question: "Con L. Libro poético que expresa dolor y lamento por Jerusalén",
        answer: "LAMENTACIONES",
      },
      {
        letter: "M",
        question: "Con M. Último profeta del Antiguo Testamento",
        answer: "MALAQUÍAS",
      },
      {
        letter: "N",
        question: "Con N. Profeta que predijo la destrucción de Nínive",
        answer: "NAHÚM",
      },
      {
        letter: "Ñ",
        question: "Contiene Ñ. Época cuando Israel no tenía rey y cada uno hacía lo que bien le parecía",
        answer: "JUECES",
        contains: true,
      },
      {
        letter: "O",
        question: "Con O. Profeta menor que profetizó sobre el amor de Dios",
        answer: "OSEAS",
      },
      {
        letter: "P",
        question: "Con P. Libro de himnos y cánticos escritos principalmente por David",
        answer: "SALMOS",
      },
      {
        letter: "Q",
        question: "Con Q. Libro que muestra la vanidad de la vida sin Dios",
        answer: "ECLESIASTÉS",
      },
      {
        letter: "R",
        question: "Con R. Libro que narra el regreso del exilio babilónico",
        answer: "ESDRAS",
      },
      {
        letter: "S",
        question: "Con S. Profeta que ungió a David como rey de Israel",
        answer: "SAMUEL",
      },
      {
        letter: "T",
        question: "Con T. Libro donde Job cuestiona el sufrimiento del justo",
        answer: "JOB",
      },
      {
        letter: "U",
        question: "Con U. Profeta que interpretó sueños en la corte de Babilonia",
        answer: "DANIEL",
      },
      {
        letter: "V",
        question: "Con V. Libro que narra las victorias del pueblo de Dios sobre sus enemigos",
        answer: "JOSUÉ",
      },
      {
        letter: "W",
        question: "Contiene W. Libro de sabiduría que incluye proverbios (en inglés: wisdom)",
        answer: "WISDOM",
        contains: true,
      },
      {
        letter: "X",
        question: "Contiene X. Libro que narra la salida de Egipto",
        answer: "ÉXODO",
        contains: true,
      },
      {
        letter: "Y",
        question: "Con Y. Nombre hebreo de Dios revelado a Moisés",
        answer: "YAHVÉ",
      },
      {
        letter: "Z",
        question: "Con Z. Profeta que tuvo visiones durante el exilio babilónico",
        answer: "ZACARÍAS",
      },
    ],
  },
];
