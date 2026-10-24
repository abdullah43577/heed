import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const SETUP_KEY = "heed_has_completed_setup";

interface SetupState {
  hasCompletedSetup: boolean;
  isLoading: boolean;
  checkSetupStatus: () => Promise<void>;
  completeSetup: () => Promise<void>;
  resetSetup: () => Promise<void>;
}

export const useSetupStore = create<SetupState>((set) => ({
  hasCompletedSetup: false,
  isLoading: true,

  checkSetupStatus: async () => {
    try {
      const value = await AsyncStorage.getItem(SETUP_KEY);
      set({ hasCompletedSetup: value === "true", isLoading: false });
    } catch {
      set({ hasCompletedSetup: false, isLoading: false });
    }
  },

  completeSetup: async () => {
    set({ hasCompletedSetup: true });
    try {
      await AsyncStorage.setItem(SETUP_KEY, "true");
    } catch {
      // A failed write only means setup is offered again; not worth surfacing.
    }
  },

  resetSetup: async () => {
    set({ hasCompletedSetup: false });
    await AsyncStorage.removeItem(SETUP_KEY).catch(() => undefined);
  },
}));
