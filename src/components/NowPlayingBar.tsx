import React, { useState, useEffect } from 'react';
import { 
  subscribeToAudio, 
  togglePlayPause, 
  seekAudio, 
  stopAllAudio, 
  PlayingTrackInfo 
} from '../utils/audioPlayerManager';
import { 
  Play, 
  Pause, 
  Volume2, 
  X, 
  ExternalLink, 
  Disc, 
  Sparkles,
  Music2
} from 'lucide-react';

export const NowPlayingBar: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [track, setTrack] = useState<PlayingTrackInfo | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [mode, setMode] = useState<'real' | 'synth'>('real');

  useEffect(() => {
    const unsubscribe = subscribeToAudio((state) => {
      setIsPlaying(state.isPlaying);
      setTrack(state.currentTrack);
      setCurrentTime(state.currentTime);
      setDuration(state.duration || 30);
      setMode(state.mode);
    });
    return unsubscribe;
  }, []);

  if (!track) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const fraction = Math.max(0, Math.min(1, clickX / rect.width));
    seekAudio(fraction);
  };

  return (
    <aside
      aria-label="Now Playing Audio"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#141210]/95 backdrop-blur-md border-t border-[#2E2823] text-white shadow-2xl transition-all duration-300"
    >
      {/* Scrub Bar at Top of Bar */}
      <div 
        onClick={handleSeek}
        className="w-full h-1.5 bg-[#2E2823] hover:h-2.5 transition-all cursor-pointer relative group"
        title="Click to seek audio"
      >
        <div 
          className="h-full bg-[#8C3A27] relative"
          style={{ width: `${progressPercent}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        
        {/* Track Artwork & Info */}
        <div className="flex items-center gap-3 min-w-0 flex-1 max-w-sm sm:max-w-md">
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded bg-[#24201C] overflow-hidden shrink-0 border border-[#3D362F]">
            {track.coverImage ? (
              <img
                src={track.coverImage}
                alt={track.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#8C3A27]">
                <Disc className="w-6 h-6 animate-spin" />
              </div>
            )}
            {isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-2 bg-[#F5A623] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-0.5 h-3 bg-[#F5A623] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-0.5 h-1.5 bg-[#F5A623] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className={`text-[10px] font-mono uppercase px-1.5 py-0.2 rounded font-semibold tracking-wider ${
                mode === 'real' ? 'bg-[#8C3A27] text-white' : 'bg-[#F5A623] text-black'
              }`}>
                {mode === 'real' ? 'Real Song Audio' : 'Acoustic Model'}
              </span>
            </div>
            <h4 className="font-serif font-medium text-sm text-white truncate leading-snug">
              {track.title}
            </h4>
            <p className="text-xs text-[#A89F91] truncate">
              {track.artist}
            </p>
          </div>
        </div>

        {/* Play/Pause & Time Controls */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlayPause}
              className="w-10 h-10 rounded-full bg-white hover:bg-[#F5A623] text-black flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>
          </div>

          <span className="text-[10px] font-mono text-[#857B70] tabular-nums hidden sm:inline">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        {/* Right Actions: Real World Spotify Link & Close */}
        <div className="flex items-center gap-3 justify-end flex-1 max-w-[200px]">
          {track.spotifyUrl && (
            <a
              href={track.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1DB954] hover:bg-[#1ed760] text-black text-xs font-semibold rounded-full transition-colors"
              title="Open full track on Spotify"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Spotify</span>
            </a>
          )}

          <button
            onClick={() => stopAllAudio()}
            className="p-1.5 text-[#857B70] hover:text-white transition-colors cursor-pointer"
            title="Stop playback"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </aside>
  );
};
