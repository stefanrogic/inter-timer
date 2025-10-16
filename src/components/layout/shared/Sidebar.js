import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Animated, Dimensions, PanResponder } from "react-native";

const { width } = Dimensions.get("window");
const SIDEBAR_WIDTH = Math.min(width * 0.8, 320);

export default function Sidebar({ visible, onClose, onOpenSettings }) {
  const translateX = React.useRef(new Animated.Value(SIDEBAR_WIDTH)).current;

  React.useEffect(() => {
    Animated.timing(translateX, {
      toValue: visible ? 0 : SIDEBAR_WIDTH,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (_, gestureState) => {
        // Only start if dragging horizontally (not tapping)
        return Math.abs(gestureState.dx) > 2;
      },
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to rightward swipes
        return gestureState.dx > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 0) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > SIDEBAR_WIDTH / 3 || gestureState.vx > 0.5) {
          onClose();
        } else {
          Animated.timing(translateX, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  if (!visible && translateX._value === SIDEBAR_WIDTH) {
    return null;
  }

  return (
    <>
      {visible && <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose} />}
      <Animated.View style={[styles.sidebar, { transform: [{ translateX }] }]}>
        <View style={styles.header} {...panResponder.panHandlers}>
          <Text style={styles.title}>Menu</Text>
        </View>

        <View style={styles.menuItems}>
          <TouchableOpacity style={styles.menuItem} onPress={onOpenSettings}>
            <Text style={styles.menuItemText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 998,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    backgroundColor: "#fff",
    zIndex: 999,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontFamily: "BarlowCondensed-Bold",
    fontSize: 32,
    color: "#333",
  },
  menuItems: {
    flex: 1,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  menuItemText: {
    fontFamily: "BarlowCondensed-SemiBold",
    fontSize: 20,
    color: "#333",
  },
  closeButton: {
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  closeButtonText: {
    fontFamily: "BarlowCondensed-Bold",
    fontSize: 16,
    color: "#333",
  },
});
