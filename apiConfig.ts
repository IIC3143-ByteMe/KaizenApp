import Constants from "expo-constants";

export const BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL;

console.log("🧪 API_BASE_URL from Constants:", Constants.expoConfig?.extra?.API_BASE_URL || "🚨 MISSING API_BASE_URL");