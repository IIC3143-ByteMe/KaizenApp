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
  onStart: () => void;
}

export default function IkigaiIntroStep({ onStart }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>¿Qué es el Ikigai?</Text>
        <Text style={styles.paragraph}>El Ikigai es tu razón de ser.</Text>
        <Text style={styles.paragraph}>
          Representa el punto de unión entre lo que amas, lo que se te da bien,
          lo que el mundo necesita y por lo que pueden pagarte.
        </Text>
        <Text style={styles.paragraph}>
          Los puntos de unión representan PASIÓN, MISIÓN, VOCACIÓN Y
          PROFESIÓN.
        </Text>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button} onPress={onStart}>
            <Text style={styles.buttonText}>Descubramos tu IKIGAI</Text>
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
    paddingHorizontal: 24,
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
