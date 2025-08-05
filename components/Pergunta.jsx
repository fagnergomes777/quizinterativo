import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Pergunta({ texto }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{texto}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 8 },
  text: { fontSize: 20, fontWeight: "700", color: "#111" }
});
