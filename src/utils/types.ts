export type MarkovNode = Map<string, number>;
export type MarkovChain = Map<string, MarkovNode>;
export type Corpus = string[];