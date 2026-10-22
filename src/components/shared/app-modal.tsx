import { clsx } from "clsx";
import { type ReactNode } from "react";
import { Pressable, ScrollView, useWindowDimensions, View } from "react-native";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useKeyboardHeight } from "@/hooks/use-keyboard-height";
import { AppText } from "./app-text";

type ModalVariant = "popup" | "bottom-sheet" | "top-sheet";

interface AppModalProps {
  isVisible: boolean;
  onClose: () => void;
  variant?: ModalVariant;
  title?: string;
  children: ReactNode;
  contentClassName?: string;
  showHandle?: boolean;
  // For a tall sheet with an input: the body scrolls within the space above the keyboard,
  // so lifting the sheet never pushes its top (and the field being typed in) off screen.
  // Not for a body that is itself a list (BottomSheetPicker), which would nest scroll views.
  scrollable?: boolean;
  modalProps?: Record<string, unknown>;
}

// The sheet handle, title and padding, plus a gap left above the sheet.
const SHEET_RESERVED_HEIGHT = 170;

const variantConfig = {
  popup: {
    animationIn: "zoomIn",
    animationOut: "zoomOut",
    style: { justifyContent: "center", alignItems: "center", margin: 24 },
  },
  "bottom-sheet": {
    animationIn: "slideInUp",
    animationOut: "slideOutDown",
    swipeDirection: "down",
    style: { justifyContent: "flex-end", margin: 0 },
  },
  "top-sheet": {
    animationIn: "slideInDown",
    animationOut: "slideOutUp",
    swipeDirection: "up",
    style: { justifyContent: "flex-start", margin: 0 },
  },
};

export const AppModal = function ({
  isVisible,
  onClose,
  variant = "popup",
  title,
  children,
  contentClassName,
  showHandle = false,
  scrollable = false,
  modalProps: modalOverrides = {},
}: AppModalProps) {
  const config = variantConfig[variant];
  const isSheet = variant === "bottom-sheet" || variant === "top-sheet";
  const keyboardHeight = useKeyboardHeight();
  const { height: windowHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const maxBodyHeight = windowHeight - keyboardHeight - insets.top - SHEET_RESERVED_HEIGHT;

  const resolvedProps = Object.assign(
    {} as any,
    {
      isVisible,
      onBackdropPress: onClose,
      onBackButtonPress: onClose,
      onSwipeComplete: onClose,
      backdropOpacity: 0.4,
      animationInTiming: 300,
      animationOutTiming: 250,
      useNativeDriverForBackdrop: true,
    },
    config,
    modalOverrides,
  );

  // Edge-to-edge modal windows on Android are not resized by the keyboard, and
  // react-native-modal's avoidKeyboard is iOS-only, so lift the content ourselves.
  if (variant !== "top-sheet") {
    resolvedProps.style = [resolvedProps.style, { paddingBottom: keyboardHeight }];
  }
  // Without it the sheet's swipe-to-close swallows the drag meant for the inner scroll.
  if (scrollable) resolvedProps.propagateSwipe = true;

  return (
    <Modal {...resolvedProps}>
      <View
        className={clsx(
          "bg-surface",
          isSheet
            ? "w-full px-5 pb-8 pt-4"
            : "w-full rounded-2xl px-5 pb-6 pt-5",
          variant === "bottom-sheet" && "rounded-t-2xl",
          variant === "top-sheet" && "rounded-b-2xl",
          contentClassName,
        )}
      >
        {showHandle && isSheet && (
          <View className="mb-4 items-center">
            <View className="h-1 w-10 rounded-full bg-line-strong" />
          </View>
        )}

        {title != null && (
          <View className="mb-4 flex-row items-center justify-between">
            <AppText type="title">{title}</AppText>
            <Pressable
              onPress={onClose}
              className="rounded-full p-1 active:opacity-60"
              hitSlop={8}
            >
              <AppText type="subtitle" className="text-foreground-muted">
                ✕
              </AppText>
            </Pressable>
          </View>
        )}

        {scrollable ? (
          <ScrollView
            style={{ maxHeight: maxBodyHeight }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          children
        )}
      </View>
    </Modal>
  );
};
