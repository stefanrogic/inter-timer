import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform, Dimensions, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Svg, Path } from "react-native-svg";
import { savePreset, loadPresets, deletePreset, saveLastUsedPreset } from "../utils/storage";
import ColorPicker from "../components/settings/ColorPicker";
import Button from "../components/ui/Button";

const { width } = Dimensions.get("window");
const isDesktop = width >= 768;

const BackArrowIcon = ({ size = 24, color = "#333" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill={color} />
  </Svg>
);

const CloseIcon = ({ size = 24, color = "#333" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill={color} />
  </Svg>
);

export default function SettingsScreen({ currentConfig, onSave, onBack }) {
  const [profiles, setProfiles] = useState({});
  const [selectedProfile, setSelectedProfile] = useState("-- New Profile --");
  const [profileName, setProfileName] = useState(currentConfig.name);
  const [workMin, setWorkMin] = useState(String(Math.floor(currentConfig.work_time_min)));
  const [workSec, setWorkSec] = useState(String(currentConfig.work_time_sec));
  const [breakMin, setBreakMin] = useState(String(Math.floor(currentConfig.break_time_min)));
  const [breakSec, setBreakSec] = useState(String(currentConfig.break_time_sec));
  const [rounds, setRounds] = useState(String(currentConfig.rounds));
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const [idleColor, setIdleColor] = useState(currentConfig.idle_color || "#FFD700");
  const [workColor, setWorkColor] = useState(currentConfig.work_color || "#4CAF50");
  const [restColor, setRestColor] = useState(currentConfig.rest_color || "#FF6B6B");

  useEffect(() => {
    const loadData = async () => {
      await loadProfilesData();
      const profileNames = await loadPresets();
      if (currentConfig.name && profileNames[currentConfig.name]) {
        setSelectedProfile(currentConfig.name);
      } else {
        setSelectedProfile("-- New Profile --");
      }
      setProfileName(currentConfig.name);
      setWorkMin(String(Math.floor(currentConfig.work_time_min)));
      setWorkSec(String(currentConfig.work_time_sec));
      setBreakMin(String(Math.floor(currentConfig.break_time_min)));
      setBreakSec(String(currentConfig.break_time_sec));
      setRounds(String(currentConfig.rounds));
      setIdleColor(currentConfig.idle_color || "#FFD700");
      setWorkColor(currentConfig.work_color || "#4CAF50");
      setRestColor(currentConfig.rest_color || "#FF6B6B");
      setIsInitialLoad(false);
    };
    loadData();
  }, [currentConfig]);

  const loadProfilesData = async () => {
    const loadedProfiles = await loadPresets();
    setProfiles(loadedProfiles);
  };

  const handleProfileChange = async (profileName) => {
    setSelectedProfile(profileName);
    if (profileName !== "-- New Profile --" && profiles[profileName]) {
      const profile = profiles[profileName];
      setProfileName(profile.name);
      setWorkMin(String(profile.work_time_min));
      setWorkSec(String(profile.work_time_sec));
      setBreakMin(String(profile.break_time_min));
      setBreakSec(String(profile.break_time_sec));
      setRounds(String(profile.rounds));
      setIdleColor(profile.idle_color || "#FFD700");
      setWorkColor(profile.work_color || "#4CAF50");
      setRestColor(profile.rest_color || "#FF6B6B");

      // Load profile immediately to timer
      await saveLastUsedPreset(profile);
      onSave(profile, false);
    } else {
      // New profile - clear form
      setProfileName("");
      setWorkMin("0");
      setWorkSec("45");
      setBreakMin("0");
      setBreakSec("15");
      setRounds("8");
      setIdleColor("#FFD700");
      setWorkColor("#4CAF50");
      setRestColor("#FF6B6B");
    }
  };

  const handleSave = async () => {
    if (!profileName.trim()) {
      alert("Please enter a profile name");
      return;
    }

    // If we're editing an existing profile and changed the name, delete the old one
    if (selectedProfile !== "-- New Profile --" && selectedProfile !== profileName && profiles[selectedProfile]) {
      await deletePreset(selectedProfile);
    }

    const newConfig = {
      name: profileName,
      work_time_min: parseInt(workMin) || 0,
      work_time_sec: parseInt(workSec) || 0,
      break_time_min: parseInt(breakMin) || 0,
      break_time_sec: parseInt(breakSec) || 0,
      rounds: parseInt(rounds) || 1,
      idle_color: idleColor,
      work_color: workColor,
      rest_color: restColor,
    };

    await savePreset(newConfig);
    await saveLastUsedPreset(newConfig);
    await loadProfilesData();
    setSelectedProfile(profileName);
    onSave(newConfig, false);
  };

  const handleNewProfile = async () => {
    // Generate a unique profile name
    let newProfileName = "New Profile";
    let counter = 1;
    while (profiles[newProfileName]) {
      counter++;
      newProfileName = `New Profile ${counter}`;
    }

    // Create new profile with default values
    const newConfig = {
      name: newProfileName,
      work_time_min: 0,
      work_time_sec: 45,
      break_time_min: 0,
      break_time_sec: 15,
      rounds: 8,
      idle_color: "#FFD700",
      work_color: "#4CAF50",
      rest_color: "#FF6B6B",
    };

    // Save the profile
    await savePreset(newConfig);
    await saveLastUsedPreset(newConfig);
    await loadProfilesData();

    // Update form with the new profile
    setSelectedProfile(newProfileName);
    setProfileName(newProfileName);
    setWorkMin("0");
    setWorkSec("45");
    setBreakMin("0");
    setBreakSec("15");
    setRounds("8");
    setIdleColor("#FFD700");
    setWorkColor("#4CAF50");
    setRestColor("#FF6B6B");

    onSave(newConfig, false);
  };

  const handleDelete = async () => {
    if (selectedProfile === "-- New Profile --" || !selectedProfile) {
      return;
    }

    const profileToDelete = selectedProfile;
    await deletePreset(profileToDelete);
    setSelectedProfile("-- New Profile --");
    setProfileName("");
    setWorkMin("0");
    setWorkSec("45");
    setBreakMin("0");
    setBreakSec("15");
    setRounds("8");
    setIdleColor("#FFD700");
    setWorkColor("#4CAF50");
    setRestColor("#FF6B6B");
    await loadProfilesData();
  };

  const profileNames = Object.keys(profiles);

  const settingsContent = (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Timer Settings</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onBack}>
          {isDesktop ? <CloseIcon size={28} color="#333" /> : <BackArrowIcon size={28} color="#333" />}
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.section}>
            <Text style={styles.label}>Load Profile</Text>
            <View style={styles.pickerContainer}>
              <Picker selectedValue={selectedProfile === "-- New Profile --" ? "" : selectedProfile} onValueChange={handleProfileChange} style={styles.picker}>
                <Picker.Item key="placeholder" label="Select a profile..." value="" enabled={false} color="#999" />
                {profileNames.map((name) => (
                  <Picker.Item key={name} label={name} value={name} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Profile Name</Text>
            <TextInput style={styles.input} value={profileName} onChangeText={setProfileName} placeholder="Enter profile name..." />
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

          <ColorPicker label="Idle Color" color={idleColor} onChange={setIdleColor} />
          <ColorPicker label="Active Color" color={workColor} onChange={setWorkColor} />
          <ColorPicker label="Rest Color" color={restColor} onChange={setRestColor} />

          <View style={styles.buttonRow}>
            <Button variant="primary" onPress={handleSave} style={styles.saveButton} textStyle={styles.whiteText}>
              Save Profile
            </Button>
            <Button variant="secondary" onPress={handleNewProfile} style={styles.newProfileButton}>
              New Profile
            </Button>
          </View>

          <View style={styles.buttonRow}>
            {selectedProfile !== "-- New Profile --" && (
              <Button variant="secondary" onPress={handleDelete} style={styles.deleteButton} textStyle={styles.whiteText}>
                Delete Profile
              </Button>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );

  if (isDesktop) {
    return (
      <View style={styles.modalOverlay}>
        <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={onBack} />
        <View style={styles.modalContent}>
          <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            {settingsContent}
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      {settingsContent}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    maxWidth: 600,
    maxHeight: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    padding: 25,
    paddingTop: 10,
  },
  title: {
    fontFamily: "BarlowCondensed-Bold",
    fontSize: 28,
    color: "#333",
    flex: 1,
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
    fontFamily: "BarlowCondensed-Regular",
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
    gap: 10,
    alignItems: "center",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
  },
  newProfileButton: {
    flex: 1,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#FF6B6B",
  },
  whiteText: {
    color: "#FFF",
  },
});
