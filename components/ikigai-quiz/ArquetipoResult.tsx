import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import PrimaryButton from "@components/utils/PrimaryButton";
import { ARQUETIPO_DATA } from "@components/utils/arquetipoData";

interface Props {
  arquetipo: "constante" | "explorador" | "social" | "reflexivo";
  onContinue: () => void;
}

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
