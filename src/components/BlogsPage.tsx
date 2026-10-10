import React, { useState, useMemo } from 'react';
import { Article } from '../types';
import { CATEGORIES } from '../data/articles';
import { ArticleCard } from './ArticleCard';
import { Search, X, SlidersHorizontal, BookOpen } from 'lucide-react';

interface BlogsPageProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onPlayKeyTrack: (e: React.MouseEvent, article: Article) => void;
  onToggleBookmark: (e: React.MouseEvent, id: string) => void;
  isBookmarked: (id: string) => boolean;
  playingPreset: string | null;
}

export const BlogsPage: React.FC<BlogsPageProps> = ({
  articles,
  onSelectArticle,
  onPlayKeyTrack,
  onToggleBookmark,
  isBookmarked,
  playingPreset,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'latest' | 'readTime' | 'title'>('latest');

  const filteredArticles = useMemo(() => {
    let result = [...articles];

    if (selectedCategory !== 'All') {
      result = result.filter(a => a.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.author.name.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q)) ||
        a.keyTrack.title.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'readTime') {
      result.sort((a, b) => {
        const timeA = parseInt(a.readTime, 10) || 0;
        const timeB = parseInt(b.readTime, 10) || 0;
        return timeA - timeB;
      });
    }

    return result;
  }, [articles, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <header className="border-b border-[#E6E0D6] pb-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#857B70]">
          <BookOpen className="w-4 h-4 text-[#8C3A27]" />
          <span>The Music Blog · 10 Stories & Audio Breakdowns</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1A1816]">
          Music Guides, Vocal Craft & Industry Analysis
        </h1>
        <p className="text-base sm:text-lg text-[#524B41] font-serif italic max-w-3xl leading-relaxed">
          From driving/gaming/study focus playlists and essential vocal warm-ups to beginner acoustic guitar, TikTok virality, songwriting craft, AI music copyright, and live concert economics.
        </p>

        {/* Listening Highlight Strip */}
        <div className="p-3 bg-[#F4EFE6] border border-[#DDD5C7] rounded flex items-center justify-between text-xs text-[#524B41]">
          <div className="flex items-center gap-2">
            <span className="text-base">🎧</span>
            <span className="font-medium text-[#1A1816]">Interactive Audio Included:</span>
            <span>Tap <strong className="text-[#8C3A27]">"Hear Sound Sample"</strong> on any article to hear the exact sound or beat being discussed.</span>
          </div>
        </div>
      </header>

      {/* Filter and Search Bar */}
      <div className="space-y-4 py-2">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#857B70]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, artist, sound design..."
              className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-[#D9D0C3] rounded focus:outline-none focus:border-[#8C3A27] text-[#1A1816] placeholder-[#9E9487]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-[#857B70] hover:text-[#1A1816]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort & Count */}
          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-[#574F45]">
            <span className="font-mono text-[#857B70] whitespace-nowrap">
              {filteredArticles.length} of {articles.length} articles
            </span>
            <div className="flex items-center gap-1.5 border border-[#D9D0C3] rounded px-2.5 py-1.5 bg-white">
              <SlidersHorizontal className="w-3 h-3 text-[#857B70]" />
              <span className="text-[#857B70] font-mono">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'latest' | 'readTime' | 'title')}
                className="bg-transparent text-xs text-[#1A1816] font-medium focus:outline-none cursor-pointer"
              >
                <option value="latest">Latest</option>
                <option value="readTime">Read Time</option>
                <option value="title">Title (A-Z)</option>
              </select>
            </div>
          </div>

        </div>

        {/* Category Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#1A1816] text-[#FAF8F5]'
                    : 'bg-[#F2ECE1] text-[#574F45] hover:bg-[#E7DFD2] hover:text-[#1A1816]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* The 10 Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="p-12 text-center bg-white border border-[#E6E0D6] space-y-3">
          <p className="font-serif text-lg text-[#1A1816]">No blog articles found matching your query.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="text-xs font-mono text-[#8C3A27] hover:underline cursor-pointer"
          >
            Clear filters and view all 10 articles →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onSelect={onSelectArticle}
              onPlayKeyTrack={onPlayKeyTrack}
              onToggleBookmark={onToggleBookmark}
              isBookmarked={isBookmarked(article.id)}
              isPlaying={playingPreset === article.keyTrack.audioPreset}
            />
          ))}
        </div>
      )}

    </div>
  );
};
