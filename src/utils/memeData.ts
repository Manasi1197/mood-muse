interface MemeTemplate {
  id: string;
  name: string;
  imageUrl: string;
  aspectRatio: number;
}

interface MemeJoke {
  template: string;
  texts: {
    top: string;
    bottom: string;
  };
}

export const memeTemplates: MemeTemplate[] = [
  {
    id: 'distracted-boyfriend',
    name: 'Distracted Boyfriend',
    imageUrl: 'https://i.imgflip.com/1ur9b0.jpg',
    aspectRatio: 1.6,
  },
  {
    id: 'drake',
    name: 'Drake Hotline Bling',
    imageUrl: 'https://i.imgflip.com/30b1gx.jpg',
    aspectRatio: 1,
  },
  {
    id: 'two-buttons',
    name: 'Two Buttons',
    imageUrl: 'https://i.imgflip.com/1g8my4.jpg',
    aspectRatio: 0.75,
  },
  {
    id: 'change-my-mind',
    name: 'Change My Mind',
    imageUrl: 'https://i.imgflip.com/24y43o.jpg',
    aspectRatio: 1.5,
  },
  {
    id: 'expanding-brain',
    name: 'Expanding Brain',
    imageUrl: 'https://i.imgflip.com/1jwhww.jpg',
    aspectRatio: 0.8,
  },
  {
    id: 'roll-safe',
    name: 'Roll Safe',
    imageUrl: 'https://i.imgflip.com/1h7in3.jpg',
    aspectRatio: 1.1,
  },
  {
    id: 'one-does-not-simply',
    name: 'One Does Not Simply',
    imageUrl: 'https://i.imgflip.com/1bij.jpg',
    aspectRatio: 1.25,
  },
  {
    id: 'ancient-aliens',
    name: 'Ancient Aliens Guy',
    imageUrl: 'https://i.imgflip.com/26am.jpg',
    aspectRatio: 1.33,
  },
  {
    id: 'shut-up-and-take-my-money',
    name: 'Shut Up And Take My Money',
    imageUrl: 'https://i.imgflip.com/3si4.jpg',
    aspectRatio: 1.5,
  },
  {
    id: 'doge',
    name: 'Doge',
    imageUrl: 'https://i.imgflip.com/4t0m5.jpg',
    aspectRatio: 1,
  },
  {
    id: 'success-kid',
    name: 'Success Kid',
    imageUrl: 'https://i.imgflip.com/1bhk.jpg',
    aspectRatio: 1.25,
  },
  {
    id: 'woman-yelling-at-cat',
    name: 'Woman Yelling At Cat',
    imageUrl: 'https://i.imgflip.com/345v97.jpg',
    aspectRatio: 2,
  },
  {
    id: 'disaster-girl',
    name: 'Disaster Girl',
    imageUrl: 'https://i.imgflip.com/23ls.jpg',
    aspectRatio: 1.3,
  },
  {
    id: 'waiting-skeleton',
    name: 'Waiting Skeleton',
    imageUrl: 'https://i.imgflip.com/2fm6x.jpg',
    aspectRatio: 0.8,
  },
  {
    id: 'surprised-pikachu',
    name: 'Surprised Pikachu',
    imageUrl: 'https://i.imgflip.com/2kbn1e.jpg',
    aspectRatio: 1.1,
  }
];

export const memeJokes: MemeJoke[] = [
  {
    template: 'distracted-boyfriend',
    texts: {
      top: "Me looking at memes",
      bottom: "My pending assignments and responsibilities"
    }
  },
  {
    template: 'drake',
    texts: {
      top: "Actually studying for exams",
      bottom: "Making memes about not studying for exams"
    }
  },
  {
    template: 'two-buttons',
    texts: {
      top: "Sleep early and be productive tomorrow",
      bottom: "Stay up all night watching 'just one more episode'"
    }
  },
  {
    template: 'change-my-mind',
    texts: {
      top: "Chai is just leaf soup",
      bottom: "Change my mind"
    }
  },
  {
    template: 'expanding-brain',
    texts: {
      top: "Walking to the fridge once",
      bottom: "Walking to the fridge every 5 minutes expecting new food to appear"
    }
  },
  {
    template: 'roll-safe',
    texts: {
      top: "Can't be late for work",
      bottom: "If you don't show up at all"
    }
  },
  {
    template: 'one-does-not-simply',
    texts: {
      top: "One does not simply",
      bottom: "Eat just one Parle-G biscuit"
    }
  },
  {
    template: 'ancient-aliens',
    texts: {
      top: "When mom finds the thing",
      bottom: "That you've been looking for for hours"
    }
  },
  {
    template: 'shut-up-and-take-my-money',
    texts: {
      top: "When street food vendor says",
      bottom: "Extra masala, no extra charge"
    }
  },
  {
    template: 'doge',
    texts: {
      top: "When you finally reach home",
      bottom: "And mom says 'achha ab ye kaam kar do'"
    }
  },
  {
    template: 'success-kid',
    texts: {
      top: "When you type random answers in the online exam",
      bottom: "And still get full marks"
    }
  },
  {
    template: 'woman-yelling-at-cat',
    texts: {
      top: "My mom explaining why I should wake up at 5am",
      bottom: "Me who slept at 4am"
    }
  },
  {
    template: 'disaster-girl',
    texts: {
      top: "Me watching the chaos unfold",
      bottom: "After telling my cousin their sibling ate their chocolate"
    }
  },
  {
    template: 'waiting-skeleton',
    texts: {
      top: "Waiting for my crush",
      bottom: "To reply to my 'accidentally' sent message"
    }
  },
  {
    template: 'surprised-pikachu',
    texts: {
      top: "When you make fun of your friend",
      bottom: "And they make a joke about your insecurity"
    }
  },
  // Adding new jokes
  {
    template: 'shut-up-and-take-my-money',
    texts: {
      top: "When the street food vendor says",
      bottom: "Add extra cheese, no extra charge"
    }
  },
  {
    template: 'drake',
    texts: {
      top: "Using Google Maps to navigate",
      bottom: "Asking 10 different people for directions anyway"
    }
  },
  {
    template: 'distracted-boyfriend',
    texts: {
      top: "Me looking at new Instagram reels",
      bottom: "My half-watched Netflix shows"
    }
  },
  {
    template: 'two-buttons',
    texts: {
      top: "Reply immediately and seem desperate",
      bottom: "Wait 3 hours to reply and seem uninterested"
    }
  },
  {
    template: 'change-my-mind',
    texts: {
      top: "'Buffering' made us more patient than yoga ever could",
      bottom: "Change my mind"
    }
  },
  {
    template: 'expanding-brain',
    texts: {
      top: "Studying throughout the semester",
      bottom: "Learning the entire syllabus the night before exam"
    }
  },
  {
    template: 'roll-safe',
    texts: {
      top: "Can't get your heart broken",
      bottom: "If you're busy scrolling memes all day"
    }
  },
  {
    template: 'one-does-not-simply',
    texts: {
      top: "One does not simply",
      bottom: "Leave a family WhatsApp group"
    }
  },
  {
    template: 'ancient-aliens',
    texts: {
      top: "When your internet stops working",
      bottom: "And suddenly the router needs to be restarted"
    }
  },
  {
    template: 'doge',
    texts: {
      top: "When you're about to sleep",
      bottom: "Brain: Remember that embarrassing thing from 7 years ago?"
    }
  },
  {
    template: 'success-kid',
    texts: {
      top: "Didn't open Swiggy for 24 hours",
      bottom: "Financial freedom loading..."
    }
  },
  {
    template: 'woman-yelling-at-cat',
    texts: {
      top: "Me: I'm emotionally unavailable.",
      bottom: "Also me: Cries at puppy videos on Instagram"
    }
  },
  {
    template: 'disaster-girl',
    texts: {
      top: "When you fail",
      bottom: "At lab safety"
    }
  },
  {
    template: 'waiting-skeleton',
    texts: {
      top: "Waiting for my food delivery",
      bottom: "When the app says 'your order is arriving in 2 minutes' for 20 minutes"
    }
  },
  {
    template: 'surprised-pikachu',
    texts: {
      top: "When you skip one class all semester",
      bottom: "And the exam is based entirely on that lecture"
    }
  }
];

// Get a random meme template with rotation tracking
const MEME_HISTORY_KEY = 'meme-rotation-history';

interface MemeHistory {
  lastShown: number[];
  count: Record<string, number>;
}

function getMemeHistory(): MemeHistory {
  const history = localStorage.getItem(MEME_HISTORY_KEY);
  return history ? JSON.parse(history) : { lastShown: [], count: {} };
}

function saveMemeHistory(history: MemeHistory) {
  localStorage.setItem(MEME_HISTORY_KEY, JSON.stringify(history));
}

// Get a random meme and its associated joke
export function getRandomMeme() {
  const history = getMemeHistory();
  
  // Sort templates by how recently they were shown and how often
  const sortedTemplates = memeTemplates.map((template, index) => ({
    ...template,
    index,
    lastShown: history.lastShown.indexOf(index),
    showCount: history.count[template.id] || 0
  })).sort((a, b) => {
    // Prioritize less shown templates
    if (a.showCount !== b.showCount) {
      return a.showCount - b.showCount;
    }
    // Then prioritize templates that haven't been shown recently
    return (a.lastShown === -1 ? -Infinity : a.lastShown) - 
           (b.lastShown === -1 ? -Infinity : b.lastShown);
  });

  // Select the first template (least shown/oldest)
  const template = sortedTemplates[0];

  // Find all matching jokes for this template
  const matchingJokes = memeJokes.filter(joke => joke.template === template.id);
  
  // Randomly select one of the matching jokes
  const joke = matchingJokes[Math.floor(Math.random() * matchingJokes.length)];

  // Update history
  history.lastShown = [template.index, ...history.lastShown].slice(0, memeTemplates.length);
  history.count[template.id] = (history.count[template.id] || 0) + 1;
  saveMemeHistory(history);

  return {
    template,
    joke
  };
}

// Generate meme URL using imgflip API
export function generateMemeUrl(template: MemeTemplate, texts: { top: string; bottom: string }) {
  return template.imageUrl;
}