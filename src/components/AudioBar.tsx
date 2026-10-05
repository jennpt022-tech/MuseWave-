import React, { useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Disc3, Radio, ChevronUp, ChevronDown } from 'lucide-react';

interface AudioBarProps {
  isPlaying: boolean;
  activePreset: string | null;
  onTogglePlay: (preset: string) => void;
  onStop: () => void;
}

const AMBIENT_PRESETS = [
  { id: 'ambient-rain', name: 'Kyoto Rain & Chimes', desc: 'Minimalist pentatonic water droplets' },
  { id: 'analog-warmth', name: 'Modular Tape Drift', desc: 'Warm detuned saw waves & wow flutter' },
  { id: 'modal-jazz', name: 'Modal Jazz Rhodes', desc: 'So What quartal electric piano voicings' },
  { id: 'neo-soul-groove', name: 'Drunk Soul Pocket', desc: 'Late unquantized beat & velvet chords' },
];

export const AudioBar: React.FC<AudioBarProps> = ({
  isPlaying,
  activePreset,
  onTogglePlay,
  onStop,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('ambient-rain');

  const currentPresetInfo = AMBIENT_PRESETS.find(p => p.id === (activePreset || selectedPreset)) || AMBIENT_PRESETS[0];

  return (
    <aside 
      aria-label="Ambient listening console"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#1A1816] text-[#FAF8F5] border-t border-[#332D27] shadow-2xl transition-all duration-300"
    >
      {/* Top Drawer for sound selection */}
      {isExpanded && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 border-b border-[#2E2823] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {AMBIENT_PRESETS.map((p) => {
            const isThisPlaying = isPlaying && activePreset === p.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPreset(p.id);
                  onTogglePlay(p.id);
                }}
                className={`p-3 text-left rounded border transition-colors cursor-pointer ${
                  isThisPlaying
                    ? 'border-[#8C3A27] bg-[#2E1F1A] text-white'
                    : 'border-[#38312B] bg-[#211E1A] hover:border-[#6B6256] text-[#C4B9AA]'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="font-semibold text-white">{p.name}</span>
                  {isThisPlaying && <span className="w-2 h-2 rounded-full bg-[#8C3A27] animate-ping" />}
                </div>
                <p className="text-[11px] text-[#9E9487] line-clamp-1">{p.desc}</p>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Bar Strip */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        
        {/* Left: Indicator & Track Title */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded bg-[#2E2823] flex items-center justify-center shrink-0">
            <Disc3 className={`w-4 h-4 text-[#8C3A27] ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-white truncate">{currentPresetInfo.name}</span>
              <span className="text-[10px] font-mono text-[#857B70] uppercase hidden sm:inline">Ambient Canvas</span>
            </div>
            <p className="text-[11px] text-[#9E9487] truncate hidden md:block">{currentPresetInfo.desc}</p>
          </div>
        </div>

        {/* Center: Waveform bars */}
        <div className="hidden sm:flex items-center gap-1 h-5 px-3">
          {[...Array(12)].map((_, i) => (
            <span
              key={i}
              className={`w-0.5 rounded-full transition-all ${
                isPlaying ? 'bg-[#8C3A27]' : 'bg-[#4A4237]'
              }`}
              style={{
                height: isPlaying ? `${Math.sin(i * 0.8) * 12 + 8}px` : '4px',
                animation: isPlaying ? `pulse 1.2s ease-in-out infinite ${(i * 0.1)}s` : 'none'
              }}
            />
          ))}
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onTogglePlay(selectedPreset)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#8C3A27] hover:bg-[#A3432D] text-white text-xs font-mono rounded transition-colors cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play Atmosphere</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-xs text-[#9E9487] hover:text-white px-2 py-1 transition-colors cursor-pointer"
            title="Choose ambient soundscape"
          >
            <span className="hidden sm:inline">Presets</span>
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>
    </aside>
  );
};
