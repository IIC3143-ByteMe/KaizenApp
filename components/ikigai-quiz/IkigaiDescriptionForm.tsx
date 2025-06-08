import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import PrimaryButton from "@components/utils/PrimaryButton";

interface Props {
  values: {
    amas: string;
    bueno: string;
    necesita: string;
    pagar: string;
  };
  onChange: (values: {
    amas: string;
    bueno: string;
    necesita: string;
    pagar: string;
  }) => void;
  onSubmit: () => void;
}

export default function IkigaiDescriptionForm({ values, onChange, onSubmit }: Props) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.wrapper}>
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Completa tu Ikigai</Text>

            <View style={styles.inputsContainer}>
              <TextInput
                style={styles.input}
                placeholder="¿Qué amas?"
                value={values.amas}
                onChangeText={(text) => onChange({ ...values, amas: text })}
                multiline
              />
              <TextInput
                style={styles.input}
                placeholder="¿En qué eres bueno/a?"
                value={values.bueno}
                onChangeText={(text) => onChange({ ...values, bueno: text })}
                multiline
              />
              <TextInput
                style={styles.input}
                placeholder="¿Qué necesita el mundo?"
                value={values.necesita}
                onChangeText={(text) => onChange({ ...values, necesita: text })}
                multiline
              />
              <TextInput
                style={styles.input}
                placeholder="¿Por qué te pueden pagar?"
                value={values.pagar}
                onChangeText={(text) => onChange({ ...values, pagar: text })}
                multiline
              />
            </View>

            <PrimaryButton
              label="Guardar y continuar"
              onPress={onSubmit}
            />
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 36,
    textAlign: "center",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    elevation: 2,
    textAlignVertical: "top",
    minHeight: 60,
  },
  inputsContainer: {
    marginBottom: 36,
  },
});
