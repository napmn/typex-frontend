export type GameVariations = "text" | "quote" | "dictionary";

export type GameType = {
  name: GameVariations;
  verboseName: string;
  about: string;
  path: string;
  icon: any;
  color: string;
  disabled: boolean;
};

export type TypingResult = {
  textId: string;
  cpm: number;
  wpm: number;
  accuracy: number;
  finished: boolean;
  resultId?: string;
};

export type TypingResultAction = {
  type?: 'update' | 'finalize' | 'reset';
  payload?: Partial<TypingResult>;
}

export type TypingResultContextValue = {
  state: TypingResult;
  dispatch: React.Dispatch<TypingResultAction>
}

export type LoaderContextValue = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
