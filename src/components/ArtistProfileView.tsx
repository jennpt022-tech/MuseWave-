import React, { useState, useEffect } from 'react';
import { ArtistProfile, ArtistSong, ArtistAlbum } from '../services/artistService';
import { playRealSong, stopAllAudio, subscribeToAudio } from '../utils/audioPlayerManager';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Volume2, 
  CheckCircle2, 
  ExternalLink, 
  Disc, 
  Music, 
  Calendar, 
  MapPin, 
  Sliders, 
  Users, 
  Sparkles,
  Layers,
  Heart
} from 'lucide-react';

interface ArtistProfileViewProps {
  artist: ArtistProfile;
  onBack: () => void;
}

export const ArtistProfileView: React.FC<ArtistProfileViewProps> = ({ artist, onBack }) => {
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<ArtistAlbum | null>(null);

  useEffect(() => {
    const unsub = subscribeToAudio((state) => {
      setIsAudioPlaying(state.isPlaying);
      setActivePlayingId(state.isPlaying && state.currentTrack ? state.currentTrack.id : null);
    });
    return unsub;
  }, []);

  const handlePlaySong = (song: ArtistSong) => {
    if (isAudioPlaying && activePlayingId === song.id) {
      stopAllAudio();
    } else {
      playRealSong({
        id: song.id,
        title: song.title,
        artist: artist.name,
        coverImage: song.artwork,
        previewUrl: song.previewUrl,
        spotifyUrl: song.spotifyUrl,
        mode: 'real'
      });
    }
  };

  const handlePlayFirstTopSong = () => {
    if (artist.topSongs.length > 0) {
      handlePlaySong(artist.topSongs[0]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Top Navigation Back Button */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8C3A27] hover:text-[#1A1816] transition-colors cursor-pointer py-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Music Hub & Search</span>
        </button>
      </div>

      {/* Spotify-Style Artist Hero Banner */}
      <section className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#2E2823] to-[#141210] text-white p-6 sm:p-10 border border-[#3D362F] shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 sm:gap-8 relative z-10">
          
          {/* Artist Avatar / Image */}
          <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full overflow-hidden shadow-2xl border-4 border-[#3D362F] shrink-0 bg-[#1E1C1A]">
            <img
              src={artist.headerImage}
              alt={artist.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Artist Info Lockup */}
          <div className="space-y-3 flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="flex items-center gap-1 text-[#38BDF8] font-medium">
                <CheckCircle2 className="w-4 h-4 fill-current text-[#38BDF8]" />
                <span>Verified Artist</span>
              </span>
              <span className="text-[#857B70]">·</span>
              <span className="px-2 py-0.5 bg-[#1DB954]/20 border border-[#1DB954]/40 text-[#1DB954] rounded-full text-[10px] font-semibold">
                Official Spotify Artist Photo
              </span>
              <span className="text-[#857B70]">·</span>
              <span className="text-[#F5A623] uppercase tracking-wider">{artist.genre}</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              {artist.name}
            </h1>

            <p className="text-xs sm:text-sm text-[#D1C9BC] font-mono">
              {artist.monthlyListeners} · {artist.origin}
            </p>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handlePlayFirstTopSong}
                className="flex items-center gap-2 px-6 py-3 bg-[#8C3A27] hover:bg-[#A3432D] text-white rounded-full font-mono text-xs font-semibold cursor-pointer shadow-lg transition-transform active:scale-95"
              >
                {isAudioPlaying && activePlayingId && artist.topSongs.some(s => s.id === activePlayingId) ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Pause Top Songs</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current text-[#F5A623]" />
                    <span>Play Top Songs</span>
                  </>
                )}
              </button>

              <a
                href={artist.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2.5 bg-[#1DB954] hover:bg-[#1ed760] text-black rounded-full font-mono text-xs font-semibold cursor-pointer transition-colors shadow"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Follow on Spotify</span>
              </a>

              <a
                href={artist.appleMusicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-mono text-xs font-medium cursor-pointer transition-colors"
              >
                <Music className="w-3.5 h-3.5" />
                <span>Apple Music</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Top Songs (Left 7 cols) & Artist Information (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Top Songs Table (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E6E0D6] pb-3">
            <h2 className="font-serif text-2xl font-medium text-[#1A1816] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#8C3A27]" />
              <span>Popular Songs</span>
            </h2>
            <span className="text-xs font-mono text-[#857B70]">Real Studio Previews</span>
          </div>

          {artist.topSongs.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-[#857B70] bg-white border border-[#E6E0D6] rounded-lg">
              No song previews found for this artist.
            </div>
          ) : (
            <div className="bg-white border border-[#E6E0D6] rounded-lg overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E6E0D6] bg-[#FAF8F5] text-[#857B70] font-mono uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-3.5 w-10 text-center">#</th>
                    <th className="py-3 px-3">Title</th>
                    <th className="py-3 px-3 hidden sm:table-cell">Album</th>
                    <th className="py-3 px-3 text-right">Time</th>
                    <th className="py-3 px-3 w-20 text-center">Audio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0EBE1]">
                  {artist.topSongs.map((song, idx) => {
                    const isPlayingThis = isAudioPlaying && activePlayingId === song.id;

                    return (
                      <tr
                        key={song.id}
                        onClick={() => handlePlaySong(song)}
                        className={`group hover:bg-[#F9F6F0] transition-colors cursor-pointer ${
                          isPlayingThis ? 'bg-[#FDF6F0]' : ''
                        }`}
                      >
                        <td className="py-3 px-3.5 text-center font-mono font-bold text-xs text-[#574F45]">
                          {isPlayingThis ? (
                            <Volume2 className="w-3.5 h-3.5 text-[#8C3A27] mx-auto animate-pulse" />
                          ) : (
                            idx + 1
                          )}
                        </td>

                        <td className="py-3 px-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={song.artwork}
                              alt={song.title}
                              className="w-9 h-9 rounded object-cover shrink-0 bg-[#EAE2D5]"
                            />
                            <div className="min-w-0">
                              <span className={`font-serif font-medium text-sm block truncate group-hover:text-[#8C3A27] transition-colors ${
                                isPlayingThis ? 'text-[#8C3A27]' : 'text-[#1A1816]'
                              }`}>
                                {song.title}
                              </span>
                              <span className="text-[11px] text-[#7A7165] block sm:hidden truncate">
                                {song.album}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-3 hidden sm:table-cell text-[#574F45] truncate max-w-[180px]">
                          {song.album}
                        </td>

                        <td className="py-3 px-3 text-right font-mono text-[#857B70] text-xs">
                          {song.duration}
                        </td>

                        <td className="py-3 px-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePlaySong(song);
                              }}
                              className={`p-1.5 rounded-full transition-all cursor-pointer inline-flex items-center justify-center ${
                                isPlayingThis
                                  ? 'bg-[#8C3A27] text-white shadow'
                                  : 'bg-[#F2ECE1] text-[#1A1816] group-hover:bg-[#8C3A27] group-hover:text-white'
                              }`}
                              title={isPlayingThis ? 'Pause audio' : 'Play studio preview'}
                            >
                              {isPlayingThis ? (
                                <Pause className="w-3 h-3 fill-current" />
                              ) : (
                                <Play className="w-3 h-3 fill-current ml-0.5" />
                              )}
                            </button>

                            <a
                              href={song.spotifyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1 text-[#857B70] hover:text-[#1DB954] transition-colors"
                              title="Open in Spotify"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Information About the Artist (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border-b border-[#E6E0D6] pb-3">
            <h2 className="font-serif text-2xl font-medium text-[#1A1816] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#8C3A27]" />
              <span>About {artist.name}</span>
            </h2>
          </div>

          <div className="bg-white border border-[#E6E0D6] rounded-lg p-6 space-y-5 shadow-xs">
            {/* Biography text */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#8C3A27] font-semibold">
                Biography & Editorial Lore
              </h3>
              <p className="text-xs sm:text-sm font-serif text-[#3D362F] leading-relaxed">
                {artist.bio}
              </p>
            </div>

            {/* Quick Lore Attributes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#F0EBE1]">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#857B70] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#8C3A27]" />
                  <span>Origin & Roots</span>
                </span>
                <p className="text-xs font-medium text-[#1A1816]">{artist.origin}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#857B70] flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#8C3A27]" />
                  <span>Active Era</span>
                </span>
                <p className="text-xs font-medium text-[#1A1816]">{artist.activeYears}</p>
              </div>
            </div>

            {/* Sound Signature / Gear Insight */}
            <div className="pt-3 border-t border-[#F0EBE1] space-y-1.5">
              <span className="text-[11px] font-mono text-[#857B70] flex items-center gap-1">
                <Sliders className="w-3 h-3 text-[#8C3A27]" />
                <span>Sonic Signature & Production</span>
              </span>
              <p className="text-xs text-[#524B41] leading-relaxed italic font-serif">
                "{artist.soundSignature}"
              </p>
            </div>

            {/* Key Collaborators */}
            {artist.keyCollaborators && artist.keyCollaborators.length > 0 && (
              <div className="pt-3 border-t border-[#F0EBE1] space-y-1.5">
                <span className="text-[11px] font-mono text-[#857B70] flex items-center gap-1">
                  <Users className="w-3 h-3 text-[#8C3A27]" />
                  <span>Notable Collaborators</span>
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {artist.keyCollaborators.map((c) => (
                    <span
                      key={c}
                      className="px-2 py-0.5 bg-[#FAF5EE] text-[#574F45] border border-[#E6E0D6] rounded text-[11px] font-mono"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Discography / Studio Albums Section */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-[#E6E0D6] pb-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8C3A27] font-semibold">
              <Disc className="w-4 h-4" />
              <span>Full Discography</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1816]">
              Studio Albums & Releases
            </h2>
          </div>
          <span className="text-xs font-mono text-[#857B70]">
            {artist.albums.length} Official Albums
          </span>
        </div>

        {artist.albums.length === 0 ? (
          <div className="p-8 text-center text-xs font-mono text-[#857B70] bg-white border border-[#E6E0D6] rounded-lg">
            No albums cataloged for this artist.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {artist.albums.map((album) => (
              <div
                key={album.id}
                onClick={() => setSelectedAlbum(album)}
                className="group bg-white border border-[#E6E0D6] hover:border-[#8C3A27] rounded-lg overflow-hidden transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between cursor-pointer"
              >
                <div className="aspect-square w-full overflow-hidden bg-[#24201C] relative">
                  <img
                    src={album.artwork}
                    alt={album.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono rounded">
                    {album.releaseYear}
                  </div>
                </div>

                <div className="p-3 space-y-1">
                  <h4 className="font-serif font-medium text-xs text-[#1A1816] truncate group-hover:text-[#8C3A27] transition-colors" title={album.title}>
                    {album.title}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] text-[#857B70] font-mono">
                    <span>{album.trackCount} Tracks</span>
                    <span>{album.genre}</span>
                  </div>

                  {album.spotifyUrl && (
                    <div className="pt-2">
                      <a
                        href={album.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full inline-flex items-center justify-center gap-1 py-1 bg-[#FAF5EE] hover:bg-[#1DB954] hover:text-black text-[#574F45] text-[10px] font-mono rounded transition-colors"
                      >
                        <ExternalLink className="w-2.5 h-2.5" />
                        <span>Spotify</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Selected Album Details Modal */}
      {selectedAlbum && (
        <div 
          onClick={() => setSelectedAlbum(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-[#E6E0D6] rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl relative"
          >
            <div className="flex gap-4 items-center">
              <img
                src={selectedAlbum.artwork}
                alt={selectedAlbum.title}
                className="w-24 h-24 rounded-lg object-cover shadow shrink-0"
              />
              <div className="min-w-0">
                <span className="text-[10px] font-mono uppercase text-[#8C3A27] tracking-wider font-semibold">
                  Album Release
                </span>
                <h3 className="font-serif text-lg font-bold text-[#1A1816] truncate">
                  {selectedAlbum.title}
                </h3>
                <p className="text-xs text-[#574F45]">
                  {artist.name} · {selectedAlbum.releaseYear}
                </p>
                <p className="text-[11px] font-mono text-[#857B70]">
                  {selectedAlbum.trackCount} Tracks · {selectedAlbum.genre}
                </p>
              </div>
            </div>

            {selectedAlbum.copyright && (
              <p className="text-[10px] text-[#857B70] italic border-t border-[#F0EBE1] pt-3 leading-relaxed">
                {selectedAlbum.copyright}
              </p>
            )}

            <div className="flex gap-2 pt-2">
              {selectedAlbum.spotifyUrl && (
                <a
                  href={selectedAlbum.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold text-xs rounded-lg transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Listen on Spotify</span>
                </a>
              )}
              <button
                onClick={() => setSelectedAlbum(null)}
                className="px-4 py-2.5 bg-[#F2ECE1] hover:bg-[#E2D8CE] text-xs font-mono text-[#1A1816] rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
