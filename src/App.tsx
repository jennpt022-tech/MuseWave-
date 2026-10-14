/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { ARTICLES } from './data/articles';
import { Article } from './types';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { BlogsPage } from './components/BlogsPage';
import { AboutPage } from './components/AboutPage';
import { BookmarksView } from './components/BookmarksView';
import { ArticleView } from './components/ArticleView';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { NowPlayingBar } from './components/NowPlayingBar';
import { playRealSong, playSynth, stopAllAudio, subscribeToAudio } from './utils/audioPlayerManager';
import { STATIC_PAGES_SEO, ARTICLE_SEO_CONFIGS, applyPageSeo } from './utils/seoAndRouting';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [currentPage, setCurrentPage] = useState<'home' | 'blogs' | 'about' | 'saved'>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Global audio playback state
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    const unsub = subscribeToAudio((state) => {
      setIsAudioPlaying(state.isPlaying);
      setActivePlayingId(state.isPlaying && state.currentTrack ? state.currentTrack.id : null);
    });
    return unsub;
  }, []);

  // Bookmarking state (persisted in localStorage)
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('musewave_saved_articles') || localStorage.getItem('cadence_saved_articles');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleBookmark = (e: React.MouseEvent | string, id?: string) => {
    const targetId = typeof e === 'string' ? e : id;
    if (typeof e !== 'string') {
      e.stopPropagation();
    }
    if (!targetId) return;

    setBookmarkedIds(prev => {
      const next = prev.includes(targetId)
        ? prev.filter(item => item !== targetId)
        : [...prev, targetId];
      try {
        localStorage.setItem('musewave_saved_articles', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleClearBookmarks = () => {
    setBookmarkedIds([]);
    try {
      localStorage.removeItem('musewave_saved_articles');
      localStorage.removeItem('cadence_saved_articles');
    } catch {
      // ignore
    }
  };

  // Route resolution & SEO application
  const resolveRoute = useCallback((path: string, updateHistory = false) => {
    const normalized = path.replace(/\/+$/, '') || '/';
    const cleanSlug = normalized.replace(/^\//, '');

    // 1. Check if path corresponds to an article slug (or backward compatible slug)
    const matchedArticle = ARTICLES.find(a => {
      if (a.id === cleanSlug) return true;
      if (cleanSlug === 'best-songs-driving-gaming-studying' && a.id === 'best-songs-driving-studying') return true;
      if (cleanSlug === 'ai-music-generation-copyright-laws' && a.id === 'ai-music-copyright-laws') return true;
      if (cleanSlug === 'dynamic-ticket-pricing' && a.id === 'concert-ticket-prices') return true;
      return false;
    });

    if (matchedArticle) {
      const canonicalPath = `/${matchedArticle.id}`;
      setSelectedArticle(matchedArticle);
      setCurrentPath(canonicalPath);
      if (updateHistory || window.location.pathname !== canonicalPath) {
        window.history.pushState(null, '', canonicalPath);
      }
      const seo = ARTICLE_SEO_CONFIGS[matchedArticle.id] || {
        title: `${matchedArticle.title} | MuseWave`,
        description: matchedArticle.excerpt,
        path: canonicalPath,
        targetKeyword: '',
      };
      applyPageSeo({
        title: seo.title,
        description: seo.description,
        canonicalPath: canonicalPath,
      });
      return;
    }

    // 2. Static Pages
    setSelectedArticle(null);

    if (normalized === '/blogs' || normalized === '/music-blogs') {
      setCurrentPage('blogs');
      setCurrentPath('/blogs');
      if (updateHistory || window.location.pathname !== '/blogs') {
        window.history.pushState(null, '', '/blogs');
      }
      const seo = STATIC_PAGES_SEO['/blogs'];
      applyPageSeo({
        title: seo.title,
        description: seo.description,
        canonicalPath: '/blogs',
      });
    } else if (normalized === '/about' || normalized === '/about-musewave') {
      setCurrentPage('about');
      setCurrentPath('/about');
      if (updateHistory || window.location.pathname !== '/about') {
        window.history.pushState(null, '', '/about');
      }
      const seo = STATIC_PAGES_SEO['/about'];
      applyPageSeo({
        title: seo.title,
        description: seo.description,
        canonicalPath: '/about',
      });
    } else if (normalized === '/saved' || normalized === '/saved-articles') {
      setCurrentPage('saved');
      setCurrentPath('/saved');
      if (updateHistory || window.location.pathname !== '/saved') {
        window.history.pushState(null, '', '/saved');
      }
      const seo = STATIC_PAGES_SEO['/saved'];
      applyPageSeo({
        title: seo.title,
        description: seo.description,
        canonicalPath: '/saved',
      });
    } else {
      // Home default
      setCurrentPage('home');
      setCurrentPath('/');
      if (updateHistory && window.location.pathname !== '/') {
        window.history.pushState(null, '', '/');
      }
      const seo = STATIC_PAGES_SEO['/'];
      applyPageSeo({
        title: seo.title,
        description: seo.description,
        canonicalPath: '/',
      });
    }
  }, []);

  // Initial routing on page load & popstate listener for back/forward browser buttons
  useEffect(() => {
    resolveRoute(window.location.pathname, false);

    const handlePopState = () => {
      resolveRoute(window.location.pathname, false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [resolveRoute]);

  const handleNavigate = (path: string) => {
    resolveRoute(path, true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (article: Article) => {
    handleNavigate(`/${article.id}`);
  };

  const handleBackToBlogs = () => {
    handleNavigate('/blogs');
  };

  // Audio playback for articles (prioritizes real song preview audio)
  const handlePlayKeyTrack = (e: React.MouseEvent | Article, articleArg?: Article) => {
    const article = articleArg || (e as Article);
    if ('stopPropagation' in e) {
      e.stopPropagation();
    }

    if (isAudioPlaying && activePlayingId === article.id) {
      stopAllAudio();
      return;
    }

    if (article.keyTrack.realAudioUrl) {
      playRealSong({
        id: article.id,
        title: article.keyTrack.title,
        artist: article.keyTrack.artist,
        coverImage: article.coverImage,
        previewUrl: article.keyTrack.realAudioUrl,
        audioPreset: article.keyTrack.audioPreset,
        spotifyUrl: article.keyTrack.spotifyUrl,
        mode: 'real',
      });
    } else {
      playSynth(article.keyTrack.audioPreset, {
        id: article.id,
        title: article.keyTrack.title,
        artist: article.keyTrack.artist,
        coverImage: article.coverImage,
        audioPreset: article.keyTrack.audioPreset,
        spotifyUrl: article.keyTrack.spotifyUrl,
        mode: 'synth',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1A1816] selection:bg-[#E2D8CE] selection:text-[#1A1816] pb-24">
      
      {/* Top Main Navigation Bar */}
      <Header
        currentPath={currentPath}
        onNavigate={handleNavigate}
        savedCount={bookmarkedIds.length}
        onOpenSearch={() => setIsSearchModalOpen(true)}
      />

      {/* Main Page Area */}
      <main className="flex-1">
        
        {/* If an article is open, display full reading view with progress bar */}
        {selectedArticle ? (
          <ArticleView
            article={selectedArticle}
            onBack={handleBackToBlogs}
            onSelectArticle={handleSelectArticle}
            allArticles={ARTICLES}
            isBookmarked={bookmarkedIds.includes(selectedArticle.id)}
            onToggleBookmark={(id) => toggleBookmark(id)}
            isPlayingPreset={isAudioPlaying && activePlayingId === selectedArticle.id}
            onPlayKeyTrack={(art) => handlePlayKeyTrack(art)}
          />
        ) : (
          <>
            {/* Page 1: Home (Spotify-style player, Billboard Top 10, Verified Artist Hub) */}
            {currentPage === 'home' && (
              <HomePage
                onNavigateToBlogs={() => handleNavigate('/blogs')}
              />
            )}

            {/* Page 2: Dedicated Blogs Page (All 10 Long-Form Articles) */}
            {currentPage === 'blogs' && (
              <BlogsPage
                articles={ARTICLES}
                onSelectArticle={handleSelectArticle}
                onPlayKeyTrack={handlePlayKeyTrack}
                onToggleBookmark={toggleBookmark}
                isBookmarked={(id) => bookmarkedIds.includes(id)}
                playingPreset={isAudioPlaying ? activePlayingId : null}
              />
            )}

            {/* Page 3: About Page */}
            {currentPage === 'about' && (
              <AboutPage
                onNavigateToBlogs={() => handleNavigate('/blogs')}
              />
            )}

            {/* Page 4: Saved Reading List */}
            {currentPage === 'saved' && (
              <BookmarksView
                articles={ARTICLES}
                bookmarkedIds={bookmarkedIds}
                onSelectArticle={handleSelectArticle}
                onToggleBookmark={(e, id) => toggleBookmark(e, id)}
                onClearAll={handleClearBookmarks}
                onPlayKeyTrack={handlePlayKeyTrack}
                playingPreset={isAudioPlaying ? activePlayingId : null}
              />
            )}
          </>
        )}

      </main>

      {/* Search Modal (Cmd+K / Search button) */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        articles={ARTICLES}
        onSelectArticle={(art) => {
          handleSelectArticle(art);
          setIsSearchModalOpen(false);
        }}
      />

      {/* Persistent Spotify-Style Now Playing Bar */}
      <NowPlayingBar />

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSelectCategory={(_category) => {
          handleNavigate('/blogs');
        }}
      />

    </div>
  );
}
