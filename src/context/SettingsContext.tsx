import React, { createContext, useContext, useState, useEffect } from "react";

interface SettingsContextType {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
}

interface AppSettings {
  // Theme
  theme: "light" | "dark" | "system";
  highContrastMode: boolean;

  // Accessibility
  reduceMotion: boolean;
  fontSize: "small" | "medium" | "large";
  fontFamily: "default" | "dyslexicFriendly";

  // Audio
  masterVolume: number;
  sfxEnabled: boolean;

  // Gameplay
  questionTimer: boolean;
  timerDuration: number;
  showHints: boolean;
  showDetailedFeedback: boolean;

  // Privacy
  showOnLeaderboard: boolean;
  saveGameHistory: boolean;
  shareAnalytics: boolean;
}

const defaultSettings: AppSettings = {
  theme: "system",
  highContrastMode: false,
  reduceMotion: false,
  fontSize: "medium",
  fontFamily: "default",
  masterVolume: 70,
  sfxEnabled: true,
  questionTimer: true,
  timerDuration: 30,
  showHints: true,
  showDetailedFeedback: true,
  showOnLeaderboard: true,
  saveGameHistory: true,
  shareAnalytics: true,
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("appSettings");
      return saved ? JSON.parse(saved) : defaultSettings;
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem("appSettings", JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
