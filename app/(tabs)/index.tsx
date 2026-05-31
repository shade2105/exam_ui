import { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

function formatTime(date: Date) {
  return date.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });
}

type Message = {
  id: string;
  text: string;
  type: "incoming" | "outgoing";
  time: string;
};

export default function App() {
  const [messages] = useState<Message[]>([
    { id: "1", text: "Привіт від React!", type: "incoming", time: formatTime(new Date()) },
    { id: "2", text: "Привіт!", type: "outgoing", time: formatTime(new Date()) },
  ]);
return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Чат</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{item.text}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f2f5" },
  header: { backgroundColor: "#1a1a2e", paddingTop: 50, paddingBottom: 16, paddingHorizontal: 20 },
  headerText: { color: "white", fontSize: 20, fontWeight: "bold" },
});