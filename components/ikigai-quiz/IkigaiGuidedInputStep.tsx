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
      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.title}>{prompt}</Text>

          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder={placeholder}
            placeholderTextColor="#888"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </ScrollView>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.buttonHalf]} onPress={onBack}>
            <Text style={styles.label}>‹ Volver</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonHalf]}
            onPress={() => {
              onChange(input.trim());
              onContinue();
            }}
          >
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
  input: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 150,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 48,
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
