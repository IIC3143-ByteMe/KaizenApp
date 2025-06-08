import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { getIkigai } from '@services/ikigaiStorage';
import { ARQUETIPO_DATA } from '@components/utils/arquetipoData';

export default function ArchetypeCard() {
  const [arquetipo, setArquetipo] = useState<null | keyof typeof ARQUETIPO_DATA>(null);

  useEffect(() => {
    const fetchData = async () => {
      const stored = await getIkigai();
      if (stored?.arquetipo) {
        setArquetipo(stored.arquetipo);
      }
    };
    fetchData();
  }, []);

  if (!arquetipo) return null;

  const { title, phrase } = ARQUETIPO_DATA[arquetipo];

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.label}>Mi arquetipo</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.quote}>{phrase}</Text>
      </View>
      <Image
        source={require('@assets/icon.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#7D89FF',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    left: {
        flex: 1,
    },
    label: {
        color: 'white',
        fontSize: 14,
    },
    title: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    quote: {
        fontSize: 12,
        color: 'white',
        marginTop: 8,
    },
    image: {
        width: 60,
        height: 60,
        marginLeft: 12,
    },
});
