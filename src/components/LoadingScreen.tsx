import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const analyzeMessages = [
  "Decoding your emotional wavelength",
  "Consulting with our mood wizards",
  "Brewing your personalized happiness potion",
  "Calculating your joy quotient",
  "Tuning into your emotional frequency",
  "Sprinkling extra sparkles on your analysis",
  "Teaching AI to understand human feelings",
  "Converting feelings into digital magic",
  "Running quantum mood calculations",
  "Almost ready to reveal your mood masterpiece"
];

const LoadingScreen = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % analyzeMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 flex items-center justify-center z-50 p-4 sm:p-6 overflow-hidden"
    >
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-lg flex flex-col items-center justify-center gap-6 sm:gap-8 relative">
        {/* Analysis Animation */}
        <div className="w-full flex justify-center mb-12 sm:mb-16">
          <div className="relative scale-75 sm:scale-100">
            <div className="animate-float relative">
              {/* Balloon */}
              <div className="w-32 h-40 bg-gradient-to-br from-balloon-light via-balloon-primary to-balloon-dark rounded-full relative flex items-center justify-center">
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(255, 154, 205, 0.2)",
                      "0 0 40px rgba(255, 154, 205, 0.4)",
                      "0 0 20px rgba(255, 154, 205, 0.2)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Balloon Bottom */}
                <div className="absolute -bottom-2 w-6 h-6 bg-balloon-dark rounded-full"></div>

                {/* Face and Hands Container */}
                <div className="absolute top-1/3 w-full flex flex-col items-center">
                  {/* Eyes */}
                  <div className="flex space-x-6">
                    <div className="w-3 h-3 bg-black rounded-full animate-blink"></div>
                    <div className="w-3 h-3 bg-black rounded-full animate-blink"></div>
                  </div>

                  {/* Smile */}
                  <div className="mt-3 w-8 h-4 border-b-2 border-black rounded-full"></div>

                  {/* Hands */}
                  <div className="absolute -left-10 top-4 w-8 h-1 bg-balloon-dark rounded-full rotate-45"></div>
                  <div className="absolute -right-10 top-4 w-8 h-1 bg-balloon-dark rounded-full -rotate-45 origin-left animate-wave"></div>
                </div>
              </div>

              {/* String */}
              <div className="w-0.5 h-12 sm:h-16 mx-auto bg-gradient-to-b from-balloon-string to-white/60 transform origin-top animate-float"></div>
            </div>
          </div>
        </div>

        {/* Analysis Messages */}
        <div className="fixed bottom-12 sm:bottom-8 left-0 right-0 text-center px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={messageIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="relative">
                <motion.p
                  className="text-white text-lg sm:text-xl font-medium tracking-wide"
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {analyzeMessages[messageIndex]}
                </motion.p>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: [0, 1, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;