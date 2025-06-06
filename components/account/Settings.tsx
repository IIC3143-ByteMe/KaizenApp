import { Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { removeSessionToken } from "@hooks/useSessionToken";

export default function Settings() {
    const router = useRouter();

    const handleLogout = async () => {
        await removeSessionToken();
        router.replace("/(auth)/AuthScreen");
    };

    return (
        <View style={{ flex:1, alignItems:"center", justifyContent:"center" }}>
            <Pressable
                onPress={handleLogout}
                style={{
                    marginTop: 24,
                    backgroundColor: "#6C63FF",
                    paddingHorizontal: 24,
                    paddingVertical: 12,
                    borderRadius: 8,
                }}
            >
                <Text style={{ color: "white", fontWeight: "bold" }}>Cerrar sesión</Text>
            </Pressable>
        </View>
    );
}