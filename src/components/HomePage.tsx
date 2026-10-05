import React, { useState, useMemo, useEffect } from 'react';
import { BILLBOARD_TOP_10, MUSIC_NEWS, BillboardTrack } from '../data/musicData';
import { searchRealSongs, RealSongResult } from '../services/realMusicApi';
import { fetchArtistDetails, ArtistProfile, SPOTIFY_OFFICIAL_ARTIST_PHOTOS } from '../services/artistService';
import { playRealSong, stopAllAudio, subscribeToAudio } from '../utils/audioPlayerManager';
import { ArtistProfileView } from './ArtistProfileView';
import { 
  Play, 
  Pause, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Radio, 
  Newspaper, 
  Sparkles, 
  Volume2, 
  Disc, 
  Clock, 
  ArrowRight, 
  BookOpen, 
  X, 
  ExternalLink, 
  Loader2, 
  User, 
  Layers
} from 'lucide-react';

interface HomePageProps {
  onNavigateToBlogs: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigateToBlogs }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [currentTrack, setCurrentTrack] = useState<BillboardTrack>(BILLBOARD_TOP_10[0]);
  
  // Real world search results
  const [realSearchResults, setRealSearchResults] = useState<RealSongResult[]>([]);
  const [matchedArtist, setMatchedArtist] = useState<ArtistProfile | null>(null);
  const [isSearchingOnline, setIsSearchingOnline] = useState(false);

  // Active selected artist profile (if viewing artist)
  const [selectedArtist, setSelectedArtist] = useState<ArtistProfile | null>(null);
  const [isLoadingArtistProfile, setIsLoadingArtistProfile] = useState(false);

  // Global audio playback state
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const featuredArtists = [
    'Sabrina Carpenter',
    'Kendrick Lamar',
    'Billie Eilish',
    'Chappell Roan',
    'Tyler, The Creator',
    'Charli xcx',
    'SZA',
    'Frank Ocean'
  ];

  useEffect(() => {
    const unsub = subscribeToAudio((state) => {
      setIsAudioPlaying(state.isPlaying);
      setActivePlayingId(state.isPlaying && state.currentTrack ? state.currentTrack.id : null);
    });
    return unsub;
  }, []);

  // Debounced live search against real-world songs & artists
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setRealSearchResults([]);
      setMatchedArtist(null);
      setIsSearchingOnline(false);
      return;
    }

    setIsSearchingOnline(true);
    const timer = setTimeout(async () => {
      try {
        const [songs, artist] = await Promise.all([
          searchRealSongs(searchQuery, 6),
          fetchArtistDetails(searchQuery)
        ]);
        setRealSearchResults(songs);
        setMatchedArtist(artist);
      } catch (err) {
        console.warn('Real search error:', err);
      } finally {
        setIsSearchingOnline(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const genres = ['All', 'Pop / Disco', 'Hip-Hop / 808', 'Shoegaze', 'Synthpop', 'Afrobeats'];

  // Filtered Billboard chart tracks
  const filteredBillboard = useMemo(() => {
    return BILLBOARD_TOP_10.filter((track) => {
      const matchesSearch = 
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.album.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.genre.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesGenre = selectedGenre === 'All' || track.genre.toLowerCase().includes(selectedGenre.toLowerCase());
      return matchesSearch && matchesGenre;
    });
  }, [searchQuery, selectedGenre]);

  const handleOpenArtist = async (artistName: string) => {
    setIsLoadingArtistProfile(true);
    try {
      const details = await fetchArtistDetails(artistName);
      if (details) {
        setSelectedArtist(details);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (e) {
      console.warn('Failed to load artist:', e);
    } finally {
      setIsLoadingArtistProfile(false);
    }
  };

  const handlePlayBillboardTrack = (track: BillboardTrack) => {
    setCurrentTrack(track);
    const trackId = `bb-${track.rank}`;

    if (isAudioPlaying && activePlayingId === trackId) {
      stopAllAudio();
    } else {
      playRealSong({
        id: trackId,
        title: track.title,
        artist: track.artist,
        coverImage: track.coverImage,
        previewUrl: track.previewUrl,
        audioPreset: track.audioPreset,
        spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(track.artist + ' ' + track.title)}`,
        mode: 'real'
      });
    }
  };

  const handlePlayRealSearchResult = (song: RealSongResult) => {
    if (isAudioPlaying && activePlayingId === song.id) {
      stopAllAudio();
    } else {
      playRealSong({
        id: song.id,
        title: song.title,
        artist: song.artist,
        coverImage: song.artwork,
        previewUrl: song.previewUrl,
        spotifyUrl: song.spotifySearchUrl,
        mode: 'real'
      });
    }
  };

  // If viewing a full artist profile, render the ArtistProfileView
  if (selectedArtist) {
    return (
      <ArtistProfileView
        artist={selectedArtist}
        onBack={() => {
          setSelectedArtist(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Loading overlay when opening an artist */}
      {isLoadingArtistProfile && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center">
          <div className="bg-[#1A1816] text-white p-6 rounded-xl flex items-center gap-3 border border-[#3D362F] shadow-2xl">
            <Loader2 className="w-5 h-5 text-[#F5A623] animate-spin" />
            <span className="font-mono text-xs uppercase tracking-wider">Loading Artist Discography & Bio...</span>
          </div>
        </div>
      )}

      {/* Spotify-Style Search & Play Hero Banner */}
      <section className="bg-gradient-to-br from-[#1E1C1A] via-[#141210] to-[#0D0C0B] text-white p-6 sm:p-10 rounded-xl border border-[#2E2823] shadow-xl space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#F5A623] tracking-wider uppercase font-semibold">
              <Radio className="w-4 h-4 animate-pulse text-[#8C3A27]" />
              <span>MuseWave Music & Artist Hub</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight">
              Real Songs, Artists & Discographies
            </h1>
            <p className="text-xs sm:text-sm text-[#A89F91] max-w-xl leading-relaxed">
              Search any artist to explore their biography, full album discography, and top songs with live audio playback.
            </p>
          </div>

          {/* Quick jump to dedicated Blog */}
          <button
            onClick={onNavigateToBlogs}
            className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 bg-[#8C3A27] hover:bg-[#A3432D] text-white text-xs font-mono uppercase tracking-wider rounded-md transition-colors cursor-pointer shrink-0 shadow-md"
          >
            <BookOpen className="w-4 h-4" />
            <span>Read 10 Music Blog Essays</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Live Search Bar (Connects to Real-World Songs and Artists) */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#857B70]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search any artist (e.g. Kendrick, Billie, Tyler, Sabrina, SZA, Charli)..."
            className="w-full pl-10 pr-9 py-3 bg-[#24201C] text-sm text-white border border-[#3D362F] rounded-lg focus:outline-none focus:border-[#8C3A27] placeholder-[#786F63] transition-colors"
          />
          {isSearchingOnline && (
            <Loader2 className="absolute right-9 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F5A623] animate-spin" />
          )}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#857B70] hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Featured Quick Artist Pills */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-mono text-[#857B70] uppercase tracking-wider block">
            Explore Artist Profiles:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            {featuredArtists.map((artistName) => {
              const spotPhoto = SPOTIFY_OFFICIAL_ARTIST_PHOTOS[artistName.toLowerCase()];
              return (
                <button
                  key={artistName}
                  onClick={() => handleOpenArtist(artistName)}
                  className="px-3 py-1 bg-[#24201C] hover:bg-[#8C3A27] text-[#D1C9BC] hover:text-white border border-[#3D362F] rounded-full font-mono text-[11px] whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  {spotPhoto ? (
                    <img
                      src={spotPhoto}
                      alt={artistName}
                      className="w-4 h-4 rounded-full object-cover shrink-0 border border-white/20"
                    />
                  ) : (
                    <User className="w-3 h-3 text-[#F5A623]" />
                  )}
                  <span>{artistName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Matched Artist Spotlight Card (When user searches for an artist) */}
        {matchedArtist && (
          <div 
            onClick={() => {
              setSelectedArtist(matchedArtist);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-4 sm:p-5 bg-gradient-to-r from-[#2B231D] to-[#1C1916] border border-[#8C3A27]/60 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:border-[#8C3A27] transition-all group shadow-lg"
          >
            <div className="flex items-center gap-4 min-w-0">
              <img
                src={matchedArtist.headerImage}
                alt={matchedArtist.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-full object-cover shrink-0 border-2 border-[#8C3A27] shadow"
              />
              <div className="min-w-0 space-y-0.5">
                <span className="text-[10px] font-mono text-[#F5A623] uppercase tracking-wider font-semibold block">
                  Artist Spotlight · {matchedArtist.genre}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-[#F5A623] transition-colors truncate">
                  {matchedArtist.name}
                </h3>
                <p className="text-xs text-[#A89F91] truncate max-w-lg">
                  {matchedArtist.bio}
                </p>
                <div className="flex items-center gap-3 text-[11px] font-mono text-[#786F63] pt-1">
                  <span>{matchedArtist.albums.length} Albums</span>
                  <span>·</span>
                  <span>{matchedArtist.topSongs.length} Top Songs</span>
                  <span>·</span>
                  <span>{matchedArtist.origin}</span>
                </div>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedArtist(matchedArtist);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="self-start sm:self-center flex items-center gap-2 px-5 py-2.5 bg-[#8C3A27] hover:bg-[#A3432D] text-white text-xs font-mono font-semibold rounded-full cursor-pointer transition-transform group-hover:scale-105 shrink-0 shadow"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>View Albums & Bio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Real-World Online Search Results (Songs) */}
        {realSearchResults.length > 0 && (
          <div className="p-4 bg-[#1A1815] border border-[#3D362F] rounded-lg space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#F5A623]">
              <span className="uppercase tracking-wider font-semibold">Real World Song Results</span>
              <span className="text-[#857B70]">Tap Song to Play Audio · Tap Artist to View Profile</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {realSearchResults.map((song) => {
                const isPlayingThis = isAudioPlaying && activePlayingId === song.id;

                return (
                  <div
                    key={song.id}
                    onClick={() => handlePlayRealSearchResult(song)}
                    className={`p-2.5 rounded-md flex items-center justify-between gap-3 border transition-colors cursor-pointer ${
                      isPlayingThis 
                        ? 'bg-[#2E241E] border-[#8C3A27]' 
                        : 'bg-[#24201C] hover:bg-[#2D2722] border-[#38312B]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={song.artwork}
                        alt={song.title}
                        className="w-10 h-10 rounded object-cover shrink-0 bg-[#2E2823]"
                      />
                      <div className="min-w-0">
                        <span className="font-serif text-sm font-medium text-white truncate block">
                          {song.title}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenArtist(song.artist);
                          }}
                          className="text-xs text-[#A89F91] hover:text-[#F5A623] underline-offset-2 hover:underline truncate block text-left"
                          title="View Artist Profile & Albums"
                        >
                          {song.artist}
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayRealSearchResult(song);
                      }}
                      className={`p-2 rounded-full cursor-pointer shrink-0 transition-colors ${
                        isPlayingThis
                          ? 'bg-[#8C3A27] text-white'
                          : 'bg-white text-black hover:bg-[#F5A623]'
                      }`}
                    >
                      {isPlayingThis ? (
                        <Pause className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Active Now Playing Console */}
        <div className="p-4 sm:p-5 bg-[#171513] border border-[#2B2621] rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded overflow-hidden shrink-0 bg-[#292420] border border-[#3D362F]">
              <img
                src={currentTrack.coverImage}
                alt={currentTrack.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {isAudioPlaying && activePlayingId === `bb-${currentTrack.rank}` && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="flex items-end gap-0.5 h-4">
                    <span className="w-1 h-3 bg-[#F5A623] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 h-4 bg-[#F5A623] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 h-2 bg-[#F5A623] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            <div className="min-w-0">
              <span className="text-[10px] font-mono uppercase text-[#F5A623] tracking-wider block">
                {isAudioPlaying && activePlayingId === `bb-${currentTrack.rank}` ? 'Streaming Real Studio Audio' : 'Selected Track'}
              </span>
              <h2 className="font-serif text-lg font-medium text-white truncate">{currentTrack.title}</h2>
              <p className="text-xs text-[#A89F91] truncate">
                <button
                  onClick={() => handleOpenArtist(currentTrack.artist)}
                  className="hover:text-white underline-offset-2 hover:underline cursor-pointer"
                >
                  {currentTrack.artist}
                </button>
                {' '}· <span className="italic">{currentTrack.album}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            <button
              onClick={() => handleOpenArtist(currentTrack.artist)}
              className="px-4 py-2 bg-transparent hover:bg-white/10 text-[#D1C9BC] hover:text-white border border-[#3D362F] rounded-full font-mono text-xs cursor-pointer transition-colors"
            >
              Artist Profile
            </button>

            <button
              onClick={() => handlePlayBillboardTrack(currentTrack)}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#8C3A27] hover:bg-[#A3432D] text-white rounded-full font-mono text-xs font-semibold cursor-pointer shadow transition-transform active:scale-95"
            >
              {isAudioPlaying && activePlayingId === `bb-${currentTrack.rank}` ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Pause Audio</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current text-[#F5A623]" />
                  <span>Play Real Song Audio</span>
                </>
              )}
            </button>
          </div>
        </div>

      </section>

      {/* Billboard Top 10 List (Spotify-Style Table with Real Audio & Artist Links) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E6E0D6] pb-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8C3A27] font-semibold">
              <Sparkles className="w-4 h-4 text-[#F5A623]" />
              <span>Global Billboard Hot 100 · Real Audio Streams</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1816]">
              Billboard Hot 100 — Top 10
            </h2>
          </div>
          <p className="text-xs font-mono text-[#857B70]">
            Tap song to play audio · Tap artist name to view albums & bio
          </p>
        </div>

        {/* Spotify Table Container */}
        <div className="bg-white border border-[#E6E0D6] rounded-lg overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E6E0D6] bg-[#FAF8F5] text-[#857B70] font-mono uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4">Title & Artist</th>
                  <th className="py-3 px-4 hidden md:table-cell">Album</th>
                  <th className="py-3 px-4 hidden sm:table-cell text-right">Streams</th>
                  <th className="py-3 px-4 w-16 text-center">Trend</th>
                  <th className="py-3 px-4 w-36 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EBE1]">
                {filteredBillboard.map((track) => {
                  const trackId = `bb-${track.rank}`;
                  const isThisPlaying = isAudioPlaying && activePlayingId === trackId;
                  const isRankUp = track.rank < track.lastWeekRank;
                  const isRankDown = track.rank > track.lastWeekRank;

                  return (
                    <tr
                      key={track.rank}
                      onClick={() => handlePlayBillboardTrack(track)}
                      className={`group hover:bg-[#F9F6F0] transition-colors cursor-pointer ${
                        isThisPlaying ? 'bg-[#FDF6F0]' : ''
                      }`}
                    >
                      {/* Rank # */}
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-sm text-[#574F45]">
                        {isThisPlaying ? (
                          <Volume2 className="w-4 h-4 text-[#8C3A27] mx-auto animate-pulse" />
                        ) : (
                          track.rank
                        )}
                      </td>

                      {/* Title & Artist with Album Thumbnail */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={track.coverImage}
                            alt={track.title}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded object-cover shrink-0 bg-[#EAE2D5]"
                          />
                          <div className="min-w-0">
                            <span className={`font-serif font-medium text-sm block truncate group-hover:text-[#8C3A27] transition-colors ${
                              isThisPlaying ? 'text-[#8C3A27]' : 'text-[#1A1816]'
                            }`}>
                              {track.title}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenArtist(track.artist);
                              }}
                              className="text-xs text-[#7A7165] hover:text-[#8C3A27] underline-offset-2 hover:underline block truncate text-left cursor-pointer"
                              title="View Artist Bio, Albums & Songs"
                            >
                              {track.artist}
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Album */}
                      <td className="py-3.5 px-4 hidden md:table-cell text-[#574F45] truncate max-w-[200px]">
                        {track.album}
                      </td>

                      {/* Streams */}
                      <td className="py-3.5 px-4 hidden sm:table-cell text-right font-mono text-[#7A7165]">
                        {track.streams}
                      </td>

                      {/* Trend Movement */}
                      <td className="py-3.5 px-4 text-center font-mono">
                        {isRankUp ? (
                          <span className="text-emerald-700 flex items-center justify-center gap-0.5" title="Rank Increased">
                            <TrendingUp className="w-3.5 h-3.5" />
                          </span>
                        ) : isRankDown ? (
                          <span className="text-rose-700 flex items-center justify-center gap-0.5" title="Rank Decreased">
                            <TrendingDown className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span className="text-[#857B70] flex items-center justify-center gap-0.5" title="Same Rank">
                            <Minus className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </td>

                      {/* Real Audio Play Button & Artist Link */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlayBillboardTrack(track);
                            }}
                            className={`p-2 rounded-full transition-all cursor-pointer inline-flex items-center justify-center ${
                              isThisPlaying
                                ? 'bg-[#8C3A27] text-white shadow'
                                : 'bg-[#F2ECE1] text-[#1A1816] group-hover:bg-[#8C3A27] group-hover:text-white'
                            }`}
                            title={isThisPlaying ? 'Pause real audio' : 'Play real song preview'}
                          >
                            {isThisPlaying ? (
                              <Pause className="w-3.5 h-3.5 fill-current" />
                            ) : (
                              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                            )}
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenArtist(track.artist);
                            }}
                            className="p-1.5 text-[#857B70] hover:text-[#8C3A27] transition-colors"
                            title="View Artist Bio & Discography"
                          >
                            <User className="w-3.5 h-3.5" />
                          </button>

                          <a
                            href={`https://open.spotify.com/search/${encodeURIComponent(track.artist + ' ' + track.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 text-[#857B70] hover:text-[#1DB954] transition-colors"
                            title="Open on Spotify"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Music Industry News Section */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-[#E6E0D6] pb-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8C3A27] font-semibold">
              <Newspaper className="w-4 h-4" />
              <span>Industry Wire & Journalism</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1816]">
              Music Industry News & Culture
            </h2>
          </div>
          <span className="text-xs font-mono text-[#857B70]">Live Dispatches</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MUSIC_NEWS.map((item) => (
            <article
              key={item.id}
              className="bg-white border border-[#E6E0D6] hover:border-[#8C3A27] p-5 rounded-lg transition-colors flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-[#7A7165]">
                  <span className="font-mono text-[#8C3A27] font-semibold uppercase">{item.category}</span>
                  <span className="flex items-center gap-1 font-mono text-[#857B70]">
                    <Clock className="w-3 h-3" />
                    {item.timestamp}
                  </span>
                </div>

                <h3 className="font-serif font-medium text-base text-[#1A1816] leading-snug hover:text-[#8C3A27] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-[#574F45] leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between text-[11px] text-[#857B70]">
                <span>Source: <strong className="text-[#4A433A]">{item.source}</strong></span>
                <span className="text-[#8C3A27] font-medium">{item.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Banner linking to the Dedicated Blog page */}
      <section className="p-8 sm:p-10 bg-[#FAF5EE] border border-[#DDD5C7] rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8C3A27] font-semibold">
            Dedicated Blog Section
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1816]">
            Want to Dive into the 10 Music Blog Articles?
          </h3>
          <p className="text-xs sm:text-sm text-[#574F45] leading-relaxed">
            All 10 full-length music essays are housed on our dedicated Blog page—covering shoegaze fuzz lore, the 6-second Amen break, Dilla swing, slowed + reverb neuroscience, 808 sub-bass, and vinyl sample chopping with both real studio tracks and acoustic sound models.
          </p>
        </div>

        <button
          onClick={onNavigateToBlogs}
          className="px-6 py-3 bg-[#1A1816] hover:bg-[#8C3A27] text-white text-xs font-mono uppercase tracking-wider rounded transition-colors cursor-pointer flex items-center gap-2 shrink-0 shadow-md"
        >
          <BookOpen className="w-4 h-4" />
          <span>Go to Dedicated Blog Page</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

    </div>
  );
};
