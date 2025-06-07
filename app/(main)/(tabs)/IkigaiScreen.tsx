import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated } from "react-native";

const CIRCLES = [
  { id: 1, label: "Lo que amas", description: "Aquello que te apasiona profundamente." },
  { id: 2, label: "En lo que eres bueno", description: "Tus talentos naturales y habilidades." },
  { id: 3, label: "Por lo que te pueden pagar", description: "Tus oportunidades profesionales." },
  { id: 4, label: "Lo que el mundo necesita", description: "Tu impacto en la sociedad." },
];

export default function IkigaiScreen() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      {CIRCLES.map((circle) => (
        <TouchableWithoutFeedback key={circle.id} onPress={() => setActive(circle.id)}>
          <View
            style={[
              styles.circle,
              active === circle.id && styles.activeCircle
            ]}
          >
            <Text style={styles.label}>{circle.label}</Text>
            {active === circle.id && <Text style={styles.description}>{circle.description}</Text>}
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 40,
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#CBD3FF",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  activeCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#94A9FF",
  },
  label: {
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    marginTop: 10,
    fontSize: 12,
    color: "#555",
    textAlign: "center",
  },
});
