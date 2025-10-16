import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";

export default function ColorPicker({ label, color, onChange }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Predefined color palette
  const colorPalette = [
    // Reds
    "#FF6B6B",
    "#FF5252",
    "#F44336",
    "#E53935",
    "#D32F2F",
    "#C62828",
    "#B71C1C",
    "#FF8A80",
    "#FF5252",
    "#FF1744",
    "#D50000",
    // Oranges
    "#FF9800",
    "#FF8C00",
    "#FF7043",
    "#F57C00",
    "#E65100",
    "#BF360C",
    "#FFB74D",
    "#FFA726",
    "#FF9800",
    "#FB8C00",
    "#F57C00",
    // Yellows/Golds
    "#FFD700",
    "#FFC107",
    "#FFB300",
    "#FFA000",
    "#FF8F00",
    "#FF6F00",
    "#FFEB3B",
    "#FFDD00",
    "#FBC02D",
    "#F9A825",
    // Greens
    "#4CAF50",
    "#66BB6A",
    "#43A047",
    "#388E3C",
    "#2E7D32",
    "#1B5E20",
    "#81C784",
    "#66BB6A",
    "#4CAF50",
    "#43A047",
    "#00C853",
    "#00BFA5",
    // Blues
    "#2196F3",
    "#42A5F5",
    "#1E88E5",
    "#1976D2",
    "#1565C0",
    "#0D47A1",
    "#64B5F6",
    "#42A5F5",
    "#2196F3",
    "#1E88E5",
    "#2979FF",
    "#2962FF",
    // Purples
    "#9C27B0",
    "#AB47BC",
    "#8E24AA",
    "#7B1FA2",
    "#6A1B9A",
    "#4A148C",
    "#BA68C8",
    "#AB47BC",
    "#9C27B0",
    "#8E24AA",
    "#7C4DFF",
    "#651FFF",
    // Pinks
    "#E91E63",
    "#EC407A",
    "#D81B60",
    "#C2185B",
    "#AD1457",
    "#880E4F",
    "#F48FB1",
    "#F06292",
    "#E91E63",
    "#D81B60",
    "#F50057",
    "#C51162",
    // Grays
    "#9E9E9E",
    "#757575",
    "#616161",
    "#424242",
    "#212121",
    "#BDBDBD",
    "#9E9E9E",
    "#757575",
    "#616161",
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.colorButton} onPress={() => setIsModalVisible(true)}>
        <View style={[styles.colorPreview, { backgroundColor: color }]} />
        <Text style={styles.colorText}>{color.toUpperCase()}</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent={true} animationType="fade" onRequestClose={() => setIsModalVisible(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <Text style={styles.modalTitle}>Select Color</Text>
            <ScrollView style={styles.paletteScroll} showsVerticalScrollIndicator={false}>
              <View style={styles.palette}>
                {colorPalette.map((paletteColor) => (
                  <TouchableOpacity
                    key={paletteColor}
                    style={[styles.paletteColor, { backgroundColor: paletteColor }, color === paletteColor && styles.selectedColor]}
                    onPress={() => {
                      onChange(paletteColor);
                      setIsModalVisible(false);
                    }}
                  >
                    {color === paletteColor && <View style={styles.checkmark} />}
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontFamily: "BarlowCondensed-SemiBold",
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  colorButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 12,
    gap: 12,
  },
  colorPreview: {
    width: 30,
    height: 30,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  colorText: {
    fontFamily: "BarlowCondensed-SemiBold",
    fontSize: 16,
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    width: "90%",
    maxWidth: 400,
    maxHeight: "80%",
  },
  modalTitle: {
    fontFamily: "BarlowCondensed-Bold",
    fontSize: 24,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  paletteScroll: {
    maxHeight: 400,
  },
  palette: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
  },
  paletteColor: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedColor: {
    borderColor: "#333",
    borderWidth: 3,
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderWidth: 2,
    borderColor: "#333",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontFamily: "BarlowCondensed-Bold",
    fontSize: 16,
    color: "#333",
  },
});
