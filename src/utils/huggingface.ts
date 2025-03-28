import { HfInference } from '@huggingface/inference';
import { generateMoodMessage as generateMarkovMoodMessage, generateTextAnalysisMessage as generateMarkovAnalysisMessage } from './moodMessages';

const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_TOKEN);

const moodPrompts = {
  'Gloomy': 'Write a single encouraging sentence for someone feeling down.',
  'Mellow': 'Write a single calming sentence for someone in a peaceful state.',
  'Slow but Moving': 'Write a single motivating sentence for someone making progress.',
  'Radiant': 'Write a single celebratory sentence for someone feeling joyful.',
};

type MoodType = keyof typeof moodPrompts;

export async function generateMoodMessage(mood: MoodType): Promise<string> {
  // Start with our curated response
  const curatedResponse = generateMarkovMoodMessage(mood);
  
  try {
    // Only attempt HuggingFace if we have a token
    if (!import.meta.env.VITE_HUGGINGFACE_API_TOKEN) {
      return curatedResponse;
    }

    const response = await hf.textGeneration({
      model: 'gpt2',
      inputs: moodPrompts[mood],
      parameters: {
        max_new_tokens: 30,
        temperature: 0.7,
        top_p: 0.9,
        repetition_penalty: 1.2,
        do_sample: true,
      }
    });

    // Clean and format the response
    let text = response.generated_text
      .replace(moodPrompts[mood], '')
      .trim()
      .split('\n')[0];

    // Basic validation of the generated text
    const isValidResponse = text.length > 20 && 
                          text.length < 150 && 
                          !text.includes('http') &&
                          !text.includes('<') &&
                          !text.includes('>');

    // If the generated text doesn't meet our criteria, use the curated response
    if (!isValidResponse) {
      return curatedResponse;
    }

    // Ensure proper capitalization and punctuation
    text = text.charAt(0).toUpperCase() + text.slice(1);
    if (!text.endsWith('.') && !text.endsWith('!') && !text.endsWith('?')) {
      text += '.';
    }

    return text;
  } catch (error) {
    console.error('Error generating mood message:', error);
    return curatedResponse;
  }
}

export async function generateTextAnalysisMessage(text: string): Promise<string> {
  // Start with our curated response
  const curatedResponse = generateMarkovAnalysisMessage(text);

  try {
    // Only attempt HuggingFace if we have a token
    if (!import.meta.env.VITE_HUGGINGFACE_API_TOKEN) {
      return curatedResponse;
    }

    const prompt = `Write a single empathetic response to: "${text}"`;
    
    const response = await hf.textGeneration({
      model: 'gpt2',
      inputs: prompt,
      parameters: {
        max_new_tokens: 30,
        temperature: 0.7,
        top_p: 0.9,
        repetition_penalty: 1.2,
        do_sample: true,
      }
    });

    // Clean and format the response
    let analysisText = response.generated_text
      .replace(prompt, '')
      .trim()
      .split('\n')[0];

    // Basic validation of the generated text
    const isValidResponse = analysisText.length > 20 && 
                          analysisText.length < 150 && 
                          !analysisText.includes('http') &&
                          !analysisText.includes('<') &&
                          !analysisText.includes('>');

    // If the generated text doesn't meet our criteria, use the curated response
    if (!isValidResponse) {
      return curatedResponse;
    }

    // Ensure proper capitalization and punctuation
    analysisText = analysisText.charAt(0).toUpperCase() + analysisText.slice(1);
    if (!analysisText.endsWith('.') && !analysisText.endsWith('!') && !analysisText.endsWith('?')) {
      analysisText += '.';
    }

    return analysisText;
  } catch (error) {
    console.error('Error generating analysis:', error);
    return curatedResponse;
  }
}