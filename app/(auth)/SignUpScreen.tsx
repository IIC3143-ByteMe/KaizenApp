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
  Alert,
  ActivityIndicator,
} from "react-native";
import PrimaryButton from "@components/utils/PrimaryButton";
import { useRouter } from "expo-router";
import AuthHeader from "@components/auth/AuthHeader";
import { registerAndLogin } from "@services/authService";
import { fetchUserFromBackend } from '@services/userStorage';

export default function SignUpScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    Keyboard.dismiss();
    if (!fullName || !email || !password) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      setLoading(true);
      await registerAndLogin({
        full_name: fullName,
        email,
        password,
      });

      await fetchUserFromBackend();
      
      router.replace("/(main)/ikigai-quiz/IkigaiQuizScreen");
    } catch (error) {
      Alert.alert(
        "Error", 
        "No se pudo completar el registro. Inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1, width: "100%" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={styles.inner}>
            <AuthHeader />
            <View style={styles.form}>
              <TextInput
                placeholder="Nombre completo"
                style={styles.input}
                placeholderTextColor="#999"
                value={fullName}
                onChangeText={setFullName}
              />
              <TextInput
                placeholder="Correo electrónico"
                style={styles.input}
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
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
              
              {loading ? (
                <ActivityIndicator size="large" color="#94A9FF" style={styles.loader} />
              ) : (
                <PrimaryButton label="Registrarse" onPress={handleSignUp} />
              )}
              
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
  loader: {
    marginTop: 20,
  }
});