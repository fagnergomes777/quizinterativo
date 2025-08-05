import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Opcao({ texto, onPress, status = "normal" }) {
  // status: normal | selected | selected-correct | selected-wrong | correct
  const style = [
    styles.button,
    status === "selected" && styles.selected,
    status === "selected-correct" && styles.selectedCorrect,
    status === "selected-wrong" && styles.selectedWrong,
    status === "correct" && styles.correct
  ];

  return (
    <TouchableOpacity style={style} onPress={onPress} activeOpacity={0.8} disabled={status === "selected-correct" || status === "selected-wrong"}>
      <Text style={[
        styles.text,
        (status === "selected-correct" || status === "correct") && styles.textCorrect,
        status === "selected-wrong" && styles.textWrong
      ]}>
        {texto}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#F1F6FF",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E6EEF9"
  },
  text: { fontSize: 16, color: "#222" },

  selected: { backgroundColor: "#E8F0FF", borderColor: "#C9DAFF" },
  selectedCorrect: { backgroundColor: "#E6FFF0", borderColor: "#8FE2A9" },
  selectedWrong: { backgroundColor: "#FFEDED", borderColor: "#FF9A9A" },
  correct: { backgroundColor: "#E9FFF1", borderColor: "#86E29D" },

  textCorrect: { color: "#127A3E", fontWeight: "700" },
  textWrong: { color: "#9E2A2A", fontWeight: "700" }
});
