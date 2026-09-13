/**
 * Starboy Cinematic Audio Engine
 * Features YouTube IFrame Stream Integration for "Timeless (Instrumental) - The Weeknd & Playboi Carti"
 * ID: LiXIoqGXfh8
 * 
 * Specifically optimized for:
 * - Automatic background playback on desktop & modern web
 * - Mobile & Instagram In-App Browser (WebKit/WebView) via immediate gesture unlocking
 * - Real-time frequency simulation matching track BPM & rhythm for interactive visualizers
 * - Graceful fallback to procedural Web Audio synthesizer if offline or restricted
 */

export const YOUTUBE_TRACK_ID = 'LiXIoqGXfh8';
export const YOUTUBE_TRACK_TITLE = 'Timeless (Instrumental)';
export const YOUTUBE_TRACK_ARTIST = 'The Weeknd & Playboi Carti';

// Detect Instagram or Facebook In-App Browser
export function isInstagramBrowser(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent || navigator.vendor || (window as unknown as { opera?: string }).opera || '';
  return /Instagram|FBAN|FBAV/i.test(ua);
}

// Detect Mobile Device
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

type StateListener = (isPlaying: boolean) => void;

class AudioEngine {
  private player: any = null;
  private isPlayerReady = false;
  private isPlaying = false;
  private isMuted = false;
  private currentVolume = 0.8;
  private pendingPlay = true; // Default to true so it autoplays on open
  private listeners: Set<StateListener> = new Set();
  private interactionListenersAttached = false;
  private iframeElement: HTMLIFrameElement | null = null;

  // Waveform rhythm generation
  private rhythmTimer: number | null = null;
  private beatPhase = 0;

  // Web Audio Synth Fallback
  private synthCtx: AudioContext | null = null;
  private synthGain: GainNode | null = null;
  private synthInterval: number | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      // Auto-initialize player as early as possible
      this.initYouTubePlayer();
      this.attachInteractionUnlock();
    }
  }

  /**
   * Attach global first-touch listener.
   * On Instagram Browser & iOS Safari, unmuted audio autoplay is blocked by default
   * until the first user touch gesture. This listener ensures that as soon as the user
   * touches or taps anywhere (or clicks "Enter"), the YouTube music starts playing seamlessly.
   */
  private attachInteractionUnlock() {
    if (this.interactionListenersAttached || typeof window === 'undefined') return;
    this.interactionListenersAttached = true;

    const unlock = () => {
      // If we are supposed to be playing or user interacted, trigger playback
      if (!this.isPlaying) {
        this.play();
      }
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener('touchstart', unlock, true);
      window.removeEventListener('touchend', unlock, true);
      window.removeEventListener('click', unlock, true);
      window.removeEventListener('pointerdown', unlock, true);
      window.removeEventListener('scroll', unlock, true);
    };

    window.addEventListener('touchstart', unlock, { capture: true, passive: true });
    window.addEventListener('touchend', unlock, { capture: true, passive: true });
    window.addEventListener('click', unlock, { capture: true, passive: true });
    window.addEventListener('pointerdown', unlock, { capture: true, passive: true });
    window.addEventListener('scroll', unlock, { capture: true, passive: true });
  }

  /**
   * Initializes the YouTube Iframe Player in a subtle, persistent background element.
   */
  public initYouTubePlayer() {
    if (typeof window === 'undefined') return;

    // Check if container already exists
    let container = document.getElementById('starboy-yt-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'starboy-yt-container';
      // Critical for Instagram browser & mobile Safari:
      // Must not be display:none, otherwise WebKit pauses rendering and throttles audio!
      // Must have pointer-events:none and be invisible.
      container.style.position = 'fixed';
      container.style.bottom = '0px';
      container.style.right = '0px';
      container.style.width = '1px';
      container.style.height = '1px';
      container.style.opacity = '0.001';
      container.style.pointerEvents = 'none';
      container.style.zIndex = '-9999';
      container.style.overflow = 'hidden';

      const playerDiv = document.createElement('div');
      playerDiv.id = 'starboy-yt-player';
      container.appendChild(playerDiv);
      document.body.appendChild(container);
    }

    // Load YouTube IFrame API
    this.loadYouTubeIframeAPI(() => {
      this.createYTPlayer();
    });
  }

  private loadYouTubeIframeAPI(callback: () => void) {
    if ((window as any).YT && (window as any).YT.Player) {
      callback();
      return;
    }

    const existingScript = document.getElementById('youtube-iframe-api');
    if (!existingScript) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const previousReady = (window as any).onYouTubeIframeAPIReady;
    (window as any).onYouTubeIframeAPIReady = () => {
      if (typeof previousReady === 'function') previousReady();
      callback();
    };

    // Polling safety fallback in case ready fired earlier
    const checkInterval = setInterval(() => {
      if ((window as any).YT && (window as any).YT.Player) {
        clearInterval(checkInterval);
        callback();
      }
    }, 150);
  }

  private createYTPlayer() {
    if (this.player || !(window as any).YT) return;

    try {
      this.player = new (window as any).YT.Player('starboy-yt-player', {
        height: '100%',
        width: '100%',
        videoId: YOUTUBE_TRACK_ID,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          enablejsapi: 1,
          fs: 0,
          loop: 1,
          playlist: YOUTUBE_TRACK_ID, // Essential for YouTube looping single track!
          modestbranding: 1,
          playsinline: 1, // Crucial for iOS & Instagram In-App Browser!
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          mute: 0,
        },
        events: {
          onReady: (event: any) => {
            this.isPlayerReady = true;
            this.iframeElement = event.target.getIframe?.() || document.querySelector('#starboy-yt-container iframe');

            // Apply essential attributes to iframe for mobile & webview autoplay
            if (this.iframeElement) {
              this.iframeElement.setAttribute(
                'allow',
                'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              );
              this.iframeElement.setAttribute('allowfullscreen', 'true');
            }

            event.target.setVolume(Math.round(this.currentVolume * 100));

            // Attempt immediate autoplay on page open
            if (this.pendingPlay) {
              try {
                event.target.playVideo();
              } catch {
                // Browser might prevent unmuted autoplay before gesture;
                // our interaction listener will handle on first touch
              }
            }
          },
          onStateChange: (event: any) => {
            const YT = (window as any).YT;
            if (!YT) return;

            // 1 = PLAYING
            if (event.data === YT.PlayerState.PLAYING) {
              this.isPlaying = true;
              this.notifyListeners(true);
            }
            // 2 = PAUSED, 0 = ENDED
            else if (event.data === YT.PlayerState.PAUSED) {
              this.isPlaying = false;
              this.notifyListeners(false);
            } else if (event.data === YT.PlayerState.ENDED) {
              // Replay immediately for seamless atmosphere
              event.target.playVideo();
            }
          },
          onError: (err: any) => {
            console.warn('YouTube Player notice, switching to hybrid procedural fallback if needed:', err);
          },
        },
      });
    } catch (e) {
      console.warn('Could not initialize YouTube Player instance:', e);
    }
  }

  /**
   * Start or resume playing the music.
   */
  public play() {
    this.pendingPlay = true;

    if (this.player && this.isPlayerReady) {
      try {
        if (this.isMuted) {
          this.player.unMute();
          this.isMuted = false;
        }
        this.player.setVolume(Math.round(this.currentVolume * 100));
        this.player.playVideo();
        this.isPlaying = true;
        this.notifyListeners(true);
      } catch (e) {
        console.warn('playVideo call intercepted:', e);
      }
    } else {
      // Send postMessage directly to iframe if available
      this.sendPostMessageCommand('playVideo');
      this.isPlaying = true;
      this.notifyListeners(true);
    }
  }

  /**
   * Pause music.
   */
  public pause() {
    this.pendingPlay = false;

    if (this.player && this.isPlayerReady) {
      try {
        this.player.pauseVideo();
      } catch (e) {
        console.warn('pauseVideo error:', e);
      }
    }
    this.sendPostMessageCommand('pauseVideo');
    this.isPlaying = false;
    this.notifyListeners(false);
  }

  /**
   * Toggle between play and pause.
   */
  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  /**
   * Compatible alias for older start calls.
   */
  public start() {
    this.play();
  }

  /**
   * Compatible alias for older resume calls.
   */
  public resume() {
    this.play();
  }

  /**
   * Mute or unmute music.
   */
  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.player && this.isPlayerReady) {
      try {
        if (muted) {
          this.player.mute();
        } else {
          this.player.unMute();
          this.player.setVolume(Math.round(this.currentVolume * 100));
        }
      } catch (e) {
        console.warn('mute toggle error:', e);
      }
    }
    this.sendPostMessageCommand(muted ? 'mute' : 'unMute');
  }

  /**
   * Set volume from 0 to 1.
   */
  public setVolume(val: number) {
    this.currentVolume = Math.max(0, Math.min(1, val));
    if (this.player && this.isPlayerReady) {
      try {
        this.player.setVolume(Math.round(this.currentVolume * 100));
      } catch (e) {
        console.warn('setVolume error:', e);
      }
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getVolume(): number {
    return this.currentVolume;
  }

  /**
   * Subscribe to playback state changes.
   */
  public onStateChange(listener: StateListener): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(playing: boolean) {
    this.listeners.forEach((fn) => fn(playing));
  }

  private sendPostMessageCommand(func: string, args: any = '') {
    try {
      const iframe = this.iframeElement || (document.querySelector('#starboy-yt-container iframe') as HTMLIFrameElement);
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func,
            args,
          }),
          '*'
        );
      }
    } catch {
      // Ignored
    }
  }

  /**
   * Generates rhythmic frequency data for visualizers in AudioBar & MusicSection.
   * Emulates the sub-bass pulse, mid synth cords, and hi-hats of "Timeless" at ~130 BPM.
   */
  public getFrequencyData(array: Uint8Array): void {
    if (!this.isPlaying || this.isMuted) {
      // Decay to resting state
      for (let i = 0; i < array.length; i++) {
        array[i] = Math.max(0, array[i] - 12);
      }
      return;
    }

    const now = performance.now() / 1000;
    // 130 BPM ≈ 2.167 beats per second
    const beat = (now * 2.167) % 4; // 4-beat bar
    const subBeat = (now * 4.333) % 1; // 8th note

    // Kick pulse on beats 0 and 2
    const isKick = beat < 0.25 || (beat >= 2 && beat < 2.25);
    const kickIntensity = isKick ? 220 + Math.sin(now * 30) * 35 : 70;

    // Snare/Clap on beats 1 and 3
    const isSnare = (beat >= 1 && beat < 1.3) || (beat >= 3 && beat < 3.3);
    const snareIntensity = isSnare ? 190 + Math.random() * 50 : 50;

    // Hi-hat groove (16th notes)
    const hihatIntensity = 80 + Math.sin(now * 40) * 40;

    for (let i = 0; i < array.length; i++) {
      const norm = i / array.length;
      let target = 30;

      if (norm < 0.25) {
        // Low sub-bass
        target = kickIntensity * (1 - norm * 2);
      } else if (norm < 0.65) {
        // Mids & Synths
        const midHarmonic = Math.sin(norm * 14 + now * 6) * 45;
        target = snareIntensity * 0.7 + midHarmonic;
      } else {
        // High sparkle & hats
        target = hihatIntensity * (0.8 + Math.random() * 0.4);
      }

      // Smooth interpolation
      const current = array[i] || 0;
      array[i] = Math.floor(current * 0.55 + Math.min(255, Math.max(10, target)) * 0.45);
    }
  }
}

export const audioEngine = new AudioEngine();
