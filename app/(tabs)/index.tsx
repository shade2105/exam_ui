import { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, KeyboardAvoidingView, Platform, StyleSheet
} from "react-native";

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
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Привіт! Як справи?", type: "incoming", time: formatTime(new Date()) },
    { id: "2", text: "Все добре, дякую!", type: "outgoing", time: formatTime(new Date()) },
  ]);
  const [input, setInput] = useState("");
  
  const sendMessage = () => {
    if (input.trim() === "") return;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      type: "outgoing",
      time: formatTime(new Date()),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };
  
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}>

      <View style={styles.header}>
        <Text style={styles.headerText}>Чат</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        renderItem={renderMessage}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Введіть повідомлення..."
          placeholderTextColor="#999"
          multiline
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={styles.sendBtnText}>➤</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
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
  inputRow: { flexDirection: "row", padding: 12, backgroundColor: "white", alignItems: "flex-end", gap: 8, borderTopWidth: 1, borderTopColor: "#eee" },
  input: { flex: 1, backgroundColor: "#f0f2f5", borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, fontSize: 15, maxHeight: 100, color: "#1a1a2e" },
  sendBtn: { backgroundColor: "#4a90e2", borderRadius: 20, width: 44, height: 44, justifyContent: "center", alignItems: "center" },
  sendBtnText: { color: "white", fontSize: 18 },
});