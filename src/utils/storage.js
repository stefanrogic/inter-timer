import AsyncStorage from "@react-native-async-storage/async-storage";

const PRESETS_KEY = "@interval_timer_presets";
const LAST_PRESET_KEY = "@interval_timer_last_preset";

export const savePreset = async (preset) => {
  try {
    const presetsJson = await AsyncStorage.getItem(PRESETS_KEY);
    const presets = presetsJson ? JSON.parse(presetsJson) : {};
    presets[preset.name] = preset;
    await AsyncStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
    return true;
  } catch (error) {
    console.error("Error saving preset:", error);
    return false;
  }
};

export const loadPresets = async () => {
  try {
    const presetsJson = await AsyncStorage.getItem(PRESETS_KEY);
    return presetsJson ? JSON.parse(presetsJson) : {};
  } catch (error) {
    console.error("Error loading presets:", error);
    return {};
  }
};

export const deletePreset = async (presetName) => {
  try {
    const presetsJson = await AsyncStorage.getItem(PRESETS_KEY);
    const presets = presetsJson ? JSON.parse(presetsJson) : {};
    delete presets[presetName];
    await AsyncStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
    return true;
  } catch (error) {
    console.error("Error deleting preset:", error);
    return false;
  }
};

export const saveLastUsedPreset = async (preset) => {
  try {
    await AsyncStorage.setItem(LAST_PRESET_KEY, JSON.stringify(preset));
    return true;
  } catch (error) {
    console.error("Error saving last preset:", error);
    return false;
  }
};

export const loadLastUsedPreset = async () => {
  try {
    const presetJson = await AsyncStorage.getItem(LAST_PRESET_KEY);
    return presetJson ? JSON.parse(presetJson) : null;
  } catch (error) {
    console.error("Error loading last preset:", error);
    return null;
  }
};
