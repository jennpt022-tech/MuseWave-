import React from 'react';
import { Article } from '../types';
import { Bookmark, ArrowRight, Trash2 } from 'lucide-react';
import { ArticleCard } from './ArticleCard';

interface BookmarksViewProps {
  articles: Article[];
  bookmarkedIds: string[];
  onSelectArticle: (article: Article) => void;
  onToggleBookmark: (e: React.MouseEvent, id: string) => void;
  onClearAll: () => void;
  onPlayKeyTrack: (e: React.MouseEvent, article: Article) => void;
  playingPreset: string | null;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  articles,
  bookmarkedIds,
  onSelectArticle,
  onToggleBookmark,
  onClearAll,
  onPlayKeyTrack,
  playingPreset,
}) => {
  const savedArticles = articles.filter(a => bookmarkedIds.includes(a.id));

  return (
    <div className="space-y-8 py-8">
      <div className="border-b border-[#E6E0D6] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#857B70]">
            <Bookmark className="w-4 h-4 text-[#8C3A27]" />
            <span>Personal Archive</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#1A1816]">
            Your Saved Reading List ({savedArticles.length})
          </h1>
          <p className="text-sm text-[#574F45]">
            Essays and sonic analyses saved for deep, uninterrupted study.
          </p>
        </div>

        {savedArticles.length > 0 && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-1.5 text-xs text-[#857B70] hover:text-[#8C3A27] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear list</span>
          </button>
        )}
      </div>

      {savedArticles.length === 0 ? (
        <div className="py-16 text-center space-y-3 bg-white border border-[#E6E0D6] p-8">
          <Bookmark className="w-8 h-8 text-[#857B70] mx-auto opacity-50" />
          <h3 className="font-serif text-lg font-medium text-[#1A1816]">Your reading list is empty</h3>
          <p className="text-xs text-[#6B6256] max-w-sm mx-auto">
            Click the bookmark icon on any essay or card to store it here for offline reading and research.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onSelect={onSelectArticle}
              onPlayKeyTrack={onPlayKeyTrack}
              onToggleBookmark={onToggleBookmark}
              isBookmarked={true}
              isPlaying={playingPreset === article.keyTrack.audioPreset}
            />
          ))}
        </div>
      )}
    </div>
  );
};
