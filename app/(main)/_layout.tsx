import { Stack } from "expo-router";

export default function MainLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="(tabs)"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="habit/[id]"
                options={{ headerShown: false }}
            />
        </Stack>
    );
}