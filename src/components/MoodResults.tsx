import React, { useState } from 'react';
import { ArrowLeft, Info, CloudRain, Cloud, CloudSun, Sun, Heart, Home, Quote, ThumbsUp, ThumbsDown } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { motion, AnimatePresence } from 'framer-motion';
import { moodCorpus } from '../utils/emotionalCorpus';
import { shuffle } from '../utils/helpers';
import { analyzeMoodFromText, getMoodMessage, submitMoodFeedback } from '../utils/moodAnalyzer';
import MoodPlaylist from './MoodPlaylist';
import MoodMeme from './MoodMeme';

interface MoodResultsProps {
  onBack: () => void;
  onAbout?: () => void;
  onHome?: () => void;
  moodData: {
    type: 'emoji' | 'text';
    mood?: string;
    content?: string;
  };
}

const moodStyles = {
  'Gloomy': {
    gradient: 'from-blue-900 via-blue-800 to-purple-900',
    cardGradient: 'from-blue-200/30 to-purple-200/30',
    icon: CloudRain,
    iconColor: 'text-blue-400',
  },
  'Mellow': {
    gradient: 'from-purple-900 via-purple-800 to-indigo-900',
    cardGradient: 'from-purple-200/30 to-indigo-200/30',
    icon: Cloud,
    iconColor: 'text-purple-400',
  },
  'Slow but Moving': {
    gradient: 'from-orange-900 via-amber-800 to-purple-900',
    cardGradient: 'from-orange-200/30 to-amber-200/30',
    icon: CloudSun,
    iconColor: 'text-orange-400',
  },
  'Radiant': {
    gradient: 'from-yellow-600 via-orange-600 to-purple-900',
    cardGradient: 'from-yellow-200/30 to-orange-200/30',
    icon: Sun,
    iconColor: 'text-yellow-400',
  }
} as const;

const defaultStyle = {
  gradient: 'from-purple-900 via-purple-800 to-pink-900',
  cardGradient: 'from-purple-200/30 to-pink-200/30',
  icon: Heart,
  iconColor: 'text-pink-400',
};

const MoodResults: React.FC<MoodResultsProps> = ({ onBack, onAbout, onHome, moodData }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<'yes' | 'no' | null>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Get initial mood and message - this won't change during feedback
  const initialMoodData = React.useMemo(() => {
    if (moodData.type === 'emoji' && moodData.mood) {
      return {
        mood: moodData.mood,
        message: getMoodMessage(moodData.mood as any, '')
      };
    } else if (moodData.type === 'text' && moodData.content) {
      const detectedMood = analyzeMoodFromText(moodData.content);
      return {
        mood: detectedMood,
        message: getMoodMessage(detectedMood, moodData.content)
      };
    }
    return {
      mood: null,
      message: "Your feelings are valid and meaningful. Each emotion you experience helps you grow."
    };
  }, [moodData]);

  const moodStyle = React.useMemo(() => {
    if (initialMoodData.mood) {
      return moodStyles[initialMoodData.mood as keyof typeof moodStyles] || defaultStyle;
    }
    return defaultStyle;
  }, [initialMoodData.mood]);

  const handleFeedback = async (isAccurate: boolean) => {
    setSelectedFeedback(isAccurate ? 'yes' : 'no');
    if (isAccurate) {
      if (moodData.type === 'text' && moodData.content && initialMoodData.mood) {
        await submitMoodFeedback(moodData.content, initialMoodData.mood);
      }
      setFeedbackSubmitted(true);
    } else {
      setShowFeedback(true);
    }
  };

  const handleMoodSelection = async (selectedMood: string) => {
    if (moodData.type === 'text' && moodData.content) {
      await submitMoodFeedback(moodData.content, selectedMood);
    }
    setShowFeedback(false);
    setFeedbackSubmitted(true);
  };

  const MoodIcon = moodStyle.icon;

  return (
    <div className={`w-full min-h-screen bg-gradient-to-br ${moodStyle.gradient}`}>
      <div className="w-full max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={onBack}
            className="px-4 py-2 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 text-white flex items-center gap-2 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>New Check-in</span>
          </button>
          <div className="flex items-center gap-2">
            {onHome && (
              <button 
                onClick={onHome}
                className="w-8 h-8 flex items-center justify-center text-white hover:text-white/80 transition-colors duration-200"
              >
                <Home className="w-5 h-5" />
              </button>
            )}
            <button 
              onClick={onAbout}
              className="w-8 h-8 flex items-center justify-center text-white hover:text-white/80 transition-colors duration-200"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20 
            }}
            className="w-20 h-20 rounded-full bg-white bg-opacity-10 backdrop-blur-sm flex items-center justify-center mb-8"
          >
            <MoodIcon className={`w-10 h-10 ${moodStyle.iconColor}`} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
              {initialMoodData.mood 
                ? `You are ${initialMoodData.mood} today`
                : "Here's your mood analysis"
              }
            </h1>
            <p className="text-xl text-white text-opacity-90">
              {new Date().toLocaleString('en-US', { 
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </motion.div>

          <motion.div 
            className="relative w-full max-w-2xl mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${moodStyle.cardGradient} backdrop-blur-sm`} />
            <div className="absolute inset-0 rounded-2xl bg-white/40 backdrop-blur-sm" />
            <div className="relative rounded-2xl p-8 sm:p-10 overflow-hidden">
              <div className="absolute top-4 left-4 opacity-20">
                <Quote className="w-8 h-8" />
              </div>
              
              <TypeAnimation
                sequence={[500, initialMoodData.message]}
                wrapper="p"
                speed={50}
                className="text-xl text-gray-800 leading-relaxed"
                cursor={false}
              />

              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-white/10 rounded-tl-full transform translate-x-16 translate-y-16" />
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-black/5 to-transparent rounded-br-full transform -translate-x-12 -translate-y-12" />
            </div>
          </motion.div>

          {/* Pass the initial mood to child components */}
          <MoodPlaylist mood={initialMoodData.mood || 'Neutral'} />
          <MoodMeme mood={initialMoodData.mood || 'Neutral'} />

          {moodData.type === 'text' && !feedbackSubmitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-8"
            >
              <p className="text-white text-opacity-90 mb-4">Was this mood analysis accurate?</p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleFeedback(true)}
                  className={`px-6 py-3 rounded-xl bg-white hover:bg-opacity-20 text-white flex items-center gap-2 transition-all duration-200 ${
                    selectedFeedback === 'yes' ? 'bg-opacity-30 ring-2 ring-white' : 'bg-opacity-10'
                  }`}
                >
                  <ThumbsUp className="w-5 h-5" />
                  <span>Yes</span>
                </button>
                <button
                  onClick={() => handleFeedback(false)}
                  className={`px-6 py-3 rounded-xl bg-white hover:bg-opacity-20 text-white flex items-center gap-2 transition-all duration-200 ${
                    selectedFeedback === 'no' ? 'bg-opacity-30 ring-2 ring-white' : 'bg-opacity-10'
                  }`}
                >
                  <ThumbsDown className="w-5 h-5" />
                  <span>No</span>
                </button>
              </div>
            </motion.div>
          )}

          {showFeedback && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              <p className="text-white text-opacity-90 mb-4">Which mood better matches how you're feeling?</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Object.keys(moodStyles).map((mood) => (
                  <button
                    key={mood}
                    onClick={() => handleMoodSelection(mood)}
                    className="px-4 py-3 rounded-xl bg-white bg-opacity-10 hover:bg-opacity-20 text-white transition-all duration-200"
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {feedbackSubmitted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-8 text-white text-opacity-90"
            >
              Thank you for your feedback! 🙏
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodResults;