"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { audioManager, SOUND_STORAGE_KEY } from "@/lib/audio";

interface SoundContextValue {
  enabled: boolean;
  toggle: () => void;
  unlock: () => void;
  playClick: () => void;
  playHover: () => void;
  playTransition: () => void;
  playMenuOpen: () => void;
  playMenuClose: () => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(SOUND_STORAGE_KEY);
    const initial = stored === null ? true : stored === "true";
    audioManager.enabled = initial;
    setEnabled(initial);
  }, []);

  const unlock = useCallback(() => {
    audioManager.unlock();
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      audioManager.enabled = next;
      localStorage.setItem(SOUND_STORAGE_KEY, String(next));
      if (next) {
        audioManager.playToggleOn();
      } else {
        audioManager.playToggleOff();
      }
      return next;
    });
  }, []);

  const playClick = useCallback(() => audioManager.playClick(), []);
  const playHover = useCallback(() => audioManager.playHover(), []);
  const playTransition = useCallback(() => audioManager.playTransition(), []);
  const playMenuOpen = useCallback(() => audioManager.playMenuOpen(), []);
  const playMenuClose = useCallback(() => audioManager.playMenuClose(), []);

  return (
    <SoundContext.Provider
      value={{
        enabled,
        toggle,
        unlock,
        playClick,
        playHover,
        playTransition,
        playMenuOpen,
        playMenuClose,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSoundContext(): SoundContextValue {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    throw new Error("useSoundContext must be used within SoundProvider");
  }
  return ctx;
}