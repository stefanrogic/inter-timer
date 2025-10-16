import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";

/**
 * Unified Button component that supports different variants
 * @param {string} variant - Button style variant: 'primary', 'secondary', 'icon', 'image'
 * @param {function} onPress - Button press handler
 * @param {ReactNode} children - Button content (text or icon)
 * @param {object} style - Additional styles for the button
 * @param {object} textStyle - Additional styles for the text
 * @param {string} imageSource - Image source for image variant
 * @param {boolean} disabled - Whether the button is disabled
 * @param {number} size - Size for icon buttons (width/height)
 */
export default function Button({ variant = "primary", onPress, children, style, textStyle, imageSource, disabled = false, size = 70 }) {
  const getButtonStyle = () => {
    switch (variant) {
      case "primary":
        return [styles.primaryButton, style];
      case "secondary":
        return [styles.secondaryButton, style];
      case "icon":
        return [styles.iconButton, { width: size, height: size, borderRadius: size / 2 }, style];
      case "image":
        return [styles.imageButton, style];
      case "transparent":
        return [styles.transparentButton, { width: size, height: size, borderRadius: size / 2 }, style];
      default:
        return [styles.primaryButton, style];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "primary":
        return [styles.primaryText, textStyle];
      case "secondary":
        return [styles.secondaryText, textStyle];
      default:
        return [styles.primaryText, textStyle];
    }
  };

  const renderContent = () => {
    if (variant === "image" && imageSource) {
      return <Image source={imageSource} style={styles.buttonImage} />;
    }

    if (typeof children === "string") {
      return <Text style={getTextStyle()}>{children}</Text>;
    }

    return children;
  };

  return (
    <TouchableOpacity style={getButtonStyle()} onPress={onPress} disabled={disabled} activeOpacity={0.7}>
      {renderContent()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    paddingHorizontal: 30,
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButton: {
    paddingHorizontal: 24,
    height: 50,
    backgroundColor: "#F5F5F5",
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
  },
  iconButton: {
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  imageButton: {
    width: 155,
    height: 50,
    borderRadius: 9999,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
    backgroundColor: "#FFFFFF",
  },
  transparentButton: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  primaryText: {
    fontFamily: "BarlowCondensed-Bold",
    fontSize: 16,
    letterSpacing: 1.2,
    color: "#333",
  },
  secondaryText: {
    fontFamily: "BarlowCondensed-SemiBold",
    fontSize: 16,
    letterSpacing: 1.2,
    color: "#333",
  },
  buttonImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
