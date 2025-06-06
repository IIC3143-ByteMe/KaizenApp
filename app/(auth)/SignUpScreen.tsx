import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  TextInput,
  Text,
} from "react-native";
import PrimaryButton from "@components/utils/PrimaryButton";
import { useRouter } from "expo-router";
import AuthHeader from "@components/auth/AuthHeader";
import { setSessionToken } from '@hooks/useSessionToken';


export default function SignUpScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    await setSessionToken('fake-token');
    router.replace("/(main)/(tabs)/HomeScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1, width: "100%" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={styles.inner}>
            <Text>Regístrate</Text>
            <View style={styles.form}>
              <TextInput
                placeholder="Usuario"
                style={styles.input}
                placeholderTextColor="#999"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
              <TextInput
                placeholder="Correo electrónico"
                style={styles.input}
                placeholderTextColor="#999"
                value={mail}
                onChangeText={setMail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <TextInput
                placeholder="Contraseña"
                style={styles.input}
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <PrimaryButton label="Registrarse" onPress={handleSignUp} />
              <Text
                style={styles.link}
                onPress={() => router.back()}
              >
                ¿Ya tienes cuenta? Inicia sesión
              </Text>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAFD",
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  form: {
    width: "85%",
    alignItems: "center",
    gap: 16,
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    elevation: 2,
  },
  link: {
    color: "#94A9FF",
    fontSize: 14,
    marginTop: 20,
    textAlign: "center",
  },
});