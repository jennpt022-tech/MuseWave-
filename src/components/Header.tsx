import React from 'react';
import { Bookmark, Search, BookOpen } from 'lucide-react';

interface HeaderProps {
  currentPage: 'home' | 'blogs' | 'about' | 'saved';
  setCurrentPage: (page: 'home' | 'blogs' | 'about' | 'saved') => void;
  savedCount: number;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  savedCount,
  onOpenSearch,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E6E0D6] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Brand Title (Single text element wordmark) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage('home')}
            className="text-left group cursor-pointer focus:outline-none"
            aria-label="MuseWave Homepage"
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1816] group-hover:text-[#8C3A27] transition-colors">
              MUSEWAVE
            </span>
          </button>
          <span className="hidden sm:inline-block text-[11px] uppercase tracking-widest text-[#857B70] border-l border-[#DCD5C9] pl-3 py-0.5">
            Music Journal & Blog
          </span>
        </div>

        {/* Zone 2: Clean, simple navigation links */}
        <nav className="flex items-center gap-6 sm:gap-8 text-sm font-medium text-[#574F45]">
          <button
            onClick={() => setCurrentPage('home')}
            className={`hover:text-[#1A1816] transition-colors cursor-pointer py-1 border-b-2 ${
              currentPage === 'home' ? 'border-[#8C3A27] text-[#1A1816]' : 'border-transparent'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => setCurrentPage('blogs')}
            className={`hover:text-[#1A1816] transition-colors cursor-pointer py-1 border-b-2 flex items-center gap-1.5 ${
              currentPage === 'blogs' ? 'border-[#8C3A27] text-[#1A1816]' : 'border-transparent'
            }`}
          >
            <span>Blog</span>
            <span className="text-[11px] font-mono bg-[#EFE9DF] text-[#8C3A27] font-semibold px-1.5 py-0.2 rounded-xs">
              10
            </span>
          </button>

          <button
            onClick={() => setCurrentPage('about')}
            className={`hover:text-[#1A1816] transition-colors cursor-pointer py-1 border-b-2 ${
              currentPage === 'about' ? 'border-[#8C3A27] text-[#1A1816]' : 'border-transparent'
            }`}
          >
            About
          </button>

          <button
            onClick={() => setCurrentPage('saved')}
            className={`hover:text-[#1A1816] transition-colors cursor-pointer py-1 border-b-2 hidden sm:flex items-center gap-1.5 ${
              currentPage === 'saved' ? 'border-[#8C3A27] text-[#1A1816]' : 'border-transparent'
            }`}
          >
            <span>Saved</span>
            {savedCount > 0 && (
              <span className="text-xs font-mono bg-[#E8DFD3] text-[#4A4237] px-1.5 py-0.2 rounded-xs">
                {savedCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#574F45] hover:text-[#1A1816] hover:bg-[#EFE9DF] rounded-md transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
            title="Search blog articles"
            aria-label="Search blog"
          >
            <Search className="w-4 h-4" />
            <span className="hidden md:inline text-xs text-[#857B70]">Search</span>
          </button>

          <button
            onClick={() => setCurrentPage('blogs')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#1A1816] hover:bg-[#8C3A27] rounded transition-colors cursor-pointer whitespace-nowrap"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Read Blogs</span>
          </button>
        </div>

      </div>
    </header>
  );
};
