import React, { useState, useEffect } from 'react';
import { ArrowRight, Music, Pen, Smile } from 'lucide-react';
import ParticleBackground from './components/ParticleBackground';
import MoodCheckIn from './components/MoodCheckIn';
import AboutPage from './components/AboutPage';
import MoodResults from './components/MoodResults';

interface MoodData {
  type: 'emoji' | 'text';
  mood?: string;
  content?: string;
}

function App() {
  const [showMoodCheck, setShowMoodCheck] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [moodData, setMoodData] = useState<MoodData | null>(null);

  // Effect to handle scroll position when pages change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showMoodCheck, showAbout, showResults]);

  const handleStartClick = () => {
    setShowMoodCheck(true);
    setShowAbout(false);
    setShowResults(false);
  };

  const handleAboutClick = () => {
    setShowAbout(true);
    setShowMoodCheck(false);
    setShowResults(false);
  };

  const handleBackClick = () => {
    setShowMoodCheck(false);
    setShowAbout(false);
    setShowResults(false);
    setMoodData(null);
  };

  const handleNewCheckIn = () => {
    setShowMoodCheck(true);
    setShowAbout(false);
    setShowResults(false);
    setMoodData(null);
  };

  const handleMoodSubmit = (data: MoodData) => {
    setMoodData(data);
    setShowResults(true);
    setShowMoodCheck(false);
  };

  const handleHomeClick = () => {
    setShowMoodCheck(false);
    setShowAbout(false);
    setShowResults(false);
    setMoodData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 flex flex-col relative overflow-x-hidden">
      <ParticleBackground />

      {!showMoodCheck && !showAbout && !showResults && (
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Header Section */}
          <div className="text-center pt-16 sm:pt-24 px-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <h1 className="text-5xl sm:text-7xl font-bold text-white">
                Mood Muse
              </h1>
            </div>
            <p className="text-xl sm:text-2xl text-purple-100 max-w-[320px] sm:max-w-xl mx-auto opacity-90">
              Check in with your feels. Get a vibe, a voice, and a vibe-check in return.
            </p>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col items-center justify-center py-12 px-4">
            <div className="w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12">
              {/* Feature 1 - Mood Tunes */}
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center sm:flex-col sm:items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500 bg-opacity-20 flex items-center justify-center flex-shrink-0">
                    <Music className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-white text-xl font-semibold">Mood Tunes</h3>
                </div>
                <p className="text-purple-100 mt-4">Discover curated Spotify playlists that match your current emotional wavelength</p>
              </div>

              {/* Feature 2 - Mood Boosters */}
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center sm:flex-col sm:items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500 bg-opacity-20 flex items-center justify-center flex-shrink-0">
                    <Smile className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-white text-xl font-semibold">Mood Boosters</h3>
                </div>
                <p className="text-purple-100 mt-4">Enjoy perfectly timed GIFs and memes that'll make your day a little brighter</p>
              </div>

              {/* Feature 3 - Poetic Vibes */}
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center sm:flex-col sm:items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-500 bg-opacity-20 flex items-center justify-center flex-shrink-0">
                    <Pen className="w-6 h-6 text-pink-400" />
                  </div>
                  <h3 className="text-white text-xl font-semibold">Poetic Vibes</h3>
                </div>
                <p className="text-purple-100 mt-4">Get instant mood-matching journal entries and poetic thoughts that hit different</p>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleStartClick}
              className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl text-white font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2 min-w-[240px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9ImdyYWQiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IndoaXRlIiBzdG9wLW9wYWNpdHk9IjAuMiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0id2hpdGUiIHN0b3Atb3BhY2l0eT0iMCIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiLz48L3N2Zz4=')] opacity-0 group-hover:opacity-100 group-active:opacity-0 transition-opacity duration-300" />
              <span className="relative z-10">Vibe Check-In</span>
              <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <p className="mt-4 text-purple-200 text-sm">Get ready for a whole new way to express yourself</p>
          </div>

          {/* Footer Section */}
          <div className="text-center pb-8">
            <button 
              onClick={handleAboutClick}
              className="text-base text-purple-200 hover:text-white transition-colors duration-200"
            >
              <u>Learn more about the app</u>
            </button>
          </div>
        </div>
      )}

      {showAbout && (
        <div className="relative z-10 flex flex-col min-h-screen w-full">
          <AboutPage onBack={handleBackClick} onStartJourney={handleStartClick} />
        </div>
      )}

      {showResults && moodData && (
        <div className="relative z-10 flex flex-col min-h-screen w-full">
          <MoodResults 
            onBack={handleNewCheckIn}
            onAbout={handleAboutClick}
            moodData={moodData}
            onHome={handleHomeClick}
          />
        </div>
      )}

      {showMoodCheck && (
        <div className="relative z-10 flex flex-col min-h-screen w-full">
          <MoodCheckIn 
            onBack={handleBackClick} 
            onAbout={handleAboutClick}
            onMoodSubmit={handleMoodSubmit}
          />
        </div>
      )}
    </div>
  );
}

export default App;