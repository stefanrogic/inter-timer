import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function TimerDisplay({ timeLeft, currentRound, totalRounds, isTimerActive, isWorkPhase, textColor, profileName }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const getPhaseText = () => {
    if (!isTimerActive) {
      return "READY";
    }
    // Show profile name during work phase, "REST" during break
    return isWorkPhase ? (profileName || "WORK").toUpperCase() : "REST";
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.roundText, { color: textColor }]}>
        ROUND {currentRound} / {totalRounds}
      </Text>
      <Text style={[styles.phaseText, { color: textColor }]}>{getPhaseText()}</Text>
      <Text style={[styles.timerText, { color: textColor }]}>{formatTime(timeLeft)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    zIndex: 1,
  },
  roundText: {
    fontFamily: "BarlowCondensed-Bold",
    fontSize: 24,
    letterSpacing: 2,
    marginBottom: 10,
  },
  phaseText: {
    fontFamily: "BarlowCondensed-Bold",
    fontSize: 36,
    letterSpacing: 3,
    marginBottom: 20,
  },
  timerText: {
    fontFamily: "BarlowCondensed-Bold",
    fontSize: 120,
    letterSpacing: 5,
  },
});
