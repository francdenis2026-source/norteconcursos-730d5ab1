/** Small typed boundary around the official YouTube IFrame API. */
export interface LessonYoutubePlayer {
  playVideo(): void;
  pauseVideo(): void;
  nextVideo(): void;
  previousVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getCurrentTime(): number;
  getDuration(): number;
  getPlayerState(): number;
  mute(): void;
  unMute(): void;
  isMuted(): boolean;
  setPlaybackRate(rate: number): void;
  getPlaybackRate(): number;
  getAvailablePlaybackRates(): number[];
  getVideoData(): { title?: string; author?: string };
  getIframe(): HTMLIFrameElement;
  destroy(): void;
}
export interface LessonYoutubeApi {
  Player: new (
    element: HTMLElement,
    options: {
      host: string;
      videoId?: string;
      playerVars: Record<string, string | number>;
      events: {
        onReady(event: { target: LessonYoutubePlayer }): void;
        onStateChange(event: { data: number; target: LessonYoutubePlayer }): void;
        onError(): void;
        onPlaybackRateChange(event: { data: number }): void;
      };
    },
  ) => LessonYoutubePlayer;
}
declare global {
  interface Window {
    YT?: LessonYoutubeApi;
    onYouTubeIframeAPIReady?: (() => void) | undefined;
  }
}
let pending: Promise<LessonYoutubeApi> | null = null;
export function loadYoutubePlayer(): Promise<LessonYoutubeApi> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (pending) return pending;
  const task = new Promise<LessonYoutubeApi>((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady;
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    const fail = () => {
      clearTimeout(timer);
      script.remove();
      window.onYouTubeIframeAPIReady = previous;
      reject(new Error("O YouTube não respondeu."));
    };
    const timer = window.setTimeout(fail, 15000);
    window.onYouTubeIframeAPIReady = () => {
      clearTimeout(timer);
      window.onYouTubeIframeAPIReady = previous;
      try {
        previous?.();
      } catch {
        /* Another subscriber must not prevent this player from loading. */
      }
      if (window.YT?.Player) resolve(window.YT);
      else fail();
    };
    script.onerror = fail;
    document.head.appendChild(script);
  });
  pending = task.catch((error: unknown) => {
    pending = null;
    throw error;
  });
  return pending;
}
