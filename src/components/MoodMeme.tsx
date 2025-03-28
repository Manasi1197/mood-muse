import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';
import { getRandomMeme, generateMemeUrl } from '../utils/memeData';

interface MoodMemeProps {
  mood: string;
}

const MoodMeme: React.FC<MoodMemeProps> = ({ mood }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [memeData, setMemeData] = useState(() => getRandomMeme());
  
  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Only update meme when mood changes
  useEffect(() => {
    setMemeData(getRandomMeme());
  }, [mood]);

  const { template, joke } = memeData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="w-full max-w-2xl mx-auto mt-8 mb-16"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-semibold text-white">Time for a smile!</h2>
      </div>

      <motion.div 
        className="relative overflow-hidden rounded-2xl bg-white bg-opacity-10 backdrop-blur-sm"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10" />
        
        <div className="relative p-4">
          {joke && (
            <div className="w-full relative rounded-lg overflow-hidden">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-white animate-spin" />
                </div>
              )}
              
              <div className="relative">
                <motion.img
                  src={generateMemeUrl(template, joke.texts)}
                  alt={template.name}
                  className={`w-full h-full object-contain ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isLoading ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  style={{
                    aspectRatio: template.aspectRatio
                  }}
                />

                {/* Meme Text Overlays */}
                {!isLoading && !hasError && (
                  <>
                    {/* Top Text */}
                    <div className="absolute top-4 left-0 right-0 flex justify-center">
                      <p className="text-lg sm:text-2xl md:text-3xl font-bold text-white uppercase text-center max-w-[90%] leading-tight"
                         style={{
                           textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000'
                         }}>
                        {joke.texts.top}
                      </p>
                    </div>

                    {/* Bottom Text */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                      <p className="text-lg sm:text-2xl md:text-3xl font-bold text-white uppercase text-center max-w-[90%] leading-tight"
                         style={{
                           textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000'
                         }}>
                        {joke.texts.bottom}
                      </p>
                    </div>
                  </>
                )}

                {hasError && (
                  <div className="absolute inset-0 flex items-center justify-center text-white text-opacity-60">
                    Unable to load meme image
                  </div>
                )}
              </div>
            </div>
          )}

          <motion.p 
            className="text-white text-opacity-90 text-lg italic mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Because everyone needs a good laugh! 😊
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MoodMeme;