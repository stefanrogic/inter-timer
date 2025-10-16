import React, { useRef } from "react";
import { StyleSheet, View, Dimensions, PanResponder, SafeAreaView, StatusBar } from "react-native";
import DesktopTimerLayout from "./desktop/DesktopTimerLayout";
import MobileTimerLayout from "./mobile/MobileTimerLayout";

const { width } = Dimensions.get("window");
const isDesktop = width >= 768; // Tablets and desktops

/**
 * TimerLayout component handles the visual layout and gesture handling
 */
export default function TimerLayout({ timeLeft, currentRound, totalRounds, isTimerActive, isWorkPhase, isRunning, backgroundColor, progressColor, textColor, progress, profileName, onPlayPause, onHome, onSettingsPress, onMenuPress }) {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (_, gestureState) => {
        return gestureState.x0 > width - 50;
      },
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dx < -10 && gestureState.x0 > width - 50;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -50 && gestureState.vx < -0.3) {
          onMenuPress();
        }
      },
    })
  ).current;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />

      {/* Desktop: Horizontal progress bar from left side */}
      {isDesktop && <View style={[styles.progressOverlayDesktop, { width: `${progress}%`, backgroundColor: progressColor }]} />}

      {/* Mobile: Vertical progress bar from bottom */}
      {!isDesktop && <View style={[styles.progressOverlay, { height: `${progress}%`, backgroundColor: progressColor }]} />}

      <SafeAreaView style={styles.safeArea}>
        {isDesktop ? (
          <DesktopTimerLayout
            timeLeft={timeLeft}
            currentRound={currentRound}
            totalRounds={totalRounds}
            isTimerActive={isTimerActive}
            isWorkPhase={isWorkPhase}
            isRunning={isRunning}
            textColor={textColor}
            progress={progress}
            progressColor={progressColor}
            profileName={profileName}
            onPlayPause={onPlayPause}
            onHome={onHome}
            onSettingsPress={onSettingsPress}
            panResponder={panResponder}
          />
        ) : (
          <MobileTimerLayout
            timeLeft={timeLeft}
            currentRound={currentRound}
            totalRounds={totalRounds}
            isTimerActive={isTimerActive}
            isWorkPhase={isWorkPhase}
            isRunning={isRunning}
            textColor={textColor}
            progress={progress}
            progressColor={progressColor}
            profileName={profileName}
            onPlayPause={onPlayPause}
            onHome={onHome}
            onMenuPress={onMenuPress}
            panResponder={panResponder}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  safeArea: {
    flex: 1,
  },
  progressOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },
  progressOverlayDesktop: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 0,
  },
});
