import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface Props {
  title: string;
  explanation: string;
  examples: string[];
  onContinue: () => void;
  onBack?: () => void;
}

export default function IkigaiGuidedInfoStep({
  title,
  explanation,
  examples,
  onContinue,
  onBack,
}: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.paragraph}>{explanation}</Text>

          <Text style={styles.subTitle}>Ejemplos:</Text>
          {examples.map((ex, i) => (
            <Text key={i} style={styles.example}>
              • {ex}
            </Text>
          ))}
        </ScrollView>

        <View style={styles.buttonRow}>
          {onBack && (
            <TouchableOpacity style={[styles.button, styles.buttonHalf]} onPress={onBack}>
              <Text style={styles.label}>‹ Volver</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={[styles.button, styles.buttonHalf]} onPress={onContinue}>
            <Text style={styles.label}>Continuar ›</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  wrapper: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 48,
    paddingTop: 150,
    paddingBottom: 150,
  },
  scroll: {
    paddingTop: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 48,
  },
  paragraph: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 48,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  example: {
    fontSize: 15,
    marginBottom: 8,
    color: "#444",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  button: {
    backgroundColor: "#94A9FF",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    elevation: 3,
    flex: 1,
  },
  buttonHalf: {
    flex: 1,
  },
  label: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
