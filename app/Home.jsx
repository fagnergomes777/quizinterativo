import React from "react";
import { Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";

// app/index.jsx
export default function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Quiz Interativo</Text>
      <Text style={styles.subtitle}>Responda perguntas de múltipla escolha e teste seus conhecimentos!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Quiz")}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Iniciar Quiz</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>Dica: responda e deslize (swipe) para avançar.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#F7FAFF" },
  title: { fontSize: 32, fontWeight: "bold", color: "#0B3D91", textAlign: "center", marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: "center", color: "#333", marginBottom: 30 },
  button: { backgroundColor: "#0B3D91", paddingVertical: 14, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  footer: { marginTop: 20, textAlign: "center", color: "#555" }
});
