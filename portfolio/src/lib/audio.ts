/**
 * Synthesized Web Audio API sound engine.
 * Generates all portfolio sounds programmatically — no external audio files.
 */

class AudioManager {
  private static instance: AudioManager | null = null;
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private _enabled = false;
  private lastHoverTime = 0;

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  get enabled(): boolean {
    return this._enabled;
  }

  set enabled(value: boolean) {
    this._enabled = value;
    if (value) {
      this.ensureContext();
    }
  }

  /**
   * Create/resume the AudioContext. Must be called after a user gesture.
   */
  ensureContext(): void {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioContextClass) return;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.6;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      void this.ctx.resume();
    }
  }

  /**
   * Do not autoplay audio before user interaction — call this on first click/tap.
   */
  unlock(): void {
    if (!this.enabled) return;
    this.ensureContext();
  }

  private getContext(): AudioContext | null {
    if (!this.enabled || typeof window === "undefined") return null;
    this.ensureContext();
    return this.ctx;
  }

  private tone(
    frequency: number,
    duration: number,
    type: OscillatorType = "sine",
    volume = 0.15,
    delay = 0,
    slideTo?: number,
  ): void {
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime + delay;

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, now);
    if (slideTo) {
      osc.frequency.exponentialRampToValueAtTime(slideTo, now + duration);
    }

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.05);
  }

  /** Subtle click for buttons, links, and interactive elements. */
  playClick(): void {
    this.tone(600, 0.08, "triangle", 0.12);
    this.tone(900, 0.06, "sine", 0.06, 0.02);
  }

  /** Extremely subtle hover feedback with a small cooldown. */
  playHover(): void {
    const now = Date.now();
    if (now - this.lastHoverTime < 80) return; // debounce
    this.lastHoverTime = now;
    this.tone(1200, 0.04, "sine", 0.04);
  }

  /** Full transition swoosh for page/preloader transitions. */
  playTransition(): void {
    this.tone(220, 0.4, "sine", 0.08, 0, 880);
    this.tone(440, 0.3, "triangle", 0.05, 0.05, 1100);
  }

  /** Menu open chime. */
  playMenuOpen(): void {
    this.tone(520, 0.12, "triangle", 0.1);
    this.tone(780, 0.12, "sine", 0.08, 0.06);
    this.tone(1040, 0.14, "sine", 0.06, 0.12);
  }

  /** Menu close chime. */
  playMenuClose(): void {
    this.tone(1040, 0.1, "triangle", 0.08);
    this.tone(780, 0.12, "sine", 0.06, 0.05);
    this.tone(520, 0.14, "sine", 0.05, 0.1);
  }

  /** Softer confirm/allow sound for the sound toggle. */
  playToggleOn(): void {
    this.tone(700, 0.1, "triangle", 0.1);
    this.tone(1050, 0.12, "sine", 0.08, 0.06);
  }

  /** Softer deny sound for the sound toggle. */
  playToggleOff(): void {
    this.tone(1050, 0.08, "triangle", 0.08);
    this.tone(700, 0.1, "sine", 0.06, 0.04);
  }
}

export const audioManager = AudioManager.getInstance();

export const SOUND_STORAGE_KEY = "portfolio-sound-enabled";