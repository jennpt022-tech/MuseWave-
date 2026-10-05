export interface Author {
  name: string;
  role: string;
  avatarInitials: string;
  bio: string;
}

export interface KeyTrack {
  title: string;
  artist: string;
  year: string;
  significance: string;
  audioPreset: string;
  presetLabel: string;
  realAudioUrl?: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
}

export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
  pullQuote?: string;
  quoteAttribution?: string;
  listeningNotes?: string[];
  gearInsight?: {
    device: string;
    description: string;
  };
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  vibe: string;
  readTime: string;
  publishedDate: string;
  featured: boolean;
  author: Author;
  coverImage: string;
  imageCaption: string;
  excerpt: string;
  keyTrack: KeyTrack;
  sections: ArticleSection[];
  tags: string[];
  recommendedAlbums: {
    album: string;
    artist: string;
    year: string;
    label: string;
  }[];
}

export interface Comment {
  id: string;
  articleId: string;
  authorName: string;
  timestamp: string;
  text: string;
  likes: number;
}
