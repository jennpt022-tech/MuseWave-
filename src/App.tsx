/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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

export default function App() {
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
        mode: 'real'
      });
    } else {
      playSynth(article.keyTrack.audioPreset, {
        id: article.id,
        title: article.keyTrack.title,
        artist: article.keyTrack.artist,
        coverImage: article.coverImage,
        audioPreset: article.keyTrack.audioPreset,
        spotifyUrl: article.keyTrack.spotifyUrl,
        mode: 'synth'
      });
    }
  };

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBlogs = () => {
    setSelectedArticle(null);
    setCurrentPage('blogs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeClick = () => {
    setSelectedArticle(null);
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1A1816] selection:bg-[#E2D8CE] selection:text-[#1A1816] pb-24">
      
      {/* Top Main Navigation Bar */}
      <Header
        currentPage={currentPage}
        setCurrentPage={(page) => {
          setSelectedArticle(null);
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedCount={bookmarkedIds.length}
        onOpenSearch={() => setIsSearchModalOpen(true)}
      />

      {/* Main Page Area */}
      <main className="flex-1">
        
        {/* If an article is open, display full reading view with subtle progress bar */}
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
            {/* Page 1: Home (Spotify-style player, Billboard Top 10, and Music Industry News - NO blogs on home page) */}
            {currentPage === 'home' && (
              <HomePage
                onNavigateToBlogs={() => {
                  setCurrentPage('blogs');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {/* Page 2: Dedicated Blogs Page (All 10 Articles) */}
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
                onNavigateToBlogs={() => {
                  setCurrentPage('blogs');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
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
        onSelectCategory={(_category) => {
          setSelectedArticle(null);
          setCurrentPage('blogs');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBlogs={() => {
          setSelectedArticle(null);
          setCurrentPage('blogs');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAbout={() => {
          setSelectedArticle(null);
          setCurrentPage('about');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onHomeClick={handleHomeClick}
      />

    </div>
  );
}
