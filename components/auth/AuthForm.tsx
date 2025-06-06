import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import PrimaryButton from '@components/utils/PrimaryButton';
import SecondaryButton from '@components/utils/SecondaryButton';
import { setSessionToken } from '@hooks/useSessionToken';
import { useRouter } from 'expo-router';


export default function AuthForm() {
    const router = useRouter();
    
    const handleLogin = async () => {
        await setSessionToken('fake-token');
        router.replace("/(main)/(tabs)/HomeScreen");
    };

    const handleSignUp = () => {
        router.push("/(auth)/SignUpScreen");
    };

    return (
        <View style={styles.form}>
            <TextInput
                placeholder="Usuario"
                style={styles.input}
                placeholderTextColor="#999"
            />
            <TextInput
                placeholder="Contraseña"
                style={styles.input}
                placeholderTextColor="#999"
                secureTextEntry
            />
            <PrimaryButton label="Ingresar" onPress={handleLogin} />
            <SecondaryButton label="Crear Cuenta" onPress={handleSignUp} />
        </View>
    );
};

const styles = StyleSheet.create({
    form: {
        width: '85%',
        alignItems: 'center',
        gap: 16,
    },
    input: {
        width: '100%',
        backgroundColor: 'white',
        padding: 14,
        borderRadius: 10,
        fontSize: 16,
        elevation: 2,
    },
});