export type Arquetipo = "constante" | "explorador" | "social" | "reflexivo";

export interface QuizQuestion {
  question: string;
  options: {
    label: string;
    arquetipo: Arquetipo;
  }[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: "Cuando quiero incorporar un nuevo hábito...",
    options: [
      { label: "Prefiero repetirlo todos los días a la misma hora.", arquetipo: "constante" },
      { label: "Me gusta probarlo de diferentes formas hasta encontrar la que me acomode.", arquetipo: "explorador" },
      { label: "Me sirve comentarlo con alguien o hacerlo acompañado.", arquetipo: "social" },
      { label: "Necesito entender bien por qué quiero hacerlo antes de comprometerme.", arquetipo: "reflexivo" },
    ],
  },
  {
    question: "Lo que más me cuesta al formar un hábito es...",
    options: [
      { label: "Ser constante cuando no tengo una rutina clara.", arquetipo: "constante" },
      { label: "No aburrirme de hacer siempre lo mismo.", arquetipo: "explorador" },
      { label: "Mantenerme motivado/a cuando estoy solo/a.", arquetipo: "social" },
      { label: "Sentirme conectado/a con el hábito si no le veo un propósito.", arquetipo: "reflexivo" },
    ],
  },
  {
    question: "Si tuviera una app de hábitos, me gustaría que...",
    options: [
      { label: "Me recuerde hacerlo todos los días a la misma hora.", arquetipo: "constante" },
      { label: "Me sugiera nuevas formas o retos semanales.", arquetipo: "explorador" },
      { label: "Me permita compartir mis avances o competir con otros.", arquetipo: "social" },
      { label: "Me ayude a reflexionar sobre cómo este hábito me transforma.", arquetipo: "reflexivo" },
    ],
  },
  {
    question: "Cuando empiezo algo nuevo, normalmente...",
    options: [
      { label: "Armo un plan o rutina desde el día uno.", arquetipo: "constante" },
      { label: "Improviso y lo voy adaptando según lo que siento.", arquetipo: "explorador" },
      { label: "Busco apoyo en alguien o en una comunidad.", arquetipo: "social" },
      { label: "Reflexiono si esto está alineado con mis valores o metas.", arquetipo: "reflexivo" },
    ],
  },
  {
    question: "¿Cómo reaccionas si fallas un día en tu hábito?",
    options: [
      { label: "Me molesta, pero vuelvo al plan al día siguiente.", arquetipo: "constante" },
      { label: "Lo tomo como una señal de que necesito ajustar algo.", arquetipo: "explorador" },
      { label: "Me cuesta retomar si no tengo a alguien que me motive.", arquetipo: "social" },
      { label: "Me pregunto si realmente quiero seguir con ese hábito.", arquetipo: "reflexivo" },
    ],
  },
  {
    question: "¿Qué te motiva más a seguir con un hábito?",
    options: [
      { label: "Ver mi progreso acumulado y no romper mi racha.", arquetipo: "constante" },
      { label: "Sentir que estoy experimentando algo nuevo.", arquetipo: "explorador" },
      { label: "Escuchar a otros decir que les inspiro o compartir logros.", arquetipo: "social" },
      { label: "Sentirme coherente con quién quiero ser.", arquetipo: "reflexivo" },
    ],
  },
  {
    question: "En general, tú...",
    options: [
      { label: "Eres una persona estructurada y organizada.", arquetipo: "constante" },
      { label: "Tienes mucha energía creativa, pero te cuesta mantenerla.", arquetipo: "explorador" },
      { label: "Funcionas mejor con personas cerca.", arquetipo: "social" },
      { label: "Tienes un mundo interno profundo y buscas sentido.", arquetipo: "reflexivo" },
    ],
  },
  {
    question: "Si tuvieras que definir el éxito en los hábitos sería:",
    options: [
      { label: "Ser consistente día tras día.", arquetipo: "constante" },
      { label: "Adaptarte y seguir creciendo.", arquetipo: "explorador" },
      { label: "Inspirar a otros con tu ejemplo.", arquetipo: "social" },
      { label: "Transformarte desde adentro hacia afuera.", arquetipo: "reflexivo" },
    ],
  },
];
