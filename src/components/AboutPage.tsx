import React from 'react';
import { BookOpen, Disc3, Award, Users, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigateToBlogs: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateToBlogs }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <header className="border-b border-[#E6E0D6] pb-8 space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-[#857B70]">
          About The Publication
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1A1816]">
          MuseWave: Music Hub, Lore & Culture
        </h1>
        <p className="text-base sm:text-lg text-[#524B41] font-serif italic leading-relaxed">
          Founded in 2026 as an independent, reader-supported platform dedicated to sound discovery, viral music lore, and acoustic science.
        </p>
      </header>

      <div className="prose font-serif text-[#2B2723] space-y-6 leading-relaxed">
        <p className="text-lg">
          In an era where algorithmic playlists reduce music to 15-second background snippets, <strong className="text-[#1A1816]">MuseWave</strong> was created to slow down and listen with intent. We combine instant procedural audio playback with in-depth essays that bridge the gap between acoustic engineering, internet sound trends, and cultural history.
        </p>

        <h2 className="font-serif text-2xl font-medium text-[#1A1816] pt-4">
          Our Three Guiding Tenets
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose my-6">
          <div className="p-5 bg-white border border-[#E6E0D6] space-y-2">
            <Disc3 className="w-5 h-5 text-[#8C3A27]" />
            <h3 className="font-serif font-medium text-base text-[#1A1816]">Acoustic Rigor</h3>
            <p className="text-xs text-[#574F45] leading-relaxed">
              We investigate the physical circuits, microtonal tuning systems, and harmonic beating that give music its visceral power.
            </p>
          </div>

          <div className="p-5 bg-white border border-[#E6E0D6] space-y-2">
            <Users className="w-5 h-5 text-[#8C3A27]" />
            <h3 className="font-serif font-medium text-base text-[#1A1816]">Human Lineage</h3>
            <p className="text-xs text-[#574F45] leading-relaxed">
              Music is an unbroken human conversation across centuries, from West African iron bells to Roger Linn MPC samplers.
            </p>
          </div>

          <div className="p-5 bg-white border border-[#E6E0D6] space-y-2">
            <Award className="w-5 h-5 text-[#8C3A27]" />
            <h3 className="font-serif font-medium text-base text-[#1A1816]">Zero Sponsored Slop</h3>
            <p className="text-xs text-[#574F45] leading-relaxed">
              No sponsored brand deals or algorithmic filler. Only original research written by practicing musicians and scholars.
            </p>
          </div>
        </div>

        <p>
          Our archive contains 10 comprehensive essays spanning analog tape saturation, modal jazz theory, Japanese Kankyo Ongaku, the Amen break, glide guitar, microtonality, neo-soul pocket drumming, and the streaming loudness wars.
        </p>
      </div>

      <div className="pt-8 border-t border-[#E6E0D6] flex justify-center">
        <button
          onClick={onNavigateToBlogs}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1816] hover:bg-[#8C3A27] text-white text-xs font-mono uppercase tracking-wider rounded transition-colors cursor-pointer"
        >
          <BookOpen className="w-4 h-4" />
          <span>Explore All 10 Blog Essays</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
