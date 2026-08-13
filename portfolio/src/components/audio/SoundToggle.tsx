"use client";

import { useSoundContext } from "./SoundProvider";
import { cn } from "@/lib/utils";

export function SoundToggle() {
  const { enabled, toggle, unlock } = useSoundContext();

  return (
    <button
      type="button"
      className={cn("sound-toggle", enabled && "is-active")}
      onClick={() => {
        unlock();
        toggle();
      }}
      aria-label={enabled ? "Disable sound" : "Enable sound"}
      aria-pressed={enabled}
      title={enabled ? "Sound: On" : "Sound: Off"}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {enabled ? (
          <>
            <path d="M11 5 6 9H2v6h4l5 4V5z" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </>
        ) : (
          <>
            <path d="M11 5 6 9H2v6h4l5 4V5z" />
            <line x1="22" y1="9" x2="16" y2="15" />
            <line x1="16" y1="9" x2="22" y2="15" />
          </>
        )}
      </svg>
    </button>
  );
}