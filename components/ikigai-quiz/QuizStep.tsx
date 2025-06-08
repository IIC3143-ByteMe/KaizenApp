import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PrimaryButton from "@components/utils/PrimaryButton";

interface Option {
  label: string;
  arquetipo: string;
}

interface QuestionData {
  question: string;
  options: Option[];
}

interface Props {
  step: number;
  total: number;
  data: QuestionData;
  onAnswer: (value: string) => void;
}

function ContinueButton({ onPress, disabled }: { onPress: () => void; disabled: boolean }) {
  return (
    <TouchableOpacity
      style={[buttonStyles.button, disabled && buttonStyles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[buttonStyles.label, disabled && buttonStyles.labelDisabled]}>
        Continuar
      </Text>
    </TouchableOpacity>
  );
}

export default function QuizStep({ step, total, data, onAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    setSelected(null);
  }, [data]);

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  const handleContinue = () => {
    if (selected) {
      onAnswer(selected);
    }
  };

  return (
    <View style={styles.wrapper}>
      {/* Quiz title */}
      <View style={styles.header}>
        <Text style={styles.title}>Quiz</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.question}>{data.question}</Text>

        <View style={styles.optionsContainer}>
          {data.options.map((opt, index) => {
            const isSelected = selected === opt.arquetipo;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionBox,
                  isSelected && styles.optionSelected,
                ]}
                onPress={() => handleSelect(opt.arquetipo)}
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

        {/* Dots de progreso */}
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

        {/* Botón continuar */}
        <ContinueButton
          onPress={() => selected && onAnswer(selected)}
          disabled={!selected}
        />

      </View>
    </View>
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
    paddingHorizontal: 20,
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
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12,
  },
  option: {
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    elevation: 2,
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
});
