// app/Quiz.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  PanResponder,
  Alert
} from "react-native";

import Pergunta from "../components/Pergunta";
import Opcao from "../components/Opcao";
import perguntasData from "../data/perguntas.json"; // ajuste o caminho conforme necessário

export default function Quiz({ navigation }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null); // id da opção selecionada
  const [answeredCorrect, setAnsweredCorrect] = useState(null); // true/false/null
  const [locked, setLocked] = useState(false); // bloqueia seleção até responder

  const pan = useRef(new Animated.ValueXY()).current;
  const autoAdvanceTimer = useRef(null);

  const total = perguntasData.length;

  useEffect(() => {
    // reset selection quando mudar de pergunta
    setSelected(null);
    setAnsweredCorrect(null);
    setLocked(false);

    // limpar posição do card
    pan.setValue({ x: 0, y: 0 });

    // limpar timer anterior se houver
    if (autoAdvanceTimer.current) {
      clearTimeout(autoAdvanceTimer.current);
      autoAdvanceTimer.current = null;
    }
  }, [index]);

  useEffect(() => {
    if (index >= total) {
      navigation.replace("Resultado", { score, total });
    }
  }, [index]);

  useEffect(() => {
    // cleanup on unmount
    return () => {
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    };
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10;
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gesture) => {
        const { dx } = gesture;
        if (dx < -80) {
          // swipe para a esquerda -> avançar
          handleNext();
        } else {
          Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
        }
      }
    })
  ).current;

  function normalizeIsCorrect(value) {
    // aceita boolean true ou string "true"
    return value === true || value === "true";
  }

  function handleAnswer(option) {
    if (locked) return;
    setSelected(option.id);

    const isCorrect = normalizeIsCorrect(option.isCorrect);
    setAnsweredCorrect(isCorrect);
    setLocked(true);

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // Opcional: avançar automaticamente após curto delay (deixe se quiser)
    // Se preferir somente swipe, comente as próximas linhas.
    autoAdvanceTimer.current = setTimeout(() => {
      // anima para a esquerda e muda pergunta
      Animated.timing(pan, {
        toValue: { x: -500, y: 0 },
        duration: 200,
        useNativeDriver: false
      }).start(() => {
        pan.setValue({ x: 0, y: 0 });
        setIndex(prev => prev + 1);
      });
    }, 900); // 900ms para o usuário ver o feedback
  }

  function handleNext() {
    // só permite avançar se usuário já respondeu;
    if (!locked) {
      Alert.alert("Atenção", "Responda a pergunta antes de avançar (ou toque em uma opção).");
      Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
      return;
    }

    // cancela timer se existir (para não avançar duas vezes)
    if (autoAdvanceTimer.current) {
      clearTimeout(autoAdvanceTimer.current);
      autoAdvanceTimer.current = null;
    }

    // animação de saída e avanço
    Animated.timing(pan, {
      toValue: { x: -500, y: 0 },
      duration: 200,
      useNativeDriver: false
    }).start(() => {
      pan.setValue({ x: 0, y: 0 });
      setIndex(prev => prev + 1);
    });
  }

  if (index >= total) return null;

  const pergunta = perguntasData[index];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Pergunta {index + 1} / {total}</Text>
        <Text style={styles.scoreText}>Pontuação: {score}</Text>
      </View>

      <Animated.View
        style={[styles.card, { transform: [{ translateX: pan.x }] }]}
        {...panResponder.panHandlers}
      >
        <Pergunta texto={pergunta.question} />

        <View style={styles.optionsContainer}>
          {pergunta.options.map(opt => {
            const isSelected = selected === opt.id;
            let status = "normal";
            if (locked) {
              if (isSelected) {
                status = answeredCorrect ? "selected-correct" : "selected-wrong";
              } else if (normalizeIsCorrect(opt.isCorrect)) {
                status = "correct";
              }
            } else if (isSelected) {
              status = "selected";
            }

            return (
              <Opcao
                key={opt.id}
                texto={opt.text}
                onPress={() => handleAnswer(opt)}
                status={status}
              />
            );
          })}
        </View>

        <View style={styles.instructions}>
          <Text style={styles.instructionsText}>
            {locked ? "Deslize para a esquerda para próxima pergunta →" : "Escolha uma opção"}
          </Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7FAFF", padding: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  headerText: { fontSize: 16, fontWeight: "600", color: "#0B3D91" },
  scoreText: { fontSize: 16, fontWeight: "600", color: "#0B3D91" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3
  },
  optionsContainer: { marginTop: 12 },
  instructions: { marginTop: 12, alignItems: "center" },
  instructionsText: { color: "#666" }
});
