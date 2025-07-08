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
import { getHabits, Habit } from '@services/habitStorage';

type Props = {
  refreshKey?: number;
};

type Circle = {
  id: number;
  label: string;
  description: string;
  position: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
};

const circlePositions: Record<Circle["position"], ViewStyle> = {
  topLeft: { position: 'absolute', top: 150, left: 30 },
  topRight: { position: 'absolute', top: 150, right: 30 },
  bottomLeft: { position: 'absolute', bottom: 150, left: 30 },
  bottomRight: { position: 'absolute', bottom: 150, right: 30 },
};

const TRANSLATIONS: Record<string, string> = {
  passion:   "Pasión",
  mission:   "Misión",
  vocation:  "Vocación",
  profession:"Profesión",
};

export default function IkigaiDiagram({ refreshKey }: Props) {
  const [circles, setCircles] = useState<Circle[]>([]);
  const [allHabits, setAllHabits] = useState<Habit[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [selectedIkigai, setSelectedIkigai] = useState<null | string>(null);

  useEffect(() => {
    const loadData = async () => {
      const ikigai = await getIkigai();
      if (ikigai) {
        setCircles([
          {
            id: 1,
            label: "Lo que AMAS",
            description: ikigai.you_love || "¿Qué amas?",
            position: "topLeft",
          },
          {
            id: 2,
            label: "En lo que eres BUENO",
            description: ikigai.good_at || "¿En qué eres bueno/a?",
            position: "topRight",
          },
          {
            id: 3,
            label: "Lo que el mundo NECESITA",
            description: ikigai.world_needs || "¿Qué necesita el mundo?",
            position: "bottomLeft",
          },
          {
            id: 4,
            label: "Por lo que te pueden PAGAR",
            description: ikigai.is_profitable || "¿Por qué te pueden pagar?",
            position: "bottomRight",
          },
        ]);
      }

      const habits = await getHabits();
      const normalized = habits.map(h => ({
        ...h,
        ikigai_category: h.ikigai_category?.toLowerCase() ?? null
      }));
      setAllHabits(normalized);
    };

    loadData();
  }, [refreshKey]);

  const toggle = (id: number) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  const filteredHabits = allHabits.filter(
    (h) => h.ikigai_category === selectedIkigai
  );

  const selectedLabel =
    selectedIkigai != null
      ? TRANSLATIONS[selectedIkigai] ?? selectedIkigai
      : "";

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

      <TouchableOpacity 
        style={[styles.box, styles.labelPasion]} 
        onPress={() => setSelectedIkigai("passion")}
      >
        <Text style={styles.boxLabel}>Pasión</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.box, styles.labelMision]} 
        onPress={() => setSelectedIkigai("mission")}
      >
        <Text style={styles.boxLabel}>Misión</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.box, styles.labelVocacion]} 
        onPress={() => setSelectedIkigai("vocation")}
      >
        <Text style={styles.boxLabel}>Vocación</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.box, styles.labelProfesion]} 
        onPress={() => setSelectedIkigai("profession")}
      >
        <Text style={styles.boxLabel}>Profesión</Text>
      </TouchableOpacity>

      <Text style={styles.labelIkigai}>IKIGAI</Text>

      <Modal
        visible={selectedIkigai !== null}
        animationType="none"
        transparent={true}
        onRequestClose={() => setSelectedIkigai(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Hábitos de {selectedLabel}</Text>
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
