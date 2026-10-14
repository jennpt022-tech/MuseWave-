export interface PageSeoConfig {
  path: string;
  title: string;
  description: string;
  targetKeyword: string;
}

export const STATIC_PAGES_SEO: Record<string, PageSeoConfig> = {
  '/': {
    path: '/',
    title: 'Music Journal & Blogs, Artist Hub: Discover Top Sound',
    description: 'Explore our Music Journal & Blogs, Artist Hub for Billboard charts, verified Spotify audio, and deep music lore. Stream exclusive tracks and master sound now!',
    targetKeyword: 'Music Journal & Blogs, Artist Hub',
  },
  '/music-blogs': {
    path: '/music-blogs',
    title: 'Music Blogs & Audio Insights: Read Pro Artist Guides',
    description: 'Read authoritative Music blogs on vocal health, acoustic guitar, TikTok virality, and studio songwriting. Discover proven music techniques and read today!',
    targetKeyword: 'Music blogs',
  },
  '/blogs': {
    path: '/music-blogs',
    title: 'Music Blogs & Audio Insights: Read Pro Artist Guides',
    description: 'Read authoritative Music blogs on vocal health, acoustic guitar, TikTok virality, and studio songwriting. Discover proven music techniques and read today!',
    targetKeyword: 'Music blogs',
  },
  '/about': {
    path: '/about',
    title: 'About MuseWave: Music Journalism, Audio Lore & Tech',
    description: 'Discover the mission behind MuseWave, combining music journalism, psychoacoustics, verified artist lore, and studio guides. Join our sonic journey now!',
    targetKeyword: 'Music Journalism',
  },
  '/about-musewave': {
    path: '/about-musewave',
    title: 'About MuseWave: Music Journalism, Audio Lore & Tech',
    description: 'Discover the mission behind MuseWave, combining music journalism, psychoacoustics, verified artist lore, and studio guides. Join our sonic journey now!',
    targetKeyword: 'Music Journalism',
  },
  '/saved': {
    path: '/saved',
    title: 'Saved Reading List & Library: Your Bookmarked Songs',
    description: 'Access your personal bookmarked songs, saved vocal warm-ups, guitar guides, and studio sound breakdowns. Revisit your favorite music guides right now!',
    targetKeyword: 'Bookmarked Songs',
  },
  '/saved-articles': {
    path: '/saved-articles',
    title: 'Saved Reading List & Library: Your Bookmarked Songs',
    description: 'Access your personal bookmarked songs, saved vocal warm-ups, guitar guides, and studio sound breakdowns. Revisit your favorite music guides right now!',
    targetKeyword: 'Bookmarked Songs',
  },
};

export const ARTICLE_SEO_CONFIGS: Record<string, PageSeoConfig> = {
  'best-songs-driving-gaming-studying': {
    path: '/best-songs-driving-gaming-studying',
    title: 'Best Songs While Driving, Gaming, and Studying Playlists',
    description: 'Discover the Best Songs While Driving, Gaming, and Studying backed by science. Learn optimal tempo ranges and stream curated focus audio to boost stamina now!',
    targetKeyword: 'Best Songs While Driving, Gaming, and Studying',
  },
  'singing-vocal-warm-up-exercises': {
    path: '/singing-vocal-warm-up-exercises',
    title: 'Singing Vocal Warm Up Exercises: Expand Your Range Now',
    description: 'Master essential Singing Vocal Warm Up Exercises to protect vocal folds, smooth your break, and expand range. Learn Broadway warm-up routines and sing now!',
    targetKeyword: 'Singing Vocal Warm Up Exercises',
  },
  'acoustic-guitar-for-beginners': {
    path: '/acoustic-guitar-for-beginners',
    title: 'Acoustic Guitar for Beginners: Master First Chords Fast',
    description: 'Learn Acoustic Guitar for Beginners with step-by-step chord switching, fingerpicking drills, and strumming rhythm tips. Grab your guitar and start playing now!',
    targetKeyword: 'Acoustic Guitar for Beginners',
  },
  'songs-for-auditions': {
    path: '/songs-for-auditions',
    title: 'Songs for Auditions: Top 10 Vocal Tracks to Wow Judges',
    description: 'Select the perfect Songs for Auditions across pop, theatre, and R&B to showcase dynamic vocal control. Impress casting directors and book your role today!',
    targetKeyword: 'Songs for Auditions',
  },
  'trending-songs': {
    path: '/trending-songs',
    title: 'Trending Songs on TikTok: How Tracks Go Viral Overnight',
    description: 'Learn why Trending Songs conquer TikTok and social algorithms through hook design, dance challenges, and meme audio loops. Discover viral hit formulas today!',
    targetKeyword: 'Trending Songs',
  },
  'song-writing-techniques': {
    path: '/song-writing-techniques',
    title: 'Song Writing Techniques: 7 Pro Rules for Hit Lyrics Now',
    description: 'Elevate your lyrics with 7 pro Song Writing Techniques used by chart-topping songwriters for sensory imagery and emotional payoff. Write hit choruses today!',
    targetKeyword: 'Song Writing Techniques',
  },
  'music-for-studying': {
    path: '/music-for-studying',
    title: 'Music for Studying: Lo-Fi Beats vs White Noise Science',
    description: 'Compare Music for Studying across lo-fi hip hop and white noise to maximize memory recall and minimize cognitive distraction. Optimize your study workflow now!',
    targetKeyword: 'Music for Studying',
  },
  'ai-music-generation-copyright-laws': {
    path: '/ai-music-generation-copyright-laws',
    title: 'AI Music Generation; Copyright Laws: What Artists Face',
    description: 'Navigate AI Music Generation; Copyright Laws, voice cloning lawsuits, and fair use rulings shaping modern music rights. Protect your creative rights today!',
    targetKeyword: 'AI Music Generation; Copyright Laws',
  },
  'dynamic-ticket-pricing': {
    path: '/dynamic-ticket-pricing',
    title: 'Dynamic Ticket Pricing: Why Concert Passes Cost So Much',
    description: 'Analyze Dynamic ticket pricing algorithms, monopoly ticketing fees, and secondary scalper bots driving live concert prices sky high. Beat surge pricing today!',
    targetKeyword: 'Dynamic ticket pricing',
  },
  'music-industry': {
    path: '/music-industry',
    title: 'Music Industry Revolution: How TikTok Alters Global Hits',
    description: 'See how short-form video alters the modern Music Industry, transforming A&R scouting, album length, and fan royalty economics. Unpack modern streaming now!',
    targetKeyword: 'Music Industry',
  },
};

/**
 * Updates page title, meta description, and social graph tags dynamically.
 */
export function applyPageSeo(seo: { title: string; description: string; canonicalPath?: string }) {
  if (typeof document === 'undefined') return;

  // 1. Update Title
  document.title = seo.title;

  // 2. Update Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', seo.description);

  // 3. Update Open Graph tags
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (!ogTitle) {
    ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    document.head.appendChild(ogTitle);
  }
  ogTitle.setAttribute('content', seo.title);

  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (!ogDesc) {
    ogDesc = document.createElement('meta');
    ogDesc.setAttribute('property', 'og:description');
    document.head.appendChild(ogDesc);
  }
  ogDesc.setAttribute('content', seo.description);

  // 4. Update Twitter Card tags
  let twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (!twitterTitle) {
    twitterTitle = document.createElement('meta');
    twitterTitle.setAttribute('name', 'twitter:title');
    document.head.appendChild(twitterTitle);
  }
  twitterTitle.setAttribute('content', seo.title);

  let twitterDesc = document.querySelector('meta[name="twitter:description"]');
  if (!twitterDesc) {
    twitterDesc = document.createElement('meta');
    twitterDesc.setAttribute('name', 'twitter:description');
    document.head.appendChild(twitterDesc);
  }
  twitterDesc.setAttribute('content', seo.description);

  // 5. Update Canonical link
  if (seo.canonicalPath) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    canonical.setAttribute('href', `${origin}${seo.canonicalPath}`);
  }
}
