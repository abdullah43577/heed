const fs = require("fs");

const googleServicesFile =
  process.env.GOOGLE_SERVICES_JSON ??
  (fs.existsSync("./google-services.json")
    ? "./google-services.json"
    : undefined);

module.exports = ({ config }) => ({
  expo: {
    name: "Heed",
    slug: "heed",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "heed",
    // Not "light": forcing it makes iOS report a light scheme unconditionally,
    // so the SYSTEM theme can never resolve to dark.
    userInterfaceStyle: "automatic",
    ios: {
      icon: "./assets/images/icon.png",
      bundleIdentifier: "com.reactmode.heed",
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#0E7A63",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
      predictiveBackGestureEnabled: false,
      permissions: ["android.permission.INTERNET"],
      package: "com.reactmode.heed",
      ...(googleServicesFile && { googleServicesFile }),
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
      bundler: "metro",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          backgroundColor: "#FAFAFB",
          image: "./assets/images/splashscreen.png",
          resizeMode: "contain",
          imageWidth: 200,
          dark: {
            backgroundColor: "#0F0F12",
            image: "./assets/images/splashscreen-dark.png",
            resizeMode: "contain",
            imageWidth: 200,
          },
        },
      ],
      "expo-secure-store",
      "expo-image",
      "expo-notifications",
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: "7aaec9a4-a125-4eb0-a37e-1b7e183b9410",
      },
    },
    runtimeVersion: {
      policy: "appVersion",
    },
  },
});
