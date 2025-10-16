import React from "react";
import { useTimer } from "../hooks/useTimer";
import { getBackgroundColor, getProgressColor, getTextColor } from "../utils/colorUtils";
import TimerLayout from "../components/layout/TimerLayout";

export default function TimerScreen({ config, onSettingsPress, onMenuPress }) {
  const { timeLeft, isRunning, currentRound, isWorkPhase, isTimerActive, isFlashing, progress, handlePlayPause, handleHome } = useTimer(config);

  const backgroundColor = getBackgroundColor(isTimerActive, isWorkPhase, config);
  const progressColor = getProgressColor(isTimerActive, isWorkPhase, isFlashing, config);
  const textColor = getTextColor(isTimerActive, isWorkPhase);

  return (
    <TimerLayout
      timeLeft={timeLeft}
      currentRound={currentRound}
      totalRounds={config.rounds}
      isTimerActive={isTimerActive}
      isWorkPhase={isWorkPhase}
      isRunning={isRunning}
      backgroundColor={backgroundColor}
      progressColor={progressColor}
      textColor={textColor}
      progress={progress}
      profileName={config.name}
      onPlayPause={handlePlayPause}
      onHome={handleHome}
      onSettingsPress={onSettingsPress}
      onMenuPress={onMenuPress}
    />
  );
}
