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
  onContinue: () => void;
}

export default function IkigaiGuidedStep1({ onContinue }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Vamos paso a paso</Text>

        <Text style={styles.paragraph}>
          Si aún no estás seguro de qué poner en tu Ikigai, no te preocupes.
        </Text>
        <Text style={styles.paragraph}>
          Vamos a guiarte sección por sección, con ejemplos e ideas que te
          ayudarán a reflexionar.
        </Text>
        <Text style={styles.paragraph}>
          Y recuerda: siempre vas a poder editar tus respuestas más adelante,
          cuando lo sientas necesario.
        </Text>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button} onPress={onContinue}>
            <Text style={styles.buttonText}>Comenzar</Text>
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
    marginBottom: 24,
  },
  buttonWrapper: {
    marginTop: 16,
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
});
