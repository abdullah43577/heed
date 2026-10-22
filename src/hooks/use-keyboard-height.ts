import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// The distance from the bottom of the screen to the top of the keyboard.
export const useKeyboardHeight = function () {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    // Android only emits the "Did" events.
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSubscription = Keyboard.addListener(showEvent, (event) =>
      setKeyboardHeight(event.endCoordinates.height),
    );
    const hideSubscription = Keyboard.addListener(hideEvent, () =>
      setKeyboardHeight(0),
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  // React Native on Android reports the IME inset minus the system bars, so the
  // navigation bar under the keyboard is missing from the height; iOS includes it.
  if (Platform.OS === "android" && keyboardHeight > 0) return keyboardHeight + insets.bottom;
  return keyboardHeight;
};
