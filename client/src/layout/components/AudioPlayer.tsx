import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

export const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);

  const { currentSong, isPlaying, playNext } = usePlayerStore();

  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      playNext();
    };

    audio?.addEventListener("ended", handleEnded);

    return () => audio?.removeEventListener("ended", handleEnded);
  }, [playNext]);

  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    const audio = audioRef.current;

    const isSongChange = prevSongRef.current !== currentSong?.audioUrl;

    if (isSongChange) {
      audio.src = currentSong?.audioUrl;
      audio.currentTime = 0;

      prevSongRef.current = currentSong?.audioUrl;
      if (isPlaying) audio.play();
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    if (!currentSong) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentSong.title,
      artist: currentSong.artist,
      artwork: [
        {
          src: currentSong.imageUrl,
          sizes: "96x96",
          type: "image/jpeg",
        },
        {
          src: currentSong.imageUrl,
          sizes: "256x256",
          type: "image/jpeg",
        },
        {
          src: currentSong.imageUrl,
          sizes: "512x512",
          type: "image/jpeg",
        },
      ],
    });
  }, [currentSong]);

  return <audio ref={audioRef} />;
};
