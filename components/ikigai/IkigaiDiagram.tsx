import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Dimensions,
  Animated,
} from "react-native";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { useIkigai, IkigaiCategory } from "@hooks/useIkigai";

type Props = {
  refreshKey?: number;
};

const CIRCLE_COLORS = {
  love: "rgba(255, 162, 192, 0.25)",
  good: "rgba(162, 206, 255, 0.25)",
  world: "rgba(162, 255, 200, 0.25)",
  paid: "rgba(255, 230, 162, 0.25)"
};

const STROKE_COLORS = {
  love: "rgba(255, 130, 170, 0.8)",
  good: "rgba(130, 180, 255, 0.8)",
  world: "rgba(130, 230, 180, 0.8)",
  paid: "rgba(255, 200, 130, 0.8)"
};

const TEXT_COLOR = "#333";
const IKIGAI_COLOR = "#7D89FF";

type MainCategory = "love" | "good" | "world" | "paid";

interface CategoryInfo {
  id: MainCategory | IkigaiCategory;
  label: string;
  description: string;
}

const MAIN_CATEGORIES: CategoryInfo[] = [
  { id: "love", label: "Lo que amas", description: "Actividades que disfrutas y te apasionan" },
  { id: "good", label: "En lo que eres bueno", description: "Tus talentos y habilidades naturales" },
  { id: "world", label: "Lo que el mundo necesita", description: "Contribuciones que mejoran la vida de otros" },
  { id: "paid", label: "Por lo que te pagan", description: "Actividades por las que recibes compensación" }
];

const INTERSECTIONS: CategoryInfo[] = [
  { id: "passion", label: "Pasión", description: "Lo que amas hacer y en lo que eres bueno" },
  { id: "mission", label: "Misión", description: "Lo que amas hacer y lo que el mundo necesita" },
  { id: "vocation", label: "Vocación", description: "Lo que el mundo necesita y en lo que eres bueno" },
  { id: "profession", label: "Profesión", description: "En lo que eres bueno y por lo que te pagan" }
];

const { width } = Dimensions.get('window');
const DIAGRAM_SIZE = Math.min(width * 0.95, 380);
const CIRCLE_RADIUS = DIAGRAM_SIZE * 0.4;
const CENTER_X = DIAGRAM_SIZE / 2;
const CENTER_Y = DIAGRAM_SIZE / 2;
const OFFSET = CIRCLE_RADIUS * 0.6;

export default function IkigaiDiagram({ refreshKey }: Props) {
  const { ikigaiData, habits, getHabitsByCategory, loading } = useIkigai(refreshKey);
  const [selectedCategory, setSelectedCategory] = useState<MainCategory | IkigaiCategory | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true
    }).start();
  }, [refreshKey]);

  const circlePositions = [
    { id: "love" as MainCategory, cx: CENTER_X - OFFSET, cy: CENTER_Y - OFFSET },
    { id: "good" as MainCategory, cx: CENTER_X + OFFSET, cy: CENTER_Y - OFFSET },
    { id: "paid" as MainCategory, cx: CENTER_X - OFFSET, cy: CENTER_Y + OFFSET },
    { id: "world" as MainCategory, cx: CENTER_X + OFFSET, cy: CENTER_Y + OFFSET },
  ];

  const mainLabelPositions = [
    { 
      id: "love" as MainCategory, 
      x: CENTER_X - OFFSET * 1.5, 
      y: CENTER_Y - OFFSET * 1.5, 
      lines: ["Lo que", "amas"] 
    },
    { 
      id: "good" as MainCategory, 
      x: CENTER_X + OFFSET * 1.5, 
      y: CENTER_Y - OFFSET * 1.5, 
      lines: ["En lo que", "eres bueno"] 
    },
    { 
      id: "paid" as MainCategory, 
      x: CENTER_X - OFFSET * 1.5, 
      y: CENTER_Y + OFFSET * 1.5, 
      lines: ["Por lo que", "te pagan"] 
    },
    { 
      id: "world" as MainCategory, 
      x: CENTER_X + OFFSET * 1.5, 
      y: CENTER_Y + OFFSET * 1.5, 
      lines: ["Lo que el", "mundo necesita"] 
    },
  ];

  const intersectionPositions = [
    { id: "passion" as IkigaiCategory, x: CENTER_X, y: CENTER_Y - OFFSET * 1.0, text: "Pasión" },
    { id: "mission" as IkigaiCategory, x: CENTER_X - OFFSET * 1.0, y: CENTER_Y, text: "Misión" },
    { id: "profession" as IkigaiCategory, x: CENTER_X + OFFSET * 1.0, y: CENTER_Y, text: "Profesión" },
    { id: "vocation" as IkigaiCategory, x: CENTER_X, y: CENTER_Y + OFFSET * 1.0, text: "Vocación" },
  ];

  const handleCategorySelect = (category: MainCategory | IkigaiCategory) => {
    setSelectedCategory(category);
    setModalVisible(true);
  };

  const getCategoryDescription = () => {
    if (!selectedCategory) return "";
    
    if (["love", "good", "world", "paid"].includes(selectedCategory)) {
      const mainCategory = selectedCategory as MainCategory;
      
      const descriptions = {
        love: ikigaiData.you_love || "Lo que te hace feliz y disfrutas hacer",
        good: ikigaiData.good_at || "Tus habilidades y fortalezas",
        world: ikigaiData.world_needs || "Cómo contribuyes a mejorar el mundo",
        paid: ikigaiData.is_profitable || "Por lo que las personas están dispuestas a pagar"
      };
      
      return descriptions[mainCategory];
    } 
    else {
      const ikigaiCategory = selectedCategory as IkigaiCategory;
      const intersection = INTERSECTIONS.find(i => i.id === ikigaiCategory);
      return intersection?.description || "";
    }
  };

  const getRelatedHabits = () => {
    if (!selectedCategory || ["love", "good", "world", "paid"].includes(selectedCategory)) {
      return [];
    }
    
    return getHabitsByCategory(selectedCategory as IkigaiCategory);
  };

  const getModalTitle = () => {
    if (!selectedCategory) return "";
    
    if (["love", "good", "world", "paid"].includes(selectedCategory)) {
      const mainCategory = MAIN_CATEGORIES.find(c => c.id === selectedCategory);
      return mainCategory?.label || "";
    } else {
      const intersection = INTERSECTIONS.find(i => i.id === selectedCategory);
      return intersection?.label || "";
    }
  };

  if (loading) {
    return null;
  }

  const relatedHabits = getRelatedHabits();
  
  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.diagramContainer}>
        <Svg width={DIAGRAM_SIZE} height={DIAGRAM_SIZE} viewBox={`0 0 ${DIAGRAM_SIZE} ${DIAGRAM_SIZE}`}>
          {circlePositions.map((circle) => (
            <Circle
              key={circle.id}
              cx={circle.cx}
              cy={circle.cy}
              r={CIRCLE_RADIUS}
              fill={CIRCLE_COLORS[circle.id]}
              stroke={STROKE_COLORS[circle.id]}
              strokeWidth={1.5}
            />
          ))}

          {mainLabelPositions.map((label) => (
            <React.Fragment key={`label-${label.id}`}>
              {label.lines.map((line, lineIndex) => (
                <SvgText
                  key={`label-${label.id}-line-${lineIndex}`}
                  x={label.x}
                  y={label.y + (lineIndex * 16)}
                  fontSize={12}
                  fontWeight="bold"
                  fill={TEXT_COLOR}
                  textAnchor="middle"
                >
                  {line}
                </SvgText>
              ))}
            </React.Fragment>
          ))}

          {intersectionPositions.map((intersection) => (
            <SvgText
              key={`intersection-${intersection.id}`}
              x={intersection.x}
              y={intersection.y}
              fontSize={14}
              fontWeight="bold"
              fill={TEXT_COLOR}
              textAnchor="middle"
            >
              {intersection.text}
            </SvgText>
          ))}

          <SvgText
            x={CENTER_X}
            y={CENTER_Y + 5}
            fontSize={16}
            fontWeight="bold"
            fill={IKIGAI_COLOR}
            textAnchor="middle"
          >
            ikigai
          </SvgText>
        </Svg>

        {circlePositions.map((circle) => (
          <TouchableOpacity
            key={`touch-${circle.id}`}
            style={[
              styles.touchCircle,
              {
                left: circle.cx - CIRCLE_RADIUS/2,
                top: circle.cy - CIRCLE_RADIUS/2,
                width: CIRCLE_RADIUS,
                height: CIRCLE_RADIUS,
              }
            ]}
            onPress={() => handleCategorySelect(circle.id)}
          />
        ))}

        {intersectionPositions.map((intersection) => (
          <TouchableOpacity
            key={`touch-${intersection.id}`}
            style={[
              styles.touchIntersection,
              {
                left: intersection.x - CIRCLE_RADIUS/3,
                top: intersection.y - CIRCLE_RADIUS/3,
                width: CIRCLE_RADIUS/1.5,
                height: CIRCLE_RADIUS/1.5,
              }
            ]}
            onPress={() => handleCategorySelect(intersection.id)}
          />
        ))}
        
        <TouchableOpacity
          style={[
            styles.touchCenter,
            {
              left: CENTER_X - CIRCLE_RADIUS/4,
              top: CENTER_Y - CIRCLE_RADIUS/4,
              width: CIRCLE_RADIUS/2,
              height: CIRCLE_RADIUS/2,
            }
          ]}
          onPress={() => handleCategorySelect("passion")}
        />
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{getModalTitle()}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalBody}>
              <Text style={styles.descriptionTitle}>Descripción:</Text>
              <Text style={styles.descriptionText}>{getCategoryDescription()}</Text>
              
              {relatedHabits.length > 0 && (
                <>
                  <Text style={[styles.descriptionTitle, {marginTop: 16}]}>
                    Hábitos relacionados:
                  </Text>
                  <FlatList
                    data={relatedHabits}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                      <View style={styles.habitItem}>
                        <Ionicons 
                          name={item.icon || "checkmark-circle"} 
                          size={20} 
                          color={item.color || "#94A9FF"} 
                        />
                        <Text style={styles.habitText}>{item.title}</Text>
                      </View>
                    )}
                    ListEmptyComponent={
                      <Text style={styles.emptyText}>
                        No hay hábitos para esta categoría
                      </Text>
                    }
                  />
                </>
              )}
            </View>
            
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      <Text style={styles.helpText}>
        Toca un círculo o intersección para más información
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  diagramContainer: {
    width: DIAGRAM_SIZE,
    height: DIAGRAM_SIZE,
    position: 'relative',
  },
  touchCircle: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderRadius: 100,
  },
  touchIntersection: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderRadius: 100,
  },
  touchCenter: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderRadius: 100,
  },
  helpText: {
    marginTop: 16,
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '85%',
    maxHeight: '70%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalBody: {
    maxHeight: '70%',
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#555',
  },
  descriptionText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  habitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  habitText: {
    fontSize: 15,
    marginLeft: 10,
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    padding: 20,
    color: '#777',
    fontStyle: 'italic',
  },
  closeButton: {
    backgroundColor: '#94A9FF',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  }
});
