import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import PrimaryButton from "@components/utils/PrimaryButton";

interface Props {
  arquetipo: "constante" | "explorador" | "social" | "reflexivo";
  onContinue: () => void;
}

const ARQUETIPO_DATA = {
  constante: {
    title: "🧱 El Constante",
    phrase: "“Me funciona tener una rutina clara y repetirla todos los días.”",
    description: [
      "Necesita estructura y previsibilidad.",
      "Prefiere hábitos diarios fijos y sencillos.",
      "Es disciplinado pero puede caer en rigidez.",
      "🧠 Ideal para: checklists diarias, recordatorios fijos.",
    ],
  },
  explorador: {
    title: "🌀 El Explorador",
    phrase: "“Me cuesta mantener lo mismo mucho tiempo, necesito variedad.”",
    description: [
      "Se aburre con la repetición.",
      "Necesita cambios y estímulos para mantenerse motivado.",
      "Aprende mejor probando cosas nuevas.",
      "🧠 Ideal para: hábitos rotativos, logros semanales, desafíos sorpresa.",
    ],
  },
  social: {
    title: "🫂 El Social",
    phrase: "“Me ayuda compartir mis avances o tener compañía.”",
    description: [
      "Se motiva con comunidad o reconocimiento.",
      "Le importa el feedback externo.",
      "Puede abandonar si se siente solo/a o sin apoyo.",
      "🧠 Ideal para: compartir logros, “racha compartida”, mini comunidad.",
    ],
  },
  reflexivo: {
    title: "🔍 El Reflexivo",
    phrase: "“Necesito entender el por qué antes de comprometerme.”",
    description: [
      "Le gusta conectar hábitos con un propósito.",
      "Disfruta ver el progreso en gráficos o en diarios.",
      "Se abruma con exceso de reglas externas.",
      "🧠 Ideal para: espacio de reflexión, visualización de avances, journaling.",
    ],
  },
};

export default function ArquetipoResult({ arquetipo, onContinue }: Props) {
  const data = ARQUETIPO_DATA[arquetipo];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.phrase}>{data.phrase}</Text>
        {data.description.map((line, idx) => (
          <Text key={idx} style={styles.description}>
            {line}
          </Text>
        ))}
        <View style={styles.buttonWrapper}>
          <PrimaryButton label="Continuar" onPress={onContinue} />
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
    padding: 45,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  phrase: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#555",
    marginBottom: 24,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#444",
    textAlign: "left",
    marginBottom: 16,
  },
  buttonWrapper: {
    marginTop: 32,
  },
});
