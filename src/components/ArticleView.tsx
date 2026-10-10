import React, { useState, useEffect } from 'react';
import { Article, Comment } from '../types';
import { 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  Play, 
  Pause, 
  Volume2, 
  Check, 
  Heart, 
  MessageSquare, 
  Sparkles, 
  Sliders, 
  Music, 
  Disc, 
  ArrowRight,
  Sun,
  Moon,
  FileText,
  Headphones,
  Clock,
  ExternalLink,
  HelpCircle
} from 'lucide-react';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  allArticles: Article[];
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  isPlayingPreset: boolean;
  onPlayKeyTrack: (article: Article) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  onBack,
  onSelectArticle,
  allArticles,
  isBookmarked,
  onToggleBookmark,
  isPlayingPreset,
  onPlayKeyTrack,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [themeMode, setThemeMode] = useState<'paper' | 'night' | 'clean'>('paper');
  const [copied, setCopied] = useState(false);
  const [claps, setClaps] = useState(() => {
    const saved = localStorage.getItem(`cadence_claps_${article.id}`);
    return saved ? parseInt(saved, 10) : 42;
  });
  const [hasClapped, setHasClapped] = useState(false);

  // Comments state
  const [comments, setComments] = useState<Comment[]>(() => {
    const saved = localStorage.getItem(`cadence_comments_${article.id}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [
      {
        id: 'c1',
        articleId: article.id,
        authorName: 'Gabriel Vance',
        timestamp: '2 days ago',
        text: 'The distinction drawn here regarding acoustic beating versus mathematical tuning is extraordinary. Essential reading for anyone working in modern sound design.',
        likes: 14
      }
    ];
  });
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentAuthor, setNewCommentAuthor] = useState('');

  // Scroll tracking for reading progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset ?? window.scrollY ?? document.documentElement.scrollTop ?? document.body.scrollTop ?? 0;
      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      const clientHeight = window.innerHeight || document.documentElement.clientHeight || 1;
      const totalScrollable = scrollHeight - clientHeight;
      
      if (totalScrollable > 0) {
        const percent = Math.min(100, Math.max(0, (scrollY / totalScrollable) * 100));
        setScrollProgress(percent);
      } else {
        setScrollProgress(100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [article.id]);

  const handleClap = () => {
    const next = claps + 1;
    setClaps(next);
    setHasClapped(true);
    localStorage.setItem(`cadence_claps_${article.id}`, next.toString());
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !newCommentAuthor.trim()) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      articleId: article.id,
      authorName: newCommentAuthor.trim(),
      timestamp: 'Just now',
      text: newCommentText.trim(),
      likes: 0
    };
    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem(`cadence_comments_${article.id}`, JSON.stringify(updated));
    setNewCommentText('');
    setNewCommentAuthor('');
  };

  // Find next and previous articles
  const currentIndex = allArticles.findIndex(a => a.id === article.id);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  // Theme container classes
  const themeClasses = {
    paper: 'bg-[#FAF8F5] text-[#1A1816]',
    night: 'bg-[#141210] text-[#EBE6DF]',
    clean: 'bg-white text-[#111111]'
  }[themeMode];

  const borderClass = themeMode === 'night' ? 'border-[#2E2B27]' : 'border-[#E6E0D6]';
  const mutedTextClass = themeMode === 'night' ? 'text-[#9E9487]' : 'text-[#6B6256]';
  const cardBgClass = themeMode === 'night' ? 'bg-[#1C1A17] border-[#2E2B27]' : 'bg-[#F4EFE6] border-[#DDD5C7]';

  return (
    <article className={`min-h-screen transition-colors duration-300 ${themeClasses}`}>
      
      {/* Top Subtle Reading Progress Bar (Fixed across entire viewport top) */}
      <div 
        className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-[#E6E0D6]/60 dark:bg-[#2A2622] pointer-events-none"
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Article scroll progress"
      >
        <div
          className="h-full bg-[#8C3A27] transition-[width] duration-100 ease-out shadow-[0_0_6px_rgba(140,58,39,0.4)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Reader Utility Sub-Bar */}
      <div className={`sticky top-18 z-30 ${themeMode === 'night' ? 'bg-[#141210]/95 border-[#2E2B27]' : 'bg-[#FAF8F5]/95 border-[#E6E0D6]'} backdrop-blur-md border-b py-2.5 transition-colors relative`}>
        {/* Subtle sub-bar bottom hairline progress track */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E6E0D6]/40 dark:bg-[#2A2622] pointer-events-none overflow-hidden">
          <div
            className="h-full bg-[#8C3A27] transition-[width] duration-100 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between text-xs">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 font-medium hover:text-[#8C3A27] transition-colors cursor-pointer text-[#1A1816]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Blogs</span>
            </button>

            <span className="text-[#D9D0C3] hidden sm:inline">|</span>
            <span className="flex items-center gap-1 font-mono text-[11px] text-[#6B6256] hidden sm:inline">
              <Clock className="w-3 h-3 text-[#8C3A27]" />
              <span>{article.readTime}</span>
            </span>
            <span className="text-[#D9D0C3] hidden sm:inline">·</span>
            <span className="font-mono text-[11px] text-[#857B70] hidden sm:inline tabular-nums">
              {Math.round(scrollProgress)}% scrolled
            </span>
          </div>

          <div className="flex items-center gap-4">
            
            {/* Font Size Selector */}
            <div className="flex items-center border rounded px-1.5 py-0.5 border-[#D9D0C3]">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-1.5 py-0.5 font-serif font-bold text-xs cursor-pointer ${fontSize === 'normal' ? 'text-[#8C3A27]' : mutedTextClass}`}
                title="Standard font size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-1.5 py-0.5 font-serif font-bold text-sm cursor-pointer ${fontSize === 'large' ? 'text-[#8C3A27]' : mutedTextClass}`}
                title="Larger font size"
              >
                A+
              </button>
            </div>

            {/* Reading Mode Switcher */}
            <div className="flex items-center gap-1 border rounded p-0.5 border-[#D9D0C3]">
              <button
                onClick={() => setThemeMode('paper')}
                className={`p-1 rounded cursor-pointer ${themeMode === 'paper' ? 'bg-[#E2D8CE] text-[#1A1816]' : mutedTextClass}`}
                title="Archival Paper Mode"
              >
                <FileText className="w-3 h-3" />
              </button>
              <button
                onClick={() => setThemeMode('clean')}
                className={`p-1 rounded cursor-pointer ${themeMode === 'clean' ? 'bg-neutral-200 text-neutral-900' : mutedTextClass}`}
                title="Contemporary Stark Mode"
              >
                <Sun className="w-3 h-3" />
              </button>
              <button
                onClick={() => setThemeMode('night')}
                className={`p-1 rounded cursor-pointer ${themeMode === 'night' ? 'bg-neutral-800 text-neutral-100' : mutedTextClass}`}
                title="Night Stage Mode"
              >
                <Moon className="w-3 h-3" />
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className="p-1.5 hover:text-[#8C3A27] transition-colors cursor-pointer"
              title={isBookmarked ? 'Remove saved' : 'Save to reading list'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#8C3A27] text-[#8C3A27]' : ''}`} />
            </button>

            {/* Share link button */}
            <button
              onClick={handleShare}
              className="flex items-center gap-1 hover:text-[#8C3A27] transition-colors cursor-pointer"
              title="Copy citation link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Link Copied' : 'Share'}</span>
            </button>

          </div>

        </div>
      </div>

      {/* Main Long-Form Article Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-20 space-y-10">
        
        {/* Editorial Heading Lockup */}
        <header className="space-y-6 border-b border-[#E6E0D6] pb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#857B70]">
            <span>Vol. VI</span>
            <span aria-hidden="true">/</span>
            <span className="text-[#8C3A27] font-semibold">{article.category}</span>
            <span aria-hidden="true">/</span>
            <span>{article.publishedDate}</span>
            <span aria-hidden="true">/</span>
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 bg-[#F4EFE6] border border-[#DDD5C7] rounded text-[#8C3A27] font-semibold lowercase tracking-normal text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </span>
          </div>

          <h1
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.12]"
            style={{ textWrap: 'balance' }}
          >
            {article.title}
          </h1>

          <p className="font-serif text-lg sm:text-2xl italic leading-relaxed text-[#574F45]">
            {article.subtitle}
          </p>

          {/* Author Byline */}
          <div className="pt-4 flex items-center justify-between gap-4 border-t border-[#EDE6DC]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E2D8CE] text-[#1A1816] font-serif font-bold text-sm flex items-center justify-center">
                {article.author.avatarInitials}
              </div>
              <div>
                <span className="font-serif font-semibold text-sm block">{article.author.name}</span>
                <span className={`text-xs ${mutedTextClass}`}>{article.author.bio}</span>
              </div>
            </div>

            <button
              onClick={() => onPlayKeyTrack(article)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono border rounded transition-colors cursor-pointer ${
                isPlayingPreset
                  ? 'border-[#8C3A27] bg-[#F7EBE8] text-[#8C3A27]'
                  : 'border-[#D9D0C3] hover:border-[#8C3A27]'
              }`}
            >
              {isPlayingPreset ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlayingPreset ? 'Acoustic Preview Active' : 'Listen to Sonic Motif'}</span>
            </button>
          </div>
        </header>

        {/* Featured Artwork & Accession Caption */}
        <div className="space-y-2">
          <div className="aspect-[16/9] overflow-hidden border border-[#D9D0C3] bg-[#EAE2D5]">
            <img
              src={article.coverImage}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <figcaption className={`text-xs font-serif italic text-right ${mutedTextClass}`}>
            {article.imageCaption}
          </figcaption>
        </div>

        {/* Interactive Sonic Listening Companion Widget */}
        <section className={`p-6 border rounded-md ${cardBgClass} space-y-4 shadow-sm`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8C3A27] font-semibold">
              <Headphones className="w-4 h-4" />
              <span>Listen to the Sound Breakdown</span>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 bg-[#FAF8F5] text-[#8C3A27] border border-[#D9D0C3] rounded">
              {article.vibe}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
            <div className="md:col-span-2 space-y-2">
              <h2 className="font-serif text-xl font-medium leading-snug">
                {article.keyTrack.title} — <span className="italic">{article.keyTrack.artist}</span> ({article.keyTrack.year})
              </h2>
              <p className={`text-xs leading-relaxed ${mutedTextClass}`}>
                {article.keyTrack.significance}
              </p>
            </div>

            <div className="flex flex-col gap-2 items-start md:items-end justify-center">
              <button
                onClick={() => onPlayKeyTrack(article)}
                className={`w-full md:w-auto flex items-center justify-center gap-2.5 px-5 py-3 text-xs font-mono rounded font-medium transition-all cursor-pointer shadow-md ${
                  isPlayingPreset
                    ? 'bg-[#8C3A27] text-white ring-2 ring-[#8C3A27]/40'
                    : 'bg-[#1A1816] hover:bg-[#8C3A27] text-white'
                }`}
              >
                {isPlayingPreset ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Pause Real Audio</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current text-[#F5A623]" />
                    <span>Play Real Song Audio</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                {article.keyTrack.spotifyUrl && (
                  <a
                    href={article.keyTrack.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#1DB954] hover:bg-[#1ed760] text-black text-[11px] font-semibold rounded-full transition-colors"
                    title="Open on Spotify"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Spotify</span>
                  </a>
                )}
                <span className="text-[11px] font-mono text-[#857B70] text-center md:text-right">
                  {article.keyTrack.presetLabel}
                </span>
              </div>
            </div>
          </div>

          {isPlayingPreset && (
            <div className="pt-3 border-t border-[#E2DBD0] flex items-center justify-center gap-1.5 h-8">
              {[...Array(28)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-[#8C3A27] rounded-full animate-pulse"
                  style={{
                    height: `${Math.max(6, Math.sin(i * 0.45) * 22 + 8)}px`,
                    animationDuration: `${0.25 + (i % 6) * 0.12}s`
                  }}
                />
              ))}
            </div>
          )}
        </section>

        {/* Narrative Prose Sections */}
        <div className={`space-y-12 max-w-2xl mx-auto ${fontSize === 'large' ? 'text-lg leading-loose' : 'text-base leading-relaxed'}`}>
          {/* AEO Schema.org Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: article.sections
                  .filter(s => s.heading && s.heading.includes('?'))
                  .map(s => ({
                    '@type': 'Question',
                    name: s.heading,
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: s.paragraphs.join(' ')
                    }
                  }))
              })
            }}
          />

          {article.sections.map((section, sIdx) => {
            const isQna = section.heading && (section.heading.includes('?') || section.heading.includes('[AEO'));
            return (
              <div key={sIdx} className={`space-y-6 ${isQna ? 'pt-2' : ''}`}>
                
                {section.heading && (
                  <div className="space-y-1">
                    {isQna && (
                      <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#8C3A27] font-semibold">
                        <HelpCircle className="w-3.5 h-3.5 text-[#F5A623]" />
                        <span>AEO Answer Engine Question</span>
                      </div>
                    )}
                    <h2 className={`font-serif text-2xl sm:text-3xl font-medium tracking-tight pt-2 ${isQna ? 'text-[#8C3A27]' : 'text-[#1A1816]'}`}>
                      {section.heading}
                    </h2>
                  </div>
                )}

                {section.paragraphs.map((p, pIdx) => {
                  // Direct Answer callout block for AEO
                  if (p.startsWith('Direct Answer:')) {
                    const cleanAnswer = p.replace('Direct Answer:', '').trim();
                    return (
                      <div key={pIdx} className="bg-[#FAF5EE] border-l-4 border-[#8C3A27] p-5 rounded-r-lg space-y-1.5 shadow-xs my-4">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#8C3A27] font-bold block flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#8C3A27]" />
                          <span>Direct Answer (AEO Summary)</span>
                        </span>
                        <p className="font-serif text-[#1A1816] font-medium text-base sm:text-lg leading-relaxed">
                          {cleanAnswer}
                        </p>
                      </div>
                    );
                  }

                  // Drop cap on first paragraph of first section
                  const isOpening = sIdx === 0 && pIdx === 0;
                  return (
                    <p
                      key={pIdx}
                      className={`text-[#2B2723] font-serif ${
                        isOpening
                          ? 'first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#8C3A27]'
                          : ''
                      }`}
                    >
                      {p}
                    </p>
                  );
                })}

              {/* Pull quote if present */}
              {section.pullQuote && (
                <blockquote className="my-8 py-6 px-6 border-l-2 border-[#8C3A27] bg-[#F7F2EA]/60 space-y-2">
                  <p className="font-serif text-xl sm:text-2xl italic text-[#1A1816] leading-snug">
                    "{section.pullQuote}"
                  </p>
                  {section.quoteAttribution && (
                    <footer className="text-xs uppercase font-mono tracking-widest text-[#857B70]">
                      — {section.quoteAttribution}
                    </footer>
                  )}
                </blockquote>
              )}

              {/* Gear Insight box if present */}
              {section.gearInsight && (
                <div className={`p-4 border border-[#DDD5C7] rounded bg-[#FAF7F0] space-y-1.5`}>
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#8C3A27] uppercase tracking-wider">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Archival Apparatus: {section.gearInsight.device}</span>
                  </div>
                  <p className="text-xs text-[#524B41] leading-relaxed">
                    {section.gearInsight.description}
                  </p>
                </div>
              )}

              {/* What to Listen For Bullet Points */}
              {section.listeningNotes && section.listeningNotes.length > 0 && (
                <div className="my-6 p-5 border-l-2 border-[#1A1816] bg-[#F2EDE4]/80 space-y-2.5">
                  <h3 className="text-xs uppercase font-mono tracking-wider text-[#1A1816] font-bold">
                    Curatorial Listening Guide:
                  </h3>
                  <ul className="space-y-1.5 text-xs text-[#4A4237]">
                    {section.listeningNotes.map((note, nIdx) => (
                      <li key={nIdx} className="flex items-start gap-2">
                        <span className="text-[#8C3A27] font-bold mt-0.5">·</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          );
        })}
        </div>

        {/* Recommended Archival Discography */}
        <section className="pt-10 border-t border-[#E6E0D6] space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#857B70]">
            <Disc className="w-4 h-4 text-[#8C3A27]" />
            <span>Essential Reference Discography</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {article.recommendedAlbums.map((rec, i) => (
              <div key={i} className="p-4 border border-[#E6E0D6] bg-white space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#857B70] block">{rec.year} · {rec.label}</span>
                <h4 className="font-serif font-medium text-sm text-[#1A1816]">{rec.album}</h4>
                <p className="text-xs text-[#6B6256]">{rec.artist}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reader Reactions & Appreciation */}
        <div className="py-8 border-y border-[#E6E0D6] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleClap}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-mono border rounded transition-all cursor-pointer ${
                hasClapped
                  ? 'border-[#8C3A27] bg-[#F7EBE8] text-[#8C3A27]'
                  : 'border-[#D9D0C3] hover:border-[#8C3A27]'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${hasClapped ? 'fill-[#8C3A27]' : ''}`} />
              <span>Applaud Essay ({claps})</span>
            </button>
            <span className="text-xs text-[#857B70] hidden sm:inline">Readers resonated with this thesis</span>
          </div>

          <div className="flex items-center gap-2">
            {article.tags.map(t => (
              <span key={t} className="text-xs text-[#6B6256]">#{t}</span>
            ))}
          </div>
        </div>

        {/* Discussion / Reader Commentary */}
        <section className="space-y-6 pt-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#857B70]">
            <MessageSquare className="w-4 h-4 text-[#8C3A27]" />
            <span>Reader Discourse ({comments.length})</span>
          </div>

          <form onSubmit={handleAddComment} className="space-y-3 bg-white p-5 border border-[#E6E0D6] rounded">
            <h4 className="font-serif text-sm font-medium text-[#1A1816]">Contribute your perspective</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={newCommentAuthor}
                onChange={(e) => setNewCommentAuthor(e.target.value)}
                placeholder="Your name or affiliation"
                className="px-3 py-1.5 text-xs border border-[#D9D0C3] rounded focus:outline-none focus:border-[#8C3A27]"
                required
              />
            </div>
            <textarea
              rows={3}
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="What acoustic subtleties did you observe in this piece?"
              className="w-full px-3 py-2 text-xs border border-[#D9D0C3] rounded focus:outline-none focus:border-[#8C3A27]"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#1A1816] hover:bg-[#8C3A27] text-white text-xs font-medium rounded transition-colors cursor-pointer"
            >
              Publish Thought
            </button>
          </form>

          <div className="space-y-4">
            {comments.map((comm) => (
              <div key={comm.id} className="p-4 border border-[#EDE6DC] bg-white/70 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#1A1816]">{comm.authorName}</span>
                  <span className="text-[11px] text-[#857B70]">{comm.timestamp}</span>
                </div>
                <p className="text-xs text-[#4A433A] leading-relaxed font-serif">
                  {comm.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial Next / Prev Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-10 border-t border-[#E6E0D6]">
          {prevArticle ? (
            <button
              onClick={() => onSelectArticle(prevArticle)}
              className="p-4 border border-[#E6E0D6] hover:border-[#8C3A27] text-left transition-colors cursor-pointer group bg-white"
            >
              <span className="text-[10px] font-mono uppercase text-[#857B70] flex items-center gap-1 mb-1">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                Previous Essay
              </span>
              <span className="font-serif text-sm font-medium text-[#1A1816] group-hover:text-[#8C3A27] transition-colors line-clamp-1">
                {prevArticle.title}
              </span>
            </button>
          ) : <div />}

          {nextArticle && (
            <button
              onClick={() => onSelectArticle(nextArticle)}
              className="p-4 border border-[#E6E0D6] hover:border-[#8C3A27] text-right transition-colors cursor-pointer group bg-white"
            >
              <span className="text-[10px] font-mono uppercase text-[#857B70] flex items-center justify-end gap-1 mb-1">
                Next Essay
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="font-serif text-sm font-medium text-[#1A1816] group-hover:text-[#8C3A27] transition-colors line-clamp-1">
                {nextArticle.title}
              </span>
            </button>
          )}
        </div>

      </div>

    </article>
  );
};
