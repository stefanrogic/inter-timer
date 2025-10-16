import React from "react";
import { View, StyleSheet } from "react-native";
import { PlayIcon, PauseIcon, ResetIcon } from "../icons";
import Button from "../ui/Button";

export default function TimerControls({ isTimerActive, isRunning, onPlayPause, onHome }) {
  return (
    <View style={styles.buttonContainer}>
      {!isTimerActive && (
        <Button variant="icon" onPress={onPlayPause}>
          <PlayIcon size={32} color="#333" />
        </Button>
      )}

      {isTimerActive && (
        <>
          <Button variant="icon" onPress={onPlayPause}>
            {isRunning ? <PauseIcon size={32} color="#333" /> : <PlayIcon size={32} color="#333" />}
          </Button>

          <Button variant="icon" onPress={onHome}>
            <ResetIcon size={32} color="#333" />
          </Button>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    marginTop: 60,
    gap: 20,
    zIndex: 1,
  },
});
