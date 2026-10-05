import React from 'react';
import { Article } from '../types';
import { ArrowRight, Compass, Disc, Waves, Layers } from 'lucide-react';

interface SeriesViewProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const SeriesView: React.FC<SeriesViewProps> = ({
  articles,
  onSelectArticle,
}) => {
  const series = [
    {
      title: 'The Physics of Timbre & Dynamic Soundscapes',
      icon: Waves,
      description: 'An inquiry into how voltage, magnetic tape, digital limiters, and harmonic interference construct what human ears perceive as tonal warmth and physical space.',
      articleIds: [
        'analog-synthesis-warmth',
        'shoegaze-wall-of-sound',
        'microtonal-xenharmonic-frontiers',
        'mastering-loudness-wars-lufs',
      ]
    },
    {
      title: 'Rhythm, Time Elasticity & The Human Pulse',
      icon: Layers,
      description: 'From West African iron bells to Roger Linn MPC chips: why rigid digital grids fail to capture human swing, polyrhythm, and the delayed pocket.',
      articleIds: [
        'polyrhythms-west-african-clave',
        'amen-break-genealogy',
        'dangelo-j-dilla-drunk-drumming',
      ]
    },
    {
      title: 'Spatial Philosophy & Global Heritage',
      icon: Compass,
      description: 'Music not as entertainment, but as an architectural and ritual medium that dissolves the boundary between human attention and nature.',
      articleIds: [
        'miles-davis-kind-of-blue',
        'japanese-ambient-kankyo-ongaku',
        'andean-folklore-digital-cumbia',
      ]
    }
  ];

  return (
    <div className="space-y-12 py-8">
      <div className="border-b border-[#E6E0D6] pb-8 space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-[#857B70]">
          Curatorial Pathways
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1A1816]">
          Curated Thematic Series
        </h1>
        <p className="text-base sm:text-lg text-[#524B41] font-serif italic max-w-3xl leading-relaxed">
          Structured reading paths curated by the Cadence editorial board, connecting acoustic science with cultural movements.
        </p>
      </div>

      <div className="space-y-12">
        {series.map((s, idx) => {
          const Icon = s.icon;
          const seriesArticles = s.articleIds
            .map(id => articles.find(a => a.id === id))
            .filter((a): a is Article => Boolean(a));

          return (
            <div key={idx} className="border border-[#E6E0D6] bg-white p-6 sm:p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-[#F2EDE4] text-[#8C3A27] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#857B70]">
                    Series Collection 0{idx + 1}
                  </span>
                  <h2 className="font-serif text-2xl font-medium text-[#1A1816]">
                    {s.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#574F45] leading-relaxed max-w-3xl">
                    {s.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-[#F0EBE1]">
                {seriesArticles.map((article, aIdx) => (
                  <div
                    key={article.id}
                    onClick={() => onSelectArticle(article)}
                    className="p-4 border border-[#EDE6DC] hover:border-[#8C3A27] transition-all cursor-pointer group flex flex-col justify-between bg-[#FAF8F5]/50"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-[#7A7165]">
                        <span className="font-mono text-[#8C3A27]">Part {aIdx + 1}</span>
                        <span>{article.readTime}</span>
                      </div>
                      <h3 className="font-serif font-medium text-base text-[#1A1816] group-hover:text-[#8C3A27] transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-xs text-[#6B6256] line-clamp-2">
                        {article.subtitle}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#EDE6DC] flex items-center justify-between text-xs text-[#8C3A27] font-medium">
                      <span>Read essay</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
