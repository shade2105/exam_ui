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
  
  const renderMessage = ({ item }: { item: Message }) => {
    const isOutgoing = item.type === "outgoing";
    return (
      <View style={[styles.messageWrapper, isOutgoing ? styles.outgoingWrapper : styles.incomingWrapper]}>
        <View style={[styles.bubble, isOutgoing ? styles.outgoingBubble : styles.incomingBubble]}>
          <Text style={[styles.messageText, isOutgoing ? styles.outgoingText : styles.incomingText]}>
            {item.text}
          </Text>
          <Text style={[styles.timeText, isOutgoing ? styles.outgoingTime : styles.incomingTime]}>
            {item.time}
          </Text>
        </View>
      </View>
    );
  };
  
return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Чат</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        renderItem={renderMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f2f5" },
  header: { backgroundColor: "#1a1a2e", paddingTop: 50, paddingBottom: 16, paddingHorizontal: 20 },
  headerText: { color: "white", fontSize: 20, fontWeight: "bold" },
  messageList: { padding: 16, gap: 8 },
  messageWrapper: { flexDirection: "row", marginVertical: 4 },
  incomingWrapper: { justifyContent: "flex-start" },
  outgoingWrapper: { justifyContent: "flex-end" },
  bubble: { maxWidth: "75%", borderRadius: 16, padding: 10 },
  incomingBubble: { backgroundColor: "white", borderBottomLeftRadius: 4 },
  outgoingBubble: { backgroundColor: "#4a90e2", borderBottomRightRadius: 4 },
  messageText: { fontSize: 15 },
  incomingText: { color: "#1a1a2e" },
  outgoingText: { color: "white" },
  timeText: { fontSize: 11, marginTop: 4, alignSelf: "flex-end" },
  incomingTime: { color: "#999" },
  outgoingTime: { color: "rgba(255,255,255,0.7)" },
});