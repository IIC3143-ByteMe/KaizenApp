export default ({ config }) => ({
  ...config,
  expo: {
    ...config.expo,
    name: "KaizenApp",
    slug: "KaizenApp",
    scheme: "kaizenapp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/icon.png",
      resizeMode: "contain",
      backgroundColor: "#94A9FF"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      package: "com.ikigai.kaizenapp",
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "expo-router",
      "expo-secure-store",
      "expo-notifications"
    ],
    assetBundlePatterns: [
      "**/*"
    ],
    updates: {
      fallbackToCacheTimeout: 0
    },
    extra: {
      ...config.expo?.extra,
      router: {},
      eas: {
        projectId: "51436d55-3eaf-45bc-8bac-5351fa94b222"
      },
      API_BASE_URL: process.env.API_BASE_URL
    }
  }
});