"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Disc3, Pause, Play } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  fetchRecentlyPlayedTracks,
  formatArtworkUrl,
  getMusicKit,
  type MusicKitResource,
} from "@/shared/lib/apple-music";
import { cn } from "@/shared/lib/utils";

interface RecentTrack {
  id: string;
  name: string;
  artistName: string;
  artworkUrl?: string;
}

function toRecentTrack(resource: MusicKitResource): RecentTrack {
  return {
    id: resource.id,
    name: resource.attributes?.name ?? "",
    artistName: resource.attributes?.artistName ?? "",
    artworkUrl: formatArtworkUrl(resource.attributes?.artwork, 160),
  };
}

/**
 * CD-style music button for the navbar.
 * - Default: not playing, shows the artwork of the most recently played track.
 * - While playing: the disc spins like a CD.
 * - First click opens Apple Music authorization (requires an Apple Music
 *   subscription); the token is then persisted by MusicKit JS.
 */
export default function MusicPlayer() {
  const t = useTranslations("MusicPlayer");
  const [track, setTrack] = useState<RecentTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // null = still probing, false = server not configured -> hide the widget
  const [available, setAvailable] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);

  const queuedTrackIdRef = useRef<string | null>(null);
  const trackRef = useRef<RecentTrack | null>(null);
  trackRef.current = track;

  type MusicKitInstance = Awaited<ReturnType<typeof getMusicKit>>;
  const musicKitRef = useRef<Promise<MusicKitInstance | null> | null>(null);
  const teardownRef = useRef<(() => void) | null>(null);

  // Idempotent: the MusicKit script is loaded (and the listener attached) at most once,
  // no matter how many times hover / focus / click ask for it.
  const initMusicKit = useCallback(() => {
    if (!musicKitRef.current) {
      musicKitRef.current = (async () => {
        try {
          const music = await getMusicKit();
          const handlePlaybackStateChange = () => setIsPlaying(music.isPlaying);
          music.addEventListener(
            "playbackStateDidChange",
            handlePlaybackStateChange,
          );
          teardownRef.current = () =>
            music.removeEventListener(
              "playbackStateDidChange",
              handlePlaybackStateChange,
            );
          setAvailable(true);

          if (music.isAuthorized) {
            const [latest] = await fetchRecentlyPlayedTracks(music, 1);
            if (latest) setTrack(toRecentTrack(latest));
          }
          return music;
        } catch {
          setAvailable(false);
          return null;
        }
      })();
    }
    return musicKitRef.current;
  }, []);

  useEffect(() => {
    let disposed = false;

    // Defer initialization until browser idle time to avoid blocking critical initial render
    const runIdle = () => {
      if (disposed) return;
      initMusicKit();
    };

    let cancelProbe: () => void;
    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(runIdle, { timeout: 4000 });
      cancelProbe = () => window.cancelIdleCallback(idleId);
    } else {
      const timerId = window.setTimeout(runIdle, 2500);
      cancelProbe = () => window.clearTimeout(timerId);
    }

    return () => {
      disposed = true;
      cancelProbe();
      teardownRef.current?.();
      teardownRef.current = null;
    };
  }, [initMusicKit]);

  const playTrack = useCallback(async (target: RecentTrack) => {
    const music = await getMusicKit();
    if (queuedTrackIdRef.current !== target.id) {
      await music.setQueue({ song: target.id });
      queuedTrackIdRef.current = target.id;
    }
    await music.play();
  }, []);

  const handleClick = async () => {
    if (busy || available === false) return;
    setBusy(true);
    try {
      const music = await getMusicKit();

      // First visit: authorize via Apple popup, then play the latest track.
      if (!music.isAuthorized) {
        await music.authorize();
        const [latest] = await fetchRecentlyPlayedTracks(music, 1);
        if (latest) {
          const recent = toRecentTrack(latest);
          setTrack(recent);
          await playTrack(recent);
        }
        return;
      }

      if (music.isPlaying) {
        music.pause();
        return;
      }

      let target = trackRef.current;
      if (!target) {
        const [latest] = await fetchRecentlyPlayedTracks(music, 1);
        if (latest) {
          target = toRecentTrack(latest);
          setTrack(target);
        }
      }
      if (target) await playTrack(target);
    } catch (error) {
      console.error("[MusicPlayer]", error);
      toast.error(t("errors.playback"));
    } finally {
      setBusy(false);
    }
  };

  if (available === false) return null;

  const tooltipText = !track
    ? t("connect")
    : `${isPlaying ? t("pause") : t("play")} — ${track.name} · ${track.artistName}`;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label={t("ariaLabel")}
            onClick={handleClick}
            onMouseEnter={() => initMusicKit()}
            onFocus={() => initMusicKit()}
            className={cn(
              "group relative block h-9 w-9 cursor-pointer rounded-full p-1 transition-opacity",
              busy && "opacity-60",
            )}
          >
            {/* spinning disc */}
            <span
              className="block h-full w-full overflow-hidden rounded-full border border-border shadow-sm"
              style={{
                animation: "cd-spin 12s linear infinite",
                animationPlayState: isPlaying ? "running" : "paused",
              }}
            >
              {track?.artworkUrl ? (
                <span
                  className="block h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${track.artworkUrl})` }}
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                  <Disc3 size={16} />
                </span>
              )}
            </span>
            {/* static center hole */}
            <span className="pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-background" />
            {/* hover play/pause indicator */}
            <span className="pointer-events-none absolute inset-1 flex items-center justify-center rounded-full bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100">
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            </span>
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={14}>
          <p className="max-w-56">{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
