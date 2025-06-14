import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import IkigaiIntroStep from "@components/ikigai-quiz/IkigaiIntroStep";
import QuizStep from "@components/ikigai-quiz/QuizStep";
import IkigaiDescriptionForm from "@components/ikigai-quiz/IkigaiDescriptionForm";
import ArquetipoResult from "@components/ikigai-quiz/ArquetipoResult";
import PrimaryButton from "@components/utils/PrimaryButton";
import { setQuizDone, saveIkigai } from "@services/ikigaiStorage";
import { useRouter } from "expo-router";
import { calculateArquetipo } from "@components/utils/calculateArquetipo";
import { quizQuestions } from "@components/ikigai-quiz/quizQuestions";
import { Arquetipo } from "@components/ikigai-quiz/quizQuestions";

export default function IkigaiQuizScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [ikigaiData, setIkigaiData] = useState({
    amas: "",
    bueno: "",
    necesita: "",
    pagar: "",
  });
  const [showArquetipo, setShowArquetipo] = useState<null | Arquetipo>(null);

  const handleAnswer = (value: string) => {
    const updated = [...answers];
    updated[step - 1] = value;
    setAnswers(updated);

    if (step === quizQuestions.length) {
      const result = calculateArquetipo(updated as Arquetipo[]);
      setShowArquetipo(result);
      setStep(step + 1);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleDescriptionSubmit = async () => {
    const arquetipo = calculateArquetipo(answers as Arquetipo[]);

    try {
      await saveIkigai({ ...ikigaiData, arquetipo });
      await setQuizDone();
      router.replace("/(main)/(tabs)/HomeScreen");
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al guardar tu información.");
    }
  };

  return (
    <View style={styles.container}>
      {step === 0 && <IkigaiIntroStep onStart={() => setStep(1)} />}

      {step > 0 && step <= quizQuestions.length && (
        <QuizStep
          step={step}
          total={quizQuestions.length}
          data={quizQuestions[step - 1]}
          currentValue={answers[step - 1]}
          onAnswer={handleAnswer}
          onBack={handleBack}
        />
      )}

      {showArquetipo && step === quizQuestions.length + 1 && (
        <ArquetipoResult arquetipo={showArquetipo} onContinue={() => setStep(step + 1)} />
      )}

      {step > quizQuestions.length + 1 && (
        <IkigaiDescriptionForm
          values={ikigaiData}
          onChange={setIkigaiData}
          onSubmit={handleDescriptionSubmit}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
