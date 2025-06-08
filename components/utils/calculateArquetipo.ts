import { Arquetipo } from "@components/ikigai-quiz/quizQuestions";

export function calculateArquetipo(answers: Arquetipo[]): Arquetipo {
  const counts: Record<Arquetipo, number> = {
    constante: 0,
    explorador: 0,
    social: 0,
    reflexivo: 0,
  };

  answers.forEach((arq) => {
    counts[arq]++;
  });

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  return sorted[0][0] as Arquetipo;
}
