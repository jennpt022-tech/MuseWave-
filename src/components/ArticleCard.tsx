import React, { useState } from 'react';
import { Article } from '../types';
import { Bookmark, Play, Pause, Volume2, Music2, Headphones, Sparkles, Clock } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
  onPlayKeyTrack: (e: React.MouseEvent, article: Article) => void;
  onToggleBookmark: (e: React.MouseEvent, id: string) => void;
  isBookmarked: boolean;
  isPlaying: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  onPlayKeyTrack,
  onToggleBookmark,
  isBookmarked,
  isPlaying,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group flex flex-col justify-between h-full bg-white border border-[#E6E0D6] hover:border-[#8C3A27] transition-all duration-200 shadow-xs hover:shadow-md rounded-sm overflow-hidden">
      
      {/* Top Image Frame with Audio Play Affordance */}
      <div className="relative aspect-[16/10] bg-[#ECE5D8] overflow-hidden border-b border-[#E6E0D6]">
        {!imgError ? (
          <img
            src={article.coverImage}
            alt={article.title}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#EAE2D5] to-[#DFD5C4] text-[#857B70] p-4 text-center">
            <Music2 className="w-8 h-8 mb-2 opacity-50 text-[#8C3A27]" />
            <span className="font-serif text-xs text-[#524B41] font-medium">{article.title}</span>
          </div>
        )}

        {/* Gradient Scrim for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Vibe Badge (Unboxed text with subtle backdrop) */}
        <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 text-white rounded text-[11px] font-mono tracking-wide backdrop-blur-xs flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#F5A623]" />
          <span>{article.vibe}</span>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={(e) => onToggleBookmark(e, article.id)}
          className="absolute top-3 right-3 p-1.5 bg-white/90 hover:bg-white text-[#1A1816] rounded-full backdrop-blur-sm transition-colors cursor-pointer shadow-sm"
          title={isBookmarked ? 'Remove saved' : 'Save for later'}
          aria-label="Bookmark article"
        >
          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#8C3A27] text-[#8C3A27]' : ''}`} />
        </button>

        {/* Prominent "Listen to the Sound" Button */}
        <button
          onClick={(e) => onPlayKeyTrack(e, article)}
          className={`absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 text-xs font-mono rounded backdrop-blur-md transition-all cursor-pointer shadow-sm ${
            isPlaying
              ? 'bg-[#8C3A27] text-white ring-2 ring-white/50'
              : 'bg-[#1A1816]/85 hover:bg-[#1A1816] text-[#FAF8F5]'
          }`}
          title="Listen to this article's sound breakdown"
        >
          <div className="flex items-center gap-2 min-w-0">
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 shrink-0 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 shrink-0 fill-current text-[#F5A623]" />
            )}
            <span className="truncate font-semibold">
              {isPlaying ? 'Playing Real Song' : 'Play Real Song Audio'}
            </span>
          </div>

          {/* Animated EQ Bars when Playing */}
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-3 shrink-0">
              <span className="w-0.5 h-2 bg-white animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-0.5 h-3 bg-white animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-0.5 h-1.5 bg-white animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          ) : (
            <Headphones className="w-3.5 h-3.5 shrink-0 text-white/70" />
          )}
        </button>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Metadata & Reading Time Estimate */}
          <div className="flex items-center justify-between gap-2 text-xs text-[#7A7165]">
            <span className="font-semibold text-[#8C3A27] uppercase tracking-wider text-[11px]">{article.category}</span>
            <span className="flex items-center gap-1 text-[#665D52] font-mono text-[11px] bg-[#F4EFE6] px-2 py-0.5 rounded border border-[#E6E0D6]">
              <Clock className="w-3 h-3 text-[#8C3A27]" />
              <span>{article.readTime}</span>
            </span>
          </div>

          <h3
            onClick={() => onSelect(article)}
            className="font-serif text-xl font-medium text-[#1A1816] group-hover:text-[#8C3A27] transition-colors cursor-pointer leading-snug line-clamp-2"
          >
            {article.title}
          </h3>

          <p className="text-xs text-[#524B41] font-serif italic line-clamp-2 leading-relaxed">
            {article.subtitle}
          </p>

          <p className="text-xs text-[#574F45] leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
        </div>

        {/* Card Footer: Author and Read CTA */}
        <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between text-xs text-[#7A7165]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#EAE2D5] text-[#1A1816] font-serif font-bold text-[11px] flex items-center justify-center">
              {article.author.avatarInitials}
            </div>
            <span className="text-[11px] text-[#4A433A] font-medium">{article.author.name}</span>
          </div>
          
          <button
            onClick={() => onSelect(article)}
            className="text-xs font-semibold text-[#8C3A27] hover:underline cursor-pointer flex items-center gap-0.5"
          >
            Read Story →
          </button>
        </div>

      </div>

    </article>
  );
};
