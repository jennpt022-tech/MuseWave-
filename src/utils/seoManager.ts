export interface PageSeoConfig {
  slug: string;
  keyword: string;
  title: string;
  description: string;
  category?: string;
  ogType?: 'website' | 'article';
}

export const SEO_PAGE_CONFIGS: Record<string, PageSeoConfig> = {
  '/': {
    slug: '/',
    keyword: 'Music Journal & Blogs, Artist Hub',
    title: 'Music Journal & Blogs, Artist Hub | MuseWave Discovery',
    description: 'Explore our Music Journal & Blogs, Artist Hub for deep Billboard trends, audio essays, and real songs. Discover fresh sound lore and stream audio motifs today!',
    ogType: 'website'
  },
  '/music-blogs': {
    slug: '/music-blogs',
    keyword: 'Music blogs',
    title: 'Music Blogs: Songwriting, Vocal Tips & Gear | MuseWave',
    description: 'Dive into expert music blogs covering songwriting craft, vocal health, guitar chords, and live audio lore. Read our full catalog and elevate your sound today!',
    ogType: 'website'
  },
  '/best-songs-driving-gaming-studying': {
    slug: '/best-songs-driving-gaming-studying',
    keyword: 'Best Songs While Driving, Gaming, and Studying',
    title: 'Best Songs While Driving, Gaming, and Studying: Focus List',
    description: 'Find the best songs while driving, gaming, and studying backed by tempo neuroscience and sonic flow. Unlock peak cognitive focus and listen to top picks now!',
    category: 'Focus & Productivity',
    ogType: 'article'
  },
  '/singing-vocal-warm-up-exercises': {
    slug: '/singing-vocal-warm-up-exercises',
    keyword: 'Singing Vocal Warm Up Exercises',
    title: 'Singing Vocal Warm Up Exercises: Daily Voice Health Guide',
    description: 'Master singing vocal warm up exercises with straw phonation, lip trills, and pitch sirens to protect your vocal cords. Expand your singing range easily today!',
    category: 'Vocal Mastery',
    ogType: 'article'
  },
  '/acoustic-guitar-for-beginners': {
    slug: '/acoustic-guitar-for-beginners',
    keyword: 'Acoustic Guitar for Beginners',
    title: 'Acoustic Guitar for Beginners: Step-by-Step Chords Guide',
    description: 'Learn acoustic guitar for beginners with four essential open chords, painless fretting posture, and rhythm strumming drills. Start playing your first song now!',
    category: 'Guitar & Gear',
    ogType: 'article'
  },
  '/songs-for-auditions': {
    slug: '/songs-for-auditions',
    keyword: 'Songs for Auditions',
    title: 'Songs for Auditions: Top 10 Vocal Repertoire Masterlist',
    description: 'Discover the best songs for auditions across pop, theater, and soul to showcase your dynamic range and pitch accuracy. Wow your casting director right away!',
    category: 'Vocal Mastery',
    ogType: 'article'
  },
  '/trending-songs': {
    slug: '/trending-songs',
    keyword: 'Trending Songs',
    title: 'Trending Songs: How Audio Goes Viral on TikTok & Reels',
    description: 'Uncover how trending songs dominate TikTok and Instagram through 10-second micro-hooks, sped-up audio, and meme choreography. Crack viral sound growth now!',
    category: 'Music Tech & Trends',
    ogType: 'article'
  },
  '/song-writing-techniques': {
    slug: '/song-writing-techniques',
    keyword: 'Song Writing Techniques',
    title: 'Song Writing Techniques: 7 Simple Steps to Better Lyrics',
    description: 'Transform your lyrics using proven song writing techniques including sensory object writing, prosody, and slant rhymes. Craft unforgettable radio hooks today!',
    category: 'Songwriting Craft',
    ogType: 'article'
  },
  '/music-for-studying': {
    slug: '/music-for-studying',
    keyword: 'Music for Studying',
    title: 'Music for Studying: Lofi Beats vs White Noise Science',
    description: 'Discover the best music for studying by comparing relaxing lofi beats with brown, pink, and white noise frequencies. Boost memory and study smarter right now!',
    category: 'Cognitive Audio',
    ogType: 'article'
  },
  '/ai-music-generation-copyright-laws': {
    slug: '/ai-music-generation-copyright-laws',
    keyword: 'AI Music Generation; Copyright Laws',
    title: 'AI Music Generation; Copyright Laws & Voice Cloning Rules',
    description: 'Explore AI Music Generation; Copyright Laws covering human authorship, voice cloning rights, and streaming payouts. Stay legally protected and read more here!',
    category: 'Legal & AI Music',
    ogType: 'article'
  },
  '/dynamic-ticket-pricing': {
    slug: '/dynamic-ticket-pricing',
    keyword: 'Dynamic ticket pricing',
    title: 'Dynamic Ticket Pricing: Why Concert Tickets Cost So Much',
    description: 'Understand dynamic ticket pricing algorithms, touring inflation, and primary ticketing monopolies in live music. Learn how to beat soaring concert fees today!',
    category: 'Industry & Economics',
    ogType: 'article'
  },
  '/music-industry': {
    slug: '/music-industry',
    keyword: 'Music Industry',
    title: 'Music Industry: How TikTok Short Videos Shape Pop Music',
    description: 'Explore how the modern music industry is transformed by short-form vertical video, shorter track runtimes, and viral A&R scrapers. Read the full analysis now!',
    category: 'Industry & Culture',
    ogType: 'article'
  },
  '/about-musewave': {
    slug: '/about-musewave',
    keyword: 'About MuseWave',
    title: 'About MuseWave: Music Journal, Audio Lore & Modern Sounds',
    description: 'Learn about MuseWave, the premier music journal dedicated to acoustic breakdowns, Billboard discovery, and real artist profiles. Join our audio community now!',
    ogType: 'website'
  },
  '/saved-articles': {
    slug: '/saved-articles',
    keyword: 'Saved Articles',
    title: 'Saved Articles: Your Personal Music Reading & Audio Hub',
    description: 'Access your bookmarked saved articles, music production guides, and interactive sonic audio motifs in one library. Continue reading your favorite stories now!',
    ogType: 'website'
  }
};

/**
 * Updates browser document title, meta description, open-graph tags, and canonical URL
 */
export function applyPageSeo(path: string) {
  // Normalize path: lowercase, strip query string, strip trailing slash except root
  let cleanPath = (path.split('?')[0] || '/').toLowerCase().trim();
  if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }

  const config = SEO_PAGE_CONFIGS[cleanPath] || SEO_PAGE_CONFIGS['/'];

  // 1. Update Title (50-60 characters with main keyword near the start)
  document.title = config.title;

  // 2. Update Meta Description (150-160 characters, with reason to click)
  updateOrCreateMeta('description', config.description);

  // 3. OpenGraph Tags
  updateOrCreateMeta('og:title', config.title, 'property');
  updateOrCreateMeta('og:description', config.description, 'property');
  updateOrCreateMeta('og:type', config.ogType || 'website', 'property');
  
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://musewave.app';
  const canonicalUrl = `${currentOrigin}${config.slug === '/' ? '' : config.slug}`;
  updateOrCreateMeta('og:url', canonicalUrl, 'property');

  // 4. Twitter Tags
  updateOrCreateMeta('twitter:title', config.title);
  updateOrCreateMeta('twitter:description', config.description);
  updateOrCreateMeta('twitter:card', 'summary_large_image');

  // 5. Canonical Link
  let canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', canonicalUrl);
}

function updateOrCreateMeta(nameOrProperty: string, content: string, attributeType: 'name' | 'property' = 'name') {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attributeType}="${nameOrProperty}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attributeType, nameOrProperty);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}
