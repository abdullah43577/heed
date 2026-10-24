import { Platform } from "react-native";
import * as Device from "expo-device";

export const getBaseUrl = function () {
  if (__DEV__) {
    if (Platform.OS === "android" && !Device.isDevice) {
      return "http://10.0.2.2:8890/v1";
      // return "https://heed-server.onrender.com/v1";
    }
    return `${process.env.EXPO_PUBLIC_API_URL}/v1`;
  }
  return "https://heed-server.onrender.com/v1";
};
