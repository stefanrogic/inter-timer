import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import TimerDisplay from "../../timer/TimerDisplay";
import TimerControls from "../../timer/TimerControls";
import DesktopButtons from "./DesktopButtons";

const { height } = Dimensions.get("window");

export default function DesktopTimerLayout({ timeLeft, currentRound, totalRounds, isTimerActive, isWorkPhase, isRunning, textColor, progress, progressColor, profileName, onPlayPause, onHome, onSettingsPress, panResponder }) {
  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <TimerDisplay timeLeft={timeLeft} currentRound={currentRound} totalRounds={totalRounds} isTimerActive={isTimerActive} isWorkPhase={isWorkPhase} textColor={textColor} profileName={profileName} />

      <TimerControls isTimerActive={isTimerActive} isRunning={isRunning} onPlayPause={onPlayPause} onHome={onHome} />

      <DesktopButtons onSettingsPress={onSettingsPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    position: "relative",
  },
});
