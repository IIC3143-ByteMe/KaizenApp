import React, { useState } from "react";
import { Text, View, Pressable, ActivityIndicator, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { logout } from "@services/logoutService";

export default function Settings() {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        Alert.alert(
            "Cerrar Sesión",
            "¿Estás seguro que deseas cerrar sesión? Se eliminarán todos tus datos locales.",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Cerrar Sesión",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            setIsLoggingOut(true);
                            
                            await logout();
                            
                            router.replace("/(auth)/AuthScreen");
                        } catch (error) {
                            console.error("Error al cerrar sesión:", error);
                            Alert.alert(
                                "Error", 
                                "No se pudo cerrar sesión correctamente. Inténtalo de nuevo."
                            );
                        } finally {
                            setIsLoggingOut(false);
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Pressable
                onPress={handleLogout}
                style={[styles.logoutButton, isLoggingOut && styles.logoutButtonDisabled]}
                disabled={isLoggingOut}
            >
                {isLoggingOut ? (
                    <ActivityIndicator size="small" color="white" />
                ) : (
                    <Text style={styles.logoutText}>Cerrar sesión</Text>
                )}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    logoutButton: {
        marginTop: 24,
        backgroundColor: "#6C63FF",
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        minWidth: 140,
        alignItems: "center",
    },
    logoutButtonDisabled: {
        backgroundColor: "#A5A1E5",
    },
    logoutText: {
        color: "white",
        fontWeight: "bold",
    }
});