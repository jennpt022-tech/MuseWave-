import React, { useEffect, useRef } from 'react';
import { Article } from '../types';
import { Search, X, ArrowRight, Music, Clock } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
}) => {
  const [query, setQuery] = React.useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? articles.filter(a => {
        const q = query.toLowerCase();
        return (
          a.title.toLowerCase().includes(q) ||
          a.subtitle.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.author.name.toLowerCase().includes(q) ||
          a.keyTrack.title.toLowerCase().includes(q) ||
          a.keyTrack.artist.toLowerCase().includes(q) ||
          a.tags.some(t => t.toLowerCase().includes(q)) ||
          a.excerpt.toLowerCase().includes(q)
        );
      })
    : articles.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-2xl bg-[#FAF8F5] border border-[#D9D0C3] rounded shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E6E0D6] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#857B70] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search all 10 essays, sound designs, theories, or artists..."
            className="w-full text-base bg-transparent border-none focus:outline-none text-[#1A1816] placeholder-[#9E9487]"
          />
          <button
            onClick={onClose}
            className="p-1 text-[#857B70] hover:text-[#1A1816] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#857B70] px-2">
            {query.trim() ? `Search Results (${filtered.length})` : 'Curated Highlights'}
          </div>

          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#857B70]">
              No essays match your inquiry. Try searching "synth", "Miles", "drums", or "ambient".
            </div>
          ) : (
            filtered.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  onSelectArticle(article);
                  onClose();
                }}
                className="p-3.5 hover:bg-white border border-transparent hover:border-[#E6E0D6] rounded transition-all cursor-pointer group space-y-1"
              >
                <div className="flex items-center justify-between text-[11px] text-[#7A7165]">
                  <span className="font-mono text-[#8C3A27] uppercase">{article.category}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
                <h4 className="font-serif font-medium text-base text-[#1A1816] group-hover:text-[#8C3A27] transition-colors">
                  {article.title}
                </h4>
                <p className="text-xs text-[#6B6256] line-clamp-1">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-1.5 pt-1 text-[11px] text-[#857B70]">
                  <Music className="w-3 h-3 text-[#8C3A27]" />
                  <span>Key track: {article.keyTrack.title} — {article.keyTrack.artist}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#F2EDE4] border-t border-[#E6E0D6] flex items-center justify-between text-[11px] text-[#857B70] font-mono">
          <span>Esc to exit</span>
          <span>{articles.length} essays indexed</span>
        </div>
      </div>
    </div>
  );
};
