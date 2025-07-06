import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

interface Option {
  label: string;
  arquetype: string;
}

interface QuestionData {
  question: string;
  options: Option[];
}

interface Props {
  step: number;
  total: number;
  data: QuestionData;
  currentValue?: string;
  onAnswer: (value: string) => void;
  onBack?: () => void;
  onContinue: () => void;
}

export default function QuizStep({
  step,
  total,
  data,
  currentValue,
  onAnswer,
  onBack,
  onContinue,
}: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    setSelected(currentValue || null);
  }, [data, currentValue]);

  const handleSelect = (value: string) => {
    setSelected(value);
    onAnswer(value);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>Quiz</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.question}>{data.question}</Text>

        <View style={styles.optionsContainer}>
          {data.options.map((opt, index) => {
            const isSelected = selected === opt.arquetype;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionBox,
                  isSelected && styles.optionSelected,
                ]}
                onPress={() => handleSelect(opt.arquetype)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected,
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.dotsContainer}>
          {Array.from({ length: total }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === step - 1 ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonRow}>
          {onBack && (
            <TouchableOpacity
              style={[buttonStyles.button, styles.buttonHalf]}
              onPress={onBack}
            >
              <Text style={buttonStyles.label}>‹ Volver</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[
              buttonStyles.button,
              styles.buttonHalf,
              !selected && buttonStyles.buttonDisabled,
            ]}
            onPress={onContinue}
            disabled={!selected}
          >
            <Text
              style={[
                buttonStyles.label,
                !selected && buttonStyles.labelDisabled,
              ]}
            >
              Continuar ›
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: "#94A9FF",
    paddingVertical: 14,
    width: "100%",
    borderRadius: 25,
    alignItems: "center",
    elevation: 3,
    marginTop: 24,
  },
  label: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  labelDisabled: {
    color: "#888",
  },
});

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#E8EAFD",
  },
  header: {
    height: 100,
    justifyContent: "flex-end",
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 30,
    color: "#7D89FF",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  question: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 50,
    color: "#000",
    minHeight: 70,
    justifyContent: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  optionBox: {
    width: "48%",
    backgroundColor: "white",
    paddingHorizontal: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 110,
  },
  optionSelected: {
    backgroundColor: "#7D89FF",
  },
  optionText: {
    textAlign: "center",
    fontSize: 16,
    color: "#444",
  },
  optionTextSelected: {
    color: "white",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotActive: {
    backgroundColor: "#7D89FF",
  },
  dotInactive: {
    backgroundColor: "#C7C9F7",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 24,
  },
  buttonHalf: {
    flex: 1,
  },
});
