import React from 'react';
import { Bookmark, Search, BookOpen } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  savedCount: number;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  savedCount,
  onOpenSearch,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E6E0D6] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Brand Title (Single text element wordmark) */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="text-left group cursor-pointer focus:outline-none"
            aria-label="MuseWave Homepage: Music Journal, Blogs & Artist Hub"
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1816] group-hover:text-[#8C3A27] transition-colors">
              MUSEWAVE
            </span>
          </a>
          <span className="hidden sm:inline-block text-[11px] uppercase tracking-widest text-[#857B70] border-l border-[#DCD5C9] pl-3 py-0.5">
            Music Journal & Blog
          </span>
        </div>

        {/* Zone 2: Clean, descriptive navigation links */}
        <nav className="flex items-center gap-6 sm:gap-8 text-sm font-medium text-[#574F45]">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className={`hover:text-[#1A1816] transition-colors cursor-pointer py-1 border-b-2 ${
              currentPath === '/' ? 'border-[#8C3A27] text-[#1A1816]' : 'border-transparent'
            }`}
            aria-label="MuseWave Homepage"
          >
            Home
          </a>

          <a
            href="/blogs"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/blogs');
            }}
            className={`hover:text-[#1A1816] transition-colors cursor-pointer py-1 border-b-2 flex items-center gap-1.5 ${
              currentPath === '/blogs' || currentPath === '/music-blogs' ? 'border-[#8C3A27] text-[#1A1816]' : 'border-transparent'
            }`}
            aria-label="Browse all 10 in-depth Music Blogs"
          >
            <span>Music Blogs</span>
            <span className="text-[11px] font-mono bg-[#EFE9DF] text-[#8C3A27] font-semibold px-1.5 py-0.2 rounded-xs">
              10
            </span>
          </a>

          <a
            href="/about"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/about');
            }}
            className={`hover:text-[#1A1816] transition-colors cursor-pointer py-1 border-b-2 ${
              currentPath === '/about' || currentPath === '/about-musewave' ? 'border-[#8C3A27] text-[#1A1816]' : 'border-transparent'
            }`}
            aria-label="About MuseWave Sound Lab and Mission"
          >
            About MuseWave
          </a>

          <a
            href="/saved"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/saved');
            }}
            className={`hover:text-[#1A1816] transition-colors cursor-pointer py-1 border-b-2 hidden sm:flex items-center gap-1.5 ${
              currentPath === '/saved' || currentPath === '/saved-articles' ? 'border-[#8C3A27] text-[#1A1816]' : 'border-transparent'
            }`}
            aria-label="View Saved Reading Library"
          >
            <span>Saved Articles</span>
            {savedCount > 0 && (
              <span className="text-xs font-mono bg-[#E8DFD3] text-[#4A4237] px-1.5 py-0.2 rounded-xs">
                {savedCount}
              </span>
            )}
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#574F45] hover:text-[#1A1816] hover:bg-[#EFE9DF] rounded-md transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
            title="Search blog articles"
            aria-label="Search all 10 blog articles and artists"
          >
            <Search className="w-4 h-4" />
            <span className="hidden md:inline text-xs text-[#857B70]">Search</span>
          </button>

          <a
            href="/blogs"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/blogs');
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#1A1816] hover:bg-[#8C3A27] rounded transition-colors cursor-pointer whitespace-nowrap"
            aria-label="Explore all 10 Music Blog Articles"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Explore All Music Blogs</span>
          </a>
        </div>

      </div>
    </header>
  );
};
