import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onContinue: () => void;
  onBack: () => void;
  prompt: string;
  placeholder: string;
}

export default function IkigaiGuidedInputStep({
  value,
  onChange,
  onContinue,
  onBack,
  prompt,
  placeholder,
}: Props) {
  const [input, setInput] = useState(value);

  useEffect(() => {
    setInput(value);
  }, [value]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{prompt}</Text>

        <TextInput
          style={styles.input}
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholder={placeholder}
          placeholderTextColor="#888"
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.secondaryButton} onPress={onBack}>
            <Text style={styles.secondaryText}>‹ Volver</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, !input.trim() && styles.buttonDisabled]}
            onPress={() => {
              onChange(input.trim());
              onContinue();
            }}
            disabled={!input.trim()}
          >
            <Text
              style={[
                styles.buttonText,
                !input.trim() && styles.disabledButtonText,
              ]}
            >
              Continuar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F6F6F6" },
  container: { flexGrow: 1, justifyContent: "center", padding: 48 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 150,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 32,
  },
  buttonRow: { flexDirection: "row", gap: 12 },
  button: {
    flex: 1,
    backgroundColor: "#94A9FF",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  disabledButtonText: {
    color: "#888",
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "#ddd",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
  },
  secondaryText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
  },
});
