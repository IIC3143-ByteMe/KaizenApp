import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, ActivityIndicator, Keyboard } from 'react-native';
import PrimaryButton from '@components/utils/PrimaryButton';
import SecondaryButton from '@components/utils/SecondaryButton';
import { useRouter } from 'expo-router';
import { login } from '@services/authService';
import { fetchHabitsFromBackend } from '@services/habitStorage';
import { fetchIkigaiFromBackend } from '@services/ikigaiStorage';

export default function AuthForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleLogin = async () => {
        Keyboard.dismiss();

        if (!email || !password) {
            Alert.alert('Error', 'Por favor, completa todos los campos');
            return;
        }
        
        try {
            setLoading(true);
            await login({ email, password });
            
            console.log('🔄 Cargando hábitos después del login...');
            await fetchHabitsFromBackend();
            
            console.log('🔄 Cargando ikigai después del login...');
            const ikigai = await fetchIkigaiFromBackend();

            if (ikigai) {
            router.replace("/(main)/(tabs)/HomeScreen");
            } else {
            router.replace("/(main)/ikigai-quiz/IkigaiQuizScreen");
            }
        } catch (error) {
            Alert.alert(
                'Error', 
                'No se pudo iniciar sesión. Verifica tus credenciales.'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleSignUp = () => {
        Keyboard.dismiss();
        router.push("/(auth)/SignUpScreen");
    };

    return (
        <View style={styles.form}>
            <TextInput
                placeholder="Correo electrónico"
                style={styles.input}
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Contraseña"
                style={styles.input}
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            {loading ? (
                <ActivityIndicator size="large" color="#94A9FF" style={styles.loader} />
            ) : (
                <>
                    <PrimaryButton label="Ingresar" onPress={handleLogin} />
                    <SecondaryButton label="Crear Cuenta" onPress={handleSignUp} />
                </>
            )}
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
    loader: {
        marginTop: 20,
    }
});