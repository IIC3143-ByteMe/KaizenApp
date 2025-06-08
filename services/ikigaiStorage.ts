import AsyncStorage from "@react-native-async-storage/async-storage";

type Arquetipo = "constante" | "explorador" | "social" | "reflexivo";

interface IkigaiData {
  arquetipo: Arquetipo;
  amas: string;
  bueno: string;
  necesita: string;
  pagar: string;
}

const IKIGAI_KEY = "kaizen_ikigai";
const QUIZ_DONE_KEY = "kaizen_quiz_done";

export const saveIkigai = async (ikigai: IkigaiData) => {
  await AsyncStorage.setItem(IKIGAI_KEY, JSON.stringify(ikigai));
};

export const getIkigai = async (): Promise<IkigaiData | null> => {
  const data = await AsyncStorage.getItem(IKIGAI_KEY);
  return data ? JSON.parse(data) : null;
};

export const setQuizDone = async () => {
  await AsyncStorage.setItem(QUIZ_DONE_KEY, "true");
};

export const hasDoneQuiz = async (): Promise<boolean> => {
  const flag = await AsyncStorage.getItem(QUIZ_DONE_KEY);
  return flag === "true";
};
