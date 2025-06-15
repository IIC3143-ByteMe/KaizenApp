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
  onDirect: () => void;
  onGuide: () => void;
}

export default function IkigaiPathChoiceStep({ onDirect, onGuide }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>¿Cómo quieres completar tu Ikigai?</Text>

        <Text style={styles.paragraph}>
          Puedes rellenarlo directamente si ya tienes claras tus respuestas,
          o recibir una guía paso a paso que te ayudará a reflexionar sobre
          cada sección.
        </Text>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button} onPress={onDirect}>
            <Text style={styles.buttonText}>Rellenar directamente</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={onGuide}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              Quiero una guía paso a paso
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 48,
    paddingBottom: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 32,
  },
  buttonWrapper: {
    gap: 16,
  },
  button: {
    backgroundColor: "#94A9FF",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#94A9FF",
  },
  secondaryButtonText: {
    color: "#94A9FF",
  },
});
