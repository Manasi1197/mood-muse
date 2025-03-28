import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music2, ExternalLink } from 'lucide-react';
import { getPlaylistForMood } from '../utils/playlistData';

interface MoodPlaylistProps {
  mood: string;
}

const MoodPlaylist: React.FC<MoodPlaylistProps> = ({ mood }) => {
  const [playlist, setPlaylist] = useState(() => getPlaylistForMood(mood as any));
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Only update playlist when mood changes
  useEffect(() => {
    setPlaylist(getPlaylistForMood(mood as any));
  }, [mood]);

  // Reset loading state when playlist changes
  useEffect(() => {
    setImageLoading(true);
    setImageError(false);
  }, [playlist.id]);

  // Fallback gradient based on genre
  const getFallbackGradient = () => {
    const primaryGenre = playlist.genres[0];
    switch (primaryGenre) {
      case 'pop':
        return 'from-pink-500 to-purple-500';
      case 'rock':
        return 'from-red-500 to-orange-500';
      case 'electronic':
        return 'from-blue-500 to-cyan-500';
      case 'ambient':
        return 'from-indigo-500 to-purple-500';
      case 'jazz':
        return 'from-amber-500 to-red-500';
      case 'classical':
        return 'from-slate-500 to-gray-500';
      default:
        return 'from-purple-500 to-pink-500';
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="w-full max-w-2xl mx-auto mt-12 mb-8"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center">
          <Music2 className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-semibold text-white">Your Mood Playlist</h2>
      </div>

      <motion.div 
        className="relative overflow-hidden rounded-2xl bg-white bg-opacity-10 backdrop-blur-sm"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10" />
        
        <div className="relative p-6 flex flex-col sm:flex-row items-center gap-6">
          {/* Playlist Image Container */}
          <div className="w-40 h-40 flex-shrink-0 rounded-xl overflow-hidden relative">
            {/* Fallback/Loading Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${getFallbackGradient()} flex items-center justify-center transition-opacity duration-300 ${imageLoading || imageError ? 'opacity-100' : 'opacity-0'}`}>
              <Music2 className="w-12 h-12 text-white/80" />
            </div>

            {/* Actual Image */}
            {!imageError && (
              <img
                src={playlist.imageUrl}
                alt={playlist.name}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            )}
          </div>

          {/* Playlist Info */}
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl font-semibold text-white mb-2">{playlist.name}</h3>
            <p className="text-white text-opacity-80 mb-4">{playlist.description}</p>
            
            {/* Genre Tags */}
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-6">
              {playlist.genres.map((genre, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 rounded-full bg-white bg-opacity-10 text-sm text-white"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Spotify Button */}
            <a
              href={`https://open.spotify.com/playlist/${playlist.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] transition-colors duration-200 text-white font-semibold"
            >
              <span>Open in Spotify</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MoodPlaylist;