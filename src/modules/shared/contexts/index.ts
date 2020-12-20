import { createContext } from 'react';

import { typingStatsInitialState } from '../const';
import { LoaderContextValue, TypingResultContextValue } from '../types';

export const TypingStatsContext = createContext<TypingResultContextValue>({
  state: typingStatsInitialState,
  dispatch: () => undefined
});

export const LoaderContext = createContext<LoaderContextValue>({
  isLoading: false,
  setIsLoading: () => undefined
});
