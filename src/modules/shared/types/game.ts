export type GameVariations = "text" | "quote" | "dictionary";

export type GameType = {
  name: GameVariations;
  verboseName: string;
  path: string;
};

export type TypingResult = {
  textId: string;
  cpm: number;
  wpm: number;
  accuracy: number;
};

export type TypingResultAction = {
  type?: 'update' | 'finalize' | 'reset';
  payload?: Partial<TypingResult>;
}

export type TypingResultContextValue = {
  state: TypingResult;
  dispatch: React.Dispatch<TypingResultAction>
}
