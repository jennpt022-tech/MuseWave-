import React, { useState } from 'react';
import { Check, ArrowRight, BookOpen } from 'lucide-react';
import { CATEGORIES } from '../data/articles';

interface FooterProps {
  onNavigate: (path: string) => void;
  onSelectCategory?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectCategory,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 3000);
  };

  return (
    <footer className="border-t border-[#E6E0D6] bg-[#F2EDE4] text-[#1A1816] pt-16 pb-20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top 3-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Column 1: Publication Masthead (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="text-left font-serif text-3xl font-bold tracking-tight text-[#1A1816] hover:text-[#8C3A27] transition-colors cursor-pointer block"
              aria-label="MuseWave Music Journal Homepage"
            >
              MUSEWAVE
            </a>
            <p className="text-sm font-serif italic text-[#574F45] leading-relaxed max-w-md">
              An independent music blog and journal exploring the physics of sound, recording history, acoustic anthropology, and musical culture.
            </p>
            <div className="pt-2 text-xs font-mono text-[#857B70] space-y-1">
              <p>Autumn 2026 Edition · 10 Long-Form Essays</p>
              <p>Independent & Reader-Supported</p>
            </div>
          </div>

          {/* Column 2: Blog Topics & Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#857B70]">
              Blog Navigation
            </h3>
            <ul className="space-y-2 text-xs text-[#574F45]">
              <li>
                <a
                  href="/blogs"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/blogs');
                  }}
                  className="font-semibold text-[#8C3A27] hover:underline cursor-pointer flex items-center gap-1"
                  aria-label="Browse all 10 long-form music blog articles"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Browse All 10 Music Blog Articles</span>
                </a>
              </li>
              <li>
                <a
                  href="/blogs"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/blogs');
                    if (onSelectCategory) onSelectCategory('Focus & Productivity');
                  }}
                  className="hover:text-[#8C3A27] transition-colors cursor-pointer"
                  aria-label="Browse Focus and Productivity music articles"
                >
                  Focus & Productivity Music Articles
                </a>
              </li>
              <li>
                <a
                  href="/blogs"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/blogs');
                    if (onSelectCategory) onSelectCategory('Vocal Mastery');
                  }}
                  className="hover:text-[#8C3A27] transition-colors cursor-pointer"
                  aria-label="Browse Vocal Mastery singing warmup guides"
                >
                  Vocal Mastery & Warmup Guides
                </a>
              </li>
              <li>
                <a
                  href="/blogs"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/blogs');
                    if (onSelectCategory) onSelectCategory('Guitar & Gear');
                  }}
                  className="hover:text-[#8C3A27] transition-colors cursor-pointer"
                  aria-label="Browse Acoustic Guitar and Gear tutorials"
                >
                  Guitar Lessons & Acoustic Gear
                </a>
              </li>
              <li>
                <a
                  href="/blogs"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/blogs');
                    if (onSelectCategory) onSelectCategory('Songwriting Craft');
                  }}
                  className="hover:text-[#8C3A27] transition-colors cursor-pointer"
                  aria-label="Browse Songwriting Craft and lyrical analysis"
                >
                  Songwriting Craft & Lyric Structure
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/about');
                  }}
                  className="hover:text-[#8C3A27] transition-colors cursor-pointer pt-1 block"
                  aria-label="Read about MuseWave Sound Lab and editorial mission"
                >
                  About MuseWave Sound Lab
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: The Dispatch Newsletter (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#857B70]">
              Newsletter Dispatch
            </h3>
            <p className="text-xs text-[#574F45] leading-relaxed">
              Receive fresh deep-dive essays on music history and audio science straight to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="reader@music.org"
                  required
                  className="flex-1 px-3 py-2 text-xs bg-white border border-[#D9D0C3] rounded focus:outline-none focus:border-[#8C3A27] text-[#1A1816]"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#1A1816] hover:bg-[#8C3A27] text-white text-xs font-medium rounded transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-emerald-700 flex items-center gap-1 pt-1">
                  <Check className="w-3 h-3" />
                  <span>Subscribed successfully.</span>
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Hairline & Legal */}
        <div className="pt-8 border-t border-[#E2DBD0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#857B70]">
          <p>© 2026 MUSEWAVE Music Hub & Blog. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="/blogs"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/blogs');
              }}
              className="hover:text-[#1A1816] transition-colors cursor-pointer"
              aria-label="Explore all 10 Music Blog articles in our archive"
            >
              Music Blog Archive (10 Articles)
            </a>
            <span>·</span>
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/about');
              }}
              className="hover:text-[#1A1816] transition-colors cursor-pointer"
              aria-label="About MuseWave editorial sound team"
            >
              About Editorial Team
            </a>
            <span>·</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-[#1A1816] transition-colors cursor-pointer"
              aria-label="Scroll back to top of page"
            >
              Back to Top
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
