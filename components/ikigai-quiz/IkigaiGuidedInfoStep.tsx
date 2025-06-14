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
  onBack: () => void;
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
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.paragraph}>{explanation}</Text>

        <Text style={styles.subTitle}>Ejemplos:</Text>
        {examples.map((ex, i) => (
          <Text key={i} style={styles.example}>
            • {ex}
          </Text>
        ))}

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.secondaryButton} onPress={onBack}>
            <Text style={styles.secondaryText}>‹ Volver</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onContinue}>
            <Text style={styles.buttonText}>Continuar ›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F6F6F6" },
  container: { flexGrow: 1, justifyContent: "center", padding: 48 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 24 },
  paragraph: { fontSize: 16, color: "#555", textAlign: "center", marginBottom: 24 },
  subTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 12 },
  example: { fontSize: 15, marginBottom: 8, color: "#444" },
  buttonRow: { marginTop: 32, flexDirection: "row", gap: 12 },
  button: {
    flex: 1,
    backgroundColor: "#94A9FF",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "#ddd",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  secondaryText: { color: "#333", fontWeight: "bold", fontSize: 16 },
});
