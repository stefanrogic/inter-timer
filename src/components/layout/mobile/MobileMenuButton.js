import React from "react";
import { StyleSheet } from "react-native";
import { MenuIcon } from "../../icons";
import Button from "../../ui/Button";

export default function MobileMenuButton({ isTimerActive, onMenuPress }) {
  const iconColor = isTimerActive ? "#fff" : "#333";

  return (
    <Button variant="transparent" onPress={onMenuPress} style={styles.menuButton} size={60}>
      <MenuIcon size={28} color={iconColor} />
    </Button>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    position: "absolute",
    top: 20,
    right: 10,
    zIndex: 1000,
  },
});
