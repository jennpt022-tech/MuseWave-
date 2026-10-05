import React, { useState } from 'react';
import { Check, ArrowRight, BookOpen } from 'lucide-react';
import { CATEGORIES } from '../data/articles';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onOpenBlogs: () => void;
  onOpenAbout: () => void;
  onHomeClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenBlogs,
  onOpenAbout,
  onHomeClick,
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
            <button
              onClick={onHomeClick}
              className="text-left font-serif text-3xl font-bold tracking-tight text-[#1A1816] hover:text-[#8C3A27] transition-colors cursor-pointer"
            >
              MUSEWAVE
            </button>
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
                <button
                  onClick={onOpenBlogs}
                  className="font-semibold text-[#8C3A27] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>All 10 Blog Articles</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Acoustics & Synthesis')}
                  className="hover:text-[#8C3A27] transition-colors cursor-pointer"
                >
                  Acoustics & Synthesis
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Jazz Studies')}
                  className="hover:text-[#8C3A27] transition-colors cursor-pointer"
                >
                  Jazz & Modal Harmony
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Rhythm & Heritage')}
                  className="hover:text-[#8C3A27] transition-colors cursor-pointer"
                >
                  Rhythm & African Clave
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Minimalism & Space')}
                  className="hover:text-[#8C3A27] transition-colors cursor-pointer"
                >
                  Japanese Ambient Music
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAbout}
                  className="hover:text-[#8C3A27] transition-colors cursor-pointer pt-1 block"
                >
                  About MuseWave
                </button>
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
            <button onClick={onOpenBlogs} className="hover:text-[#1A1816] transition-colors cursor-pointer">
              Blog (10 Articles)
            </button>
            <span>·</span>
            <button onClick={onOpenAbout} className="hover:text-[#1A1816] transition-colors cursor-pointer">
              About
            </button>
            <span>·</span>
            <button onClick={onHomeClick} className="hover:text-[#1A1816] transition-colors cursor-pointer">
              Back to Top
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
