/**
 * Global audio player manager for real songs and audio synthesis.
 * Uses native HTML5 Audio for studio recording previews and Web Audio for acoustic simulation.
 */

import { playAudioPreset, stopCurrentAudio } from './audioEngine';

export interface PlayingTrackInfo {
  id: string;
  title: string;
  artist: string;
  coverImage?: string;
  previewUrl?: string;
  audioPreset?: string;
  spotifyUrl?: string;
  mode: 'real' | 'synth';
}

type AudioListener = (state: {
  isPlaying: boolean;
  currentTrack: PlayingTrackInfo | null;
  currentTime: number;
  duration: number;
  mode: 'real' | 'synth';
}) => void;

let audioElement: HTMLAudioElement | null = null;
let currentTrackInfo: PlayingTrackInfo | null = null;
let isAudioPlaying = false;
let currentMode: 'real' | 'synth' = 'real';
let stopSynthFn: (() => void) | null = null;
const listeners: Set<AudioListener> = new Set();

function notifyListeners() {
  const currentTime = audioElement ? audioElement.currentTime : 0;
  const duration = audioElement ? (audioElement.duration || 30) : 30;
  listeners.forEach(fn => fn({
    isPlaying: isAudioPlaying,
    currentTrack: currentTrackInfo,
    currentTime,
    duration,
    mode: currentMode,
  }));
}

function getAudioElement(): HTMLAudioElement {
  if (!audioElement) {
    audioElement = new Audio();
    audioElement.preload = 'auto';

    audioElement.addEventListener('timeupdate', () => {
      notifyListeners();
    });

    audioElement.addEventListener('ended', () => {
      isAudioPlaying = false;
      notifyListeners();
    });

    audioElement.addEventListener('pause', () => {
      isAudioPlaying = false;
      notifyListeners();
    });

    audioElement.addEventListener('play', () => {
      isAudioPlaying = true;
      notifyListeners();
    });

    audioElement.addEventListener('error', (e) => {
      console.warn('Real audio preview error, falling back if synth available', e);
      if (currentTrackInfo?.audioPreset) {
        playSynth(currentTrackInfo.audioPreset);
      } else {
        isAudioPlaying = false;
        notifyListeners();
      }
    });
  }
  return audioElement;
}

export function subscribeToAudio(listener: AudioListener): () => void {
  listeners.add(listener);
  notifyListeners();
  return () => {
    listeners.delete(listener);
  };
}

export function stopAllAudio() {
  if (audioElement) {
    audioElement.pause();
    audioElement.currentTime = 0;
  }
  if (stopSynthFn) {
    stopSynthFn();
    stopSynthFn = null;
  }
  stopCurrentAudio();
  isAudioPlaying = false;
  notifyListeners();
}

export function playRealSong(track: PlayingTrackInfo) {
  stopAllAudio();
  currentTrackInfo = { ...track, mode: 'real' };
  currentMode = 'real';

  if (!track.previewUrl && track.audioPreset) {
    playSynth(track.audioPreset);
    return;
  }

  if (track.previewUrl) {
    const audio = getAudioElement();
    audio.src = track.previewUrl;
    audio.volume = 0.85;
    audio.play().catch(err => {
      console.warn('Audio play failed, falling back to synth if available', err);
      if (track.audioPreset) {
        playSynth(track.audioPreset);
      }
    });
  }
  isAudioPlaying = true;
  notifyListeners();
}

export function playSynth(preset: string, track?: PlayingTrackInfo) {
  stopAllAudio();
  currentMode = 'synth';
  if (track) {
    currentTrackInfo = { ...track, mode: 'synth' };
  } else if (!currentTrackInfo) {
    currentTrackInfo = {
      id: preset,
      title: preset.replace(/-/g, ' ').toUpperCase(),
      artist: 'Acoustic Sound Breakdown',
      mode: 'synth',
      audioPreset: preset
    };
  }

  isAudioPlaying = true;
  stopSynthFn = playAudioPreset(preset, () => {
    isAudioPlaying = false;
    notifyListeners();
  });
  notifyListeners();
}

export function togglePlayPause() {
  if (currentMode === 'real' && audioElement) {
    if (audioElement.paused) {
      audioElement.play().catch(() => {});
    } else {
      audioElement.pause();
    }
  } else {
    if (isAudioPlaying) {
      stopAllAudio();
    } else if (currentTrackInfo?.audioPreset) {
      playSynth(currentTrackInfo.audioPreset);
    }
  }
}

export function seekAudio(fraction: number) {
  if (currentMode === 'real' && audioElement && audioElement.duration) {
    audioElement.currentTime = fraction * audioElement.duration;
  }
}

export function getCurrentAudioState() {
  return {
    isPlaying: isAudioPlaying,
    currentTrack: currentTrackInfo,
    currentTime: audioElement ? audioElement.currentTime : 0,
    duration: audioElement ? (audioElement.duration || 30) : 30,
    mode: currentMode,
  };
}
