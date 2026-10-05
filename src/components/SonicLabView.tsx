import React from 'react';
import { Article } from '../types';
import { Play, Pause, ArrowRight, Volume2, Activity, Disc, Sliders } from 'lucide-react';

interface SonicLabViewProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onPlayPreset: (preset: string) => void;
  onStopAudio: () => void;
  activePreset: string | null;
  isPlaying: boolean;
}

export const SonicLabView: React.FC<SonicLabViewProps> = ({
  articles,
  onSelectArticle,
  onPlayPreset,
  onStopAudio,
  activePreset,
  isPlaying,
}) => {
  return (
    <div className="space-y-10 py-8">
      {/* Editorial Header */}
      <div className="border-b border-[#E6E0D6] pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#857B70]">
          <Activity className="w-4 h-4 text-[#8C3A27]" />
          <span>Interactive Acoustic Laboratory</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1A1816]">
          The Cadence Sonic Archive
        </h1>
        <p className="text-base sm:text-lg text-[#524B41] font-serif italic max-w-3xl leading-relaxed">
          Ten real-time acoustic procedural demonstrations synthesized via Web Audio oscillators, filters, and micro-timing clocks. Hear the physics behind each article.
        </p>
      </div>

      {/* Grid of 10 Audio Motifs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article, idx) => {
          const isThisActive = isPlaying && activePreset === article.keyTrack.audioPreset;
          return (
            <div
              key={article.id}
              className={`p-6 border rounded-sm transition-all bg-white ${
                isThisActive
                  ? 'border-[#8C3A27] shadow-md ring-1 ring-[#8C3A27]/20'
                  : 'border-[#E6E0D6] hover:border-[#8C3A27]/40'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="font-mono text-xs text-[#857B70] uppercase">
                  Motif 0{idx + 1} · {article.category}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 bg-[#F2EDE4] text-[#635B50] rounded">
                  {article.keyTrack.presetLabel}
                </span>
              </div>

              <h2 className="font-serif text-xl font-medium text-[#1A1816] mb-1">
                {article.keyTrack.title}
              </h2>
              <p className="text-xs text-[#857B70] mb-3">
                Reference: <span className="text-[#1A1816] font-medium">{article.keyTrack.artist}</span> ({article.keyTrack.year})
              </p>

              <p className="text-xs text-[#524B41] leading-relaxed mb-6 font-serif">
                {article.keyTrack.significance}
              </p>

              <div className="pt-4 border-t border-[#F0EBE1] flex items-center justify-between gap-4">
                <button
                  onClick={() => {
                    if (isThisActive) {
                      onStopAudio();
                    } else {
                      onPlayPreset(article.keyTrack.audioPreset);
                    }
                  }}
                  className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono rounded transition-colors cursor-pointer ${
                    isThisActive
                      ? 'bg-[#8C3A27] text-white'
                      : 'bg-[#1A1816] text-[#FAF8F5] hover:bg-[#8C3A27]'
                  }`}
                >
                  {isThisActive ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Halt Synthesis</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Synthesize Motif</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onSelectArticle(article)}
                  className="flex items-center gap-1 text-xs font-medium text-[#8C3A27] hover:underline cursor-pointer"
                >
                  <span>Read Full Essay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {isThisActive && (
                <div className="mt-4 pt-3 border-t border-[#F0EBE1] flex items-center gap-1.5 h-4">
                  {[...Array(20)].map((_, barIdx) => (
                    <div
                      key={barIdx}
                      className="w-1 bg-[#8C3A27] rounded-full animate-pulse"
                      style={{
                        height: `${Math.max(4, Math.sin(barIdx * 0.7) * 14 + 4)}px`,
                        animationDuration: `${0.2 + (barIdx % 4) * 0.1}s`
                      }}
                    />
                  ))}
                  <span className="text-[10px] font-mono text-[#8C3A27] ml-2">Audio active</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
