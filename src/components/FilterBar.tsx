import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES } from '../data/articles';

interface FilterBarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: 'latest' | 'readTime' | 'title';
  setSortBy: (sort: 'latest' | 'readTime' | 'title') => void;
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  totalCount,
}) => {
  return (
    <div className="space-y-4 py-6 border-b border-[#E6E0D6]">
      {/* Search and Sort Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#857B70]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search essays, artists, acoustic phenomena, pedals..."
            className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-[#D9D0C3] rounded focus:outline-none focus:border-[#8C3A27] text-[#1A1816] placeholder-[#9E9487] transition-colors"
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
            Showing {totalCount} {totalCount === 1 ? 'essay' : 'essays'}
          </span>
          <div className="flex items-center gap-1.5 border border-[#D9D0C3] rounded px-2.5 py-1.5 bg-white">
            <SlidersHorizontal className="w-3 h-3 text-[#857B70]" />
            <span className="text-[#857B70] font-mono">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'latest' | 'readTime' | 'title')}
              className="bg-transparent text-xs text-[#1A1816] font-medium focus:outline-none cursor-pointer"
            >
              <option value="latest">Publication Order</option>
              <option value="readTime">Reading Duration</option>
              <option value="title">Alphabetical Title</option>
            </select>
          </div>
        </div>

      </div>

      {/* Interactive Category Segmented Rail */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-xs">
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
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
  );
};
