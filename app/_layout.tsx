import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";
import { getSessionToken } from "@hooks/useSessionToken";

export default function RootLayout() {
    const router = useRouter();

    useEffect(() => {
        const checkToken = async () => {
            const token = await getSessionToken();
            if (token) {
                router.replace("/(main)/(tabs)/HomeScreen");
            } else {
                router.replace("/(auth)/AuthScreen");
            }
        };
        checkToken();
    }, []);

    return <Slot />;
}