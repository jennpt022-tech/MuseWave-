export interface BillboardTrack {
  rank: number;
  lastWeekRank: number;
  peakRank: number;
  weeksOnChart: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  streams: string;
  coverImage: string;
  audioPreset: string;
  previewUrl: string;
  genre: string;
}

export interface MusicNewsItem {
  id: string;
  title: string;
  category: string;
  timestamp: string;
  readTime: string;
  summary: string;
  source: string;
  trendingScore?: number;
}

export const BILLBOARD_TOP_10: BillboardTrack[] = [
  {
    rank: 1,
    lastWeekRank: 1,
    peakRank: 1,
    weeksOnChart: 12,
    title: 'Taste',
    artist: 'Sabrina Carpenter',
    album: "Short n' Sweet",
    duration: '2:37',
    streams: '84.2M',
    coverImage: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/f6/15/d0/f615d0ab-e0c4-575d-907e-1cc084642357/24UMGIM61704.rgb.jpg/600x600bb.jpg',
    audioPreset: 'dilla-swing',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/26/57/a6/2657a620-c596-e0e4-efa2-e814f3572d1c/mzaf_5475540510703120797.plus.aac.p.m4a',
    genre: 'Pop / Disco Groove'
  },
  {
    rank: 2,
    lastWeekRank: 3,
    peakRank: 1,
    weeksOnChart: 18,
    title: 'Not Like Us',
    artist: 'Kendrick Lamar',
    album: 'Not Like Us - Single',
    duration: '4:34',
    streams: '76.8M',
    coverImage: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/31/3a/3f/313a3fbc-bb8f-80c7-b5a2-e226869a38cd/24UMGIM51924.rgb.jpg/600x600bb.jpg',
    audioPreset: '808-bass-slide',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/2d/e0/e8/2de0e874-cd0b-e9a9-e876-76be13a86662/mzaf_12385336780649591409.plus.aac.p.m4a',
    genre: 'West Coast Hip-Hop / 808'
  },
  {
    rank: 3,
    lastWeekRank: 2,
    peakRank: 1,
    weeksOnChart: 24,
    title: 'Espresso',
    artist: 'Sabrina Carpenter',
    album: "Short n' Sweet",
    duration: '2:55',
    streams: '71.4M',
    coverImage: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/a1/1c/ca/a11ccab6-7d4c-e041-d028-998bcebeb709/24UMGIM61704.rgb.jpg/600x600bb.jpg',
    audioPreset: 'dilla-swing',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/99/da/ff/99daffce-cdde-59c6-5ae0-7f922ce411a8/mzaf_5621292401829922816.plus.aac.p.m4a',
    genre: 'Nu-Disco / Funk'
  },
  {
    rank: 4,
    lastWeekRank: 5,
    peakRank: 2,
    weeksOnChart: 8,
    title: 'Die With A Smile',
    artist: 'Lady Gaga & Bruno Mars',
    album: 'Die With A Smile - Single',
    duration: '4:11',
    streams: '69.1M',
    coverImage: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/11/ae/f2/11aef294-f57c-bab9-c9fc-529162984e62/24UMGIM85348.rgb.jpg/600x600bb.jpg',
    audioPreset: 'analog-tape-warmth',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/07/6a/99/076a99ed-b946-431b-6f1f-54fa187ca5bd/mzaf_8102882277995122875.plus.aac.p.m4a',
    genre: 'Soul Ballad / Vintage'
  },
  {
    rank: 5,
    lastWeekRank: 4,
    peakRank: 1,
    weeksOnChart: 15,
    title: 'Birds of a Feather',
    artist: 'Billie Eilish',
    album: 'HIT ME HARD AND SOFT',
    duration: '3:30',
    streams: '65.3M',
    coverImage: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/92/9f/69/929f69f1-9977-3a44-d674-11f70c852d1b/24UMGIM36186.rgb.jpg/600x600bb.jpg',
    audioPreset: 'shoegaze-glide',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/34/31/d3/3431d34e-847f-5d66-df83-0bce688d997e/mzaf_18106743962423782018.plus.aac.p.m4a',
    genre: 'Indie Pop / Dreamy Fuzz'
  },
  {
    rank: 6,
    lastWeekRank: 7,
    peakRank: 4,
    weeksOnChart: 9,
    title: 'Good Luck, Babe!',
    artist: 'Chappell Roan',
    album: 'Good Luck, Babe! - Single',
    duration: '3:38',
    streams: '59.7M',
    coverImage: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/29/a7/c4/29a7c478-351d-25eb-a116-3e68118cdab8/24UMGIM31246.rgb.jpg/600x600bb.jpg',
    audioPreset: 'analog-tape-warmth',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/c3/6d/4f/c36d4f23-b87f-046d-7a0e-e3e05d180b2a/mzaf_17235999651335214399.plus.aac.p.m4a',
    genre: 'Synthpop / 80s Drama'
  },
  {
    rank: 7,
    lastWeekRank: 6,
    peakRank: 3,
    weeksOnChart: 14,
    title: 'A Bar Song (Tipsy)',
    artist: 'Shaboozey',
    album: "Where I've Been, Isn't Where I'm Going",
    duration: '2:51',
    streams: '54.2M',
    coverImage: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/be/db/81/bedb81c3-ca23-a1b9-f275-59e46ae4fdb1/197342625517_cover.jpg/600x600bb.jpg',
    audioPreset: 'afrobeats-clave',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/46/6f/7f/466f7f67-0365-ddf8-16c2-e033371d2f7e/mzaf_3764341442720608698.plus.aac.p.m4a',
    genre: 'Country / Hip-Hop Hybrid'
  },
  {
    rank: 8,
    lastWeekRank: 9,
    peakRank: 6,
    weeksOnChart: 7,
    title: 'Guess (feat. Billie Eilish)',
    artist: 'Charli xcx',
    album: "Brat and it's completely different but also still brat",
    duration: '2:23',
    streams: '48.9M',
    coverImage: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/cf/0b/2b/cf0b2bae-d4c1-49ce-de5c-b7c3fcd9e4cd/075679643087.jpg/600x600bb.jpg',
    audioPreset: 'amen-break',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/22/dd/42/22dd424e-98b5-6dd6-6dd6-340fa9a2edb1/mzaf_3129068084574351708.plus.aac.p.m4a',
    genre: 'Hyperpop / Club Electro'
  },
  {
    rank: 9,
    lastWeekRank: 8,
    peakRank: 2,
    weeksOnChart: 29,
    title: 'Lose Control',
    artist: 'Teddy Swims',
    album: "I've Tried Everything But Therapy (Part 1)",
    duration: '3:30',
    streams: '44.1M',
    coverImage: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/36/19/66/36196640-1561-dc5e-c6bc-1e5f4befa583/093624856771.jpg/600x600bb.jpg',
    audioPreset: 'slowed-reverb',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/9f/65/d6/9f65d67d-db40-d7da-c954-9a23d28dfe1a/mzaf_7625794503195542708.plus.aac.p.m4a',
    genre: 'Blues / Soul Revival'
  },
  {
    rank: 10,
    lastWeekRank: 11,
    peakRank: 10,
    weeksOnChart: 4,
    title: 'Mona Lisa',
    artist: 'Asake & Burna Boy',
    album: 'Mr. Money With The Vibe',
    duration: '3:15',
    streams: '41.3M',
    coverImage: 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/5e/4f/66/5e4f6644-a234-d037-609d-7ed53fd6c7f9/194690909856_cover.jpg/600x600bb.jpg',
    audioPreset: 'afrobeats-clave',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/42/c0/0f/42c00f8b-fff6-2529-70c3-861c21143c0a/mzaf_2842108628707526245.plus.aac.p.m4a',
    genre: 'Afrobeats / Amapiano Log'
  }
];

export const MUSIC_NEWS: MusicNewsItem[] = [
  {
    id: 'n1',
    title: 'Vinyl Sales Outpace Digital Downloads for Third Consecutive Year as Gen Z Drives Physical Media Boom',
    category: 'Industry Trends',
    timestamp: '2 hours ago',
    readTime: '3 min read',
    summary: 'RIAA reported vinyl shipments reached $1.4B in 2026. Younger listeners cite tactile packaging, cassette culture, and anti-algorithm listening as primary motivations.',
    source: 'Billboard Pro'
  },
  {
    id: 'n2',
    title: 'Spotify and Major Labels Agree on New Payout Model Penalizing Non-Functional Audio and Streaming Fraud',
    category: 'Streaming & Tech',
    timestamp: '5 hours ago',
    readTime: '4 min read',
    summary: 'Tracks with under 1,000 annual streams now enter a separate indie creator royalty pool, while white noise and non-music loops face stricter payout thresholds.',
    source: 'Music Business Worldwide'
  },
  {
    id: 'n3',
    title: 'Shoegaze & 90s Alt-Rock Festival Headliners See 240% Ticket Surge Across North America and Europe',
    category: 'Live & Culture',
    timestamp: 'Yesterday',
    readTime: '3 min read',
    summary: 'From Panchiko and Slowdive selling out arenas to teenage DIY bands in London, fuzz pedal demand has created waitlists for vintage Electro-Harmonix and ProCo Rat circuits.',
    source: 'Pitchfork Daily'
  },
  {
    id: 'n4',
    title: 'Federal Copyright Office Issues Landmark Ruling on AI Music Models Trained Without Artist Opt-In',
    category: 'Legal & AI',
    timestamp: '2 days ago',
    readTime: '5 min read',
    summary: 'Generative audio companies must maintain transparent training manifests, paving the way for retroactive licensing pacts with record labels and indie publishers.',
    source: 'Rolling Stone Tech'
  },
  {
    id: 'n5',
    title: 'South African Amapiano and Lagos Afrobeats Surpass 15 Billion Combined Global Streams in 2026',
    category: 'Global Wave',
    timestamp: '3 days ago',
    readTime: '4 min read',
    summary: 'The syncopated 3:2 clave and hypnotic log drum basslines continue redefining festival sound systems from Ibiza to Tokyo.',
    source: 'The FADER'
  }
];
