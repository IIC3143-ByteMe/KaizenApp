import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  onStart: () => void;
}

export default function IkigaiIntroStep({ onStart }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Qué es el Ikigai?</Text>
      <Text style={styles.paragraph}>
        El Ikigai es tu razón de ser. 
      </Text>
      <Text style={styles.paragraph}>
        Representa el punto de unión entre lo que amas,
        lo que se te da bien, lo que el mundo necesita y por lo que pueden pagarte.
      </Text>
      <Text style={styles.paragraph}>
        Los puntos de unión representan PASIÓN, MISIÓN, VOCACIÓN Y PROFESIÓN.
      </Text>
      <TouchableOpacity style={styles.button} onPress={onStart}>
        <Text style={styles.buttonText}>Descubramos tu IKIGAI</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#F6F6F6",
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
