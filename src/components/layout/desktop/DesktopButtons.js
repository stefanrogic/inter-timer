import React from "react";
import { View, StyleSheet, Linking } from "react-native";
import Button from "../../ui/Button";
import { SettingsIcon } from "../../icons";

export default function DesktopButtons({ onSettingsPress }) {
  return (
    <View style={styles.container}>
      <Button variant="image" imageSource={require("../../../../assets/white-button.png")} onPress={() => Linking.openURL("https://buymeacoffee.com/stefanrogic")} style={styles.coffeeButton} />
      <Button variant="icon" onPress={onSettingsPress} style={styles.settingsButton} size={50}>
        <SettingsIcon size={24} color="#333" />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: "row",
    gap: 10,
    zIndex: 1000,
  },
  coffeeButton: {
    // No size overrides - let Button component handle it
  },
  settingsButton: {
    // No size overrides - let Button component handle it
  },
});
