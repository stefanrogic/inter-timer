import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import TimerScreen from "./src/screens/TimerScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import Sidebar from "./src/components/layout/shared/Sidebar";
import { loadPresets, loadLastUsedPreset } from "./src/utils/storage";

const { width } = Dimensions.get("window");
const isDesktop = width >= 768;

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("timer");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [currentConfig, setCurrentConfig] = useState(null);

  const [fontsLoaded] = useFonts({
    "BarlowCondensed-Regular": require("./assets/fonts/BarlowCondensed-Regular.ttf"),
    "BarlowCondensed-Bold": require("./assets/fonts/BarlowCondensed-Bold.ttf"),
    "BarlowCondensed-SemiBold": require("./assets/fonts/BarlowCondensed-SemiBold.ttf"),
  });

  useEffect(() => {
    async function loadSettings() {
      const lastPreset = await loadLastUsedPreset();
      if (lastPreset) {
        setCurrentConfig(lastPreset);
      } else {
        setCurrentConfig({
          name: "Default",
          work_time_min: 0,
          work_time_sec: 45,
          break_time_min: 0,
          break_time_sec: 15,
          rounds: 8,
          idle_color: "#FFD700",
          work_color: "#4CAF50",
          rest_color: "#FF6B6B",
        });
      }
    }
    loadSettings();
  }, []);

  useEffect(() => {
    if (fontsLoaded && currentConfig) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, currentConfig]);

  if (!fontsLoaded || !currentConfig) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Desktop: Always show timer, settings as overlay */}
      {isDesktop && (
        <>
          <TimerScreen config={currentConfig} onSettingsPress={() => setCurrentScreen("settings")} onMenuPress={() => setSidebarVisible(true)} />
          {currentScreen === "settings" && (
            <SettingsScreen
              currentConfig={currentConfig}
              onSave={(newConfig, shouldClose = true) => {
                setCurrentConfig(newConfig);
                if (shouldClose) {
                  setCurrentScreen("timer");
                }
              }}
              onBack={() => setCurrentScreen("timer")}
            />
          )}
        </>
      )}

      {/* Mobile: Switch between screens */}
      {!isDesktop && (
        <>
          {currentScreen === "timer" && <TimerScreen config={currentConfig} onSettingsPress={() => setCurrentScreen("settings")} onMenuPress={() => setSidebarVisible(true)} />}
          {currentScreen === "settings" && (
            <SettingsScreen
              currentConfig={currentConfig}
              onSave={(newConfig, shouldClose = true) => {
                setCurrentConfig(newConfig);
                if (shouldClose) {
                  setCurrentScreen("timer");
                }
              }}
              onBack={() => setCurrentScreen("timer")}
            />
          )}
        </>
      )}

      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        onOpenSettings={() => {
          setSidebarVisible(false);
          setCurrentScreen("settings");
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
