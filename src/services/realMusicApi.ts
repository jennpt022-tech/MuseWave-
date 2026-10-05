export interface RealSongResult {
  id: string;
  title: string;
  artist: string;
  album: string;
  artwork: string;
  previewUrl: string;
  durationSeconds: number;
  spotifySearchUrl: string;
  appleMusicUrl: string;
}

export async function searchRealSongs(query: string, limit = 8): Promise<RealSongResult[]> {
  if (!query || query.trim().length === 0) return [];

  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query.trim())}&entity=song&limit=${limit}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`iTunes search error: ${res.statusText}`);
    }
    const data = await res.json();
    if (!data.results || !Array.isArray(data.results)) {
      return [];
    }

    return data.results
      .filter((item: { previewUrl?: string }) => Boolean(item.previewUrl))
      .map((item: {
        trackId: number;
        trackName: string;
        artistName: string;
        collectionName: string;
        artworkUrl100: string;
        previewUrl: string;
        trackTimeMillis?: number;
        trackViewUrl?: string;
      }) => {
        // Upgrade image quality from 100x100 to 600x600 for sharp modern display
        const artworkHigh = item.artworkUrl100
          ? item.artworkUrl100.replace('100x100bb.jpg', '600x600bb.jpg')
          : '';

        return {
          id: String(item.trackId),
          title: item.trackName,
          artist: item.artistName,
          album: item.collectionName || 'Single',
          artwork: artworkHigh || item.artworkUrl100,
          previewUrl: item.previewUrl,
          durationSeconds: item.trackTimeMillis ? Math.round(item.trackTimeMillis / 1000) : 180,
          spotifySearchUrl: `https://open.spotify.com/search/${encodeURIComponent(item.artistName + ' ' + item.trackName)}`,
          appleMusicUrl: item.trackViewUrl || `https://music.apple.com/us/search?term=${encodeURIComponent(item.artistName + ' ' + item.trackName)}`,
        };
      });
  } catch (error) {
    console.error('Failed to search real songs from iTunes API:', error);
    return [];
  }
}
