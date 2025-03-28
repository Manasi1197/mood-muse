import { MarkovNode, MarkovChain, Corpus } from './types';

export class MarkovChainGenerator {
  private chain: MarkovChain = new Map();
  private sentences: string[] = [];

  constructor(corpus: Corpus) {
    this.sentences = corpus;
  }

  generate(): string {
    // Select a random sentence from the corpus
    const index = Math.floor(Math.random() * this.sentences.length);
    return this.sentences[index];
  }
}