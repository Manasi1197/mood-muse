import { moodCorpus } from './emotionalCorpus';

// Mood keywords and their associated weights
const moodKeywords = {
  Gloomy: {
    keywords: [
      'sad', 'depressed', 'down', 'unhappy', 'miserable', 'lonely', 'tired',
      'exhausted', 'hopeless', 'anxious', 'worried', 'stressed', 'hurt',
      'pain', 'crying', 'tears', 'dark', 'heavy', 'struggle'
    ],
    weight: 1,
    learned: {} as Record<string, number> // Store learned keywords with their weights
  },
  Mellow: {
    keywords: [
      'calm', 'peaceful', 'quiet', 'relaxed', 'steady', 'content', 'okay',
      'fine', 'alright', 'neutral', 'balanced', 'stable', 'normal',
      'average', 'moderate', 'mild', 'gentle'
    ],
    weight: 1,
    learned: {}
  },
  'Slow but Moving': {
    keywords: [
      'better', 'improving', 'progress', 'hope', 'trying', 'effort',
      'forward', 'moving', 'learning', 'growing', 'changing', 'working',
      'step', 'baby steps', 'small wins', 'gradually', 'slowly'
    ],
    weight: 1.2,
    learned: {}
  },
  Radiant: {
    keywords: [
      'happy', 'joy', 'excited', 'amazing', 'wonderful', 'fantastic',
      'great', 'blessed', 'grateful', 'thankful', 'positive', 'energetic',
      'motivated', 'inspired', 'love', 'bright', 'sunshine', 'beautiful'
    ],
    weight: 1,
    learned: {}
  }
} as const;

type MoodType = keyof typeof moodKeywords;

interface MoodScore {
  mood: MoodType;
  score: number;
}

// Store feedback data in localStorage
const FEEDBACK_STORAGE_KEY = 'mood-feedback-data';
const LEARNED_KEYWORDS_KEY = 'mood-learned-keywords';

interface FeedbackEntry {
  text: string;
  mood: string;
  timestamp: number;
}

// Common English stop words to filter out
const stopWords = new Set([
  'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're",
  "you've", "you'll", "you'd", 'your', 'yours', 'yourself', 'yourselves', 'he',
  'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself', 'it', "it's",
  'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which',
  'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are',
  'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do',
  'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because',
  'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against',
  'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below',
  'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again',
  'further', 'then', 'once'
]);

function getFeedbackData(): FeedbackEntry[] {
  const data = localStorage.getItem(FEEDBACK_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveFeedbackData(data: FeedbackEntry[]) {
  localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(data));
}

function getLearnedKeywords(): typeof moodKeywords {
  const data = localStorage.getItem(LEARNED_KEYWORDS_KEY);
  if (!data) return moodKeywords;
  
  const learned = JSON.parse(data);
  // Merge learned keywords with base keywords
  Object.keys(moodKeywords).forEach(mood => {
    if (learned[mood]?.learned) {
      moodKeywords[mood as MoodType].learned = learned[mood].learned;
    }
  });
  
  return moodKeywords;
}

function saveLearnedKeywords() {
  localStorage.setItem(LEARNED_KEYWORDS_KEY, JSON.stringify(moodKeywords));
}

function extractPotentialKeywords(text: string): string[] {
  // Convert to lowercase and split into words
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .split(/\s+/)
    .filter(word => 
      word.length > 2 && // Ignore very short words
      !stopWords.has(word) && // Ignore stop words
      !/^\d+$/.test(word) // Ignore numbers
    );
  
  return Array.from(new Set(words)); // Remove duplicates
}

export async function submitMoodFeedback(text: string, mood: string) {
  const feedbackData = getFeedbackData();
  
  // Add new feedback entry
  feedbackData.push({
    text,
    mood,
    timestamp: Date.now()
  });

  // Keep only the last 1000 entries to manage storage
  if (feedbackData.length > 1000) {
    feedbackData.shift();
  }

  saveFeedbackData(feedbackData);

  // Extract and learn new keywords
  const potentialKeywords = extractPotentialKeywords(text);
  learnNewKeywords(potentialKeywords, mood as MoodType);

  // Update keyword weights based on feedback
  updateKeywordWeights(text, mood);
}

function learnNewKeywords(words: string[], mood: MoodType) {
  const moodData = moodKeywords[mood];
  
  words.forEach(word => {
    // Skip if it's already a base keyword
    if (moodData.keywords.includes(word)) return;

    // Update learned keywords
    if (word in moodData.learned) {
      moodData.learned[word] += 0.1; // Increase confidence in learned keyword
    } else {
      moodData.learned[word] = 0.5; // Initial weight for new keyword
    }
  });

  saveLearnedKeywords();
}

function updateKeywordWeights(text: string, mood: string) {
  const words = text.toLowerCase().split(/\s+/);
  const uniqueWords = new Set(words);
  
  Object.entries(moodKeywords).forEach(([currentMood, data]) => {
    if (currentMood === mood) {
      // Increase weights for matching mood
      data.keywords.forEach(() => {
        if (uniqueWords.has(mood)) {
          data.weight *= 1.1; // Increase weight by 10%
        }
      });

      // Also adjust learned keywords weights
      Object.keys(data.learned).forEach(keyword => {
        if (uniqueWords.has(keyword)) {
          data.learned[keyword] *= 1.1;
        }
      });
    } else {
      // Decrease weights for non-matching moods
      data.keywords.forEach(() => {
        if (uniqueWords.has(mood)) {
          data.weight *= 0.9; // Decrease weight by 10%
        }
      });

      // Also adjust learned keywords weights
      Object.keys(data.learned).forEach(keyword => {
        if (uniqueWords.has(keyword)) {
          data.learned[keyword] *= 0.9;
        }
      });
    }
  });

  saveLearnedKeywords();
}

export function analyzeMoodFromText(text: string): MoodType | null {
  const normalizedText = text.toLowerCase();
  const words = normalizedText.split(/\s+/);
  const currentKeywords = getLearnedKeywords();
  
  // Calculate scores for each mood
  const scores: MoodScore[] = Object.entries(currentKeywords).map(([mood, data]) => {
    let score = 0;

    // Check base keywords
    score += data.keywords.reduce((count, keyword) => {
      const exactMatches = words.filter(word => word === keyword).length;
      const partialMatches = words.filter(word => 
        word.length > keyword.length && word.includes(keyword)
      ).length * 0.5;

      return count + (exactMatches + partialMatches);
    }, 0) * data.weight;

    // Check learned keywords
    score += Object.entries(data.learned).reduce((count, [keyword, weight]) => {
      const exactMatches = words.filter(word => word === keyword).length;
      const partialMatches = words.filter(word => 
        word.length > keyword.length && word.includes(keyword)
      ).length * 0.5;

      return count + (exactMatches + partialMatches) * weight;
    }, 0);

    return {
      mood: mood as MoodType,
      score
    };
  });

  // Sort scores in descending order
  scores.sort((a, b) => b.score - a.score);

  // If the highest score is 0 or if there's no clear winner (scores are too close)
  if (scores[0].score === 0 || (scores[1] && scores[0].score - scores[1].score < 0.3)) {
    return null;
  }

  return scores[0].mood;
}

export function getMoodMessage(mood: MoodType | null, text: string): string {
  if (!mood) {
    // For unclassified moods, provide a thoughtful, validating response
    return `I sense the complexity in your words. Your feelings are valid and meaningful, even when they're hard to categorize. Sometimes the most profound emotions are the ones that defy simple labels.`;
  }

  // Get the mood-specific messages
  const messages = moodCorpus[mood];
  
  // Select a random message from the appropriate category
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}