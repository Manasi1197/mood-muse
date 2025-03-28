import { MarkovChainGenerator } from './markovChain';
import { moodCorpus, analysisCorpus } from './emotionalCorpus';

// Initialize generators for each mood
const moodGenerators = Object.entries(moodCorpus).reduce((acc, [mood, corpus]) => {
  acc[mood] = new MarkovChainGenerator(corpus);
  return acc;
}, {} as { [key: string]: MarkovChainGenerator });

const analysisGenerator = new MarkovChainGenerator(analysisCorpus);

export const generateMoodMessage = (mood: keyof typeof moodCorpus): string => {
  const generator = moodGenerators[mood];
  if (!generator) {
    return "Your feelings are valid and meaningful. Each emotion you experience helps you grow.";
  }
  return generator.generate();
};

export const generateTextAnalysisMessage = (text: string): string => {
  return analysisGenerator.generate();
};