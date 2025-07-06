export type Arquetipo = "constante" | "explorador" | "social" | "reflexivo";

export interface QuizQuestion {
  question: string;
  options: {
    label: string;
    arquetype: Arquetipo;
  }[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: "Cuando quiero incorporar un nuevo hábito...",
    options: [
      { label: "Prefiero repetirlo todos los días a la misma hora.", arquetype: "constante" },
      { label: "Me gusta probarlo de diferentes formas hasta encontrar la que me acomode.", arquetype: "explorador" },
      { label: "Me sirve comentarlo con alguien o hacerlo acompañado.", arquetype: "social" },
      { label: "Necesito entender bien por qué quiero hacerlo antes de comprometerme.", arquetype: "reflexivo" },
    ],
  },
  {
    question: "Lo que más me cuesta al formar un hábito es...",
    options: [
      { label: "Ser constante cuando no tengo una rutina clara.", arquetype: "constante" },
      { label: "No aburrirme de hacer siempre lo mismo.", arquetype: "explorador" },
      { label: "Mantenerme motivado/a cuando estoy solo/a.", arquetype: "social" },
      { label: "Sentirme conectado/a con el hábito si no le veo un propósito.", arquetype: "reflexivo" },
    ],
  },
  {
    question: "Si tuviera una app de hábitos, me gustaría que...",
    options: [
      { label: "Me recuerde hacerlo todos los días a la misma hora.", arquetype: "constante" },
      { label: "Me sugiera nuevas formas o retos semanales.", arquetype: "explorador" },
      { label: "Me permita compartir mis avances o competir con otros.", arquetype: "social" },
      { label: "Me ayude a reflexionar sobre cómo este hábito me transforma.", arquetype: "reflexivo" },
    ],
  },
  {
    question: "Cuando empiezo algo nuevo, normalmente...",
    options: [
      { label: "Armo un plan o rutina desde el día uno.", arquetype: "constante" },
      { label: "Improviso y lo voy adaptando según lo que siento.", arquetype: "explorador" },
      { label: "Busco apoyo en alguien o en una comunidad.", arquetype: "social" },
      { label: "Reflexiono si esto está alineado con mis valores o metas.", arquetype: "reflexivo" },
    ],
  },
  {
    question: "¿Cómo reaccionas si fallas un día en tu hábito?",
    options: [
      { label: "Me molesta, pero vuelvo al plan al día siguiente.", arquetype: "constante" },
      { label: "Lo tomo como una señal de que necesito ajustar algo.", arquetype: "explorador" },
      { label: "Me cuesta retomar si no tengo a alguien que me motive.", arquetype: "social" },
      { label: "Me pregunto si realmente quiero seguir con ese hábito.", arquetype: "reflexivo" },
    ],
  },
  {
    question: "¿Qué te motiva más a seguir con un hábito?",
    options: [
      { label: "Ver mi progreso acumulado y no romper mi racha.", arquetype: "constante" },
      { label: "Sentir que estoy experimentando algo nuevo.", arquetype: "explorador" },
      { label: "Escuchar a otros decir que les inspiro o compartir logros.", arquetype: "social" },
      { label: "Sentirme coherente con quién quiero ser.", arquetype: "reflexivo" },
    ],
  },
  {
    question: "En general, tú...",
    options: [
      { label: "Eres una persona estructurada y organizada.", arquetype: "constante" },
      { label: "Tienes mucha energía creativa, pero te cuesta mantenerla.", arquetype: "explorador" },
      { label: "Funcionas mejor con personas cerca.", arquetype: "social" },
      { label: "Tienes un mundo interno profundo y buscas sentido.", arquetype: "reflexivo" },
    ],
  },
  {
    question: "Si tuvieras que definir el éxito en los hábitos sería:",
    options: [
      { label: "Ser consistente día tras día.", arquetype: "constante" },
      { label: "Adaptarte y seguir creciendo.", arquetype: "explorador" },
      { label: "Inspirar a otros con tu ejemplo.", arquetype: "social" },
      { label: "Transformarte desde adentro hacia afuera.", arquetype: "reflexivo" },
    ],
  },
];
