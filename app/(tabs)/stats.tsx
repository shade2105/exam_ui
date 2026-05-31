import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

type Stats = {
  total: number;
  outgoing: number;
  incoming: number;
  images: number;
};

export default function StatsScreen() {
  const [stats, setStats] = useState<Stats>({ total: 0, outgoing: 0, incoming: 0, images: 0 });

  const loadStats = async () => {
    const raw = await AsyncStorage.getItem("stats");
    if (raw) setStats(JSON.parse(raw));
  };

  useFocusEffect(useCallback(() => {
    loadStats();
  }, []));

  const { total, outgoing, incoming, images } = stats;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Статистика</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Загальна кількість повідомлень</Text>
          <Text style={styles.cardValue}>{total}</Text>
        </View>

        <View style={styles.row}>
          <View style={[styles.card, styles.half]}>
            <Text style={styles.cardTitle}>Відправлено</Text>
            <Text style={[styles.cardValue, { color: "#4a90e2" }]}>{outgoing}</Text>
          </View>
          <View style={[styles.card, styles.half]}>
            <Text style={styles.cardTitle}>Отримано</Text>
            <Text style={styles.cardValue}>{incoming}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Зображень відправлено</Text>
          <Text style={styles.cardValue}>{images}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Співвідношення</Text>
          <View style={styles.bar}>
            <View style={[styles.barFill, { flex: outgoing || 1 }]} />
            <View style={[styles.barEmpty, { flex: incoming || 1 }]} />
          </View>
          <View style={styles.barLabels}>
            <Text style={styles.barLabel}>
              Відправлено {total > 0 ? Math.round(outgoing / total * 100) : 0}%
            </Text>
            <Text style={styles.barLabel}>
              Отримано {total > 0 ? Math.round(incoming / total * 100) : 0}%
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f2f5" },
  header: { backgroundColor: "#1a1a2e", paddingTop: 50, paddingBottom: 16, paddingHorizontal: 20 },
  headerText: { color: "white", fontSize: 20, fontWeight: "bold" },
  content: { padding: 16, gap: 12 },
  card: { backgroundColor: "white", borderRadius: 12, padding: 20, elevation: 2 },
  cardTitle: { fontSize: 14, color: "#888", marginBottom: 8 },
  cardValue: { fontSize: 36, fontWeight: "bold", color: "#1a1a2e" },
  row: { flexDirection: "row", gap: 12 },
  half: { flex: 1 },
  bar: { flexDirection: "row", height: 12, borderRadius: 6, overflow: "hidden", marginTop: 8 },
  barFill: { backgroundColor: "#4a90e2" },
  barEmpty: { backgroundColor: "#e0e0e0" },
  barLabels: { flexDirection: "row", justifyContent: "space-between", marginTop: 6 },
  barLabel: { fontSize: 12, color: "#888" },
});