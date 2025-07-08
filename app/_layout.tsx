import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";
import { getSessionToken } from "@hooks/useSessionToken";
import { fetchDailyCompletionsFromBackend } from "@services/dailyCompletionsService";
import { fetchNotificationsFromBackend } from "@services/notificationService";
import { fetchStreakFromBackend } from "@services/streakService";

export default function RootLayout() {
    const router = useRouter();

    useEffect(() => {
        const checkToken = async () => {
            const token = await getSessionToken();
            if (token) {
                await fetchDailyCompletionsFromBackend();
                await fetchStreakFromBackend();
                await fetchNotificationsFromBackend();
                router.replace("/(main)/(tabs)/HomeScreen");
            } else {
                router.replace("/(auth)/AuthScreen");
            }
        };
        checkToken();
    }, []);

    return <Slot />;
}