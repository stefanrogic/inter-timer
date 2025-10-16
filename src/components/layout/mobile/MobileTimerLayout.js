import React from "react";
import { StyleSheet, View } from "react-native";
import TimerDisplay from "../../timer/TimerDisplay";
import TimerControls from "../../timer/TimerControls";
import MobileMenuButton from "./MobileMenuButton";

export default function MobileTimerLayout({ timeLeft, currentRound, totalRounds, isTimerActive, isWorkPhase, isRunning, textColor, progress, progressColor, profileName, onPlayPause, onHome, onMenuPress, panResponder }) {
  return (
    <View style={styles.innerContainer} {...panResponder.panHandlers}>
      <TimerDisplay timeLeft={timeLeft} currentRound={currentRound} totalRounds={totalRounds} isTimerActive={isTimerActive} isWorkPhase={isWorkPhase} textColor={textColor} profileName={profileName} />

      <TimerControls isTimerActive={isTimerActive} isRunning={isRunning} onPlayPause={onPlayPause} onHome={onHome} />

      <MobileMenuButton isTimerActive={isTimerActive} onMenuPress={onMenuPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
});
