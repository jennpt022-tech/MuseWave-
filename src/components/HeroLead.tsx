import React from 'react';
import { Article } from '../types';
import { ArrowUpRight, Play, Bookmark, Clock, User } from 'lucide-react';

interface HeroLeadProps {
  leadArticle: Article;
  secondaryArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onPlayKeyTrack: (e: React.MouseEvent, article: Article) => void;
  onToggleBookmark: (e: React.MouseEvent, id: string) => void;
  isBookmarked: (id: string) => boolean;
  playingPreset: string | null;
}

export const HeroLead: React.FC<HeroLeadProps> = ({
  leadArticle,
  secondaryArticles,
  onSelectArticle,
  onPlayKeyTrack,
  onToggleBookmark,
  isBookmarked,
  playingPreset,
}) => {
  return (
    <section className="border-b border-[#E6E0D6] pb-14">
      {/* Editorial Volume Kicker */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 text-xs font-mono tracking-widest text-[#857B70] uppercase border-b border-[#EDE6DC] mb-8">
        <span>Vol. VI — Special Issue: Acoustic Geometry & Physical Circuits</span>
        <span>Published Autumn 2026 · ISSN 2490-8812</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Tier 1: Lead Story (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative group overflow-hidden bg-[#EAE3D6] aspect-[16/9] border border-[#DDD5C7]">
            <img
              src={leadArticle.coverImage}
              alt={leadArticle.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale-[15%] group-hover:scale-[1.01] transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <button
              onClick={(e) => onToggleBookmark(e, leadArticle.id)}
              className="absolute top-4 right-4 p-2 bg-[#FAF8F5]/90 hover:bg-white text-[#1A1816] rounded backdrop-blur-sm transition-colors cursor-pointer shadow-sm"
              title={isBookmarked(leadArticle.id) ? 'Remove from saved' : 'Save to reading list'}
              aria-label="Bookmark article"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked(leadArticle.id) ? 'fill-[#8C3A27] text-[#8C3A27]' : ''}`} />
            </button>
          </div>

          <div className="space-y-3">
            {/* Zero-Pill unboxed metadata */}
            <div className="flex items-center gap-2 text-xs text-[#7A7165]">
              <span className="font-semibold text-[#8C3A27] uppercase tracking-wider">{leadArticle.category}</span>
              <span aria-hidden="true">·</span>
              <span>{leadArticle.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>{leadArticle.publishedDate}</span>
            </div>

            <h1
              onClick={() => onSelectArticle(leadArticle)}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1A1816] hover:text-[#8C3A27] cursor-pointer transition-colors leading-[1.15]"
              style={{ textWrap: 'balance' }}
            >
              {leadArticle.title}
            </h1>

            <p className="text-base sm:text-lg text-[#524B41] font-serif italic leading-relaxed">
              {leadArticle.subtitle}
            </p>

            <p className="text-sm text-[#4A433A] leading-relaxed line-clamp-3">
              {leadArticle.excerpt}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs text-[#6B6256]">
                <div className="w-7 h-7 rounded-full bg-[#E2D8CE] text-[#1A1816] font-serif font-bold flex items-center justify-center text-xs">
                  {leadArticle.author.avatarInitials}
                </div>
                <div>
                  <span className="font-medium text-[#1A1816] block">{leadArticle.author.name}</span>
                  <span className="text-[#857B70]">{leadArticle.author.role}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => onPlayKeyTrack(e, leadArticle)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border rounded transition-colors cursor-pointer ${
                    playingPreset === leadArticle.keyTrack.audioPreset
                      ? 'border-[#8C3A27] bg-[#F7EBE8] text-[#8C3A27]'
                      : 'border-[#D9D0C3] bg-[#FAF8F5] text-[#5A5247] hover:border-[#8C3A27]'
                  }`}
                  title="Hear the sonic breakdown"
                >
                  <Play className={`w-3 h-3 ${playingPreset === leadArticle.keyTrack.audioPreset ? 'fill-[#8C3A27]' : ''}`} />
                  <span>{playingPreset === leadArticle.keyTrack.audioPreset ? 'Playing Audio' : 'Play Sound Motif'}</span>
                </button>

                <button
                  onClick={() => onSelectArticle(leadArticle)}
                  className="flex items-center gap-1 px-4 py-2 text-xs font-medium text-white bg-[#1A1816] hover:bg-[#8C3A27] rounded transition-colors cursor-pointer"
                >
                  <span>Read Essay</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Tier 2: Secondary Features (5 cols) */}
        <div className="lg:col-span-5 space-y-8 lg:border-l lg:border-[#E6E0D6] lg:pl-10">
          <h2 className="text-xs uppercase font-mono tracking-widest text-[#857B70] pb-2 border-b border-[#E6E0D6]">
            Featured In This Issue
          </h2>

          <div className="space-y-8">
            {secondaryArticles.map((article) => {
              const isPlaying = playingPreset === article.keyTrack.audioPreset;
              return (
                <article key={article.id} className="group space-y-3">
                  <div className="flex gap-4 items-start">
                    <div className="w-28 sm:w-36 aspect-[4/3] shrink-0 bg-[#EAE3D6] overflow-hidden border border-[#DDD5C7]">
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#7A7165]">
                        <span className="font-semibold text-[#8C3A27] uppercase tracking-wider">{article.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{article.readTime}</span>
                      </div>
                      
                      <h3
                        onClick={() => onSelectArticle(article)}
                        className="font-serif text-lg sm:text-xl font-medium text-[#1A1816] group-hover:text-[#8C3A27] transition-colors cursor-pointer leading-snug"
                      >
                        {article.title}
                      </h3>

                      <p className="text-xs text-[#524B41] line-clamp-2 leading-relaxed">
                        {article.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-[#F0EBE1]">
                    <span className="text-[#857B70] text-[11px]">{article.author.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => onPlayKeyTrack(e, article)}
                        className={`text-[11px] font-mono px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                          isPlaying
                            ? 'border-[#8C3A27] bg-[#F7EBE8] text-[#8C3A27]'
                            : 'border-[#DDD5C7] text-[#635B50] hover:border-[#8C3A27]'
                        }`}
                      >
                        {isPlaying ? 'Playing Motif' : 'Audio Preview'}
                      </button>
                      <button
                        onClick={(e) => onToggleBookmark(e, article.id)}
                        className="p-1 text-[#7A7165] hover:text-[#8C3A27] cursor-pointer"
                        title={isBookmarked(article.id) ? 'Remove saved' : 'Save for later'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked(article.id) ? 'fill-[#8C3A27] text-[#8C3A27]' : ''}`} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Curatorial Quote Box */}
          <div className="p-4 bg-[#F2EDE4] border-l-2 border-[#8C3A27] space-y-2">
            <p className="font-serif text-xs italic text-[#4A4237] leading-relaxed">
              "To listen deeply is an act of defiance against a culture designed to fragment our attention into algorithmic shards."
            </p>
            <p className="text-[10px] uppercase font-mono tracking-wider text-[#857B70]">
              — Pauline Oliveros, Deep Listening
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
