import { hasDoneQuiz } from "@services/ikigaiStorage";
import { Router } from "expo-router";

export const redirectAfterAuth = async (router: Router) => {
  const done = await hasDoneQuiz();

  if (done) {
    router.replace("/(main)/(tabs)/HomeScreen");
  } else {
    router.replace("/(main)/ikigai-quiz/IkigaiQuizScreen");
  }
};
