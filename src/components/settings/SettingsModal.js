import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Modal, TextInput, ScrollView, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { savePreset, loadPresets, deletePreset, saveLastUsedPreset } from "../../utils/storage";
import Button from "../ui/Button";

export default function SettingsModal({ visible, onClose, currentConfig, onSave }) {
  const [presets, setPresets] = useState({});
  const [selectedPreset, setSelectedPreset] = useState("-- New Preset --");
  const [presetName, setPresetName] = useState(currentConfig.name);
  const [workMin, setWorkMin] = useState(String(Math.floor(currentConfig.work_time_min)));
  const [workSec, setWorkSec] = useState(String(currentConfig.work_time_sec));
  const [breakMin, setBreakMin] = useState(String(Math.floor(currentConfig.break_time_min)));
  const [breakSec, setBreakSec] = useState(String(currentConfig.break_time_sec));
  const [rounds, setRounds] = useState(String(currentConfig.rounds));

  useEffect(() => {
    if (visible) {
      const loadData = async () => {
        await loadPresetsData();
        const presetNames = await loadPresets();
        if (currentConfig.name && presetNames[currentConfig.name]) {
          setSelectedPreset(currentConfig.name);
        } else {
          setSelectedPreset("-- New Preset --");
        }
        setPresetName(currentConfig.name);
        setWorkMin(String(Math.floor(currentConfig.work_time_min)));
        setWorkSec(String(currentConfig.work_time_sec));
        setBreakMin(String(Math.floor(currentConfig.break_time_min)));
        setBreakSec(String(currentConfig.break_time_sec));
        setRounds(String(currentConfig.rounds));
      };
      loadData();
    }
  }, [visible, currentConfig]);

  const loadPresetsData = async () => {
    const loadedPresets = await loadPresets();
    setPresets(loadedPresets);
  };

  const handlePresetChange = (presetName) => {
    setSelectedPreset(presetName);
    if (presetName !== "-- New Preset --" && presets[presetName]) {
      const preset = presets[presetName];
      setPresetName(preset.name);
      setWorkMin(String(preset.work_time_min));
      setWorkSec(String(preset.work_time_sec));
      setBreakMin(String(preset.break_time_min));
      setBreakSec(String(preset.break_time_sec));
      setRounds(String(preset.rounds));
    } else {
      setPresetName("");
    }
  };

  const handleSave = async () => {
    if (!presetName.trim()) {
      Alert.alert("Error", "Please enter a preset name");
      return;
    }

    const newConfig = {
      name: presetName,
      work_time_min: parseInt(workMin) || 0,
      work_time_sec: parseInt(workSec) || 0,
      break_time_min: parseInt(breakMin) || 0,
      break_time_sec: parseInt(breakSec) || 0,
      rounds: parseInt(rounds) || 1,
    };

    await savePreset(newConfig);
    await saveLastUsedPreset(newConfig);
    await loadPresetsData();
    onSave(newConfig);
  };

  const handleDelete = async () => {
    if (selectedPreset === "-- New Preset --" || !selectedPreset) {
      return;
    }

    const presetToDelete = selectedPreset;
    await deletePreset(presetToDelete);
    setSelectedPreset("-- New Preset --");
    setPresetName("");
    setWorkMin("0");
    setWorkSec("45");
    setBreakMin("0");
    setBreakSec("15");
    setRounds("8");
    await loadPresetsData();
  };

  const presetNames = ["-- New Preset --", ...Object.keys(presets)];

  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <KeyboardAvoidingView style={styles.modalOverlay} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>Timer Settings</Text>

            <View style={styles.section}>
              <Text style={styles.label}>Load Preset</Text>
              <View style={styles.pickerContainer}>
                <Picker selectedValue={selectedPreset} onValueChange={handlePresetChange} style={styles.picker}>
                  {presetNames.map((name) => (
                    <Picker.Item key={name} label={name} value={name} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Preset Name</Text>
              <TextInput style={styles.input} value={presetName} onChangeText={setPresetName} placeholder="Enter preset name..." />
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Number of Rounds</Text>
              <TextInput style={styles.input} value={rounds} onChangeText={setRounds} keyboardType="number-pad" maxLength={3} />
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Round Duration</Text>
              <View style={styles.timeInputContainer}>
                <TextInput style={styles.timeInput} value={workMin} onChangeText={setWorkMin} keyboardType="number-pad" maxLength={2} />
                <Text style={styles.timeLabel}>min</Text>
                <TextInput style={styles.timeInput} value={workSec} onChangeText={setWorkSec} keyboardType="number-pad" maxLength={2} />
                <Text style={styles.timeLabel}>sec</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Break Duration</Text>
              <View style={styles.timeInputContainer}>
                <TextInput style={styles.timeInput} value={breakMin} onChangeText={setBreakMin} keyboardType="number-pad" maxLength={2} />
                <Text style={styles.timeLabel}>min</Text>
                <TextInput style={styles.timeInput} value={breakSec} onChangeText={setBreakSec} keyboardType="number-pad" maxLength={2} />
                <Text style={styles.timeLabel}>sec</Text>
              </View>
            </View>

            <View style={styles.buttonRow}>
              {selectedPreset !== "-- New Preset --" && (
                <Button onPress={handleDelete} style={styles.dangerButton}>
                  <Text style={styles.dangerButtonText}>Delete Preset</Text>
                </Button>
              )}
              <View style={styles.spacer} />
              <Button variant="secondary" onPress={onClose} style={styles.actionButton}>
                Back
              </Button>
              <Button variant="secondary" onPress={handleSave} style={styles.actionButton}>
                Save
              </Button>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    width: "90%",
    maxWidth: 500,
    maxHeight: "85%",
  },
  title: {
    fontFamily: "BarlowCondensed-Bold",
    fontSize: 28,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontFamily: "BarlowCondensed-SemiBold",
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontFamily: "BarlowCondensed-Regular",
    fontSize: 18,
    color: "#333",
    height: 50,
  },
  pickerContainer: {
    backgroundColor: "#F5F5F5",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    overflow: "hidden",
    height: 50,
  },
  picker: {
    height: 50,
    fontSize: 18,
  },
  timeInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  timeInput: {
    backgroundColor: "#F5F5F5",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    fontFamily: "BarlowCondensed-Regular",
    fontSize: 18,
    color: "#333",
    flex: 1,
    height: 50,
    textAlign: "center",
    minWidth: 60,
  },
  timeLabel: {
    fontFamily: "BarlowCondensed-Regular",
    fontSize: 16,
    color: "#666",
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  spacer: {
    flex: 1,
  },
  actionButton: {
    marginLeft: 10,
  },
  dangerButton: {
    backgroundColor: "#FF6B6B",
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 20,
    minWidth: 90,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  dangerButtonText: {
    fontFamily: "BarlowCondensed-Bold",
    fontSize: 16,
    color: "#fff",
  },
});
