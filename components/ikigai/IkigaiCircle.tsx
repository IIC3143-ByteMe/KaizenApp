import React from "react";
import { TouchableWithoutFeedback, View, Text, StyleSheet } from "react-native";

type Props = {
    label: string;
    description: string;
    active: boolean;
    onPress: () => void;
};

export default function IkigaiCircle({ label, description, active, onPress }: Props) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.circle, active && styles.activeCircle]}>
                <Text style={styles.label}>{label}</Text>
                {active && <Text style={styles.description}>{description}</Text>}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    circle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#CBD3FF",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    activeCircle: {
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: "#94A9FF",
    },
    label: {
        color: "#333",
        fontWeight: "bold",
        textAlign: "center",
    },
    description: {
        marginTop: 10,
        fontSize: 12,
        color: "#555",
        textAlign: "center",
    },
});
