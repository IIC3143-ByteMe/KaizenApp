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
  SafeAreaView,
} from "react-native";
import PrimaryButton from "@components/utils/PrimaryButton";

interface Props {
  values: {
    you_love: string;
    good_at: string;
    world_needs: string;
    is_profitable: string;
  };
  onChange: (values: {
    you_love: string;
    good_at: string;
    world_needs: string;
    is_profitable: string;
  }) => void;
  onSubmit: () => void;
}

export default function IkigaiDescriptionForm({ values, onChange, onSubmit }: Props) {

  const handleSubmit = () => {
    Keyboard.dismiss();
    onSubmit();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
                  value={values.you_love}
                  onChangeText={(text) => onChange({ ...values, you_love: text })}
                  multiline
                />
                <TextInput
                  style={styles.input}
                  placeholder="¿En qué eres bueno/a?"
                  value={values.good_at}
                  onChangeText={(text) => onChange({ ...values, good_at: text })}
                  multiline
                />
                <TextInput
                  style={styles.input}
                  placeholder="¿Qué necesita el mundo?"
                  value={values.world_needs}
                  onChangeText={(text) => onChange({ ...values, world_needs: text })}
                  multiline
                />
                <TextInput
                  style={styles.input}
                  placeholder="¿Por qué te pueden pagar?"
                  value={values.is_profitable}
                  onChangeText={(text) => onChange({ ...values, is_profitable: text })}
                  multiline
                />
              </View>

              <PrimaryButton
                label="Guardar y continuar"
                onPress={handleSubmit}
              />
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
