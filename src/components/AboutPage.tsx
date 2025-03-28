import React from 'react';
import { ArrowLeft, Heart, Brain, Sparkles, Music2, MessageCircle, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

interface AboutPageProps {
  onBack: () => void;
  onStartJourney: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack, onStartJourney }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-4xl mx-auto px-4"
    >
      <button 
        onClick={onBack}
        className="mt-4 mb-8 px-4 py-2 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 text-purple-200 hover:text-white flex items-center gap-2 transition-all duration-200"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Welcome</span>
      </button>

      <div className="space-y-16 pb-16">
        {/* Hero Section */}
        <div className="text-center">
          <div className="inline-block p-3 rounded-2xl bg-white bg-opacity-10 backdrop-blur-sm mb-6">
            <Heart className="w-8 h-8 text-pink-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">About Mood Muse</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
            Your personal emotional companion, designed to understand, support, and elevate your daily mood journey through music, art, and meaningful interactions.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-8 sm:p-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-purple-500 bg-opacity-20 flex items-center justify-center">
              <Brain className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white">Our Mission</h2>
          </div>
          <p className="text-purple-100 text-lg leading-relaxed">
            We believe that emotional well-being is a journey, not a destination. Mood Muse was created to be your companion in this journey, helping you understand and express your emotions in creative and meaningful ways.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
            <div className="w-12 h-12 rounded-full bg-pink-500 bg-opacity-20 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">AI-Powered Understanding</h3>
            <p className="text-purple-100">
              Our advanced AI system analyzes your mood patterns and provides personalized recommendations to help you navigate your emotional landscape.
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
            <div className="w-12 h-12 rounded-full bg-blue-500 bg-opacity-20 flex items-center justify-center mb-4">
              <Music2 className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Curated Music Experience</h3>
            <p className="text-purple-100">
              Connect with carefully selected playlists that match your emotional state, helping you express and process your feelings through music.
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
            <div className="w-12 h-12 rounded-full bg-green-500 bg-opacity-20 flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Expressive Freedom</h3>
            <p className="text-purple-100">
              Whether through quick emoji reactions or detailed journal entries, express yourself in ways that feel natural and meaningful to you.
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
            <div className="w-12 h-12 rounded-full bg-yellow-500 bg-opacity-20 flex items-center justify-center mb-4">
              <Palette className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Creative Mood Boosters</h3>
            <p className="text-purple-100">
              Discover mood-lifting content, from inspiring artwork to uplifting messages, tailored to brighten your day.
            </p>
          </div>
        </div>

        {/* Join Section */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">💌 Join the Muse-ment</h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of others who have discovered a more mindful way to understand and express their emotions.
          </p>
          <button
            onClick={onStartJourney}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            Begin Your Mood Journey
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;