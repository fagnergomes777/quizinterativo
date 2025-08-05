import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";

export default function Resultado({ route, navigation }) {
  const { score = 0, total = 0 } = route.params || {};

  function handleRefazer() {
    // volta pra tela de Quiz reiniciando
    navigation.replace("Quiz");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Resultado</Text>

      <View style={styles.card}>
        <Text style={styles.score}>{score} / {total}</Text>
        <Text style={styles.message}>
          {score === total ? "Perfeito! Você acertou todas." :
           score >= total / 2 ? "Bom trabalho! Continue praticando." :
           "Não desista — pratique mais!"}
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRefazer}>
        <Text style={styles.buttonText}>Refazer</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F7FAFF", alignItems: "center", justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "700", color: "#0B3D91", marginBottom: 20 },
  card: { backgroundColor: "#fff", width: "100%", padding: 20, borderRadius: 12, alignItems: "center", marginBottom: 20 },
  score: { fontSize: 48, fontWeight: "800", color: "#0B3D91" },
  message: { fontSize: 16, color: "#333", marginTop: 8, textAlign: "center" },
  button: { backgroundColor: "#0B3D91", paddingVertical: 12, paddingHorizontal: 30, borderRadius: 10 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" }
});
