import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function FeaturesSection() {
  return (
    <View style={styles.featuresSection}>
      <View style={styles.featureBlock}>
        <Text style={styles.featureTitle}>Features</Text>
        <View style={styles.featureItem}>
          <Text style={styles.featureBullet}>•</Text>
          <Text style={styles.featureText}>
            <Text style={styles.featureBold}>Customizable Intervals:</Text> Set your own work and break times
          </Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureBullet}>•</Text>
          <Text style={styles.featureText}>
            <Text style={styles.featureBold}>Multiple Rounds:</Text> Configure how many cycles you want to complete
          </Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureBullet}>•</Text>
          <Text style={styles.featureText}>
            <Text style={styles.featureBold}>Sound Notifications:</Text> Audio alerts for phase transitions
          </Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureBullet}>•</Text>
          <Text style={styles.featureText}>
            <Text style={styles.featureBold}>Custom Colors:</Text> Personalize your timer with custom color schemes
          </Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureBullet}>•</Text>
          <Text style={styles.featureText}>
            <Text style={styles.featureBold}>Profile Management:</Text> Save and load your favorite timer configurations
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  featuresSection: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 60,
    paddingHorizontal: 40,
    alignItems: "center",
  },
  featureBlock: {
    maxWidth: 800,
    width: "100%",
  },
  featureTitle: {
    fontFamily: "BarlowCondensed-Bold",
    fontSize: 32,
    color: "#333",
    marginBottom: 30,
  },
  featureItem: {
    flexDirection: "row",
    marginBottom: 20,
  },
  featureBullet: {
    fontFamily: "BarlowCondensed-Regular",
    fontSize: 18,
    color: "#FF6B6B",
    marginRight: 10,
    marginTop: 2,
  },
  featureText: {
    fontFamily: "BarlowCondensed-Regular",
    fontSize: 18,
    color: "#666",
    flex: 1,
    lineHeight: 26,
  },
  featureBold: {
    fontFamily: "BarlowCondensed-Bold",
    color: "#333",
  },
});
