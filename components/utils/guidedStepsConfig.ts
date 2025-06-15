type IkigaiKey = "amas" | "bueno" | "necesita" | "pagar";

export const guidedSteps: {
  type: "info" | "input";
  key: IkigaiKey;
  title?: string;
  explanation?: string;
  examples?: string[];
  prompt?: string;
  placeholder?: string;
}[] = [
  {
    type: "info",
    key: "amas",
    title: "Lo que amas",
    explanation: "Piensa en actividades que disfrutas tanto que se te pasa el tiempo volando.",
    examples: ["Me encanta tocar música en vivo", "Disfruto escribir sobre mis experiencias", "Me llena cocinar para amigos"],
  },
  {
    type: "input",
    key: "amas",
    prompt: "Cuéntanos, ¿qué amas hacer?",
    placeholder: "Ej: Me encanta cocinar para otros, leer sobre historia, bailar...",
  },
  {
    type: "info",
    key: "bueno",
    title: "En lo que eres bueno",
    explanation: "Piensa en talentos, habilidades o cosas que los demás suelen decirte que haces bien.",
    examples: ["Explicar ideas complejas", "Escuchar a otras personas", "Resolver problemas técnicos"],
  },
  {
    type: "input",
    key: "bueno",
    prompt: "¿En qué cosas sientes que eres bueno/a?",
    placeholder: "Ej: Enseñar, dibujar, organizar, liderar, aprender rápido...",
  },
  {
    type: "info",
    key: "necesita",
    title: "Lo que el mundo necesita",
    explanation: "Piensa en causas que te conmueven o problemas que te gustaría ayudar a resolver.",
    examples: ["Apoyar la educación para todos", "Conciencia ambiental", "Acceso a la salud mental"],
  },
  {
    type: "input",
    key: "necesita",
    prompt: "¿Qué necesita el mundo desde tu mirada?",
    placeholder: "Ej: Más empatía, soluciones climáticas, educación inclusiva...",
  },
  {
    type: "info",
    key: "pagar",
    title: "Por lo que te pueden pagar",
    explanation: "Piensa en habilidades o trabajos que podrían tener valor económico.",
    examples: ["Diseño gráfico", "Programación", "Dar clases o talleres"],
  },
  {
    type: "input",
    key: "pagar",
    prompt: "¿Por qué cosas podrías cobrar?",
    placeholder: "Ej: Traducción, fotografía, programación, ventas...",
  },
];
