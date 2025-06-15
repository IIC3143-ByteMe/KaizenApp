import React, { useState } from "react";
import { View, StyleSheet, Alert, Text } from "react-native";
import IkigaiIntroStep from "@components/ikigai-quiz/IkigaiIntroStep";
import QuizStep from "@components/ikigai-quiz/QuizStep";
import IkigaiDescriptionForm from "@components/ikigai-quiz/IkigaiDescriptionForm";
import ArquetipoResult from "@components/ikigai-quiz/ArquetipoResult";
import IkigaiPathChoiceStep from "@components/ikigai-quiz/IkigaiPathChoiceStep";
import IkigaiGuidedInfoStep from "@components/ikigai-quiz/IkigaiGuidedInfoStep";
import IkigaiGuidedInputStep from "@components/ikigai-quiz/IkigaiGuidedInputStep";
import { guidedSteps } from "@components/utils/guidedStepsConfig";

import { setQuizDone, saveIkigai } from "@services/ikigaiStorage";
import { useRouter } from "expo-router";
import { calculateArquetipo } from "@components/utils/calculateArquetipo";
import { quizQuestions, Arquetipo } from "@components/ikigai-quiz/quizQuestions";

type IkigaiKey = "amas" | "bueno" | "necesita" | "pagar";

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
  const [useGuide, setUseGuide] = useState<boolean>(false);
  const [guidedStep, setGuidedStep] = useState<number>(0);

  const handleAnswer = (value: string) => {
    const updated = [...answers];
    updated[step - 1] = value;
    setAnswers(updated);
  };

  const handleContinue = () => {
    if (step === quizQuestions.length) {
      const result = calculateArquetipo(answers as Arquetipo[]);
      setShowArquetipo(result);
    }
    setStep(step + 1);
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

  const handleGuidedSubmit = async () => {
    const arquetipo = calculateArquetipo(answers as Arquetipo[]);
    try {
      await saveIkigai({ ...ikigaiData, arquetipo });
      await setQuizDone();
      router.replace("/(main)/(tabs)/HomeScreen");
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al guardar tu información.");
    }
  };

  const currentGuided = guidedSteps[guidedStep];

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
          onContinue={handleContinue}
        />
      )}

      {showArquetipo && step === quizQuestions.length + 1 && (
        <ArquetipoResult arquetipo={showArquetipo} onContinue={() => setStep(step + 1)} />
      )}

      {step === quizQuestions.length + 2 && (
        <IkigaiPathChoiceStep
          onDirect={() => setStep(step + 1)}
          onGuide={() => {
            setUseGuide(true);
            setStep(step + 1);
          }}
        />
      )}

      {useGuide && step > quizQuestions.length + 2 && currentGuided && (
        currentGuided.type === "info" ? (
          <IkigaiGuidedInfoStep
            title={currentGuided.title!}
            explanation={currentGuided.explanation!}
            examples={currentGuided.examples!}
            onContinue={() => setGuidedStep(guidedStep + 1)}
            onBack={guidedStep > 0 ? () => setGuidedStep(guidedStep - 1) : undefined}
          />
        ) : (
          <IkigaiGuidedInputStep
            value={ikigaiData[currentGuided.key as IkigaiKey]}
            prompt={currentGuided.prompt!}
            placeholder={currentGuided.placeholder!}
            onChange={(val) =>
              setIkigaiData({ ...ikigaiData, [currentGuided.key as IkigaiKey]: val })
            }
            onContinue={() => setGuidedStep(guidedStep + 1)}
            onBack={() => setGuidedStep(guidedStep - 1)}
          />
        )
      )}

      {useGuide && step > quizQuestions.length + 2 && guidedStep >= guidedSteps.length && (
        <IkigaiDescriptionForm
          values={ikigaiData}
          onChange={setIkigaiData}
          onSubmit={handleGuidedSubmit}
        />
      )}

      {!useGuide && step > quizQuestions.length + 2 && (
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
