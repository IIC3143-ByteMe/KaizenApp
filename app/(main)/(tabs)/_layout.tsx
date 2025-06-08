import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="HomeScreen"
                options={{
                    title: "Inicio",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="IkigaiScreen"
                options={{
                    title: "Ikigai",
                    headerShown: false,
                    tabBarIcon: ({ color, size}) => (
                        <Ionicons name="color-filter-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="AddHabitScreen"
                options={{
                    title: "Agregar",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="add-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="ProgressScreen"
                options={{
                    title: "Progreso",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="bar-chart" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="AccountScreen"
                options={{
                    title: "Perfil",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}