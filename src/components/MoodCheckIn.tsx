import React, { useState } from 'react';
import { PenLine, Sparkles, CloudRain, Cloud, Sun, CloudSun, ArrowLeft, Clock, PencilLine, Send, Heart, Stars, Music, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './LoadingScreen';

interface MoodCheckInProps {
  onBack: () => void;
  onAbout?: () => void;
  onMoodSubmit: (data: { type: 'emoji' | 'text'; mood?: string; content?: string }) => void;
}

const MoodCheckIn: React.FC<MoodCheckInProps> = ({ onBack, onAbout, onMoodSubmit }) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [moodText, setMoodText] = useState('');
  const [quickSubmitting, setQuickSubmitting] = useState(false);
  const [textSubmitting, setTextSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const moodIcons = [
    { icon: CloudRain, color: 'text-blue-400', bgColor: 'bg-blue-400', glowColor: '#60A5FA', label: 'Gloomy' },
    { icon: Cloud, color: 'text-purple-400', bgColor: 'bg-purple-400', glowColor: '#A78BFA', label: 'Mellow' },
    { icon: CloudSun, color: 'text-orange-400', bgColor: 'bg-orange-400', glowColor: '#FB923C', label: 'Slow but Moving' },
    { icon: Sun, color: 'text-yellow-400', bgColor: 'bg-yellow-400', glowColor: '#FACC15', label: 'Radiant' },
  ];

  const loadingIcons = [Heart, Stars, Music, Sparkles];
  const [loadingIconIndex, setLoadingIconIndex] = useState(0);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (quickSubmitting || textSubmitting) {
      interval = setInterval(() => {
        setLoadingIconIndex((prev) => (prev + 1) % loadingIcons.length);
      }, 400);
    }
    return () => clearInterval(interval);
  }, [quickSubmitting, textSubmitting]);

  const handleMoodSubmit = async (type: 'quick' | 'text') => {
    if (type === 'quick') {
      setQuickSubmitting(true);
    } else {
      setTextSubmitting(true);
    }
    
    try {
      if (type === 'quick' && selectedMood !== null) {
        setShowLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        onMoodSubmit({ 
          type: 'emoji', 
          mood: moodIcons[selectedMood].label 
        });
      } else if (type === 'text' && moodText.trim()) {
        setShowLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        onMoodSubmit({ 
          type: 'text', 
          content: moodText.trim() 
        });
      }
    } catch (error) {
      console.error('Error submitting mood:', error);
    } finally {
      if (type === 'quick') {
        setQuickSubmitting(false);
      } else {
        setTextSubmitting(false);
      }
      setLoadingIconIndex(0);
    }
  };

  const handleMoodSelect = (index: number) => {
    if (moodText) setMoodText('');
    setSelectedMood(selectedMood === index ? null : index);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setMoodText(newText);
    if (selectedMood !== null && newText) {
      setSelectedMood(null);
    }
  };

  const handleTextareaFocus = () => {
    setIsFocused(true);
    if (selectedMood !== null) {
      setSelectedMood(null);
    }
  };

  const handleTextareaBlur = () => {
    setIsFocused(false);
  };

  const LoadingIcon = loadingIcons[loadingIconIndex];

  const buttonClasses = (isActive: boolean) => `
    w-full py-3 px-6 rounded-xl 
    flex items-center justify-center gap-2 
    transition-all duration-300
    ${isActive
      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
      : 'bg-white bg-opacity-5 text-purple-200 cursor-not-allowed'
    }
  `;

  const renderLoadingButton = (isSubmitting: boolean) => (
    <motion.div 
      animate={{ rotate: isSubmitting ? 360 : 0 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="relative w-5 h-5"
    >
      <LoadingIcon className="w-5 h-5 absolute inset-0" />
    </motion.div>
  );

  return (
    <>
      <AnimatePresence>
        {showLoading && <LoadingScreen />}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-4xl mx-auto px-4"
      >
        <div className="flex items-center justify-between mt-4 mb-8">
          <button 
            onClick={onBack}
            className="px-4 py-2 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 text-purple-200 hover:text-white flex items-center gap-2 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Welcome</span>
          </button>
          <button 
            onClick={onAbout}
            className="w-8 h-8 flex items-center justify-center text-purple-200 hover:text-white transition-colors duration-200"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center max-w-lg mx-auto mb-12">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-3">
            How are you feeling?
          </h2>
          <p className="text-lg sm:text-xl text-purple-200 leading-relaxed">
            Choose the way that best expresses your current mood
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Quick Vibe Check Card */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20 relative overflow-hidden group hover:border-opacity-30 transition-all duration-300">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: selectedMood !== null ? 0.1 : 0 }}
              className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 transition-opacity duration-500 pointer-events-none"
            />
            
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-purple-500 bg-opacity-20 flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-200" />
              <span className="text-xs text-purple-200">Quick & Easy</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Quick Vibe Check</h3>
              <p className="text-purple-200 text-center mb-8">
                Perfect for a quick mood check-in. Just select the emoji that matches how you're feeling right now.
              </p>
              
              <div className="w-full grid grid-cols-4 gap-4 mb-8">
                {moodIcons.map((mood, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleMoodSelect(index)}
                    className="relative flex flex-col items-center"
                  >
                    <motion.div
                      animate={{
                        scale: selectedMood === index ? [1, 1.1, 1] : 1,
                        y: selectedMood === index ? [0, -4, 0] : 0
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: selectedMood === index ? Infinity : 0,
                        repeatType: "reverse"
                      }}
                      className="flex flex-col items-center"
                    >
                      {/* Glow Effect */}
                      {selectedMood === index && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ 
                            opacity: [0.4, 0.6, 0.4],
                            scale: [1.2, 1.3, 1.2],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                          }}
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: `radial-gradient(circle, ${mood.glowColor}40 0%, transparent 70%)`,
                            filter: 'blur(8px)',
                          }}
                        />
                      )}

                      <div className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                        selectedMood === index 
                          ? `${mood.bgColor} bg-opacity-20 ring-2 ring-white ring-opacity-50` 
                          : 'bg-white bg-opacity-10 hover:bg-opacity-15'
                      }`}>
                        <mood.icon className={`w-7 h-7 transition-all duration-300 ${
                          selectedMood === index 
                            ? `${mood.color} scale-110` 
                            : 'text-white text-opacity-70'
                        }`} />
                      </div>
                      <span className={`mt-2 text-sm transition-colors duration-300 ${
                        selectedMood === index 
                          ? 'text-white' 
                          : 'text-purple-200'
                      }`}>
                        {mood.label}
                      </span>
                    </motion.div>
                  </motion.button>
                ))}
              </div>

              <button
                onClick={() => handleMoodSubmit('quick')}
                disabled={selectedMood === null || quickSubmitting}
                className={buttonClasses(selectedMood !== null && !quickSubmitting)}
              >
                {quickSubmitting ? (
                  renderLoadingButton(quickSubmitting)
                ) : (
                  <Send className="w-5 h-5" />
                )}
                <span>{quickSubmitting ? 'Confirming...' : 'Confirm Mood'}</span>
              </button>
            </div>
          </div>

          {/* Express in Words Card */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20 relative overflow-hidden group hover:border-opacity-30 transition-all duration-300">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: moodText.trim() ? 0.1 : 0 }}
              className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 transition-opacity duration-500 pointer-events-none"
            />

            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-blue-500 bg-opacity-20 flex items-center gap-2">
              <PencilLine className="w-4 h-4 text-blue-200" />
              <span className="text-xs text-blue-200">Express Freely</span>
            </div>

            <div className="flex flex-col items-center relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-6">
                <PenLine className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Express in Words</h3>
              <p className="text-purple-200 text-center mb-8">
                Need to vent or express complex feelings? Write freely about what's on your mind.
              </p>
              
              <motion.div
                animate={{
                  scale: isFocused ? 1.02 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-full relative z-10"
              >
                <textarea
                  value={moodText}
                  onChange={handleTextChange}
                  onFocus={handleTextareaFocus}
                  onBlur={handleTextareaBlur}
                  placeholder="Share how you're feeling..."
                  rows={4}
                  className={`w-full rounded-xl bg-white/5 border-2 p-4 text-white placeholder-purple-200/50 focus:outline-none transition-all duration-300 relative z-10 ${
                    isFocused 
                      ? 'border-white/30 ring-4 ring-purple-500/30 bg-white/10'
                      : 'border-white/10 ring-0'
                  }`}
                  style={{ resize: 'none' }}
                />
              </motion.div>

              <button
                onClick={() => handleMoodSubmit('text')}
                disabled={!moodText.trim() || textSubmitting}
                className={`mt-8 ${buttonClasses(moodText.trim() !== '' && !textSubmitting)}`}
              >
                {textSubmitting ? (
                  renderLoadingButton(textSubmitting)
                ) : (
                  <Send className="w-5 h-5" />
                )}
                <span>{textSubmitting ? 'Analyzing...' : 'Analyze My Mood'}</span>
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-purple-200 text-sm mt-8 mb-16">
          Choose either option - both are equally valid ways to express yourself
        </p>
      </motion.div>
    </>
  );
};

export default MoodCheckIn;