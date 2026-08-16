/**
 * Apple Music / MusicKit JS v3 helpers.
 *
 * The developer token is signed server-side (/api/music/token); the Music
 * User Token is obtained interactively via MusicKit's authorize() popup and
 * persisted by the SDK itself (localStorage), so re-authorization is not
 * needed on later visits.
 *
 * Docs:
 * - https://developer.apple.com/documentation/applemusicapi/
 * - https://developer.apple.com/documentation/applemusicapi/get-v1-me-recent-played-tracks
 */

export const MUSICKIT_JS_URL =
  "https://js-cdn.music.apple.com/musickit/v3/musickit.js";

export interface MusicKitArtwork {
  url: string; // contains {w}x{h} / {f} placeholders
  width?: number;
  height?: number;
}

export interface MusicKitSongAttributes {
  name?: string;
  artistName?: string;
  albumName?: string;
  artwork?: MusicKitArtwork;
}

export interface MusicKitResource {
  id: string;
  type: string;
  attributes?: MusicKitSongAttributes;
}

export interface MusicKitInstance {
  isAuthorized: boolean;
  isPlaying: boolean;
  playbackState: number;
  musicUserToken: string;
  developerToken: string;
  authorize(): Promise<string>;
  unauthorize(): Promise<unknown>;
  setQueue(options: { song?: string; songs?: string[] }): Promise<unknown>;
  play(): Promise<unknown>;
  pause(): void;
  stop(): void;
  addEventListener(event: string, callback: () => void): void;
  removeEventListener(event: string, callback: () => void): void;
}

interface MusicKitStatic {
  configure(options: {
    developerToken: string;
    app: { name: string; build: string };
  }): MusicKitInstance;
}

declare global {
  interface Window {
    MusicKit?: MusicKitStatic;
  }
}

let scriptPromise: Promise<void> | null = null;

/** Injects the official MusicKit JS v3 script once. */
export function loadMusicKitScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(
      new Error("MusicKit is only available in the browser"),
    );
  }
  if (window.MusicKit) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = MUSICKIT_JS_URL;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        scriptPromise = null;
        reject(new Error("Failed to load MusicKit JS"));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

let instance: MusicKitInstance | null = null;
let instancePromise: Promise<MusicKitInstance> | null = null;

/**
 * Loads the SDK, fetches the server-signed developer token and configures a
 * shared MusicKit instance. Throws "MUSIC_NOT_CONFIGURED" when the server has
 * no Apple Music credentials (used to hide the widget).
 */
export function getMusicKit(): Promise<MusicKitInstance> {
  if (instance) return Promise.resolve(instance);
  if (!instancePromise) {
    instancePromise = (async () => {
      await loadMusicKitScript();
      if (!window.MusicKit) throw new Error("MusicKit JS failed to initialize");

      const response = await fetch("/api/music/token");
      if (!response.ok) throw new Error("MUSIC_NOT_CONFIGURED");
      const { token } = (await response.json()) as { token: string };

      instance = window.MusicKit.configure({
        developerToken: token,
        app: { name: "yuzen.dev", build: "1.0.0" },
      });
      return instance;
    })();
    // Allow retry after transient failures (but not after "not configured").
    instancePromise.catch((error) => {
      if ((error as Error).message !== "MUSIC_NOT_CONFIGURED") {
        instancePromise = null;
      }
    });
  }
  return instancePromise;
}

/** Resolves Apple artwork URL placeholders ({w}, {h}, {f}). */
export function formatArtworkUrl(
  artwork?: MusicKitArtwork,
  size = 160,
): string | undefined {
  if (!artwork?.url) return undefined;
  return artwork.url
    .replace("{w}", String(size))
    .replace("{h}", String(size))
    .replace("{f}", "jpeg");
}

/**
 * Fetches the user's recently played tracks.
 * Requires both the developer token and the Music User Token; `types` is a
 * mandatory query parameter of this endpoint.
 */
export async function fetchRecentlyPlayedTracks(
  music: MusicKitInstance,
  limit = 1,
): Promise<MusicKitResource[]> {
  const url = `https://api.music.apple.com/v1/me/recent-played-tracks?limit=${limit}&types=songs`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${music.developerToken}`,
      "Music-User-Token": music.musicUserToken,
    },
  });
  if (!response.ok) {
    throw new Error(`recent-played-tracks request failed: ${response.status}`);
  }
  const json = (await response.json()) as { data?: MusicKitResource[] };
  return json.data ?? [];
}
