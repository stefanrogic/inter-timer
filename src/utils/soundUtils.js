import { Platform } from "react-native";
import { Audio } from "expo-av";

/**
 * Play different sounds for work and break phases ending
 * @param {boolean} isWorkEnding - True if work phase is ending, false if break phase is ending
 */
export const playBellSound = async (isWorkEnding) => {
  try {
    if (Platform.OS === "web") {
      // Use Web Audio API for web platform
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      if (isWorkEnding) {
        // Work phase ending - higher pitched double beep (rest time!)
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.15);
        oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.25);

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      } else {
        // Break phase ending - lower pitched single beep (back to work!)
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.15);

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.6);
      }
    } else {
      // Use expo-av for Android/iOS - play system notification sound
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
        });

        // Play the notification sound multiple times based on phase
        const beepCount = isWorkEnding ? 2 : 1; // 2 beeps for work end, 1 for break end

        for (let i = 0; i < beepCount; i++) {
          const { sound } = await Audio.Sound.createAsync({ uri: "https://actions.google.com/sounds/v1/alarms/beep_short.ogg" }, { shouldPlay: true, volume: 1.0 });

          await new Promise((resolve) => setTimeout(resolve, 200));
          await sound.unloadAsync();

          if (i < beepCount - 1) {
            await new Promise((resolve) => setTimeout(resolve, 150)); // Pause between beeps
          }
        }
      } catch (err) {
        console.log("Error playing notification sound:", err);
      }
    }
  } catch (error) {
    console.log("Error playing sound:", error);
  }
};

/**
 * Play countdown tick sound for last 5 seconds
 */
export const playTickSound = async () => {
  try {
    if (Platform.OS === "web") {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Short tick sound
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } else {
      const { sound } = await Audio.Sound.createAsync({ uri: "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg" }, { shouldPlay: true, volume: 0.3, positionMillis: 0, durationMillis: 100 });

      await sound.playAsync();
      setTimeout(() => sound.unloadAsync(), 200);
    }
  } catch (error) {
    console.log("Error playing tick sound:", error);
  }
};
