import { useState, useEffect, useRef } from "react";
import { playBellSound, playTickSound } from "../utils/soundUtils";

/**
 * Custom hook for managing timer state and logic
 * @param {object} config - Timer configuration object
 * @returns {object} Timer state and control functions
 */
export const useTimer = (config) => {
  const workTime = config.work_time_min * 60 + config.work_time_sec;
  const breakTime = config.break_time_min * 60 + config.break_time_sec;

  const [timeLeft, setTimeLeft] = useState(workTime);
  const [isRunning, setIsRunning] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [isWorkPhase, setIsWorkPhase] = useState(true);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const intervalRef = useRef(null);

  // Reset timer when config changes
  useEffect(() => {
    setTimeLeft(workTime);
    setCurrentRound(1);
    setIsWorkPhase(true);
    setIsRunning(false);
    setIsTimerActive(false);
  }, [config, workTime]);

  // Main timer effect
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          // Countdown with sound and flash for last 5 seconds
          if (prevTime > 0 && prevTime <= 5) {
            playTickSound();
            setIsFlashing(true);
            setTimeout(() => setIsFlashing(false), 500);
          }

          if (prevTime <= 1) {
            // Play phase ending sound
            playBellSound(isWorkPhase);

            // Pause for 1 second before transitioning
            setIsRunning(false);
            setTimeout(() => {
              if (isWorkPhase) {
                if (currentRound >= config.rounds) {
                  setIsTimerActive(false);
                  setCurrentRound(1);
                  setIsWorkPhase(true);
                  setTimeLeft(workTime);
                } else {
                  setIsWorkPhase(false);
                  setTimeLeft(breakTime);
                  setIsRunning(true);
                }
              } else {
                setIsWorkPhase(true);
                setCurrentRound((prev) => prev + 1);
                setTimeLeft(workTime);
                setIsRunning(true);
              }
            }, 1000);

            return 0;
          }

          return prevTime - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isWorkPhase, currentRound, config.rounds, workTime, breakTime]);

  const handlePlayPause = () => {
    if (!isTimerActive) {
      setIsTimerActive(true);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(workTime);
    setCurrentRound(1);
    setIsWorkPhase(true);
  };

  const handleHome = () => {
    setIsRunning(false);
    setIsTimerActive(false);
    setTimeLeft(workTime);
    setCurrentRound(1);
    setIsWorkPhase(true);
  };

  const progress = isWorkPhase ? (timeLeft / workTime) * 100 : (timeLeft / breakTime) * 100;

  return {
    timeLeft,
    isRunning,
    currentRound,
    isWorkPhase,
    isTimerActive,
    isFlashing,
    progress,
    handlePlayPause,
    handleReset,
    handleHome,
  };
};
