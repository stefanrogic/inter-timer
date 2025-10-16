import { View, Text, StyleSheet } from "react-native";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerCopyright}>© 2025. All Rights Reserved.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 30,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  footerText: {
    fontFamily: "BarlowCondensed-SemiBold",
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  footerCopyright: {
    fontFamily: "BarlowCondensed-Regular",
    fontSize: 14,
    color: "#999",
  },
});
