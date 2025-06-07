import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import IkigaiCircle from "@components/ikigai/IkigaiCircle";

const CIRCLES = [
  { id: 1, label: "Lo que amas", description: "Aquello que te apasiona profundamente." },
  { id: 2, label: "En lo que eres bueno", description: "Tus talentos naturales y habilidades." },
  { id: 3, label: "Por lo que te pueden pagar", description: "Tus oportunidades profesionales." },
  { id: 4, label: "Lo que el mundo necesita", description: "Tu impacto en la sociedad." },
];

export default function IkigaiScreen() {
  const [active, setActive] = useState<number | null>(null);

  const toggleCircle = (id: number) => {
    setActive((prev) => (prev === id ? null : id));
  };

  return (
    <View style={styles.container}>
      {CIRCLES.map((circle) => (
        <IkigaiCircle
          key={circle.id}
          label={circle.label}
          description={circle.description}
          active={active === circle.id}
          onPress={() => toggleCircle(circle.id)}
        />
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
});
