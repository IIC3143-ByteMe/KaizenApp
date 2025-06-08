import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  ViewStyle,
} from "react-native";
import IkigaiCircle from "@components/ikigai/IkigaiCircle";
import { getIkigai } from "@services/ikigaiStorage";

type Props = {
  refreshKey?: number;
};

type Circle = {
  id: number;
  label: string;
  description: string;
  position: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
};

const habits = [
  { id: '1', title: "Estudiar", ikigai: "pasión" },
  { id: '2', title: "Meditar", ikigai: "pasión" },
  { id: '3', title: "Salir a caminar", ikigai: "mision" },
  { id: '4', title: "Hacer KaizenApp", ikigai: "vocacion" },
  { id: '5', title: "Entrega 2", ikigai: "profesion" },
  { id: '6', title: "Leer un libro", ikigai: "pasión" },
  { id: '7', title: "Practicar deporte", ikigai: "profesion" },
  { id: '8', title: "Cocinar", ikigai: "vocacion" },
  { id: '9', title: "Aprender algo nuevo", ikigai: "mision" },
  { id: '10', title: "Hacer ejercicio", ikigai: "pasión" }
];

const circlePositions: Record<Circle["position"], ViewStyle> = {
  topLeft: { position: 'absolute', top: 150, left: 30 },
  topRight: { position: 'absolute', top: 150, right: 30 },
  bottomLeft: { position: 'absolute', bottom: 150, left: 30 },
  bottomRight: { position: 'absolute', bottom: 150, right: 30 },
};

export default function IkigaiDiagram({ refreshKey }: Props) {
  const [circles, setCircles] = useState<Circle[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [selectedIkigai, setSelectedIkigai] = useState<null | string>(null);

  const loadIkigai = async () => {
    const ikigai = await getIkigai();
    if (!ikigai) return;

    const loadedCircles: Circle[] = [
      {
        id: 1,
        label: "Lo que AMAS",
        description: ikigai.amas || "¿Qué amas?",
        position: "topLeft",
      },
      {
        id: 2,
        label: "En lo que eres BUENO",
        description: ikigai.bueno || "¿En qué eres bueno/a?",
        position: "topRight",
      },
      {
        id: 3,
        label: "Lo que el mundo NECESITA",
        description: ikigai.necesita || "¿Qué necesita el mundo?",
        position: "bottomLeft",
      },
      {
        id: 4,
        label: "Por lo que te pueden PAGAR",
        description: ikigai.pagar || "¿Por qué te pueden pagar?",
        position: "bottomRight",
      },
    ];

    setCircles(loadedCircles);
  };

  useEffect(() => {
    loadIkigai();
  }, [refreshKey]);

  const toggle = (id: number) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  const filteredHabits = habits.filter(h => h.ikigai === selectedIkigai);

  return (
    <View style={styles.container}>
      {circles.map((c) => (
        <View key={c.id} style={circlePositions[c.position]}>
          <IkigaiCircle
            label={c.label}
            description={c.description}
            active={activeId === c.id}
            onPress={() => toggle(c.id)}
          />
        </View>
      ))}

      {/* Etiquetas */}
      <TouchableOpacity style={[styles.box, styles.labelPasion]} onPress={() => setSelectedIkigai("pasión")}>
        <Text style={styles.boxLabel}>Pasión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.box, styles.labelMision]} onPress={() => setSelectedIkigai("mision")}>
        <Text style={styles.boxLabel}>Misión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.box, styles.labelVocacion]} onPress={() => setSelectedIkigai("vocacion")}>
        <Text style={styles.boxLabel}>Vocación</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.box, styles.labelProfesion]} onPress={() => setSelectedIkigai("profesion")}>
        <Text style={styles.boxLabel}>Profesión</Text>
      </TouchableOpacity>

      <Text style={styles.labelIkigai}>IKIGAI</Text>

      {/* Modal hábitos */}
      <Modal
        visible={selectedIkigai !== null}
        animationType="none"
        transparent={true}
        onRequestClose={() => setSelectedIkigai(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Hábitos de {selectedIkigai}</Text>
            <FlatList
              data={filteredHabits}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Text style={styles.modalItem}>{item.title}</Text>
              )}
            />
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setSelectedIkigai(null)}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  box: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    position: 'absolute',
  },
  boxLabel: {
    fontWeight: '600',
    color: '#555',
  },
  labelPasion: {
    top: 80,
    left: '50%',
    transform: [{ translateX: -30 }],
  },
  labelMision: {
    top: '50%',
    left: 30,
    transform: [{ translateY: -10 }],
  },
  labelVocacion: {
    bottom: 80,
    left: '50%',
    transform: [{ translateX: -30 }],
  },
  labelProfesion: {
    top: '50%',
    right: 30,
    transform: [{ translateY: -10 }],
  },
  labelIkigai: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -10 }],
    fontWeight: 'bold',
    fontSize: 18,
    color: '#7D89FF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    width: '80%',
    maxHeight: '60%',
    elevation: 4,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalItem: {
    fontSize: 16,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  modalClose: {
    marginTop: 20,
    backgroundColor: '#7D89FF',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
});
